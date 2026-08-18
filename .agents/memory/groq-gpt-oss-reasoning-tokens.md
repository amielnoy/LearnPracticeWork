---
name: Groq gpt-oss reasoning-token budget
description: Why small max_tokens caps on Groq's openai/gpt-oss-* models can silently return an empty reply, and how to fix it.
---

Groq's `openai/gpt-oss-120b` / `gpt-oss-20b` models are reasoning models: part of
`max_tokens` is spent on a hidden chain-of-thought field (`message.reasoning`)
before the visible `message.content` is produced. With a small cap (e.g. 20
tokens, used for a lightweight "test connection" ping), reasoning alone can
consume the whole budget, so the call returns HTTP 200 with `finish_reason:
"length"` and an **empty** `content` — indistinguishable from success unless
you inspect the field. This is nondeterministic: the same prompt sometimes
fits, sometimes doesn't.

**Why:** the response shape looks identical to a normal successful reply
(status 200, valid JSON), so naively parsing `choices[0].message.content`
gives no error to catch — it just silently returns `''`.

**How to apply:** when calling Groq's `openai/gpt-oss-*` models, pass
`reasoning_effort: "low"` in the request body to shrink the hidden
chain-of-thought, and avoid very small `max_tokens` caps (well under ~50) for
short pings/health-checks — give them enough headroom (~80+) that reasoning
tokens can't crowd out the entire visible answer. Non-reasoning Groq models
ignore the `reasoning_effort` field harmlessly.
