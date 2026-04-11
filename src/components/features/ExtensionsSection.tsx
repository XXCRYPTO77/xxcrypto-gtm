'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { SectionHeader } from '../primitives/SectionHeader';
import { Card } from '../primitives/Card';

export function ExtensionsSection() {
  const t = useT();
  const e = t.extensions;
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeader eyebrow="HORIZON" title={e.title} lede={e.subtitle} />
      <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {e.items.map((item) => (
          <Card key={item.code} variant="outlined">
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs font-bold text-brand">{item.code}</span>
              <div>
                <p className="text-base font-bold text-ink">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
