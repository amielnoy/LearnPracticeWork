"""Liveness, readiness, metrics scraping and the API reference page."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Header, Request
from fastapi.responses import JSONResponse
from scalar_fastapi import AgentScalarConfig, get_scalar_api_reference

from ..config import database_url, serverless
from ..dependencies import DatabaseProbe
from ..errors import error_response
from ..metrics import metrics_authorized, prometheus_response
from ..rate_limit import shared_quota_problem

router = APIRouter()


@router.get("/metrics", include_in_schema=False)
async def metrics(authorization: Annotated[str | None, Header()] = None):
    """Unauthorized scrapes get a 404: the endpoint should not advertise itself.

    Serverless gets the same 404, authorized or not. `prometheus_client` counts
    in process memory, and on Vercel a process is one invocation: a scrape would
    return whatever the instance that happened to answer it had seen, which is
    not a sample of anything. Reporting a number that looks like a rate and is
    not one is worse than reporting nothing, so this says nothing. Test-history
    metrics still reach Grafana — CI pushes those to Pushgateway, which does not
    depend on this endpoint.
    """
    if serverless() or not metrics_authorized(authorization):
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

    An absent `DATABASE_URL` is a *configuration*, not a failure. Progress lives
    in a spreadsheet and quotas in Redis, so a deployment with no Supabase
    project behind it is the intended end state — reporting it as an outage
    would make readiness answer 503 forever, and Fly health-checks this path.
    A database that is configured and cannot be reached is a real outage and
    still answers 503.

    `rateLimiting` is reported whatever the database is doing. It is the only
    thing that names the cause of a quota outage, and putting it behind the
    database check is what made it unreachable: the deploy workflow greps for
    it and could never have found it.
    """
    body: dict[str, str] = {}
    if problem := shared_quota_problem():
        body["rateLimiting"] = problem
    if not database_url():
        return {"status": "ready", "database": "not_configured", **body}
    if not await database_ready():
        return JSONResponse(
            {"status": "not_ready", "database": "unavailable", **body}, status_code=503
        )
    return {"status": "ready", "database": "available", **body}
