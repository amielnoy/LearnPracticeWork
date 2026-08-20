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
async def test_a_quota_guarding_a_billed_key_refuses_every_caller(production) -> None:
    """The behaviour is deliberate: no quota means no paid API calls get through."""
    production.delenv("RATE_LIMIT_SALT", raising=False)
    limiter = SharedRateLimiter("ai-burst", 15, 60)

    allowed, remaining = await limiter.hit("ip:198.51.100.4")

    assert allowed is False
    assert remaining == 0


@pytest.mark.asyncio
async def test_a_credential_quota_degrades_instead_of_taking_authentication_down(
    production,
) -> None:
    """Refusing every sign-in protects nothing — the token is verified either way."""
    production.delenv("RATE_LIMIT_SALT", raising=False)
    limiter = SharedRateLimiter("login", 10, 300, when_unavailable="degrade")

    allowed, remaining = await limiter.hit("ip:198.51.100.4")

    assert allowed is True
    assert remaining == 9


@pytest.mark.asyncio
async def test_a_degraded_quota_is_still_a_quota(production) -> None:
    """Degrading is a fallback to a per-worker bound, not to no bound at all."""
    production.delenv("RATE_LIMIT_SALT", raising=False)
    limiter = SharedRateLimiter("login", 3, 300, when_unavailable="degrade")

    results = [await limiter.hit("ip:198.51.100.4") for _ in range(5)]

    assert [allowed for allowed, _ in results] == [True, True, True, False, False]


@pytest.mark.asyncio
async def test_a_degraded_quota_still_separates_callers(production) -> None:
    production.delenv("RATE_LIMIT_SALT", raising=False)
    limiter = SharedRateLimiter("login", 1, 300, when_unavailable="degrade")

    first, _ = await limiter.hit("ip:198.51.100.4")
    other, _ = await limiter.hit("ip:203.0.113.9")

    assert (first, other) == (True, True), "one caller must not spend another's allowance"


def test_refusing_is_the_default_so_a_new_bucket_cannot_inherit_leniency() -> None:
    assert SharedRateLimiter("something-new", 5, 60).when_unavailable == "refuse"


@pytest.mark.asyncio
async def test_the_refusal_is_logged_with_its_cause(
    production, caplog: pytest.LogCaptureFixture
) -> None:
    """Without this the outage is a 429 and nothing else, which is how it hid."""
    production.delenv("RATE_LIMIT_SALT", raising=False)
    limiter = SharedRateLimiter("login", 10, 300, when_unavailable="degrade")

    with caplog.at_level(logging.ERROR, logger="app.rate_limit"):
        await limiter.hit("ip:198.51.100.4")

    logged = " ".join(record.getMessage() for record in caplog.records)
    assert "RATE_LIMIT_SALT" in logged
    assert "login" in logged


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


@pytest.mark.asyncio
async def test_sign_in_survives_a_production_deployment_with_no_salt(
    api_client, production
) -> None:
    """The reported outage, as a test.

    A production deployment with no RATE_LIMIT_SALT used to answer every
    credential POST with 429, so nobody could sign in and the site told them
    they had tried too often. The login quota degrades now, so the request
    reaches verification and is judged on the credential itself — 401 here,
    because this one is not a Google token. Any status but 429 is the point.
    """
    production.delenv("RATE_LIMIT_SALT", raising=False)

    response = await api_client.post("/api/auth/google", json={"credential": "not-a-token"})

    assert response.status_code != 429, "a missing salt must not present as an exhausted quota"
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_the_ai_proxy_still_refuses_when_the_quota_cannot_count(
    api_client, production
) -> None:
    """The other half of the trade: sign-in recovers, the billed key stays shut."""
    production.delenv("RATE_LIMIT_SALT", raising=False)

    response = await api_client.post(
        "/api/ai/generate", json={"messages": [{"role": "user", "content": "hi"}]}
    )

    assert response.status_code == 429


@pytest.mark.asyncio
async def test_a_hit_can_be_given_back(production) -> None:
    """Outside a shared store this is the in-memory path, which tests exercise."""
    production.setenv("NODE_ENV", "development")
    limiter = SharedRateLimiter("ai-daily", 10, 86_400)

    await limiter.hit("ip:198.51.100.4")
    remaining = await limiter.release("ip:198.51.100.4")

    assert remaining == 10


@pytest.mark.asyncio
async def test_giving_back_more_than_was_taken_cannot_go_negative(production) -> None:
    production.setenv("NODE_ENV", "development")
    limiter = SharedRateLimiter("ai-daily", 10, 86_400)

    await limiter.release("ip:198.51.100.4")
    await limiter.release("ip:198.51.100.4")

    assert (await limiter.hit("ip:198.51.100.4"))[1] == 9


@pytest.mark.asyncio
async def test_a_refused_provider_does_not_spend_the_daily_allowance(
    api_client, override_dependency
) -> None:
    """The reported case: Groq refuses a large request, and ten a day is not many.

    A caller who receives nothing must not be charged for it. Retrying is still
    bounded by the burst limiter, so handing the allowance back cannot become a
    way around the quota.
    """
    from app.ai_gateway import AiOutcome
    from app.dependencies import get_ai_gateway

    class RefusingGateway:
        def target(self, body):
            return "groq", "openai/gpt-oss-120b"

        def advertised_config(self):
            return {}

        async def generate(self, body) -> AiOutcome:
            return AiOutcome(429, {"error": "The AI provider could not complete this request."})

    override_dependency(get_ai_gateway, RefusingGateway)

    first = await api_client.post(
        "/api/ai/generate", json={"messages": [{"role": "user", "content": "hi"}]}
    )
    second = await api_client.post(
        "/api/ai/generate", json={"messages": [{"role": "user", "content": "hi"}]}
    )

    assert first.status_code == 429
    assert first.headers["X-AI-Quota-Remaining"] == second.headers["X-AI-Quota-Remaining"], (
        "two refused requests in a row must leave the allowance where it started"
    )


@pytest.mark.asyncio
async def test_an_answered_request_does_spend_the_allowance(
    api_client, override_dependency
) -> None:
    """The other half: a request that returns text is charged for, as it should be."""
    from app.ai_gateway import AiOutcome
    from app.dependencies import get_ai_gateway

    class AnsweringGateway:
        def target(self, body):
            return "groq", "openai/gpt-oss-120b"

        def advertised_config(self):
            return {}

        async def generate(self, body) -> AiOutcome:
            return AiOutcome(200, {"text": "answer", "truncated": False})

    override_dependency(get_ai_gateway, AnsweringGateway)

    first = await api_client.post(
        "/api/ai/generate", json={"messages": [{"role": "user", "content": "hi"}]}
    )
    second = await api_client.post(
        "/api/ai/generate", json={"messages": [{"role": "user", "content": "hi"}]}
    )

    assert int(second.headers["X-AI-Quota-Remaining"]) < int(first.headers["X-AI-Quota-Remaining"])
