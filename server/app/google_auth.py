from __future__ import annotations

import asyncio
import base64
import json
import logging
import os
import time
from dataclasses import dataclass
from typing import Any

import httpx
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.hazmat.primitives.hashes import SHA256

JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs"
VALID_ISSUERS = {"accounts.google.com", "https://accounts.google.com"}
CLOCK_SKEW_SECONDS = 60
DEFAULT_JWKS_TTL_SECONDS = 3600
logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class GoogleUser:
    subject: str
    email: str
    name: str
    picture: str
    expires_at: int


_keys: dict[str, rsa.RSAPublicKey] = {}
_keys_expire_at = 0.0
_keys_lock = asyncio.Lock()


def _decode(segment: str) -> dict[str, Any]:
    padded = segment + "=" * (-len(segment) % 4)
    value = json.loads(base64.urlsafe_b64decode(padded).decode("utf-8"))
    if not isinstance(value, dict):
        raise ValueError("JWT segment is not an object")
    return value


def _max_age(headers: httpx.Headers) -> int:
    for part in headers.get("cache-control", "").split(","):
        name, _, value = part.strip().partition("=")
        if name.lower() == "max-age" and value.isdigit() and int(value) > 0:
            return int(value)
    return DEFAULT_JWKS_TTL_SECONDS


async def _fetch_keys() -> tuple[dict[str, rsa.RSAPublicKey], float]:
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(JWKS_URL, headers={"accept": "application/json"})
        response.raise_for_status()
    parsed: dict[str, rsa.RSAPublicKey] = {}
    for jwk in response.json().get("keys", []):
        if (
            not isinstance(jwk, dict)
            or not jwk.get("kid")
            or jwk.get("kty") != "RSA"
            or jwk.get("alg", "RS256") != "RS256"
        ):
            continue
        try:
            exponent = int.from_bytes(base64.urlsafe_b64decode(jwk["e"] + "=="))
            modulus = int.from_bytes(base64.urlsafe_b64decode(jwk["n"] + "=="))
            parsed[jwk["kid"]] = rsa.RSAPublicNumbers(exponent, modulus).public_key()
        except (KeyError, TypeError, ValueError):
            logger.warning("Skipped an unreadable Google signing key")
    if not parsed:
        raise ValueError("Google signing key set contained no usable RSA keys")
    return parsed, time.time() + _max_age(response.headers)


async def _key_set(force: bool = False) -> dict[str, rsa.RSAPublicKey]:
    global _keys, _keys_expire_at
    if not force and _keys and _keys_expire_at > time.time():
        return _keys
    async with _keys_lock:
        if not force and _keys and _keys_expire_at > time.time():
            return _keys
        _keys, _keys_expire_at = await _fetch_keys()
        return _keys


def reset_key_cache() -> None:
    global _keys, _keys_expire_at
    _keys = {}
    _keys_expire_at = 0


async def verify_google_id_token(token: str, now: float | None = None) -> GoogleUser | None:
    audience = os.getenv("GOOGLE_CLIENT_ID", "").strip()
    if not audience:
        return None
    segments = token.split(".")
    if len(segments) != 3:
        return None
    try:
        header, claims = _decode(segments[0]), _decode(segments[1])
        if header.get("alg") != "RS256" or not isinstance(header.get("kid"), str):
            return None
        keys = await _key_set()
        key = keys.get(header["kid"])
        if key is None:
            keys = await _key_set(force=True)
            key = keys.get(header["kid"])
        if key is None:
            return None
        signature = base64.urlsafe_b64decode(segments[2] + "=" * (-len(segments[2]) % 4))
        key.verify(signature, f"{segments[0]}.{segments[1]}".encode(), padding.PKCS1v15(), SHA256())
    except Exception:
        return None

    current = now if now is not None else time.time()
    exp, issued, not_before = claims.get("exp"), claims.get("iat"), claims.get("nbf")
    verified = claims.get("email_verified") in (True, "true")
    if (
        claims.get("iss") not in VALID_ISSUERS
        or claims.get("aud") != audience
        or not isinstance(exp, (int, float))
        or exp + CLOCK_SKEW_SECONDS <= current
        or isinstance(issued, (int, float))
        and issued - CLOCK_SKEW_SECONDS > current
        or isinstance(not_before, (int, float))
        and not_before - CLOCK_SKEW_SECONDS > current
        or not isinstance(claims.get("sub"), str)
        or not isinstance(claims.get("email"), str)
        or not verified
    ):
        return None
    email = claims["email"].strip().lower()
    return GoogleUser(
        subject=claims["sub"],
        email=email,
        name=claims.get("name") if isinstance(claims.get("name"), str) else email,
        picture=claims.get("picture") if isinstance(claims.get("picture"), str) else "",
        expires_at=int(exp),
    )
