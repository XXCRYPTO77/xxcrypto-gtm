'use client';

import { useT } from '@/i18n/LocaleContext';
import { RevenueRules } from './RevenueRules';
import { RevenueCalculator } from './RevenueCalculator';
import { ContributorTiers } from './ContributorTiers';

export function RevenueBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const eco = (t as any).ecosystem;

  return (
    <div className="space-y-16">
      <RevenueRules isZh={isZh} />
      <div>
        <h3 className="text-2xl font-bold text-ink mb-2">{eco.boardC.calculatorTitle}</h3>
        <RevenueCalculator isZh={isZh} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-ink mb-6">{eco.boardC.tierTitle}</h3>
        <ContributorTiers isZh={isZh} />
        <p className="text-center text-xs text-muted mt-4">{eco.boardC.tierNote}</p>
      </div>
    </div>
  );
}
