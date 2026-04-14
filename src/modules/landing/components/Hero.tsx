'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Button } from '@/components/primitives/Button';
import { ArrowRight, ExternalLink } from 'lucide-react';

export function Hero() {
  const t = useT();

  const handleScrollToQuickStart = () => {
    const elem = document.getElementById('capability-matrix');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
      {/* Decorative brand-soft blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-brand-soft blur-3xl opacity-70"
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-sm font-semibold text-brand">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            {t.hero.eyebrow}
          </span>
          <h1 className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
            {t.hero.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={handleScrollToQuickStart}>
              {t.hero.primaryCta} <ArrowRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              href="https://www.coinw.com/api-doc/common/introduction"
              external
            >
              {t.hero.secondaryCta} <ExternalLink size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
