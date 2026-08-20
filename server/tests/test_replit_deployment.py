import tomllib
from pathlib import Path


def test_replit_runs_the_api_locally_instead_of_relaying_to_an_absent_backend() -> None:
    artifact_path = Path(__file__).parents[1] / ".replit-artifact" / "artifact.toml"
    artifact = tomllib.loads(artifact_path.read_text(encoding="utf-8"))

    service = artifact["services"][0]
    assert service["paths"] == ["/api"]
    assert service["production"]["health"]["startup"]["path"] == "/api/healthz"
    assert "UPSTREAM_API_BASE_URL" not in service["production"]["run"]["env"]


def test_replit_excludes_the_removed_node_api_artifact() -> None:
    ignore_path = Path(__file__).parents[2] / ".replitignore"
    ignored_paths = {
        line.strip()
        for line in ignore_path.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    }

    assert "artifacts/api-server" in ignored_paths
