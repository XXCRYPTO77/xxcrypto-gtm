'use client';

import React from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { Check } from 'lucide-react';

export function WhyAgentX() {
  const t = useLandingT();

  return (
    <section className="relative py-24 sm:py-32">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow */}
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-brand mb-4">
            {t.whyAgentX.eyebrow}
          </span>

          {/* Title */}
          <h2 className="text-4xl font-black text-ink sm:text-5xl mb-6">
            {t.whyAgentX.title}
          </h2>

          {/* Description */}
          <p className="text-lg leading-relaxed text-muted mb-10 max-w-3xl">
            {t.whyAgentX.desc}
          </p>

          {/* Points */}
          <div className="grid gap-4 sm:grid-cols-2">
            {t.whyAgentX.points.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-page p-5 transition-colors hover:border-brand/20"
              >
                <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-brand-soft flex items-center justify-center">
                  <Check size={14} className="text-brand" />
                </div>
                <span className="text-sm leading-relaxed text-ink font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
