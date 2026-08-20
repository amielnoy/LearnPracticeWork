import tomllib
from pathlib import Path


def test_replit_runs_the_api_locally_instead_of_relaying_to_an_absent_backend() -> None:
    artifact_path = Path(__file__).parents[1] / ".replit-artifact" / "artifact.toml"
    artifact = tomllib.loads(artifact_path.read_text(encoding="utf-8"))

    service = artifact["services"][0]
    assert service["paths"] == ["/api"]
    assert service["production"]["health"]["startup"]["path"] == "/api/healthz"
    assert "UPSTREAM_API_BASE_URL" not in service["production"]["run"]["env"]
