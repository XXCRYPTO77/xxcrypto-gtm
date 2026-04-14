'use client';

import { useState } from 'react';
import { Plug, Layers, Cpu } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';
import { useT } from '@/i18n/LocaleContext';

export function SkillEvolutionBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const [showDetail, setShowDetail] = useState(false);

  const stages = [
    {
      icon: Plug,
      label: isZh ? 'Agent 调用单个 Skill' : 'Agent calls single Skill',
      example: isZh ? '查询 BTC 行情 → 返回价格' : 'Query BTC price → Return price',
      badge: { tone: 'success' as const, text: 'done' },
    },
    {
      icon: Layers,
      label: isZh ? 'Agent 自动串联多个 Skills' : 'Agent chains multiple Skills',
      example: isZh ? '看行情 + 判断信号 + 挂单' : 'Check market + Signal + Place order',
      badge: { tone: 'success' as const, text: 'done' },
    },
    {
      icon: Cpu,
      label: isZh ? 'Agent 写策略，自己跑回测' : 'Agent writes strategy, runs backtest',
      example: isZh ? '均线策略 → 回测 30 天 → 胜率 62%' : 'MA strategy → 30d backtest → 62% win rate',
      badge: { tone: 'neutral' as const, text: 'v1.5' },
      clickable: true,
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <div key={i} className="flex items-center gap-4 flex-1 min-w-0">
              <Card
                variant="elevated"
                className={`flex-1 ${stage.clickable ? 'cursor-pointer hover:border-brand' : ''}`}
              >
                <div
                  onClick={stage.clickable ? () => setShowDetail((v) => !v) : undefined}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft">
                    <Icon size={24} className="text-brand" />
                  </div>
                  <p className="text-sm font-bold text-ink">{stage.label}</p>
                  <p className="text-xs text-muted">{stage.example}</p>
                  <Badge tone={stage.badge.tone}>{stage.badge.text}</Badge>
                </div>
              </Card>
              {i < stages.length - 1 && (
                <span className="hidden md:block text-2xl font-bold text-muted shrink-0">→</span>
              )}
            </div>
          );
        })}
      </div>

      {showDetail && (
        <Card variant="elevated" className="mt-4">
          <p className="text-sm text-ink">
            {isZh
              ? '策略：BTC 均线 5/20 · 回测区间：2025-10 至 2026-03 · 胜率：62% · 最大回撤：8.3%'
              : 'Strategy: BTC MA 5/20 · Backtest: 2025-10 to 2026-03 · Win rate: 62% · Max drawdown: 8.3%'}
          </p>
        </Card>
      )}
    </div>
  );
}
