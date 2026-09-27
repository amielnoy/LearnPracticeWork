"""Quota counting on Redis: the window, the verdict, and giving a hit back."""

from __future__ import annotations

import pytest

from app import quota_store


class FakeRedis:
    """Counts like Redis does, and records the expiries it was asked to set."""

    def __init__(self) -> None:
        self.values: dict[str, int] = {}
        self.expiries: list[tuple[str, int]] = []

    async def incr(self, key: str) -> int:
        self.values[key] = self.values.get(key, 0) + 1
        return self.values[key]

    async def expire(self, key: str, seconds: int, nx: bool = False) -> bool:
        # Records the ask rather than modelling `NX`: what stops a later hit
        # pushing the window out is Redis refusing to set a TTL on a key that
        # already has one. See the window test below.
        assert nx is True, "a hit must never be able to extend a window it did not open"
        self.expiries.append((key, seconds))
        return True

    async def decr(self, key: str) -> int:
        self.values[key] = self.values.get(key, 0) - 1
        return self.values[key]

    async def set(self, key: str, value: int) -> None:
        self.values[key] = value


@pytest.fixture
def fake(monkeypatch) -> FakeRedis:
    client = FakeRedis()
    monkeypatch.setattr(quota_store, "_client", lambda: client)
    return client


async def test_first_hit_is_allowed_and_reports_what_is_left(fake):
    allowed, remaining = await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    assert (allowed, remaining) == (True, 9)


async def test_the_hit_that_exceeds_the_limit_is_refused(fake):
    for _ in range(10):
        await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    allowed, remaining = await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    assert (allowed, remaining) == (False, 0)


async def test_every_hit_asks_for_the_same_window_and_asks_for_it_the_same_way(fake):
    """The name used to claim the window was set once; it is *asked for* on every hit.

    What makes the later asks no-ops is `nx=True`, inside Redis: `EXPIRE … NX`
    sets a TTL only on a key that has none. So the window is not pushed out by a
    steady caller, which would let one hold a quota open forever — but that is
    Redis' guarantee, not something this call site can be observed to do, and
    `FakeRedis` records the asks rather than pretending to enforce it. Pinning
    the *seconds* is the point: every hit on a bucket must name one window.
    """
    await quota_store.hit_rate_limit("ai-burst", "abc", 5, 60)
    await quota_store.hit_rate_limit("ai-burst", "abc", 5, 60)
    assert fake.expiries == [("quota:ai-burst:abc", 60), ("quota:ai-burst:abc", 60)]


async def test_buckets_do_not_share_a_key(fake):
    await quota_store.hit_rate_limit("ai-burst", "abc", 5, 60)
    _, remaining = await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    assert remaining == 9


async def test_release_gives_one_back_and_never_goes_below_zero(fake):
    await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    assert await quota_store.release_rate_limit("ai-daily", "abc") == 0
    assert await quota_store.release_rate_limit("ai-daily", "abc") == 0


@pytest.fixture
def counting(monkeypatch) -> list[str]:
    """Count `redis.from_url` calls instead of stubbing `_client` itself."""
    built: list[str] = []

    def from_url(url: str, **kwargs: object) -> FakeRedis:
        built.append(url)
        return FakeRedis()

    monkeypatch.setenv("REDIS_URL", "redis://fixture-host:6379/0")
    monkeypatch.setattr(quota_store.redis, "from_url", from_url)
    quota_store.reset_client()
    return built


async def test_repeated_calls_reuse_one_client(counting):
    """A client per call paid a TCP+TLS handshake on every AI, sign-in and admin
    request and never closed it, so a hosted connection cap is reached under
    burst traffic — at which point `hit_rate_limit` raises and the AI buckets
    refuse with a 429 indistinguishable from an exhausted quota."""
    for _ in range(3):
        await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    await quota_store.release_rate_limit("ai-daily", "abc")

    assert counting == ["redis://fixture-host:6379/0"]


async def test_a_changed_url_is_not_served_from_the_cached_client(counting, monkeypatch):
    """The URL comes from the environment, which a test changes per test."""
    await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)
    monkeypatch.setenv("REDIS_URL", "redis://other-host:6379/0")
    await quota_store.hit_rate_limit("ai-daily", "abc", 10, 86400)

    assert counting == ["redis://fixture-host:6379/0", "redis://other-host:6379/0"]


async def test_no_client_is_built_when_no_url_is_configured(counting, monkeypatch):
    """Nothing may be created at import time either: this is read per call."""
    monkeypatch.delenv("REDIS_URL", raising=False)
    monkeypatch.delenv("KV_URL", raising=False)
    monkeypatch.delenv("REDIS_TLS_URL", raising=False)

    with pytest.raises(RuntimeError):
        quota_store._client()

    assert counting == []
