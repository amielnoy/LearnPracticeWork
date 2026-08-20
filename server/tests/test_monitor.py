from __future__ import annotations

import httpx
import pytest
from prometheus_client import generate_latest

from app.monitor import parse_targets, probe_once


def test_monitor_targets_are_fixture_driven_json():
    assert parse_targets(
        '{"fly-api":"https://ata-api.fly.dev/api/healthz","replit":"https://app.replit.app/"}'
    ) == {
        "fly-api": "https://ata-api.fly.dev/api/healthz",
        "replit": "https://app.replit.app/",
    }


@pytest.mark.parametrize(
    "value",
    [
        "[]",
        '{"bad name":"https://example.test"}',
        '{"api":"file:///tmp/secret"}',
        '{"api":"https://user:pass@example.test"}',
    ],
)
def test_monitor_rejects_unsafe_targets(value: str):
    with pytest.raises(ValueError):
        parse_targets(value)


async def test_python_probe_exports_status_and_latency():
    request = httpx.Request("GET", "https://api.example.test/healthz")
    transport = httpx.MockTransport(lambda _: httpx.Response(200, request=request))
    async with httpx.AsyncClient(transport=transport) as client:
        await probe_once(client, "fixture-api", str(request.url))
    metrics = generate_latest().decode()
    assert (
        'academy_server_up{server="fixture-api",url="https://api.example.test/healthz"} 1.0'
        in metrics
    )
    assert 'academy_server_http_status{server="fixture-api"' in metrics
