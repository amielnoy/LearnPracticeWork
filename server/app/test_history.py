from __future__ import annotations

import json
import os
import time
from collections import Counter, defaultdict
from pathlib import Path

from prometheus_client import CollectorRegistry, Gauge, push_to_gateway
from prometheus_client.exposition import basic_auth_handler


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
    run_info.labels(
        os.getenv("GITHUB_REPOSITORY", "local"),
        os.getenv("GITHUB_REF_NAME", "local"),
        os.getenv("GITHUB_SHA", "local"),
        os.getenv("GITHUB_RUN_ID", "local"),
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


if __name__ == "__main__":
    publish(Path(__file__).resolve().parents[2] / "allure-results")
