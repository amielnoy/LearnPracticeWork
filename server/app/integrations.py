from __future__ import annotations

import os
from typing import Any

import httpx
import stripe


async def stripe_credentials() -> tuple[str, str | None]:
    direct_secret = os.getenv("STRIPE_SECRET_KEY", "").strip()
    if direct_secret:
        webhook = os.getenv("STRIPE_WEBHOOK_SECRET", "").strip()
        return direct_secret, webhook or None

    hostname = os.getenv("REPLIT_CONNECTORS_HOSTNAME", "").strip()
    identity = os.getenv("REPL_IDENTITY", "").strip()
    renewal = os.getenv("WEB_REPL_RENEWAL", "").strip()
    token = f"repl {identity}" if identity else f"depl {renewal}" if renewal else ""
    if not hostname or not token:
        raise RuntimeError(
            "Missing Replit environment variables. Ensure the Stripe integration is connected."
        )
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(
            f"https://{hostname}/api/v2/connection",
            params={"include_secrets": "true", "connector_names": "stripe"},
            headers={"accept": "application/json", "X-Replit-Token": token},
        )
        response.raise_for_status()
    items = response.json().get("items", [])
    settings: dict[str, Any] = items[0].get("settings", {}) if items else {}
    secret = settings.get("secret_key")
    if not isinstance(secret, str) or not secret:
        raise RuntimeError("Stripe integration not connected or missing secret key.")
    webhook = settings.get("webhook_secret")
    return secret, webhook if isinstance(webhook, str) and webhook else None


async def stripe_client() -> stripe.StripeClient:
    secret, _ = await stripe_credentials()
    return stripe.StripeClient(secret)
