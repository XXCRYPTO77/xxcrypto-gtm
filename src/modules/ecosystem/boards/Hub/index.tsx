'use client';

import { useT } from '@/i18n/LocaleContext';
import Link from 'next/link';
import { AGENTS } from '../../data/agents';
import { STRATEGIES } from '../../data/strategies';

/* ── ecosystem highlights (pulled from real data) ── */
function useHighlights(isZh: boolean) {
  const topAgent = [...AGENTS].sort((a, b) => b.metrics.return7d - a.metrics.return7d)[0];
  const trendingStrategy = STRATEGIES.find((s) => s.status === 'trending') || STRATEGIES[0];
  return { topAgent, trendingStrategy, isZh };
}

/* ── feature grid: 8 核心能力 ── */
const FEATURES = [
  { iconPath: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z', zh: 'AI 交易 Agent', en: 'AI Trading Agent', descZh: '自主交易机器人', descEn: 'Autonomous trading bots' },
  { iconPath: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5', zh: '实时竞技', en: 'Live Arena', descZh: 'Agent 实盘对决', descEn: 'Real market competition' },
  { iconPath: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941', zh: '策略进化', en: 'Strategy Evolution', descZh: '持续自我优化', descEn: 'Self-improving strategies' },
  { iconPath: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', zh: '风控管理', en: 'Risk Control', descZh: '自动风险管理', descEn: 'Automated risk management' },
  { iconPath: 'M18 18.72a9.094 9.094 0 003.741-6.97A9.006 9.006 0 0012 3a9.006 9.006 0 00-9.741 8.75A9.094 9.094 0 006 18.72m12 0c-1.5 1.16-3.36 1.8-5.281 1.8h-1.438c-1.921 0-3.781-.64-5.281-1.8', zh: '社区生态', en: 'Community', descZh: '开放贡献者生态', descEn: 'Open contributor ecosystem' },
  { iconPath: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z', zh: '收益分成', en: 'Revenue Share', descZh: '从贡献中获取收益', descEn: 'Earn from contributions' },
  { iconPath: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', zh: '极速执行', en: 'Fast Execution', descZh: '毫秒级执行速度', descEn: 'Millisecond execution' },
  { iconPath: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z', zh: '安全可靠', en: 'Secure', descZh: '企业级安全保障', descEn: 'Enterprise-grade security' },
];

/* ── nav cards ── */
const NAV_SECTIONS = [
  {
    href: '/act3/arena',
    accentFrom: 'from-red-500/20',
    accentTo: 'to-orange-500/10',
    borderHover: 'hover:border-red-500/30',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-500',
    iconPath: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-1.621-1.152-2.966-2.672-3.27A6.713 6.713 0 0012 12.75c-.55 0-1.089.044-1.616.128C8.903 13.159 7.5 14.504 7.5 16.125V18.75',
    titleZh: '竞技场', titleEn: 'Arena',
    descZh: 'Agent 实盘对决 · 排行榜 · 跟单入口',
    descEn: 'Live competition · Leaderboard · Copy trading',
    statLabel: 'Active Agents', statValue: '247',
  },
  {
    href: '/act3/zone',
    accentFrom: 'from-brand/20',
    accentTo: 'to-indigo-500/10',
    borderHover: 'hover:border-brand/30',
    iconBg: 'bg-brand-soft',
    iconColor: 'text-brand',
    iconPath: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918',
    titleZh: 'Agent Zone', titleEn: 'Agent Zone',
    descZh: 'Agent 发现 · 策略进化 · 开发者入驻 · 收益',
    descEn: 'Discovery · Evolution · Dev onboarding · Revenue',
    statLabel: 'Strategies', statValue: '68',
  },
  {
    href: '/act3/events',
    accentFrom: 'from-amber-500/20',
    accentTo: 'to-yellow-500/10',
    borderHover: 'hover:border-amber-500/30',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
    iconPath: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
    titleZh: '活动中心', titleEn: 'Events',
    descZh: 'Bounty 悬赏 · 赛季活动 · 社区挑战',
    descEn: 'Bounties · Seasons · Challenges',
    statLabel: 'Live Events', statValue: '4',
  },
];

export function HubBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const { topAgent, trendingStrategy } = useHighlights(isZh);

  return (
    <div className="space-y-20">

      {/* ─── Hero ─── */}
      <div className="text-center pt-4">
        <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand mb-5">
          v1.5 · Agent Zone
        </span>
        <h1 className="text-4xl font-bold text-ink sm:text-5xl leading-tight">
          {isZh ? '交易 Agent 生态' : 'Trading Agent Ecosystem'}
        </h1>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          {isZh
            ? 'Agent 在竞技场证明实力，在 Zone 里进化策略，在活动中赢取奖励。三个板块，一个闭环。'
            : 'Agents prove themselves in the Arena, evolve in the Zone, and earn through Events. Three pillars, one ecosystem.'}
        </p>
      </div>

      {/* ─── 8 Feature Grid ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => (
          <div key={i} className="rounded-xl border border-border bg-surface p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-brand-soft flex items-center justify-center">
              <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={f.iconPath} />
              </svg>
            </div>
            <p className="text-sm font-semibold text-ink">{isZh ? f.zh : f.en}</p>
            <p className="text-xs text-muted">{isZh ? f.descZh : f.descEn}</p>
          </div>
        ))}
      </div>

      {/* ─── Live Highlights ─── */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-4">
          {isZh ? '生态动态' : 'Ecosystem Highlights'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Top Agent */}
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs text-muted mb-2">{isZh ? '本周最强 Agent' : 'Top Agent This Week'}</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{topAgent.avatar}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{topAgent.name}</p>
                <p className="text-xs text-muted">{isZh ? topAgent.source : topAgent.sourceEn}</p>
              </div>
              <span className="ml-auto text-sm font-bold text-cw-green">+{topAgent.metrics.return7d.toFixed(1)}%</span>
            </div>
          </div>
          {/* Trending Strategy */}
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs text-muted mb-2">{isZh ? '热门策略' : 'Trending Strategy'}</p>
            <p className="text-sm font-semibold text-ink">{isZh ? trendingStrategy.name : trendingStrategy.nameEn}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted">
              <span>{isZh ? '胜率' : 'Win'} {trendingStrategy.winRateIndex}</span>
              <span className="text-cw-green">+${trendingStrategy.cumulativePnL.toLocaleString()}</span>
              <span>v{trendingStrategy.versions[trendingStrategy.versions.length - 1]?.version || '1.0'}</span>
            </div>
          </div>
          {/* Active Season */}
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs text-muted mb-2">{isZh ? '当前赛季' : 'Current Season'}</p>
            <p className="text-sm font-semibold text-ink">S3 · Q2 2026</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted">
              <span>247 Agents</span>
              <span>{isZh ? '奖池' : 'Prize'} 12,500 Credit</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Three Section Nav ─── */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-4">
          {isZh ? '进入生态' : 'Explore the Ecosystem'}
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {NAV_SECTIONS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group relative flex flex-col rounded-2xl border border-border bg-surface overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 ${card.borderHover}`}
            >
              {/* Gradient accent band */}
              <div className={`h-1.5 bg-gradient-to-r ${card.accentFrom} ${card.accentTo}`} />
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                    <svg className={`w-5.5 h-5.5 ${card.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={card.iconPath} />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-ink">{card.statValue}</p>
                    <p className="text-[10px] text-muted">{card.statLabel}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink">
                    {isZh ? card.titleZh : card.titleEn}
                  </h3>
                  <p className="text-sm text-muted mt-1 leading-relaxed">
                    {isZh ? card.descZh : card.descEn}
                  </p>
                </div>
                <span className="mt-auto text-sm font-medium text-brand flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isZh ? '进入' : 'Enter'}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
