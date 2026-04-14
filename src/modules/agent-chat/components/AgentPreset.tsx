'use client';

import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';
import { Shield, Zap, BarChart3, TrendingUp, Newspaper, Scale } from 'lucide-react';
import React, { useState } from 'react';

const PRESETS: { key: 'conservative' | 'scalper' | 'quant' | 'trend' | 'news' | 'balanced'; Icon: React.FC<{ size?: number }> }[] = [
  { key: 'conservative', Icon: Shield },
  { key: 'scalper', Icon: Zap },
  { key: 'quant', Icon: BarChart3 },
  { key: 'trend', Icon: TrendingUp },
  { key: 'news', Icon: Newspaper },
  { key: 'balanced', Icon: Scale },
];

interface AgentPresetProps {
  selected: string | null;
  onSelect: (key: string) => void;
  onBack?: () => void;
}

export function AgentPreset({ selected, onSelect, onBack }: AgentPresetProps) {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const [localSelected, setLocalSelected] = useState<string | null>(selected);
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">{t.agentChat.presets.title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {PRESETS.map(({ key, Icon }, idx) => {
          const isSelected = localSelected === key;
          return (
            <button
              key={key}
              onClick={() => setLocalSelected(key)}
              className={`text-left cursor-pointer ${idx === 0 ? 'md:col-span-2' : ''}`}
            >
              <Card
                variant={isSelected ? 'accent' : 'outlined'}
                className={`flex gap-5 transition-all hover:border-brand-light hover:shadow-sm ${
                  idx === 0 ? 'md:flex-row md:items-center' : 'flex-col'
                } ${isSelected ? 'shadow-md' : ''}`}
              >
                <div className={`flex gap-4 ${idx === 0 ? 'flex-1' : 'flex-col'}`}>
                  <span
                    className={`flex shrink-0 items-center justify-center rounded-xl text-brand ${
                      isSelected ? 'bg-brand text-white' : 'bg-brand-soft'
                    } ${idx === 0 ? 'h-16 w-16' : 'h-12 w-12'}`}
                  >
                    <Icon size={24} />
                  </span>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-ink ${idx === 0 ? 'text-lg' : 'text-base'}`}>
                      {t.agentChat.presets[key].name}
                    </h3>
                    <p className={`mt-2 leading-relaxed text-muted ${idx === 0 ? 'text-base' : 'text-sm'}`}>
                      {t.agentChat.presets[key].desc}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? 'border-brand bg-brand text-white'
                      : 'border-brand bg-brand-soft text-brand hover:bg-brand hover:text-white'
                  } ${idx === 0 ? 'self-start md:self-center' : ''}`}
                >
                  {isSelected ? '✓ ' : ''}{t.agentChat.presets.select}
                </span>
              </Card>
            </button>
          );
        })}
      </div>

      {localSelected && (
        <div className="mt-10 flex justify-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="rounded-xl border border-border px-6 py-3 text-ink font-semibold hover:bg-gray-50 transition-colors"
            >
              {isZh ? '← 返回' : '← Back'}
            </button>
          )}
          <button
            onClick={() => onSelect(localSelected)}
            className="rounded-xl bg-brand px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {isZh ? '继续 →' : 'Continue →'}
          </button>
        </div>
      )}
    </section>
  );
}
