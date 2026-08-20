from __future__ import annotations

import pytest


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
