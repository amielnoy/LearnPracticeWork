"""Server-side proxy to the AI providers, one strategy object per provider.

Each provider owns everything that is specific to it — the models it accepts,
where its key comes from, how a request is shaped and how a completion is read
back out. Supporting another provider means adding a class here and listing it
in `PROVIDERS`; nothing in the routes or in this module's dispatch changes.
"""

from __future__ import annotations

import logging
import secrets
from dataclasses import dataclass
from typing import Protocol

import httpx

from .config import env
from .schemas import GenerateBody
from .settings import DAILY_QUOTA, UPSTREAM_TIMEOUT

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class UpstreamRequest:
    url: str
    headers: dict[str, str]
    payload: dict


@dataclass(frozen=True)
class Completion:
    text: str
    truncated: bool


@dataclass(frozen=True)
class AiOutcome:
    """A proxied result: the upstream status travels with the body deliberately."""

    status: int
    payload: dict


class AiProvider(Protocol):
    name: str
    key_variable: str
    key_description: str
    models: frozenset[str]
    supports_grounding: bool

    def default_model(self) -> str: ...

    def build_request(self, model: str, key: str, body: GenerateBody) -> UpstreamRequest: ...

    def read_completion(self, data: dict) -> Completion: ...


class _Provider:
    """Behaviour every provider shares: key lookup and model validation."""

    name: str
    key_variable: str
    key_description: str
    models: frozenset[str]
    model_variable: str
    fallback_model: str
    supports_grounding: bool

    def api_key(self) -> str | None:
        return env(self.key_variable)

    def default_model(self) -> str:
        configured = env(self.model_variable)
        return configured if configured in self.models else self.fallback_model

    def resolve_model(self, requested: str | None) -> str:
        return requested if requested in self.models else self.default_model()

    def missing_key_message(self) -> str:
        return f"No server-side {self.key_description} key is configured."


class GroqProvider(_Provider):
    name = "groq"
    key_variable = "GROQ_API_KEY"
    key_description = "Groq"
    models = frozenset({"openai/gpt-oss-120b", "openai/gpt-oss-20b", "groq/compound"})
    model_variable = "GROQ_MODEL"
    fallback_model = "openai/gpt-oss-120b"
    supports_grounding = False

    def build_request(self, model: str, key: str, body: GenerateBody) -> UpstreamRequest:
        system = [{"role": "system", "content": body.system}] if body.system else []
        return UpstreamRequest(
            url="https://api.groq.com/openai/v1/chat/completions",
            headers={"content-type": "application/json", "authorization": f"Bearer {key}"},
            payload={
                "model": model,
                "max_tokens": body.maxTokens,
                "reasoning_effort": "low",
                "messages": system + [message.model_dump() for message in body.messages],
            },
        )

    def read_completion(self, data: dict) -> Completion:
        choice = (data.get("choices") or [{}])[0]
        return Completion(
            text=choice.get("message", {}).get("content", ""),
            truncated=choice.get("finish_reason") == "length",
        )


class GeminiProvider(_Provider):
    name = "gemini"
    key_variable = "GEMINI_API_KEY"
    key_description = "Gemini"
    models = frozenset({"gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.5-pro"})
    model_variable = "GEMINI_MODEL"
    fallback_model = "gemini-2.5-flash"
    supports_grounding = True

    def build_request(self, model: str, key: str, body: GenerateBody) -> UpstreamRequest:
        return UpstreamRequest(
            url=(
                f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
            ),
            headers={"content-type": "application/json", "x-goog-api-key": key},
            payload={
                "system_instruction": {"parts": [{"text": body.system}]},
                "contents": [
                    {
                        "role": "model" if message.role == "assistant" else "user",
                        "parts": [{"text": message.content}],
                    }
                    for message in body.messages
                ],
                "generationConfig": {"maxOutputTokens": body.maxTokens},
                "tools": [{"google_search": {}}],
            },
        )

    def read_completion(self, data: dict) -> Completion:
        candidate = (data.get("candidates") or [{}])[0]
        parts = candidate.get("content", {}).get("parts", [])
        return Completion(
            text="\n".join(part.get("text", "") for part in parts),
            truncated=candidate.get("finishReason") == "MAX_TOKENS",
        )


PROVIDERS: tuple[_Provider, ...] = (GroqProvider(), GeminiProvider())


class AiGateway:
    """Chooses a provider for a request and proxies it, hiding upstream detail."""

    def __init__(self, providers: tuple[_Provider, ...] = PROVIDERS) -> None:
        self._providers = providers

    def provider_for(self, body: GenerateBody) -> _Provider:
        return next(
            provider for provider in self._providers if provider.supports_grounding == body.grounded
        )

    def target(self, body: GenerateBody) -> tuple[str, str]:
        """The provider name and model a request would use, for metrics labels."""
        provider = self.provider_for(body)
        return provider.name, provider.resolve_model(body.model)

    def advertised_config(self) -> dict[str, dict[str, object]]:
        return {
            provider.name: {
                "available": bool(provider.api_key()),
                "defaultModel": provider.default_model(),
                "anonymousDailyQuota": DAILY_QUOTA,
            }
            for provider in self._providers
        }

    async def generate(self, body: GenerateBody) -> AiOutcome:
        provider = self.provider_for(body)
        key = provider.api_key()
        if not key:
            return AiOutcome(503, {"error": provider.missing_key_message()})
        request = provider.build_request(provider.resolve_model(body.model), key, body)
        try:
            async with httpx.AsyncClient(timeout=UPSTREAM_TIMEOUT) as client:
                upstream = await client.post(
                    request.url, headers=request.headers, json=request.payload
                )
            data = upstream.json()
            if not upstream.is_success:
                return self._refused(upstream.status_code)
            completion = provider.read_completion(data)
            return AiOutcome(200, {"text": completion.text, "truncated": completion.truncated})
        except httpx.TimeoutException:
            return AiOutcome(504, {"error": "Provider request timed out"})
        except Exception:
            logger.exception("AI provider request failed")
            return AiOutcome(502, {"error": "Failed to reach provider"})

    def _refused(self, status: int) -> AiOutcome:
        """Upstream detail stays in the log; the caller gets a correlation id."""
        request_id = secrets.token_urlsafe(8)
        logger.warning("AI provider refused request id=%s status=%s", request_id, status)
        return AiOutcome(
            status,
            {
                "error": "The AI provider could not complete this request.",
                "requestId": request_id,
            },
        )
