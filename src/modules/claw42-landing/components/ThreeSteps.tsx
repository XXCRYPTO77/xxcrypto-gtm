'use client';

import React from 'react';
import { useT } from '../i18n/useT';

export function ThreeSteps() {
  const t = useT();
  const s = t.steps;

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-[1180px] px-8 grid gap-16 md:grid-cols-[1fr_1.5fr] items-start">
        <div>
          <h2 className="font-black tracking-tight" style={{ fontSize: 'clamp(36px, 4vw, 57px)' }}>
            {s.title}
          </h2>
          <p className="mt-5 text-[15px] leading-[1.8] text-white/70">{s.subtitle}</p>
        </div>

        <ol className="space-y-10">
          {s.items.map((item, i) => (
            <li key={i} className="flex gap-5">
              <div className={[
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-[18px] font-black',
                i === 2 ? 'border-white/15 text-white/40 bg-white/5' : 'border-[#6c4fff] text-white bg-[#6c4fff]/15',
              ].join(' ')}>
                {i + 1}
              </div>
              <div>
                <h3 className={`text-[22px] font-bold ${i === 2 ? 'text-white/45' : 'text-white'}`}>
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.75] text-white/70">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Tagline code block */}
      <div className="mx-auto mt-20 max-w-[1180px] px-8">
        <div className="rounded-xl border border-white/10 bg-[#0e0e12] p-5 font-mono text-[13px] text-white/60">
          <div className="text-[#6c4fff]">{s.codeComment}</div>
          <div className="mt-1">{s.codeTagline}</div>
        </div>
      </div>
    </section>
  );
}
