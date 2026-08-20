from __future__ import annotations

import pytest

from app.integrations import stripe_credentials


@pytest.fixture
def direct_stripe_environment(monkeypatch: pytest.MonkeyPatch) -> tuple[str, str]:
    secret = "sk_test_fixture"
    webhook = "whsec_fixture"
    monkeypatch.setenv("STRIPE_SECRET_KEY", secret)
    monkeypatch.setenv("STRIPE_WEBHOOK_SECRET", webhook)
    return secret, webhook


@pytest.mark.asyncio
async def test_stripe_credentials_come_from_backend_secrets(
    direct_stripe_environment: tuple[str, str],
) -> None:
    assert await stripe_credentials() == direct_stripe_environment


@pytest.mark.asyncio
async def test_missing_stripe_configuration_fails_closed(monkeypatch: pytest.MonkeyPatch) -> None:
    for name in (
        "STRIPE_SECRET_KEY",
        "STRIPE_WEBHOOK_SECRET",
    ):
        monkeypatch.delenv(name, raising=False)

    with pytest.raises(RuntimeError, match="STRIPE_SECRET_KEY is not configured"):
        await stripe_credentials()
