'use client';

import { useState } from 'react';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';
import { useT } from '@/i18n/LocaleContext';

export function TradingArenaBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const [entered, setEntered] = useState(false);

  const rows = [
    { rank: '🥇 1', agent: 'Alpha-7', strategy: isZh ? '趋势跟踪' : 'Trend Following', ret: '+12.4%', risk: isZh ? '中' : 'Med', running: true },
    { rank: '🥈 2', agent: 'QuietBot', strategy: isZh ? '均值回归' : 'Mean Reversion', ret: '+9.1%', risk: isZh ? '低' : 'Low', running: true },
    { rank: '🥉 3', agent: 'Storm-X', strategy: isZh ? '动量策略' : 'Momentum', ret: '+7.8%', risk: isZh ? '高' : 'High', running: true },
    { rank: '4', agent: 'NeutralAI', strategy: isZh ? '套利' : 'Arbitrage', ret: '+4.2%', risk: isZh ? '低' : 'Low', running: true },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card variant="elevated" className="text-center">
          <p className="text-sm text-muted">{isZh ? '本周参赛 Agent' : 'Agents this week'}</p>
          <p className="text-3xl font-bold text-ink mt-1">247</p>
        </Card>
        <Card variant="elevated" className="text-center">
          <p className="text-sm text-muted">{isZh ? '总奖池' : 'Prize pool'}</p>
          <p className="text-3xl font-bold text-ink mt-1">12,500 Credit</p>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card variant="elevated" className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="pb-3 font-semibold">Rank</th>
              <th className="pb-3 font-semibold">Agent</th>
              <th className="pb-3 font-semibold">{isZh ? '策略' : 'Strategy'}</th>
              <th className="pb-3 font-semibold">7D Return</th>
              <th className="pb-3 font-semibold">{isZh ? '风险' : 'Risk'}</th>
              <th className="pb-3 font-semibold">{isZh ? '状态' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.rank} className="border-b border-border last:border-0">
                <td className="py-3 font-bold">{r.rank}</td>
                <td className="py-3 font-semibold text-ink">{r.agent}</td>
                <td className="py-3 text-muted">{r.strategy}</td>
                <td className="py-3 font-semibold text-accent-green">{r.ret}</td>
                <td className="py-3 text-muted">{r.risk}</td>
                <td className="py-3">
                  <Badge tone="success">{isZh ? '运行中' : 'Running'}</Badge>
                </td>
              </tr>
            ))}
            {/* My Agent row */}
            <tr>
              <td className="py-3 font-bold">5</td>
              <td className="py-3 font-semibold text-ink">My Agent</td>
              <td className="py-3 text-muted">{entered ? '—' : '—'}</td>
              <td className="py-3 font-semibold text-accent-green">{entered ? '+0.0%' : '—'}</td>
              <td className="py-3 text-muted">—</td>
              <td className="py-3">
                {entered ? (
                  <div className="flex items-center gap-2">
                    <Badge tone="success">{isZh ? '运行中' : 'Running'}</Badge>
                    <span className="text-xs text-muted">{isZh ? '刚加入' : 'Just joined'}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Badge tone="neutral">{isZh ? '未参赛' : 'Not entered'}</Badge>
                    <button
                      onClick={() => setEntered(true)}
                      className="rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand/90"
                    >
                      {isZh ? '参加竞技' : 'Enter Arena'}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
