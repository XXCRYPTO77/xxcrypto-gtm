'use client';

import React from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { HeroBackdrop } from '@/shared/ui/HeroBackdrop';
import { ArrowRight, ExternalLink } from 'lucide-react';

export function Hero() {
  const t = useLandingT();

  return (
    <section className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
      <HeroBackdrop variant="intense" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center gap-7">
          {/* Eyebrow badge */}
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide"
            style={{
              borderColor: 'rgba(108,79,255,0.3)',
              background: 'rgba(108,79,255,0.08)',
              color: '#b8a6ff',
            }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6c4fff] animate-pulse" />
            {t.hero.eyebrow}
          </span>

          {/* Title — Overview-scale gradient */}
          <h1
            className="font-black tracking-tight leading-[1.03]"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)' }}
          >
            <span className="cw-title-gradient">{t.hero.title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl font-semibold text-[#b8a6ff] sm:text-3xl">
            {t.hero.subtitle}
          </p>

          {/* Description */}
          <p className="max-w-2xl text-lg leading-relaxed text-white/60">
            {t.hero.desc}
          </p>

          {/* CTAs — Overview-style lime primary */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            <a
              href="https://github.com/AgentX-Trading"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#d1ff55] px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-[#dfff7a] hover:shadow-[0_0_32px_rgba(209,255,85,0.35)]"
            >
              {t.hero.primaryCta} <ArrowRight size={16} />
            </a>
            <a
              href="https://www.coinw.com/api-doc/common/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#6c4fff] hover:bg-white/10"
            >
              {t.hero.secondaryCta} <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
