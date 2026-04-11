'use client';

import React from 'react';
import { useLocale } from '@/i18n/LocaleContext';

export function LangToggle() {
  const { locale, setLocale } = useLocale();
  const next = locale === 'zh' ? 'en' : 'zh';
  const label = locale === 'zh' ? 'EN' : '中';

  return (
    <button
      onClick={() => setLocale(next)}
      className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-page px-3 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      aria-label="Toggle language"
    >
      {label}
    </button>
  );
}
