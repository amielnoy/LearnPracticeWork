from __future__ import annotations

import asyncio
import hashlib
import hmac
import os
import time
from collections import defaultdict, deque

from .config import database_url, env
from .database import hit_rate_limit


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

    async def hit(self, key: str) -> tuple[bool, int]:
        if os.getenv("NODE_ENV") != "production":
            return await self.memory.hit(key)
        salt = env("RATE_LIMIT_SALT") or env("METRICS_ID_SALT")
        if not database_url() or not salt:
            # A production quota without a shared database and private salt is
            # not a quota. Fail closed instead of silently exposing paid APIs.
            return False, 0
        digest = hmac.new(salt.encode(), key.encode(), hashlib.sha256).hexdigest()
        try:
            return await hit_rate_limit(self.bucket, digest, self.limit, self.window_seconds)
        except Exception:
            return False, 0
