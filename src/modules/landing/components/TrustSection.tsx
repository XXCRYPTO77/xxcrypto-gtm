'use client';

import React from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { Lock, Shield, ScrollText } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  lock: Lock,
  shield: Shield,
  scroll: ScrollText,
};

export function TrustSection() {
  const t = useLandingT();
  const trust = (t as any).trust;
  if (!trust) return null;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-ink text-center sm:text-4xl mb-12">
          {trust.title}
        </h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {trust.cards.map((card: { icon: string; title: string; desc: string }) => {
            const Icon = ICON_MAP[card.icon] || Lock;
            return (
              <div
                key={card.icon}
                className="flex flex-col items-center text-center rounded-2xl border border-border bg-page p-8 transition-all duration-200 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-soft text-brand mb-5">
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
