from __future__ import annotations

import asyncio
import hmac
import logging
import os
from contextlib import asynccontextmanager
from typing import Annotated, Literal

import httpx
import stripe
from fastapi import Cookie, FastAPI, Header, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, EmailStr, Field, ValidationError, model_validator

from .config import env, positive_int
from .database import find_course_access, initialize_database, record_purchase
from .google_auth import GoogleUser, verify_google_id_token
from .integrations import stripe_client, stripe_credentials
from .metrics import RequestTimer, metrics_authorized, prometheus_response
from .rate_limit import MemoryRateLimiter
from .relay import relay_api_request, upstream_api_base_url
from .sessions import COOKIE_NAME, create_session, read_session, sessions_configured

logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO").upper())
logger = logging.getLogger(__name__)

GEMINI_MODELS = {"gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.5-pro"}
GROQ_MODELS = {"openai/gpt-oss-120b", "openai/gpt-oss-20b", "groq/compound"}
DEFAULT_GEMINI = env("GEMINI_MODEL") if env("GEMINI_MODEL") in GEMINI_MODELS else "gemini-2.5-flash"
DEFAULT_GROQ = env("GROQ_MODEL") if env("GROQ_MODEL") in GROQ_MODELS else "openai/gpt-oss-120b"
DAILY_QUOTA = positive_int("AI_DAILY_QUOTA", 10)
BURST_LIMIT = positive_int("AI_RATE_LIMIT_MAX", 15)
BURST_WINDOW = positive_int("AI_RATE_LIMIT_WINDOW_MS", 60_000) / 1000
UPSTREAM_TIMEOUT = positive_int("AI_UPSTREAM_TIMEOUT_MS", 30_000) / 1000

burst_limiter = MemoryRateLimiter(BURST_LIMIT, BURST_WINDOW)
daily_limiter = MemoryRateLimiter(DAILY_QUOTA, 24 * 60 * 60)
admin_limiter = MemoryRateLimiter(20, 15 * 60)
login_limiter = MemoryRateLimiter(10, 5 * 60)


@asynccontextmanager
async def lifespan(_: FastAPI):
    try:
        await initialize_database()
    except Exception:
        logger.exception("Database initialization failed; database-backed routes will degrade")
    yield


app = FastAPI(lifespan=lifespan, docs_url=None, redoc_url=None, openapi_url=None)
allowed_origins = [
    origin.strip().rstrip("/")
    for origin in (env("ALLOWED_ORIGINS") or "").split(",")
    if origin.strip()
]
allowed_origins.extend(
    f"https://{domain.strip()}"
    for domain in (env("REPLIT_DOMAINS") or "").split(",")
    if domain.strip()
)
if os.getenv("NODE_ENV") != "production":
    allowed_origin_regex = r"https?://(localhost|127\.0\.0\.1)(:\d+)?"
else:
    allowed_origin_regex = None
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=allowed_origin_regex,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Stripe-Signature"],
    max_age=600,
)


@app.middleware("http")
async def request_size_limit(request: Request, call_next):
    length = request.headers.get("content-length")
    if length and length.isdigit() and int(length) > 96 * 1024:
        return JSONResponse({"error": "Request body is too large"}, status_code=413)
    if request.url.path.startswith("/api/") and request.url.path != "/api/healthz":
        if upstream := upstream_api_base_url():
            return await relay_api_request(request, upstream)
    return await call_next(request)


@app.middleware("http")
async def record_http_metrics(request: Request, call_next):
    if request.url.path == "/metrics":
        return await call_next(request)
    with RequestTimer(request) as timer:
        try:
            response = await call_next(request)
        except Exception:
            timer.finish(500)
            raise
        timer.finish(response.status_code)
        return response


@app.get("/metrics", include_in_schema=False)
async def metrics(authorization: Annotated[str | None, Header()] = None):
    if not metrics_authorized(authorization):
        return JSONResponse({"error": "Not found"}, status_code=404)
    return prometheus_response()


@app.exception_handler(ValidationError)
async def validation_error(_: Request, exc: ValidationError):
    return JSONResponse(
        {"error": "Invalid request body", "issues": _issues(exc.errors())}, status_code=400
    )


def _issues(errors: list[dict]) -> list[dict]:
    return [
        {"path": list(error.get("loc", ())), "message": error.get("msg", "Invalid value")}
        for error in errors
    ]


