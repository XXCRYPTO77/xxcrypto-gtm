'use client';

import React, { useState, useCallback } from 'react';
import { Card } from '@/components/primitives/Card';
import { Copy, Check } from 'lucide-react';
import { USECASES } from '../data/useCases';
import { useLandingT } from '../i18n/useLandingT';

export function UseCaseCards() {
  const t = useLandingT();

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">{t.useCases.title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {USECASES.map((useCase, idx) => (
          <UseCaseCard key={useCase.id} useCase={useCase} isFeatured={idx === 0} />
        ))}
      </div>
    </section>
  );
}

function UseCaseCard({
  useCase,
  isFeatured = false,
}: {
  useCase: (typeof USECASES)[number];
  isFeatured?: boolean;
}) {
  const t = useLandingT();
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(useCase.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      /* noop */
    }
  }, [useCase.prompt]);

  return (
    <Card
      variant="outlined"
      className={`relative flex flex-col gap-5 transition-all ${isFeatured ? 'md:col-span-2 md:flex-row md:items-center' : ''}`}
    >
      <div className={`flex gap-4 ${isFeatured ? 'flex-1' : ''}`}>
        <span
          className={`flex shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand text-2xl ${
            isFeatured ? 'h-16 w-16' : 'h-12 w-12'
          }`}
        >
          {useCase.icon}
        </span>
        <div className="flex-1">
          <h3 className={`font-semibold text-ink ${isFeatured ? 'text-lg' : 'text-base'}`}>
            {useCase.title}
          </h3>
          <p className={`mt-1 leading-relaxed text-muted ${isFeatured ? 'text-base' : 'text-sm'}`}>
            {useCase.subtitle}
          </p>
        </div>
      </div>

      <button
        onClick={onCopy}
        className={`inline-flex shrink-0 items-center gap-2 rounded-lg border border-brand bg-brand-soft px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white ${
          isFeatured ? 'self-start md:self-center' : ''
        }`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? t.useCases.copiedLabel : t.useCases.copyLabel}
      </button>

      {copied && (
        <span className="absolute left-0 top-full mt-2 z-10 inline-flex items-center rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg">
          {t.useCases.toastMsg}
        </span>
      )}
    </Card>
  );
}
