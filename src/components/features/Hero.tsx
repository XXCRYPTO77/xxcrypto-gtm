'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Button } from '../primitives/Button';
import { ArrowRight, ArrowDown } from 'lucide-react';

export function Hero() {
  const t = useT();
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Decorative brand-soft blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-brand-soft blur-3xl opacity-70"
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start gap-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-sm font-semibold text-brand">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            {t.hero.eyebrow}
          </span>
          <h1 className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
            {t.hero.title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
            {t.hero.subtitle}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Button size="lg" href="#v10">
              {t.hero.primaryCta} <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="ghost" href="#security">
              {t.hero.secondaryCta} <ArrowDown size={18} />
            </Button>
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
            {t.hero.roadmapNote}
          </p>
        </div>
      </div>
    </section>
  );
}
