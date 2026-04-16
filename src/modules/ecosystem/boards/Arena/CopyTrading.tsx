'use client';

import { Copy, Users } from 'lucide-react';

interface CopyTradingProps {
  isZh: boolean;
}

const AGENTS = [
  { name: 'AlphaBot', emoji: '🤖', return30d: 18.4, followers: 1240, bars: [3, 5, 4, 7, 6, 8, 7] },
  { name: 'GridMaster', emoji: '📊', return30d: 12.7, followers: 890, bars: [2, 4, 3, 5, 4, 6, 5] },
  { name: 'TrendHunter', emoji: '🎯', return30d: 24.1, followers: 2100, bars: [4, 6, 8, 7, 9, 8, 10] },
  { name: 'RiskGuard', emoji: '🛡️', return30d: 8.3, followers: 560, bars: [5, 4, 5, 4, 5, 6, 5] },
];

function Sparkline({ bars }: { bars: number[] }) {
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-[3px] h-8">
      {bars.map((v, i) => (
        <div
          key={i}
          className="w-[5px] rounded-sm bg-[var(--color-brand)]"
          style={{
            height: `${(v / max) * 100}%`,
            opacity: 0.5 + (v / max) * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export function CopyTrading({ isZh }: CopyTradingProps) {
  return (
    <section>
      <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-2">
        {isZh ? '明星跟单' : 'Copy Trading'}
      </h3>
      <p className="text-[var(--color-muted)] text-sm mb-6">
        {isZh
          ? '一键跟单顶尖 Agent，轻松获益'
          : 'One-click copy top-performing agents'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {AGENTS.map((agent) => (
          <div
            key={agent.name}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-[0_0_30px_var(--color-brand)/15]"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{agent.emoji}</span>
              <div>
                <div className="font-semibold text-[var(--color-ink)] text-sm">
                  {agent.name}
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                  <Users className="h-3 w-3" />
                  {agent.followers.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="text-3xl font-bold text-cw-green">
              +{agent.return30d}%
            </div>
            <div className="text-xs text-[var(--color-muted)]">
              {isZh ? '30日收益' : '30D Return'}
            </div>

            <Sparkline bars={agent.bars} />

            <button
              onClick={() =>
                alert(isZh ? '功能即将上线' : 'Coming soon')
              }
              className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              <Copy className="h-4 w-4" />
              {isZh ? '跟单' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
