from __future__ import annotations

import asyncio
import logging
from datetime import datetime
from pathlib import Path
from typing import Any

import psycopg
from psycopg.rows import tuple_row

from .config import database_url, positive_int

logger = logging.getLogger(__name__)

# The DDL for every table this API owns. Kept as SQL next to this module rather
# than as a string inside it, because it is read far more often than it is run
# and the comments in it are the documentation for what each table is for.
SCHEMA = (Path(__file__).with_name("schema.sql")).read_text(encoding="utf-8")

# Rate-limit rows are reused in place, so the table is bounded by the number of
# distinct callers rather than by traffic — which for IP-keyed buckets grows
# without limit over time. The longest window is a day, so anything untouched
# for two is a row no limiter will ever consult again.
STALE_RATE_LIMIT_DAYS = 2

# How long an event row is kept. These are operational records — enough history
# to see a trend or investigate a complaint, not a permanent log of what each
# person did. Purchases have their own, much longer, statutory retention.
EVENT_RETENTION_DAYS_DEFAULT = 400


def event_retention_days() -> int:
    return positive_int("EVENT_RETENTION_DAYS", EVENT_RETENTION_DAYS_DEFAULT)


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
            """UPDATE course_purchases
               SET retention_until = purchased_at + (%s * interval '1 day')
               WHERE retention_until IS NULL""",
            (retention_days,),
        )
        _expire(connection)


def _expire(connection: psycopg.Connection) -> None:
    """Drop what is past its retention, and the quota rows nothing will read again.

    Boot is the only scheduled moment this process has, which makes this
    housekeeping approximate: a deployment that never restarts never runs it.
    That is the right trade for now — every table here is bounded by the delete
    happening eventually, not by it happening on a particular day.
    """
    connection.execute("DELETE FROM course_purchases WHERE retention_until <= now()")
    connection.execute("DELETE FROM login_events WHERE retention_until <= now()")
    connection.execute("DELETE FROM ai_usage_events WHERE retention_until <= now()")
    connection.execute(
        """DELETE FROM api_rate_limits
           WHERE window_started <= now() - (%s * interval '1 day')""",
        (STALE_RATE_LIMIT_DAYS,),
    )


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


async def release_rate_limit(bucket: str, key_hash: str) -> int:
    """Give back one hit, and report what is left. Never goes below zero."""
    return await asyncio.to_thread(_release_rate_limit, bucket, key_hash)


def _release_rate_limit(bucket: str, key_hash: str) -> int:
    with psycopg.connect(database_url()) as connection:
        row = connection.execute(
            """UPDATE api_rate_limits SET hits = GREATEST(0, hits - 1)
               WHERE bucket = %s AND key_hash = %s
               RETURNING hits""",
            (bucket, key_hash),
        ).fetchone()
    return int(row[0]) if row else 0


async def list_course_purchases(limit: int = 200) -> list[dict]:
    """Recorded purchases, newest first. Returns [] when no database is configured."""
    if not database_url():
        return []
    return await asyncio.to_thread(_list_course_purchases, limit)


def _list_course_purchases(limit: int) -> list[dict]:
    with psycopg.connect(database_url()) as connection:
        rows = connection.execute(
            """SELECT id, email, google_subject, amount_total, currency, purchased_at
               FROM course_purchases ORDER BY purchased_at DESC LIMIT %s""",
            (limit,),
        ).fetchall()
    return [
        {
            "id": str(row[0]),
            "email": row[1],
            "google_subject": row[2],
            "amount_total": row[3],
            "currency": row[4],
            "purchased_at": row[5],
        }
        for row in rows
    ]


async def find_course_purchase(purchase_id: str) -> dict | None:
    if not database_url():
        return None
    return await asyncio.to_thread(_find_course_purchase, purchase_id)


def _find_course_purchase(purchase_id: str) -> dict | None:
    with psycopg.connect(database_url()) as connection:
        row = connection.execute(
            """SELECT id, email, google_subject, amount_total, currency, purchased_at
               FROM course_purchases WHERE id = %s""",
            (purchase_id,),
        ).fetchone()
    if row is None:
        return None
    return {
        "id": str(row[0]),
        "email": row[1],
        "google_subject": row[2],
        "amount_total": row[3],
        "currency": row[4],
        "purchased_at": row[5],
    }


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


# --- Accounts ---------------------------------------------------------------


async def record_sign_in(subject: str, email: str) -> None:
    if not database_url() or not subject:
        return
    await asyncio.to_thread(_record_sign_in, subject, email)


