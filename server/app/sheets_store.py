"""Learner progress, kept in the LearnPracticeWorkData spreadsheet.

The sheet is reached through an Apps Script web app rather than the Sheets API:
the script can take `LockService.getScriptLock()`, which is what makes a
read-modify-write merge safe between two devices syncing at once. It also keeps
a Google private key out of a function bundle with a size limit to respect.

Only the Google `sub` is sent. A spreadsheet has no row level security, so an
email here would be readable by everyone the sheet is ever shared with.

The shared token travels in the JSON body, never in the query string: a query
string is written into Google's execution logs and any proxy log along the
way, so the web app reads it from `body.token` instead of `e.parameter`.
"""

from __future__ import annotations

from typing import Any

import httpx

from .config import env

# Apps Script cold starts are seconds, and the UI renders from localStorage anyway.
# `Progress.gs` waits at most LOCK_WAIT_MS (12s) for its script lock, deliberately
# under this: the script has to be able to give up and answer `{"error":"busy"}`
# while the client is still listening, or a union it wrote is discarded as a 500.
# Move one of these two numbers and move the other.
TIMEOUT = 20


def _url() -> str | None:
    return env("SHEETS_WEBAPP_URL")


def _transport() -> httpx.AsyncBaseTransport | None:
    """Overridden in tests; None lets httpx use the real network."""
    return None


async def _call(op: str, subject: str, progress: dict[str, Any] | None) -> dict[str, Any] | None:
    url = _url()
    if url is None:
        return None
    body: dict[str, Any] = {"op": op, "sub": subject, "token": env("SHEETS_WEBAPP_TOKEN") or ""}
    if progress is not None:
        body["progress"] = progress
    # An Apps Script `/exec` URL answers 302 and serves the body only from
    # `script.googleusercontent.com/macros/echo`. httpx does not follow
    # redirects unless told to, and `raise_for_status()` raises on a 3xx, so
    # without this every load and merge is a 500.
    async with httpx.AsyncClient(
        timeout=TIMEOUT, transport=_transport(), follow_redirects=True
    ) as client:
        response = await client.post(url, json=body)
    response.raise_for_status()
    payload = response.json()
    if not isinstance(payload, dict) or "progress" not in payload:
        raise ValueError(f"the progress web app answered without a progress body: {payload!r}")
    return payload["progress"]


async def load_progress(subject: str) -> dict[str, Any] | None:
    return await _call("load", subject, None)


async def merge_progress(subject: str, incoming: dict[str, Any]) -> dict[str, Any] | None:
    return await _call("merge", subject, incoming)
