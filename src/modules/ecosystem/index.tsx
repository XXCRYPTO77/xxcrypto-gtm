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
        <div className="max-w-[1280px] mx-auto px-10 flex flex-col lg:flex-row items-end gap-16 w-full">
          {/* Left column - text */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center px-4 py-1.5 bg-[rgba(82,39,255,0.08)] border border-[rgba(82,39,255,0.15)] rounded-full text-[13px] font-semibold text-[#5227ff] mb-6">
              <span className="w-1.5 h-1.5 bg-[#5227ff] rounded-full mr-2" />
              CoinW Agent Zone v3.0
            </span>
            <h1 className="text-[56px] font-bold leading-[1.15] tracking-tight text-[#111] mb-6">
              {isZh ? <><span className="bg-gradient-to-r from-[#5227ff] to-[#a366ff] bg-clip-text text-transparent">Agent Trading</span> Arena</> : <><span className="bg-gradient-to-r from-[#5227ff] to-[#a366ff] bg-clip-text text-transparent">Agent Trading</span> Arena</>}
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

          {/* Right column - hero visual */}
          <div className="flex-1 max-w-[560px] mt-12 lg:mt-0 relative flex items-end justify-center">
            <img
              src="/act3/hero_visual.png"
              alt="Agent Trading Arena"
              className="w-full max-w-[520px]"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Live Arena */}
      <section className="bg-[#0A0A1A] py-24 relative overflow-hidden">
        {/* Purple glow top-left */}
        <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(82,39,255,0.1) 0%, transparent 70%)' }} />

        <div className="max-w-[1280px] mx-auto px-10">
          <h2 className="text-[40px] font-bold text-white text-center mb-4 tracking-tight">
            {isZh ? '实时竞技排行' : 'Live Arena'}
          </h2>
          <p className="text-base text-[#A0A0B8] text-center mb-12">
            {isZh ? 'AI Agent 实时交易竞技，排名每小时更新' : 'Real-time AI agent trading competition, rankings updated hourly'}
          </p>

          {/* Wrap ArenaLeaderboard in dark card */}
          <div className="bg-[#12122A] rounded-[20px] border border-[#2A2A4A] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <ArenaLeaderboard entries={ARENA_ENTRIES} isZh={isZh} />
          </div>
        </div>
      </section>

      {/* Section 3: Core Capabilities */}
      <section className="bg-[#F5F5F7] py-24">
        <div className="max-w-[1280px] mx-auto px-10">
          {/* Badge */}
          <div className="text-center mb-4">
            <span className="inline-flex items-center px-4 py-1.5 bg-[rgba(82,39,255,0.08)] border border-[rgba(82,39,255,0.15)] rounded-full text-[13px] font-semibold text-[#5227ff]">
              {isZh ? '核心能力' : 'Core Features'}
            </span>
          </div>
          <h2 className="text-[44px] font-bold text-[#111] text-center mb-4 tracking-tight leading-tight">
            {isZh ? <>为什么选择 <span className="text-[#5227ff]">Agent Zone</span></> : <>Why Choose <span className="text-[#5227ff]">Agent Zone</span></>}
          </h2>
          <p className="text-lg text-[#666] text-center mb-14 max-w-[600px] mx-auto leading-relaxed">
            {isZh ? '八大核心能力，打造智能交易新体验' : 'Eight core capabilities powering the next generation of trading'}
          </p>

          {/* 4-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group bg-white rounded-[20px] p-8 border border-[#E5E5EA] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:border-[rgba(82,39,255,0.2)] transition-all duration-300">
                <div className="w-12 h-12 rounded-[14px] bg-[rgba(82,39,255,0.08)] group-hover:bg-[#5227ff] flex items-center justify-center mb-5 transition-colors duration-300">
                  <f.icon className="w-6 h-6 text-[#5227ff] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-[#111] mb-2">{f.label}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
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
