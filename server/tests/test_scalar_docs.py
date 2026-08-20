from __future__ import annotations


async def test_scalar_reference_is_served_without_agent_telemetry_or_proxy(api_client):
    response = await api_client.get("/api/docs")

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/html")
    assert "AI Testing Academy API Reference" in response.text
    assert '"telemetry": false' in response.text
    assert '"persistAuth": true' not in response.text
    assert '"disabled": true' in response.text
    assert "proxy.scalar.com" not in response.text


async def test_runtime_openapi_document_drives_scalar(api_client):
    response = await api_client.get("/api/openapi.json")

    assert response.status_code == 200
    document = response.json()
    assert document["info"] == {
        "title": "AI Testing Academy API",
        "version": "0.1.0",
    }
    assert "/api/healthz" in document["paths"]
    assert "/api/docs" not in document["paths"]
