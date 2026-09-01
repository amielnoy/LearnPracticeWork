"""Request bodies accepted by the public API.

Every model forbids unknown fields: a client that sends something this server
does not understand gets a 400 rather than having it silently dropped.
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator

MAX_PROMPT_CHARACTERS = 60_000

# Mirrors `database.MAX_PROGRESS_IDS`; the ids themselves are lecture and
# practice-item keys, which are short by construction.
MAX_PROGRESS_IDS = 500
MAX_PROGRESS_ID_LENGTH = 200


class GoogleLogin(BaseModel):
    model_config = ConfigDict(extra="forbid")
    credential: str = Field(min_length=1, max_length=10_000)


class Message(BaseModel):
    model_config = ConfigDict(extra="forbid")
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=50_000)


class GenerateBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    model: str | None = Field(default=None, max_length=100)
    system: str = Field(default="", max_length=12_000)
    messages: list[Message] = Field(min_length=1, max_length=20)
    maxTokens: int = Field(default=2_500, ge=1, le=8_192)
    grounded: bool = False

    @model_validator(mode="after")
    def combined_length(self):
        if len(self.system) + sum(len(message.content) for message in self.messages) > (
            MAX_PROMPT_CHARACTERS
        ):
            raise ValueError(
                f"Combined prompt content must not exceed {MAX_PROMPT_CHARACTERS} characters"
            )
        return self


class ProgressBody(BaseModel):
    """One device's copy of a reader's progress, on its way to being merged.

    The bounds are the point. Every field here starts life in `localStorage`,
    which the person holding the browser can edit, and the two lists are stored
    rather than rendered — so what is guarded is the size of the row, not what
    is in it. The client caps the same two lists at the same 500.
    """

    model_config = ConfigDict(extra="forbid")
    resumeStarted: bool = False
    resumeCompleted: bool = False
    interviewStarted: bool = False
    interviewAnswers: int = Field(default=0, ge=0, le=10_000)
    interviewCompleted: bool = False
    practiceCompleted: list[str] = Field(default_factory=list, max_length=MAX_PROGRESS_IDS)
    lecturesViewed: list[str] = Field(default_factory=list, max_length=MAX_PROGRESS_IDS)
    lastTool: Literal["resume", "interview", "practice"] | None = None

    @model_validator(mode="after")
    def bounded_ids(self):
        for name in ("practiceCompleted", "lecturesViewed"):
            for value in getattr(self, name):
                if not value or len(value) > MAX_PROGRESS_ID_LENGTH:
                    raise ValueError(
                        f"{name} entries must be 1 to {MAX_PROGRESS_ID_LENGTH} characters"
                    )
        return self


class CheckoutBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    email: EmailStr | None = Field(default=None, max_length=320)
    acceptedTerms: Literal[True]
    locale: Literal["en", "he"] = "en"
