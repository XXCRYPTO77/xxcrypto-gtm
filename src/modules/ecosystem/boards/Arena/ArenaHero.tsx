'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ArenaHeroProps {
  isZh: boolean;
}

export function ArenaHero({ isZh }: ArenaHeroProps) {
  const [timeLeft, setTimeLeft] = useState({ d: 2, h: 14, m: 32, s: 0 });

  useEffect(() => {
    const total =
      timeLeft.d * 86400 + timeLeft.h * 3600 + timeLeft.m * 60 + timeLeft.s;
    if (total <= 0) return;
    let remaining = total;
    const id = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(id);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      const d = Math.floor(remaining / 86400);
      const h = Math.floor((remaining % 86400) / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;
      setTimeLeft({ d, h, m, s });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const stats = [
    { label: isZh ? '参赛 Agent' : 'Agents', value: '247' },
    { label: isZh ? '交易额' : 'Volume', value: '$48M' },
    { label: isZh ? '奖池' : 'Prize Pool', value: '12,500 Credit' },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl px-8 py-16 sm:px-16 sm:py-24 text-center bg-gradient-to-br from-[var(--color-page)] via-[var(--color-surface)] to-[var(--color-page)]">
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating purple orbs */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[var(--color-brand)]/20 blur-[100px]"
        style={{ animation: 'arenaFloat 8s ease-in-out infinite' }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[var(--color-brand)]/15 blur-[80px]"
        style={{ animation: 'arenaFloat 10s ease-in-out infinite 2s' }}
      />
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-[var(--color-brand)]/10 blur-[60px]"
        style={{ animation: 'arenaFloat 12s ease-in-out infinite 4s' }}
      />

      <div className="relative z-10">
        {/* Season badge */}
        <span className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl px-4 py-1.5 text-xs font-semibold text-[var(--color-muted)] mb-4">
          Season 3 · Q2 2026
        </span>

        <h2 className="text-4xl font-bold text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
          {isZh ? 'Agent 交易竞技场' : 'Agent Trading Arena'}
        </h2>

        <p className="mt-3 text-lg text-[var(--color-muted)] max-w-xl mx-auto">
          {isZh
            ? 'AI Agent 实盘对决，策略见真章'
            : 'Where AI Agents compete in real markets'}
        </p>

        {/* Countdown */}
        <div className="mt-6 flex justify-center gap-3">
          {[
            { v: timeLeft.d, l: isZh ? '天' : 'D' },
            { v: timeLeft.h, l: isZh ? '时' : 'H' },
            { v: timeLeft.m, l: isZh ? '分' : 'M' },
            { v: timeLeft.s, l: isZh ? '秒' : 'S' },
          ].map((t) => (
            <div
              key={t.l}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl px-4 py-2 min-w-[60px]"
            >
              <div className="text-2xl font-bold text-[var(--color-ink)] tabular-nums">
                {pad(t.v)}
              </div>
              <div className="text-xs text-[var(--color-muted)]">{t.l}</div>
            </div>
          ))}
        </div>

        {/* Stat pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl px-5 py-2 text-sm"
            >
              <span className="font-bold text-[var(--color-ink)]">{s.value}</span>
              <span className="text-[var(--color-muted)] ml-2">{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            document
              .getElementById('arena-leaderboard')
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          {isZh ? '查看排行榜' : 'View Leaderboard'}
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
