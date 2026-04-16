'use client';

import { Badge } from '@/components/primitives/Badge';
import { ShieldCheck, Trophy } from 'lucide-react';

interface ContributorRankProps {
  isZh: boolean;
}

const TOP_CONTRIBUTORS = [
  { rank: 1, name: 'risk_quant',  verified: true,  strategies: 3, cumPnL: 67400, monthlyCalls: 3410 },
  { rank: 2, name: 'alpha_quant', verified: true,  strategies: 2, cumPnL: 48200, monthlyCalls: 1240 },
  { rank: 3, name: 'arb_master',  verified: true,  strategies: 1, cumPnL: 31500, monthlyCalls: 843  },
  { rank: 4, name: 'grid_pro',    verified: true,  strategies: 2, cumPnL: 28900, monthlyCalls: 5620 },
  { rank: 5, name: 'signal_lab',  verified: false, strategies: 1, cumPnL: 19800, monthlyCalls: 2180 },
];

const RANK_COLORS = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];

export function ContributorRank({ isZh }: ContributorRankProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {TOP_CONTRIBUTORS.map((c) => (
        <div
          key={c.rank}
          className="rounded-2xl p-5 bg-surface border border-border hover:shadow-[0_0_24px_rgba(82,39,255,0.2)] hover:border-[rgba(82,39,255,0.3)] transition-all duration-300"
        >
          {/* Rank + Name */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-page flex items-center justify-center">
              {c.rank <= 3 ? (
                <Trophy className={`h-4 w-4 ${RANK_COLORS[c.rank - 1]}`} />
              ) : (
                <span className="text-sm font-bold text-muted">{c.rank}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-ink">{c.name}</span>
              {c.verified && (
                <Badge tone="brand" className="text-[10px] px-1.5 py-0.5 whitespace-nowrap">
                  <ShieldCheck className="h-3 w-3" />
                </Badge>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-xs border-t border-border pt-3">
            <div>
              <div className="text-ink font-semibold">{c.strategies}</div>
              <div className="text-muted">{isZh ? '策略' : 'Strategies'}</div>
            </div>
            <div>
              <div className="text-cw-green font-semibold">+${c.cumPnL.toLocaleString()}</div>
              <div className="text-muted">PnL</div>
            </div>
            <div>
              <div className="text-ink font-semibold">{c.monthlyCalls.toLocaleString()}</div>
              <div className="text-muted">{isZh ? '月调用' : 'Monthly'}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
