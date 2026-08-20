from __future__ import annotations

import pytest

from app.integrations import stripe_credentials


@pytest.fixture
def direct_stripe_environment(monkeypatch: pytest.MonkeyPatch) -> tuple[str, str]:
    secret = "sk_test_fixture"
    webhook = "whsec_fixture"
    monkeypatch.setenv("STRIPE_SECRET_KEY", secret)
    monkeypatch.setenv("STRIPE_WEBHOOK_SECRET", webhook)
    monkeypatch.delenv("REPLIT_CONNECTORS_HOSTNAME", raising=False)
    monkeypatch.delenv("REPL_IDENTITY", raising=False)
    monkeypatch.delenv("WEB_REPL_RENEWAL", raising=False)
    return secret, webhook


@pytest.mark.asyncio
async def test_direct_stripe_credentials_work_without_replit(
    direct_stripe_environment: tuple[str, str],
) -> None:
    assert await stripe_credentials() == direct_stripe_environment


@pytest.mark.asyncio
async def test_missing_stripe_configuration_fails_closed(monkeypatch: pytest.MonkeyPatch) -> None:
    for name in (
        "STRIPE_SECRET_KEY",
        "STRIPE_WEBHOOK_SECRET",
        "REPLIT_CONNECTORS_HOSTNAME",
        "REPL_IDENTITY",
        "WEB_REPL_RENEWAL",
    ):
        monkeypatch.delenv(name, raising=False)

    with pytest.raises(RuntimeError, match="Missing Replit environment variables"):
        await stripe_credentials()
