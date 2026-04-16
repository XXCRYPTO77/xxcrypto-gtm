'use client';

import { useT } from '@/i18n/LocaleContext';

/* ── mock bounty data ──────────────────────────── */
const BOUNTIES = [
  {
    id: 'b1',
    titleZh: '构建 ETH 链上异动监控 Skill',
    titleEn: 'Build ETH on-chain anomaly monitor Skill',
    reward: 500,
    bids: 12,
    status: 'bidding' as const,
    deadline: '2026-05-15',
  },
  {
    id: 'b2',
    titleZh: '跨所资金费率套利策略卡',
    titleEn: 'Cross-exchange funding rate arbitrage strategy',
    reward: 800,
    bids: 7,
    status: 'bidding' as const,
    deadline: '2026-05-20',
  },
  {
    id: 'b3',
    titleZh: '山寨币动量信号聚合器 v2',
    titleEn: 'Altcoin momentum signal aggregator v2',
    reward: 350,
    bids: 19,
    status: 'submitted' as const,
    deadline: '2026-04-30',
  },
];

const EVENTS_TIMELINE = [
  {
    titleZh: 'S3 Agent 交易锦标赛',
    titleEn: 'S3 Agent Trading Championship',
    dateZh: '进行中 · 截止 4/30',
    dateEn: 'Live · ends 4/30',
    type: 'active' as const,
  },
  {
    titleZh: 'Skill 黑客松 #2',
    titleEn: 'Skill Hackathon #2',
    dateZh: '即将开始 · 5/10',
    dateEn: 'Upcoming · 5/10',
    type: 'upcoming' as const,
  },
  {
    titleZh: 'S2 结算 + 奖金发放',
    titleEn: 'S2 Settlement & Rewards',
    dateZh: '已结束 · 3/31',
    dateEn: 'Ended · 3/31',
    type: 'ended' as const,
  },
];

const STATUS_MAP = {
  bidding: { zh: '竞标中', en: 'Bidding', color: 'text-brand bg-brand-soft' },
  submitted: { zh: '已提交', en: 'Submitted', color: 'text-amber-600 bg-amber-50' },
  completed: { zh: '已完成', en: 'Completed', color: 'text-cw-green bg-cw-green-light' },
};

const TYPE_DOT = {
  active: 'bg-cw-green',
  upcoming: 'bg-brand',
  ended: 'bg-gray-400',
};

export function EventsBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  return (
    <div className="space-y-20">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {isZh ? '活动中心' : 'Events'}
        </h2>
        <p className="mt-2 text-muted max-w-lg mx-auto">
          {isZh
            ? 'Bounty 悬赏、赛季活动、社区挑战'
            : 'Bounty tasks, seasonal events & community challenges'}
        </p>
      </div>

      {/* Bounty Pool */}
      <section>
        <h3 className="text-2xl font-bold text-ink mb-6">
          {isZh ? 'Bounty 悬赏任务' : 'Bounty Tasks'}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BOUNTIES.map((b) => {
            const st = STATUS_MAP[b.status];
            return (
              <div
                key={b.id}
                className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-ink leading-snug">
                    {isZh ? b.titleZh : b.titleEn}
                  </h4>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}>
                    {isZh ? st.zh : st.en}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted mt-auto">
                  <span className="font-semibold text-brand">{b.reward} Credit</span>
                  <span>{b.bids} {isZh ? '竞标' : 'bids'}</span>
                  <span>{isZh ? '截止' : 'Due'} {b.deadline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Event Timeline */}
      <section>
        <h3 className="text-2xl font-bold text-ink mb-6">
          {isZh ? '活动日历' : 'Event Calendar'}
        </h3>
        <div className="space-y-3">
          {EVENTS_TIMELINE.map((ev, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-border bg-surface px-6 py-4"
            >
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${TYPE_DOT[ev.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink truncate">
                  {isZh ? ev.titleZh : ev.titleEn}
                </p>
              </div>
              <span className="text-xs text-muted shrink-0">
                {isZh ? ev.dateZh : ev.dateEn}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards Overview placeholder */}
      <section className="rounded-2xl border border-dashed border-border bg-surface/50 p-12 text-center">
        <p className="text-lg font-semibold text-ink mb-2">
          {isZh ? '奖励总览' : 'Rewards Overview'}
        </p>
        <p className="text-sm text-muted">
          {isZh ? 'Credit 奖励、成就徽章、特殊权限 — 即将上线' : 'Credits, badges & perks — coming soon'}
        </p>
      </section>
    </div>
  );
}
