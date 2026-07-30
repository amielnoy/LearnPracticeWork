import { en, he } from './locales';
import type { Locale } from './locales';

const CATALOG: Record<string, Locale> = { en, he };
const LANG_KEY = 'ata_lang';

export function resolveLang(): string {
  const params = new URLSearchParams(window.location.search);
  let lang =
    params.get('lang') ||
    localStorage.getItem(LANG_KEY) ||
    ((navigator.language || 'en').toLowerCase().indexOf('he') === 0 ? 'he' : 'en');
  if (!CATALOG[lang]) lang = 'en';
  localStorage.setItem(LANG_KEY, lang);
  return lang;
}

export function getLocale(lang: string): Locale {
  return CATALOG[lang] ?? CATALOG.en;
}

export function switchLang(currentLang: string): void {
  const next = currentLang === 'he' ? 'en' : 'he';
  localStorage.setItem(LANG_KEY, next);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', next);
  window.location.href = url.toString();
}

export function applyHtmlAttrs(lang: string, dir: string): void {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = dir;
}
