from __future__ import annotations

import asyncio
import time
from collections import defaultdict, deque


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