def _client_ip(request: Request) -> str:
    return request.client.host if request.client else "unknown"


def _bearer(authorization: str | None) -> str:
    if not authorization:
        return ""
    scheme, separator, token = authorization.strip().partition(" ")
    return token.strip() if separator and scheme.lower() == "bearer" else ""


async def _user_from_request(authorization: str | None, cookie: str | None) -> GoogleUser | None:
    if session_user := read_session(cookie):
        return session_user
    token = _bearer(authorization)
    if not token:
        return None
    try:
        return await verify_google_id_token(token)
    except Exception:
        logger.exception("Could not verify a Google ID token")
        return None


@app.get("/api/healthz")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/auth/config")
async def auth_config() -> dict[str, str]:
    return {"clientId": env("GOOGLE_CLIENT_ID") or ""}


class GoogleLogin(BaseModel):
    model_config = ConfigDict(extra="forbid")
    credential: str = Field(min_length=1, max_length=10_000)


def _public_user(user: GoogleUser) -> dict[str, str | int]:
    return {
        "name": user.name,
        "email": user.email,
        "picture": user.picture,
        "expiresAt": user.expires_at * 1000,
    }


@app.post("/api/auth/google")
async def google_login(request: Request, response: Response):
    if not env("GOOGLE_CLIENT_ID") or not sessions_configured():
        return JSONResponse({"error": "Sign-in is not configured on this server."}, status_code=503)
    allowed, _ = await login_limiter.hit(_client_ip(request))
    if not allowed:
        return JSONResponse(
            {"error": "Too many sign-in attempts. Please try again later."}, status_code=429
        )
    try:
        body = GoogleLogin.model_validate(await request.json())
    except (ValidationError, ValueError):
        return JSONResponse({"error": "Invalid request body"}, status_code=400)
    user = await verify_google_id_token(body.credential)
    if not user:
        return JSONResponse({"error": "Google sign-in could not be verified."}, status_code=401)
    max_age = max(0, user.expires_at - int(__import__("time").time()))
    response.set_cookie(
        COOKIE_NAME,
        create_session(user),
        max_age=max_age,
        httponly=True,
        secure=os.getenv("NODE_ENV") == "production",
        samesite="lax",
        path="/api",
    )
    return {"user": _public_user(user)}


@app.get("/api/auth/session")
async def auth_session(ata_session: Annotated[str | None, Cookie()] = None):
    user = read_session(ata_session)
    if not user:
        return JSONResponse({"error": "Not signed in"}, status_code=401)
    return {"user": _public_user(user)}


@app.post("/api/auth/logout")
async def auth_logout(response: Response):
    response.delete_cookie(COOKIE_NAME, path="/api")
    return {"ok": True}


async def _content_rows(
    table: str, select: str, filters: dict[str, str] | None = None
) -> list[dict]:
    url, key = env("SUPABASE_URL"), env("SUPABASE_ANON_KEY")
    if not url or not key:
        raise RuntimeError("Content store is not configured")
    params = {"select": select, "order": "position.asc", **(filters or {})}
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(
            f"{url.rstrip('/')}/rest/v1/{table}",
            params=params,
            headers={"apikey": key, "authorization": f"Bearer {key}"},
        )
        response.raise_for_status()
    data = response.json()
    if not isinstance(data, list):
        raise ValueError("Content response was not a list")
    return data


def _language(request: Request) -> str:
    values = request.query_params.getlist("lang")
    return values[0] if len(values) == 1 and values[0] in ("en", "he") else "en"


@app.get("/api/content/question-bank")
async def question_bank(request: Request):
    try:
        stages = await _content_rows(
            "question_bank_stages", "id,position,icon,title", {"lang": f"eq.{_language(request)}"}
        )
        ids = [str(stage["id"]) for stage in stages]
        items = await _content_rows(
            "question_bank_items",
            "stage_id,position,question,hint,answer",
            {"stage_id": f"in.({','.join(ids)})" if ids else "eq.-1"},
        )
        return {
            "stages": [
                {
                    "icon": stage["icon"],
                    "title": stage["title"],
                    "items": [
                        {"q": item["question"], "hint": item["hint"], "answer": item["answer"]}
                        for item in items
                        if item["stage_id"] == stage["id"]
                    ],
                }
                for stage in stages
            ]
        }
    except Exception:
        logger.exception("Failed to load question bank content")
        return JSONResponse({"error": "Content temporarily unavailable"}, status_code=503)


