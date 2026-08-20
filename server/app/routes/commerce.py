"""Course sales endpoints: catalog seeding, checkout, prices and the webhook."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Header, Request
from pydantic import ValidationError

from ..commerce import (
    CatalogSeeder,
    CheckoutService,
    PriceService,
    WebhookProcessor,
    require_catalog,
)
from ..dependencies import AdminOnly, Catalog, CurrentUser, Purchases, Stripe
from ..errors import error_response, validation_issues
from ..origins import public_origin
from ..schemas import CheckoutBody

router = APIRouter(prefix="/api/stripe")


@router.post("/seed", dependencies=[AdminOnly])
async def stripe_seed(stripe: Stripe):
    return await CatalogSeeder(stripe).seed()


@router.post("/checkout")
async def stripe_checkout(request: Request, stripe: Stripe, catalog: Catalog, user: CurrentUser):
    try:
        body = CheckoutBody.model_validate(await request.json())
    except (ValidationError, ValueError) as exc:
        issues = validation_issues(exc.errors()) if isinstance(exc, ValidationError) else []
        return error_response("Invalid request body", 400, issues=issues)
    return await CheckoutService(stripe).create(
        body,
        catalog=require_catalog(catalog),
        origin=public_origin(request),
        user=user,
    )


@router.get("/prices")
async def stripe_prices(stripe: Stripe, catalog: Catalog):
    return await PriceService(stripe).list(catalog)


@router.post("/webhook")
async def stripe_webhook(
    request: Request,
    stripe: Stripe,
    purchases: Purchases,
    catalog: Catalog,
    stripe_signature: Annotated[str | None, Header()] = None,
):
    if not stripe_signature:
        return error_response("Missing stripe-signature header", 400)
    processor = WebhookProcessor(stripe, purchases)
    return await processor.handle(await request.body(), stripe_signature, catalog)
