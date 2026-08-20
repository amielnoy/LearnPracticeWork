---
name: Artifact service commands resolve relative to the artifact directory
description: Relative paths in an artifact.toml service `run`/`args` are resolved against the artifact's own directory, not the workspace root.
---

An artifact's managed workflow runs with cwd set to that artifact's own directory (`artifacts/<slug>/`), not the workspace root — even though the artifact's registered code can live elsewhere (e.g. a backend migrated to a top-level `server/` directory while the artifact metadata stays at `artifacts/<slug>/.replit-artifact/artifact.toml`).

**Why:** A service `run` command referencing a sibling directory by a workspace-root-relative path (e.g. `cd server`, or `uv run --project server --directory server`) fails with a bare `No such file or directory (os error 2)` / `bash: cd: server: No such file or directory` and no other diagnostic — because it actually resolves to `artifacts/<slug>/server`, which doesn't exist. This is easy to misdiagnose as a code or dependency problem since the same command run manually from the workspace root in a shell works fine.

**How to apply:** When an artifact's real code lives outside its own artifact directory, use a path relative to the artifact directory to reach it (e.g. `cd ../../server && uv run ...` from `artifacts/<slug>/`), not a workspace-root-relative path. Verify by checking `ls <relative-path>` from inside the artifact's own directory before editing `artifact.toml`.
