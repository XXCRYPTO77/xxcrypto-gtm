'use client';

import React from 'react';
import { useT } from '../i18n/useT';

export function UseCases() {
  const t = useT();
  const u = t.useCases;

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-[1180px] px-8">
        <h2 className="text-center font-black tracking-tight" style={{ fontSize: 'clamp(32px, 3.5vw, 45px)' }}>
          {u.title}
        </h2>
        <p className="mt-4 text-center text-white/60 max-w-[720px] mx-auto leading-relaxed">
          {u.subtitle}
        </p>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.55fr_1fr] items-stretch">
          {/* Left: hero card */}
          <HeroCard />

          {/* Right: 2 stacked cards */}
          <div className="grid gap-5 grid-rows-2">
            <MonitorCard />
            <AutomationCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCard() {
  const t = useT();
  const u = t.useCases.hero;
  const badge = t.useCases.badgeRecommend;

  return (
    <article
      className="relative overflow-hidden rounded-2xl border border-white/10 p-8"
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 85% 10%, rgba(108,79,255,0.35) 0%, rgba(26,26,26,0.95) 55%, #1a1a1a 100%)',
      }}
    >
      <div className="grid md:grid-cols-2 gap-8 h-full">
        <div className="flex flex-col">
          <h3 className="text-[28px] font-bold leading-tight">{u.title}</h3>
          <p className="mt-3 text-[14px] leading-[1.7] text-white/60">{u.desc}</p>

          <div className="mt-auto pt-8">
            <p className="text-[13px] font-bold text-white/85 mb-3">{u.hint}</p>
            <div className="flex items-center gap-3">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-[#6c4fff] px-5 py-2.5 text-[13px] font-bold text-white hover:bg-[#5227ff] transition">
                {u.cta}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right chat preview */}
        <div className="relative">
          <span className="absolute -top-2 right-0 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-semibold text-white/80">
            {badge}
          </span>
          <div className="mt-6 rounded-xl border border-white/10 bg-black/50 p-4 text-[12px] font-mono leading-[1.7] space-y-2">
            <div>
              <span className="text-[#6c4fff] font-bold">{u.ai}</span>{' '}
              <span className="text-white/70">{u.aiMsg}</span>
            </div>
            <div className="text-[#14a739]">✓ {u.aiMsg2}</div>
            <div className="text-white/55 whitespace-pre-line">{u.aiMsg3}</div>
            <div className="pt-2 text-white">{u.summary}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MonitorCard() {
  const t = useT();
  const m = t.useCases.monitor;
  return (
    <article className="rounded-2xl border border-white/10 bg-[#141418] p-6">
      <h3 className="text-[18px] font-bold">{m.title}</h3>
      <p className="mt-2 text-[13px] text-white/55">{m.desc}</p>

      <div className="mt-4 rounded-lg border border-white/5 bg-black/40 p-3">
        <TickerRow symbol="BTC" change="+3.21%" up />
        <TickerRow symbol="ETH" change="+1.84%" up />
        <TickerRow symbol="SOL" change="-0.92%" />
      </div>
    </article>
  );
}

function TickerRow({ symbol, change, up }: { symbol: string; change: string; up?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-[12px] font-mono">
      <span className="text-white/80">{symbol}</span>
      <span className={up ? 'text-[#14a739]' : 'text-[#e95032]'}>{change}</span>
    </div>
  );
}

function AutomationCard() {
  const t = useT();
  const a = t.useCases.automation;
  return (
    <article className="rounded-2xl border border-white/10 bg-[#141418] p-6">
      <h3 className="text-[18px] font-bold">{a.title}</h3>
      <p className="mt-2 text-[13px] text-white/55">{a.desc}</p>

      <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#6c4fff]/40 bg-[#6c4fff]/10 p-3 text-[12px]">
        <span className="h-2 w-2 rounded-full bg-[#14a739] animate-pulse" />
        <span className="text-white/80 font-mono">agent.run() • status: online</span>
      </div>
    </article>
  );
}
