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


async def test_the_window_is_set_once_when_the_key_is_created(fake):
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
