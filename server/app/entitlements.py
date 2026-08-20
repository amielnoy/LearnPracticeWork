"""Whether a signed-in reader has bought the course.

Access is decided against the approved catalog, so a purchase recorded for a
different price or product never unlocks anything.
"""

from __future__ import annotations

import logging
from collections.abc import Awaitable, Callable
from datetime import datetime
from typing import Protocol

from .catalog import CourseCatalog
from .errors import ServiceError
from .google_auth import GoogleUser

logger = logging.getLogger(__name__)

CourseAccess = tuple[bool, datetime | None]


class CourseAccessLookup(Protocol):
    def __call__(
        self,
        google_subject: str,
        email: str,
        *,
        product_id: str,
        price_id: str,
        amount_total: int,
        currency: str,
    ) -> Awaitable[CourseAccess | None]: ...


class EntitlementService:
    def __init__(self, find_course_access: CourseAccessLookup | Callable[..., object]) -> None:
        self._find_course_access = find_course_access

    async def for_user(self, user: GoogleUser, catalog: CourseCatalog) -> dict[str, object]:
        try:
            access = await self._find_course_access(
                user.subject,
                user.email,
                product_id=catalog.product_id,
                price_id=catalog.price_id,
                amount_total=catalog.amount,
                currency=catalog.currency,
            )
        except Exception as exc:
            logger.exception("Entitlement lookup failed")
            raise ServiceError("Could not check entitlements", 500) from exc
        if access is None:
            raise ServiceError("Purchase records are unavailable on this server.", 503)
        has_access, purchased_at = access
        return {
            "hasAccess": has_access,
            "purchasedAt": purchased_at.isoformat() if purchased_at else None,
        }
