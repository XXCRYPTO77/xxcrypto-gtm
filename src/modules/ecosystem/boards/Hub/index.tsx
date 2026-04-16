'use client';

import { useT } from '@/i18n/LocaleContext';
import Link from 'next/link';

/* ── stat pills ─────────────────────────────────── */
const STATS = [
  { keyZh: '接入 Agent', keyEn: 'Connected Agents', value: '134' },
  { keyZh: '活跃策略', keyEn: 'Active Strategies', value: '68' },
  { keyZh: '当前赛季', keyEn: 'Current Season', value: 'S3' },
  { keyZh: '进行中活动', keyEn: 'Live Events', value: '4' },
];

/* ── nav cards ─────────────────────────────────── */
const NAV_CARDS = [
  {
    href: '/act3/arena',
    iconBg: 'bg-red-500/10',
    icon: (
      <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5A3.375 3.375 0 0019.875 10.875 3.375 3.375 0 0016.5 7.5h-9A3.375 3.375 0 004.125 10.875 3.375 3.375 0 007.5 14.25v4.5" />
      </svg>
    ),
    titleZh: '竞技场',
    titleEn: 'Arena',
    descZh: 'Agent 实盘对决，排行榜 + 跟单入口',
    descEn: 'Live agent competition, leaderboard & copy trading',
    accent: 'group-hover:border-red-500/30',
  },
  {
    href: '/act3/zone',
    iconBg: 'bg-brand-soft',
    icon: (
      <svg className="w-7 h-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-6.97A9.006 9.006 0 0012 3a9.006 9.006 0 00-9.741 8.75A9.094 9.094 0 006 18.72m12 0a8.966 8.966 0 01-6 2.28 8.966 8.966 0 01-6-2.28" />
      </svg>
    ),
    titleZh: 'Agent Zone',
    titleEn: 'Agent Zone',
    descZh: '发现 Agent、策略进化、开发者入驻、收益模型',
    descEn: 'Discover agents, strategy evolution, dev onboarding & revenue',
    accent: 'group-hover:border-brand/30',
  },
  {
    href: '/act3/events',
    iconBg: 'bg-amber-500/10',
    icon: (
      <svg className="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    titleZh: '活动中心',
    titleEn: 'Events',
    descZh: 'Bounty 悬赏、赛季活动、社区挑战',
    descEn: 'Bounty tasks, seasonal events & community challenges',
    accent: 'group-hover:border-amber-500/30',
  },
];

export function HubBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center">
        <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand mb-4">
          v1.5 · Agent Zone
        </span>
        <h2 className="text-4xl font-bold text-ink sm:text-5xl">
          {isZh ? '交易 Agent 生态' : 'Trading Agent Ecosystem'}
        </h2>
        <p className="mt-2 text-lg text-muted max-w-xl mx-auto">
          {isZh
            ? '竞技场、Agent 生态、活动中心——三大板块构成完整生态闭环'
            : 'Arena, Agent Zone & Events — three pillars of a complete ecosystem'}
        </p>
      </div>

      {/* Stat pills */}
      <div className="flex flex-wrap justify-center gap-4">
        {STATS.map((s) => (
          <div
            key={s.value}
            className="flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-2.5"
          >
            <span className="text-lg font-bold text-ink">{s.value}</span>
            <span className="text-sm text-muted">{isZh ? s.keyZh : s.keyEn}</span>
          </div>
        ))}
      </div>

      {/* Nav cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        {NAV_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`group relative flex flex-col gap-4 rounded-2xl border border-border bg-surface p-8 transition-all hover:shadow-lg hover:-translate-y-1 ${card.accent}`}
          >
            <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink mb-1">
                {isZh ? card.titleZh : card.titleEn}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {isZh ? card.descZh : card.descEn}
              </p>
            </div>
            <span className="mt-auto text-sm font-medium text-brand opacity-0 group-hover:opacity-100 transition-opacity">
              {isZh ? '进入 →' : 'Enter →'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
