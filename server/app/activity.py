"""Sign-ins and AI calls, counted for a dashboard and kept as rows.

The Prometheus counters in `metrics.py` answer "how many, right now" and are
gone at the next restart; a `login_events` or `ai_usage_events` row answers
"what happened to this account in March". Both wanted the same four facts about
a request, so both are recorded from one call rather than from two that could
drift apart — and the row carries the same HMAC of the email that the metric
carries as a label, so a spike on the dashboard and a row in the table can be
matched up without either of them holding an address.

Neither write can fail the request it describes: the counter cannot fail, and
the row is written through `database._record_event`, which swallows and logs.
"""

from __future__ import annotations

from fastapi import Request

from .database import record_ai_usage_event, record_login_event
from .google_auth import GoogleUser
from .metrics import client_class, country, observe_ai, observe_login, user_id


async def note_login(
    request: Request, user: GoogleUser | None, outcome: str, *, email: str | None = None
) -> None:
    """`user` is present only once an attempt has identified someone."""
    address = user.email if user else email
    observe_login(request, address, outcome)
    await record_login_event(
        subject=user.subject if user else None,
        user_hash=user_id(address),
        outcome=outcome,
        country=country(request),
        client=client_class(request),
    )


async def note_ai(
    request: Request,
    *,
    provider: str,
    model: str,
    user: GoogleUser | None,
    status: int,
) -> None:
    email = user.email if user else None
    observe_ai(request, provider=provider, model=model, email=email, status=status)
    await record_ai_usage_event(
        subject=user.subject if user else None,
        user_hash=user_id(email),
        provider=provider,
        model=model,
        status=status,
        country=country(request),
        client=client_class(request),
    )
