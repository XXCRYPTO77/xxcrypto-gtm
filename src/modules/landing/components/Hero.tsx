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
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #5B3FFF 0%, transparent 70%)' }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left: Text content */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-6">
            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-sm font-semibold text-brand">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              {t.hero.eyebrow}
            </span>

            {/* Title with gradient */}
            <h1
              className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl"
              style={{
                background: 'linear-gradient(135deg, var(--color-brand) 0%, #7C5CFF 40%, #00D4AA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-2xl font-semibold text-brand sm:text-3xl">
              {t.hero.subtitle}
            </p>

            {/* Description */}
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              {t.hero.desc}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mt-4 w-full sm:w-auto">
              <Button
                size="lg"
                href="https://github.com/AgentX-Trading"
                external
                className="w-full sm:w-auto"
              >
                {t.hero.primaryCta} <ArrowRight size={18} />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                href="https://www.coinw.com/api-doc/common/introduction"
                external
                className="w-full sm:w-auto"
              >
                {t.hero.secondaryCta} <ExternalLink size={18} />
              </Button>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 sm:gap-8 mt-6 pt-6 border-t border-border w-full">
              {[
                { value: '< 200ms', label: 'Decision Latency' },
                { value: '4D', label: 'Signal Sources' },
                { value: 'AES-256', label: 'Encryption' },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <span className="block text-xl font-black text-brand sm:text-2xl">{stat.value}</span>
                  <span className="block text-xs text-muted font-medium uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Abstract AI agent visual */}
          <div className="relative hidden md:flex items-center justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Rotating outer ring */}
              <div
                className="absolute inset-0 rounded-full border border-brand/20"
                style={{ animation: 'hero-spin 20s linear infinite' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand shadow-[0_0_12px_var(--color-brand)]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#00D4AA]" />
              </div>
              {/* Second ring */}
              <div
                className="absolute inset-8 rounded-full border border-brand/15"
                style={{ animation: 'hero-spin 15s linear infinite reverse' }}
              >
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-med shadow-[0_0_10px_var(--color-brand-med)]" />
              </div>
              {/* Inner glow */}
              <div
                className="absolute inset-16 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(82,39,255,0.15) 0%, transparent 70%)',
                  animation: 'hero-pulse 4s ease-in-out infinite',
                }}
              />
              {/* Center node */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-emerald-400 flex items-center justify-center shadow-[0_0_40px_rgba(82,39,255,0.3)]">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="white" strokeWidth="1.5" fill="none" />
                    <circle cx="16" cy="16" r="4" fill="white" opacity="0.9" />
                    <line x1="16" y1="12" x2="16" y2="4" stroke="white" strokeWidth="1" opacity="0.5" />
                    <line x1="20" y1="16" x2="28" y2="16" stroke="white" strokeWidth="1" opacity="0.5" />
                    <line x1="16" y1="20" x2="16" y2="28" stroke="white" strokeWidth="1" opacity="0.5" />
                    <line x1="12" y1="16" x2="4" y2="16" stroke="white" strokeWidth="1" opacity="0.5" />
                  </svg>
                </div>
              </div>
              {/* Floating particles */}
              {[
                { top: '15%', left: '10%', size: 6, delay: '0s' },
                { top: '70%', left: '85%', size: 4, delay: '1s' },
                { top: '80%', left: '15%', size: 5, delay: '2s' },
                { top: '25%', left: '80%', size: 4, delay: '0.5s' },
                { top: '50%', left: '5%', size: 3, delay: '1.5s' },
              ].map((p, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-brand/40"
                  style={{
                    top: p.top,
                    left: p.left,
                    width: p.size,
                    height: p.size,
                    animation: `hero-float 3s ease-in-out ${p.delay} infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes hero-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes hero-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes hero-float {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-10px); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
