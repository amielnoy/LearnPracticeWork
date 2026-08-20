from __future__ import annotations

import pytest

from app.integrations import stripe_credentials


@pytest.mark.asyncio
async def test_stripe_credentials_come_from_backend_secrets(
    stripe_environment: tuple[str, str],
) -> None:
    assert await stripe_credentials() == stripe_environment


@pytest.mark.asyncio
async def test_missing_stripe_configuration_fails_closed(monkeypatch: pytest.MonkeyPatch) -> None:
    for name in (
        "STRIPE_SECRET_KEY",
        "STRIPE_WEBHOOK_SECRET",
    ):
        monkeypatch.delenv(name, raising=False)

    with pytest.raises(RuntimeError, match="STRIPE_SECRET_KEY is not configured"):
        await stripe_credentials()


@pytest.mark.asyncio
async def test_checkout_returns_to_the_allowlisted_replit_app(
    api_client,
    stripe_checkout_gateway,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    replit_host = "free-tier-insights--amielpeled.replit.app"
    monkeypatch.setenv("REPLIT_DOMAINS", replit_host)

    response = await api_client.post(
        "/api/stripe/checkout",
        headers={"origin": f"https://{replit_host}"},
        json={"priceId": "price_fixture"},
    )

    assert response.status_code == 200
    assert response.json() == {"url": "https://checkout.stripe.test/session"}
    assert stripe_checkout_gateway["success_url"].startswith(f"https://{replit_host}/")
    assert stripe_checkout_gateway["cancel_url"].startswith(f"https://{replit_host}/")


@pytest.mark.asyncio
async def test_checkout_rejects_an_untrusted_redirect_origin(
    api_client,
    stripe_checkout_gateway,
) -> None:
    response = await api_client.post(
        "/api/stripe/checkout",
        headers={"origin": "https://attacker.example"},
        json={"priceId": "price_fixture"},
    )

    assert response.status_code == 200
    assert stripe_checkout_gateway["success_url"].startswith("http://test/")
    assert "attacker.example" not in stripe_checkout_gateway["success_url"]
