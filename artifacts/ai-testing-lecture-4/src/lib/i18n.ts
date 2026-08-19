/**
 * Minimal language switch for the deck. The deck is opened from the AI
 * Testing Academy site, which appends `?lang=he` or `?lang=en` to the URL
 * depending on which language the academy page is currently showing.
 * Defaults to English when the param is missing or unrecognized.
 *
 * Usage inside a slide component:
 *   import { t, isHe } from '@/lib/i18n';
 *   <h1>{t('What AI Testing Actually Means', 'מה בדיקות AI באמת אומרות')}</h1>
 */

function detectLang(): 'en' | 'he' {
  if (typeof window === 'undefined') return 'en';
  const param = new URLSearchParams(window.location.search).get('lang');
  return param === 'he' ? 'he' : 'en';
}

export const lang: 'en' | 'he' = detectLang();
export const isHe = lang === 'he';
export const dir: 'rtl' | 'ltr' = isHe ? 'rtl' : 'ltr';

/** Pick the English or Hebrew string based on the active language. */
export function t(en: string, he: string): string {
  return isHe ? he : en;
}
