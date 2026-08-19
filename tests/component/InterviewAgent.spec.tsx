import { test, expect } from '@playwright/experimental-ct-react';
import type { Page } from '@playwright/test';
import { LocaleProvider } from '@academy/context/LocaleContext';
import { ProgressProvider } from '@academy/context/ProgressContext';
import { ProviderContextProvider } from '@academy/context/ProviderContext';
import { InterviewAgent } from '@academy/components/InterviewAgent';

/**
 * What the interview restores from storage, and what it refuses to.
 *
 * A transcript is every answer someone gave about their own career, so where it
 * lives and how long it lives there is the behaviour worth pinning — not an
 * implementation detail. Two properties: it survives a reload within the
 * session, and it does not survive the session. A third follows from the first
 * two being about untrusted input: a tampered entry has to be discarded rather
 * than rendered, because `text` becomes a child node and `cls` becomes a class
 * name.
 *
 * The storage is seeded before mounting, because `loadInterview` runs in a
 * `useState` initialiser — which is exactly when a real reload would run it.
 */

const KEY = 'ata_interview_session_v1';

const SAVED = {
  lang: 'en',
  interviewOn: true,
  messages: [
    { cls: 'ai', text: 'Tell me about a bug you are proud of finding.' },
    { cls: 'user', text: 'A race condition in a payment retry.' },
  ],
  chat: [
    { role: 'user', content: 'ready' },
    { role: 'assistant', content: 'Tell me about a bug you are proud of finding.' },
  ],
};

function harness() {
  return (
    <LocaleProvider>
      <ProgressProvider>
        <ProviderContextProvider>
          <InterviewAgent />
        </ProviderContextProvider>
      </ProgressProvider>
    </LocaleProvider>
  );
}

async function seed(page: Page, where: 'local' | 'session', value: unknown) {
  await page.route('**/api/ai/config', route => route.fulfill({ json: { gemini: {} } }));
  await page.evaluate(
    ([target, key, json]) => {
      const store = target === 'local' ? localStorage : sessionStorage;
      store.setItem(key as string, json as string);
    },
    [where, KEY, JSON.stringify(value)] as const,
  );
}

const read = (page: Page, where: 'local' | 'session') =>
  page.evaluate(
    ([target, key]) => (target === 'local' ? localStorage : sessionStorage).getItem(key as string),
    [where, KEY] as const,
  );

test.describe('a transcript saved in this session', () => {
  test('is restored, so a reload does not lose the interview', async ({ mount, page }) => {
    await seed(page, 'session', SAVED);
    const component = await mount(harness());

    await expect(component.locator('.msg')).toHaveCount(2);
    await expect(component.getByText('A race condition in a payment retry.')).toBeVisible();
  });

  test('is ignored when it was saved in the other language', async ({ mount, page }) => {
    // Resuming an English interview inside a Hebrew page would leave the model
    // holding one conversation and the reader looking at another.
    await seed(page, 'session', { ...SAVED, lang: 'he' });
    const component = await mount(harness());

    await expect(component.locator('.msg.ai, .msg.user')).toHaveCount(0);
  });
});

test.describe('a transcript left behind by the old version', () => {
  test('is not restored from localStorage', async ({ mount, page }) => {
    await seed(page, 'local', SAVED);
    const component = await mount(harness());

    await expect(component.locator('.msg.ai, .msg.user')).toHaveCount(0);
  });

  test('is deleted rather than migrated', async ({ mount, page }) => {
    // Moving it into the session would carry the problem forward one visit.
    // Deleting it is what ends it.
    await seed(page, 'local', SAVED);
    await mount(harness());

    expect(await read(page, 'local')).toBeNull();
    expect(await read(page, 'session')).toBeNull();
  });
});

test.describe('a tampered transcript', () => {
  test('does not crash the mount when a message is not text', async ({ mount, page }) => {
    // Rendered as a child node, so an object here used to be a render crash on
    // load — recoverable only by clearing site data.
    await seed(page, 'session', {
      ...SAVED,
      messages: [{ cls: 'ai', text: { nested: 'object' } }],
    });
    const component = await mount(harness());

    await expect(component).toBeVisible();
    await expect(component.locator('.msg.ai, .msg.user')).toHaveCount(0);
  });

  test('drops an entry whose class is not one of the two', async ({ mount, page }) => {
    await seed(page, 'session', {
      ...SAVED,
      messages: [
        { cls: 'ai', text: 'kept' },
        { cls: 'x" onload="alert(1)', text: 'dropped' },
      ],
    });
    const component = await mount(harness());

    await expect(component.locator('.msg.ai, .msg.user')).toHaveCount(1);
    await expect(component.getByText('kept')).toBeVisible();
    await expect(component.getByText('dropped')).toHaveCount(0);
  });

  test('survives a stored value that is not JSON at all', async ({ mount, page }) => {
    await page.route('**/api/ai/config', route => route.fulfill({ json: { gemini: {} } }));
    await page.evaluate(key => sessionStorage.setItem(key, '{ not json'), KEY);
    const component = await mount(harness());

    await expect(component).toBeVisible();
  });
});
