import { test, expect } from '../support/test';
import { allure } from 'allure-playwright';
import {
  readOneOf,
  readRaw,
  readText,
  readValidated,
  removeRaw,
  writeRaw,
  writeValidated,
} from '@academy/lib/storage';

/**
 * The rules every browser-storage read on the site now goes through.
 *
 * Two independent hazards, and each function has to survive both. Storage can
 * be unavailable — private browsing, a blocked-cookies setting, a full quota —
 * and the DOM API throws rather than returning null when it is, which in a
 * module-scope initialiser takes the page down before it renders. And the
 * contents are editable by anyone with a console, so what comes back is input,
 * not state.
 *
 * These functions take the `Storage` to use as a parameter, which is what lets
 * the unavailable case be tested at all: there is no way to make a real
 * `localStorage` throw on demand.
 */

test.beforeEach(async () => {
  await allure.layer('unit');
  await allure.feature('Browser storage');
});

/** A working storage, seeded with whatever the test needs. */
function fakeStorage(seed: Record<string, string> = {}): Storage {
  const map = new Map(Object.entries(seed));
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => void map.set(key, value),
    removeItem: (key: string) => void map.delete(key),
    clear: () => map.clear(),
    key: (index: number) => [...map.keys()][index] ?? null,
    get length() {
      return map.size;
    },
  } as Storage;
}

/** A storage that refuses everything, the way a denied one does. */
function deniedStorage(): Storage {
  const refuse = () => {
    throw new DOMException('The operation is insecure.', 'SecurityError');
  };
  return {
    getItem: refuse,
    setItem: refuse,
    removeItem: refuse,
    clear: refuse,
    key: refuse,
    get length(): number {
      return refuse();
    },
  } as unknown as Storage;
}

test.describe('when storage is denied', () => {
  test('a read is an absent value, not a thrown one', () => {
    expect(readRaw(deniedStorage(), 'anything')).toBeNull();
  });

  test('a write is a no-op, not a thrown one', () => {
    expect(() => writeRaw(deniedStorage(), 'k', 'v')).not.toThrow();
    expect(() => removeRaw(deniedStorage(), 'k')).not.toThrow();
    expect(() => writeValidated(deniedStorage(), 'k', { a: 1 })).not.toThrow();
  });

  test('every typed read falls back to its default', () => {
    const denied = deniedStorage();
    expect(readOneOf(denied, 'theme', ['light', 'dark'])).toBeNull();
    expect(readText(denied, 'draft', 100)).toBe('');
    expect(readValidated(denied, 'progress', () => ({ ok: true }))).toBeNull();
  });
});

test.describe('readOneOf', () => {
  test('returns a value from the allowed set', () => {
    expect(readOneOf(fakeStorage({ theme: 'dark' }), 'theme', ['light', 'dark'])).toBe('dark');
  });

  test('rejects anything else', () => {
    // This is the theme bug in one line: without the check, this string is what
    // ends up on `data-theme`, with no way back but clearing site data.
    const tampered = fakeStorage({ theme: 'x" onload="alert(1)' });
    expect(readOneOf(tampered, 'theme', ['light', 'dark'])).toBeNull();
  });

  test('rejects an absent key', () => {
    expect(readOneOf(fakeStorage(), 'theme', ['light', 'dark'])).toBeNull();
  });
});

test.describe('readText', () => {
  test('caps what it hands back', () => {
    const stored = fakeStorage({ draft: 'x'.repeat(5_000) });
    expect(readText(stored, 'draft', 100)).toHaveLength(100);
  });

  test('is the empty string when nothing is stored', () => {
    expect(readText(fakeStorage(), 'draft', 100)).toBe('');
  });
});

test.describe('readValidated', () => {
  const acceptCount = (parsed: unknown): { count: number } | null =>
    typeof parsed === 'object' &&
    parsed !== null &&
    typeof (parsed as { count?: unknown }).count === 'number'
      ? { count: (parsed as { count: number }).count }
      : null;

  test('hands back what the validator accepts', () => {
    const stored = fakeStorage({ progress: JSON.stringify({ count: 3 }) });
    expect(readValidated(stored, 'progress', acceptCount)).toEqual({ count: 3 });
  });

  test('returns null for malformed JSON rather than throwing', () => {
    const stored = fakeStorage({ progress: '{not json' });
    expect(readValidated(stored, 'progress', acceptCount)).toBeNull();
  });

  test('returns null when the validator refuses', () => {
    const stored = fakeStorage({ progress: JSON.stringify({ count: 'three' }) });
    expect(readValidated(stored, 'progress', acceptCount)).toBeNull();
  });

  test('round-trips through writeValidated', () => {
    const stored = fakeStorage();
    writeValidated(stored, 'progress', { count: 7 });
    expect(readValidated(stored, 'progress', acceptCount)).toEqual({ count: 7 });
  });
});
