from __future__ import annotations

import base64
import json
import os
import platform
import time
from collections.abc import AsyncIterator, Callable, Iterator
from pathlib import Path
from types import SimpleNamespace
from typing import Any

import allure
import httpx
import pytest
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.hazmat.primitives.hashes import SHA256

from app import google_auth, relay
from app import main as main_module
from app.main import app

CLIENT_ID = "000000000000-test.apps.googleusercontent.com"
KID = "fixture-key"


@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item: pytest.Item, call: pytest.CallInfo):
    """Expose each phase result to the lifecycle fixture after the test body finishes."""
    outcome = yield
    report = outcome.get_result()
    setattr(item, f"report_{report.when}", report)


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


@pytest.fixture(autouse=True)
def meaningful_test_report(request: pytest.FixtureRequest, isolated_auth: None) -> Iterator[None]:
    """Give every backend test a safe, readable Given/When/Then Allure narrative."""
    node_id = request.node.nodeid
    title = request.node.name
    worker = os.getenv("PYTEST_XDIST_WORKER", "local")
    started_at = time.perf_counter()

    allure.dynamic.parent_suite("Python backend")
    print(f"[GIVEN] {title} | isolated backend fixtures | worker={worker} | {node_id}")
    with allure.step(f"Given isolated backend conditions for “{title}”"):
        allure.attach(
            json.dumps(
                {
                    "test": title,
                    "source": node_id,
                    "worker": worker,
                    "python": platform.python_version(),
                    "externalServices": "in-memory fixtures only",
                },
                indent=2,
            ),
            name="starting-conditions.json",
            attachment_type=allure.attachment_type.JSON,
        )

    print(f"[WHEN] {title} | execute test actions and assertions")
    with allure.step("When the test executes its actions and assertions"):
        yield

    report = getattr(request.node, "report_call", None)
    if report is None:
        status = "not run"
    elif report.skipped:
        status = "skipped"
    elif report.failed:
        status = "failed"
    else:
        status = "passed"
    duration_ms = round((time.perf_counter() - started_at) * 1000)

    print(f"[THEN] {title} | status={status} | duration={duration_ms}ms")
    with allure.step(f"Then the test {status} in {duration_ms} ms"):
        allure.attach(
            json.dumps({"status": status, "durationMs": duration_ms}, indent=2),
            name="result.json",
            attachment_type=allure.attachment_type.JSON,
        )


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
async def api_client() -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        yield client


@pytest.fixture
async def authenticated_client(
    api_client: httpx.AsyncClient,
    google_jwks: dict[str, Any],
    google_token: Callable[..., str],
) -> httpx.AsyncClient:
    """An API client with a real fixture-signed Google session cookie."""
    response = await api_client.post("/api/auth/google", json={"credential": google_token()})
    assert response.status_code == 200
    return api_client


@pytest.fixture
def client_headers() -> Callable[[str, str], dict[str, str]]:
    """Build the trusted country header and a representative client user-agent."""
    agents = {
        "desktop": "Mozilla/5.0 (Macintosh; Intel Mac OS X) Chrome/140 Safari/537.36",
        "ios": "Mozilla/5.0 (iPhone) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",
        "android": "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/140 Mobile",
    }

    def make(country: str = "IL", client: str = "desktop") -> dict[str, str]:
        return {
            "fly-client-country": country.upper(),
            "user-agent": agents[client],
        }

    return make


@pytest.fixture
def stripe_environment(monkeypatch: pytest.MonkeyPatch) -> tuple[str, str]:
    """Backend-only Stripe credentials that can never reach a real account."""
    credentials = ("sk_test_fixture", "whsec_fixture")
    monkeypatch.setenv("STRIPE_SECRET_KEY", credentials[0])
    monkeypatch.setenv("STRIPE_WEBHOOK_SECRET", credentials[1])
    return credentials


@pytest.fixture
def stripe_checkout_gateway(monkeypatch: pytest.MonkeyPatch) -> dict[str, Any]:
    """A Stripe checkout client that records parameters and returns a harmless URL."""
    captured: dict[str, Any] = {}

    class Sessions:
        @staticmethod
        def create(params: dict[str, Any]) -> SimpleNamespace:
            captured.update(params)
            return SimpleNamespace(url="https://checkout.stripe.test/session")

    async def client() -> SimpleNamespace:
        return SimpleNamespace(v1=SimpleNamespace(checkout=SimpleNamespace(sessions=Sessions())))

    monkeypatch.setattr(main_module, "stripe_client", client)
    return captured


@pytest.fixture
def relay_requests(monkeypatch: pytest.MonkeyPatch) -> list[httpx.Request]:
    """Run the Replit relay against an in-memory upstream and record every request."""
    requests: list[httpx.Request] = []

    def upstream(request: httpx.Request) -> httpx.Response:
        requests.append(request)
        if request.url.path == "/api/auth/google":
            return httpx.Response(
                200,
                json={"user": {"name": "Reader"}},
                headers={
                    "set-cookie": ("ata_session=signed; Path=/api; HttpOnly; Secure; SameSite=lax")
                },
                request=request,
            )
        return httpx.Response(204, request=request)

    transport = httpx.MockTransport(upstream)
    original_client = httpx.AsyncClient
    monkeypatch.setenv("NODE_ENV", "production")
    monkeypatch.setenv("UPSTREAM_API_BASE_URL", "https://ata-api.fly.dev")
    monkeypatch.setattr(
        relay,
        "_new_client",
        lambda: original_client(transport=transport, follow_redirects=False),
    )
    return requests


@pytest.fixture
def allure_result_factory(
    tmp_path: Path,
) -> tuple[Path, Callable[..., Path]]:
    """Write small Allure result fixtures without repeating JSON/file plumbing."""
    counter = 0

    def write(*, status: str, suite: str, start: int, stop: int, **extra: Any) -> Path:
        nonlocal counter
        result = {
            "status": status,
            "start": start,
            "stop": stop,
            "labels": [{"name": "suite", "value": suite}],
            **extra,
        }
        path = tmp_path / f"{counter}-result.json"
        counter += 1
        path.write_text(json.dumps(result), encoding="utf-8")
        return path

    return tmp_path, write
