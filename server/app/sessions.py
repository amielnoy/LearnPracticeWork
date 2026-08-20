from __future__ import annotations

import base64
import hmac
import json
import os
import time
from dataclasses import asdict

from .google_auth import GoogleUser

COOKIE_NAME = "ata_session"


def _secret() -> bytes | None:
    value = os.getenv("SESSION_SECRET", "").strip()
    return value.encode() if len(value) >= 32 else None


def sessions_configured() -> bool:
    return _secret() is not None


def create_session(user: GoogleUser) -> str:
    secret = _secret()
    if secret is None:
        raise RuntimeError("SESSION_SECRET must contain at least 32 characters")
    payload = base64.urlsafe_b64encode(
        json.dumps(asdict(user), separators=(",", ":"), ensure_ascii=False).encode()
    ).rstrip(b"=")
    signature = hmac.digest(secret, payload, "sha256")
    return f"{payload.decode()}.{base64.urlsafe_b64encode(signature).rstrip(b'=').decode()}"


def read_session(value: str | None) -> GoogleUser | None:
    secret = _secret()
    if not secret or not value:
        return None
    try:
        payload, encoded_signature = value.split(".", 1)
        expected = hmac.digest(secret, payload.encode(), "sha256")
        signature = base64.urlsafe_b64decode(
            encoded_signature + "=" * (-len(encoded_signature) % 4)
        )
        if not hmac.compare_digest(signature, expected):
            return None
        raw = base64.urlsafe_b64decode(payload + "=" * (-len(payload) % 4))
        claims = json.loads(raw)
        user = GoogleUser(**claims)
    except (TypeError, ValueError, KeyError, json.JSONDecodeError):
        return None
    return user if user.expires_at > time.time() else None
