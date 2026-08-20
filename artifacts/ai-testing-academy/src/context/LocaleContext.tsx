import React, { createContext, useContext, useEffect, useMemo } from 'react';
import type { Locale } from '../lib/locales';
import { resolveLang, getLocale, switchLang, applyHtmlAttrs } from '../lib/i18n';

interface LocaleContextValue {
  lang: string;
  locale: Locale;
  S: Locale['s'];
  switchLang: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const lang = useMemo(() => resolveLang(), []);
  const locale = useMemo(() => getLocale(lang), [lang]);

  // Keep <html lang>/<html dir> in step with the resolved locale.
  //
  // This was a useMemo whose value was thrown away. React is explicitly allowed
  // to discard a memoised value and recompute it, so that made the write run on
  // a schedule React does not promise — it happened to be harmless only because
  // the inline script in index.html has already set both attributes correctly
  // before this ever runs. An effect is the hook that actually promises to run.
  useEffect(() => {
    applyHtmlAttrs(lang, locale.dir);
  }, [lang, locale.dir]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      lang,
      locale,
      S: locale.s,
      switchLang: () => switchLang(lang),
    }),
    [lang, locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
