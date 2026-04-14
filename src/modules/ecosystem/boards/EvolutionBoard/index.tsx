'use client';

import { useT } from '@/i18n/LocaleContext';
import { STRATEGIES } from '../../data/strategies';
import { StrategyLibrary } from './StrategyLibrary';
import { TuneOutInfo } from './TuneOutInfo';
import { ContributorRank } from './ContributorRank';

export function EvolutionBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const eco = (t as any).ecosystem;

  return (
    <div className="space-y-16">
      <div>
        <h3 className="text-2xl font-bold text-ink mb-2">{eco.boardB.strategyLibTitle}</h3>
        <p className="text-muted text-sm mb-6">{eco.boardB.strategyLibDesc}</p>
        <StrategyLibrary strategies={STRATEGIES} isZh={isZh} />
      </div>
      <TuneOutInfo isZh={isZh} />
      <div>
        <h3 className="text-2xl font-bold text-ink mb-6">{eco.boardB.contributorRankTitle}</h3>
        <ContributorRank isZh={isZh} />
      </div>
    </div>
  );
}
