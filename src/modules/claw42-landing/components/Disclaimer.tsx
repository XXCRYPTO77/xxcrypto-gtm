'use client';

import React from 'react';
import { useT } from '../i18n/useT';

export function Disclaimer() {
  const t = useT();
  const d = t.disclaimer;

  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-[1180px] px-8">
        <h2 className="font-black tracking-tight" style={{ fontSize: 'clamp(28px, 3vw, 45px)' }}>
          {d.title}
        </h2>

        <ol className="mt-10 list-decimal space-y-4 pl-5 text-[13px] leading-[1.8] text-white/55">
          {d.paragraphs.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
