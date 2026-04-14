'use client';

import { Card } from '@/components/primitives/Card';
import { ShieldAlert, ArrowRight } from 'lucide-react';

interface TuneOutInfoProps {
  isZh: boolean;
}

const STEPS = [
  {
    zh: '✓ 活跃',
    en: '✓ Active',
    cls: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    zh: '⚠ 汰换观察期',
    en: '⚠ Tune-Out Watch',
    cls: 'bg-cw-red-light border-cw-red-mid text-cw-red',
  },
  {
    zh: '已下架',
    en: 'Retired',
    cls: 'bg-gray-100 border-gray-300 text-gray-400',
  },
];

export function TuneOutInfo({ isZh }: TuneOutInfoProps) {
  return (
    <Card variant="elevated" className="border-l-4 border-l-[color:var(--accent-amber)]">
      <div className="flex items-start gap-3 mb-4">
        <ShieldAlert className="h-5 w-5 text-[color:var(--accent-amber)] flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-lg font-bold text-ink">
            {isZh ? '汰换机制' : 'Tune-Out Mechanism'}
          </h3>
          <p className="text-sm text-muted mt-1">
            {isZh
              ? '胜率指数 30 日均值 < 40 → 降权（出现"汰换观察期"标）。连续 2 个月低于 40 → 自动下架。所有数据公开，任何人可查。'
              : 'Win rate index 30-day avg < 40 → demoted (enters "Tune-Out Watch"). Two consecutive months below 40 → auto-retired. All data is public and auditable.'}
          </p>
        </div>
      </div>

      {/* Flow diagram */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-4">
            <div className={`rounded-xl border px-4 py-2 text-xs font-semibold ${step.cls}`}>
              {isZh ? step.zh : step.en}
            </div>
            {i < STEPS.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
