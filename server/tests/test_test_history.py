from __future__ import annotations

from app.test_history import read_allure_results, run_identity, store, suite_totals


def test_allure_fixtures_become_grafana_test_metrics(allure_result_factory):
    results_dir, write_result = allure_result_factory
    write_result(status="passed", suite="component", start=1_000, stop=2_250)
    write_result(status="failed", suite="api", start=3_000, stop=3_500)
    (results_dir / "broken-result.json").write_text("not json", encoding="utf-8")

    counts, durations = read_allure_results(results_dir)
    assert counts[("component", "passed")] == 1
    assert counts[("api", "failed")] == 1
    assert durations == {"component": 1.25, "api": 0.5}


def test_suite_totals_zero_fill_every_status(allure_result_factory):
    """A suite with no failures has to say `failed = 0`, not leave the column out.

    Otherwise "this suite had no failures" and "this suite did not report" are
    the same answer to a query over the stored history, which is exactly the
    question the table exists to answer.
    """
    results_dir, write_result = allure_result_factory
    write_result(status="passed", suite="component", start=1_000, stop=2_250)
    write_result(status="failed", suite="api", start=3_000, stop=3_500)

    counts, durations = read_allure_results(results_dir)
    totals = suite_totals(counts, durations)

    assert set(totals) == {"component", "api"}
    assert totals["component"] == {
        "passed": 1.0,
        "failed": 0.0,
        "broken": 0.0,
        "skipped": 0.0,
        "unknown": 0.0,
        "duration": 1.25,
    }
    assert totals["api"]["failed"] == 1.0
    assert totals["api"]["passed"] == 0.0


def test_storage_is_skipped_rather_than_failed_without_a_database(
    allure_result_factory, monkeypatch
):
    monkeypatch.delenv("DATABASE_URL", raising=False)
    monkeypatch.delenv("SUPABASE_DB_PASSWORD", raising=False)
    results_dir, write_result = allure_result_factory
    write_result(status="passed", suite="unit", start=0, stop=10)
    assert store(results_dir) is False


def test_a_run_identifies_itself_from_the_ci_environment(monkeypatch):
    monkeypatch.setenv("GITHUB_REPOSITORY", "owner/repo")
    monkeypatch.setenv("GITHUB_REF_NAME", "main")
    monkeypatch.setenv("GITHUB_SHA", "abc123")
    monkeypatch.setenv("GITHUB_RUN_ID", "42")
    assert run_identity() == {
        "repository": "owner/repo",
        "branch": "main",
        "commit": "abc123",
        "run_id": "42",
    }
