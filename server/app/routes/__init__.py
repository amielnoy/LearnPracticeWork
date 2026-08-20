"""Every router the application exposes, in the order they are mounted.

Adding an endpoint group means adding a module here and one entry to `ROUTERS`;
nothing in `create_app` changes.
"""

from __future__ import annotations

from fastapi import APIRouter

from . import ai, auth, commerce, content, entitlements, ops

ROUTERS: tuple[APIRouter, ...] = (
    ops.router,
    auth.router,
    content.router,
    ai.router,
    commerce.router,
    entitlements.router,
)

__all__ = ["ROUTERS"]
