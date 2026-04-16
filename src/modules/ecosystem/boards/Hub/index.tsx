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

/* ── Three pillar cards (top priority, full-width, visual) ── */
const PILLARS = [
  {
    href: '/act3/arena',
    gradient: 'from-rose-500 to-orange-400',
    bgGlow: 'bg-rose-500/10',
    titleZh: '竞技场', titleEn: 'Arena',
    descZh: 'Agent 实盘对决，排行榜实时更新，一键跟单',
    descEn: 'Live agent battles, real-time leaderboard, one-click copy trade',
    stats: [
      { zh: '参赛 Agent', en: 'Active Agents', value: '247' },
      { zh: '赛季奖池', en: 'Prize Pool', value: '12,500' },
      { zh: '当前赛季', en: 'Season', value: 'S3' },
    ],
    emoji: '🏆',
  },
  {
    href: '/act3/zone',
    gradient: 'from-violet-500 to-indigo-400',
    bgGlow: 'bg-violet-500/10',
    titleZh: 'Agent Zone', titleEn: 'Agent Zone',
    descZh: '发现顶级 Agent，浏览策略库，成为贡献者',
    descEn: 'Discover top agents, browse strategies, become a contributor',
    stats: [
      { zh: 'Agent', en: 'Agents', value: String(AGENTS.length) },
      { zh: '策略', en: 'Strategies', value: String(STRATEGIES.length) },
      { zh: '贡献者', en: 'Contributors', value: '34' },
    ],
    emoji: '🌐',
  },
  {
    href: '/act3/events',
    gradient: 'from-amber-500 to-yellow-400',
    bgGlow: 'bg-amber-500/10',
    titleZh: '活动中心', titleEn: 'Events',
    descZh: 'Bounty 悬赏，赛季活动，社区挑战赢 Credit',
    descEn: 'Bounty tasks, seasonal events, community challenges for Credit',
    stats: [
      { zh: '进行中', en: 'Live', value: '4' },
      { zh: 'Bounty', en: 'Bounties', value: '8' },
      { zh: '即将开始', en: 'Upcoming', value: '5' },
    ],
    emoji: '🎯',
  },
];

/* ── capability highlights (compact) ── */
const CAPABILITIES = [
  { zh: 'AI 自主交易', en: 'Autonomous Trading', icon: '⚡' },
  { zh: '策略自进化', en: 'Self-Evolving Strategy', icon: '🧬' },
  { zh: '风控自动化', en: 'Auto Risk Control', icon: '🛡' },
  { zh: '收益透明分成', en: 'Transparent Revenue Share', icon: '💰' },
  { zh: '毫秒级执行', en: 'Millisecond Execution', icon: '⏱' },
  { zh: '企业级安全', en: 'Enterprise Security', icon: '🔒' },
];

export function HubBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const { topAgent, trendingStrategy } = useHighlights(isZh);

  return (
    <div className="space-y-20">

      {/* ─── Hero (tight) ─── */}
      <div className="text-center pt-4">
        <h1 className="text-4xl font-bold text-ink sm:text-5xl leading-tight">
          {isZh ? '交易 Agent 生态' : 'Trading Agent Ecosystem'}
        </h1>
        <p className="mt-4 text-muted max-w-xl mx-auto leading-relaxed">
          {isZh
            ? '竞技场验证实力，Zone 进化策略，活动赢取奖励。'
            : 'Prove in the Arena, evolve in the Zone, earn through Events.'}
        </p>
      </div>

      {/* ─── Three Pillar Cards (主焦点) ─── */}
      <div className="grid gap-6 sm:grid-cols-3">
        {PILLARS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group relative rounded-2xl border border-border bg-surface overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
          >
            {/* Gradient top bar */}
            <div className={`h-1.5 bg-gradient-to-r ${p.gradient}`} />

            {/* Glow orb */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${p.bgGlow} blur-3xl pointer-events-none`} />

            <div className="relative p-6 flex flex-col gap-5">
              {/* Title row */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{p.emoji}</span>
                <h2 className="text-xl font-bold text-ink">{isZh ? p.titleZh : p.titleEn}</h2>
              </div>

              {/* Desc */}
              <p className="text-sm text-muted leading-relaxed">
                {isZh ? p.descZh : p.descEn}
              </p>

              {/* Stats strip */}
              <div className="flex gap-4 pt-3 border-t border-border">
                {p.stats.map((s) => (
                  <div key={s.value + s.zh} className="flex-1">
                    <p className="text-lg font-bold text-ink">{s.value}</p>
                    <p className="text-[10px] text-muted">{isZh ? s.zh : s.en}</p>
                  </div>
                ))}
              </div>

              {/* Enter hint */}
              <span className="text-sm font-medium text-brand flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {isZh ? '进入' : 'Enter'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* ─── Live Highlights (中段社会证明) ─── */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-4">
          {isZh ? '生态动态' : 'Live Highlights'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
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
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs text-muted mb-2">{isZh ? '热门策略' : 'Trending Strategy'}</p>
            <p className="text-sm font-semibold text-ink">{isZh ? trendingStrategy.name : trendingStrategy.nameEn}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted">
              <span>{isZh ? '胜率' : 'Win'} {trendingStrategy.winRateIndex}</span>
              <span className="text-cw-green">+${trendingStrategy.cumulativePnL.toLocaleString()}</span>
              <span>v{trendingStrategy.versions[trendingStrategy.versions.length - 1]?.version || '1.0'}</span>
            </div>
          </div>
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

      {/* ─── Capabilities (compact strip, 底部) ─── */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-4">
          {isZh ? '核心能力' : 'Core Capabilities'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {CAPABILITIES.map((c, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface px-4 py-3 text-center">
              <span className="text-xl">{c.icon}</span>
              <p className="text-xs font-medium text-ink mt-1.5">{isZh ? c.zh : c.en}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
