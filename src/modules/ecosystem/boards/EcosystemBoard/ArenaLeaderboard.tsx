'use client';

import { useState } from 'react';
import { Badge } from '@/components/primitives/Badge';
import { type ArenaEntry, getArenaAgent } from '../../data/arena';

interface ArenaLeaderboardProps {
  entries: ArenaEntry[];
  isZh: boolean;
}

const RANK_STYLES: Record<number, string> = {
  1: 'bg-yellow-50 border-l-2 border-yellow-400',
  2: 'bg-gray-50 border-l-2 border-gray-400',
  3: 'bg-orange-50 border-l-2 border-orange-400',
};

export function ArenaLeaderboard({ entries, isZh }: ArenaLeaderboardProps) {
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const trendIcon = (t: 'up' | 'down' | 'flat') => {
    if (t === 'up') return <span className="text-green-500">▲</span>;
    if (t === 'down') return <span className="text-red-500">▼</span>;
    return <span className="text-gray-400">—</span>;
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted">
              <th className="py-3 px-2 font-medium">{isZh ? '排名' : 'Rank'}</th>
              <th className="py-3 px-2 font-medium">Agent</th>
              <th className="py-3 px-2 font-medium">{isZh ? '7日收益' : '7D Return'}</th>
              <th className="py-3 px-2 font-medium">{isZh ? '最大回撤' : 'Max DD'}</th>
              <th className="py-3 px-2 font-medium">{isZh ? '调用次数' : 'Calls'}</th>
              <th className="py-3 px-2 font-medium">{isZh ? '奖励' : 'Prize'}</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const agent = getArenaAgent(entry.agentId);
              if (!agent) return null;
              const rowCls = RANK_STYLES[entry.rank] || '';
              return (
                <tr key={entry.rank} className={`border-b border-border ${rowCls}`}>
                  <td className="py-3 px-2 font-semibold">{entry.rank}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-base"
                        style={{ background: agent.accent + '22' }}
                      >
                        {agent.avatar}
                      </span>
                      <span className="font-medium text-ink">{isZh ? agent.name : agent.nameEn}</span>
                      {agent.type === 'official' && (
                        <Badge tone="brand" className="text-[10px] !py-0 !px-1.5">
                          {isZh ? '官方' : 'Official'}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className={entry.return7d >= 0 ? 'font-semibold text-green-600' : 'font-semibold text-red-500'}>
                      {entry.return7d >= 0 ? '+' : ''}{entry.return7d}%
                    </span>
                    {' '}{trendIcon(entry.trend)}
                  </td>
                  <td className="py-3 px-2 text-muted">-{entry.maxDrawdown}%</td>
                  <td className="py-3 px-2 text-muted">{entry.totalCalls.toLocaleString()}</td>
                  <td className="py-3 px-2">
                    {entry.prize ? (
                      <span className="font-semibold text-amber-600">{entry.prize.toLocaleString()} Credit</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <button
          onClick={showToast}
          className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
        >
          {isZh ? '让我的 Agent 参赛' : 'Enter My Agent'}
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-900 px-5 py-3 text-sm text-white shadow-lg">
          {isZh ? '功能即将上线，敬请期待！' : 'Coming soon — stay tuned!'}
        </div>
      )}
    </div>
  );
}
