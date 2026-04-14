'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { CopyBlock } from '@/components/primitives/CopyBlock';

export function InstallBlock() {
  const t = useT();
  const v = t.v10;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{v.install.title}</h2>
        </div>
        <div className="w-full max-w-2xl">
          <CopyBlock
            code={v.install.command}
            note={v.install.note}
            label={t.common.copy}
            copiedLabel={v.install.copied}
          />
        </div>
      </div>
    </section>
  );
}
