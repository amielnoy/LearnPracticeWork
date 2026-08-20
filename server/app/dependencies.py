"""Where routes get their collaborators from.

Everything a route needs beyond its own request is resolved through a `Depends`
provider here. Nothing is imported directly into a route module, so a test can
substitute a fake with `app.dependency_overrides` instead of reaching into
another module's namespace.
"""

from __future__ import annotations

import hmac
import logging
import os
from typing import Annotated

from fastapi import Cookie, Depends, Header, Request

from .ai_gateway import AiGateway
from .catalog import CourseCatalog, course_catalog
from .commerce import PurchaseRecorder, StripeGateway
from .config import env
from .content_store import ContentService, SupabaseContentStore
from .database import find_course_access, record_purchase
from .entitlements import EntitlementService
from .errors import ServiceError
from .google_auth import GoogleUser, verify_google_id_token
from .rate_limit import SharedRateLimiter
from .sessions import read_session
from .settings import BURST_LIMIT, BURST_WINDOW, DAILY_QUOTA

logger = logging.getLogger(__name__)

burst_limiter = SharedRateLimiter("ai-burst", BURST_LIMIT, BURST_WINDOW)
daily_limiter = SharedRateLimiter("ai-daily", DAILY_QUOTA, 24 * 60 * 60)
admin_limiter = SharedRateLimiter("admin", 20, 15 * 60)
login_limiter = SharedRateLimiter("login", 10, 5 * 60)


def bearer_token(authorization: str | None) -> str:
    if not authorization:
        return ""
    scheme, separator, token = authorization.strip().partition(" ")
    return token.strip() if separator and scheme.lower() == "bearer" else ""


def client_ip(request: Request) -> str:
    # Fly terminates TLS and supplies this header itself. It is accepted only in
    # production; local/test callers cannot forge a different quota identity.
    if os.getenv("NODE_ENV") == "production":
        if forwarded := request.headers.get("fly-client-ip", "").strip():
            return forwarded
    return request.client.host if request.client else "unknown"


def quota_key(request: Request, session: GoogleUser | None) -> str:
    return f"user:{session.subject}" if session else f"ip:{client_ip(request)}"


async def current_user(
    authorization: Annotated[str | None, Header()] = None,
    ata_session: Annotated[str | None, Cookie()] = None,
) -> GoogleUser | None:
    """A signed session cookie if there is one, otherwise a verified bearer token."""
    if session_user := read_session(ata_session):
        return session_user
    token = bearer_token(authorization)
    if not token:
        return None
    try:
        return await verify_google_id_token(token)
    except Exception:
        logger.exception("Could not verify a Google ID token")
        return None


async def require_admin(
    request: Request,
    authorization: Annotated[str | None, Header()] = None,
) -> None:
    """Guard the operator-only routes; an unconfigured server denies they exist."""
    expected = env("ADMIN_API_TOKEN")
    if not expected:
        raise ServiceError("Not found", 404)
    allowed, _ = await admin_limiter.hit(client_ip(request))
    if not allowed:
        raise ServiceError("Too many requests", 429)
    if not hmac.compare_digest(bearer_token(authorization), expected):
        raise ServiceError("Unauthorized", 401)


def session_user(ata_session: Annotated[str | None, Cookie()] = None) -> GoogleUser | None:
    """Only the signed cookie — a bearer token must not spend another user's quota."""
    return read_session(ata_session)


def get_catalog() -> CourseCatalog | None:
    return course_catalog()


def get_ai_gateway() -> AiGateway:
    return AiGateway()


def get_content_service() -> ContentService:
    return ContentService(SupabaseContentStore())


def get_stripe_gateway() -> StripeGateway:
    return StripeGateway()


def get_purchase_recorder() -> PurchaseRecorder:
    return record_purchase


def get_entitlement_service() -> EntitlementService:
    return EntitlementService(find_course_access)


CurrentUser = Annotated[GoogleUser | None, Depends(current_user)]
SessionUser = Annotated[GoogleUser | None, Depends(session_user)]
Catalog = Annotated[CourseCatalog | None, Depends(get_catalog)]
Ai = Annotated[AiGateway, Depends(get_ai_gateway)]
Content = Annotated[ContentService, Depends(get_content_service)]
Stripe = Annotated[StripeGateway, Depends(get_stripe_gateway)]
Purchases = Annotated[PurchaseRecorder, Depends(get_purchase_recorder)]
Entitlements = Annotated[EntitlementService, Depends(get_entitlement_service)]
AdminOnly = Depends(require_admin)
