'use client';

import React from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { Button } from '@/components/primitives/Button';
import { ArrowRight, ExternalLink } from 'lucide-react';

export function Hero() {
  const t = useLandingT();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Gradient orb background */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #6c4fff 0%, transparent 70%)' }}
      />
      {/* Faint grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at top, black 40%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top, black 40%, transparent 75%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-sm font-semibold text-brand">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            {t.hero.eyebrow}
          </span>

          {/* Title */}
          <h1 className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, #ffffff 0%, #c9beff 60%, #6c4fff 100%)',
              }}
            >
              {t.hero.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl font-semibold text-brand sm:text-3xl">
            {t.hero.subtitle}
          </p>

          {/* Description */}
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            {t.hero.desc}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Button
              size="lg"
              href="https://github.com/AgentX-Trading"
              external
            >
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
