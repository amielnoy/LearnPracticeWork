"""Rate-limit counters in Redis.

These replace the `api_rate_limits` table, which was emulating `INCR` with an
upsert and a window comparison. The key is the same HMAC digest the Postgres
row was keyed by, so no raw identity reaches the store here either.

The window is a key expiry rather than a stored timestamp: a bucket's first hit
creates the key and sets its TTL, and the key disappearing is what starts the
next window. That is why `expire` is called with `nx=True` — a later hit inside
the same window must not push the window out, which would let a steady caller
hold a quota open forever.
"""

from __future__ import annotations

from typing import Any

import redis.asyncio as redis

from .config import env


def redis_url() -> str | None:
    """The connection string, under any of the names an integration may set."""
    return env("REDIS_URL") or env("KV_URL") or env("REDIS_TLS_URL")


# The one client this process uses, with the URL it was built for. A
# `redis.asyncio` client *is* a connection pool and is safe to share, so a new
# one per call bought nothing and cost a TCP+TLS handshake on every AI, sign-in
# and admin request — none of them ever closed, reclaimed only by `__del__`.
# Under burst traffic that reaches a hosted connection cap, `hit_rate_limit`
# raises, and the AI buckets refuse with a 429 indistinguishable from an
# exhausted quota: the exact failure this branch exists to remove.
_cached: tuple[str, Any] | None = None


def _client() -> Any:
    """The shared client, built on first use.

    Never at import time: `redis_url()` reads the environment, and the URL is
    part of the cache key so a changed one is honoured rather than served stale.
    """
    global _cached
    url = redis_url()
    if url is None:
        raise RuntimeError("no Redis URL is configured")
    if _cached is None or _cached[0] != url:
        _cached = (url, redis.from_url(url, decode_responses=True))
    return _cached[1]


def reset_client() -> None:
    """Forget the cached client. A seam for tests, like `MemoryRateLimiter.reset`.

    Module state that outlives a test is state the next test inherits, and the
    URL these are keyed on is something tests set per test.
    """
    global _cached
    _cached = None


def _key(bucket: str, key_hash: str) -> str:
    return f"quota:{bucket}:{key_hash}"


async def hit_rate_limit(
    bucket: str, key_hash: str, limit: int, window_seconds: float
) -> tuple[bool, int]:
    key = _key(bucket, key_hash)
    client = _client()
    hits = await client.incr(key)
    await client.expire(key, int(window_seconds), nx=True)
    return hits <= limit, max(0, limit - hits)


async def release_rate_limit(bucket: str, key_hash: str) -> int:
    """Give back a hit that bought the caller nothing, and report what is left.

    Never below zero: a release that outran its hit would otherwise mint quota.
    """
    key = _key(bucket, key_hash)
    client = _client()
    hits = await client.decr(key)
    if hits < 0:
        await client.set(key, 0)
        hits = 0
    return hits
