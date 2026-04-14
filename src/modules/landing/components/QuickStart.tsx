'use client';

import React from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { Card } from '@/components/primitives/Card';

export function QuickStart() {
  const t = useLandingT();
  const steps = t.quickStart.steps;

  return (
    <section id="quick-start" className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">{t.quickStart.title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.n} variant="elevated">
            <div className="flex flex-col gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand font-bold text-white text-lg">
                {step.n}
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
