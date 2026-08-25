"""The operator's view of who bought the course, and what to do about them.

The rule worth a test of its own is the one that is easy to lose in a later
edit: the model that writes the advice is never told who the customer is. An
email address is what makes this record personal data, and none of the advice
depends on it — "bought eleven days ago and has never signed in" is the whole
question. So the profile that leaves the server carries elapsed time and
account state, and nothing else.
"""

from __future__ import annotations

from datetime import UTC, datetime, timedelta
from typing import Any

import pytest

from app.ai_gateway import AiOutcome
from app.customers import Customer, CustomerService, RecommendationService
from app.errors import ServiceError

EMAIL = "buyer@example.com"


def purchase_row(**overrides: Any) -> dict:
    row = {
        "id": "11111111-1111-1111-1111-111111111111",
        "email": EMAIL,
        "google_subject": None,
        "amount_total": 5000,
        "currency": "usd",
        "purchased_at": datetime.now(UTC) - timedelta(days=11),
    }
    row.update(overrides)
    return row


def service(rows: list[dict] | None = None) -> CustomerService:
    listed = rows if rows is not None else [purchase_row()]

    async def list_purchases() -> list[dict]:
        return listed

    async def find_purchase(purchase_id: str) -> dict | None:
        return next((row for row in listed if row["id"] == purchase_id), None)

    return CustomerService(list_purchases, find_purchase)


class CapturingGateway:
    """Records the body it was asked to generate from, and answers with fixed text."""

    def __init__(self, outcome: AiOutcome | None = None) -> None:
        self.bodies: list[Any] = []
        self._outcome = outcome or AiOutcome(200, {"text": '{"actions": []}'}, "groq", "m")

    async def generate(self, body) -> AiOutcome:
        self.bodies.append(body)
        return self._outcome


@pytest.mark.asyncio
async def test_the_listing_shows_the_operator_who_bought() -> None:
    listing = await service().listing()

    assert listing[0]["email"] == EMAIL
    assert listing[0]["amountTotal"] == 5000
    assert listing[0]["daysSincePurchase"] == 11


@pytest.mark.asyncio
async def test_a_purchase_with_no_linked_account_is_marked_as_such() -> None:
    """It is the fact most of the advice turns on, so it is its own field."""
    listing = await service([purchase_row(google_subject=None)]).listing()

    assert listing[0]["linkedAccount"] is False


@pytest.mark.asyncio
async def test_a_purchase_linked_to_a_signed_in_account_is_marked_too() -> None:
    listing = await service([purchase_row(google_subject="112233")]).listing()

    assert listing[0]["linkedAccount"] is True


@pytest.mark.asyncio
async def test_no_database_is_an_empty_list_rather_than_a_failure() -> None:
    assert await service([]).listing() == []


@pytest.mark.asyncio
async def test_the_model_is_never_told_who_the_customer_is() -> None:
    """The whole privacy argument for this feature, as one assertion."""
    gateway = CapturingGateway()
    customers = service()

    await RecommendationService(customers, gateway).for_customer(purchase_row()["id"])

    sent = gateway.bodies[0]
    everything = sent.system + " ".join(message.content for message in sent.messages)
    assert EMAIL not in everything
    assert "buyer" not in everything.lower()
    assert purchase_row()["id"] not in everything


@pytest.mark.asyncio
async def test_the_model_is_told_the_facts_the_advice_turns_on() -> None:
    gateway = CapturingGateway()

    await RecommendationService(service(), gateway).for_customer(purchase_row()["id"])

    prompt = gateway.bodies[0].messages[0].content
    assert "11" in prompt, "elapsed time is the point of the question"
    assert "no" in prompt.lower(), "whether they ever signed in"


@pytest.mark.asyncio
async def test_an_unknown_customer_is_a_404_rather_than_advice_about_nobody() -> None:
    gateway = CapturingGateway()

    with pytest.raises(ServiceError) as raised:
        await RecommendationService(service(), gateway).for_customer("no-such-id")

    assert raised.value.status == 404
    assert gateway.bodies == [], "an unknown customer must not reach the provider"


@pytest.mark.asyncio
async def test_a_refused_provider_does_not_become_an_empty_recommendation() -> None:
    """Returning "" would read as advice to do nothing, which is not what happened."""
    gateway = CapturingGateway(AiOutcome(429, {"error": "rate limited"}, "groq", "m"))

    with pytest.raises(ServiceError) as raised:
        await RecommendationService(service(), gateway).for_customer(purchase_row()["id"])

    assert raised.value.status == 429


def test_a_naive_timestamp_is_read_as_utc_rather_than_local() -> None:
    """Postgres can hand back a naive datetime; subtracting it would then throw."""
    customer = Customer.from_row(purchase_row(purchased_at=datetime(2026, 1, 1)))

    assert customer.purchased_at.tzinfo is UTC
    assert customer.days_since_purchase > 0


@pytest.mark.asyncio
async def test_the_customer_routes_are_behind_the_admin_token(api_client) -> None:
    """Without a token configured the routes deny they exist, as the seed route does."""
    listing = await api_client.get("/api/admin/customers")
    recommendation = await api_client.post("/api/admin/customers/abc/recommendations")

    assert listing.status_code == 404
    assert recommendation.status_code == 404


@pytest.mark.asyncio
async def test_a_wrong_admin_token_is_refused(api_client, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("ADMIN_API_TOKEN", "the-real-token")

    response = await api_client.get(
        "/api/admin/customers", headers={"authorization": "Bearer wrong"}
    )

    assert response.status_code == 401
