'use client';

import { useState } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { AGENTS } from '../../data/agents';
import { STRATEGIES } from '../../data/strategies';

import { AgentList } from '../EcosystemBoard/AgentList';
import { IntegrationGuide } from '../EcosystemBoard/IntegrationGuide';
import { StrategyLibrary } from '../EvolutionBoard/StrategyLibrary';
import { TuneOutInfo } from '../EvolutionBoard/TuneOutInfo';
import { ContributorRank } from '../EvolutionBoard/ContributorRank';
import { RevenueRules } from '../RevenueBoard/RevenueRules';
import { RevenueCalculator } from '../RevenueBoard/RevenueCalculator';
import { ContributorTiers } from '../RevenueBoard/ContributorTiers';

type Tab = 'discover' | 'contribute';

/* ── Stats bar ── */
function ZoneStats({ isZh }: { isZh: boolean }) {
  const officialCount = AGENTS.filter((a) => a.type === 'official').length;
  const externalCount = AGENTS.filter((a) => a.type === 'external').length;
  const stats = [
    { value: AGENTS.length.toString(), label: isZh ? 'Agent 总数' : 'Total Agents' },
    { value: officialCount.toString(), label: isZh ? '官方' : 'Official' },
    { value: externalCount.toString(), label: isZh ? '外部接入' : 'External' },
    { value: STRATEGIES.length.toString(), label: isZh ? '策略卡' : 'Strategies' },
  ];
  return (
    <div className="flex flex-wrap gap-6 text-center sm:gap-10">
      {stats.map((s) => (
        <div key={s.label}>
          <p className="text-2xl font-bold text-ink">{s.value}</p>
          <p className="text-xs text-muted mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Tab button ── */
function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
        active
          ? 'bg-brand text-white shadow-sm'
          : 'bg-surface text-muted hover:text-ink hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}

export function AgentZoneBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const eco = (t as any).ecosystem;
  const [tab, setTab] = useState<Tab>('discover');

  return (
    <div className="space-y-12">

      {/* ─── Header + Stats ─── */}
      <div>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">Agent Zone</h1>
        <p className="mt-2 text-muted max-w-lg">
          {isZh
            ? '发现顶级 Agent 和策略，或成为贡献者参与生态建设'
            : 'Discover top agents & strategies, or join as a contributor'}
        </p>
        <div className="mt-6">
          <ZoneStats isZh={isZh} />
        </div>
      </div>

      {/* ─── Tab Navigation ─── */}
      <div className="flex gap-2 border-b border-border pb-0">
        <TabButton active={tab === 'discover'} onClick={() => setTab('discover')}>
          {isZh ? '发现' : 'Discover'}
        </TabButton>
        <TabButton active={tab === 'contribute'} onClick={() => setTab('contribute')}>
          {isZh ? '贡献' : 'Contribute'}
        </TabButton>
      </div>

      {/* ─── Tab: Discover ─── */}
      {tab === 'discover' && (
        <div className="space-y-16">
          {/* Agent Discovery */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-ink">{eco.boardA.agentListTitle}</h2>
              <p className="text-sm text-muted mt-1">
                {isZh
                  ? '浏览并关注表现最佳的 AI 交易 Agent'
                  : 'Browse and follow the best performing AI trading agents'}
              </p>
            </div>
            <AgentList agents={AGENTS} isZh={isZh} />
          </section>

          {/* Strategy Library */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-ink">{eco.boardB.strategyLibTitle}</h2>
              <p className="text-sm text-muted mt-1">{eco.boardB.strategyLibDesc}</p>
            </div>
            <StrategyLibrary strategies={STRATEGIES} isZh={isZh} />
          </section>

          {/* TuneOut mechanism — compact callout */}
          <section>
            <TuneOutInfo isZh={isZh} />
          </section>
        </div>
      )}

      {/* ─── Tab: Contribute ─── */}
      {tab === 'contribute' && (
        <div className="space-y-16">
          {/* Developer Onboarding — first thing contributors see */}
          <section>
            <IntegrationGuide isZh={isZh} />
          </section>

          {/* Contributor Tiers — progression system */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-ink">{eco.boardC.tierTitle}</h2>
              <p className="text-sm text-muted mt-1">
                {isZh
                  ? '从社区成员到官方合作伙伴的进阶之路'
                  : 'Your path from community member to official partner'}
              </p>
            </div>
            <ContributorTiers isZh={isZh} />
          </section>

          {/* Revenue Model */}
          <section>
            <RevenueRules isZh={isZh} />
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-ink mb-2">{eco.boardC.calculatorTitle}</h3>
              <p className="text-sm text-muted mb-6">
                {isZh ? '预估你的 Agent 潜在收益' : 'Estimate your potential agent earnings'}
              </p>
              <RevenueCalculator isZh={isZh} />
            </div>
          </section>

          {/* Contributor Leaderboard */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6">{eco.boardB.contributorRankTitle}</h2>
            <ContributorRank isZh={isZh} />
          </section>
        </div>
      )}
    </div>
  );
}
