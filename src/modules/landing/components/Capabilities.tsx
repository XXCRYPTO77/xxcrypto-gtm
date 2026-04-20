'use client';

import React from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { Brain, Zap, Dna } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  brain: Brain,
  zap: Zap,
  dna: Dna,
};

export function Capabilities() {
  const t = useLandingT();

  return (
    <section className="relative py-24 sm:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <h2 className="text-3xl font-bold text-ink text-center sm:text-4xl mb-16">
          {t.capabilities.title}
        </h2>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {t.capabilities.cards.map((card) => {
            const Icon = ICON_MAP[card.icon] || Brain;
            return (
              <div
                key={card.icon}
                className="cw-card-interactive group relative overflow-hidden rounded-2xl border border-border bg-page p-8"
              >
                {/* Stat highlight */}
                <div className="flex items-end justify-between mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-soft text-brand">
                    <Icon size={28} />
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-black text-ink">{card.stat}</span>
                    <span className="block text-xs text-muted font-medium">{card.statLabel}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-ink mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted">
                  {card.desc}
                </p>

                {/* Decorative gradient corner */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-brand/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
