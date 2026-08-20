"""The single course this API is allowed to sell, as configured for a deployment.

Every price, product and amount the server accepts is pinned here, so a client
can never name its own price and a webhook can never grant access to a session
that does not match the approved catalog.
"""

from __future__ import annotations

from dataclasses import dataclass

from .config import env, positive_int


@dataclass(frozen=True)
class BusinessIdentity:
    legal_name: str
    postal_address: str
    support_email: str


@dataclass(frozen=True)
class CourseCatalog:
    price_id: str
    product_id: str
    amount: int
    currency: str
    business: BusinessIdentity


def course_catalog() -> CourseCatalog | None:
    """The approved catalog, or None when this deployment must not sell."""
    if env("SALES_ENABLED") != "true" or env("STRIPE_TAX_ENABLED") != "true":
        return None
    price_id = env("STRIPE_COURSE_PRICE_ID")
    product_id = env("STRIPE_COURSE_PRODUCT_ID")
    amount = positive_int("STRIPE_COURSE_AMOUNT", 0)
    currency = (env("STRIPE_COURSE_CURRENCY") or "").lower()
    legal_name = env("BUSINESS_LEGAL_NAME")
    postal_address = env("BUSINESS_POSTAL_ADDRESS")
    support_email = env("BUSINESS_SUPPORT_EMAIL")
    if not price_id or not product_id or amount <= 0 or len(currency) != 3:
        return None
    if not legal_name or not postal_address or not support_email:
        return None
    return CourseCatalog(
        price_id=price_id,
        product_id=product_id,
        amount=amount,
        currency=currency,
        business=BusinessIdentity(legal_name, postal_address, support_email),
    )
