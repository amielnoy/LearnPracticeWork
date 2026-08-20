from __future__ import annotations

import base64
import json
import time
from collections.abc import Callable, Iterator

import httpx
import pytest
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.hazmat.primitives.hashes import SHA256

from app import google_auth
from app.main import app

CLIENT_ID = "000000000000-test.apps.googleusercontent.com"
KID = "fixture-key"


def _segment(value: dict) -> str:
    return (
        base64.urlsafe_b64encode(
            json.dumps(value, separators=(",", ":"), ensure_ascii=False).encode()
        )
        .rstrip(b"=")
        .decode()
    )


@pytest.fixture(autouse=True)
def isolated_auth(monkeypatch: pytest.MonkeyPatch) -> Iterator[None]:
    monkeypatch.setenv("GOOGLE_CLIENT_ID", CLIENT_ID)
    monkeypatch.setenv("SESSION_SECRET", "fixture-secret-with-at-least-thirty-two-characters")
    monkeypatch.delenv("UPSTREAM_API_BASE_URL", raising=False)
    monkeypatch.delenv("METRICS_TOKEN", raising=False)
    google_auth.reset_key_cache()
    yield
    google_auth.reset_key_cache()


@pytest.fixture
def rsa_keys():
    private = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    return private, private.public_key()


@pytest.fixture
def google_token(rsa_keys) -> Callable[..., str]:
    private, _ = rsa_keys

    def make(*, claims: dict | None = None, header: dict | None = None, signing_key=None) -> str:
        now = int(time.time())
        token_header = {"alg": "RS256", "kid": KID, **(header or {})}
        token_claims = {
            "iss": "https://accounts.google.com",
            "aud": CLIENT_ID,
            "sub": "112233445566778899000",
            "email": "Reader@Example.com",
            "email_verified": True,
            "name": "שרה כהן",
            "picture": "https://example.test/avatar.png",
            "iat": now - 10,
            "exp": now + 3600,
            **(claims or {}),
        }
        signing_input = f"{_segment(token_header)}.{_segment(token_claims)}"
        signature = (signing_key or private).sign(
            signing_input.encode(), padding.PKCS1v15(), SHA256()
        )
        encoded = base64.urlsafe_b64encode(signature).rstrip(b"=").decode()
        return f"{signing_input}.{encoded}"

    return make


@pytest.fixture
def google_jwks(monkeypatch: pytest.MonkeyPatch, rsa_keys):
    _, public = rsa_keys
    numbers = public.public_numbers()

    def encoded(value: int) -> str:
        raw = value.to_bytes((value.bit_length() + 7) // 8, "big")
        return base64.urlsafe_b64encode(raw).rstrip(b"=").decode()

    payload = {
        "keys": [
            {
                "kid": KID,
                "kty": "RSA",
                "alg": "RS256",
                "use": "sig",
                "n": encoded(numbers.n),
                "e": encoded(numbers.e),
            }
        ]
    }
    transport = httpx.MockTransport(
        lambda request: httpx.Response(
            200, json=payload, headers={"cache-control": "max-age=3600"}, request=request
        )
    )
    original = httpx.AsyncClient
    monkeypatch.setattr(
        google_auth.httpx,
        "AsyncClient",
        lambda *args, **kwargs: original(transport=transport, **kwargs),
    )
    return payload


@pytest.fixture
async def api_client():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        yield client
