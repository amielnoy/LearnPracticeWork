"""Application composition root.

This module wires the pieces together and nothing else: configuration, the two
middleware layers, the error handlers and the routers. Every behaviour lives in
the module that owns it, so this file changes only when the shape of the
application does. `app.main:app` stays the ASGI entrypoint every deployment
target expects.
"""

from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError

from . import middleware
from .database import initialize_database
from .errors import ServiceError, error_response, validation_issues
from .origins import cors_allow_origin_regex, cors_allow_origins
from .routes import ROUTERS

logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO").upper())
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI):
    """A failed migration degrades the database-backed routes, it does not stop boot."""
    try:
        await initialize_database()
    except Exception:
        logger.exception("Database initialization failed; database-backed routes will degrade")
    yield


def _install_cors(app: FastAPI) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_allow_origins(),
        allow_origin_regex=cors_allow_origin_regex(),
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization", "Stripe-Signature"],
        max_age=600,
    )


def _install_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(ServiceError)
    async def service_error(_: Request, exc: ServiceError):
        return error_response(exc.message, exc.status)

    @app.exception_handler(ValidationError)
    async def validation_error(_: Request, exc: ValidationError):
        return error_response("Invalid request body", 400, issues=validation_issues(exc.errors()))


def create_app() -> FastAPI:
    app = FastAPI(
        title="AI Testing Academy API",
        version="0.1.0",
        lifespan=lifespan,
        docs_url=None,
        redoc_url=None,
        openapi_url="/api/openapi.json",
    )
    # Order matters: CORS is added first so the metrics layer added last wraps
    # every response, including the ones the ingress guard short-circuits.
    _install_cors(app)
    middleware.install(app)
    _install_error_handlers(app)
    for router in ROUTERS:
        app.include_router(router)
    return app


app = create_app()
