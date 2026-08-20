"""One place that decides what a failure looks like on the wire.

Routes and services raise `ServiceError`; a single handler registered on the
application turns it into the `{"error": ...}` body every client expects.
"""

from __future__ import annotations

from collections.abc import Mapping

from fastapi.responses import JSONResponse


class ServiceError(Exception):
    """A failure a caller is allowed to see, carrying its own HTTP status."""

    def __init__(self, message: str, status: int) -> None:
        super().__init__(message)
        self.message = message
        self.status = status


def validation_issues(errors: list[dict]) -> list[dict]:
    return [
        {"path": list(error.get("loc", ())), "message": error.get("msg", "Invalid value")}
        for error in errors
    ]


def error_response(
    message: str,
    status: int,
    *,
    issues: list[dict] | None = None,
    headers: Mapping[str, str] | None = None,
) -> JSONResponse:
    body: dict[str, object] = {"error": message}
    if issues is not None:
        body["issues"] = issues
    return JSONResponse(body, status_code=status, headers=dict(headers) if headers else None)
