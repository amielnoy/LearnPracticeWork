"""What a production deployment does when its quota store is not configured.

This is the failure that took sign-in and the AI proxy down on the live site
and stayed invisible for it: `SharedRateLimiter` fails closed, which is right —
a quota that cannot count must not wave paid API calls through — but the caller
only ever saw `429 Too many requests`, indistinguishable from a real quota, and
nothing in the logs or on /api/readyz said otherwise.
"""

from __future__ import annotations

import logging

import pytest

from app.dependencies import get_database_probe
from app.rate_limit import SharedRateLimiter, shared_quota_problem


@pytest.fixture
def database_available(override_dependency):
    """A reachable database, so readiness gets as far as reporting the quota."""

    async def probe() -> bool:
        return True

    override_dependency(get_database_probe, lambda: probe)


@pytest.fixture
def production(monkeypatch: pytest.MonkeyPatch):
    """A production deployment whose configuration a test then removes a piece of."""
    monkeypatch.setenv("NODE_ENV", "production")
    monkeypatch.setenv("DATABASE_URL", "postgresql://fixture/quotas")
    monkeypatch.setenv("RATE_LIMIT_SALT", "fixture-salt")
    monkeypatch.delenv("METRICS_ID_SALT", raising=False)
    return monkeypatch


def test_a_fully_configured_production_deployment_reports_no_problem(production) -> None:
    assert shared_quota_problem() is None


def test_local_and_test_runs_never_report_a_problem(monkeypatch: pytest.MonkeyPatch) -> None:
    """Outside production the in-memory limiter is the intended path, not a fault."""
    monkeypatch.setenv("NODE_ENV", "development")
    monkeypatch.delenv("DATABASE_URL", raising=False)
    monkeypatch.delenv("RATE_LIMIT_SALT", raising=False)

    assert shared_quota_problem() is None


def test_a_missing_salt_is_named(production) -> None:
    production.delenv("RATE_LIMIT_SALT", raising=False)

    assert shared_quota_problem() == "RATE_LIMIT_SALT (or METRICS_ID_SALT) is not set"


def test_the_metrics_salt_is_accepted_in_its_place(production) -> None:
    production.delenv("RATE_LIMIT_SALT", raising=False)
    production.setenv("METRICS_ID_SALT", "fixture-salt")

    assert shared_quota_problem() is None


def test_a_missing_database_is_named(production) -> None:
    production.delenv("DATABASE_URL", raising=False)
    production.delenv("SUPABASE_DB_PASSWORD", raising=False)

    assert shared_quota_problem() is not None
    assert "database" in shared_quota_problem()


@pytest.mark.asyncio
async def test_an_unconfigured_production_quota_refuses_every_caller(production) -> None:
    """The behaviour is deliberate: no quota means no paid API calls get through."""
    production.delenv("RATE_LIMIT_SALT", raising=False)
    limiter = SharedRateLimiter("ai-burst", 15, 60)

    allowed, remaining = await limiter.hit("ip:198.51.100.4")

    assert allowed is False
    assert remaining == 0


@pytest.mark.asyncio
async def test_the_refusal_is_logged_with_its_cause(
    production, caplog: pytest.LogCaptureFixture
) -> None:
    """Without this the outage is a 429 and nothing else, which is how it hid."""
    production.delenv("RATE_LIMIT_SALT", raising=False)
    limiter = SharedRateLimiter("login", 10, 300)

    with caplog.at_level(logging.ERROR, logger="app.rate_limit"):
        await limiter.hit("ip:198.51.100.4")

    assert any("RATE_LIMIT_SALT" in record.message for record in caplog.records)
    assert any("login" in record.message for record in caplog.records)


@pytest.mark.asyncio
async def test_the_cause_is_logged_once_rather_than_per_request(
    production, caplog: pytest.LogCaptureFixture
) -> None:
    """It runs on the hot path of every request; one line is a report, thousands are noise."""
    production.delenv("RATE_LIMIT_SALT", raising=False)
    limiter = SharedRateLimiter("ai-burst", 15, 60)

    with caplog.at_level(logging.ERROR, logger="app.rate_limit"):
        for _ in range(5):
            await limiter.hit("ip:198.51.100.4")

    assert len(caplog.records) == 1


@pytest.mark.asyncio
async def test_readiness_names_the_problem_without_reporting_an_outage(
    api_client, production, database_available
) -> None:
    """Fly health-checks this path: a 503 here stops the machine, which is worse."""
    production.delenv("RATE_LIMIT_SALT", raising=False)

    response = await api_client.get("/api/readyz")

    assert response.status_code == 200, "a broken quota must not be turned into an outage"
    assert "RATE_LIMIT_SALT" in response.json()["rateLimiting"]
    assert response.json()["status"] == "ready"


@pytest.mark.asyncio
async def test_readiness_stays_quiet_when_quotas_can_count(
    api_client, production, database_available
) -> None:
    response = await api_client.get("/api/readyz")

    assert response.status_code == 200
    assert "rateLimiting" not in response.json()