def _record_sign_in(subject: str, email: str) -> None:
    address = (email or "").strip().lower()
    with psycopg.connect(database_url()) as connection:
        _ensure_user(connection, subject, address)
        connection.execute(
            """UPDATE academy_users
               SET email = %s, last_seen_at = now(), login_count = login_count + 1
               WHERE google_subject = %s""",
            (address, subject),
        )
        # A purchase made at checkout carries an email and, when the buyer was
        # not signed in, no subject. Signing in later is the moment the two can
        # be connected — and until they are, entitlement has to be decided by
        # matching an email address on every request.
        if address:
            connection.execute(
                """UPDATE course_purchases SET google_subject = %s
                   WHERE google_subject IS NULL AND email = %s""",
                (subject, address),
            )


def _ensure_user(connection: psycopg.Connection, subject: str, email: str) -> None:
    connection.execute(
        """INSERT INTO academy_users (google_subject, email) VALUES (%s, %s)
           ON CONFLICT (google_subject) DO NOTHING""",
        (subject, email),
    )


# --- Learner progress -------------------------------------------------------

# What a browser is allowed to put in the two set columns. They arrive from
# `localStorage`, which is editable by whoever owns the browser, and they are
# stored rather than rendered — so the bound is about the size of the row, not
# about what it contains. The client applies the same cap on the way in.
MAX_PROGRESS_IDS = 500

EMPTY_PROGRESS: dict[str, Any] = {
    "resumeStarted": False,
    "resumeCompleted": False,
    "interviewStarted": False,
    "interviewAnswers": 0,
    "interviewCompleted": False,
    "practiceCompleted": [],
    "lecturesViewed": [],
    "lastTool": None,
}


def _progress_view(row: tuple) -> dict[str, Any]:
    return {
        "resumeStarted": row[0],
        "resumeCompleted": row[1],
        "interviewStarted": row[2],
        "interviewAnswers": row[3],
        "interviewCompleted": row[4],
        "practiceCompleted": list(row[5]),
        "lecturesViewed": list(row[6]),
        "lastTool": row[7],
    }


_PROGRESS_COLUMNS = """resume_started, resume_completed, interview_started,
                       interview_answers, interview_completed, practice_completed,
                       lectures_viewed, last_tool"""


async def load_progress(subject: str) -> dict[str, Any] | None:
    """Stored progress, `EMPTY_PROGRESS` when there is none, None with no database."""
    if not database_url():
        return None
    return await asyncio.to_thread(_load_progress, subject)


def _load_progress(subject: str) -> dict[str, Any]:
    with psycopg.connect(database_url(), row_factory=tuple_row) as connection:
        row = connection.execute(
            f"SELECT {_PROGRESS_COLUMNS} FROM learner_progress WHERE google_subject = %s",
            (subject,),
        ).fetchone()
    return _progress_view(row) if row else dict(EMPTY_PROGRESS)


async def merge_progress(
    subject: str, email: str, incoming: dict[str, Any]
) -> dict[str, Any] | None:
    if not database_url():
        return None
    return await asyncio.to_thread(_merge_progress, subject, email, incoming)


def _merge_progress(subject: str, email: str, incoming: dict[str, Any]) -> dict[str, Any]:
    """Union what arrived with what is stored, and answer with the result.

    Every field merges towards "more done": booleans are OR-ed, the answer
    counter takes the larger of the two, and the two id lists are unioned. That
    makes the write idempotent and order-independent, which matters because the
    same person can be signed in on two devices, each holding a different
    partial history in `localStorage`. The alternative — last write wins — means
    opening the site on a second device silently discards the first one's
    progress.

    `lastTool` is the exception: it is a cursor, not an achievement, so the
    newer value wins when one was sent.
    """
    values = {
        "subject": subject,
        "resume_started": bool(incoming.get("resumeStarted")),
        "resume_completed": bool(incoming.get("resumeCompleted")),
        "interview_started": bool(incoming.get("interviewStarted")),
        "interview_answers": max(0, int(incoming.get("interviewAnswers") or 0)),
        "interview_completed": bool(incoming.get("interviewCompleted")),
        "practice_completed": list(incoming.get("practiceCompleted") or [])[:MAX_PROGRESS_IDS],
        "lectures_viewed": list(incoming.get("lecturesViewed") or [])[:MAX_PROGRESS_IDS],
        "last_tool": incoming.get("lastTool"),
    }
    with psycopg.connect(database_url(), row_factory=tuple_row) as connection:
        _ensure_user(connection, subject, (email or "").strip().lower())
        row = connection.execute(
            f"""INSERT INTO learner_progress (
                  google_subject, resume_started, resume_completed, interview_started,
                  interview_answers, interview_completed, practice_completed,
                  lectures_viewed, last_tool)
                VALUES (%(subject)s, %(resume_started)s, %(resume_completed)s,
                  %(interview_started)s, %(interview_answers)s, %(interview_completed)s,
                  %(practice_completed)s, %(lectures_viewed)s, %(last_tool)s)
                ON CONFLICT (google_subject) DO UPDATE SET
                  resume_started = learner_progress.resume_started OR EXCLUDED.resume_started,
                  resume_completed = learner_progress.resume_completed OR EXCLUDED.resume_completed,
                  interview_started = learner_progress.interview_started
                                      OR EXCLUDED.interview_started,
                  interview_answers = GREATEST(learner_progress.interview_answers,
                                               EXCLUDED.interview_answers),
                  interview_completed = learner_progress.interview_completed
                                        OR EXCLUDED.interview_completed,
                  practice_completed = COALESCE((
                    SELECT array_agg(DISTINCT id) FROM unnest(
                      learner_progress.practice_completed || EXCLUDED.practice_completed) AS id
                  ), '{{}}')::text[],
                  lectures_viewed = COALESCE((
                    SELECT array_agg(DISTINCT id) FROM unnest(
                      learner_progress.lectures_viewed || EXCLUDED.lectures_viewed) AS id
                  ), '{{}}')::text[],
                  last_tool = COALESCE(EXCLUDED.last_tool, learner_progress.last_tool),
                  updated_at = now()
                RETURNING {_PROGRESS_COLUMNS}""",
            values,
        ).fetchone()
    assert row is not None  # an upsert with RETURNING always produces a row
    return _progress_view(row)


