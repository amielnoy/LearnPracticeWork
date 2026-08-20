from __future__ import annotations

import asyncio
import hashlib
import hmac
import logging
import os
import time
from collections import defaultdict, deque

from .config import database_url, env
from .database import hit_rate_limit

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


class SharedRateLimiter:
    """Postgres-backed in production, deterministic in-memory in local/test runs."""

    def __init__(self, bucket: str, limit: int, window_seconds: float) -> None:
        self.bucket = bucket
        self.limit = limit
        self.window_seconds = window_seconds
        self.memory = MemoryRateLimiter(limit, window_seconds)
        self._warned: set[str] = set()

    async def hit(self, key: str) -> tuple[bool, int]:
        if os.getenv("NODE_ENV") != "production":
            return await self.memory.hit(key)
        if problem := shared_quota_problem():
            # A production quota without a shared database and private salt is
            # not a quota. Fail closed instead of silently exposing paid APIs —
            # but say so, because the caller only sees "too many requests".
            self._warn_once(f"{problem}; every {self.bucket!r} request is refused until it is set")
            return False, 0
        salt = env("RATE_LIMIT_SALT") or env("METRICS_ID_SALT")
        digest = hmac.new(salt.encode(), key.encode(), hashlib.sha256).hexdigest()  # type: ignore[union-attr]
        try:
            return await hit_rate_limit(self.bucket, digest, self.limit, self.window_seconds)
        except Exception:
            self._warn_once(f"the {self.bucket!r} quota store could not be reached")
            logger.exception("Shared rate limit lookup failed for bucket %r", self.bucket)
            return False, 0

    def _warn_once(self, message: str) -> None:
        """Loud, but once per cause — this runs on the hot path of every request."""
        if message in self._warned:
            return
        self._warned.add(message)
        logger.error("Rate limiting is failing closed: %s", message)
