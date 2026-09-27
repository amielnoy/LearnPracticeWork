"""The spreadsheet store: what it sends, what it refuses to send, and how it fails."""

from __future__ import annotations

import httpx
import pytest

from app import sheets_store

EMPTY = {
    "resumeStarted": False,
    "resumeCompleted": False,
    "interviewStarted": False,
    "interviewAnswers": 0,
    "interviewCompleted": False,
    "practiceCompleted": [],
    "lecturesViewed": [],
    "lastTool": None,
}


@pytest.fixture
def configured(monkeypatch):
    monkeypatch.setenv("SHEETS_WEBAPP_URL", "https://script.example/exec")
    monkeypatch.setenv("SHEETS_WEBAPP_TOKEN", "t" * 40)


def transport(handler):
    return httpx.MockTransport(handler)


async def test_no_url_configured_reads_as_no_store(monkeypatch):
    monkeypatch.delenv("SHEETS_WEBAPP_URL", raising=False)
    assert await sheets_store.load_progress("123") is None


async def test_load_returns_the_stored_progress(configured, monkeypatch):
    def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(200, json={"progress": EMPTY})

    monkeypatch.setattr(sheets_store, "_transport", lambda: transport(handler))
    assert await sheets_store.load_progress("123") == EMPTY


async def test_the_request_carries_the_sub_and_never_an_email(configured, monkeypatch):
    seen: dict = {}

    def handler(request: httpx.Request) -> httpx.Response:
        seen["body"] = request.content.decode()
        seen["query"] = request.url.query
        return httpx.Response(200, json={"progress": EMPTY})

    monkeypatch.setattr(sheets_store, "_transport", lambda: transport(handler))
    await sheets_store.merge_progress("123", {**EMPTY, "resumeStarted": True})
    assert '"sub": "123"' in seen["body"] or '"sub":"123"' in seen["body"]
    assert "@" not in seen["body"]
    # The correction to the brief: the token travels in the body, never the query
    # string, because a query-string token lands in Google's execution logs and
    # any proxy log along the way. Pin both sides of that so nobody moves it back.
    assert ("t" * 40) in seen["body"]
    assert seen["query"] == b""


async def test_an_http_error_raises_rather_than_reading_as_absent(configured, monkeypatch):
    def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(500, text="boom")

    monkeypatch.setattr(sheets_store, "_transport", lambda: transport(handler))
    with pytest.raises(httpx.HTTPStatusError):
        await sheets_store.load_progress("123")


async def test_a_body_without_progress_raises(configured, monkeypatch):
    def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(200, json={"error": "unauthorized"})

    monkeypatch.setattr(sheets_store, "_transport", lambda: transport(handler))
    with pytest.raises(ValueError):
        await sheets_store.load_progress("123")
