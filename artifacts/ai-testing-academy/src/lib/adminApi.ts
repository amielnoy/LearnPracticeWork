/**
 * The operator-only API, reduced to the two calls the admin screen makes.
 *
 * The admin token is a server secret, so it is held in `sessionStorage` and
 * never in `localStorage` — the same rule the site already applies to a
 * visitor's own provider key, and for the same reason: it should not outlive
 * the tab it was typed into.
 */
import { readText, removeRaw, writeRaw } from './storage';

const TOKEN_KEY = 'ata_admin_token';
const MAX_TOKEN_LENGTH = 400;

export interface Customer {
  id: string;
  email: string;
  purchasedAt: string;
  amountTotal: number;
  currency: string;
  linkedAccount: boolean;
  daysSincePurchase: number;
}

export interface Recommendation {
  customerId: string;
  text: string;
}

export function readAdminToken(): string {
  return readText(sessionStorage, TOKEN_KEY, MAX_TOKEN_LENGTH);
}

export function rememberAdminToken(token: string): void {
  writeRaw(sessionStorage, TOKEN_KEY, token);
}

export function forgetAdminToken(): void {
  removeRaw(sessionStorage, TOKEN_KEY);
}

/** The reasons a call can fail, separated because each needs a different answer. */
export type AdminFailure = 'unauthorised' | 'unavailable' | 'failed';

export class AdminError extends Error {
  constructor(readonly reason: AdminFailure) {
    super(reason);
  }
}

function failureFor(status: number): AdminFailure {
  // 404 is what an unconfigured server answers rather than admitting the route
  // exists, so it means the same thing to the operator as a rejected token.
  if (status === 401 || status === 404) return 'unauthorised';
  if (status === 429 || status >= 500) return 'unavailable';
  return 'failed';
}

async function call<T>(path: string, token: string, method: 'GET' | 'POST'): Promise<T> {
  const response = await fetch(path, {
    method,
    headers: { authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new AdminError(failureFor(response.status));
  return (await response.json()) as T;
}

export async function fetchCustomers(token: string): Promise<Customer[]> {
  const body = await call<{ customers?: Customer[] }>('/api/admin/customers', token, 'GET');
  return body.customers ?? [];
}

export async function fetchRecommendations(
  token: string,
  customerId: string,
  lang: string,
): Promise<Recommendation> {
  // The operator reads this screen in whichever language the academy is
  // showing, so the advice has to come back in that language too.
  return call<Recommendation>(
    `/api/admin/customers/${encodeURIComponent(customerId)}/recommendations?lang=${encodeURIComponent(lang)}`,
    token,
    'POST',
  );
}

/**
 * The model is asked for JSON, but a model is not a schema. Anything that does
 * not parse into the expected shape is shown as the text it is, rather than
 * being dropped or half-rendered.
 */
export interface Action {
  action: string;
  why: string;
  priority: 'high' | 'medium' | 'low';
}

export function readActions(text: string): Action[] | null {
  try {
    const parsed = JSON.parse(text) as { actions?: unknown };
    if (!Array.isArray(parsed.actions)) return null;
    const actions = parsed.actions.filter(
      (entry): entry is Action =>
        typeof entry === 'object' &&
        entry !== null &&
        typeof (entry as Action).action === 'string' &&
        typeof (entry as Action).why === 'string',
    );
    return actions.length ? actions : null;
  } catch {
    return null;
  }
}
