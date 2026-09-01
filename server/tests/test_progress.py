"""Progress: who may read it, what a merge does, and what an absent store means.

The store is faked here rather than reached: what these check is the route's
contract and the service's error mapping, both of which have to hold on a
deployment with no database at all.
"""

from __future__ import annotations

import pytest

from app.dependencies import get_progress_service
from app.errors import ServiceError
from app.google_auth import GoogleUser
from app.main import app
from app.progress import ProgressService

STORED = {
    "resumeStarted": True,
    "resumeCompleted": True,
    "interviewStarted": False,
    "interviewAnswers": 3,
    "interviewCompleted": False,
    "practiceCompleted": ["challenge-1"],
    "lecturesViewed": ["lecture-2"],
    "lastTool": "resume",
}


class FakeStore:
    """Remembers one row and records what it was asked to merge into it."""

    def __init__(self, stored: dict | None = None) -> None:
        self.stored = stored
        self.merged: list[tuple[str, str, dict]] = []

    async def load(self, subject: str) -> dict | None:
        return self.stored

    async def merge(self, subject: str, email: str, incoming: dict) -> dict | None:
        self.merged.append((subject, email, incoming))
        return self.stored


def use_store(store: FakeStore) -> None:
    app.dependency_overrides[get_progress_service] = lambda: ProgressService(
        store.load, store.merge
    )


@pytest.fixture(autouse=True)
def clear_overrides():
    yield
    app.dependency_overrides.pop(get_progress_service, None)


async def test_progress_is_private_to_a_signed_in_reader(api_client):
    use_store(FakeStore(STORED))
    assert (await api_client.get("/api/progress")).status_code == 401
    assert (await api_client.put("/api/progress", json={})).status_code == 401


async def test_a_signed_in_reader_gets_their_stored_progress(authenticated_client):
    use_store(FakeStore(STORED))
    response = await authenticated_client.get("/api/progress")
    assert response.status_code == 200
    assert response.json()["progress"] == STORED


async def test_a_write_merges_and_answers_with_the_union(authenticated_client):
    store = FakeStore(STORED)
    use_store(store)
    response = await authenticated_client.put(
        "/api/progress", json={"interviewAnswers": 1, "lecturesViewed": ["lecture-9"]}
    )
    assert response.status_code == 200
    # The answer is the merge, not the request — a device that knew less does
    # not get its own smaller copy back.
    assert response.json()["progress"] == STORED
    _subject, _email, incoming = store.merged[0]
    assert incoming["lecturesViewed"] == ["lecture-9"]
    assert incoming["interviewAnswers"] == 1


async def test_a_deployment_without_a_database_says_so_rather_than_failing(authenticated_client):
    use_store(FakeStore(None))
    response = await authenticated_client.get("/api/progress")
    assert response.status_code == 503
    assert "not available" in response.json()["error"]


async def test_unknown_fields_are_refused_rather_than_dropped(authenticated_client):
    use_store(FakeStore(STORED))
    response = await authenticated_client.put(
        "/api/progress", json={"resumeStarted": True, "isAdmin": True}
    )
    assert response.status_code == 400


async def test_an_oversized_list_is_refused(authenticated_client):
    use_store(FakeStore(STORED))
    response = await authenticated_client.put(
        "/api/progress", json={"lecturesViewed": [f"lecture-{n}" for n in range(501)]}
    )
    assert response.status_code == 400


async def test_an_unknown_tool_is_refused(authenticated_client):
    use_store(FakeStore(STORED))
    response = await authenticated_client.put("/api/progress", json={"lastTool": "admin"})
    assert response.status_code == 400


async def test_a_broken_store_is_a_fault_and_not_an_absence():
    """503 says "not on this server"; a failed query has to stay a 500."""

    async def explode(*_args) -> dict:
        raise RuntimeError("connection reset")

    service = ProgressService(explode, explode)
    user = GoogleUser(subject="sub", email="reader@example.com", name="R", picture="", expires_at=0)
    with pytest.raises(ServiceError) as raised:
        await service.for_user(user)
    assert raised.value.status == 500
