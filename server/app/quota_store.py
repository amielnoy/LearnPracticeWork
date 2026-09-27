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


def _client() -> Any:
    url = redis_url()
    if url is None:
        raise RuntimeError("no Redis URL is configured")
    return redis.from_url(url, decode_responses=True)


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
