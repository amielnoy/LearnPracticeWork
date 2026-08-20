"""Resolution of the public browser origins this deployment answers for.

Redirect targets must never be derived from an attacker-controlled Host or
Origin header, so every candidate is checked against explicit configuration.
"""

from __future__ import annotations

import os

from fastapi import Request

from .config import env


def _split(name: str) -> set[str]:
    return {value.strip().rstrip("/") for value in (env(name) or "").split(",") if value.strip()}


def configured_origins() -> set[str]:
    """Current public browser origins, re-read so tests can reconfigure at runtime."""
    origins = _split("ALLOWED_ORIGINS")
    origins.update(f"https://{domain}" for domain in _split("REPLIT_DOMAINS"))
    return origins


def cors_allow_origins() -> list[str]:
    return sorted(configured_origins())


def cors_allow_origin_regex() -> str | None:
    if os.getenv("NODE_ENV") == "production":
        return None
    return r"https?://(localhost|127\.0\.0\.1)(:\d+)?"


def public_origin(request: Request) -> str | None:
    """Resolve redirects from explicit configuration, never an arbitrary Host header."""
    if canonical := env("PUBLIC_APP_ORIGIN"):
        candidate = canonical.rstrip("/")
        if candidate in configured_origins():
            return candidate
    origin = request.headers.get("origin", "").strip().rstrip("/")
    if origin and origin in configured_origins():
        return origin
    if os.getenv("NODE_ENV") not in {"production", "test"}:
        return str(request.base_url).rstrip("/")
    return None
