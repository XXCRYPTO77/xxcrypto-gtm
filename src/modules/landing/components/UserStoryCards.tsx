'use client';

import React, { useState } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Badge } from '@/components/primitives/Badge';
import { Card } from '@/components/primitives/Card';
import { MessageSquare } from 'lucide-react';

export function UserStoryCards() {
  const t = useT();
  const stories = t.v10.stories.items;
  const [activeIdx, setActiveIdx] = useState(0);

  const active = stories[activeIdx];

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">{t.v10.stories.title}</h2>
      </div>

      {/* Story selector tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {stories.map((story: { id: string; persona: string; scenario: string }, idx: number) => (
          <button
            key={story.id}
            onClick={() => setActiveIdx(idx)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              idx === activeIdx
                ? 'bg-brand text-white'
                : 'bg-gray-50 text-muted hover:bg-brand-soft hover:text-brand'
            }`}
          >
            {story.scenario}
          </button>
        ))}
      </div>

      {/* Active story */}
      <Card variant="outlined" className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand">
            <MessageSquare size={16} />
          </span>
          <div>
            <p className="text-xs text-muted">Persona</p>
            <p className="text-sm font-semibold text-ink">{active.persona}</p>
          </div>
          <Badge tone="brand" className="ml-auto">{active.scenario}</Badge>
        </div>

        {/* Dialog bubbles */}
        <div className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4">
          {active.dialog.map((msg: { role: string; text: string }, i: number) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <span
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand text-white rounded-br-sm'
                    : 'bg-white text-ink shadow-sm rounded-bl-sm'
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Skills used */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted">涉及能力：</span>
          {active.skills.map((skill: string) => (
            <Badge key={skill} tone="neutral" className="font-mono text-xs">{skill}</Badge>
          ))}
        </div>
      </Card>
    </section>
  );
}
