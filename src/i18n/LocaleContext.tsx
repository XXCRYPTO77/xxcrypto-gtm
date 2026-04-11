'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Dict, Locale } from './types';
import zh from './zh.json';
import en from './en.json';

const DICTS: Record<Locale, Dict> = {
  zh: zh as unknown as Dict,
  en: en as unknown as Dict,
};

interface LocaleCtx {
  locale: Locale;
  t: Dict;
  setLocale: (l: Locale) => void;
}

const Ctx = createContext<LocaleCtx | null>(null);

const STORAGE_KEY = 'cwc-locale';

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === 'zh' || saved === 'en') {
        setLocaleState(saved);
        document.documentElement.lang = saved;
        return;
      }
      const browser = navigator.language.startsWith('zh') ? 'zh' : 'en';
      setLocaleState(browser);
      document.documentElement.lang = browser;
    } catch {
      /* noop */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {
      /* noop */
    }
  }, []);

  return (
    <Ctx.Provider value={{ locale, t: DICTS[locale], setLocale }}>
      {children}
    </Ctx.Provider>
  );
}

export function useT(): Dict {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useT must be used inside <LocaleProvider>');
  return ctx.t;
}

export function useLocale(): { locale: Locale; setLocale: (l: Locale) => void } {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return { locale: ctx.locale, setLocale: ctx.setLocale };
}
