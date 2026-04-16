'use client';

import { Swords, Trophy, Star, Users, TrendingUp, RefreshCw } from 'lucide-react';

interface ArenaFlowProps {
  isZh: boolean;
}

const STEPS = [
  { icon: Swords, zh: '磨炼策略', en: 'Sharpen' },
  { icon: Trophy, zh: '参赛验证', en: 'Compete' },
  { icon: Star, zh: '胜出成星', en: 'Win' },
  { icon: Users, zh: '开放跟单', en: 'Copy Trade' },
  { icon: TrendingUp, zh: '用户获益', en: 'Users Profit' },
  { icon: RefreshCw, zh: '收益回流', en: 'Revenue Share' },
];

export function ArenaFlow({ isZh }: ArenaFlowProps) {
  return (
    <section>
      <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-2 text-center">
        {isZh ? '竞技生态闭环' : 'Arena Ecosystem Flow'}
      </h3>
      <p className="text-[var(--color-muted)] text-sm mb-10 text-center">
        {isZh
          ? '从策略到收益，完整闭环'
          : 'From strategy to revenue — a complete loop'}
      </p>

      <div className="relative flex items-center justify-between overflow-x-auto pb-4">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-[8%] right-[8%] h-px -translate-y-1/2 bg-gradient-to-r from-[var(--color-brand)]/40 via-[var(--color-brand)] to-[var(--color-brand)]/40" />

        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.en}
              className="relative z-10 flex flex-col items-center gap-2 min-w-[100px] flex-1"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl transition-shadow hover:shadow-[0_0_20px_var(--color-brand)/20]"
                style={{ animation: `arenaPulse ${3 + i * 0.5}s ease-in-out infinite` }}
              >
                <Icon className="h-7 w-7 text-[var(--color-brand)]" />
              </div>
              <span className="text-xs font-medium text-[var(--color-ink)] text-center leading-tight">
                {isZh ? step.zh : step.en}
              </span>
              {i < STEPS.length - 1 && (
                <span className="absolute top-8 -right-2 text-[var(--color-brand)] text-xs hidden sm:block">
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
