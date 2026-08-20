"""The AI proxy, one provider strategy at a time.

These reach the gateway directly rather than through a route, because what is
worth pinning here is provider-specific: which model a request settles on, what
the upstream payload looks like, and which of several failures the caller is
told about. The route's own concerns — quota headers, metrics — are covered by
the api suite against a running server.
"""

from __future__ import annotations

from typing import Any

import httpx
import pytest

from app.ai_gateway import AiGateway, GeminiProvider, GroqProvider
from app.schemas import GenerateBody


def body(**overrides: Any) -> GenerateBody:
    values: dict[str, Any] = {
        "messages": [{"role": "user", "content": "How do I test a flaky suite?"}],
        "system": "You are a testing coach.",
    }
    values.update(overrides)
    return GenerateBody.model_validate(values)


def transport(handler) -> None:
    """Route every httpx.AsyncClient the gateway opens to an in-memory upstream."""
    return httpx.MockTransport(handler)


@pytest.fixture
def upstream(monkeypatch: pytest.MonkeyPatch):
    """Capture the request the gateway sends and reply with whatever a test wants."""

    def install(response: httpx.Response | Exception) -> list[httpx.Request]:
        sent: list[httpx.Request] = []

        def handler(request: httpx.Request) -> httpx.Response:
            sent.append(request)
            if isinstance(response, Exception):
                raise response
            return httpx.Response(
                response.status_code,
                content=response.content,
                headers=response.headers,
                request=request,
            )

        original = httpx.AsyncClient
        monkeypatch.setattr(
            "app.ai_gateway.httpx.AsyncClient",
            lambda **kwargs: original(transport=transport(handler), **kwargs),
        )
        return sent

    return install


def test_an_ungrounded_request_goes_to_groq() -> None:
    provider, model = AiGateway().target(body(grounded=False))

    assert provider == "groq"
    assert model in GroqProvider.models


def test_a_grounded_request_goes_to_gemini() -> None:
    provider, model = AiGateway().target(body(grounded=True))

    assert provider == "gemini"
    assert model in GeminiProvider.models


def test_a_model_the_provider_does_not_offer_falls_back_to_its_default() -> None:
    """A client cannot name an arbitrary model and have it forwarded upstream."""
    _, model = AiGateway().target(body(model="gpt-4-turbo-please"))

    assert model == GroqProvider().default_model()


def test_a_model_the_provider_does_offer_is_honoured() -> None:
    _, model = AiGateway().target(body(model="openai/gpt-oss-20b"))

    assert model == "openai/gpt-oss-20b"


def test_a_grounded_request_cannot_borrow_an_ungrounded_model() -> None:
    _, model = AiGateway().target(body(grounded=True, model="openai/gpt-oss-20b"))

    assert model in GeminiProvider.models


