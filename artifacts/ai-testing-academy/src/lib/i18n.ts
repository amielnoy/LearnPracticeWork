import { en, he } from './locales';
import type { Locale } from './locales';
import { readOneOf, writeRaw } from './storage';

const CATALOG: Record<string, Locale> = { en, he };
const LANGS = ['en', 'he'] as const;
const LANG_KEY = 'ata_lang';

export function resolveLang(): string {
  const params = new URLSearchParams(window.location.search);
  // The query parameter is checked against the catalogue for the same reason
  // the stored value is: both arrive from outside.
  const requested = params.get('lang');
  const lang =
    (requested && CATALOG[requested] ? requested : null) ||
    readOneOf(localStorage, LANG_KEY, LANGS) ||
    ((navigator.language || 'en').toLowerCase().indexOf('he') === 0 ? 'he' : 'en');
  writeRaw(localStorage, LANG_KEY, lang);
  return lang;
}

export function getLocale(lang: string): Locale {
  return CATALOG[lang] ?? CATALOG.en;
}

export function switchLang(currentLang: string): void {
  const next = currentLang === 'he' ? 'en' : 'he';
  writeRaw(localStorage, LANG_KEY, next);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', next);
  window.location.href = url.toString();
}

export function applyHtmlAttrs(lang: string, dir: string): void {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = dir;
}
