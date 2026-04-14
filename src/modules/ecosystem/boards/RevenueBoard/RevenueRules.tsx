'use client';

import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface RevenueRulesProps {
  isZh: boolean;
}

export function RevenueRules({ isZh }: RevenueRulesProps) {
  const t = useT();
  const eco = (t as any).ecosystem;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-ink mb-2">{eco.boardC.rulesTitle}</h3>
        <p className="text-muted">{eco.boardC.rulesDesc}</p>
      </div>

      {/* Two contrasting cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Official Agent — green */}
        <Card className="!bg-cw-green-light !border-cw-green-mid">
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cw-green-badge">
              <CheckCircle className="h-7 w-7 text-cw-green" />
            </div>
            <h4 className="text-lg font-semibold text-cw-green">{eco.boardC.officialHit}</h4>
            <p className="text-sm text-cw-green-mid">
              {isZh
                ? '通过官方 Agent 调用策略卡，贡献者按比例获得 Credit 分润'
                : 'When strategies are called via Official Agents, contributors earn Credit revenue share'}
            </p>
          </div>
        </Card>

        {/* External Agent — neutral gray */}
        <Card className="!bg-gray-50 !border-gray-200">
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <XCircle className="h-7 w-7 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-500">{eco.boardC.externalHit}</h4>
            <p className="text-sm text-gray-400">
              {isZh
                ? '外部 Agent 调用不计入分润，仅官方渠道有效'
                : 'External Agent calls do not count toward revenue share — official channels only'}
            </p>
          </div>
        </Card>
      </div>

      {/* Why this design */}
      <Card variant="outlined" className="!bg-gray-50/50">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-brand mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-ink mb-1">{eco.boardC.whyTitle}</h4>
            <p className="text-sm text-muted leading-relaxed">{eco.boardC.whyDesc}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
