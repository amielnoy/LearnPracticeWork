"""The Replit artifact that publishes this API.

Every command in it resolves from the **workspace root**, not from the artifact
directory. That is not a preference — it is what the platform does, and it was
established the hard way: a version using `../../server` built successfully and
then failed to start, because from the workspace root that path points outside
the repository entirely. The twelve other artifacts in this repo all run
`pnpm --filter @workspace/<name>`, which likewise only resolves from the root.

So a relative path with `..` in it is the specific mistake this file exists to
catch, and the assertions below name it rather than merely pinning a string.
"""

import tomllib
from pathlib import Path


def _api_service() -> dict:
    artifact_path = (
        Path(__file__).parents[2]
        / "artifacts"
        / "api-server"
        / ".replit-artifact"
        / "artifact.toml"
    )
    return tomllib.loads(artifact_path.read_text(encoding="utf-8"))["services"][0]


def test_no_command_escapes_the_workspace_root() -> None:
    """`../../server` resolves outside the repository and the service never starts."""
    service = _api_service()
    commands = {
        "development run": service["development"]["run"],
        "production build": " ".join(service["production"]["build"]["args"]),
        "production run": " ".join(service["production"]["run"]["args"]),
    }

    for name, command in commands.items():
        assert ".." not in command, f"the {name} command leaves the workspace root: {command}"


def test_every_command_points_at_the_server_project_from_the_root() -> None:
    service = _api_service()

    assert "--directory server" in service["development"]["run"]
    assert service["production"]["build"]["args"][:4] == ["uv", "sync", "--project", "server"]
    run_args = service["production"]["run"]["args"]
    assert "--directory" in run_args
    assert run_args[run_args.index("--directory") + 1] == "server"


def test_replit_runs_the_api_locally_instead_of_relaying_to_an_absent_backend() -> None:
    service = _api_service()
    assert service["paths"] == ["/api"]
    run_args = service["production"]["run"]["args"]
    assert run_args[:2] == ["uv", "run"]
    assert run_args[-6:] == [
        "uvicorn",
        "app.main:app",
        "--host",
        "0.0.0.0",
        "--port",
        "8080",
    ]
    assert service["production"]["health"]["startup"]["path"] == "/api/healthz"
    assert "UPSTREAM_API_BASE_URL" not in service["production"]["run"]["env"]
