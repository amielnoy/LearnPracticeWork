"""The rules that decide whether money becomes access.

`PaidSession.matches` is the whole of the webhook's trust decision: Stripe will
happily report a completed session for any price in the account, and only this
comparison stops one of those unlocking the course. Each field is checked on its
own so a future edit cannot quietly drop one from the comparison.
"""

from __future__ import annotations

from types import SimpleNamespace
from typing import Any

import pytest

from app.catalog import BusinessIdentity, CourseCatalog
from app.commerce import (
    CheckoutService,
    PaidSession,
    PriceService,
    WebhookProcessor,
    require_catalog,
)
from app.errors import ServiceError
from app.schemas import CheckoutBody
from app.settings import COURSE_SKU, TERMS_VERSION

CATALOG = CourseCatalog(
    price_id="price_approved",
    product_id="prod_approved",
    amount=5000,
    currency="usd",
    business=BusinessIdentity("Academy", "1 Test Street", "support@example.test"),
)


def paid_session(**overrides: Any) -> PaidSession:
    values: dict[str, Any] = {
        "id": "cs_test",
        "email": "Buyer@Example.com",
        "price_id": "price_approved",
        "product_id": "prod_approved",
        "amount_total": 5000,
        "currency": "usd",
        "metadata": {"courseSku": COURSE_SKU, "termsVersion": TERMS_VERSION},
        "payment_intent": "pi_test",
        "customer_id": "cus_test",
    }
    values.update(overrides)
    return PaidSession(**values)


def test_a_session_matching_the_approved_catalog_is_accepted() -> None:
    assert paid_session().matches(CATALOG) is True


@pytest.mark.parametrize(
    "field,value",
    [
        ("price_id", "price_cheaper"),
        ("price_id", None),
        ("product_id", "prod_other"),
        ("amount_total", 100),
        ("currency", "eur"),
    ],
)
def test_a_session_for_a_different_purchase_is_rejected(field: str, value: Any) -> None:
    assert paid_session(**{field: value}).matches(CATALOG) is False


def test_a_session_without_the_course_sku_is_rejected() -> None:
    """The sku is set by this server when it creates the session, so it proves origin."""
    assert paid_session(metadata={"termsVersion": TERMS_VERSION}).matches(CATALOG) is False


def test_a_session_accepting_a_different_terms_version_is_rejected() -> None:
    metadata = {"courseSku": COURSE_SKU, "termsVersion": "2020-01-01"}
    assert paid_session(metadata=metadata).matches(CATALOG) is False


def test_a_currency_is_compared_without_regard_to_case() -> None:
    assert paid_session(currency="USD").matches(CATALOG) is True


def test_the_recorded_purchase_normalises_the_email_it_will_be_looked_up_by() -> None:
    """Entitlements are found by email, so the stored form has to be the canonical one."""
    assert paid_session(email="  Buyer@Example.COM ").purchase()["email"] == "buyer@example.com"


def test_a_purchase_carries_the_ids_needed_to_reconcile_it_later() -> None:
    purchase = paid_session().purchase()

    assert purchase["checkout_session_id"] == "cs_test"
    assert purchase["payment_intent_id"] == "pi_test"
    assert purchase["stripe_customer_id"] == "cus_test"


def test_an_expanded_stripe_session_is_read_into_the_fields_that_are_compared() -> None:
    full = SimpleNamespace(
        id="cs_live",
        customer_details=SimpleNamespace(email="buyer@example.com"),
        customer_email=None,
        line_items=SimpleNamespace(
            data=[
                SimpleNamespace(price=SimpleNamespace(id="price_approved", product="prod_approved"))
            ]
        ),
        metadata={"courseSku": COURSE_SKU, "termsVersion": TERMS_VERSION},
        amount_total=5000,
        currency="usd",
        payment_intent="pi_live",
        customer="cus_live",
    )

    assert PaidSession.from_stripe(full).matches(CATALOG) is True


def test_a_session_with_no_line_items_cannot_match() -> None:
    full = SimpleNamespace(
        id="cs_empty",
        customer_details=None,
        customer_email="buyer@example.com",
        line_items=SimpleNamespace(data=[]),
        metadata={},
        amount_total=5000,
        currency="usd",
        payment_intent=None,
        customer=None,
    )

    session = PaidSession.from_stripe(full)

    assert session.price_id is None
    assert session.matches(CATALOG) is False


