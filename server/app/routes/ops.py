"""Liveness, readiness, metrics scraping and the API reference page."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Header, Request
from fastapi.responses import JSONResponse
from scalar_fastapi import AgentScalarConfig, get_scalar_api_reference

from ..dependencies import DatabaseProbe
from ..errors import error_response
from ..metrics import metrics_authorized, prometheus_response
from ..rate_limit import shared_quota_problem

router = APIRouter()


@router.get("/metrics", include_in_schema=False)
async def metrics(authorization: Annotated[str | None, Header()] = None):
    """Unauthorized scrapes get a 404: the endpoint should not advertise itself."""
    if not metrics_authorized(authorization):
        return error_response("Not found", 404)
    return prometheus_response()


@router.get("/api/docs", include_in_schema=False)
async def scalar_api_reference(request: Request):
    return get_scalar_api_reference(
        openapi_url=request.app.openapi_url,
        title="AI Testing Academy API Reference",
        scalar_js_url="https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.63.0",
        scalar_proxy_url="",
        scalar_favicon_url="",
        persist_auth=False,
        show_developer_tools="never",
        telemetry=False,
        with_default_fonts=False,
        agent=AgentScalarConfig(disabled=True),
    )


@router.get("/api/healthz")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/api/readyz")
async def readiness(database_ready: DatabaseProbe):
    """Readiness, plus anything degraded that a 200 would otherwise hide.

    The status code stays a function of the database alone, because Fly health-
    checks this path and an unhealthy answer stops the machine. A deployment
    whose quotas cannot count is broken for its users but still serving, so it
    is named in the body instead of being turned into an outage.
    """
    if not await database_ready():
        return JSONResponse({"status": "not_ready", "database": "unavailable"}, status_code=503)
    body = {"status": "ready", "database": "available"}
    if problem := shared_quota_problem():
        body["rateLimiting"] = problem
    return body
