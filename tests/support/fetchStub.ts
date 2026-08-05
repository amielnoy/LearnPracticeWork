/**
 * Records `fetch` calls and answers them from a handler, so the provider layer
 * can be exercised without touching Gemini, Anthropic or OpenAI.
 *
 * Responses are real `Response` objects, so `ok`, `status`, `json()` and
 * `text()` behave exactly as they do against a live endpoint. A handler that
 * throws reproduces a network/CORS failure.
 */

export interface RecordedRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  /** Parsed JSON body when the request sent one, otherwise the raw value. */
  body: unknown;
}

export interface FetchStub {
  calls: RecordedRequest[];
  /** The single recorded call; fails loudly when there was not exactly one. */
  only(): RecordedRequest;
  restore(): void;
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export function textResponse(body: string, status = 200): Response {
  return new Response(body, { status, headers: { 'content-type': 'text/plain' } });
}

function toHeaderRecord(headers: HeadersInit | undefined): Record<string, string> {
  const record: Record<string, string> = {};
  if (!headers) return record;
  new Headers(headers).forEach((value, key) => {
    record[key.toLowerCase()] = value;
  });
  return record;
}

function parseBody(body: BodyInit | null | undefined): unknown {
  if (typeof body !== 'string') return body ?? null;
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}

export function stubFetch(
  handler: (request: RecordedRequest) => Response | Promise<Response>,
): FetchStub {
  const calls: RecordedRequest[] = [];
  const original = globalThis.fetch;

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const request: RecordedRequest = {
      url,
      method: (init?.method ?? 'GET').toUpperCase(),
      headers: toHeaderRecord(init?.headers),
      body: parseBody(init?.body),
    };
    calls.push(request);
    return handler(request);
  }) as typeof fetch;

  return {
    calls,
    only() {
      if (calls.length !== 1) {
        throw new Error(`expected exactly one fetch call, saw ${calls.length}`);
      }
      return calls[0]!;
    },
    restore() {
      globalThis.fetch = original;
    },
  };
}