def test_an_absent_catalog_is_refused_as_sales_being_unavailable() -> None:
    with pytest.raises(ServiceError) as raised:
        require_catalog(None)

    assert raised.value.status == 503
    assert raised.value.message == "Course sales are not currently available."


@pytest.mark.asyncio
async def test_checkout_will_not_contact_stripe_without_a_return_url() -> None:
    """A session created with no return URL strands the buyer after paying."""

    class NeverCalled:
        async def create_checkout_session(self, params: dict) -> Any:
            raise AssertionError("Stripe must not be contacted")

    with pytest.raises(ServiceError) as raised:
        await CheckoutService(NeverCalled()).create(
            CheckoutBody.model_validate({"acceptedTerms": True}),
            catalog=CATALOG,
            origin=None,
            user=None,
        )

    assert raised.value.status == 503
    assert raised.value.message == "Checkout return URL is not configured."


@pytest.mark.asyncio
async def test_checkout_sends_the_configured_price_and_never_a_client_supplied_one() -> None:
    captured: dict[str, Any] = {}

    class Recording:
        async def create_checkout_session(self, params: dict) -> Any:
            captured.update(params)
            return SimpleNamespace(url="https://checkout.stripe.test/session")

    result = await CheckoutService(Recording()).create(
        CheckoutBody.model_validate({"acceptedTerms": True, "email": "buyer@example.com"}),
        catalog=CATALOG,
        origin="https://academy.example",
        user=None,
    )

    assert result == {"url": "https://checkout.stripe.test/session"}
    assert captured["line_items"] == [{"price": "price_approved", "quantity": 1}]
    assert captured["customer_email"] == "buyer@example.com"
    assert captured["metadata"]["expectedAmount"] == "5000"
    assert captured["success_url"].startswith("https://academy.example/")


@pytest.mark.asyncio
async def test_a_failing_stripe_call_becomes_a_500_rather_than_an_unhandled_error() -> None:
    class Failing:
        async def create_checkout_session(self, params: dict) -> Any:
            raise RuntimeError("Stripe is down")

    with pytest.raises(ServiceError) as raised:
        await CheckoutService(Failing()).create(
            CheckoutBody.model_validate({"acceptedTerms": True}),
            catalog=CATALOG,
            origin="https://academy.example",
            user=None,
        )

    assert raised.value.status == 500
    assert "Stripe is down" not in raised.value.message


@pytest.mark.asyncio
async def test_prices_report_sales_as_disabled_without_calling_stripe() -> None:
    class NeverCalled:
        async def retrieve_price(self, price_id: str) -> Any:
            raise AssertionError("Stripe must not be contacted")

    assert await PriceService(NeverCalled()).list(None) == {"data": [], "salesEnabled": False}


@pytest.mark.asyncio
async def test_a_live_price_that_drifted_from_the_configuration_is_not_served() -> None:
    """Serving a price that does not match what the webhook will accept sells a dead end."""

    class Drifted:
        async def retrieve_price(self, price_id: str) -> Any:
            return SimpleNamespace(
                active=True,
                product="prod_approved",
                unit_amount=9900,
                currency="usd",
                to_dict=lambda: {"id": price_id},
            )

    with pytest.raises(ServiceError) as raised:
        await PriceService(Drifted()).list(CATALOG)

    assert raised.value.status == 503
    assert raised.value.message == "Course pricing is unavailable"


@pytest.mark.asyncio
async def test_a_matching_live_price_is_served_with_sales_enabled() -> None:
    class Matching:
        async def retrieve_price(self, price_id: str) -> Any:
            return SimpleNamespace(
                active=True,
                product="prod_approved",
                unit_amount=5000,
                currency="USD",
                to_dict=lambda: {"id": price_id, "unit_amount": 5000},
            )

    listing = await PriceService(Matching()).list(CATALOG)

    assert listing["salesEnabled"] is True
    assert listing["data"] == [{"id": "price_approved", "unit_amount": 5000}]


