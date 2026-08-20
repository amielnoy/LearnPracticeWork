from __future__ import annotations

import asyncio
import json
import logging
import os
import re
import time
from urllib.parse import urlsplit

import httpx
from prometheus_client import Gauge, start_http_server

logger = logging.getLogger(__name__)

SERVER_UP = Gauge(
    "academy_server_up",
    "Whether a configured academy server returned a successful HTTP response.",
    ("server", "url"),
)
SERVER_LATENCY = Gauge(
    "academy_server_probe_duration_seconds",
    "Duration of the latest academy server probe.",
    ("server", "url"),
)
SERVER_STATUS = Gauge(
    "academy_server_http_status",
    "HTTP status returned by the latest academy server probe, or zero on connection failure.",
    ("server", "url"),
)
SERVER_LAST_SUCCESS = Gauge(
    "academy_server_last_success_timestamp_seconds",
    "Unix timestamp of the latest successful academy server probe.",
    ("server", "url"),
)

_NAME = re.compile(r"^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,62}$")


def parse_targets(raw: str | None) -> dict[str, str]:
    if not raw:
        return {}
    value = json.loads(raw)
    if not isinstance(value, dict):
        raise ValueError("MONITORED_SERVERS must be a JSON object")
    targets: dict[str, str] = {}
    for name, url in value.items():
        if not isinstance(name, str) or not _NAME.fullmatch(name):
            raise ValueError(f"Invalid monitored server name: {name!r}")
        if not isinstance(url, str):
            raise ValueError(f"URL for {name} must be a string")
        parsed = urlsplit(url)
        if (
            parsed.scheme not in {"http", "https"}
            or not parsed.netloc
            or parsed.username
            or parsed.password
        ):
            raise ValueError(f"URL for {name} must be absolute HTTP(S)")
        targets[name] = url
    return targets


async def probe_once(client: httpx.AsyncClient, name: str, url: str) -> None:
    started = time.perf_counter()
    status = 0
    successful = False
    try:
        response = await client.get(url)
        status = response.status_code
        successful = response.is_success
    except httpx.HTTPError as exc:
        logger.warning("Server probe failed for %s: %s", name, exc)
    labels = {"server": name, "url": url}
    SERVER_UP.labels(**labels).set(1 if successful else 0)
    SERVER_STATUS.labels(**labels).set(status)
    SERVER_LATENCY.labels(**labels).set(time.perf_counter() - started)
    if successful:
        SERVER_LAST_SUCCESS.labels(**labels).set_to_current_time()


async def run() -> None:
    logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO").upper())
    targets = parse_targets(os.getenv("MONITORED_SERVERS"))
    if not targets:
        raise RuntimeError("MONITORED_SERVERS contains no targets")
    interval = max(5, int(os.getenv("PROBE_INTERVAL_SECONDS", "30")))
    port = int(os.getenv("PORT", "9108"))
    start_http_server(port)
    logger.info("Python monitor listening on :%s for %s servers", port, len(targets))
    async with httpx.AsyncClient(timeout=10, follow_redirects=True) as client:
        while True:
            await asyncio.gather(*(probe_once(client, name, url) for name, url in targets.items()))
            await asyncio.sleep(interval)


if __name__ == "__main__":
    asyncio.run(run())
