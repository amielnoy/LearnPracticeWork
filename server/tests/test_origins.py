"""Which origin a redirect may point at.

Checkout builds success and cancel URLs from this, and a Stripe session is a
page the buyer is sent to and comes back from. An attacker who can influence the
return URL turns a real payment into a landing on a page they control, so the
answer comes from configuration and is only ever confirmed — never supplied — by
a request header.
"""

from __future__ import annotations

import pytest
from starlette.datastructures import Headers
from starlette.requests import Request

from app.origins import configured_origins, cors_allow_origin_regex, public_origin

CANONICAL = "https://academy.example"


def request_with(origin: str | None = None, host: str = "api.example") -> Request:
    headers = [(b"host", host.encode())]
    if origin is not None:
        headers.append((b"origin", origin.encode()))
    scope = {
        "type": "http",
        "method": "POST",
        "path": "/api/stripe/checkout",
        "headers": headers,
        "scheme": "https",
        "server": (host, 443),
        "query_string": b"",
        "client": ("203.0.113.10", 51000),
    }
    request = Request(scope)
    request._headers = Headers(scope=scope)
    return request


@pytest.fixture(autouse=True)
def production(monkeypatch: pytest.MonkeyPatch) -> None:
    """These rules only bite in production; the dev fallback is tested separately."""
    monkeypatch.setenv("NODE_ENV", "production")
    monkeypatch.delenv("PUBLIC_APP_ORIGIN", raising=False)
    monkeypatch.delenv("ALLOWED_ORIGINS", raising=False)
    monkeypatch.delenv("REPLIT_DOMAINS", raising=False)


def test_a_replit_domain_becomes_an_https_origin(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("REPLIT_DOMAINS", "app.replit.app")

    assert "https://app.replit.app" in configured_origins()


def test_a_trailing_slash_does_not_create_a_second_distinct_origin(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("ALLOWED_ORIGINS", f"{CANONICAL}/, https://other.example")

    assert configured_origins() == {CANONICAL, "https://other.example"}


def test_the_canonical_origin_wins_over_the_request_header(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("ALLOWED_ORIGINS", f"{CANONICAL},https://other.example")
    monkeypatch.setenv("PUBLIC_APP_ORIGIN", CANONICAL)

    assert public_origin(request_with("https://other.example")) == CANONICAL


def test_a_canonical_origin_that_is_not_allowlisted_is_not_trusted(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """Two variables have to agree, so one stray edit cannot open a redirect."""
    monkeypatch.setenv("ALLOWED_ORIGINS", CANONICAL)
    monkeypatch.setenv("PUBLIC_APP_ORIGIN", "https://typo.example")

    assert public_origin(request_with(CANONICAL)) == CANONICAL


def test_an_allowlisted_request_origin_is_used_when_there_is_no_canonical_one(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("ALLOWED_ORIGINS", f"{CANONICAL},https://second.example")

    assert public_origin(request_with("https://second.example")) == "https://second.example"


def test_an_unknown_origin_yields_nothing_rather_than_a_redirect(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("ALLOWED_ORIGINS", CANONICAL)

    assert public_origin(request_with("https://attacker.example")) is None


def test_the_host_header_is_not_a_source_of_truth_in_production(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setenv("ALLOWED_ORIGINS", CANONICAL)

    assert public_origin(request_with(origin=None, host="attacker.example")) is None


def test_a_local_run_falls_back_to_its_own_base_url(monkeypatch: pytest.MonkeyPatch) -> None:
    """Nothing is configured on a developer's machine, and checkout still has to work."""
    monkeypatch.setenv("NODE_ENV", "development")

    assert public_origin(request_with(origin=None)) == "https://api.example"


def test_a_test_run_does_not_take_the_local_fallback(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("NODE_ENV", "test")

    assert public_origin(request_with(origin=None)) is None


def test_localhost_is_allowed_by_cors_outside_production(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("NODE_ENV", "development")

    assert cors_allow_origin_regex() is not None


def test_production_cors_has_no_wildcard_pattern() -> None:
    assert cors_allow_origin_regex() is None
