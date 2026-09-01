"""Publishing what a completed test run found.

Two destinations, because they answer different questions and neither replaces
the other. The Pushgateway holds one push per grouping key, so what it can tell
you is the state of the latest run on a branch; `test_runs` accumulates, so it
can tell you when a suite started getting slower or which commit first broke it.

Both are optional and independent: a missing `PUSHGATEWAY_URL` or a missing
`DATABASE_URL` disables that half and says so, and CI stays green either way —
this step runs after the suites and must never be the reason a build fails.
"""

from __future__ import annotations

import json
import os
import time
from collections import Counter, defaultdict
from pathlib import Path

from prometheus_client import CollectorRegistry, Gauge, push_to_gateway
from prometheus_client.exposition import basic_auth_handler

from .config import database_url, positive_int
from .database import record_test_run

STATUSES = ("passed", "failed", "broken", "skipped", "unknown")


def run_identity() -> dict[str, str]:
    """Which run this is, from the environment GitHub Actions provides."""
    return {
        "repository": os.getenv("GITHUB_REPOSITORY", "local"),
        "branch": os.getenv("GITHUB_REF_NAME", "local"),
        "commit": os.getenv("GITHUB_SHA", "local"),
        "run_id": os.getenv("GITHUB_RUN_ID", "local"),
    }


def suite_totals(
    counts: Counter[tuple[str, str]], durations: dict[str, float]
) -> dict[str, dict[str, float]]:
    """Per-suite rows, as `record_test_run` wants them: every status, zero-filled.

    Zero-filling matters for reading the table later — a suite with no failures
    should say `failed = 0`, not leave the column out, or "no failures" and "no
    row" become the same answer to a query.
    """
    suites = {suite for suite, _ in counts} | set(durations)
    return {
        suite: {
            **{status: float(counts.get((suite, status), 0)) for status in STATUSES},
            "duration": durations.get(suite, 0.0),
        }
        for suite in suites
    }


def store(directory: Path) -> bool:
    """Keep the run in Postgres. False when no database is configured."""
    if not database_url():
        print("DATABASE_URL is not configured; test-history storage is disabled.")
        return False
    counts, durations = read_allure_results(directory)
    if not counts:
        raise RuntimeError(f"No Allure test results found in {directory}")
    identity = run_identity()
    record_test_run(
        repository=identity["repository"],
        branch=identity["branch"],
        commit_sha=identity["commit"],
        run_id=identity["run_id"],
        run_attempt=positive_int("GITHUB_RUN_ATTEMPT", 1),
        suites=suite_totals(counts, durations),
    )
    return True


def read_allure_results(directory: Path) -> tuple[Counter[tuple[str, str]], dict[str, float]]:
    counts: Counter[tuple[str, str]] = Counter()
    durations: dict[str, float] = defaultdict(float)
    for path in directory.glob("*-result.json"):
        try:
            result = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            continue
        status = result.get("status")
        if status not in {"passed", "failed", "broken", "skipped", "unknown"}:
            continue
        labels = {
            item.get("name"): item.get("value")
            for item in result.get("labels", [])
            if isinstance(item, dict)
        }
        suite = labels.get("suite") or labels.get("parentSuite") or "unspecified"
        counts[(str(suite), status)] += 1
        started, stopped = result.get("start"), result.get("stop")
        if isinstance(started, int | float) and isinstance(stopped, int | float):
            durations[str(suite)] += max(0, stopped - started) / 1000
    return counts, dict(durations)


def publish(directory: Path) -> bool:
    gateway = os.getenv("PUSHGATEWAY_URL", "").strip()
    if not gateway:
        print("PUSHGATEWAY_URL is not configured; test-history publishing is disabled.")
        return False
    counts, durations = read_allure_results(directory)
    if not counts:
        raise RuntimeError(f"No Allure test results found in {directory}")

    registry = CollectorRegistry()
    results = Gauge(
        "academy_test_results",
        "Tests in the latest completed run grouped by suite and status.",
        ("suite", "status"),
        registry=registry,
    )
    duration = Gauge(
        "academy_test_suite_duration_seconds",
        "Total test duration in the latest completed run grouped by suite.",
        ("suite",),
        registry=registry,
    )
    run_info = Gauge(
        "academy_test_run_info",
        "Identity of the latest published test run.",
        ("repository", "branch", "commit", "run_id"),
        registry=registry,
    )
    completed = Gauge(
        "academy_test_run_completed_timestamp_seconds",
        "Unix timestamp when the latest test run was published.",
        registry=registry,
    )
    for (suite, status), value in counts.items():
        results.labels(suite, status).set(value)
    for suite, value in durations.items():
        duration.labels(suite).set(value)
    identity = run_identity()
    run_info.labels(
        identity["repository"], identity["branch"], identity["commit"], identity["run_id"]
    ).set(1)
    completed.set(time.time())

    username = os.getenv("PUSHGATEWAY_USERNAME", "")
    password = os.getenv("PUSHGATEWAY_PASSWORD", "")

    def handler(url, method, timeout, headers, data):
        return basic_auth_handler(url, method, timeout, headers, data, username, password)

    options = {"handler": handler} if username else {}
    push_to_gateway(
        gateway,
        job="academy_tests",
        registry=registry,
        grouping_key={"branch": os.getenv("GITHUB_REF_NAME", "local")},
        **options,
    )
    return True


def main() -> None:
    """Both destinations, independently. One being unreachable must not hide the other.

    A failure here is reported and swallowed: this runs after the suites have
    already produced their verdict, and losing the record of a run is not a
    reason to fail the run.
    """
    directory = Path(__file__).resolve().parents[2] / "allure-results"
    for name, destination in (("Prometheus", publish), ("Postgres", store)):
        try:
            if destination(directory):
                print(f"Published test history to {name}.")
        except Exception as error:  # noqa: BLE001 - reported, never raised
            print(f"Could not publish test history to {name}: {error}")


if __name__ == "__main__":
    main()
