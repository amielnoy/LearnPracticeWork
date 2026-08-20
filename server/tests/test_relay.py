from __future__ import annotations

import httpx
import pytest

from app import relay


async def test_relay_preserves_login_cookie_and_stripe_webhook(
    api_client, monkeypatch: pytest.MonkeyPatch
):
    requests: list[httpx.Request] = []

    def upstream(request: httpx.Request) -> httpx.Response:
        requests.append(request)
        if request.url.path == "/api/auth/google":
            return httpx.Response(
                200,
                json={"user": {"name": "Reader"}},
                headers={
                    "set-cookie": "ata_session=signed; Path=/api; HttpOnly; Secure; SameSite=lax"
                },
                request=request,
            )
        return httpx.Response(204, request=request)

    transport = httpx.MockTransport(upstream)
    original_client = httpx.AsyncClient
    monkeypatch.setenv("NODE_ENV", "production")
    monkeypatch.setenv("UPSTREAM_API_BASE_URL", "https://ata-api.fly.dev")
    monkeypatch.setattr(
        relay, "_new_client", lambda: original_client(transport=transport, follow_redirects=False)
    )

    login = await api_client.post(
        "/api/auth/google",
        headers={"origin": "https://free-tier-insights--amielpeled.replit.app"},
        json={"credential": "google-fixture"},
    )
    assert login.status_code == 200
    assert "HttpOnly" in login.headers["set-cookie"]
    assert requests[0].url == "https://ata-api.fly.dev/api/auth/google"
    assert requests[0].headers["origin"] == "https://free-tier-insights--amielpeled.replit.app"
    assert requests[0].headers["x-forwarded-host"] == "test"

    body = b'{"type":"checkout.session.completed"}'
    webhook = await api_client.post(
        "/api/stripe/webhook?source=replit",
        headers={"stripe-signature": "t=123,v1=fixture"},
        content=body,
    )
    assert webhook.status_code == 204
    assert requests[1].url == "https://ata-api.fly.dev/api/stripe/webhook?source=replit"
    assert requests[1].headers["stripe-signature"] == "t=123,v1=fixture"
    assert requests[1].content == body

    health = await api_client.get("/api/healthz")
    assert health.status_code == 200
    assert health.json() == {"status": "ok"}
    assert len(requests) == 2


def test_production_relay_requires_https(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setenv("NODE_ENV", "production")
    monkeypatch.setenv("UPSTREAM_API_BASE_URL", "http://api.example.test")
    with pytest.raises(RuntimeError, match="must use HTTPS"):
        relay.upstream_api_base_url()
