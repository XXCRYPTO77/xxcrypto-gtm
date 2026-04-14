'use client';

import { useT } from '@/i18n/LocaleContext';
import { BarChart3, MessageSquare, Shield } from 'lucide-react';

interface CWClawLandingProps {
  onNext: () => void;
}

// Personality-derived accent color for avatar — default blue before wizard
const AVATAR_COLORS = ['#3B82F6', '#8B5CF6', '#F59E0B'] as const;

export function CWClawLanding({ onNext }: CWClawLandingProps) {
  const t = useT();
  const c = t.agentChat.landing as Record<string, string>;
  const isZh = t.nav.cta === 'EN';

  const features = [
    { Icon: BarChart3, title: c.f1Title, desc: c.f1Desc, color: '#3B82F6' },
    { Icon: MessageSquare, title: c.f2Title, desc: c.f2Desc, color: '#8B5CF6' },
    { Icon: Shield, title: c.f3Title, desc: c.f3Desc, color: '#10B981' },
  ];

  const stats = [
    { value: c.stat1, note: isZh ? '覆盖全链路' : 'full pipeline' },
    { value: c.stat2, note: isZh ? '永不下线' : 'always on' },
    { value: c.stat3, note: isZh ? '资产绝对安全' : 'assets locked' },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-12 py-4">
      {/* Hero */}
      <div className="text-center space-y-6">
        {/* Animated CWClaw avatar */}
        <div className="flex justify-center">
          <div className="relative flex h-28 w-28 items-center justify-center">
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full opacity-20 blur-xl"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}
            />
            <div
              className="relative flex h-24 w-24 items-center justify-center rounded-2xl shadow-lg"
              style={{ background: 'linear-gradient(135deg, #1e40af, #7c3aed)' }}
            >
              <span className="text-5xl select-none" role="img" aria-label="CWClaw">🦞</span>
            </div>
            {/* Online dot */}
            <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-ink sm:text-5xl leading-tight">
            {c.hero}
          </h1>
          <p className="mt-3 text-lg text-muted max-w-md mx-auto leading-relaxed">
            {c.heroSub}
          </p>
        </div>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-2xl bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
        >
          {c.cta}
        </button>
      </div>

      {/* Stats strip */}
      <div className="flex justify-center gap-10">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-xl font-bold text-ink" style={{ color: AVATAR_COLORS[i] }}>
              {s.value}
            </div>
            <div className="text-xs text-muted mt-0.5">{s.note}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {features.map(({ Icon, title, desc, color }, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-white p-5 space-y-3 hover:shadow-sm transition-shadow"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: `${color}15` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-xs text-muted leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <button
          onClick={onNext}
          className="text-sm text-brand hover:underline font-medium"
        >
          {isZh ? '已有账号，直接开始 →' : 'Already have an account? Start now →'}
        </button>
      </div>
    </div>
  );
}
