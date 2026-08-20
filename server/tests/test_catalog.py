"""What has to be true before this server will sell anything.

Every one of these returns `None`, and `None` is what makes the checkout,
prices and entitlement routes answer 503. The point of the test file is that
each condition fails closed on its own, so no single missing variable can leave
a half-configured deployment taking payments.
"""

from __future__ import annotations

import pytest

from app.catalog import course_catalog

COMPLETE = {
    "SALES_ENABLED": "true",
    "STRIPE_TAX_ENABLED": "true",
    "STRIPE_COURSE_PRICE_ID": "price_approved",
    "STRIPE_COURSE_PRODUCT_ID": "prod_approved",
    "STRIPE_COURSE_AMOUNT": "5000",
    "STRIPE_COURSE_CURRENCY": "USD",
    "BUSINESS_LEGAL_NAME": "Academy Test Fixture",
    "BUSINESS_POSTAL_ADDRESS": "1 Test Street, Test City",
    "BUSINESS_SUPPORT_EMAIL": "support@example.test",
}


@pytest.fixture
def configured(monkeypatch: pytest.MonkeyPatch):
    """A fully configured deployment that a test then breaks one variable of."""

    def apply(**overrides: str) -> None:
        for name, value in {**COMPLETE, **overrides}.items():
            if value == "":
                monkeypatch.delenv(name, raising=False)
            else:
                monkeypatch.setenv(name, value)

    return apply


def test_a_complete_configuration_produces_the_approved_catalog(configured) -> None:
    configured()

    catalog = course_catalog()

    assert catalog is not None
    assert catalog.price_id == "price_approved"
    assert catalog.product_id == "prod_approved"
    assert catalog.amount == 5000


def test_the_currency_is_normalised_so_comparisons_are_not_case_sensitive(configured) -> None:
    configured(STRIPE_COURSE_CURRENCY="USD")

    assert course_catalog().currency == "usd"


def test_the_business_identity_travels_with_the_catalog(configured) -> None:
    """Checkout has to print the seller's name and address; it reads them from here."""
    configured()

    business = course_catalog().business

    assert business.legal_name == "Academy Test Fixture"
    assert business.postal_address == "1 Test Street, Test City"
    assert business.support_email == "support@example.test"


@pytest.mark.parametrize(
    "variable",
    [
        "SALES_ENABLED",
        "STRIPE_TAX_ENABLED",
        "STRIPE_COURSE_PRICE_ID",
        "STRIPE_COURSE_PRODUCT_ID",
        "STRIPE_COURSE_AMOUNT",
        "STRIPE_COURSE_CURRENCY",
        "BUSINESS_LEGAL_NAME",
        "BUSINESS_POSTAL_ADDRESS",
        "BUSINESS_SUPPORT_EMAIL",
    ],
)
def test_any_single_missing_variable_stops_the_sale(configured, variable: str) -> None:
    configured(**{variable: ""})

    assert course_catalog() is None


@pytest.mark.parametrize("flag", ["false", "1", "yes", "TRUE"])
def test_sales_are_off_unless_the_flag_is_exactly_true(configured, flag: str) -> None:
    """A truthy-looking value is not consent to charge people."""
    configured(SALES_ENABLED=flag)

    assert course_catalog() is None


def test_tax_collection_cannot_be_left_unconfigured(configured) -> None:
    configured(STRIPE_TAX_ENABLED="false")

    assert course_catalog() is None


@pytest.mark.parametrize("amount", ["0", "-100", "not-a-number"])
def test_an_amount_that_is_not_a_positive_number_stops_the_sale(configured, amount: str) -> None:
    configured(STRIPE_COURSE_AMOUNT=amount)

    assert course_catalog() is None


@pytest.mark.parametrize("currency", ["us", "usdx", "u"])
def test_a_currency_that_is_not_three_letters_stops_the_sale(configured, currency: str) -> None:
    configured(STRIPE_COURSE_CURRENCY=currency)

    assert course_catalog() is None
