# Production image for the Python API. Build from the repository root.
FROM python:3.12-slim AS builder

RUN pip install --no-cache-dir uv==0.8.17
WORKDIR /app/server
COPY server/pyproject.toml server/uv.lock ./
RUN uv sync --frozen --no-dev

FROM python:3.12-slim AS runtime
ENV PATH="/app/server/.venv/bin:$PATH" \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    NODE_ENV=production
WORKDIR /app/server
COPY --from=builder /app/server/.venv ./.venv
COPY server/app ./app
RUN useradd --create-home --uid 10001 api
USER api
EXPOSE 8080
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080", "--proxy-headers", "--forwarded-allow-ips=*"]
