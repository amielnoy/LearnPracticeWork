"""Course sales: checkout, catalog seeding, prices and the Stripe webhook.

Each service depends on the narrowest gateway protocol it actually uses, so a
test can substitute a four-line fake instead of a whole Stripe client, and the
live implementation stays the only place that knows about the Stripe SDK.
"""

from __future__ import annotations

import asyncio
import logging
from collections.abc import Awaitable, Callable
from dataclasses import dataclass
from typing import Any, Protocol

import stripe

from .catalog import CourseCatalog
from .errors import ServiceError
from .google_auth import GoogleUser
from .integrations import stripe_client, stripe_credentials
from .schemas import CheckoutBody
from .settings import COURSE_SKU, TERMS_VERSION

logger = logging.getLogger(__name__)

PRODUCT_NAME = "AI Testing Bootcamp"
PRODUCT_DESCRIPTION = (
    "Master AI-powered test automation, DevOps, and modern QA practices with hands-on projects."
)
SALES_UNAVAILABLE = "Course sales are not currently available."


class CheckoutGateway(Protocol):
    async def create_checkout_session(self, params: dict) -> Any: ...


class CatalogAdminGateway(Protocol):
    async def search_products(self, query: str) -> Any: ...
    async def list_prices(self, params: dict) -> Any: ...
    async def create_product(self, params: dict) -> Any: ...
    async def create_price(self, params: dict) -> Any: ...


class PriceGateway(Protocol):
    async def retrieve_price(self, price_id: str) -> Any: ...


class WebhookGateway(Protocol):
    async def credentials(self) -> tuple[str, str | None]: ...
    def construct_event(self, payload: bytes, signature: str, secret: str) -> Any: ...
    async def retrieve_checkout_session(self, session_id: str, params: dict) -> Any: ...


PurchaseRecorder = Callable[[dict], Awaitable[Any]]


class StripeGateway:
    """The live Stripe SDK, with its blocking calls moved off the event loop."""

    async def credentials(self) -> tuple[str, str | None]:
        return await stripe_credentials()

    def construct_event(self, payload: bytes, signature: str, secret: str) -> Any:
        return stripe.Webhook.construct_event(payload, signature, secret)

    async def _client(self) -> Any:
        return await stripe_client()

    async def create_checkout_session(self, params: dict) -> Any:
        client = await self._client()
        return await asyncio.to_thread(client.v1.checkout.sessions.create, params)

    async def retrieve_checkout_session(self, session_id: str, params: dict) -> Any:
        client = await self._client()
        return await asyncio.to_thread(client.v1.checkout.sessions.retrieve, session_id, params)

    async def search_products(self, query: str) -> Any:
        client = await self._client()
        return await asyncio.to_thread(client.v1.products.search, {"query": query})

    async def list_prices(self, params: dict) -> Any:
        client = await self._client()
        return await asyncio.to_thread(client.v1.prices.list, params)

    async def create_product(self, params: dict) -> Any:
        client = await self._client()
        return await asyncio.to_thread(client.v1.products.create, params)

    async def create_price(self, params: dict) -> Any:
        client = await self._client()
        return await asyncio.to_thread(client.v1.prices.create, params)

    async def retrieve_price(self, price_id: str) -> Any:
        client = await self._client()
        return await asyncio.to_thread(client.v1.prices.retrieve, price_id)


def require_catalog(catalog: CourseCatalog | None) -> CourseCatalog:
    if catalog is None:
        raise ServiceError(SALES_UNAVAILABLE, 503)
    return catalog


