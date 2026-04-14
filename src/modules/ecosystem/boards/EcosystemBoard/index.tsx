'use client';

import { useT } from '@/i18n/LocaleContext';
import { AGENTS } from '../../data/agents';
import { ARENA_ENTRIES } from '../../data/arena';
import { PLAZA_POSTS } from '../../data/plaza';
import { NetworkTopology } from './NetworkTopology';
import { AgentList } from './AgentList';
import { ArenaLeaderboard } from './ArenaLeaderboard';
import { PlazaFeed } from './PlazaFeed';
import { IntegrationGuide } from './IntegrationGuide';

export function EcosystemBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const eco = (t as any).ecosystem;

  return (
    <div className="space-y-20">
      <NetworkTopology agents={AGENTS} isZh={isZh} />
      <div>
        <h3 className="text-2xl font-bold text-ink mb-6">{eco.boardA.agentListTitle}</h3>
        <AgentList agents={AGENTS} isZh={isZh} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-ink mb-2">{eco.boardA.arenaTitle}</h3>
        <p className="text-muted text-sm mb-6">{eco.boardA.arenaDesc}</p>
        <ArenaLeaderboard entries={ARENA_ENTRIES} isZh={isZh} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-ink mb-2">{eco.boardA.plazaTitle}</h3>
        <p className="text-muted text-sm mb-6">{eco.boardA.plazaDesc}</p>
        <PlazaFeed posts={PLAZA_POSTS} isZh={isZh} />
      </div>
      <IntegrationGuide isZh={isZh} />
    </div>
  );
}
