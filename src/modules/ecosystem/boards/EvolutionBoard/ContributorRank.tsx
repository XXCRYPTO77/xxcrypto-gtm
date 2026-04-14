'use client';

import { Card } from '@/components/primitives/Card';
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
    <Card variant="elevated">
      <div className="space-y-3">
        {TOP_CONTRIBUTORS.map((c) => (
          <div
            key={c.rank}
            className="flex items-center gap-4 py-2 border-b border-border last:border-0"
          >
            {/* Rank */}
            <div className="flex-shrink-0 w-8 text-center">
              {c.rank <= 3 ? (
                <Trophy className={`h-5 w-5 mx-auto ${RANK_COLORS[c.rank - 1]}`} />
              ) : (
                <span className="text-sm font-bold text-muted">{c.rank}</span>
              )}
            </div>

            {/* Name + verified */}
            <div className="flex items-center gap-1.5 min-w-[120px]">
              <span className="text-sm font-semibold text-ink">{c.name}</span>
              {c.verified && (
                <Badge tone="brand" className="text-[10px] px-1.5 py-0.5">
                  <ShieldCheck className="h-3 w-3" />
                  {isZh ? '认证' : 'Verified'}
                </Badge>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 ml-auto text-xs text-muted">
              <span>
                {isZh ? '策略' : 'Strategies'}: <span className="text-ink font-medium">{c.strategies}</span>
              </span>
              <span>
                PnL: <span className="text-green-600 font-medium">+${c.cumPnL.toLocaleString()}</span>
              </span>
              <span>
                {isZh ? '月调用' : 'Monthly'}: <span className="text-ink font-medium">{c.monthlyCalls.toLocaleString()}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
