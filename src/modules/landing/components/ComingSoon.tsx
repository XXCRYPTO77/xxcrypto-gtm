'use client';

import React from 'react';
import { COMING_SOON } from '../data/comingSoon';
import { useLandingT } from '../i18n/useLandingT';

export function ComingSoon() {
  const t = useLandingT();

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
          {t.comingSoon.title}
        </p>

        <div className="flex flex-wrap gap-2">
          {COMING_SOON.map((item) => (
            <span
              key={item.id}
              className="rounded-full border border-border px-3 py-1 text-sm text-muted"
            >
              {item.label}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted">{t.comingSoon.subtitle}</p>
      </div>
    </section>
  );
}
