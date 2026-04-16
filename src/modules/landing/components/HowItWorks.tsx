'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { Eye, Crosshair, Dna } from 'lucide-react';

const STAGE_ICONS = [Eye, Crosshair, Dna];
const STAGE_COLORS = [
  'from-blue-500 to-cyan-400',
  'from-brand to-brand-med',
  'from-emerald-500 to-teal-400',
];
const ACCENT_BORDERS = [
  'border-l-blue-500',
  'border-l-brand',
  'border-l-emerald-500',
];

export function HowItWorks() {
  const t = useLandingT();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32">
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

        {/* Three stages with connection */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0 px-[16.67%]">
            <div className="h-0.5 bg-gradient-to-r from-blue-500 via-brand to-emerald-500 rounded-full opacity-30" />
            {/* Dots on connection line */}
            <div className="absolute top-1/2 left-[16.67%] -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)]" />
            <div className="absolute top-1/2 right-[16.67%] -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>

          {/* Mobile vertical line */}
          <div className="md:hidden absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-blue-500 via-brand to-emerald-500 opacity-30" />

          <div className="grid gap-8 md:grid-cols-3 relative z-10">
            {t.howItWorks.stages.map((stage, i) => {
              const Icon = STAGE_ICONS[i];
              return (
                <div
                  key={stage.tag}
                  className={`group relative flex flex-col rounded-2xl border border-border border-l-4 ${ACCENT_BORDERS[i]} bg-page p-8 transition-all duration-500 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-0.5 ml-8 md:ml-0 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Mobile dot on vertical line */}
                  <div className={`md:hidden absolute -left-[calc(2rem+3px)] top-8 w-3 h-3 rounded-full ${
                    i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-brand' : 'bg-emerald-500'
                  }`} />

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
        </div>
      </div>
    </section>
  );
}
