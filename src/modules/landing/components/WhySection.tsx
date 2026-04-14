'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Sparkles, Brain, ShieldCheck } from 'lucide-react';

const ICONS = [Sparkles, Brain, ShieldCheck];

export function WhySection() {
  const t = useT();
  const w = t.v10.why;

  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{w.title}</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {w.items.map((item: { tag: string; title: string; desc: string }, i: number) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon size={20} />
                  </span>
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
