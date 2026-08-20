from __future__ import annotations

import logging
import os
import time
from urllib.parse import urlsplit

import httpx
from fastapi import Request
from fastapi.responses import JSONResponse, Response

from .metrics import RELAY_DURATION, RELAY_REQUESTS

logger = logging.getLogger(__name__)

_HOP_BY_HOP = {
    "connection",
    "content-length",
    "host",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
}

# Headers that name who the caller is. The origin trusts `fly-client-ip` to key
# its quotas, so a visitor who can set it through this relay picks their own
# quota identity and never runs out. They are dropped here for the same reason
# `x-academy-client-country` is: an inbound value is the visitor's claim about
# themselves, not an observation of them.
_CLIENT_IDENTITY = {
    "cf-connecting-ip",
    "fly-client-ip",
    "true-client-ip",
    "x-academy-client-country",
    "x-client-ip",
    "x-forwarded-for",
    "x-real-ip",
}


def upstream_api_base_url() -> str | None:
    value = os.getenv("UPSTREAM_API_BASE_URL", "").strip().rstrip("/")
    if not value:
        return None
    parsed = urlsplit(value)
    if parsed.scheme not in (
        {"https"} if os.getenv("NODE_ENV") == "production" else {"http", "https"}
    ):
        raise RuntimeError("UPSTREAM_API_BASE_URL must use HTTPS in production")
    if not parsed.netloc or parsed.query or parsed.fragment:
        raise RuntimeError("UPSTREAM_API_BASE_URL must be an absolute server URL")
    return value


def _new_client() -> httpx.AsyncClient:
    return httpx.AsyncClient(timeout=35, follow_redirects=False)


async def relay_api_request(request: Request, upstream: str) -> Response:
    started = time.perf_counter()
    target = f"{upstream}{request.url.path}"
    if request.url.query:
        target = f"{target}?{request.url.query}"
    headers = {
        name: value
        for name, value in request.headers.items()
        if name.lower() not in _HOP_BY_HOP and name.lower() not in _CLIENT_IDENTITY
    }
    headers["x-forwarded-host"] = request.headers.get("host", "")
    headers["x-forwarded-proto"] = request.url.scheme
    for source in ("cf-ipcountry", "x-replit-user-country", "fly-client-country"):
        candidate = request.headers.get(source, "").strip().upper()
        if len(candidate) == 2 and candidate.isascii() and candidate.isalpha():
            headers["x-academy-client-country"] = candidate
            break

    try:
        async with _new_client() as client:
            upstream_response = await client.request(
                request.method,
                target,
                content=await request.body(),
                headers=headers,
            )
    except httpx.HTTPError:
        RELAY_REQUESTS.labels(request.method, "502").inc()
        RELAY_DURATION.labels(request.method).observe(time.perf_counter() - started)
        logger.exception("Could not reach the configured API upstream")
        return JSONResponse({"error": "API temporarily unavailable"}, status_code=502)

    response_headers: dict[str, str] = {}
    cookies: list[str] = []
    for name, value in upstream_response.headers.multi_items():
        lowered = name.lower()
        if lowered in _HOP_BY_HOP or lowered == "content-encoding":
            continue
        if lowered == "set-cookie":
            cookies.append(value)
        else:
            response_headers[name] = value

    response = Response(
        content=upstream_response.content,
        status_code=upstream_response.status_code,
        headers=response_headers,
    )
    for cookie in cookies:
        response.headers.append("set-cookie", cookie)
    RELAY_REQUESTS.labels(request.method, str(response.status_code)).inc()
    RELAY_DURATION.labels(request.method).observe(time.perf_counter() - started)
    return response
