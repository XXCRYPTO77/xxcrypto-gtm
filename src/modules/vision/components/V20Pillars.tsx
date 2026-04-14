'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Check, ArrowRight } from 'lucide-react';

export function V20Pillars() {
  const t = useT();
  const v = t.v20;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Full-width brand band */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand" />
      <div className="mx-auto max-w-7xl px-6 text-white">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-white/80">{v.version}</span>
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              CLOSED LOOP
            </span>
          </div>
          <h2 className="max-w-4xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {v.headline}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">{v.lede}</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {v.pillars.map((p: { title: string; desc: string }, i: number) => {
            // First two: achieved/planned (check), last two: future (arrow)
            const isAchieved = i < 2;
            const Icon = isAchieved ? Check : ArrowRight;

            return (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    isAchieved ? 'bg-white text-brand' : 'bg-white/20 text-white'
                  }`}>
                    <Icon size={16} strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{p.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/80">{p.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
