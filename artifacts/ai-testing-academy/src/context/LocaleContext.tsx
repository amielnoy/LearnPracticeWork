import React, { createContext, useContext, useMemo } from 'react';
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

  // Apply HTML attributes immediately
  useMemo(() => {
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
