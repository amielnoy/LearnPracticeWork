import { allure } from 'allure-playwright';
import type { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * An HTTP client that records what it did into the Allure report.
 *
 * Every call becomes a named step with the request and the response attached,
 * so a failure can be read without re-running anything: the report shows the
 * URL that was called, the body that was sent, the status that came back and
 * the body it came back with. Without this an API failure in the report is a
 * bare `expect(received).toBe(expected)` and the only way to learn what the
 * server actually said is to run it again locally.
 *
 * The wrapper returns Playwright's own `APIResponse` untouched, so assertions
 * are written exactly as they were.
 */

/** Header names whose values must never reach the report. */
const SECRET_HEADER =
  /^(authorization|cookie|set-cookie|proxy-authorization|x-api-key|x-goog-api-key|x-auth-token)$/i;

const REDACTED = '«redacted»';

/**
 * Bodies are capped because the report embeds every attachment. An Allure run
 * of this suite already produces a report measured in megabytes, and a handful
 * of unbounded response bodies is the difference between a report that
 * publishes and one that does not.
 */
const MAX_BODY_CHARS = 8_192;

export interface ApiCallOptions {
  data?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

export interface ApiClient {
  get(url: string, options?: ApiCallOptions): Promise<APIResponse>;
  post(url: string, options?: ApiCallOptions): Promise<APIResponse>;
  put(url: string, options?: ApiCallOptions): Promise<APIResponse>;
  patch(url: string, options?: ApiCallOptions): Promise<APIResponse>;
  delete(url: string, options?: ApiCallOptions): Promise<APIResponse>;
  /** For verbs without a shorthand — a CORS preflight, chiefly. */
  fetch(url: string, options: ApiCallOptions & { method: string }): Promise<APIResponse>;
}

type ShorthandMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

function redactHeaders(headers: Record<string, string> = {}): Record<string, string> {
  return Object.fromEntries(
    Object.entries(headers).map(([name, value]) => [
      name,
      SECRET_HEADER.test(name) ? REDACTED : value,
    ]),
  );
}

function truncate(body: string): string {
  if (body.length <= MAX_BODY_CHARS) return body;
  return `${body.slice(0, MAX_BODY_CHARS)}\n…truncated, ${body.length - MAX_BODY_CHARS} more characters`;
}

/** Pretty-prints JSON so the attachment is readable; leaves anything else alone. */
function formatBody(body: string): string {
  try {
    return JSON.stringify(JSON.parse(body), null, 2);
  } catch {
    return body;
  }
}

/**
 * The path, for the step name. A step called `GET /api/ai/config` reads far
 * better in a report than one carrying a localhost origin and a random port,
 * and the full URL is in the attachment either way.
 */
function toPathLabel(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

async function attachJson(name: string, value: unknown): Promise<void> {
  await allure.attachment(name, JSON.stringify(value, null, 2), 'application/json');
}

async function describeResponse(response: APIResponse): Promise<void> {
  const raw = await response.text();
  await attachJson('response', {
    status: response.status(),
    statusText: response.statusText(),
    url: response.url(),
    headers: redactHeaders(response.headers()),
    body: truncate(formatBody(raw)),
  });
}

/**
 * Wraps a Playwright request context so each call reports itself.
 *
 * The response step is nested inside the request step and named with the
 * status, which is what makes the report skimmable: the tree shows the call and
 * its outcome without anything having to be expanded.
 */
export function withAllureReporting(request: APIRequestContext): ApiClient {
  const call = async (
    method: string,
    url: string,
    options: ApiCallOptions = {},
    send?: () => Promise<APIResponse>,
  ): Promise<APIResponse> => {
    // `allure.step` resolves to void rather than forwarding what the body
    // returned, so the response is carried out through this binding. Assigned
    // on every path the step can complete, hence the definite assignment.
    let response!: APIResponse;

    await allure.step(`${method.toUpperCase()} ${toPathLabel(url)}`, async () => {
      await attachJson('request', {
        method: method.toUpperCase(),
        url,
        ...(options.params ? { query: options.params } : {}),
        headers: redactHeaders(options.headers),
        ...(options.data === undefined ? {} : { body: options.data }),
      });

      response = await send!();

      await allure.step(`→ ${response.status()} ${response.statusText()}`, async () => {
        await describeResponse(response);
      });
    });

    return response;
  };

  const playwrightOptions = (options: ApiCallOptions) => ({
    ...(options.data === undefined ? {} : { data: options.data }),
    ...(options.headers ? { headers: options.headers } : {}),
    ...(options.params ? { params: options.params } : {}),
  });

  const shorthand =
    (method: ShorthandMethod) =>
    (url: string, options: ApiCallOptions = {}) =>
      call(method, url, options, () => request[method](url, playwrightOptions(options)));

  return {
    get: shorthand('get'),
    post: shorthand('post'),
    put: shorthand('put'),
    patch: shorthand('patch'),
    delete: shorthand('delete'),
    fetch: (url, options) =>
      call(options.method, url, options, () =>
        request.fetch(url, { method: options.method, ...playwrightOptions(options) }),
      ),
  };
}
