from __future__ import annotations

import json

from app.test_history import read_allure_results


def test_allure_fixtures_become_grafana_test_metrics(tmp_path):
    fixtures = [
        {
            "status": "passed",
            "start": 1_000,
            "stop": 2_250,
            "labels": [{"name": "suite", "value": "component"}],
        },
        {
            "status": "failed",
            "start": 3_000,
            "stop": 3_500,
            "labels": [{"name": "suite", "value": "api"}],
        },
    ]
    for index, fixture in enumerate(fixtures):
        (tmp_path / f"{index}-result.json").write_text(json.dumps(fixture), encoding="utf-8")
    (tmp_path / "broken-result.json").write_text("not json", encoding="utf-8")

    counts, durations = read_allure_results(tmp_path)
    assert counts[("component", "passed")] == 1
    assert counts[("api", "failed")] == 1
    assert durations == {"component": 1.25, "api": 0.5}
