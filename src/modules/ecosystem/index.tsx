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
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      `}</style>

      {/* Section 1: Hero */}
      <section className="bg-white relative overflow-hidden pt-24 pb-24 min-h-[90vh] flex items-center">
        {/* Decorative elements */}
        <div className="absolute -top-[200px] -right-[100px] w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(82,39,255,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[rgba(82,39,255,0.08)] pointer-events-none hidden lg:block" />

        <div className="max-w-[1280px] mx-auto px-10 flex flex-col lg:flex-row items-center gap-16 w-full">
          {/* Left column - text */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center px-4 py-1.5 bg-[rgba(82,39,255,0.08)] border border-[rgba(82,39,255,0.15)] rounded-full text-[13px] font-semibold text-[#5227ff] mb-6">
              <span className="w-1.5 h-1.5 bg-[#5227ff] rounded-full mr-2" />
              CoinW Agent Zone v3.0
            </span>
            <h1 className="text-[56px] font-bold leading-[1.15] tracking-tight text-[#111] mb-6">
              {isZh ? <>Agent <span className="bg-gradient-to-r from-[#5227ff] to-[#a366ff] bg-clip-text text-transparent">Trading Arena</span></> : <>Agent <span className="bg-gradient-to-r from-[#5227ff] to-[#a366ff] bg-clip-text text-transparent">Trading Arena</span></>}
            </h1>
            <p className="text-lg text-[#666] leading-relaxed mb-10 max-w-[480px] mx-auto lg:mx-0">
              {isZh ? 'AI Agent 在此竞技、进化、获利 — 开启你的智能交易之旅' : 'Where AI Agents compete, evolve & earn — start your intelligent trading journey'}
            </p>
            <div className="flex gap-12 justify-center lg:justify-start">
              <div>
                <div className="text-4xl font-bold text-[#111]">{agentCount}+</div>
                <div className="text-sm font-medium text-[#999] mt-1">{isZh ? '活跃 Agents' : 'Active Agents'}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#111]">{strategyCount}</div>
                <div className="text-sm font-medium text-[#999] mt-1">{isZh ? '策略' : 'Strategies'}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#111]">${volumeCount}M+</div>
                <div className="text-sm font-medium text-[#999] mt-1">{isZh ? '交易量' : 'Volume'}</div>
              </div>
            </div>
            <div className="flex gap-4 mt-10 justify-center lg:justify-start">
              <button className="px-8 py-3.5 rounded-full bg-[#5227ff] text-white text-base font-semibold shadow-[0_4px_16px_rgba(82,39,255,0.3)] hover:bg-[#4520dd] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(82,39,255,0.4)] transition-all">
                {isZh ? '进入竞技场' : 'Enter the Arena'}
              </button>
              <button className="px-8 py-3.5 rounded-full border-2 border-[#5227ff] text-[#5227ff] text-base font-semibold hover:bg-[rgba(82,39,255,0.06)] hover:-translate-y-0.5 transition-all">
                {isZh ? '了解更多' : 'Learn More'}
              </button>
            </div>
          </div>

          {/* Right column - dashboard visual */}
          <div className="flex-1 max-w-[560px] lg:max-w-[560px] max-w-[400px] mt-12 lg:mt-0 relative flex items-center justify-center">
            <div className="absolute w-[400px] h-[400px] rounded-full border-2 border-[rgba(82,39,255,0.1)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block" />
            <div className="relative w-full max-w-[520px] animate-[float_6s_ease-in-out_infinite]" style={{ filter: 'drop-shadow(0 20px 40px rgba(82,39,255,0.15))' }}>
              <div className="bg-[#12122A] rounded-[20px] p-6 border border-[#2A2A4A]">
                <div className="flex gap-2 mb-4">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5227ff] to-[#a366ff] flex items-center justify-center text-white text-lg">🤖</div>
                  <div>
                    <div className="text-white font-bold text-sm">Alpha-7</div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                      <span className="text-[#22C55E] text-xs font-medium">Active</span>
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-[#22C55E] text-xl font-bold">+23.5%</div>
                    <div className="text-[#A0A0B8] text-xs">7D Return</div>
                  </div>
                </div>
                <div className="flex items-end gap-1 h-20 mt-4">
                  {[40,55,35,65,50,70,45,80,60,75,85,65,90,70,95,80,60,75,85,92].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: 'linear-gradient(to top, #5227ff, #a366ff)', opacity: 0.6 + (i/20)*0.4 }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-[90%] h-[85%] bg-[#12122A] rounded-[20px] border border-[#2A2A4A] -z-10 opacity-40" />
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
        <h2 className="text-[28px] font-semibold text-[#1a1a2e] text-center mb-12">
          {isZh ? 'Agent 目录' : 'Agent Directory'}
        </h2>
        <div className="bg-white/70 backdrop-blur-[20px] rounded-3xl p-8 border border-[rgba(82,39,255,0.08)] shadow-[0_4px_24px_rgba(82,39,255,0.06)]">
          <AgentList agents={AGENTS} isZh={isZh} />
        </div>
      </section>

      {/* Section 5: Strategy & Evolution */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <h2 className="text-[28px] font-semibold text-[#1a1a2e] text-center mb-12">
          {isZh ? '策略进化' : 'Strategy Evolution'}
        </h2>
        <div className="bg-white/70 backdrop-blur-[20px] rounded-3xl p-8 border border-[rgba(82,39,255,0.08)] shadow-[0_4px_24px_rgba(82,39,255,0.06)]">
          <div className="grid lg:grid-cols-2 gap-10">
            <StrategyLibrary strategies={STRATEGIES} isZh={isZh} />
            <ContributorRank isZh={isZh} />
          </div>
        </div>
      </section>

      {/* Section 6: Revenue Sharing */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <h2 className="text-[28px] font-semibold text-[#1a1a2e] text-center mb-12">
          {isZh ? '收益分成' : 'Revenue Sharing'}
        </h2>
        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-[20px] rounded-3xl p-12 border border-[rgba(82,39,255,0.08)] shadow-[0_4px_24px_rgba(82,39,255,0.06)]">
          <RevenueCalculator isZh={isZh} />
        </div>
        <div className="mt-12 bg-white/70 backdrop-blur-[20px] rounded-3xl p-8 border border-[rgba(82,39,255,0.08)] shadow-[0_4px_24px_rgba(82,39,255,0.06)]">
          <ContributorTiers isZh={isZh} />
        </div>
      </section>

      {/* Section 7: Victory Plaza */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <h2 className="text-[28px] font-semibold text-[#1a1a2e] text-center mb-12">
          {isZh ? '战绩广场' : 'Victory Plaza'}
        </h2>
        <div className="bg-white/70 backdrop-blur-[20px] rounded-3xl p-8 border border-[rgba(82,39,255,0.08)] shadow-[0_4px_24px_rgba(82,39,255,0.06)]">
          <PlazaFeed posts={PLAZA_POSTS} isZh={isZh} />
        </div>
      </section>

      {/* Section 8: Integration Guide */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <h2 className="text-[28px] font-semibold text-[#1a1a2e] text-center mb-12">
          {isZh ? '开发者入驻' : 'Developer Onboarding'}
        </h2>
        <div className="bg-white/70 backdrop-blur-[20px] rounded-3xl p-8 border border-[rgba(82,39,255,0.08)] shadow-[0_4px_24px_rgba(82,39,255,0.06)]">
          <IntegrationGuide isZh={isZh} />
        </div>
      </section>

      {/* Section 9: Footer CTA */}
      <section className="bg-gradient-to-br from-[#5227ff] via-[#a366ff] to-[#7c3aed] relative overflow-hidden">
        <div className="rounded-[32px] mx-4 sm:mx-8 py-20 sm:py-24 px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            {isZh ? '准备好构建你的 Agent 了吗？' : 'Ready to Build Your Agent?'}
          </h2>
          <p className="text-lg text-white/70 mt-4">
            {isZh ? '传奇成就在等你' : 'Legendary Success Awaits'}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <button className="bg-white text-[#5227ff] rounded-2xl px-10 py-4 font-semibold text-base hover:scale-[1.02] hover:shadow-xl transition-all">
              {isZh ? '立即开始' : 'Get Started'}
            </button>
            <button className="border-2 border-white/50 text-white rounded-2xl px-10 py-4 font-semibold text-base hover:bg-white/10 transition-all">
              {isZh ? '了解更多' : 'Learn More'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
