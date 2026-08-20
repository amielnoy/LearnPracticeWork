from __future__ import annotations

from types import SimpleNamespace

import pytest

from app import main as main_module
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
    course_sales_environment,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    replit_host = "free-tier-insights--amielpeled.replit.app"
    monkeypatch.setenv("REPLIT_DOMAINS", replit_host)

    response = await api_client.post(
        "/api/stripe/checkout",
        headers={"origin": f"https://{replit_host}"},
        json={"acceptedTerms": True, "locale": "en"},
    )

    assert response.status_code == 200
    assert response.json() == {"url": "https://checkout.stripe.test/session"}
    assert stripe_checkout_gateway["success_url"].startswith(f"https://{replit_host}/")
    assert stripe_checkout_gateway["cancel_url"].startswith(f"https://{replit_host}/")
    assert stripe_checkout_gateway["line_items"] == [
        {"price": course_sales_environment["STRIPE_COURSE_PRICE_ID"], "quantity": 1}
    ]
    assert stripe_checkout_gateway["metadata"]["courseSku"] == "ai-testing-bootcamp"
    assert stripe_checkout_gateway["automatic_tax"] == {"enabled": True}
    assert stripe_checkout_gateway["consent_collection"] == {"terms_of_service": "required"}
    assert "1 Test Street" in stripe_checkout_gateway["custom_text"]["submit"]["message"]


@pytest.mark.asyncio
async def test_checkout_rejects_an_untrusted_redirect_origin(
    api_client,
    stripe_checkout_gateway,
    course_sales_environment,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    canonical = "https://academy.example"
    monkeypatch.setenv("NODE_ENV", "production")
    monkeypatch.setenv("ALLOWED_ORIGINS", canonical)
    monkeypatch.setenv("PUBLIC_APP_ORIGIN", canonical)
    response = await api_client.post(
        "/api/stripe/checkout",
        headers={"origin": "https://attacker.example"},
        json={"acceptedTerms": True, "locale": "he"},
    )

    assert response.status_code == 200
    assert stripe_checkout_gateway["success_url"].startswith(f"{canonical}/")
    assert "attacker.example" not in stripe_checkout_gateway["success_url"]


@pytest.mark.asyncio
async def test_checkout_rejects_a_client_supplied_price(
    api_client,
    stripe_checkout_gateway,
    course_sales_environment,
) -> None:
    response = await api_client.post(
        "/api/stripe/checkout",
        json={"acceptedTerms": True, "priceId": "price_cheaper_product"},
    )

    assert response.status_code == 400
    assert stripe_checkout_gateway == {}


@pytest.mark.asyncio
async def test_webhook_does_not_grant_access_for_a_different_stripe_price(
    api_client,
    course_sales_environment,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    event = SimpleNamespace(
        type="checkout.session.completed",
        data=SimpleNamespace(object=SimpleNamespace(id="cs_foreign", payment_status="paid")),
    )
    full = SimpleNamespace(
        id="cs_foreign",
        customer_details=SimpleNamespace(email="buyer@example.com"),
        customer_email=None,
        line_items=SimpleNamespace(
            data=[
                SimpleNamespace(
                    price=SimpleNamespace(id="price_cheaper_product", product="prod_other")
                )
            ]
        ),
        metadata={"courseSku": "ai-testing-bootcamp", "termsVersion": "2026-08-20"},
        amount_total=100,
        currency="usd",
        payment_intent="pi_fixture",
        customer="cus_fixture",
    )
    recorded: list[dict] = []

    async def credentials() -> tuple[str, str]:
        return "sk_test_fixture", "whsec_fixture"

    async def record(values: dict) -> None:
        recorded.append(values)

    client = SimpleNamespace(
        v1=SimpleNamespace(
            checkout=SimpleNamespace(
                sessions=SimpleNamespace(retrieve=lambda *_args, **_kwargs: full)
            )
        )
    )
    monkeypatch.setattr(main_module, "stripe_credentials", credentials)
    monkeypatch.setattr(main_module.stripe.Webhook, "construct_event", lambda *_args: event)
    monkeypatch.setattr(main_module.stripe, "StripeClient", lambda _key: client)
    monkeypatch.setattr(main_module, "record_purchase", record)

    response = await api_client.post(
        "/api/stripe/webhook",
        content=b"{}",
        headers={"stripe-signature": "fixture"},
    )

    assert response.status_code == 200
    assert recorded == []


@pytest.mark.asyncio
async def test_webhook_grants_access_only_for_the_approved_catalog(
    api_client,
    course_sales_environment,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    event = SimpleNamespace(
        type="checkout.session.completed",
        data=SimpleNamespace(object=SimpleNamespace(id="cs_approved", payment_status="paid")),
    )
    full = SimpleNamespace(
        id="cs_approved",
        customer_details=SimpleNamespace(email="Buyer@Example.com"),
        customer_email=None,
        line_items=SimpleNamespace(
            data=[
                SimpleNamespace(
                    price=SimpleNamespace(
                        id=course_sales_environment["STRIPE_COURSE_PRICE_ID"],
                        product=course_sales_environment["STRIPE_COURSE_PRODUCT_ID"],
                    )
                )
            ]
        ),
        metadata={"courseSku": "ai-testing-bootcamp", "termsVersion": "2026-08-20"},
        amount_total=5000,
        currency="usd",
        payment_intent="pi_fixture",
        customer="cus_fixture",
    )
    recorded: list[dict] = []

    async def credentials() -> tuple[str, str]:
        return "sk_test_fixture", "whsec_fixture"

    async def record(values: dict) -> None:
        recorded.append(values)

    client = SimpleNamespace(
        v1=SimpleNamespace(
            checkout=SimpleNamespace(
                sessions=SimpleNamespace(retrieve=lambda *_args, **_kwargs: full)
            )
        )
    )
    monkeypatch.setattr(main_module, "stripe_credentials", credentials)
    monkeypatch.setattr(main_module.stripe.Webhook, "construct_event", lambda *_args: event)
    monkeypatch.setattr(main_module.stripe, "StripeClient", lambda _key: client)
    monkeypatch.setattr(main_module, "record_purchase", record)

    response = await api_client.post(
        "/api/stripe/webhook",
        content=b"{}",
        headers={"stripe-signature": "fixture"},
    )

    assert response.status_code == 200
    assert len(recorded) == 1
    assert recorded[0]["email"] == "buyer@example.com"
    assert recorded[0]["product_id"] == course_sales_environment["STRIPE_COURSE_PRODUCT_ID"]


@pytest.mark.asyncio
async def test_chunked_body_cannot_bypass_the_request_limit(api_client) -> None:
    async def chunks():
        for _ in range(100):
            yield b"x" * 1024

    response = await api_client.post(
        "/api/ai/generate",
        content=chunks(),
        headers={"content-type": "application/json"},
    )

    assert response.status_code == 413
    assert response.json() == {"error": "Request body is too large"}
