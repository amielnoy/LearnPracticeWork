from __future__ import annotations

import hmac
import os
import time
from hashlib import sha256

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
LOGINS = Counter(
    "academy_logins_total",
    "Google sign-in attempts grouped without storing personal identifiers.",
    ("country", "user", "client", "outcome"),
)
AI_REQUESTS = Counter(
    "academy_ai_requests_total",
    "Server-proxied AI requests; prompts, responses, and keys are never labels.",
    ("provider", "model", "country", "user", "client", "status"),
)


def country(request: Request) -> str:
    for header in ("x-academy-client-country", "fly-client-country", "cf-ipcountry"):
        value = request.headers.get(header, "").strip().upper()
        if len(value) == 2 and value.isascii() and value.isalpha():
            return value
    return "unknown"


def client_class(request: Request) -> str:
    agent = request.headers.get("user-agent", "").lower()
    if "android" in agent:
        return "android"
    if any(value in agent for value in ("iphone", "ipad", "ipod")):
        return "ios"
    if any(value in agent for value in ("mozilla/", "chrome/", "safari/", "firefox/", "edg/")):
        return "desktop_web"
    return "other"


def user_id(email: str | None) -> str:
    if not email:
        return "anonymous"
    salt = os.getenv("METRICS_ID_SALT", "").strip()
    if not salt:
        return "redacted"
    return hmac.new(salt.encode(), email.strip().lower().encode(), sha256).hexdigest()[:16]


def observe_login(request: Request, email: str | None, outcome: str) -> None:
    LOGINS.labels(country(request), user_id(email), client_class(request), outcome).inc()


def observe_ai(
    request: Request,
    *,
    provider: str,
    model: str,
    email: str | None,
    status: int,
) -> None:
    AI_REQUESTS.labels(
        provider,
        model,
        country(request),
        user_id(email),
        client_class(request),
        str(status),
    ).inc()


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