class CheckoutService:
    def __init__(self, gateway: CheckoutGateway) -> None:
        self._gateway = gateway

    async def create(
        self,
        body: CheckoutBody,
        *,
        catalog: CourseCatalog,
        origin: str | None,
        user: GoogleUser | None,
    ) -> dict[str, str]:
        if not origin:
            raise ServiceError("Checkout return URL is not configured.", 503)
        try:
            params = self._params(body, catalog=catalog, origin=origin, user=user)
            session = await self._gateway.create_checkout_session(params)
        except Exception as exc:
            logger.exception("Stripe checkout creation failed")
            raise ServiceError("Could not create the checkout session", 500) from exc
        return {"url": session.url}

    @staticmethod
    def _params(
        body: CheckoutBody,
        *,
        catalog: CourseCatalog,
        origin: str,
        user: GoogleUser | None,
    ) -> dict:
        business = catalog.business
        app_url = f"{origin}/ai-testing-academy"
        metadata: dict[str, str] = {
            "courseSku": COURSE_SKU,
            "productId": catalog.product_id,
            "expectedAmount": str(catalog.amount),
            "expectedCurrency": catalog.currency,
            "termsVersion": TERMS_VERSION,
            "locale": body.locale,
        }
        if user:
            metadata["googleSubject"] = user.subject
        params: dict[str, Any] = {
            "automatic_payment_methods": {"enabled": True},
            "automatic_tax": {"enabled": True},
            "billing_address_collection": "required",
            "consent_collection": {"terms_of_service": "required"},
            "customer_creation": "always",
            "invoice_creation": {"enabled": True},
            "line_items": [{"price": catalog.price_id, "quantity": 1}],
            "mode": "payment",
            "locale": body.locale,
            "success_url": f"{app_url}/?payment=success",
            "cancel_url": f"{app_url}/?payment=cancelled",
            "custom_text": {
                "submit": {
                    "message": (
                        f"Seller: {business.legal_name}, {business.postal_address}. "
                        f"Support and cancellations: {business.support_email}."
                    )
                },
                "terms_of_service_acceptance": {
                    "message": (
                        f"I agree to the [Terms]({app_url}/terms) and "
                        f"[Cancellation policy]({app_url}/cancellation)."
                    )
                },
            },
            "metadata": metadata,
        }
        if email := (user.email if user else body.email):
            params["customer_email"] = str(email)
        return params


class CatalogSeeder:
    """Creates the course product in a fresh Stripe account, idempotently."""

    def __init__(self, gateway: CatalogAdminGateway) -> None:
        self._gateway = gateway

    async def seed(self) -> dict[str, Any]:
        try:
            existing = await self._gateway.search_products(
                f"name:'{PRODUCT_NAME}' AND active:'true'"
            )
            if existing.data:
                product_id = existing.data[0].id
                prices = await self._gateway.list_prices({"product": product_id, "active": True})
                return {
                    "status": "already_exists",
                    "productId": product_id,
                    "priceId": prices.data[0].id if prices.data else None,
                }
            product = await self._gateway.create_product(
                {
                    "name": PRODUCT_NAME,
                    "description": PRODUCT_DESCRIPTION,
                    "metadata": {"category": "course", "featured": "true", "sku": COURSE_SKU},
                }
            )
            price = await self._gateway.create_price(
                {"product": product.id, "unit_amount": 5000, "currency": "usd"}
            )
            return {"status": "created", "productId": product.id, "priceId": price.id}
        except Exception as exc:
            logger.exception("Stripe catalog seed failed")
            raise ServiceError("Could not prepare the Stripe catalog", 500) from exc


class PriceService:
    def __init__(self, gateway: PriceGateway) -> None:
        self._gateway = gateway

    async def list(self, catalog: CourseCatalog | None) -> dict[str, Any]:
        if catalog is None:
            return {"data": [], "salesEnabled": False}
        try:
            price = await self._gateway.retrieve_price(catalog.price_id)
            matches = self._matches(price, catalog)
            listing = {"data": [price.to_dict()], "salesEnabled": True} if matches else None
        except Exception as exc:
            logger.exception("Stripe price lookup failed")
            raise ServiceError("Could not load prices", 500) from exc
        if listing is None:
            logger.error("Configured Stripe course catalog does not match the live price")
            raise ServiceError("Course pricing is unavailable", 503)
        return listing

    @staticmethod
    def _matches(price: Any, catalog: CourseCatalog) -> bool:
        product = price.product if isinstance(price.product, str) else price.product.id
        return bool(
            price.active
            and product == catalog.product_id
            and price.unit_amount == catalog.amount
            and price.currency.lower() == catalog.currency
        )


