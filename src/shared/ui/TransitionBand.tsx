'use client';

/**
 * TransitionBand
 * A visual separator between Acts showing supporting features (P-series)
 * that fill the gap between two major versions.
 *
 * Usage:
 *   <TransitionBand band="band1" nextActLabel="Act II · Use It" nextActHref="/act2" />
 */

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useT } from '@/i18n/LocaleContext';

type BandKey = 'band1' | 'band2' | 'band3';

interface TransitionBandProps {
  band: BandKey;
  nextActLabel: string;
  nextActHref: string;
}

export function TransitionBand({ band, nextActLabel, nextActHref }: TransitionBandProps) {
  const t = useT();
  const data = t.transitionBands[band];

  return (
    <section className="relative border-y border-border bg-gray-50/60 py-10 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Version transition header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1 font-mono text-xs font-bold text-muted shadow-sm">
              {data.from}
            </span>
            <div className="h-px w-8 bg-gray-300" />
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1 font-mono text-xs font-bold text-muted shadow-sm">
              {data.to}
            </span>
          </div>
          <p className="text-xs text-muted">{data.label}</p>
        </div>

        {/* Feature pills grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.items.map((item) => (
            <div
              key={item.code}
              className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-sm"
            >
              <span className="shrink-0 rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs font-bold text-muted">
                {item.code}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink leading-tight">{item.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Next Act CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href={nextActHref}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-sm transition-all hover:border-brand hover:text-brand hover:shadow-md"
          >
            {nextActLabel}
            <ChevronDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
