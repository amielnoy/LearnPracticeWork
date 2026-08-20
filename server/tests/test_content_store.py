"""Nesting course content, and what happens when the store is not there.

The three public content routes share one code path now, so the cases that used
to be worth checking per route — an orphaned child row, a parent with nothing
under it, an absent store — are checked once each against the specs instead.
"""

from __future__ import annotations

from collections.abc import Mapping

import pytest

from app.content_store import (
    CODING_CHALLENGES,
    LECTURE_SERIES,
    QUESTION_BANK,
    ContentService,
    SupabaseContentStore,
)
from app.errors import ServiceError


class FakeStore:
    """Answers with canned rows and records the filters it was asked for."""

    def __init__(self, tables: dict[str, list[dict]]) -> None:
        self._tables = tables
        self.calls: list[tuple[str, Mapping[str, str] | None]] = []

    async def rows(
        self, table: str, select: str, filters: Mapping[str, str] | None = None
    ) -> list[dict]:
        self.calls.append((table, filters))
        return self._tables.get(table, [])


class BrokenStore:
    def __init__(self, error: Exception) -> None:
        self._error = error

    async def rows(self, table: str, select: str, filters=None) -> list[dict]:
        raise self._error


@pytest.mark.asyncio
async def test_a_question_stage_carries_its_own_items_and_no_others() -> None:
    store = FakeStore(
        {
            "question_bank_stages": [
                {"id": 1, "icon": "🧪", "title": "Fundamentals"},
                {"id": 2, "icon": "🚀", "title": "Automation"},
            ],
            "question_bank_items": [
                {
                    "stage_id": 1,
                    "question": "What is a flaky test?",
                    "hint": "timing",
                    "answer": "…",
                },
                {
                    "stage_id": 2,
                    "question": "What is a page object?",
                    "hint": "structure",
                    "answer": "…",
                },
            ],
        }
    )

    result = await ContentService(store).collection(QUESTION_BANK, "en")

    assert [stage["title"] for stage in result["stages"]] == ["Fundamentals", "Automation"]
    assert result["stages"][0]["items"] == [
        {"q": "What is a flaky test?", "hint": "timing", "answer": "…"}
    ]
    assert len(result["stages"][1]["items"]) == 1


@pytest.mark.asyncio
async def test_a_child_row_pointing_at_no_parent_is_left_out() -> None:
    """A stale row in the store must not surface under an unrelated heading."""
    store = FakeStore(
        {
            "question_bank_stages": [{"id": 1, "icon": "🧪", "title": "Fundamentals"}],
            "question_bank_items": [
                {"stage_id": 1, "question": "kept", "hint": "", "answer": ""},
                {"stage_id": 99, "question": "orphan", "hint": "", "answer": ""},
            ],
        }
    )

    result = await ContentService(store).collection(QUESTION_BANK, "en")

    assert [item["q"] for item in result["stages"][0]["items"]] == ["kept"]


@pytest.mark.asyncio
async def test_no_parents_asks_for_no_children_rather_than_for_all_of_them() -> None:
    """An unfiltered `in.()` would return the whole child table for every language."""
    store = FakeStore({"question_bank_stages": [], "question_bank_items": []})

    result = await ContentService(store).collection(QUESTION_BANK, "he")

    assert result == {"stages": []}
    assert store.calls[1] == ("question_bank_items", {"stage_id": "eq.-1"})


@pytest.mark.asyncio
async def test_the_requested_language_filters_the_parent_table() -> None:
    store = FakeStore({"lecture_tracks": [], "lecture_items": []})

    await ContentService(store).collection(LECTURE_SERIES, "he")

    assert store.calls[0] == ("lecture_tracks", {"lang": "eq.he"})


@pytest.mark.asyncio
async def test_a_lecture_without_a_link_carries_no_url_key_at_all() -> None:
    """The client shows a link when the key is present, so an empty one must be absent."""
    store = FakeStore(
        {
            "lecture_tracks": [{"id": 7, "title": "Track", "lead": "Lead"}],
            "lecture_items": [
                {
                    "track_id": 7,
                    "num": 1,
                    "ready": True,
                    "title": "Ready one",
                    "description": "d",
                    "url": "https://example.test/1",
                },
                {
                    "track_id": 7,
                    "num": 2,
                    "ready": False,
                    "title": "Upcoming",
                    "description": "d",
                    "url": "",
                },
            ],
        }
    )

    lectures = (await ContentService(store).collection(LECTURE_SERIES, "en"))["tracks"][0][
        "lectures"
    ]

    assert lectures[0]["url"] == "https://example.test/1"
    assert "url" not in lectures[1]
    assert lectures[1]["desc"] == "d", "the column is `description`, the field is `desc`"


@pytest.mark.asyncio
async def test_a_coding_challenge_keeps_the_fields_the_client_renders() -> None:
    store = FakeStore(
        {
            "coding_challenge_levels": [{"id": 3, "label": "Junior", "blurb": "Start here"}],
            "coding_challenges": [
                {
                    "level_id": 3,
                    "title": "FizzBuzz",
                    "prompt": "…",
                    "hint": "…",
                    "code": "…",
                    "complexity": "O(n)",
                }
            ],
        }
    )

    level = (await ContentService(store).collection(CODING_CHALLENGES, "en"))["levels"][0]

    assert level["label"] == "Junior"
    assert set(level["items"][0]) == {"title", "prompt", "hint", "code", "complexity"}


@pytest.mark.asyncio
async def test_an_unconfigured_store_is_a_503_and_not_a_stack_trace() -> None:
    service = ContentService(BrokenStore(RuntimeError("Content store is not configured")))

    with pytest.raises(ServiceError) as raised:
        await service.collection(QUESTION_BANK, "en")

    assert raised.value.status == 503
    assert raised.value.message == "Content temporarily unavailable"


@pytest.mark.asyncio
async def test_an_unexpected_store_failure_is_still_a_503_to_the_caller() -> None:
    """Whatever went wrong upstream, the client is told the same thing."""
    service = ContentService(BrokenStore(ValueError("Content response was not a list")))

    with pytest.raises(ServiceError) as raised:
        await service.collection(CODING_CHALLENGES, "en")

    assert raised.value.status == 503


@pytest.mark.asyncio
async def test_the_supabase_store_refuses_to_run_without_credentials(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.delenv("SUPABASE_URL", raising=False)
    monkeypatch.delenv("SUPABASE_ANON_KEY", raising=False)

    with pytest.raises(RuntimeError, match="Content store is not configured"):
        await SupabaseContentStore().rows("question_bank_stages", "id")
