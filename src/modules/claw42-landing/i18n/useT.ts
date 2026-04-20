'use client';

import { useContext, createContext, useState, useEffect, useCallback } from 'react';
import zh from './zh.json';
import en from './en.json';

export type Claw42Locale = 'zh' | 'en';
export type Claw42Dict = typeof zh;

const DICTS: Record<Claw42Locale, Claw42Dict> = {
  zh: zh as Claw42Dict,
  en: en as Claw42Dict,
};

const STORAGE_KEY = 'claw42-locale';

interface Ctx {
  locale: Claw42Locale;
  t: Claw42Dict;
  setLocale: (l: Claw42Locale) => void;
}

export const Claw42LocaleCtx = createContext<Ctx | null>(null);

export function useClaw42LocaleState() {
  const [locale, setLocaleState] = useState<Claw42Locale>('zh');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Claw42Locale | null;
      if (saved === 'zh' || saved === 'en') {
        setLocaleState(saved);
        return;
      }
      const browser: Claw42Locale = navigator.language.startsWith('zh') ? 'zh' : 'en';
      setLocaleState(browser);
    } catch { /* noop */ }
  }, []);

  const setLocale = useCallback((l: Claw42Locale) => {
    setLocaleState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch { /* noop */ }
  }, []);

  return { locale, setLocale, t: DICTS[locale] };
}

export function useT(): Claw42Dict {
  const ctx = useContext(Claw42LocaleCtx);
  if (!ctx) throw new Error('useT must be used inside <Claw42LocaleProvider>');
  return ctx.t;
}

export function useClaw42Locale(): { locale: Claw42Locale; setLocale: (l: Claw42Locale) => void } {
  const ctx = useContext(Claw42LocaleCtx);
  if (!ctx) throw new Error('useClaw42Locale must be used inside <Claw42LocaleProvider>');
  return { locale: ctx.locale, setLocale: ctx.setLocale };
}
