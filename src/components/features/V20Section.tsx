'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { SectionHeader } from '../primitives/SectionHeader';
import { Card } from '../primitives/Card';
import { Check } from 'lucide-react';

export function V20Section() {
  const t = useT();
  const v = t.v20;
  return (
    <section id="v20" className="relative overflow-hidden py-24 sm:py-32">
      {/* Full-width brand band */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand" />
      <div className="mx-auto max-w-7xl px-6 text-white">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-white/80">{v.version}</span>
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              CLOSED LOOP
            </span>
          </div>
          <h2 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            {v.headline}
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-white/85">{v.lede}</p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {v.pillars.map((p, i) => (
            <Card key={i} className="border-white/20 !bg-white/10 text-white">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                  <Check size={16} strokeWidth={3} />
                </span>
                <div>
                  <p className="text-sm font-bold">{p.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/80">{p.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
