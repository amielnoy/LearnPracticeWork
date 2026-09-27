"""The API, as a single Vercel Function.

Every `/api/*` request on the deployed site arrives here. The route table sends
the whole prefix to this one function rather than mapping a file per endpoint,
because what is being served is one FastAPI application that already owns its
own routing — `server/app/routes/` — and splitting it across function files
would mean maintaining that table twice.

`server/` is put on the path rather than the package being installed, because
the API is a workspace member built by uv from `server/pyproject.toml`, not a
distribution this repository publishes. Vercel's Python builder assembles the
bundle by tracing imports from this file, so `server/app/**` is pulled in by the
import below; nothing has to enumerate it. Data files are not traced, which is
why `database.py` reads `schema.sql` when it applies the DDL rather than when it
is imported.

The same `app.main:app` runs under Uvicorn locally and in the container image,
so this file adds an import path and nothing else — there is no Vercel-shaped
variant of the application to keep in step.
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "server"))

from app.main import app  # noqa: E402

__all__ = ["app"]
