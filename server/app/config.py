from __future__ import annotations

import os
from urllib.parse import quote


def env(name: str) -> str | None:
    value = os.getenv(name, "").strip()
    return value or None


def positive_int(name: str, fallback: int) -> int:
    try:
        value = int(os.getenv(name, ""))
    except ValueError:
        return fallback
    return value if value > 0 else fallback


def database_url() -> str | None:
    if configured := env("DATABASE_URL"):
        return configured
    if password := env("SUPABASE_DB_PASSWORD"):
        return (
            "postgresql://postgres.ikhqtmgfkqhynpazqrac:"
            f"{quote(password, safe='')}@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"
        )
    return None
