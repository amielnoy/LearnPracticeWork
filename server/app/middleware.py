"""The two layers every request passes through before routing.

Registration order matters: metrics is added last so it wraps everything and
therefore also observes the responses the ingress guard short-circuits.
"""

from __future__ import annotations

from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

from .errors import error_response
from .metrics import RequestTimer
from .relay import relay_api_request, upstream_api_base_url
from .settings import MAX_REQUEST_BODY

BODY_TOO_LARGE = "Request body is too large"


class IngressMiddleware(BaseHTTPMiddleware):
    """Bounds the request body, then relays it upstream when this is an edge node.

    Both concerns live in one layer because both need the fully buffered body:
    the limit has to count a chunked upload as it arrives, and the relay has to
    forward those same bytes so a Stripe signature still verifies downstream.
    """

    async def dispatch(self, request: Request, call_next) -> Response:
        if oversized := await self._enforce_body_limit(request):
            return oversized
        if relayed := await self._relay_if_configured(request):
            return relayed
        return await call_next(request)

    @staticmethod
    async def _enforce_body_limit(request: Request) -> Response | None:
        length = request.headers.get("content-length")
        if length and length.isdigit() and int(length) > MAX_REQUEST_BODY:
            return error_response(BODY_TOO_LARGE, 413)
        if request.method not in {"POST", "PUT", "PATCH"}:
            return None
        chunks: list[bytes] = []
        total = 0
        async for chunk in request.stream():
            total += len(chunk)
            if total > MAX_REQUEST_BODY:
                return error_response(BODY_TOO_LARGE, 413)
            chunks.append(chunk)
        # Starlette caches this exact byte string for downstream request.json(),
        # request.body(), and the raw Stripe webhook signature check.
        request._body = b"".join(chunks)  # type: ignore[attr-defined]
        return None

    @staticmethod
    async def _relay_if_configured(request: Request) -> Response | None:
        if not request.url.path.startswith("/api/") or request.url.path == "/api/healthz":
            return None
        upstream = upstream_api_base_url()
        return await relay_api_request(request, upstream) if upstream else None


class MetricsMiddleware(BaseHTTPMiddleware):
    """Counts and times every request except the scrape endpoint itself."""

    async def dispatch(self, request: Request, call_next) -> Response:
        if request.url.path == "/metrics":
            return await call_next(request)
        with RequestTimer(request) as timer:
            try:
                response = await call_next(request)
            except Exception:
                timer.finish(500)
                raise
            timer.finish(response.status_code)
            return response


def install(app: FastAPI) -> None:
    app.add_middleware(IngressMiddleware)
    app.add_middleware(MetricsMiddleware)
