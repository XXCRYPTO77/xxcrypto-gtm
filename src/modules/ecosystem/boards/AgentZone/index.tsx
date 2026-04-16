'use client';

import { useT } from '@/i18n/LocaleContext';
import { AGENTS } from '../../data/agents';
import { STRATEGIES } from '../../data/strategies';

// Re-use existing components from their current locations
import { AgentList } from '../EcosystemBoard/AgentList';
import { IntegrationGuide } from '../EcosystemBoard/IntegrationGuide';
import { StrategyLibrary } from '../EvolutionBoard/StrategyLibrary';
import { TuneOutInfo } from '../EvolutionBoard/TuneOutInfo';
import { ContributorRank } from '../EvolutionBoard/ContributorRank';
import { RevenueRules } from '../RevenueBoard/RevenueRules';
import { RevenueCalculator } from '../RevenueBoard/RevenueCalculator';
import { ContributorTiers } from '../RevenueBoard/ContributorTiers';

export function AgentZoneBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const eco = (t as any).ecosystem;

  return (
    <div className="space-y-24">
      {/* Section header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">Agent Zone</h2>
        <p className="mt-2 text-muted max-w-lg mx-auto">
          {isZh
            ? '发现顶级 Agent，探索策略生态，成为贡献者'
            : 'Discover top agents, explore strategy ecosystem, become a contributor'}
        </p>
      </div>

      {/* 1. Agent Discovery */}
      <section>
        <h3 className="text-2xl font-bold text-ink mb-6">{eco.boardA.agentListTitle}</h3>
        <AgentList agents={AGENTS} isZh={isZh} />
      </section>

      <hr className="border-border" />

      {/* 2. Strategy Evolution */}
      <section>
        <h3 className="text-2xl font-bold text-ink mb-2">{eco.boardB.strategyLibTitle}</h3>
        <p className="text-muted text-sm mb-6">{eco.boardB.strategyLibDesc}</p>
        <StrategyLibrary strategies={STRATEGIES} isZh={isZh} />
        <div className="mt-12">
          <TuneOutInfo isZh={isZh} />
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-ink mb-6">{eco.boardB.contributorRankTitle}</h3>
          <ContributorRank isZh={isZh} />
        </div>
      </section>

      <hr className="border-border" />

      {/* 3. Developer Onboarding */}
      <section>
        <IntegrationGuide isZh={isZh} />
      </section>

      <hr className="border-border" />

      {/* 4. Contributor Tiers */}
      <section>
        <h3 className="text-2xl font-bold text-ink mb-6">{eco.boardC.tierTitle}</h3>
        <ContributorTiers isZh={isZh} />
      </section>

      <hr className="border-border" />

      {/* 5. Revenue Model */}
      <section>
        <RevenueRules isZh={isZh} />
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-ink mb-2">{eco.boardC.calculatorTitle}</h3>
          <RevenueCalculator isZh={isZh} />
        </div>
      </section>
    </div>
  );
}
