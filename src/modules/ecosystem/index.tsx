'use client';

import { useT } from '@/i18n/LocaleContext';
import { DualAgentBoard } from './components/DualAgentBoard';
import { SkillEvolutionBoard } from './components/SkillEvolutionBoard';
import { TradingArenaBoard } from './components/TradingArenaBoard';
import { RevenueSharingBoard } from './components/RevenueSharingBoard';

export default function EcosystemModule() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="mb-12">
        <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand mb-4">v1.5 · Agent Zone</span>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">{isZh ? '交易 Skill 生态' : 'Trading Skill Ecosystem'}</h2>
      </div>
      <DualAgentBoard />
      <hr className="border-border my-10" />
      <SkillEvolutionBoard />
      <hr className="border-border my-10" />
      <TradingArenaBoard />
      <hr className="border-border my-10" />
      <RevenueSharingBoard />
    </section>
  );
}