# --- Activity ---------------------------------------------------------------


async def record_login_event(
    *, subject: str | None, user_hash: str | None, outcome: str, country: str, client: str
) -> None:
    await _record_event(
        """INSERT INTO login_events
             (google_subject, user_hash, outcome, country, client, retention_until)
           VALUES (%s, %s, %s, %s, %s, now() + (%s * interval '1 day'))""",
        (subject, user_hash, outcome, country, client, event_retention_days()),
    )


async def record_ai_usage_event(
    *,
    subject: str | None,
    user_hash: str | None,
    provider: str,
    model: str,
    status: int,
    country: str,
    client: str,
) -> None:
    await _record_event(
        """INSERT INTO ai_usage_events
             (google_subject, user_hash, provider, model, status, country, client,
              retention_until)
           VALUES (%s, %s, %s, %s, %s, %s, %s, now() + (%s * interval '1 day'))""",
        (subject, user_hash, provider, model, status, country, client, event_retention_days()),
    )


async def _record_event(statement: str, parameters: tuple) -> None:
    """Write an activity row, and never let writing one fail the request it describes.

    These rows exist to explain what happened; a request that succeeded and then
    could not be written down still succeeded, and turning that into a 500 would
    make the record more important than the thing it records.
    """
    if not database_url():
        return
    try:
        await asyncio.to_thread(_execute, statement, parameters)
    except Exception:
        logger.exception("Could not record an activity event")


def _execute(statement: str, parameters: tuple) -> None:
    with psycopg.connect(database_url()) as connection:
        connection.execute(statement, parameters)


# --- Test history -----------------------------------------------------------


def record_test_run(
    *,
    repository: str,
    branch: str,
    commit_sha: str,
    run_id: str,
    run_attempt: int,
    suites: dict[str, dict[str, float]],
) -> int:
    """Store one completed run and its per-suite totals. Synchronous: CI calls it.

    A re-run reports the same `run_id`, so the run row is claimed rather than
    inserted a second time and its suites are replaced. Without that, a re-run
    doubles every count against the same commit.
    """
    with psycopg.connect(database_url(), row_factory=tuple_row) as connection:
        with connection.transaction():
            row = connection.execute(
                """INSERT INTO test_runs
                     (repository, branch, commit_sha, run_id, run_attempt, completed_at)
                   VALUES (%s, %s, %s, %s, %s, now())
                   ON CONFLICT (repository, run_id, run_attempt) DO UPDATE
                     SET branch = EXCLUDED.branch,
                         commit_sha = EXCLUDED.commit_sha,
                         completed_at = now()
                   RETURNING id""",
                (repository, branch, commit_sha, run_id, run_attempt),
            ).fetchone()
            assert row is not None
            run = int(row[0])
            connection.execute("DELETE FROM test_suite_results WHERE run_id = %s", (run,))
            for suite, totals in suites.items():
                connection.execute(
                    """INSERT INTO test_suite_results
                         (run_id, suite, passed, failed, broken, skipped, unknown,
                          duration_seconds)
                       VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""",
                    (
                        run,
                        suite,
                        int(totals.get("passed", 0)),
                        int(totals.get("failed", 0)),
                        int(totals.get("broken", 0)),
                        int(totals.get("skipped", 0)),
                        int(totals.get("unknown", 0)),
                        float(totals.get("duration", 0.0)),
                    ),
                )
    return run
