from __future__ import annotations

import pytest

from app import relay


async def test_relay_preserves_login_cookie_and_stripe_webhook(api_client, relay_requests):
    login = await api_client.post(
        "/api/auth/google",
        headers={
            "origin": "https://free-tier-insights--amielpeled.replit.app",
            "cf-ipcountry": "IL",
        },
        json={"credential": "google-fixture"},
    )
    assert login.status_code == 200
    assert "HttpOnly" in login.headers["set-cookie"]
    assert relay_requests[0].url == "https://ata-api.fly.dev/api/auth/google"
    assert (
        relay_requests[0].headers["origin"] == "https://free-tier-insights--amielpeled.replit.app"
    )
    assert relay_requests[0].headers["x-forwarded-host"] == "test"
    assert relay_requests[0].headers["x-academy-client-country"] == "IL"

    body = b'{"type":"checkout.session.completed"}'
    webhook = await api_client.post(
        "/api/stripe/webhook?source=replit",
        headers={"stripe-signature": "t=123,v1=fixture"},
        content=body,
    )
    assert webhook.status_code == 204
    assert relay_requests[1].url == "https://ata-api.fly.dev/api/stripe/webhook?source=replit"
    assert relay_requests[1].headers["stripe-signature"] == "t=123,v1=fixture"
    assert relay_requests[1].content == body

    health = await api_client.get("/api/healthz")
    assert health.status_code == 200
    assert health.json() == {"status": "ok"}
    assert len(relay_requests) == 2


def test_production_relay_requires_https(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setenv("NODE_ENV", "production")
    monkeypatch.setenv("UPSTREAM_API_BASE_URL", "http://api.example.test")
    with pytest.raises(RuntimeError, match="must use HTTPS"):
        relay.upstream_api_base_url()


@pytest.mark.parametrize(
    "header",
    ["fly-client-ip", "x-forwarded-for", "x-real-ip", "cf-connecting-ip", "true-client-ip"],
)
@pytest.mark.asyncio
async def test_relay_drops_a_client_supplied_identity_header(
    api_client, relay_requests, header: str
) -> None:
    """The origin keys its quotas on these, so a forwarded one is a free quota.

    The relay is the only thing between a visitor and the API, and everything it
    forwards arrives at the origin looking like the origin's own edge told it so.
    A visitor who can set `fly-client-ip` through it picks a fresh quota identity
    per request and never reaches a limit.
    """
    await api_client.get("/api/healthz2", headers={header: "203.0.113.77"})

    assert relay_requests, "the request should have been relayed"
    assert header not in relay_requests[0].headers


@pytest.mark.asyncio
async def test_relay_still_forwards_the_headers_the_api_needs(api_client, relay_requests) -> None:
    """The strip is narrow: authentication and content headers have to survive it."""
    await api_client.post(
        "/api/auth/google",
        json={"credential": "x"},
        headers={"authorization": "Bearer token", "fly-client-ip": "203.0.113.77"},
    )

    forwarded = relay_requests[0].headers
    assert forwarded["authorization"] == "Bearer token"
    assert forwarded["content-type"] == "application/json"
    assert "fly-client-ip" not in forwarded
