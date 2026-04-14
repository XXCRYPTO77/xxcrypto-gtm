'use client';

import React from 'react';
import { COMING_SOON } from '../data/comingSoon';

export function ComingSoon() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
          Coming Soon
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

        <p className="mt-4 text-sm text-muted">更多能力持续开放中</p>
      </div>
    </section>
  );
}
