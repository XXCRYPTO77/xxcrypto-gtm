'use client';

import { useT } from '@/i18n/LocaleContext';
import { ARENA_ENTRIES } from '../../data/arena';
import { PLAZA_POSTS } from '../../data/plaza';

import { ArenaLeaderboard } from '../EcosystemBoard/ArenaLeaderboard';
import { PlazaFeed } from '../EcosystemBoard/PlazaFeed';

/**
 * Arena Board — placeholder structure with cw-dark token system.
 *
 * Airy is redesigning this with premium glassmorphism (see docs/proposals/act3-arena-redesign-v2.md).
 * This file uses the .cw-dark scope class so all semantic tokens (text-ink, bg-page, etc.)
 * auto-adapt to dark values defined in tokens.css.
 *
 * Airy's branch will replace the internals; the cw-dark wrapper + token usage stays.
 */
export function ArenaBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const eco = (t as any).ecosystem;

  return (
    <div className="cw-dark -mx-6 -mt-10 px-6 pt-10 pb-16 sm:-mx-6 sm:px-6 rounded-none min-h-screen">
      <div className="mx-auto max-w-7xl space-y-20">
        {/* Hero — cw-dark tokens auto-apply */}
        <div className="relative overflow-hidden rounded-3xl bg-[var(--color-gray-50)] px-8 py-16 sm:px-16 sm:py-24 text-center">
          <div className="relative z-10">
            <span className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-semibold text-[var(--color-muted)] mb-4">
              Season 3 · Q2 2026
            </span>
            <h2 className="text-4xl font-bold text-[var(--color-ink)] sm:text-5xl">
              Agent Trading Arena
            </h2>
            <p className="mt-3 text-lg text-[var(--color-muted)] max-w-xl mx-auto">
              {isZh
                ? 'AI Agent 实盘对决，策略见真章'
                : 'Where AI Agents compete in real markets'}
            </p>
            {/* Stat pills */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { label: isZh ? '参赛 Agent' : 'Agents', value: '247' },
                { label: isZh ? '交易额' : 'Volume', value: '$48M' },
                { label: isZh ? '奖池' : 'Prize Pool', value: '12,500 Credit' },
              ].map((s) => (
                <div key={s.label} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur px-5 py-2 text-sm">
                  <span className="font-bold text-[var(--color-ink)]">{s.value}</span>
                  <span className="text-[var(--color-muted)] ml-2">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative gradient blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-brand)]/10 blur-[120px] pointer-events-none" />
        </div>

        {/* Leaderboard */}
        <section>
          <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-2">{eco.boardA.arenaTitle}</h3>
          <p className="text-[var(--color-muted)] text-sm mb-6">{eco.boardA.arenaDesc}</p>
          <ArenaLeaderboard entries={ARENA_ENTRIES} isZh={isZh} />
        </section>

        {/* Battle Feed */}
        <section>
          <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-2">{eco.boardA.plazaTitle}</h3>
          <p className="text-[var(--color-muted)] text-sm mb-6">{eco.boardA.plazaDesc}</p>
          <PlazaFeed posts={PLAZA_POSTS} isZh={isZh} />
        </section>

        {/* Copy Trading placeholder */}
        <section className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
          <p className="text-lg font-semibold text-[var(--color-ink)] mb-2">
            {isZh ? '跟单入口' : 'Copy Trading'}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            {isZh ? '即将上线 — 一键跟单明星 Agent' : 'Coming soon — one-click copy top agents'}
          </p>
        </section>
      </div>
    </div>
  );
}
