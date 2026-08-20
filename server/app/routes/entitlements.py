"""Whether the signed-in reader has bought the course."""

from __future__ import annotations

from fastapi import APIRouter

from ..commerce import require_catalog
from ..config import env
from ..dependencies import Catalog, CurrentUser, Entitlements
from ..errors import ServiceError

router = APIRouter(prefix="/api/entitlements")


@router.get("/course")
async def entitlements(user: CurrentUser, catalog: Catalog, service: Entitlements):
    if not env("GOOGLE_CLIENT_ID"):
        raise ServiceError("Sign-in is not configured on this server.", 503)
    if not user:
        raise ServiceError("A valid Google ID token is required.", 401)
    return await service.for_user(user, require_catalog(catalog))
