from __future__ import annotations

import asyncio
from datetime import datetime
from typing import Any

import psycopg
from psycopg.rows import tuple_row

from .config import database_url, positive_int

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
  purchased_at timestamptz NOT NULL DEFAULT now(),
  retention_until timestamptz
);
CREATE INDEX IF NOT EXISTS course_purchases_email_idx ON course_purchases (email);
CREATE INDEX IF NOT EXISTS course_purchases_google_subject_idx ON course_purchases (google_subject);
CREATE TABLE IF NOT EXISTS api_rate_limits (
  bucket text NOT NULL,
  key_hash text NOT NULL,
  window_started timestamptz NOT NULL DEFAULT now(),
  hits integer NOT NULL DEFAULT 0,
  PRIMARY KEY (bucket, key_hash)
);
CREATE INDEX IF NOT EXISTS api_rate_limits_window_idx ON api_rate_limits (window_started);
"""


async def initialize_database() -> None:
    if not database_url():
        return
    await asyncio.to_thread(_initialize_database)


async def database_ready() -> bool:
    if not database_url():
        return False
    try:
        return await asyncio.wait_for(asyncio.to_thread(_database_ready), timeout=4)
    except Exception:
        return False


def _database_ready() -> bool:
    with psycopg.connect(database_url(), connect_timeout=3) as connection:
        return connection.execute("SELECT 1").fetchone() == (1,)


def _initialize_database() -> None:
    with psycopg.connect(database_url(), autocommit=True) as connection:
        connection.execute(SCHEMA)
        retention_days = positive_int("PURCHASE_RETENTION_DAYS", 2_922)
        connection.execute(
            """ALTER TABLE course_purchases
               ADD COLUMN IF NOT EXISTS retention_until timestamptz"""
        )
        connection.execute(
            """CREATE INDEX IF NOT EXISTS course_purchases_retention_idx
               ON course_purchases (retention_until)"""
        )
        connection.execute(
            """UPDATE course_purchases
               SET retention_until = purchased_at + (%s * interval '1 day')
               WHERE retention_until IS NULL""",
            (retention_days,),
        )
        connection.execute("DELETE FROM course_purchases WHERE retention_until <= now()")


async def record_purchase(values: dict[str, Any]) -> None:
    if not database_url():
        return
    await asyncio.to_thread(_record_purchase, values)


def _record_purchase(values: dict[str, Any]) -> None:
    purchase = {**values, "retention_days": positive_int("PURCHASE_RETENTION_DAYS", 2_922)}
    with psycopg.connect(database_url()) as connection:
        connection.execute(
            """INSERT INTO course_purchases
               (checkout_session_id, payment_intent_id, stripe_customer_id, email,
                google_subject, product_id, price_id, amount_total, currency, retention_until)
               VALUES (%(checkout_session_id)s, %(payment_intent_id)s, %(stripe_customer_id)s,
                %(email)s, %(google_subject)s, %(product_id)s, %(price_id)s,
                %(amount_total)s, %(currency)s,
                now() + (%(retention_days)s * interval '1 day'))
               ON CONFLICT (checkout_session_id) DO NOTHING""",
            purchase,
        )


async def hit_rate_limit(
    bucket: str, key_hash: str, limit: int, window_seconds: float
) -> tuple[bool, int]:
    return await asyncio.to_thread(_hit_rate_limit, bucket, key_hash, limit, window_seconds)


def _hit_rate_limit(
    bucket: str, key_hash: str, limit: int, window_seconds: float
) -> tuple[bool, int]:
    with psycopg.connect(database_url()) as connection:
        row = connection.execute(
            """INSERT INTO api_rate_limits (bucket, key_hash, window_started, hits)
               VALUES (%s, %s, now(), 1)
               ON CONFLICT (bucket, key_hash) DO UPDATE SET
                 hits = CASE
                   WHEN api_rate_limits.window_started <= now() - (%s * interval '1 second')
                   THEN 1 ELSE api_rate_limits.hits + 1 END,
                 window_started = CASE
                   WHEN api_rate_limits.window_started <= now() - (%s * interval '1 second')
                   THEN now() ELSE api_rate_limits.window_started END
               RETURNING hits""",
            (bucket, key_hash, window_seconds, window_seconds),
        ).fetchone()
    hits = int(row[0])
    return hits <= limit, max(0, limit - hits)


async def find_course_access(
    subject: str | None,
    email: str | None,
    product_id: str,
    price_id: str,
    amount_total: int,
    currency: str,
) -> tuple[bool, datetime | None] | None:
    if not database_url():
        return None
    return await asyncio.to_thread(
        _find_course_access,
        subject,
        email,
        product_id,
        price_id,
        amount_total,
        currency,
    )


def _find_course_access(
    subject: str | None,
    email: str | None,
    product_id: str,
    price_id: str,
    amount_total: int,
    currency: str,
) -> tuple[bool, datetime | None]:
    clauses, params = [], []
    if subject:
        clauses.append("google_subject = %s")
        params.append(subject)
    if email:
        clauses.append("email = %s")
        params.append(email.strip().lower())
    if not clauses:
        return False, None
    with psycopg.connect(database_url(), row_factory=tuple_row) as connection:
        row = connection.execute(
            f"SELECT purchased_at FROM course_purchases WHERE product_id = %s "
            f"AND price_id = %s AND amount_total = %s AND currency = %s AND "
            f"({' OR '.join(clauses)}) "
            "ORDER BY purchased_at DESC LIMIT 1",
            [product_id, price_id, amount_total, currency, *params],
        ).fetchone()
    return (row is not None, row[0] if row else None)
