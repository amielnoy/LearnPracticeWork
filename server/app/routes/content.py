"""Public course content, served from the Supabase store.

The three routes differ only in which `NestedCollection` they ask for.
"""

from __future__ import annotations

from fastapi import APIRouter, Request

from ..content_store import (
    CODING_CHALLENGES,
    LECTURE_SERIES,
    QUESTION_BANK,
    SUPPORTED_LANGUAGES,
)
from ..dependencies import Content

router = APIRouter(prefix="/api/content")


def language(request: Request) -> str:
    """Exactly one recognised `lang`, or English — a repeated parameter is not a choice."""
    values = request.query_params.getlist("lang")
    if len(values) == 1 and values[0] in SUPPORTED_LANGUAGES:
        return values[0]
    return SUPPORTED_LANGUAGES[0]


@router.get("/question-bank")
async def question_bank(request: Request, content: Content):
    return await content.collection(QUESTION_BANK, language(request))


@router.get("/coding-challenges")
async def coding_challenges(request: Request, content: Content):
    return await content.collection(CODING_CHALLENGES, language(request))


@router.get("/lecture-series")
async def lecture_series(request: Request, content: Content):
    return await content.collection(LECTURE_SERIES, language(request))
