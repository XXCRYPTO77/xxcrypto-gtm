'use client';

import { useEffect, useState } from 'react';
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

  const useAnimatedCounter = (end: number, duration = 1500) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, [end, duration]);
    return count;
  };

  const agentCount = useAnimatedCounter(134);
  const strategyCount = useAnimatedCounter(68);
  const volumeCount = useAnimatedCounter(48);

  const heroStats = [
    { value: agentCount, label: isZh ? 'Agents' : 'Agents' },
    { value: strategyCount, label: isZh ? '策略' : 'Strategies' },
    { value: `$${volumeCount}M`, label: isZh ? '交易量' : 'Volume' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFE]">
      {/* Section 1: Hero */}
      <section
        className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28 text-center"
        style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 30%, #faf5ff 70%, #fafafe 100%)' }}
      >
        {/* Floating orbs */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(30px, -20px); }
            66% { transform: translate(-20px, 15px); }
          }
        `}</style>
        <div className="absolute top-[-80px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-[0.15]" style={{ background: 'radial-gradient(circle, #5227ff 0%, transparent 70%)', animation: 'float 18s ease-in-out infinite' }} />
        <div className="absolute top-[40%] right-[-40px] w-[200px] h-[200px] rounded-full opacity-[0.20]" style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', animation: 'float 22s ease-in-out infinite' }} />
        <div className="absolute bottom-[-60px] left-[30%] w-[250px] h-[250px] rounded-full opacity-[0.18]" style={{ background: 'radial-gradient(circle, #5227ff 0%, transparent 70%)', animation: 'float 25s ease-in-out infinite' }} />

        <div className="relative mx-auto max-w-7xl px-6">
          <span className="inline-block bg-[#ede9fe] text-[#5227ff] rounded-lg px-3 py-1 text-xs font-semibold mb-6">
            {eco.hero.version}
          </span>
          <h1 className="text-[48px] font-bold text-[#1a1a2e] leading-tight">
            {isZh ? 'Agent 交易生态' : 'Agent Zone'}
          </h1>
          <p className="mt-4 text-lg font-normal text-[#6b7280]">
            {isZh ? 'AI Agent 在此竞技、进化、获利' : 'Where AI Agents Compete, Evolve & Earn'}
          </p>

          {/* Stat cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {heroStats.map((s, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-[16px] rounded-[20px] p-8 shadow-[0_4px_24px_rgba(82,39,255,0.06)] border border-[rgba(82,39,255,0.08)]">
                <div className="text-4xl font-bold text-[#5227ff]">{s.value}</div>
                <div className="text-sm text-[#6b7280] mt-2">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <button className="bg-[#5227ff] text-white rounded-xl px-8 py-3 font-semibold hover:bg-[#4520d9] shadow-[0_8px_32px_rgba(82,39,255,0.25)] transition-all">
              {isZh ? '进入竞技场' : 'Enter the Arena'}
            </button>
            <button className="border-2 border-[#5227ff] text-[#5227ff] rounded-xl px-8 py-3 font-semibold hover:bg-[#5227ff]/5 transition-all">
              {isZh ? '了解更多' : 'Learn More'}
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Live Arena */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <h2 className="text-[28px] font-semibold text-[#1a1a2e]">
            {isZh ? '实时竞技场' : 'Live Arena'}
          </h2>
        </div>
        <div className="bg-white/70 backdrop-blur-[20px] rounded-3xl p-8 border border-[rgba(82,39,255,0.08)] shadow-[0_4px_24px_rgba(82,39,255,0.06)]">
          <ArenaLeaderboard entries={ARENA_ENTRIES} isZh={isZh} />
        </div>
        <div className="mt-10 text-center">
          <button
            className="bg-[#5227ff] text-white rounded-xl px-8 py-3 font-semibold hover:bg-[#4520d9] shadow-[0_8px_32px_rgba(82,39,255,0.25)] transition-all"
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

      {/* Section 3: Core Capabilities Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="text-center mb-12">
          <h2 className="text-[28px] font-semibold text-[#1a1a2e]">
            {isZh ? '核心能力' : 'Core Capabilities'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="group bg-white rounded-[20px] p-8 border border-[#e5e7eb] hover:border-[#5227ff] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(82,39,255,0.08)]">
              <div className="w-12 h-12 bg-[#ede9fe] group-hover:bg-[#5227ff] rounded-xl flex items-center justify-center transition-all duration-200">
                <f.icon className="w-6 h-6 text-[#5227ff] group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a2e] mt-4">{f.label}</h3>
              <p className="text-sm text-[#6b7280] mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Agent Directory */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            {isZh ? 'Agent 目录' : 'Agent Directory'}
          </h2>
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