class StubWebhookGateway:
    def __init__(self, event: Any, session: Any = None, secret: str | None = "whsec_fixture"):
        self._event = event
        self._session = session
        self._secret = secret

    async def credentials(self) -> tuple[str, str | None]:
        return "sk_test", self._secret

    def construct_event(self, payload: bytes, signature: str, secret: str) -> Any:
        return self._event

    async def retrieve_checkout_session(self, session_id: str, params: dict) -> Any:
        return self._session


def completed_event(session_id: str = "cs_test", status: str = "paid") -> Any:
    return SimpleNamespace(
        type="checkout.session.completed",
        data=SimpleNamespace(object=SimpleNamespace(id=session_id, payment_status=status)),
    )


def stripe_session(**overrides: Any) -> Any:
    values: dict[str, Any] = {
        "id": "cs_test",
        "customer_details": SimpleNamespace(email="buyer@example.com"),
        "customer_email": None,
        "line_items": SimpleNamespace(
            data=[
                SimpleNamespace(price=SimpleNamespace(id="price_approved", product="prod_approved"))
            ]
        ),
        "metadata": {"courseSku": COURSE_SKU, "termsVersion": TERMS_VERSION},
        "amount_total": 5000,
        "currency": "usd",
        "payment_intent": "pi_test",
        "customer": "cus_test",
    }
    values.update(overrides)
    return SimpleNamespace(**values)


@pytest.mark.asyncio
async def test_an_unpaid_completed_session_records_nothing() -> None:
    recorded: list[dict] = []
    gateway = StubWebhookGateway(completed_event(status="unpaid"), stripe_session())

    result = await WebhookProcessor(gateway, _recorder(recorded)).handle(b"{}", "sig", CATALOG)

    assert result == {"received": True}
    assert recorded == []


@pytest.mark.asyncio
async def test_an_unrelated_event_type_records_nothing() -> None:
    recorded: list[dict] = []
    event = SimpleNamespace(type="payment_intent.succeeded", data=SimpleNamespace(object=None))

    result = await WebhookProcessor(StubWebhookGateway(event), _recorder(recorded)).handle(
        b"{}", "sig", CATALOG
    )

    assert result == {"received": True}
    assert recorded == []


@pytest.mark.asyncio
async def test_a_paid_session_with_no_catalog_configured_is_acknowledged_but_not_granted() -> None:
    """Stripe must not be left retrying a webhook this server has decided to ignore."""
    recorded: list[dict] = []
    gateway = StubWebhookGateway(completed_event(), stripe_session())

    result = await WebhookProcessor(gateway, _recorder(recorded)).handle(b"{}", "sig", None)

    assert result == {"received": True}
    assert recorded == []


@pytest.mark.asyncio
async def test_a_paid_session_with_no_email_cannot_be_recorded() -> None:
    recorded: list[dict] = []
    session = stripe_session(customer_details=None, customer_email=None)
    gateway = StubWebhookGateway(completed_event(), session)

    await WebhookProcessor(gateway, _recorder(recorded)).handle(b"{}", "sig", CATALOG)

    assert recorded == []


@pytest.mark.asyncio
async def test_a_matching_paid_session_is_recorded_once() -> None:
    recorded: list[dict] = []
    gateway = StubWebhookGateway(completed_event(), stripe_session())

    await WebhookProcessor(gateway, _recorder(recorded)).handle(b"{}", "sig", CATALOG)

    assert len(recorded) == 1
    assert recorded[0]["email"] == "buyer@example.com"
    assert recorded[0]["price_id"] == "price_approved"


@pytest.mark.asyncio
async def test_a_deployment_with_no_webhook_secret_refuses_the_event() -> None:
    """Without a secret nothing verified the signature, so nothing may be trusted."""
    recorded: list[dict] = []
    gateway = StubWebhookGateway(completed_event(), stripe_session(), secret=None)

    with pytest.raises(ServiceError) as raised:
        await WebhookProcessor(gateway, _recorder(recorded)).handle(b"{}", "sig", CATALOG)

    assert raised.value.status == 400
    assert recorded == []


def _recorder(sink: list[dict]):
    async def record(values: dict) -> None:
        sink.append(values)

    return record
