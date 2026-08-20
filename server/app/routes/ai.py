"""The server-side AI proxy and the configuration a client needs to use it."""

from __future__ import annotations

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from ..dependencies import Ai, SessionUser, burst_limiter, daily_limiter, quota_key
from ..errors import error_response, validation_issues
from ..metrics import observe_ai
from ..schemas import GenerateBody
from ..settings import DAILY_QUOTA

router = APIRouter(prefix="/api/ai")

UNKNOWN = "unknown"


@router.get("/config")
async def ai_config(ai: Ai):
    return ai.advertised_config()


@router.post("/generate")
async def ai_generate(request: Request, ai: Ai, session: SessionUser):
    email = session.email if session else None
    key = quota_key(request, session)

    burst_ok, _ = await burst_limiter.hit(key)
    if not burst_ok:
        return _refuse(request, email, "Too many AI requests. Please wait before trying again.")

    daily_ok, remaining = await daily_limiter.hit(key)
    headers = {"X-AI-Quota-Limit": str(DAILY_QUOTA), "X-AI-Quota-Remaining": str(remaining)}
    if not daily_ok:
        return _refuse(
            request,
            email,
            "Daily AI request quota exceeded. Please try again tomorrow.",
            headers=headers,
        )

    try:
        body = GenerateBody.model_validate(await request.json())
    except (ValidationError, ValueError) as exc:
        observe_ai(request, provider=UNKNOWN, model=UNKNOWN, email=email, status=400)
        issues = validation_issues(exc.errors()) if isinstance(exc, ValidationError) else []
        return error_response("Invalid request body", 400, issues=issues, headers=headers)

    provider, model = ai.target(body)
    outcome = await ai.generate(body)
    if outcome.status != 200:
        # The caller received nothing, so the allowance they just spent buys
        # them nothing either. Retrying stays bounded by the burst limiter.
        if (remaining := await daily_limiter.release(key)) is not None:
            headers["X-AI-Quota-Remaining"] = str(remaining)
    observe_ai(request, provider=provider, model=model, email=email, status=outcome.status)
    return JSONResponse(outcome.payload, status_code=outcome.status, headers=headers)


def _refuse(
    request: Request,
    email: str | None,
    message: str,
    *,
    headers: dict[str, str] | None = None,
) -> JSONResponse:
    """A throttled request never reaches a provider, so it has no provider labels."""
    observe_ai(request, provider=UNKNOWN, model=UNKNOWN, email=email, status=429)
    return error_response(message, 429, headers=headers)
