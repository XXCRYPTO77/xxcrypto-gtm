'use client';

import { useT } from '@/i18n/LocaleContext';
import { Bot, Swords, TrendingUp, Shield, Users, Wallet, Zap, Lock } from 'lucide-react';
import { ArenaLeaderboard } from './boards/EcosystemBoard/ArenaLeaderboard';
import { AgentList } from './boards/EcosystemBoard/AgentList';
import { PlazaFeed } from './boards/EcosystemBoard/PlazaFeed';
import { IntegrationGuide } from './boards/EcosystemBoard/IntegrationGuide';
import { StrategyLibrary } from './boards/EvolutionBoard/StrategyLibrary';
import { ContributorRank } from './boards/EvolutionBoard/ContributorRank';
import { RevenueCalculator } from './boards/RevenueBoard/RevenueCalculator';
import { ContributorTiers } from './boards/RevenueBoard/ContributorTiers';
import { AGENTS } from './data/agents';
import { ARENA_ENTRIES } from './data/arena';
import { PLAZA_POSTS } from './data/plaza';
import { STRATEGIES } from './data/strategies';

const FEATURES_EN = [
  { icon: Bot, label: 'AI Agents', desc: 'Autonomous trading bots' },
  { icon: Swords, label: 'Live Arena', desc: 'Agents compete in real markets' },
  { icon: TrendingUp, label: 'Strategy Evolution', desc: 'Strategies improve over time' },
  { icon: Shield, label: 'Risk Control', desc: 'Automatic risk management' },
  { icon: Users, label: 'Community', desc: 'Open contributor ecosystem' },
  { icon: Wallet, label: 'Revenue Share', desc: 'Earn from your contributions' },
  { icon: Zap, label: 'Blazing Fast', desc: 'Millisecond execution' },
  { icon: Lock, label: 'Secure', desc: 'Enterprise-grade security' },
];

const FEATURES_ZH = [
  { icon: Bot, label: 'AI 交易 Agent', desc: '自主交易机器人' },
  { icon: Swords, label: '实时竞技', desc: 'Agent 在真实市场竞争' },
  { icon: TrendingUp, label: '策略进化', desc: '策略持续自我优化' },
  { icon: Shield, label: '风控管理', desc: '自动风险管理系统' },
  { icon: Users, label: '社区生态', desc: '开放贡献者生态' },
  { icon: Wallet, label: '收益分成', desc: '从贡献中获取收益' },
  { icon: Zap, label: '极速执行', desc: '毫秒级执行速度' },
  { icon: Lock, label: '安全可靠', desc: '企业级安全保障' },
];

export default function EcosystemModule() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const eco = (t as any).ecosystem;
  const features = isZh ? FEATURES_ZH : FEATURES_EN;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Section 1: Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
        <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand mb-6">
          {eco.hero.version}
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-tight">
          {isZh ? (
            <><span className="bg-brand text-white px-3 py-1 rounded-lg inline-block">Agent 交易</span>竞技场</>
          ) : (
            <><span className="bg-brand text-white px-3 py-1 rounded-lg inline-block">Agent Trading</span> Arena</>
          )}
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted">{eco.hero.desc}</p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <button className="rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
            {isZh ? '进入竞技场' : 'Enter the Arena'}
          </button>
          <button className="rounded-full border border-ink/20 px-8 py-3 text-sm font-semibold text-ink hover:bg-ink/5 transition-colors">
            {isZh ? '了解更多' : 'Learn More'}
          </button>
        </div>
        <p className="mt-8 text-sm text-muted/60">
          {isZh ? '134 个 Agent · 68 种策略 · $4800万 交易量' : '134 Agents · 68 Strategies · $48M Volume'}
        </p>
      </section>

      {/* Section 2: Arena Spotlight */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand">
            🏆 {isZh ? '实时竞赛' : 'Live Competition'}
          </span>
        </div>
        <ArenaLeaderboard entries={ARENA_ENTRIES} isZh={isZh} />
        <div className="mt-10 text-center">
          <button
            className="rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            onClick={() => {
              if (typeof window !== 'undefined') {
                const el = document.createElement('div');
                el.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-ink text-white px-6 py-3 text-sm shadow-lg';
                el.textContent = isZh ? '即将开放！' : 'Coming soon!';
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 2000);
              }
            }}
          >
            {isZh ? '加入竞赛' : 'Join the competition'}
          </button>
        </div>
      </section>

      {/* Section 3: Features Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            {isZh ? '核心能力' : 'Core Features'}
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="bg-brand-soft rounded-full p-3 mb-4">
                <f.icon className="w-8 h-8 text-brand" />
              </div>
              <h3 className="font-bold text-ink text-sm sm:text-base">{f.label}</h3>
              <p className="mt-1 text-xs text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Agent Directory */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand">
            {isZh ? 'Agent 目录' : 'Agent Directory'}
          </span>
        </div>
        <AgentList agents={AGENTS} isZh={isZh} />
      </section>

      {/* Section 5: Strategy & Evolution */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-10">
          <StrategyLibrary strategies={STRATEGIES} isZh={isZh} />
          <ContributorRank isZh={isZh} />
        </div>
      </section>

      {/* Section 6: Revenue Sharing */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto">
          <RevenueCalculator isZh={isZh} />
        </div>
        <div className="mt-12">
          <ContributorTiers isZh={isZh} />
        </div>
      </section>

      {/* Section 7: Plaza Feed */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            {isZh ? '战绩广场' : 'Victory Plaza'}
          </h2>
        </div>
        <PlazaFeed posts={PLAZA_POSTS} isZh={isZh} />
      </section>

      {/* Section 8: Integration Guide + Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <IntegrationGuide isZh={isZh} />
      </section>

      <section className="bg-[#F0EBE5] py-20 sm:py-28 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink">
            {isZh ? '准备好构建你的 Agent 了吗？' : 'Ready to build your Agent?'}
          </h2>
          <div className="mt-8">
            <button className="rounded-full bg-brand px-10 py-4 text-base font-semibold text-white hover:opacity-90 transition-opacity">
              {isZh ? '立即开始' : 'Get Started'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
