'use client';

import React, { useState } from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const t = useLandingT();
  const faq = (t as any).faq;
  if (!faq) return null;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-bold text-ink text-center sm:text-4xl mb-12">
          {faq.title}
        </h2>

        <div className="space-y-3">
          {faq.items.map((item: { q: string; a: string }, i: number) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-page overflow-hidden transition-colors duration-200 hover:border-brand/20"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-ink">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-muted transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
