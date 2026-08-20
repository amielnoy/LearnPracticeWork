from __future__ import annotations

import os

import stripe


async def stripe_credentials() -> tuple[str, str | None]:
    direct_secret = os.getenv("STRIPE_SECRET_KEY", "").strip()
    if not direct_secret:
        raise RuntimeError("STRIPE_SECRET_KEY is not configured on this server.")
    webhook = os.getenv("STRIPE_WEBHOOK_SECRET", "").strip()
    return direct_secret, webhook or None


async def stripe_client() -> stripe.StripeClient:
    secret, _ = await stripe_credentials()
    return stripe.StripeClient(secret)
