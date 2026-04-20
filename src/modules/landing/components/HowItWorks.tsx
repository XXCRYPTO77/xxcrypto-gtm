'use client';

import React from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { Eye, Crosshair, Dna } from 'lucide-react';

const STAGE_ICONS = [Eye, Crosshair, Dna];
const STAGE_COLORS = [
  'from-blue-500 to-cyan-400',
  'from-brand to-brand-med',
  'from-emerald-500 to-teal-400',
];

export function HowItWorks() {
  const t = useLandingT();

  return (
    <section className="relative py-24 sm:py-32">
      {/* Subtle divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            {t.howItWorks.title}
          </h2>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Three stages */}
        <div className="grid gap-8 md:grid-cols-3">
          {t.howItWorks.stages.map((stage, i) => {
            const Icon = STAGE_ICONS[i];
            return (
              <div
                key={stage.tag}
                className="cw-card-interactive group relative flex flex-col rounded-2xl border border-border bg-page p-8"
              >
                {/* Stage number + icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${STAGE_COLORS[i]} text-white`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <span className="block text-xs font-mono font-bold uppercase tracking-widest text-muted">
                      Stage {i + 1}
                    </span>
                    <span className="block text-lg font-bold text-ink">
                      {stage.title}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted flex-1">
                  {stage.desc}
                </p>

                {/* Bottom tag */}
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="text-xs font-mono font-semibold text-brand uppercase tracking-wider">
                    {stage.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connecting line (desktop) */}
        <div className="hidden md:block relative mt-6">
          <div className="absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-blue-400 via-brand to-emerald-400 opacity-30" />
        </div>
      </div>
    </section>
  );
}
