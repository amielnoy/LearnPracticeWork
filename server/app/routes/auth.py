"""Google sign-in, session inspection and sign-out."""

from __future__ import annotations

import os
import time

from fastapi import APIRouter, Request, Response
from pydantic import ValidationError

from ..config import env
from ..dependencies import SessionUser, client_ip, login_limiter
from ..errors import error_response
from ..google_auth import GoogleUser, verify_google_id_token
from ..metrics import observe_login
from ..schemas import GoogleLogin
from ..sessions import COOKIE_NAME, create_session, sessions_configured

router = APIRouter(prefix="/api/auth")

NOT_CONFIGURED = "Sign-in is not configured on this server."


def public_user(user: GoogleUser) -> dict[str, str | int]:
    """The claims a browser is allowed to see; the raw token never leaves the server."""
    return {
        "name": user.name,
        "email": user.email,
        "picture": user.picture,
        "expiresAt": user.expires_at * 1000,
    }


@router.get("/config")
async def auth_config() -> dict[str, str]:
    return {"clientId": env("GOOGLE_CLIENT_ID") or ""}


@router.post("/google")
async def google_login(request: Request, response: Response):
    if not env("GOOGLE_CLIENT_ID") or not sessions_configured():
        observe_login(request, None, "unconfigured")
        return error_response(NOT_CONFIGURED, 503)
    allowed, _ = await login_limiter.hit(client_ip(request))
    if not allowed:
        observe_login(request, None, "rate_limited")
        return error_response("Too many sign-in attempts. Please try again later.", 429)
    try:
        body = GoogleLogin.model_validate(await request.json())
    except (ValidationError, ValueError):
        observe_login(request, None, "invalid_request")
        return error_response("Invalid request body", 400)
    user = await verify_google_id_token(body.credential)
    if not user:
        observe_login(request, None, "rejected")
        return error_response("Google sign-in could not be verified.", 401)
    _issue_session_cookie(response, user)
    observe_login(request, user.email, "success")
    return {"user": public_user(user)}


def _issue_session_cookie(response: Response, user: GoogleUser) -> None:
    response.set_cookie(
        COOKIE_NAME,
        create_session(user),
        max_age=max(0, user.expires_at - int(time.time())),
        httponly=True,
        secure=os.getenv("NODE_ENV") == "production",
        samesite="lax",
        path="/api",
    )


@router.get("/session")
async def auth_session(user: SessionUser):
    if not user:
        return error_response("Not signed in", 401)
    return {"user": public_user(user)}


@router.post("/logout")
async def auth_logout(response: Response):
    response.delete_cookie(COOKIE_NAME, path="/api")
    return {"ok": True}
