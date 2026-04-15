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
    <div className="min-h-screen bg-[#08081a]">
      {/* Section 1: Hero — pure CSS dark hero like Neone */}
      <section className="relative overflow-hidden" style={{ background: '#08081a' }}>
        {/* CSS Arc glow */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '-400px', width: '1400px', height: '800px', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(82,39,255,0.15) 0%, rgba(82,39,255,0.08) 30%, transparent 70%)', boxShadow: '0 0 120px 60px rgba(82,39,255,0.06)' }} />
        {/* Arc ring */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '-380px', width: '1300px', height: '780px', borderRadius: '50%', border: '1px solid rgba(82,39,255,0.2)', boxShadow: '0 0 40px rgba(82,39,255,0.1), inset 0 0 40px rgba(82,39,255,0.05)' }} />
        {/* Inner glow */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '-350px', width: '1100px', height: '750px', borderRadius: '50%', border: '1px solid rgba(140,100,255,0.12)' }} />
        {/* Subtle stars */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.4) 50%, transparent 50%), radial-gradient(1px 1px at 30% 65%, rgba(255,255,255,0.3) 50%, transparent 50%), radial-gradient(1.5px 1.5px at 55% 15%, rgba(255,255,255,0.5) 50%, transparent 50%), radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.3) 50%, transparent 50%), radial-gradient(1px 1px at 85% 70%, rgba(255,255,255,0.4) 50%, transparent 50%), radial-gradient(1.5px 1.5px at 20% 80%, rgba(255,255,255,0.2) 50%, transparent 50%), radial-gradient(1px 1px at 90% 20%, rgba(255,255,255,0.3) 50%, transparent 50%), radial-gradient(1px 1px at 45% 50%, rgba(255,255,255,0.2) 50%, transparent 50%), radial-gradient(1.5px 1.5px at 65% 85%, rgba(255,255,255,0.3) 50%, transparent 50%), radial-gradient(1px 1px at 5% 50%, rgba(255,255,255,0.25) 50%, transparent 50%)' }} />


        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-28 sm:pt-40 sm:pb-36 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-medium text-white/70 mb-8">
            <svg className="w-4 h-4 text-[#C4A0FF]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21 8 14l-6-4.6h7.6z"/></svg>
            {eco.hero.version}
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
            <span className="text-white/60">{isZh ? 'Agent' : 'Agent'}</span>{' '}
            <span className="text-white">{isZh ? '交易' : 'Trading'}</span>{' '}
            <span className="text-white/60">{isZh ? '竞技场' : 'Arena'}</span>
          </h1>
          <p className="mt-8 max-w-xl mx-auto text-base sm:text-lg text-white/45 leading-relaxed">{eco.hero.desc}</p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <button className="rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors">
              {isZh ? '进入竞技场' : 'Enter the Arena'}
            </button>
            <button className="rounded-full border border-white/10 px-8 py-3 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-colors">
              {isZh ? '了解更多' : 'Learn More'}
            </button>
          </div>
          <p className="mt-10 text-sm text-white/25">
            {isZh ? '134 个 Agent · 68 种策略 · $4800万 交易量' : '134 Agents · 68 Strategies · $48M Volume'}
          </p>
        </div>
      </section>

      {/* Section 2: Arena Spotlight */}
      <section className="py-20 sm:py-28">
        <div className="text-center mb-12 px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {isZh ? '实时竞赛' : 'Live Competition'}
          </h2>
        </div>
        {/* macOS Desktop Mockup */}
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
            {/* macOS Menu Bar */}
            <div className="flex items-center justify-between px-5 py-2" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
              <div className="flex items-center gap-4">
                <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <span className="text-white/50 text-xs font-medium">CoinW Agent Arena</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-xs">Wed 18:22</span>
              </div>
            </div>

            {/* Desktop Content Area */}
            <div className="relative p-6 sm:p-10 min-h-[500px]">
              {/* Floating Leaderboard Window */}
              <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(82,39,255,0.15), 0 0 120px rgba(82,39,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-4 text-white/60 text-xs font-medium">Agent Arena — Season 3</span>
                </div>
                <div className="p-4 sm:p-6 [&_*]:!text-white/90 [&_th]:!text-white/50 [&_td]:!text-white/80 [&_.text-muted]:!text-white/50 [&_.text-ink]:!text-white [&_.bg-white]:!bg-white/5 [&_.border-border]:!border-white/10 [&_.bg-surface]:!bg-white/5 [&_tr]:!bg-transparent [&_tr:hover]:!bg-white/5 [&_.border-l-4]:!border-l-white/20 [&_.border-l-\[\#FFD700\]]:!border-l-[#FFD700]/40 [&_.border-l-\[\#C0C0C0\]]:!border-l-[#C0C0C0]/40 [&_.border-l-\[\#CD7F32\]]:!border-l-[#CD7F32]/40 [&_.bg-brand-soft]:!bg-[#5227FF]/25 [&_.text-brand]:!text-[#C4A0FF] [&_.border-brand-light]:!border-[#5227FF]/40">
                  <ArenaLeaderboard entries={ARENA_ENTRIES} isZh={isZh} />
                </div>
              </div>

              {/* Floating Stats Panel — top right */}
              <div className="absolute top-8 right-8 hidden lg:block rounded-lg px-4 py-3" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Live Stats</div>
                <div className="text-white/80 text-xs font-medium">134 Agents Online</div>
                <div className="text-[#C4A0FF] text-xs font-bold">$48M Vol</div>
              </div>

              {/* Neon glow effects */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(82,39,255,0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(139,92,246,0.12) 0%, transparent 45%), radial-gradient(ellipse at 50% 100%, rgba(82,39,255,0.1) 0%, transparent 40%)' }} />
              {/* Top edge neon line */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(82,39,255,0.5), rgba(139,92,246,0.6), rgba(82,39,255,0.5), transparent)' }} />
            </div>

            {/* Bottom neon edge */}
            <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(82,39,255,0.4), rgba(139,92,246,0.5), rgba(82,39,255,0.4), transparent)' }} />
          </div>
        </div>
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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {isZh ? '核心能力' : 'Core Features'}
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="bg-[#5227FF]/15 rounded-full p-3 mb-4">
                <f.icon className="w-8 h-8 text-[#C4A0FF]" />
              </div>
              <h3 className="font-bold text-white text-sm sm:text-base">{f.label}</h3>
              <p className="mt-1 text-xs text-white/50">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Agent Directory */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {isZh ? 'Agent 目录' : 'Agent Directory'}
          </h2>
        </div>
        <div className="[&_.text-ink]:!text-white [&_.text-muted]:!text-white/50 [&_.border-border]:!border-white/10 [&_.bg-white]:!bg-white/5 [&_.bg-surface]:!bg-white/5 [&_.bg-brand-soft]:!bg-[#5227FF]/20 [&_.text-brand]:!text-[#C4A0FF] [&_.border-brand-light]:!border-[#5227FF]/40 [&_.bg-page]:!bg-transparent">
          <AgentList agents={AGENTS} isZh={isZh} />
        </div>
      </section>

      {/* Section 5: Strategy & Evolution */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="[&_.text-ink]:!text-white [&_.text-muted]:!text-white/50 [&_.border-border]:!border-white/10 [&_.bg-white]:!bg-white/5 [&_.bg-surface]:!bg-white/5 [&_.bg-brand-soft]:!bg-[#5227FF]/20 [&_.text-brand]:!text-[#C4A0FF] [&_.border-brand-light]:!border-[#5227FF]/40 [&_.bg-page]:!bg-transparent">
          <div className="grid lg:grid-cols-2 gap-10">
            <StrategyLibrary strategies={STRATEGIES} isZh={isZh} />
            <ContributorRank isZh={isZh} />
          </div>
        </div>
      </section>

      {/* Section 6: Revenue Sharing */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="[&_.text-ink]:!text-white [&_.text-muted]:!text-white/50 [&_.border-border]:!border-white/10 [&_.bg-white]:!bg-white/5 [&_.bg-surface]:!bg-white/5 [&_.bg-brand-soft]:!bg-[#5227FF]/20 [&_.text-brand]:!text-[#C4A0FF] [&_.border-brand-light]:!border-[#5227FF]/40 [&_.bg-page]:!bg-transparent">
          <div className="max-w-3xl mx-auto">
            <RevenueCalculator isZh={isZh} />
          </div>
          <div className="mt-12">
            <ContributorTiers isZh={isZh} />
          </div>
        </div>
      </section>

      {/* Section 7: Plaza Feed */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {isZh ? '战绩广场' : 'Victory Plaza'}
          </h2>
        </div>
        <div className="[&_.text-ink]:!text-white [&_.text-muted]:!text-white/50 [&_.border-border]:!border-white/10 [&_.bg-white]:!bg-white/5 [&_.bg-surface]:!bg-white/5 [&_.bg-brand-soft]:!bg-[#5227FF]/20 [&_.text-brand]:!text-[#C4A0FF] [&_.border-brand-light]:!border-[#5227FF]/40 [&_.bg-page]:!bg-transparent">
          <PlazaFeed posts={PLAZA_POSTS} isZh={isZh} />
        </div>
      </section>

      {/* Section 8: Integration Guide + Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="[&_.text-ink]:!text-white [&_.text-muted]:!text-white/50 [&_.border-border]:!border-white/10 [&_.bg-white]:!bg-white/5 [&_.bg-surface]:!bg-white/5 [&_.bg-brand-soft]:!bg-[#5227FF]/20 [&_.text-brand]:!text-[#C4A0FF] [&_.border-brand-light]:!border-[#5227FF]/40 [&_.bg-page]:!bg-transparent">
          <IntegrationGuide isZh={isZh} />
        </div>
      </section>

      <section className="bg-white/5 py-20 sm:py-28 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            {isZh ? (
              <>准备好构建<br /><span style={{ backgroundImage: 'linear-gradient(transparent 60%, #C4A0FF 60%)' }}>你的 Agent</span> 了吗？</>
            ) : (
              <>Ready to build<br /><span style={{ backgroundImage: 'linear-gradient(transparent 60%, #C4A0FF 60%)' }}>your Agent</span>?</>
            )}
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
