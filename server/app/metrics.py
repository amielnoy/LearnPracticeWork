from __future__ import annotations

import hmac
import os
import time

from fastapi import Request
from fastapi.responses import Response
from prometheus_client import CONTENT_TYPE_LATEST, Counter, Gauge, Histogram, generate_latest

HTTP_REQUESTS = Counter(
    "academy_http_requests_total",
    "HTTP requests handled by the Python API.",
    ("method", "route", "status"),
)
HTTP_DURATION = Histogram(
    "academy_http_request_duration_seconds",
    "Python API request duration in seconds.",
    ("method", "route"),
)
HTTP_IN_PROGRESS = Gauge(
    "academy_http_requests_in_progress",
    "Python API requests currently being handled.",
    ("method",),
)
RELAY_REQUESTS = Counter(
    "academy_relay_requests_total",
    "Requests relayed from a secretless edge deployment to the backend.",
    ("method", "status"),
)
RELAY_DURATION = Histogram(
    "academy_relay_request_duration_seconds",
    "Duration of upstream API relay requests in seconds.",
    ("method",),
)


def route_name(request: Request) -> str:
    route = request.scope.get("route")
    return getattr(route, "path", request.url.path)


def metrics_authorized(authorization: str | None) -> bool:
    expected = os.getenv("METRICS_TOKEN", "").strip()
    if not expected:
        return os.getenv("NODE_ENV") != "production"
    supplied = authorization or ""
    prefix = "Bearer "
    return supplied.startswith(prefix) and hmac.compare_digest(supplied[len(prefix) :], expected)


def prometheus_response() -> Response:
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)


class RequestTimer:
    def __init__(self, request: Request):
        self.request = request
        self.method = request.method
        self.started = time.perf_counter()

    def __enter__(self):
        HTTP_IN_PROGRESS.labels(self.method).inc()
        return self

    def finish(self, status: int) -> None:
        route = route_name(self.request)
        HTTP_REQUESTS.labels(self.method, route, str(status)).inc()
        HTTP_DURATION.labels(self.method, route).observe(time.perf_counter() - self.started)

    def __exit__(self, _exc_type, _exc, _traceback):
        HTTP_IN_PROGRESS.labels(self.method).dec()
