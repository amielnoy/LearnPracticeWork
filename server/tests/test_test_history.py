from __future__ import annotations

from app.test_history import read_allure_results


def test_allure_fixtures_become_grafana_test_metrics(allure_result_factory):
    results_dir, write_result = allure_result_factory
    write_result(status="passed", suite="component", start=1_000, stop=2_250)
    write_result(status="failed", suite="api", start=3_000, stop=3_500)
    (results_dir / "broken-result.json").write_text("not json", encoding="utf-8")

    counts, durations = read_allure_results(results_dir)
    assert counts[("component", "passed")] == 1
    assert counts[("api", "failed")] == 1
    assert durations == {"component": 1.25, "api": 0.5}
