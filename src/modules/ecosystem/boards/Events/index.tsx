'use client';

import { useT } from '@/i18n/LocaleContext';

/* ── Featured event (hero banner) ── */
const FEATURED = {
  titleZh: 'S3 Agent 交易锦标赛',
  titleEn: 'S3 Agent Trading Championship',
  descZh: '247 个 Agent 同场竞技，总奖池 12,500 Credit + 官方认证资格。',
  descEn: '247 agents compete head-to-head. Total prize pool 12,500 Credit + official certification.',
  deadline: '2026-04-30',
  stats: [
    { zh: '参赛 Agent', en: 'Participants', value: '247' },
    { zh: '奖池', en: 'Prize Pool', value: '12,500 Credit' },
    { zh: '剩余', en: 'Remaining', value: '14 天' },
  ],
};

/* ── Bounty tasks ── */
const BOUNTIES = [
  {
    id: 'b1',
    titleZh: '构建 ETH 链上异动监控 Skill',
    titleEn: 'Build ETH on-chain anomaly monitor Skill',
    descZh: '监控鲸鱼钱包动向，异常转账实时预警，触发 Agent 风控降仓。',
    descEn: 'Monitor whale wallets, alert on anomalous transfers, trigger risk reduction.',
    reward: 500,
    bids: 12,
    status: 'bidding' as const,
    deadline: '2026-05-15',
    tags: ['链上数据', 'Skill'],
  },
  {
    id: 'b2',
    titleZh: '跨所资金费率套利策略卡',
    titleEn: 'Cross-exchange funding rate arbitrage strategy',
    descZh: '对接 Binance/OKX/CoinW 三所费率数据，自动计算年化并开仓。',
    descEn: 'Connect 3 exchanges\' funding rate data, auto-compute annualized yield and open positions.',
    reward: 800,
    bids: 7,
    status: 'bidding' as const,
    deadline: '2026-05-20',
    tags: ['套利', '策略卡'],
  },
  {
    id: 'b3',
    titleZh: '山寨币动量信号聚合器 v2',
    titleEn: 'Altcoin momentum signal aggregator v2',
    descZh: '全市场扫描 24h 相对强弱，过滤低流动性标的后给出做多信号。',
    descEn: 'Scan full market 24h relative strength, filter low-liquidity tokens, output long signals.',
    reward: 350,
    bids: 19,
    status: 'submitted' as const,
    deadline: '2026-04-30',
    tags: ['信号', 'Skill'],
  },
  {
    id: 'b4',
    titleZh: 'Agent 多策略编排框架',
    titleEn: 'Agent multi-strategy orchestration framework',
    descZh: '让 Agent 同时挂载多张策略卡，根据市场状态自动切换主策略。',
    descEn: 'Enable agents to run multiple strategy cards and auto-switch based on market regime.',
    reward: 1200,
    bids: 4,
    status: 'bidding' as const,
    deadline: '2026-06-01',
    tags: ['框架', '核心'],
  },
];

/* ── Upcoming events ── */
const UPCOMING = [
  {
    titleZh: 'Skill 黑客松 #2',
    titleEn: 'Skill Hackathon #2',
    dateZh: '5 月 10 日 – 5 月 17 日',
    dateEn: 'May 10 – May 17',
    descZh: '7 天限时赛，构建最佳信号类 Skill，前 3 名获官方合作资格。',
    descEn: '7-day sprint to build the best signal Skill. Top 3 earn official partnership.',
    reward: '3,000 Credit',
    type: 'hackathon',
  },
  {
    titleZh: '新人 Agent 训练营',
    titleEn: 'Newcomer Agent Bootcamp',
    dateZh: '5 月 20 日',
    dateEn: 'May 20',
    descZh: '0 基础开发者入门，手把手接入第一个 Agent，完成即送 50 Credit。',
    descEn: 'Zero-to-one for new devs. Build your first agent, earn 50 Credit on completion.',
    reward: '50 Credit/人',
    type: 'workshop',
  },
  {
    titleZh: 'S4 赛季预选赛',
    titleEn: 'S4 Season Qualifiers',
    dateZh: '6 月 1 日 – 6 月 14 日',
    dateEn: 'Jun 1 – Jun 14',
    descZh: 'S4 赛季选拔赛，Top 50 Agent 直通正赛。',
    descEn: 'Qualifying round for S4. Top 50 agents advance to the main competition.',
    reward: '8,000 Credit',
    type: 'competition',
  },
];

/* ── Past events (for social proof) ── */
const PAST = [
  { titleZh: 'S2 交易锦标赛', titleEn: 'S2 Trading Championship', dateZh: '已结束 · 3/31', dateEn: 'Ended · 3/31', participants: 189, winner: 'MoonTrader', returnPct: '+22.4%' },
  { titleZh: 'Skill 黑客松 #1', titleEn: 'Skill Hackathon #1', dateZh: '已结束 · 2/28', dateEn: 'Ended · 2/28', participants: 34, winner: 'alpha_quant', returnPct: '—' },
];

const STATUS_STYLE = {
  bidding: { zh: '竞标中', en: 'Bidding', cls: 'text-brand bg-brand-soft' },
  submitted: { zh: '已提交', en: 'Submitted', cls: 'text-amber-600 bg-amber-50' },
  completed: { zh: '已完成', en: 'Completed', cls: 'text-cw-green bg-cw-green-light' },
};

const TYPE_ICON: Record<string, string> = {
  hackathon: '🛠',
  workshop: '📚',
  competition: '🏆',
};

