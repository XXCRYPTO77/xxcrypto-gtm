'use client';

import React from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { CopyBlock } from '@/components/primitives/CopyBlock';

export function InstallBlock() {
  const t = useLandingT();

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{t.installBlock.title}</h2>
        </div>
        <div className="w-full max-w-2xl">
          <CopyBlock
            code={t.installBlock.command}
            label={t.installBlock.copyLabel}
            copiedLabel={t.installBlock.copiedLabel}
          />
        </div>
      </div>
    </section>
  );
}
