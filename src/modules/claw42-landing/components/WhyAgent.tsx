'use client';

import React from 'react';
import { useT } from '../i18n/useT';

export function WhyAgent() {
  const t = useT();
  const w = t.why;

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-[1180px] px-8">
        <h2 className="text-center font-black tracking-tight" style={{ fontSize: 'clamp(30px, 3.3vw, 45px)' }}>
          {w.title}
        </h2>
        <p className="mt-5 mx-auto max-w-[820px] text-center text-[15px] leading-[1.8] text-white/60">
          {w.subtitle}
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {w.cards.map((c, i) => (
            <article
              key={i}
              className={[
                'rounded-2xl border p-7 transition',
                i === 1
                  ? 'border-[#6c4fff]/60 bg-gradient-to-br from-[#6c4fff]/25 via-[#1a1a1a] to-[#1a1a1a] shadow-[0_0_40px_rgba(108,79,255,0.25)]'
                  : 'border-white/8 bg-[#141418]',
              ].join(' ')}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <span className="text-[15px] font-bold text-white">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-[16px] font-bold">{c.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.7] text-white/55">{c.desc}</p>
            </article>
          ))}
        </div>

        {/* Tagline code block */}
        <div className="mt-14 rounded-xl border border-white/10 bg-[#0e0e12] p-5 font-mono text-[13px] text-white/60">
          <div className="text-[#6c4fff]">{w.codeComment}</div>
          <div className="mt-1">{w.codeTagline}</div>
        </div>
      </div>
    </section>
  );
}
