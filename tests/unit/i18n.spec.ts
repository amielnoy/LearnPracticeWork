import { test, expect } from '@playwright/test';
import { resolveLang, getLocale, switchLang, applyHtmlAttrs } from '@academy/lib/i18n';
import { installFakeBrowser, type FakeBrowser } from '../support/fakeBrowser';

/**
 * Language resolution is the first thing that runs on every page load, and it
 * reads three sources in priority order: the `?lang=` query, the persisted
 * choice, then the browser's own language.
 */

let browser: FakeBrowser;

test.afterEach(() => {
  browser?.restore();
});

test.describe('resolveLang', () => {
  test('prefers the query string over everything else', () => {
    browser = installFakeBrowser({
      url: 'https://academy.test/?lang=he',
      language: 'en-US',
      storage: { ata_lang: 'en' },
    });

    expect(resolveLang()).toBe('he');
  });

  test('falls back to the persisted choice when there is no query string', () => {
    browser = installFakeBrowser({
      url: 'https://academy.test/',
      language: 'en-US',
      storage: { ata_lang: 'he' },
    });

    expect(resolveLang()).toBe('he');
  });

  test('falls back to a Hebrew browser locale', () => {
    browser = installFakeBrowser({ url: 'https://academy.test/', language: 'he-IL' });
    expect(resolveLang()).toBe('he');
  });

  test('defaults to English for any other browser locale', () => {
    browser = installFakeBrowser({ url: 'https://academy.test/', language: 'fr-FR' });
    expect(resolveLang()).toBe('en');
  });

  test('ignores a language it has no catalog for', () => {
    browser = installFakeBrowser({ url: 'https://academy.test/?lang=klingon' });
    expect(resolveLang()).toBe('en');
  });

  test('persists whatever it resolved', () => {
    browser = installFakeBrowser({ url: 'https://academy.test/?lang=he' });

    resolveLang();

    expect(browser.storage.get('ata_lang')).toBe('he');
  });

  test('persists the fallback, not the unknown language it was asked for', () => {
    browser = installFakeBrowser({ url: 'https://academy.test/?lang=klingon' });

    resolveLang();

    expect(browser.storage.get('ata_lang')).toBe('en');
  });
});

test.describe('getLocale', () => {
  test('returns the requested catalog', () => {
    expect(getLocale('he').lang).toBe('he');
    expect(getLocale('he').dir).toBe('rtl');
  });

  test('returns a left-to-right English catalog by default', () => {
    expect(getLocale('en').dir).toBe('ltr');
  });

  test('falls back to English for an unknown language', () => {
    expect(getLocale('klingon').lang).toBe('en');
  });

  test('exposes the same string keys in both catalogs', () => {
    expect(Object.keys(getLocale('he').s).sort()).toEqual(
      Object.keys(getLocale('en').s).sort(),
    );
  });
});

test.describe('switchLang', () => {
  test('toggles English to Hebrew and navigates', () => {
    browser = installFakeBrowser({ url: 'https://academy.test/page?a=1' });

    switchLang('en');

    expect(browser.storage.get('ata_lang')).toBe('he');
    expect(new URL(browser.location.href).searchParams.get('lang')).toBe('he');
    expect(new URL(browser.location.href).searchParams.get('a')).toBe('1');
  });

  test('toggles Hebrew back to English', () => {
    browser = installFakeBrowser({ url: 'https://academy.test/?lang=he' });

    switchLang('he');

    expect(browser.storage.get('ata_lang')).toBe('en');
    expect(new URL(browser.location.href).searchParams.get('lang')).toBe('en');
  });

  test('replaces an existing lang parameter rather than appending one', () => {
    browser = installFakeBrowser({ url: 'https://academy.test/?lang=en' });

    switchLang('en');

    expect(browser.location.href.match(/lang=/g)).toHaveLength(1);
  });
});

test.describe('applyHtmlAttrs', () => {
  test('writes the language and direction onto the root element', () => {
    browser = installFakeBrowser();

    applyHtmlAttrs('he', 'rtl');

    expect(browser.documentElement.lang).toBe('he');
    expect(browser.documentElement.dir).toBe('rtl');
  });
});
