"""Request bodies accepted by the public API.

Every model forbids unknown fields: a client that sends something this server
does not understand gets a 400 rather than having it silently dropped.
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator

MAX_PROMPT_CHARACTERS = 60_000


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


class CheckoutBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    email: EmailStr | None = Field(default=None, max_length=320)
    acceptedTerms: Literal[True]
    locale: Literal["en", "he"] = "en"
