'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { SectionHeader } from '../primitives/SectionHeader';
import { Card } from '../primitives/Card';
import { Wallet, ShieldAlert, MessageSquare, Check } from 'lucide-react';

type DeepBKey = 'v12' | 'v13' | 'v14';

const ICONS: Record<DeepBKey, React.ReactNode> = {
  v12: <Wallet size={28} />,
  v13: <ShieldAlert size={28} />,
  v14: <MessageSquare size={28} />,
};

function DeepBCard({ k }: { k: DeepBKey }) {
  const t = useT();
  const v = t[k];
  return (
    <Card variant="elevated" className="flex h-full flex-col gap-5" id={k}>
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
          {ICONS[k]}
        </span>
        <span className="font-mono text-xs font-bold text-brand">{v.depth}</span>
      </div>
      <div>
        <p className="font-mono text-xs font-bold text-brand">{v.version}</p>
        <h3 className="mt-2 text-2xl font-bold leading-snug text-ink">{v.headline}</h3>
      </div>
      <p className="text-sm leading-relaxed text-muted">{v.lede}</p>
      <ul className="mt-auto space-y-2 border-t border-border pt-4">
        {v.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-ink">
            <Check size={14} className="mt-1 shrink-0 text-brand" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function DeepBSection() {
  const t = useT();
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeader
        eyebrow="DEEP B · v1.2 — v1.4"
        title={t.nav.acts.act2}
        lede={t.acts.act2.desc}
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        <DeepBCard k="v12" />
        <DeepBCard k="v13" />
        <DeepBCard k="v14" />
      </div>
    </section>
  );
}
