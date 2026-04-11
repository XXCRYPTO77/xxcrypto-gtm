'use client';

import { useT } from '@/i18n/LocaleContext';

export default function Home() {
  const t = useT();

  return (
    <main className="min-h-screen bg-page text-ink">
      {/* Phase 0 scaffold — section placeholders only.
          Real components arrive in Phase 1/2. */}
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm uppercase tracking-widest text-brand">{t.hero.eyebrow}</p>
        <h1 className="mt-4 text-5xl font-bold leading-tight">{t.hero.title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{t.hero.subtitle}</p>
        <p className="mt-12 text-xs text-muted">
          {t.common.wip}
        </p>
      </div>
    </main>
  );
}