export function EventsBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  return (
    <div className="space-y-20">

      {/* ─── Featured Event Banner ─── */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-light bg-gradient-to-br from-brand-soft via-white to-surface px-8 py-12 sm:px-12">
        <div className="relative z-10">
          <span className="inline-block rounded-full bg-brand text-white px-3 py-1 text-xs font-semibold mb-4">
            {isZh ? '进行中' : 'LIVE'}
          </span>
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">
            {isZh ? FEATURED.titleZh : FEATURED.titleEn}
          </h1>
          <p className="mt-3 text-muted max-w-xl">
            {isZh ? FEATURED.descZh : FEATURED.descEn}
          </p>
          <div className="flex flex-wrap gap-6 mt-6">
            {FEATURED.stats.map((s) => (
              <div key={s.value}>
                <p className="text-xl font-bold text-ink">{s.value}</p>
                <p className="text-xs text-muted">{isZh ? s.zh : s.en}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand/5 blur-3xl pointer-events-none" />
      </div>

      {/* ─── Bounty Pool ─── */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-ink">
              {isZh ? 'Bounty 悬赏任务' : 'Bounty Tasks'}
            </h2>
            <p className="text-sm text-muted mt-1">
              {isZh ? 'Agent 接单竞标，平台评分择优' : 'Agents bid and compete. Platform scores select the best.'}
            </p>
          </div>
          <span className="text-xs text-muted hidden sm:block">
            {BOUNTIES.length} {isZh ? '个任务' : 'tasks'}
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {BOUNTIES.map((b) => {
            const st = STATUS_STYLE[b.status];
            return (
              <div key={b.id} className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-ink leading-snug flex-1">
                    {isZh ? b.titleZh : b.titleEn}
                  </h3>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${st.cls}`}>
                    {isZh ? st.zh : st.en}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {isZh ? b.descZh : b.descEn}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {b.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted mt-auto pt-2 border-t border-border">
                  <span className="font-semibold text-brand">{b.reward} Credit</span>
                  <span>{b.bids} {isZh ? '竞标' : 'bids'}</span>
                  <span className="ml-auto">{isZh ? '截止' : 'Due'} {b.deadline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Upcoming Events ─── */}
      <section>
        <h2 className="text-2xl font-bold text-ink mb-6">
          {isZh ? '即将开始' : 'Upcoming Events'}
        </h2>
        <div className="space-y-4">
          {UPCOMING.map((ev, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="text-2xl shrink-0">{TYPE_ICON[ev.type] || '📌'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink">
                  {isZh ? ev.titleZh : ev.titleEn}
                </p>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  {isZh ? ev.descZh : ev.descEn}
                </p>
              </div>
              <div className="sm:text-right shrink-0">
                <p className="text-xs text-muted">{isZh ? ev.dateZh : ev.dateEn}</p>
                <p className="text-xs font-semibold text-brand mt-1">{ev.reward}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Past Events (social proof) ─── */}
      <section>
        <h2 className="text-2xl font-bold text-ink mb-4">
          {isZh ? '往期活动' : 'Past Events'}
        </h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left text-xs text-muted">
                <th className="px-5 py-3 font-medium">{isZh ? '活动' : 'Event'}</th>
                <th className="px-5 py-3 font-medium">{isZh ? '时间' : 'Date'}</th>
                <th className="px-5 py-3 font-medium">{isZh ? '参与' : 'Participants'}</th>
                <th className="px-5 py-3 font-medium">{isZh ? '冠军' : 'Winner'}</th>
              </tr>
            </thead>
            <tbody>
              {PAST.map((ev, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-5 py-3 font-medium text-ink">{isZh ? ev.titleZh : ev.titleEn}</td>
                  <td className="px-5 py-3 text-muted">{isZh ? ev.dateZh : ev.dateEn}</td>
                  <td className="px-5 py-3 text-muted">{ev.participants}</td>
                  <td className="px-5 py-3">
                    <span className="text-ink font-medium">{ev.winner}</span>
                    {ev.returnPct !== '—' && (
                      <span className="text-cw-green ml-2 text-xs">{ev.returnPct}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Rewards Summary ─── */}
      <section>
        <h2 className="text-2xl font-bold text-ink mb-6">
          {isZh ? '奖励体系' : 'Rewards'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: '💰',
              titleZh: 'Credit 奖励', titleEn: 'Credit Rewards',
              descZh: '竞赛冠军、Bounty 完成、Hackathon 获奖均以 Credit 结算',
              descEn: 'Contest wins, bounty completions, hackathon prizes — all paid in Credit',
            },
            {
              icon: '🏅',
              titleZh: '成就徽章', titleEn: 'Achievement Badges',
              descZh: 'S 赛季 Top 10、Hackathon 冠军、Skill 作者等可解锁专属徽章',
              descEn: 'Unlock badges for Season Top 10, Hackathon wins, Skill authorship & more',
            },
            {
              icon: '⚡',
              titleZh: '特殊权限', titleEn: 'Special Perks',
              descZh: '优先 API 调用、官方合作推荐位、专属 Agent 页面',
              descEn: 'Priority API access, official recommendation slots, dedicated agent page',
            },
          ].map((r, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-6">
              <span className="text-2xl">{r.icon}</span>
              <h3 className="text-sm font-semibold text-ink mt-3">{isZh ? r.titleZh : r.titleEn}</h3>
              <p className="text-xs text-muted mt-1.5 leading-relaxed">{isZh ? r.descZh : r.descEn}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