@app.get("/api/content/coding-challenges")
async def coding_challenges(request: Request):
    try:
        levels = await _content_rows(
            "coding_challenge_levels",
            "id,position,label,blurb",
            {"lang": f"eq.{_language(request)}"},
        )
        ids = [str(level["id"]) for level in levels]
        items = await _content_rows(
            "coding_challenges",
            "level_id,position,title,prompt,hint,code,complexity",
            {"level_id": f"in.({','.join(ids)})" if ids else "eq.-1"},
        )
        return {
            "levels": [
                {
                    "label": level["label"],
                    "blurb": level["blurb"],
                    "items": [
                        {
                            key: item[key]
                            for key in ("title", "prompt", "hint", "code", "complexity")
                        }
                        for item in items
                        if item["level_id"] == level["id"]
                    ],
                }
                for level in levels
            ]
        }
    except Exception:
        logger.exception("Failed to load coding challenges content")
        return JSONResponse({"error": "Content temporarily unavailable"}, status_code=503)


@app.get("/api/content/lecture-series")
async def lecture_series(request: Request):
    try:
        tracks = await _content_rows(
            "lecture_tracks", "id,position,title,lead", {"lang": f"eq.{_language(request)}"}
        )
        ids = [str(track["id"]) for track in tracks]
        lectures = await _content_rows(
            "lecture_items",
            "track_id,position,num,ready,title,description,url",
            {"track_id": f"in.({','.join(ids)})" if ids else "eq.-1"},
        )
        return {
            "tracks": [
                {
                    "title": track["title"],
                    "lead": track["lead"],
                    "lectures": [
                        {
                            "num": item["num"],
                            "ready": item["ready"],
                            "title": item["title"],
                            "desc": item["description"],
                            **({"url": item["url"]} if item.get("url") else {}),
                        }
                        for item in lectures
                        if item["track_id"] == track["id"]
                    ],
                }
                for track in tracks
            ]
        }
    except Exception:
        logger.exception("Failed to load lecture series content")
        return JSONResponse({"error": "Content temporarily unavailable"}, status_code=503)


class Message(BaseModel):
    model_config = ConfigDict(extra="forbid")
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=50_000)


class GenerateBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    model: str | None = Field(default=None, max_length=100)
    system: str = Field(default="", max_length=12_000)
    messages: list[Message] = Field(min_length=1, max_length=20)
    maxTokens: int = Field(default=2_500, ge=1, le=8_192)
    grounded: bool = False

    @model_validator(mode="after")
    def combined_length(self):
        if len(self.system) + sum(len(message.content) for message in self.messages) > 60_000:
            raise ValueError("Combined prompt content must not exceed 60000 characters")
        return self


@app.get("/api/ai/config")
async def ai_config():
    return {
        "groq": {
            "available": bool(env("GROQ_API_KEY")),
            "defaultModel": DEFAULT_GROQ,
            "anonymousDailyQuota": DAILY_QUOTA,
        },
        "gemini": {
            "available": bool(env("GEMINI_API_KEY")),
            "defaultModel": DEFAULT_GEMINI,
            "anonymousDailyQuota": DAILY_QUOTA,
        },
    }


