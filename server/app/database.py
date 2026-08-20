from __future__ import annotations

import asyncio
from datetime import datetime
from typing import Any

import psycopg

from .config import database_url

SCHEMA = """
CREATE TABLE IF NOT EXISTS course_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checkout_session_id text NOT NULL UNIQUE,
  payment_intent_id text,
  stripe_customer_id text,
  email text NOT NULL,
  google_subject text,
  product_id text NOT NULL,
  price_id text,
  amount_total integer NOT NULL,
  currency text NOT NULL,
  purchased_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS course_purchases_email_idx ON course_purchases (email);
CREATE INDEX IF NOT EXISTS course_purchases_google_subject_idx ON course_purchases (google_subject);
"""


async def initialize_database() -> None:
    if not database_url():
        return
    await asyncio.to_thread(_initialize_database)


def _initialize_database() -> None:
    with psycopg.connect(database_url(), autocommit=True) as connection:
        connection.execute(SCHEMA)


async def record_purchase(values: dict[str, Any]) -> None:
    if not database_url():
        return
    await asyncio.to_thread(_record_purchase, values)


def _record_purchase(values: dict[str, Any]) -> None:
    with psycopg.connect(database_url()) as connection:
        connection.execute(
            """INSERT INTO course_purchases
               (checkout_session_id, payment_intent_id, stripe_customer_id, email,
                google_subject, product_id, price_id, amount_total, currency)
               VALUES (%(checkout_session_id)s, %(payment_intent_id)s, %(stripe_customer_id)s,
                %(email)s, %(google_subject)s, %(product_id)s, %(price_id)s,
                %(amount_total)s, %(currency)s)
               ON CONFLICT (checkout_session_id) DO NOTHING""",
            values,
        )


async def find_course_access(
    subject: str | None, email: str | None
) -> tuple[bool, datetime | None] | None:
    if not database_url():
        return None
    return await asyncio.to_thread(_find_course_access, subject, email)


def _find_course_access(subject: str | None, email: str | None) -> tuple[bool, datetime | None]:
    clauses, params = [], []
    if subject:
        clauses.append("google_subject = %s")
        params.append(subject)
    if email:
        clauses.append("email = %s")
        params.append(email.strip().lower())
    if not clauses:
        return False, None
    with psycopg.connect(database_url()) as connection:
        row = connection.execute(
            f"SELECT purchased_at FROM course_purchases WHERE {' OR '.join(clauses)} "
            "ORDER BY purchased_at DESC LIMIT 1",
            params,
        ).fetchone()
    return (row is not None, row[0] if row else None)
