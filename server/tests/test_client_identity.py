"""Who an anonymous request is charged to.

Behind a proxy, `request.client.host` names the proxy rather than the caller,
and on a platform that fronts the app with several edge pods it names a
*different* proxy from one request to the next. That is not a small
inaccuracy: it means anonymous callers share whichever bucket their request
lands in, so one visitor meets a 429 caused by another's usage, and the daily
allowance is not enforced at all because the next request lands elsewhere. It
was visible from outside as `X-AI-Quota-Remaining` bouncing 8, 9, 9, 8, 9
across five consecutive requests instead of counting down.

The header can be set by anyone, so the direction it is read from is the whole
security argument: forged entries are always on the left.
"""

from __future__ import annotations

import pytest
from starlette.datastructures import Headers
from starlette.requests import Request

from app.dependencies import client_ip

CALLER = "203.0.113.10"
LOAD_BALANCER = "10.0.0.1"
SOCKET = "192.0.2.99"


def request_with(**headers: str) -> Request:
    raw = [(name.encode(), value.encode()) for name, value in headers.items()]
    scope = {
        "type": "http",
        "method": "POST",
        "path": "/api/ai/generate",
        "headers": raw,
        "scheme": "https",
        "server": ("api.example", 443),
        "query_string": b"",
        "client": (SOCKET, 51000),
    }
    request = Request(scope)
    request._headers = Headers(scope=scope)
    return request


@pytest.fixture(autouse=True)
def production(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("NODE_ENV", "production")


def test_a_caller_behind_one_load_balancer_is_identified(monkeypatch) -> None:
    """`<caller>, <load balancer>` is the common cloud shape, and the default."""
    request = request_with(**{"x-forwarded-for": f"{CALLER}, {LOAD_BALANCER}"})

    assert client_ip(request) == CALLER


def test_a_forged_entry_on_the_left_is_ignored() -> None:
    """The entry a client wrote itself must never become its quota identity."""
    forged = "1.1.1.1"
    request = request_with(**{"x-forwarded-for": f"{forged}, {CALLER}, {LOAD_BALANCER}"})

    assert client_ip(request) == CALLER
    assert client_ip(request) != forged


def test_two_callers_behind_the_same_proxy_are_told_apart() -> None:
    """The bug this fixes: both used to key to the proxy, so they shared a quota."""
    other = "198.51.100.7"
    first = request_with(**{"x-forwarded-for": f"{CALLER}, {LOAD_BALANCER}"})
    second = request_with(**{"x-forwarded-for": f"{other}, {LOAD_BALANCER}"})

    assert client_ip(first) != client_ip(second)


def test_the_same_caller_through_a_different_edge_is_still_the_same_caller() -> None:
    """Edge pods vary between requests; the caller must not vary with them."""
    first = request_with(**{"x-forwarded-for": f"{CALLER}, 10.0.0.1"})
    second = request_with(**{"x-forwarded-for": f"{CALLER}, 10.0.0.2"})

    assert client_ip(first) == client_ip(second)


def test_a_single_entry_is_used_as_it_stands() -> None:
    """A proxy that appends the caller without appending itself leaves one entry."""
    request = request_with(**{"x-forwarded-for": CALLER})

    assert client_ip(request) == CALLER


def test_whitespace_and_empty_entries_do_not_shift_the_count() -> None:
    request = request_with(**{"x-forwarded-for": f"  {CALLER} , , {LOAD_BALANCER}  "})

    assert client_ip(request) == CALLER


def test_flys_own_header_still_wins_where_it_is_present() -> None:
    """Fly writes this itself and it is not part of the forwarded chain."""
    request = request_with(
        **{"fly-client-ip": CALLER, "x-forwarded-for": f"1.1.1.1, {LOAD_BALANCER}"}
    )

    assert client_ip(request) == CALLER


def test_no_forwarding_header_falls_back_to_the_socket() -> None:
    assert client_ip(request_with()) == SOCKET


def test_a_local_run_never_trusts_the_header(monkeypatch: pytest.MonkeyPatch) -> None:
    """Outside production nothing sits in front, so the header is only a claim."""
    monkeypatch.setenv("NODE_ENV", "development")
    request = request_with(**{"x-forwarded-for": f"1.1.1.1, {LOAD_BALANCER}"})

    assert client_ip(request) == SOCKET


def test_the_hop_count_is_configurable_for_a_deeper_chain(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """Two proxies append two entries, and the default of one would read the wrong one."""
    monkeypatch.setattr("app.dependencies.TRUSTED_PROXY_HOPS", 2)
    request = request_with(**{"x-forwarded-for": f"{CALLER}, {LOAD_BALANCER}, 10.0.0.2"})

    assert client_ip(request) == CALLER