async def _generate(body: GenerateBody) -> tuple[int, dict]:
    grounded = body.grounded
    allowed = GEMINI_MODELS if grounded else GROQ_MODELS
    default = DEFAULT_GEMINI if grounded else DEFAULT_GROQ
    model = body.model if body.model in allowed else default
    if grounded:
        key = env("GEMINI_API_KEY")
        if not key:
            return 503, {"error": "No server-side Gemini key is configured."}
        payload = {
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
        }
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
        headers = {"content-type": "application/json", "x-goog-api-key": key}
    else:
        key = env("GROQ_API_KEY")
        if not key:
            return 503, {"error": "No server-side Groq key is configured."}
        payload = {
            "model": model,
            "max_tokens": body.maxTokens,
            "reasoning_effort": "low",
            "messages": ([{"role": "system", "content": body.system}] if body.system else [])
            + [message.model_dump() for message in body.messages],
        }
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {"content-type": "application/json", "authorization": f"Bearer {key}"}
    try:
        async with httpx.AsyncClient(timeout=UPSTREAM_TIMEOUT) as client:
            upstream = await client.post(url, headers=headers, json=payload)
        data = upstream.json()
        if not upstream.is_success:
            return upstream.status_code, {
                "error": data.get("error", {}).get("message", "Provider request failed")
            }
        if grounded:
            candidate = (data.get("candidates") or [{}])[0]
            text = "\n".join(
                part.get("text", "") for part in candidate.get("content", {}).get("parts", [])
            )
            truncated = candidate.get("finishReason") == "MAX_TOKENS"
        else:
            choice = (data.get("choices") or [{}])[0]
            text = choice.get("message", {}).get("content", "")
            truncated = choice.get("finish_reason") == "length"
        return 200, {"text": text, "truncated": truncated}
    except httpx.TimeoutException:
        return 504, {"error": "Provider request timed out"}
    except Exception:
        logger.exception("AI provider request failed")
        return 502, {"error": "Failed to reach provider"}


@app.post("/api/ai/generate")
async def ai_generate(request: Request):
    ip = _client_ip(request)
    burst_ok, _ = await burst_limiter.hit(ip)
    if not burst_ok:
        return JSONResponse(
            {"error": "Too many AI requests. Please wait before trying again."}, status_code=429
        )
    daily_ok, remaining = await daily_limiter.hit(ip)
    headers = {"X-AI-Quota-Limit": str(DAILY_QUOTA), "X-AI-Quota-Remaining": str(remaining)}
    if not daily_ok:
        return JSONResponse(
            {"error": "Daily AI request quota exceeded. Please try again tomorrow."},
            status_code=429,
            headers=headers,
        )
    try:
        body = GenerateBody.model_validate(await request.json())
    except (ValidationError, ValueError) as exc:
        issues = _issues(exc.errors()) if isinstance(exc, ValidationError) else []
        return JSONResponse(
            {"error": "Invalid request body", "issues": issues}, status_code=400, headers=headers
        )
    status, result = await _generate(body)
    return JSONResponse(result, status_code=status, headers=headers)


class CheckoutBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    priceId: str = Field(min_length=1, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=320)


async def _admin_allowed(request: Request, authorization: str | None) -> JSONResponse | None:
    expected = env("ADMIN_API_TOKEN")
    if not expected:
        return JSONResponse({"error": "Not found"}, status_code=404)
    allowed, _ = await admin_limiter.hit(_client_ip(request))
    if not allowed:
        return JSONResponse({"error": "Too many requests"}, status_code=429)
    if not hmac.compare_digest(_bearer(authorization), expected):
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return None


@app.post("/api/stripe/seed")
async def stripe_seed(request: Request, authorization: Annotated[str | None, Header()] = None):
    if refused := await _admin_allowed(request, authorization):
        return refused
    try:
        client = await stripe_client()
        existing = await asyncio.to_thread(
            client.v1.products.search, {"query": "name:'AI Testing Bootcamp' AND active:'true'"}
        )
        if existing.data:
            prices = await asyncio.to_thread(
                client.v1.prices.list, {"product": existing.data[0].id, "active": True}
            )
            return {
                "status": "already_exists",
                "productId": existing.data[0].id,
                "priceId": prices.data[0].id if prices.data else None,
            }
        product = await asyncio.to_thread(
            client.v1.products.create,
            {
                "name": "AI Testing Bootcamp",
                "description": "Master AI-powered test automation, DevOps, and modern QA practices with hands-on projects.",
                "metadata": {"category": "course", "featured": "true"},
            },
        )
        price = await asyncio.to_thread(
            client.v1.prices.create, {"product": product.id, "unit_amount": 5000, "currency": "usd"}
        )
        return {"status": "created", "productId": product.id, "priceId": price.id}
    except Exception as exc:
        return JSONResponse({"error": str(exc)}, status_code=500)


