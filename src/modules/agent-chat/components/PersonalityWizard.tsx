'use client';

import { useState } from 'react';
import { useT } from '@/i18n/LocaleContext';

export interface Personality {
  style: 'professional' | 'humorous' | 'mentor' | 'aggressive';
  preference: 'mainstream' | 'altcoin' | 'defi' | 'all';
  frequency: 'onDemand' | 'daily' | 'realtime';
}

interface PersonalityWizardProps {
  onComplete: (p: Personality) => void;
  onBack?: () => void;
}

type SubStep = 1 | 2 | 3;

const STYLE_ICONS: Record<Personality['style'], string> = {
  professional: '📊',
  humorous: '🔥',
  mentor: '🎓',
  aggressive: '⚡',
};

const PREF_ICONS: Record<Personality['preference'], string> = {
  mainstream: '₿',
  altcoin: '🎯',
  defi: '🌊',
  all: '🌐',
};

const FREQ_ICONS: Record<Personality['frequency'], string> = {
  onDemand: '🤙',
  daily: '☀️',
  realtime: '⚡',
};

// Visual accent based on style
const STYLE_COLORS: Record<Personality['style'], string> = {
  professional: '#3B82F6',
  humorous: '#F59E0B',
  mentor: '#10B981',
  aggressive: '#EF4444',
};

export function PersonalityWizard({ onComplete, onBack }: PersonalityWizardProps) {
  const t = useT();
  const pc = t.agentChat.personality as {
    title: string; step1of3: string; step2of3: string; step3of3: string;
    next: string; prev: string; finish: string;
    styles: Record<string, { name: string; desc: string }>;
    prefs: Record<string, { name: string; desc: string }>;
    freqs: Record<string, { name: string; desc: string }>;
  };

  const [sub, setSub] = useState<SubStep>(1);
  const [style, setStyle] = useState<Personality['style'] | null>(null);
  const [pref, setPref] = useState<Personality['preference'] | null>(null);
  const [freq, setFreq] = useState<Personality['frequency'] | null>(null);

  const accentColor = style ? STYLE_COLORS[style] : '#3B82F6';

  const stepLabel = sub === 1 ? pc.step1of3 : sub === 2 ? pc.step2of3 : pc.step3of3;
  const canNext = sub === 1 ? !!style : sub === 2 ? !!pref : !!freq;

  function handleNext() {
    if (sub < 3) setSub((s) => (s + 1) as SubStep);
    else if (style && pref && freq) onComplete({ style, preference: pref, frequency: freq });
  }

  function handlePrev() {
    if (sub > 1) setSub((s) => (s - 1) as SubStep);
    else onBack?.();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-4">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-ink">{pc.title}</h2>
        <p className="text-sm font-medium" style={{ color: accentColor }}>{stepLabel}</p>
      </div>

      {/* Sub-step progress dots */}
      <div className="flex items-center gap-2">
        {([1, 2, 3] as SubStep[]).map((s) => (
          <div
            key={s}
            className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{
              background: s <= sub ? accentColor : '#E5E7EB',
            }}
          />
        ))}
      </div>

      {/* Step 1 — Style */}
      {sub === 1 && (
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(STYLE_ICONS) as Personality['style'][]).map((key) => {
            const isSelected = style === key;
            const color = STYLE_COLORS[key];
            return (
              <button
                key={key}
                onClick={() => setStyle(key)}
                className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all ${
                  isSelected ? 'shadow-md' : 'border-border bg-white hover:border-gray-300'
                }`}
                style={
                  isSelected
                    ? { borderColor: color, background: `${color}0D` }
                    : {}
                }
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl"
                  style={{ background: `${color}18` }}
                >
                  {STYLE_ICONS[key]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink" style={isSelected ? { color } : {}}>
                    {pc.styles[key].name}
                  </div>
                  <div className="text-xs text-muted mt-0.5 leading-snug">
                    {pc.styles[key].desc}
                  </div>
                </div>
                {isSelected && (
                  <div
                    className="absolute top-3 right-3 flex h-4 w-4 items-center justify-center rounded-full text-white text-[9px]"
                    style={{ background: color }}
                  >
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Step 2 — Preference */}
      {sub === 2 && (
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(PREF_ICONS) as Personality['preference'][]).map((key) => {
            const isSelected = pref === key;
            return (
              <button
                key={key}
                onClick={() => setPref(key)}
                className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all ${
                  isSelected ? 'shadow-md' : 'border-border bg-white hover:border-gray-300'
                }`}
                style={
                  isSelected
                    ? { borderColor: accentColor, background: `${accentColor}0D` }
                    : {}
                }
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl"
                  style={{ background: `${accentColor}18` }}
                >
                  {PREF_ICONS[key]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink" style={isSelected ? { color: accentColor } : {}}>
                    {pc.prefs[key].name}
                  </div>
                  <div className="text-xs text-muted mt-0.5 leading-snug">
                    {pc.prefs[key].desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Step 3 — Frequency */}
      {sub === 3 && (
        <div className="space-y-3">
          {(Object.keys(FREQ_ICONS) as Personality['frequency'][]).map((key) => {
            const isSelected = freq === key;
            return (
              <button
                key={key}
                onClick={() => setFreq(key)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                  isSelected ? 'shadow-md' : 'border-border bg-white hover:border-gray-300'
                }`}
                style={
                  isSelected
                    ? { borderColor: accentColor, background: `${accentColor}0D` }
                    : {}
                }
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                  style={{ background: `${accentColor}18` }}
                >
                  {FREQ_ICONS[key]}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-ink" style={isSelected ? { color: accentColor } : {}}>
                    {pc.freqs[key].name}
                  </div>
                  <div className="text-xs text-muted mt-0.5">{pc.freqs[key].desc}</div>
                </div>
                {isSelected && (
                  <div
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white text-[10px]"
                    style={{ background: accentColor }}
                  >
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Nav buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handlePrev}
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-ink hover:bg-gray-50 transition-colors"
        >
          {pc.prev}
        </button>
        <button
          onClick={handleNext}
          disabled={!canNext}
          className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          style={{ background: canNext ? accentColor : '#9CA3AF' }}
        >
          {sub === 3 ? pc.finish : pc.next}
        </button>
      </div>
    </div>
  );
}
