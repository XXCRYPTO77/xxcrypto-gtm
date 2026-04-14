'use client';

import React, { useState } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Badge } from '@/components/primitives/Badge';

export function ComingSoon() {
  const t = useT();
  const v = t.v10;
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">{v.advanced.title}</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {v.advanced.tags.map((tag) => (
          <div
            key={tag.code}
            className="group relative"
            onMouseEnter={() => setHoveredTag(tag.code)}
            onMouseLeave={() => setHoveredTag(null)}
          >
            <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition-all hover:border-brand hover:bg-brand-soft">
              <span className="font-mono text-xs font-bold text-gray-600">{tag.code}</span>
              <span className="text-sm font-semibold text-gray-700">{tag.name}</span>
            </div>

            {/* Tooltip */}
            {hoveredTag === tag.code && (
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg whitespace-nowrap">
                {tag.desc}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
