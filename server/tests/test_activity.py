"""Sign-ins and AI calls leave a row, and never fail the request to do it."""

from __future__ import annotations

import pytest

from app import activity, database, dependencies


@pytest.fixture
def recorded(monkeypatch: pytest.MonkeyPatch) -> dict[str, list[dict]]:
    """Capture the rows the routes ask for, without a database to write them to."""
    rows: dict[str, list[dict]] = {"login": [], "ai": []}

    async def login(**values):
        rows["login"].append(values)

    async def ai(**values):
        rows["ai"].append(values)

    monkeypatch.setattr(activity, "record_login_event", login)
    monkeypatch.setattr(activity, "record_ai_usage_event", ai)
    return rows


async def test_a_successful_sign_in_is_recorded_against_its_subject(
    api_client, google_jwks, google_token, client_headers, recorded
):
    response = await api_client.post(
        "/api/auth/google", json={"credential": google_token()}, headers=client_headers("IL")
    )
    assert response.status_code == 200
    (row,) = recorded["login"]
    assert row["outcome"] == "success"
    assert row["subject"]
    assert row["country"] == "IL"
    assert row["client"] == "desktop_web"


async def test_a_rejected_sign_in_is_recorded_without_an_identity(api_client, recorded):
    assert (
        await api_client.post("/api/auth/google", json={"credential": "not.a.token"})
    ).status_code == 401
    (row,) = recorded["login"]
    assert row["outcome"] == "rejected"
    assert row["subject"] is None


async def test_no_login_row_ever_carries_an_email_address(
    api_client, google_jwks, google_token, recorded
):
    """The hash is what links a row to a person; the address is not kept."""
    await api_client.post("/api/auth/google", json={"credential": google_token()})
    (row,) = recorded["login"]
    assert "reader@example.com" not in str(row)
    assert set(row) == {"subject", "user_hash", "outcome", "country", "client"}


async def test_a_throttled_ai_request_is_recorded_as_a_429(api_client, monkeypatch, recorded):
    """A refused request never reaches a provider, and is still worth a row."""

    async def exhausted(_key):
        return False, 0

    monkeypatch.setattr(dependencies.burst_limiter, "hit", exhausted)
    response = await api_client.post(
        "/api/ai/generate", json={"messages": [{"role": "user", "content": "hi"}]}
    )
    assert response.status_code == 429
    (row,) = recorded["ai"]
    assert row["status"] == 429
    assert row["provider"] == "unknown"


async def test_a_failed_event_write_does_not_fail_the_request(monkeypatch):
    """The row explains what happened; it must never become what happened."""
    monkeypatch.setenv("DATABASE_URL", "postgresql://nobody@127.0.0.1:1/none")

    def explode(*_args, **_kwargs):
        raise RuntimeError("no route to host")

    monkeypatch.setattr(database, "_execute", explode)
    await database.record_login_event(
        subject="sub", user_hash="hash", outcome="success", country="IL", client="desktop_web"
    )
