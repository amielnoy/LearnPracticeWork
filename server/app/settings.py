"""Deployment-wide limits and the identity of the single course this API sells.

These are read once at import time so every module observes the same values for
the lifetime of the process. Configuration that may legitimately change between
requests (origins, provider keys) is read where it is used instead.
"""

from __future__ import annotations

from .config import positive_int

DAILY_QUOTA = positive_int("AI_DAILY_QUOTA", 10)
BURST_LIMIT = positive_int("AI_RATE_LIMIT_MAX", 15)
BURST_WINDOW = positive_int("AI_RATE_LIMIT_WINDOW_MS", 60_000) / 1000
UPSTREAM_TIMEOUT = positive_int("AI_UPSTREAM_TIMEOUT_MS", 30_000) / 1000
MAX_REQUEST_BODY = positive_int("MAX_REQUEST_BODY_BYTES", 96 * 1024)

# How many rightmost X-Forwarded-For entries are written by infrastructure we
# control and must therefore be skipped to reach the caller. A client can put
# anything in that header, but only ever at the left, so counting from the right
# is what makes the value trustworthy. One matches a single load balancer that
# appends the caller and then itself, which is the common cloud shape; set it to
# match the deployment, because too high trusts a forged entry and too low keys
# every caller behind one proxy to the same bucket.
TRUSTED_PROXY_HOPS = positive_int("TRUSTED_PROXY_HOPS", 1)

COURSE_SKU = "ai-testing-bootcamp"
TERMS_VERSION = "2026-08-20"
