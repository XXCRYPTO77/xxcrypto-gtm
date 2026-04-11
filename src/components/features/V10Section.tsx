'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { SectionHeader } from '../primitives/SectionHeader';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';
import { CopyBlock } from '../primitives/CopyBlock';
import { User, Bot, Newspaper, Bell, Wallet, Zap } from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  newspaper: <Newspaper size={20} />,
  bell: <Bell size={20} />,
  wallet: <Wallet size={20} />,
  zap: <Zap size={20} />,
};

export function V10Section() {
  const t = useT();
  const v = t.v10;

  return (
    <section id="v10" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeader
        version={v.version}
        depth="S"
        eyebrow={v.depth}
        title={v.headline}
        lede={v.lede}
      />

      {/* ——— User stories ——— */}
      <div className="mt-20">
        <h3 className="mb-2 text-2xl font-bold text-ink">{v.stories.title}</h3>
        <p className="mb-8 text-sm text-muted">{v.stories.subtitle}</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {v.stories.items.map((story, i) => (
            <Card key={story.id} variant="outlined" className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand">
                  STORY {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-wrap gap-1">
                  {story.skills.map((s) => (
                    <Badge key={s} tone="brand">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">{story.scenario}</p>
                <p className="mt-1 text-base font-semibold text-ink">{story.persona}</p>
              </div>
              <div className="space-y-2 border-t border-border pt-4">
                {story.dialog.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    {m.role === 'user' ? (
                      <User size={14} className="mt-1 shrink-0 text-muted" />
                    ) : (
                      <Bot size={14} className="mt-1 shrink-0 text-brand" />
                    )}
                    <p className={m.role === 'agent' ? 'text-ink' : 'text-muted'}>{m.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ——— Capability matrix ——— */}
      <div className="mt-24">
        <h3 className="mb-2 text-2xl font-bold text-ink">{v.capability.title}</h3>
        <p className="mb-8 text-sm text-muted">{v.capability.subtitle}</p>
        <div className="grid gap-6 md:grid-cols-2">
          {v.capability.groups.map((g) => (
            <Card key={g.id} variant="elevated">
              <p className="mb-4 text-sm font-bold uppercase tracking-wider text-brand">{g.name}</p>
              <ul className="space-y-3">
                {g.items.map((item) => (
                  <li key={item.code} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-11 shrink-0 items-center justify-center rounded-md bg-brand-soft font-mono text-xs font-bold text-brand">
                      {item.code}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ink">{item.name}</p>
                      <p className="text-xs text-muted">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* ——— Advanced tags ——— */}
      <div className="mt-24">
        <h3 className="mb-2 text-2xl font-bold text-ink">{v.advanced.title}</h3>
        <p className="mb-8 text-sm text-muted">{v.advanced.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          {v.advanced.tags.map((tag) => (
            <div
              key={tag.code}
              className="group inline-flex items-center gap-2 rounded-xl border border-border bg-page px-4 py-2.5 transition-colors hover:border-brand"
            >
              <span className="font-mono text-xs font-bold text-brand">{tag.code}</span>
              <span className="text-sm font-semibold text-ink">{tag.name}</span>
              <span className="hidden text-xs text-muted sm:inline">· {tag.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ——— Quick start + install ——— */}
      <div className="mt-24 grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <h3 className="mb-6 text-2xl font-bold text-ink">{v.quickStart.title}</h3>
          <div className="space-y-4">
            {v.quickStart.steps.map((step) => (
              <div key={step.n} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white">
                  {step.n}
                </span>
                <div>
                  <p className="text-base font-semibold text-ink">{step.title}</p>
                  <p className="text-sm text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-6 text-2xl font-bold text-ink">{v.install.title}</h3>
          <CopyBlock code={v.install.command} note={v.install.note} copiedLabel={v.install.copied} />
        </div>
      </div>

      {/* ——— Use cases ——— */}
      <div className="mt-24">
        <h3 className="mb-8 text-2xl font-bold text-ink">{v.useCases.title}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {v.useCases.items.map((u, i) => (
            <Card key={i} variant="outlined" className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                {ICONS[u.icon] ?? <Zap size={20} />}
              </span>
              <div>
                <p className="text-base font-semibold text-ink">{u.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{u.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
