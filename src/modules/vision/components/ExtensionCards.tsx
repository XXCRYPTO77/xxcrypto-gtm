'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import {
  Users,
  Zap,
  Star,
  Store,
  Radio,
} from 'lucide-react';

const ICONS = [Users, Zap, Star, Store, Radio];

const STATUS_ZH = '规划中';
const STATUS_EN = 'Planned';

export function ExtensionCards() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const items = t.extensions.items;
  const status = isZh ? STATUS_ZH : STATUS_EN;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <h2 className="text-3xl font-bold text-ink sm:text-4xl mb-2">
        {isZh ? '延展方向' : 'Extension Directions'}
      </h2>
      <p className="text-sm text-muted mb-10">
        {isZh
          ? '主线产品之外的五个增长点。技术方向已确认，具体排期待定。'
          : 'Five growth directions beyond the core product. Technical directions confirmed; scheduling TBD.'}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item: { code: string; title: string; desc: string }, idx: number) => {
          const Icon = ICONS[idx] ?? Store;
          return (
            <div
              key={item.code}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-page p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon size={18} />
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-muted">
                  {status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-muted">{item.code}</span>
                <h3 className="text-sm font-bold text-ink">{item.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
