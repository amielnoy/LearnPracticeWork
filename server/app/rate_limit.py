from __future__ import annotations

import asyncio
import hashlib
import hmac
import logging
import os
import time
from collections import defaultdict, deque
from typing import Literal

from .config import database_url, env
from .database import hit_rate_limit, release_rate_limit

logger = logging.getLogger(__name__)


def shared_quota_problem() -> str | None:
    """Why a production quota cannot be counted, or None when it can.

    A production deployment missing either of these refuses every rate-limited
    request — sign-in and the AI proxy included — and the refusal is a 429 that
    reads exactly like an exhausted quota. Naming the cause is what stops that
    being invisible: it is reported by /api/readyz and logged once per bucket.
    """
    if os.getenv("NODE_ENV") != "production":
        return None
    if not database_url():
        return "no database is configured, so quotas cannot be shared between workers"
    if not (env("RATE_LIMIT_SALT") or env("METRICS_ID_SALT")):
        return "RATE_LIMIT_SALT (or METRICS_ID_SALT) is not set"
    return None


class MemoryRateLimiter:
    def __init__(self, limit: int, window_seconds: float) -> None:
        self.limit = limit
        self.window_seconds = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = asyncio.Lock()

    async def hit(self, key: str) -> tuple[bool, int]:
        now = time.monotonic()
        async with self._lock:
            hits = self._hits[key]
            while hits and hits[0] <= now - self.window_seconds:
                hits.popleft()
            if len(hits) >= self.limit:
                return False, 0
            hits.append(now)
            return True, self.limit - len(hits)

    async def release(self, key: str) -> int:
        async with self._lock:
            hits = self._hits[key]
            if hits:
                hits.pop()
            return max(0, self.limit - len(hits))


WhenUnavailable = Literal["refuse", "degrade"]


class SharedRateLimiter:
    """Postgres-backed in production, deterministic in-memory in local/test runs.

    `when_unavailable` decides what happens if the shared store cannot be used,
    and the right answer differs by what the quota protects:

    "refuse"   the quota guards something that costs money on every call. A
               limiter that cannot count must not wave those through, so the
               caller is turned away. This is the default: a new bucket has to
               opt into being lenient rather than inherit it.

    "degrade"  the quota is a brute-force bound on a credential that is itself
               verified — a Google-signed token, an admin token compared with
               hmac.compare_digest. Refusing everyone here does not protect
               anything; it takes authentication down. Falling back to the
               in-memory limiter keeps a real bound per worker, and loses only
               the sharing between workers and across restarts.
    """

    def __init__(
        self,
        bucket: str,
        limit: int,
        window_seconds: float,
        *,
        when_unavailable: WhenUnavailable = "refuse",
    ) -> None:
        self.bucket = bucket
        self.limit = limit
        self.window_seconds = window_seconds
        self.when_unavailable = when_unavailable
        self.memory = MemoryRateLimiter(limit, window_seconds)
        self._warned: set[str] = set()

    async def release(self, key: str) -> int | None:
        """Give back a hit that bought the caller nothing, or None if it could not.

        A quota exists to ration what the caller receives. Charging for a request
        the provider refused spends an allowance on nothing, and with ten a day
        that is most of a visit. Retrying is still bounded by the burst limiter,
        so giving one back cannot become a way around the quota.
        """
        if os.getenv("NODE_ENV") != "production":
            return await self.memory.release(key)
        if shared_quota_problem():
            return None
        salt = env("RATE_LIMIT_SALT") or env("METRICS_ID_SALT")
        assert salt is not None
        digest = hmac.new(salt.encode(), key.encode(), hashlib.sha256).hexdigest()
        try:
            hits = await release_rate_limit(self.bucket, digest)
        except Exception:
            logger.exception("Could not release a rate limit hit for bucket %r", self.bucket)
            return None
        return max(0, self.limit - hits)

    async def hit(self, key: str) -> tuple[bool, int]:
        if os.getenv("NODE_ENV") != "production":
            return await self.memory.hit(key)
        if problem := shared_quota_problem():
            self._warn_once(problem)
            return await self._unavailable(key)
        salt = env("RATE_LIMIT_SALT") or env("METRICS_ID_SALT")
        assert salt is not None  # shared_quota_problem() has just established this
        digest = hmac.new(salt.encode(), key.encode(), hashlib.sha256).hexdigest()
        try:
            return await hit_rate_limit(self.bucket, digest, self.limit, self.window_seconds)
        except Exception:
            self._warn_once("the shared quota store could not be reached")
            logger.exception("Shared rate limit lookup failed for bucket %r", self.bucket)
            return await self._unavailable(key)

    async def _unavailable(self, key: str) -> tuple[bool, int]:
        if self.when_unavailable == "degrade":
            return await self.memory.hit(key)
        return False, 0

    def _warn_once(self, problem: str) -> None:
        """Loud, but once per cause — this runs on the hot path of every request."""
        if problem in self._warned:
            return
        self._warned.add(problem)
        consequence = (
            f"every {self.bucket!r} request is refused"
            if self.when_unavailable == "refuse"
            else f"the {self.bucket!r} quota is per-worker only"
        )
        logger.error("Shared rate limiting is unavailable: %s; %s", problem, consequence)
