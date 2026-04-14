'use client';

import React, { useState, useCallback } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';
import { Copy, Check, Newspaper, Bell, Wallet, Zap } from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  newspaper: <Newspaper size={24} />,
  bell: <Bell size={24} />,
  wallet: <Wallet size={24} />,
  zap: <Zap size={24} />,
};

export function UseCaseCards() {
  const t = useT();
  const v = t.v10;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">{v.useCases.title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {v.useCases.items.map((useCase, idx) => (
          <UseCaseCard
            key={idx}
            icon={useCase.icon}
            title={useCase.title}
            desc={useCase.desc}
            isFeatured={idx === 0}
          />
        ))}
      </div>
    </section>
  );
}

function UseCaseCard({
  icon,
  title,
  desc,
  isFeatured = false,
}: {
  icon: string;
  title: string;
  desc: string;
  isFeatured?: boolean;
}) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(desc);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* noop */
    }
  }, [desc]);

  return (
    <Card
      variant="outlined"
      className={`flex flex-col gap-5 transition-all ${isFeatured ? 'md:col-span-2 md:flex-row md:items-center' : ''}`}
    >
      <div className={`flex gap-4 ${isFeatured ? 'flex-1' : 'flex-col'}`}>
        <span
          className={`flex shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand ${
            isFeatured ? 'h-16 w-16' : 'h-12 w-12'
          }`}
        >
          {ICONS[icon] ?? <Zap size={24} />}
        </span>
        <div className="flex-1">
          <h3 className={`font-semibold text-ink ${isFeatured ? 'text-lg' : 'text-base'}`}>
            {title}
          </h3>
          <p className={`mt-2 leading-relaxed text-muted ${isFeatured ? 'text-base' : 'text-sm'}`}>
            {desc}
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
        {copied ? t.common.copied : t.v10.useCases.tryLabel}
      </button>

      {copied && (
        <span className="absolute left-0 top-full mt-2 inline-flex items-center rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg">
          {t.v10.useCases.toastMsg}
        </span>
      )}
    </Card>
  );
}
