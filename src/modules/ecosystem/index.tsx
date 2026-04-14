'use client';

import { useT } from '@/i18n/LocaleContext';
import { EcosystemBoard } from './boards/EcosystemBoard';
import { EvolutionBoard } from './boards/EvolutionBoard';
import { RevenueBoard } from './boards/RevenueBoard';

export default function EcosystemModule() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const eco = (t as any).ecosystem;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
      {/* Module Header */}
      <div className="mb-20">
        <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand mb-4">
          {eco.hero.version}
        </span>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {isZh ? eco.hero.title : eco.hero.title}
        </h2>
        <p className="mt-1 text-xl font-semibold text-brand">{eco.hero.titleSub}</p>
        <p className="mt-3 max-w-2xl text-muted">{eco.hero.desc}</p>
      </div>

      {/* Board A */}
      <section id="board-a" className="mb-20">
        <div className="mb-8">
          <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-3 py-1 text-xs font-semibold text-brand mb-3">
            01 · {eco.boardA.sectionTitle}
          </span>
        </div>
        <EcosystemBoard />
      </section>

      <hr className="border-border my-16" />

      {/* Board B */}
      <section id="board-b" className="mb-20">
        <div className="mb-8">
          <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-3 py-1 text-xs font-semibold text-brand mb-3">
            02 · {eco.boardB.sectionTitle}
          </span>
        </div>
        <EvolutionBoard />
      </section>

      <hr className="border-border my-16" />

      {/* Board C */}
      <section id="board-c" className="mb-20">
        <div className="mb-8">
          <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-3 py-1 text-xs font-semibold text-brand mb-3">
            03 · {eco.boardC.sectionTitle}
          </span>
        </div>
        <RevenueBoard />
      </section>
    </section>
  );
}
