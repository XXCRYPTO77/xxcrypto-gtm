'use client';

import React, { useState } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';

export function CapabilityTabs() {
  const t = useT();
  const v = t.v10;
  const groups = v.capability.groups;
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id || 'info');

  const activeGroup = groups.find((g) => g.id === activeGroupId);

  return (
    <section id="capability-matrix" className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">{v.capability.title}</h2>
      </div>

      {/* Tab buttons */}
      <div className="mb-8 flex flex-wrap gap-3 border-b border-border pb-6">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveGroupId(group.id)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeGroupId === group.id
                ? 'bg-brand-soft text-brand'
                : 'bg-transparent text-muted hover:text-ink'
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>

      {/* Content grid */}
      {activeGroup && (
        <div className="grid gap-4 md:grid-cols-2">
          {activeGroup.items.map((item) => (
            <Card key={item.code} variant="elevated">
              <div className="flex items-start gap-4">
                <Badge tone="brand" className="shrink-0">
                  {item.code}
                </Badge>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-ink">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
