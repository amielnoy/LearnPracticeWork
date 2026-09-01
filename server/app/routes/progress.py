"""A signed-in reader's progress: read it, and merge a device's copy into it."""

from __future__ import annotations

from fastapi import APIRouter, Request
from pydantic import ValidationError

from ..dependencies import Progress, SessionUser
from ..errors import ServiceError, error_response, validation_issues
from ..schemas import ProgressBody

router = APIRouter(prefix="/api")

NOT_SIGNED_IN = "Sign in to keep your progress across devices."


@router.get("/progress")
async def read_progress(user: SessionUser, service: Progress):
    if not user:
        raise ServiceError(NOT_SIGNED_IN, 401)
    return await service.for_user(user)


@router.put("/progress")
async def write_progress(request: Request, user: SessionUser, service: Progress):
    """Merge, not replace — the response is the union, which the client adopts."""
    if not user:
        raise ServiceError(NOT_SIGNED_IN, 401)
    try:
        body = ProgressBody.model_validate(await request.json())
    except ValidationError as exc:
        return error_response("Invalid request body", 400, issues=validation_issues(exc.errors()))
    except ValueError:
        return error_response("Invalid request body", 400)
    return await service.merge_for_user(user, body.model_dump())
