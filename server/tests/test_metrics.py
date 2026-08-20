from __future__ import annotations

import pytest

from app.metrics import user_id


async def test_metrics_include_fastapi_request_history(api_client):
    await api_client.get("/api/healthz")
    response = await api_client.get("/metrics")
    assert response.status_code == 200
    assert "academy_http_requests_total" in response.text
    assert 'route="/api/healthz"' in response.text


async def test_production_metrics_require_the_backend_token(
    api_client, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NODE_ENV", "production")
    monkeypatch.setenv("METRICS_TOKEN", "fixture-metrics-token")
    assert (await api_client.get("/metrics")).status_code == 404
    response = await api_client.get(
        "/metrics", headers={"authorization": "Bearer fixture-metrics-token"}
    )
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/plain")


async def test_login_metrics_pseudonymize_user_and_classify_country_and_ios(
    api_client,
    google_jwks,
    google_token,
    client_headers,
    monkeypatch: pytest.MonkeyPatch,
):
    monkeypatch.setenv("METRICS_ID_SALT", "fixture-metrics-salt")
    response = await api_client.post(
        "/api/auth/google",
        json={"credential": google_token()},
        headers=client_headers("IL", "ios"),
    )
    assert response.status_code == 200
    metrics = (await api_client.get("/metrics")).text
    pseudonym = user_id("reader@example.com")
    assert "reader@example.com" not in metrics
    assert "שרה כהן" not in metrics
    assert (
        f'academy_logins_total{{client="ios",country="IL",outcome="success",user="{pseudonym}"}}'
        in metrics
    )


async def test_ai_metrics_include_provider_model_country_and_android(
    api_client, client_headers, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.delenv("GROQ_API_KEY", raising=False)
    response = await api_client.post(
        "/api/ai/generate",
        json={"messages": [{"role": "user", "content": "fixture prompt"}]},
        headers=client_headers("US", "android"),
    )
    assert response.status_code == 503
    metrics = (await api_client.get("/metrics")).text
    assert "fixture prompt" not in metrics
    assert (
        'academy_ai_requests_total{client="android",country="US",model="openai/gpt-oss-120b",'
        'provider="groq",status="503",user="anonymous"}' in metrics
    )
