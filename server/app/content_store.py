"""Reading course content out of the Supabase REST store.

The three public content routes are the same shape — an ordered parent table
with an ordered child table hanging off it — so they are described as data
(`NestedCollection`) and served by one code path rather than three near-copies.
"""

from __future__ import annotations

import logging
from collections.abc import Callable, Mapping, Sequence
from dataclasses import dataclass
from typing import Protocol

import httpx

from .config import env
from .errors import ServiceError

logger = logging.getLogger(__name__)

CONTENT_UNAVAILABLE = "Content temporarily unavailable"
SUPPORTED_LANGUAGES = ("en", "he")


class ContentStore(Protocol):
    """The only thing the content routes need from a backing store."""

    async def rows(
        self, table: str, select: str, filters: Mapping[str, str] | None = None
    ) -> list[dict]: ...


class SupabaseContentStore:
    async def rows(
        self, table: str, select: str, filters: Mapping[str, str] | None = None
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


def _copy(*fields: str) -> Callable[[dict], dict]:
    return lambda row: {field: row[field] for field in fields}


@dataclass(frozen=True)
class NestedCollection:
    """A parent table, a child table, and how each row is presented publicly."""

    resource: str
    group_key: str
    parent_table: str
    parent_select: str
    parent_view: Callable[[dict], dict]
    child_table: str
    child_select: str
    child_key: str
    child_foreign_key: str
    child_view: Callable[[dict], dict]


QUESTION_BANK = NestedCollection(
    resource="question bank content",
    group_key="stages",
    parent_table="question_bank_stages",
    parent_select="id,position,icon,title",
    parent_view=_copy("icon", "title"),
    child_table="question_bank_items",
    child_select="stage_id,position,question,hint,answer",
    child_key="items",
    child_foreign_key="stage_id",
    child_view=lambda row: {"q": row["question"], "hint": row["hint"], "answer": row["answer"]},
)

CODING_CHALLENGES = NestedCollection(
    resource="coding challenges content",
    group_key="levels",
    parent_table="coding_challenge_levels",
    parent_select="id,position,label,blurb",
    parent_view=_copy("label", "blurb"),
    child_table="coding_challenges",
    child_select="level_id,position,title,prompt,hint,code,complexity",
    child_key="items",
    child_foreign_key="level_id",
    child_view=_copy("title", "prompt", "hint", "code", "complexity"),
)

LECTURE_SERIES = NestedCollection(
    resource="lecture series content",
    group_key="tracks",
    parent_table="lecture_tracks",
    parent_select="id,position,title,lead",
    parent_view=_copy("title", "lead"),
    child_table="lecture_items",
    child_select="track_id,position,num,ready,title,description,url",
    child_key="lectures",
    child_foreign_key="track_id",
    child_view=lambda row: {
        "num": row["num"],
        "ready": row["ready"],
        "title": row["title"],
        "desc": row["description"],
        **({"url": row["url"]} if row.get("url") else {}),
    },
)


class ContentService:
    def __init__(self, store: ContentStore) -> None:
        self._store = store

    async def collection(self, spec: NestedCollection, language: str) -> dict:
        try:
            parents = await self._store.rows(
                spec.parent_table, spec.parent_select, {"lang": f"eq.{language}"}
            )
            children = await self._store.rows(
                spec.child_table,
                spec.child_select,
                {spec.child_foreign_key: self._parent_filter(parents)},
            )
        except Exception as exc:
            raise self._unavailable(spec.resource, exc) from exc
        return {spec.group_key: [self._group(spec, parent, children) for parent in parents]}

    @staticmethod
    def _parent_filter(parents: Sequence[dict]) -> str:
        ids = [str(parent["id"]) for parent in parents]
        return f"in.({','.join(ids)})" if ids else "eq.-1"

    @staticmethod
    def _group(spec: NestedCollection, parent: dict, children: Sequence[dict]) -> dict:
        return {
            **spec.parent_view(parent),
            spec.child_key: [
                spec.child_view(child)
                for child in children
                if child[spec.child_foreign_key] == parent["id"]
            ],
        }

    @staticmethod
    def _unavailable(resource: str, exc: Exception) -> ServiceError:
        """An unconfigured store is expected; anything else is worth a stack trace."""
        if isinstance(exc, RuntimeError):
            logger.warning("%s unavailable: %s", resource, exc)
        else:
            logger.exception("Failed to load %s", resource)
        return ServiceError(CONTENT_UNAVAILABLE, 503)
