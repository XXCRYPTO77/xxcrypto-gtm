'use client';

import React from 'react';
import { useT } from '../i18n/useT';

export function Ecosystem() {
  const t = useT();
  const e = t.ecosystem;

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-[1180px] px-8">
        <h2 className="text-center font-black tracking-tight" style={{ fontSize: 'clamp(30px, 3.3vw, 45px)' }}>
          {e.title}
        </h2>
        <p className="mt-4 mx-auto max-w-[780px] text-center text-[15px] leading-[1.8] text-white/60">
          {e.subtitle}
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <EcosystemCard
            title={e.contract.title}
            desc={e.contract.desc}
            popular={e.popular}
            learnMore={e.learnMore}
          />
          <EcosystemCard
            title={e.spot.title}
            desc={e.spot.desc}
            popular={e.popular}
            learnMore={e.learnMore}
          />
        </div>
      </div>
    </section>
  );
}

function EcosystemCard({
  title,
  desc,
  popular,
  learnMore,
}: { title: string; desc: string; popular: string; learnMore: string }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#141418] p-8 min-h-[260px] flex flex-col">
      <span className="absolute top-5 right-5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-bold text-white/85">
        🔥 {popular}
      </span>

      {/* subtle bg orb */}
      <div
        className="absolute -top-10 -right-10 h-48 w-48 rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6c4fff 0%, transparent 70%)' }}
      />

      <h3 className="text-[20px] font-bold">{title}</h3>
      <p className="mt-3 text-[15px] leading-[1.7] text-white/55 max-w-[85%]">{desc}</p>

      <div className="mt-auto pt-8">
        <a href="#" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#6c4fff] hover:text-[#8a71ff] transition">
          {learnMore}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}
