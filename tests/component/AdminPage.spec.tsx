import { test, expect } from './fixtures';

/**
 * The operator's customer screen.
 *
 * Two things here are worth a test rather than a look. The token is a server
 * secret, so it must stay in `sessionStorage` and never reach `localStorage` —
 * the same rule the site applies to a visitor's own provider key. And the
 * recommendation is a model's answer to a request for JSON, which is not a
 * schema: a reply that does not parse has to be shown as the text it is,
 * rather than dropped or rendered half-formed.
 */

const CUSTOMER = {
  id: 'c-1',
  email: 'buyer@example.com',
  purchasedAt: '2026-08-01T00:00:00Z',
  amountTotal: 5000,
  currency: 'usd',
  linkedAccount: false,
  daysSincePurchase: 11,
};

test.describe('before a token is given', () => {
  test('asks for one instead of showing an empty list', async ({ adminPage }) => {
    const component = await adminPage.mount();

    await expect(component.locator('#adminToken')).toBeVisible();
    await expect(component.locator('.admin-grid')).toHaveCount(0);
  });

  test('does not call the admin API at all', async ({ adminPage }) => {
    await adminPage.mount();

    expect(adminPage.requests()).toEqual([]);
  });
});

test.describe('with a token', () => {
  test('lists the purchases it was given', async ({ adminPage }) => {
    const component = await adminPage.mount({ customers: [CUSTOMER] });

    await adminPage.connect('secret-token');

    await expect(component.locator('.admin-customer-email')).toHaveText(CUSTOMER.email);
    await expect(component.getByText('Bought 11 days ago')).toBeVisible();
  });

  test('keeps the token for the tab only, never on the device', async ({ adminPage, page }) => {
    await adminPage.mount({ customers: [CUSTOMER] });

    await adminPage.connect('secret-token');

    const stored = await page.evaluate(() => ({
      session: sessionStorage.getItem('ata_admin_token'),
      local: localStorage.getItem('ata_admin_token'),
    }));
    expect(stored.session).toBe('secret-token');
    expect(stored.local).toBeNull();
  });

  test('sends it as a bearer token rather than in the URL', async ({ adminPage }) => {
    await adminPage.mount({ customers: [CUSTOMER] });

    await adminPage.connect('secret-token');

    const [request] = adminPage.requests();
    expect(request.authorization).toBe('Bearer secret-token');
    expect(request.url).not.toContain('secret-token');
  });

  test('a refused token says so, rather than showing nothing', async ({ adminPage }) => {
    const component = await adminPage.mount({ status: 401 });

    await adminPage.connect('wrong');

    await expect(component.getByRole('alert')).toContainText('refused');
  });

  test('forgetting the token clears it from storage', async ({ adminPage, page }) => {
    const component = await adminPage.mount({ customers: [CUSTOMER] });
    await adminPage.connect('secret-token');

    await component.locator('.admin-disconnect').click();

    expect(await page.evaluate(() => sessionStorage.getItem('ata_admin_token'))).toBeNull();
    await expect(component.locator('#adminToken')).toBeVisible();
  });
});

test.describe('recommendations', () => {
  test('render as a priority list when the model returns the shape asked for', async ({
    adminPage,
  }) => {
    const component = await adminPage.mount({
      customers: [CUSTOMER],
      recommendation: JSON.stringify({
        actions: [{ action: 'Send a welcome email', why: 'Never signed in', priority: 'high' }],
      }),
    });
    await adminPage.connect('secret-token');

    await component.locator('.admin-recommend').click();

    await expect(component.locator('.admin-actions li')).toHaveCount(1);
    await expect(component.getByText('Send a welcome email')).toBeVisible();
    await expect(component.locator('.admin-priority-high')).toHaveText('High');
  });

  test('a reply that is not JSON is shown as the text it is', async ({ adminPage }) => {
    // Dropping it would look like the request silently failed, and rendering it
    // half-parsed would be worse than either.
    const component = await adminPage.mount({
      customers: [CUSTOMER],
      recommendation: 'I could not produce JSON for this one.',
    });
    await adminPage.connect('secret-token');

    await component.locator('.admin-recommend').click();

    await expect(component.locator('.admin-raw')).toContainText('could not produce JSON');
    await expect(component.locator('.admin-actions')).toHaveCount(0);
  });

  test('a busy AI service says to try again rather than blaming the token', async ({
    adminPage,
  }) => {
    const component = await adminPage.mount({ customers: [CUSTOMER], recommendStatus: 429 });
    await adminPage.connect('secret-token');

    await component.locator('.admin-recommend').click();

    await expect(component.locator('.admin-customer .error')).toContainText('busy');
  });
});
