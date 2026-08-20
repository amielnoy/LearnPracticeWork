from __future__ import annotations

import time

import pytest
from cryptography.hazmat.primitives.asymmetric import rsa

from app.google_auth import verify_google_id_token


async def test_fixture_signed_google_token_is_accepted(google_jwks, google_token):
    user = await verify_google_id_token(google_token())
    assert user is not None
    assert user.subject == "112233445566778899000"
    assert user.email == "reader@example.com"
    assert user.name == "שרה כהן"


@pytest.mark.parametrize(
    "claims",
    [
        {"aud": "another-client"},
        {"iss": "https://attacker.example"},
        {"exp": 1},
        {"iat": int(time.time()) + 7200},
        {"email_verified": False},
        {"email": None},
    ],
    ids=["audience", "issuer", "expired", "future-issued", "unverified-email", "no-email"],
)
async def test_invalid_claims_are_rejected(google_jwks, google_token, claims):
    assert await verify_google_id_token(google_token(claims=claims)) is None


async def test_wrong_signature_is_rejected(google_jwks, google_token):
    wrong_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    assert await verify_google_id_token(google_token(signing_key=wrong_key)) is None


async def test_missing_configuration_fails_closed(monkeypatch, google_jwks, google_token):
    monkeypatch.delenv("GOOGLE_CLIENT_ID")
    assert await verify_google_id_token(google_token()) is None
