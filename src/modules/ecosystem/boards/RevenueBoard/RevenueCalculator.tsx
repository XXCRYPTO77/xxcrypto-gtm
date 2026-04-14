'use client';

import { useState } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';
import { AlertTriangle, Coins, DollarSign } from 'lucide-react';

interface RevenueCalculatorProps {
  isZh: boolean;
}

export function RevenueCalculator({ isZh }: RevenueCalculatorProps) {
  const t = useT();
  const eco = (t as any).ecosystem;
  const [calls, setCalls] = useState(20000);

  const credit = Math.round(calls * 0.05);
  const usdt = (credit / 10).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded-lg border border-cw-orange-mid bg-cw-orange-light px-4 py-3">
        <AlertTriangle className="h-4 w-4 text-cw-orange mt-0.5 shrink-0" />
        <p className="text-xs text-cw-orange">{eco.boardC.calculatorDisclaimer}</p>
      </div>

      {/* Slider */}
      <div className="space-y-3">
        <label className="flex items-center justify-between text-sm font-medium text-ink">
          <span>{isZh ? '月调用次数' : 'Monthly Calls'}</span>
          <span className="tabular-nums text-brand font-semibold">{calls.toLocaleString()}</span>
        </label>
        <input
          type="range"
          min={1000}
          max={100000}
          step={1000}
          value={calls}
          onChange={(e) => setCalls(Number(e.target.value))}
          className="w-full accent-brand h-2 rounded-full cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted">
          <span>1,000</span>
          <span>100,000</span>
        </div>
      </div>

      {/* Result cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card variant="accent">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
              <Coins className="h-5 w-5 text-brand" />
            </div>
            <div>
              <p className="text-2xl font-bold text-ink tabular-nums">{credit.toLocaleString()}</p>
              <p className="text-xs text-muted">Credit</p>
            </div>
          </div>
        </Card>

        <Card variant="accent">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
              <DollarSign className="h-5 w-5 text-brand" />
            </div>
            <div>
              <p className="text-2xl font-bold text-ink tabular-nums">~${usdt}</p>
              <p className="text-xs text-muted">USDT</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Formula */}
      <div className="rounded-lg bg-gray-50 border border-border px-4 py-3 text-xs text-muted space-y-1">
        <p className="font-medium text-ink text-sm mb-2">{isZh ? '计算公式（演示用）' : 'Formula (demo)'}</p>
        <p>{isZh ? '月调用次数' : 'Monthly calls'} × 0.05 Credit/{isZh ? '次' : 'call'} = {isZh ? '预期' : 'Estimated'} Credit</p>
        <p>Credit : USDT = 10 : 1 ({isZh ? '演示参数' : 'demo rate'})</p>
      </div>
    </div>
  );
}