@app.post("/api/stripe/checkout")
async def stripe_checkout(
    request: Request,
    authorization: Annotated[str | None, Header()] = None,
    ata_session: Annotated[str | None, Cookie()] = None,
):
    try:
        body = CheckoutBody.model_validate(await request.json())
    except (ValidationError, ValueError) as exc:
        issues = _issues(exc.errors()) if isinstance(exc, ValidationError) else []
        return JSONResponse({"error": "Invalid request body", "issues": issues}, status_code=400)
    user = await _user_from_request(authorization, ata_session)
    try:
        client = await stripe_client()
        origin = str(request.base_url).rstrip("/")
        params = {
            "payment_method_types": ["card"],
            "line_items": [{"price": body.priceId, "quantity": 1}],
            "mode": "payment",
            "success_url": f"{origin}/ai-testing-academy/?payment=success",
            "cancel_url": f"{origin}/ai-testing-academy/?payment=cancelled",
        }
        email = user.email if user else body.email
        if email:
            params["customer_email"] = str(email)
        if user:
            params["metadata"] = {"googleSubject": user.subject}
        session = await asyncio.to_thread(client.v1.checkout.sessions.create, params)
        return {"url": session.url}
    except Exception as exc:
        return JSONResponse({"error": str(exc)}, status_code=500)


@app.get("/api/stripe/prices")
async def stripe_prices():
    try:
        client = await stripe_client()
        products = await asyncio.to_thread(
            client.v1.products.search, {"query": "name:'AI Testing Bootcamp' AND active:'true'"}
        )
        if not products.data:
            return {"data": []}
        prices = await asyncio.to_thread(
            client.v1.prices.list, {"product": products.data[0].id, "active": True}
        )
        return {"data": [item.to_dict() for item in prices.data]}
    except Exception as exc:
        return JSONResponse({"error": str(exc)}, status_code=500)


@app.post("/api/stripe/webhook")
async def stripe_webhook(
    request: Request, stripe_signature: Annotated[str | None, Header()] = None
):
    if not stripe_signature:
        return JSONResponse({"error": "Missing stripe-signature header"}, status_code=400)
    try:
        secret_key, webhook_secret = await stripe_credentials()
        if not webhook_secret:
            raise RuntimeError("Stripe integration supplied no webhook secret")
        payload = await request.body()
        event = stripe.Webhook.construct_event(payload, stripe_signature, webhook_secret)
        if (
            event.type == "checkout.session.completed"
            and event.data.object.payment_status == "paid"
        ):
            client = stripe.StripeClient(secret_key)
            full = await asyncio.to_thread(
                client.v1.checkout.sessions.retrieve,
                event.data.object.id,
                {"expand": ["line_items.data.price.product"]},
            )
            email = (
                getattr(full.customer_details, "email", None) if full.customer_details else None
            ) or full.customer_email
            price = (
                full.line_items.data[0].price if full.line_items and full.line_items.data else None
            )
            product = price.product if price else None
            product_id = product if isinstance(product, str) else getattr(product, "id", "")
            if email and product_id:
                await record_purchase(
                    {
                        "checkout_session_id": full.id,
                        "payment_intent_id": full.payment_intent
                        if isinstance(full.payment_intent, str)
                        else None,
                        "stripe_customer_id": full.customer
                        if isinstance(full.customer, str)
                        else None,
                        "email": email.strip().lower(),
                        "google_subject": (full.metadata or {}).get("googleSubject"),
                        "product_id": product_id,
                        "price_id": price.id if price else None,
                        "amount_total": full.amount_total or 0,
                        "currency": full.currency or "usd",
                    }
                )
        return {"received": True}
    except Exception:
        logger.exception("Stripe webhook error")
        return JSONResponse({"error": "Webhook processing error"}, status_code=400)


@app.get("/api/entitlements/course")
async def entitlements(
    authorization: Annotated[str | None, Header()] = None,
    ata_session: Annotated[str | None, Cookie()] = None,
):
    if not env("GOOGLE_CLIENT_ID"):
        return JSONResponse({"error": "Sign-in is not configured on this server."}, status_code=503)
    user = await _user_from_request(authorization, ata_session)
    if not user:
        return JSONResponse({"error": "A valid Google ID token is required."}, status_code=401)
    try:
        access = await find_course_access(user.subject, user.email)
        if access is None:
            return JSONResponse(
                {"error": "Purchase records are unavailable on this server."}, status_code=503
            )
        has_access, purchased_at = access
        return {
            "hasAccess": has_access,
            "purchasedAt": purchased_at.isoformat() if purchased_at else None,
        }
    except Exception:
        logger.exception("Entitlement lookup failed")
        return JSONResponse({"error": "Could not check entitlements"}, status_code=500)