@dataclass(frozen=True)
class PaidSession:
    """The parts of a completed Stripe session this server is willing to trust."""

    id: str
    email: str | None
    price_id: str | None
    product_id: str
    amount_total: int
    currency: str
    metadata: dict
    payment_intent: str | None
    customer_id: str | None

    def matches(self, catalog: CourseCatalog) -> bool:
        return (
            self.price_id is not None
            and self.price_id == catalog.price_id
            and self.product_id == catalog.product_id
            and self.amount_total == catalog.amount
            and self.currency.lower() == catalog.currency
            and self.metadata.get("courseSku") == COURSE_SKU
            and self.metadata.get("termsVersion") == TERMS_VERSION
        )

    def purchase(self) -> dict:
        return {
            "checkout_session_id": self.id,
            "payment_intent_id": self.payment_intent,
            "stripe_customer_id": self.customer_id,
            "email": (self.email or "").strip().lower(),
            "google_subject": self.metadata.get("googleSubject"),
            "product_id": self.product_id,
            "price_id": self.price_id,
            "amount_total": self.amount_total,
            "currency": self.currency or "usd",
        }

    @classmethod
    def from_stripe(cls, full: Any) -> PaidSession:
        details = full.customer_details
        price = full.line_items.data[0].price if full.line_items and full.line_items.data else None
        product = price.product if price else None
        return cls(
            id=full.id,
            email=(getattr(details, "email", None) if details else None) or full.customer_email,
            price_id=price.id if price else None,
            product_id=product if isinstance(product, str) else getattr(product, "id", ""),
            amount_total=full.amount_total or 0,
            currency=full.currency or "",
            metadata=full.metadata or {},
            payment_intent=(full.payment_intent if isinstance(full.payment_intent, str) else None),
            customer_id=full.customer if isinstance(full.customer, str) else None,
        )


class WebhookProcessor:
    """Turns a signed Stripe event into a recorded purchase, or into nothing."""

    def __init__(self, gateway: WebhookGateway, record_purchase: PurchaseRecorder) -> None:
        self._gateway = gateway
        self._record_purchase = record_purchase

    async def handle(
        self, payload: bytes, signature: str, catalog: CourseCatalog | None
    ) -> dict[str, bool]:
        try:
            event = await self._verified_event(payload, signature)
            if self._is_paid_checkout(event):
                await self._grant_access(event.data.object.id, catalog)
        except Exception as exc:
            logger.exception("Stripe webhook error")
            raise ServiceError("Webhook processing error", 400) from exc
        return {"received": True}

    async def _verified_event(self, payload: bytes, signature: str) -> Any:
        _, webhook_secret = await self._gateway.credentials()
        if not webhook_secret:
            raise RuntimeError("Stripe integration supplied no webhook secret")
        return self._gateway.construct_event(payload, signature, webhook_secret)

    @staticmethod
    def _is_paid_checkout(event: Any) -> bool:
        return (
            event.type == "checkout.session.completed"
            and event.data.object.payment_status == "paid"
        )

    async def _grant_access(self, session_id: str, catalog: CourseCatalog | None) -> None:
        if catalog is None:
            logger.error("Ignoring paid checkout while course sales configuration is incomplete")
            return
        full = await self._gateway.retrieve_checkout_session(
            session_id, {"expand": ["line_items.data.price.product"]}
        )
        session = PaidSession.from_stripe(full)
        if not session.matches(catalog):
            logger.error(
                "Paid Stripe session %s did not match the approved course catalog", session.id
            )
            return
        if session.email:
            await self._record_purchase(session.purchase())
