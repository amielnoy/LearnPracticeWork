"""What a signed-in reader has finished, kept off their device.

Progress has always been real — `ProgressContext` on the client has tracked it
since there was a client — but it lived in `localStorage`, which means it was
per-browser. Clearing site data lost it, a phone and a laptop each held a
different half of it, and nothing on the server could see any of it.

This is the same record with an owner. The merge, not the write, is the whole
design: see `database.merge_progress` for why two devices have to be unioned
rather than have the later one win.
"""

from __future__ import annotations

import logging
from collections.abc import Awaitable, Callable
from typing import Any

from .errors import ServiceError
from .google_auth import GoogleUser

logger = logging.getLogger(__name__)

UNAVAILABLE = "Progress is not available on this server."

LoadProgress = Callable[[str], Awaitable[dict[str, Any] | None]]
MergeProgress = Callable[[str, str, dict[str, Any]], Awaitable[dict[str, Any] | None]]


class ProgressService:
    def __init__(self, load: LoadProgress, merge: MergeProgress) -> None:
        self._load = load
        self._merge = merge

    async def for_user(self, user: GoogleUser) -> dict[str, Any]:
        return {"progress": await self._call(self._load(user.subject))}

    async def merge_for_user(self, user: GoogleUser, incoming: dict[str, Any]) -> dict[str, Any]:
        return {"progress": await self._call(self._merge(user.subject, user.email, incoming))}

    async def _call(self, awaitable: Awaitable[dict[str, Any] | None]) -> dict[str, Any]:
        """A store that is absent is a 503; a store that broke is a 500.

        The difference matters to the client, which keeps its own copy either
        way: an unconfigured deployment is not a fault it should retry, and a
        failed query is.
        """
        try:
            stored = await awaitable
        except Exception as exc:
            logger.exception("Progress lookup failed")
            raise ServiceError("Could not read progress", 500) from exc
        if stored is None:
            raise ServiceError(UNAVAILABLE, 503)
        return stored