@pytest.mark.asyncio
async def test_a_missing_key_names_the_provider_that_is_unconfigured(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.delenv("GROQ_API_KEY", raising=False)

    outcome = await AiGateway().generate(body())

    assert outcome.status == 503
    assert outcome.payload == {"error": "No server-side Groq key is configured."}


@pytest.mark.asyncio
async def test_groq_receives_the_system_prompt_as_its_first_message(
    monkeypatch: pytest.MonkeyPatch, upstream
) -> None:
    monkeypatch.setenv("GROQ_API_KEY", "gsk_fixture")
    sent = upstream(httpx.Response(200, json={"choices": [{"message": {"content": "hi"}}]}))

    await AiGateway().generate(body(system="You are a testing coach."))

    payload = _json_body(sent[0])
    assert payload["messages"][0] == {"role": "system", "content": "You are a testing coach."}
    assert payload["messages"][1]["role"] == "user"


@pytest.mark.asyncio
async def test_groq_omits_the_system_message_when_there_is_no_system_prompt(
    monkeypatch: pytest.MonkeyPatch, upstream
) -> None:
    monkeypatch.setenv("GROQ_API_KEY", "gsk_fixture")
    sent = upstream(httpx.Response(200, json={"choices": [{"message": {"content": "hi"}}]}))

    await AiGateway().generate(body(system=""))

    assert _json_body(sent[0])["messages"][0]["role"] == "user"


@pytest.mark.asyncio
async def test_gemini_sends_the_key_as_a_header_and_asks_for_search_grounding(
    monkeypatch: pytest.MonkeyPatch, upstream
) -> None:
    monkeypatch.setenv("GEMINI_API_KEY", "AIza_fixture")
    sent = upstream(httpx.Response(200, json={"candidates": [{"content": {"parts": []}}]}))

    await AiGateway().generate(body(grounded=True))

    request = sent[0]
    assert request.headers["x-goog-api-key"] == "AIza_fixture"
    assert "key=" not in str(request.url), "the key must never travel in the query string"
    assert _json_body(request)["tools"] == [{"google_search": {}}]


@pytest.mark.asyncio
async def test_gemini_maps_an_assistant_turn_to_the_model_role(
    monkeypatch: pytest.MonkeyPatch, upstream
) -> None:
    monkeypatch.setenv("GEMINI_API_KEY", "AIza_fixture")
    sent = upstream(httpx.Response(200, json={"candidates": [{"content": {"parts": []}}]}))

    await AiGateway().generate(
        body(
            grounded=True,
            messages=[
                {"role": "user", "content": "first"},
                {"role": "assistant", "content": "second"},
            ],
        )
    )

    roles = [entry["role"] for entry in _json_body(sent[0])["contents"]]
    assert roles == ["user", "model"]


@pytest.mark.asyncio
async def test_a_groq_reply_cut_short_by_the_token_limit_is_reported_as_truncated(
    monkeypatch: pytest.MonkeyPatch, upstream
) -> None:
    monkeypatch.setenv("GROQ_API_KEY", "gsk_fixture")
    upstream(
        httpx.Response(
            200,
            json={"choices": [{"message": {"content": "half a"}, "finish_reason": "length"}]},
        )
    )

    outcome = await AiGateway().generate(body())

    assert outcome.status == 200
    assert outcome.payload == {"text": "half a", "truncated": True}


@pytest.mark.asyncio
async def test_a_gemini_reply_joins_its_parts_and_reports_the_token_ceiling(
    monkeypatch: pytest.MonkeyPatch, upstream
) -> None:
    monkeypatch.setenv("GEMINI_API_KEY", "AIza_fixture")
    upstream(
        httpx.Response(
            200,
            json={
                "candidates": [
                    {
                        "content": {"parts": [{"text": "one"}, {"text": "two"}]},
                        "finishReason": "MAX_TOKENS",
                    }
                ]
            },
        )
    )

    outcome = await AiGateway().generate(body(grounded=True))

    assert outcome.payload == {"text": "one\ntwo", "truncated": True}


@pytest.mark.asyncio
async def test_an_upstream_refusal_keeps_its_status_but_not_its_detail(
    monkeypatch: pytest.MonkeyPatch, upstream
) -> None:
    """The provider's own message can name a model or a key; the caller gets an id."""
    monkeypatch.setenv("GROQ_API_KEY", "gsk_fixture")
    upstream(httpx.Response(429, json={"error": {"message": "quota for key sk_live_abc"}}))

    outcome = await AiGateway().generate(body())

    assert outcome.status == 429
    assert outcome.payload["error"] == "The AI provider could not complete this request."
    assert outcome.payload["requestId"]
    assert "sk_live_abc" not in str(outcome.payload)


@pytest.mark.asyncio
async def test_a_timeout_is_reported_as_a_gateway_timeout(
    monkeypatch: pytest.MonkeyPatch, upstream
) -> None:
    monkeypatch.setenv("GROQ_API_KEY", "gsk_fixture")
    upstream(httpx.TimeoutException("upstream took too long"))

    outcome = await AiGateway().generate(body())

    assert outcome.status == 504
    assert outcome.payload == {"error": "Provider request timed out"}


@pytest.mark.asyncio
async def test_an_unreachable_provider_is_reported_as_a_bad_gateway(
    monkeypatch: pytest.MonkeyPatch, upstream
) -> None:
    monkeypatch.setenv("GROQ_API_KEY", "gsk_fixture")
    upstream(httpx.ConnectError("no route to host"))

    outcome = await AiGateway().generate(body())

    assert outcome.status == 502
    assert outcome.payload == {"error": "Failed to reach provider"}


@pytest.mark.asyncio
async def test_a_reply_that_is_not_json_does_not_escape_as_a_parse_error(
    monkeypatch: pytest.MonkeyPatch, upstream
) -> None:
    monkeypatch.setenv("GROQ_API_KEY", "gsk_fixture")
    upstream(httpx.Response(200, content=b"<html>gateway error</html>"))

    outcome = await AiGateway().generate(body())

    assert outcome.status == 502


def test_the_advertised_config_reports_a_key_per_provider(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """The client decides whether to ask for its own key from exactly this."""
    monkeypatch.setenv("GROQ_API_KEY", "gsk_fixture")
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)

    config = AiGateway().advertised_config()

    assert config["groq"]["available"] is True
    assert config["gemini"]["available"] is False
    assert set(config) == {"groq", "gemini"}


def _json_body(request: httpx.Request) -> dict:
    import json

    return json.loads(request.content)


@pytest.fixture
def upstreams(monkeypatch: pytest.MonkeyPatch):
    """Answer each provider's host differently, and record who was called."""

    def install(*, groq: httpx.Response | None, gemini: httpx.Response | None) -> list[str]:
        called: list[str] = []

        def handler(request: httpx.Request) -> httpx.Response:
            name = "groq" if "groq" in request.url.host else "gemini"
            called.append(name)
            reply = groq if name == "groq" else gemini
            if reply is None:
                raise AssertionError(f"{name} should not have been called")
            return httpx.Response(reply.status_code, content=reply.content, request=request)

        original = httpx.AsyncClient
        monkeypatch.setattr(
            "app.ai_gateway.httpx.AsyncClient",
            lambda **kwargs: original(transport=httpx.MockTransport(handler), **kwargs),
        )
        return called

    return install


@pytest.fixture
def both_keys(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("GROQ_API_KEY", "gsk_fixture")
    monkeypatch.setenv("GEMINI_API_KEY", "AIza_fixture")


def gemini_ok() -> httpx.Response:
    return httpx.Response(
        200, json={"candidates": [{"content": {"parts": [{"text": "from gemini"}]}}]}
    )


@pytest.mark.asyncio
async def test_a_rate_limited_provider_hands_the_request_to_the_other(both_keys, upstreams) -> None:
    """The reported case: Groq refuses a large request on tokens-per-minute."""
    called = upstreams(groq=httpx.Response(429, json={"error": "rate"}), gemini=gemini_ok())

    outcome = await AiGateway().generate(body())

    assert outcome.status == 200
    assert outcome.payload["text"] == "from gemini"
    assert called == ["groq", "gemini"]


@pytest.mark.asyncio
async def test_the_outcome_names_the_provider_that_actually_answered(both_keys, upstreams) -> None:
    """Metrics label the real one, or a fallback would look like a Groq success."""
    upstreams(groq=httpx.Response(503, json={"error": "down"}), gemini=gemini_ok())

    outcome = await AiGateway().generate(body())

    assert outcome.provider == "gemini"
    assert outcome.model in GeminiProvider.models


@pytest.mark.asyncio
async def test_a_bad_request_is_not_offered_to_a_second_provider(both_keys, upstreams) -> None:
    """400 is the request being wrong; the other provider would only agree."""
    called = upstreams(groq=httpx.Response(400, json={"error": "malformed"}), gemini=None)

    outcome = await AiGateway().generate(body())

    assert outcome.status == 400
    assert called == ["groq"]


@pytest.mark.asyncio
async def test_a_grounded_request_is_never_handed_to_a_provider_without_search(
    both_keys, upstreams
) -> None:
    """Answering it without grounding would answer a different question."""
    called = upstreams(groq=None, gemini=httpx.Response(429, json={"error": "rate"}))

    outcome = await AiGateway().generate(body(grounded=True))

    assert outcome.status == 429
    assert called == ["gemini"]


@pytest.mark.asyncio
async def test_an_unconfigured_fallback_leaves_the_original_failure_showing(
    monkeypatch: pytest.MonkeyPatch, upstreams
) -> None:
    """Reporting the fallback's missing key would hide why the request failed."""
    monkeypatch.setenv("GROQ_API_KEY", "gsk_fixture")
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    upstreams(groq=httpx.Response(429, json={"error": "rate"}), gemini=None)

    outcome = await AiGateway().generate(body())

    assert outcome.status == 429


@pytest.mark.asyncio
async def test_when_every_provider_refuses_the_first_refusal_is_reported(
    both_keys, upstreams
) -> None:
    called = upstreams(
        groq=httpx.Response(429, json={"error": "rate"}),
        gemini=httpx.Response(500, json={"error": "boom"}),
    )

    outcome = await AiGateway().generate(body())

    assert outcome.status == 429
    assert called == ["groq", "gemini"]


@pytest.mark.asyncio
async def test_gemini_only_searches_when_the_request_asked_it_to(
    both_keys, monkeypatch: pytest.MonkeyPatch, upstream
) -> None:
    """Serving an ordinary request as a fallback must not turn it into a search."""
    monkeypatch.delenv("GROQ_API_KEY", raising=False)
    sent = upstream(httpx.Response(200, json={"candidates": [{"content": {"parts": []}}]}))

    await AiGateway().generate(body())

    assert "tools" not in _json_body(sent[0])
