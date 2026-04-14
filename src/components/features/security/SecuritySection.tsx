'use client';

import React, { useState } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { SectionHeader } from '../../primitives/SectionHeader';
import { Card } from '../../primitives/Card';
import { Network, ShieldAlert, GitBranch, GitMerge } from 'lucide-react';

type TabId = 'architecture' | 'threat' | 'cicd' | 'merge';

const ICONS: Record<TabId, React.ReactNode> = {
  architecture: <Network size={16} />,
  threat: <ShieldAlert size={16} />,
  cicd: <GitBranch size={16} />,
  merge: <GitMerge size={16} />,
};

const TAB_ORDER: readonly TabId[] = ['architecture', 'threat', 'cicd', 'merge'];

export function SecuritySection() {
  const t = useT();
  const s = t.security;
  const [tab, setTab] = useState<TabId>('architecture');
  const active = s.tabs[tab];

  return (
    <section id="security" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeader
        version={s.version}
        depth="A"
        title={s.headline}
        lede={s.lede}
      />

      <div className="mt-16">
        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 border-b border-border">
          {TAB_ORDER.map((id) => {
            const isActive = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-brand bg-brand-soft text-brand'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {ICONS[id]}
                {s.tabs[id].label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          <Card variant="elevated" className="lg:col-span-4">
            <div className="text-[color:var(--color-ink)]">
              <DiagramSlot tab={tab} />
            </div>
          </Card>
          <Card variant="outlined" className="lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              {active.label}
            </p>
            <h3 className="mt-2 text-xl font-bold text-ink">{active.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{active.desc}</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function DiagramSlot({ tab }: { tab: TabId }) {
  switch (tab) {
    case 'architecture':
      return <ArchitectureDiagram />;
    case 'threat':
      return <ThreatModelDiagram />;
    case 'cicd':
      return <CiCdDiagram />;
    case 'merge':
      return <MergeBackDiagram />;
  }
}

function SvgDiagram({ src, title }: { src: string; title: string }) {
  return (
    <object
      data={src}
      type="image/svg+xml"
      className="w-full"
      aria-label={title}
    >
      <img src={src} alt={title} className="w-full" />
    </object>
  );
}

function ArchitectureDiagram() {
  return <SvgDiagram src="/diagrams/01-architecture.svg" title="Architecture" />;
}
function ThreatModelDiagram() {
  return <SvgDiagram src="/diagrams/02-threat-model.svg" title="Threat model" />;
}
function CiCdDiagram() {
  return <SvgDiagram src="/diagrams/03-cicd.svg" title="CI/CD" />;
}
function MergeBackDiagram() {
  return <SvgDiagram src="/diagrams/04-merge-back.svg" title="Merge-back" />;
}
