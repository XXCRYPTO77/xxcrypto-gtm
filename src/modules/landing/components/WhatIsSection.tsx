'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { ArrowRight } from 'lucide-react';

export function WhatIsSection() {
  const t = useT();
  const w = t.v10.whatIs;

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{w.title}</h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">{w.desc}</p>

        {/* Flow diagram */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {w.flow.map((step: string, i: number) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-4 py-2.5 text-sm font-semibold text-brand">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </span>
              {i < w.flow.length - 1 && (
                <ArrowRight size={16} className="text-muted shrink-0" />
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm leading-relaxed text-muted max-w-2xl mx-auto text-center">
          {w.note}
        </p>
      </div>
    </section>
  );
}
