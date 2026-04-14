'use client';

import { useState } from 'react';
import { useT } from '@/i18n/LocaleContext';
import type { Personality } from './PersonalityWizard';

interface AgentNamingProps {
  personality: Personality;
  onComplete: (name: string) => void;
  onBack?: () => void;
}

const STYLE_COLORS: Record<Personality['style'], string> = {
  professional: '#3B82F6',
  humorous: '#F59E0B',
  mentor: '#10B981',
  aggressive: '#EF4444',
};

const STYLE_GRADIENTS: Record<Personality['style'], string> = {
  professional: 'linear-gradient(135deg, #1e40af, #3B82F6)',
  humorous: 'linear-gradient(135deg, #d97706, #F59E0B)',
  mentor: 'linear-gradient(135deg, #065f46, #10B981)',
  aggressive: 'linear-gradient(135deg, #991b1b, #EF4444)',
};

// Tag lines per style
const STYLE_LINES: Record<Personality['style'], { zh: string; en: string }> = {
  professional: { zh: '专业稳健，数据为先', en: 'Professional, data first' },
  humorous: { zh: '幽默毒舌，涨跌都说', en: 'Snarky but accurate' },
  mentor: { zh: '导师模式，授人以渔', en: 'Mentor mode, teach to fish' },
  aggressive: { zh: '激进猎手，不废话冲', en: 'Hunter mode, no fluff' },
};

const DEFAULT_NAME_ZH = 'CWClaw';
const DEFAULT_NAME_EN = 'CWClaw';

export function AgentNaming({ personality, onComplete, onBack }: AgentNamingProps) {
  const t = useT();
  const nc = t.agentChat.naming as Record<string, string>;
  const isZh = t.nav.cta === 'EN';

  const [name, setName] = useState('');
  const color = STYLE_COLORS[personality.style];
  const gradient = STYLE_GRADIENTS[personality.style];
  const tagline = STYLE_LINES[personality.style];

  const displayName = name.trim() || (isZh ? DEFAULT_NAME_ZH : DEFAULT_NAME_EN);

  function confirm() {
    onComplete(name.trim() || (isZh ? DEFAULT_NAME_ZH : DEFAULT_NAME_EN));
  }

  return (
    <div className="mx-auto max-w-md space-y-8 py-4">
      {/* Avatar preview — color reacts to personality */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-32 w-32 items-center justify-center">
          {/* Personality-colored glow */}
          <div
            className="absolute inset-0 rounded-full opacity-25 blur-2xl transition-all duration-500"
            style={{ background: gradient }}
          />
          <div
            className="relative flex h-28 w-28 items-center justify-center rounded-2xl shadow-xl transition-all duration-500"
            style={{ background: gradient }}
          >
            <span className="text-6xl select-none" role="img" aria-label="CWClaw">🦞</span>
          </div>
          {/* Online dot */}
          <span className="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
          </span>
        </div>

        {/* Dynamic name display */}
        <div className="text-center">
          <div className="text-xl font-bold text-ink">{displayName}</div>
          <div className="text-xs mt-1" style={{ color }}>
            {isZh ? tagline.zh : tagline.en}
          </div>
        </div>
      </div>

      {/* Naming form */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-ink text-center">{nc.title}</h2>
          <p className="mt-1 text-sm text-muted text-center">{nc.sub}</p>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && confirm()}
          placeholder={nc.placeholder}
          maxLength={20}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted text-center font-medium focus:outline-none transition-all"
          style={{ '--tw-ring-color': color } as React.CSSProperties}
          onFocus={(e) => (e.target.style.borderColor = color)}
          onBlur={(e) => (e.target.style.borderColor = '')}
        />

        <button
          onClick={confirm}
          className="w-full rounded-xl py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
          style={{ background: gradient }}
        >
          {nc.confirm}
        </button>

        <div className="flex justify-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="text-sm text-muted hover:text-ink transition-colors"
            >
              {isZh ? '← 返回' : '← Back'}
            </button>
          )}
          <button
            onClick={() => onComplete(isZh ? DEFAULT_NAME_ZH : DEFAULT_NAME_EN)}
            className="text-sm text-muted hover:text-ink transition-colors"
          >
            {nc.skip}
          </button>
        </div>
      </div>
    </div>
  );
}
