'use client';

import { useEffect, useState } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Bot, Swords, TrendingUp, Shield, Users, Wallet, Zap, Lock } from 'lucide-react';
import { ArenaLeaderboard } from './boards/EcosystemBoard/ArenaLeaderboard';
import { PlazaFeed } from './boards/EcosystemBoard/PlazaFeed';
import { IntegrationGuide } from './boards/EcosystemBoard/IntegrationGuide';
import { RevenueCalculator } from './boards/RevenueBoard/RevenueCalculator';
import { ContributorTiers } from './boards/RevenueBoard/ContributorTiers';
import { AGENTS } from './data/agents';
import { ARENA_ENTRIES } from './data/arena';
import { PLAZA_POSTS } from './data/plaza';
import { STRATEGIES } from './data/strategies';
import { AgentList } from './boards/EcosystemBoard/AgentList';
import { StrategyLibrary } from './boards/EvolutionBoard/StrategyLibrary';
import { ContributorRank } from './boards/EvolutionBoard/ContributorRank';

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
      <section className="bg-white relative overflow-hidden pt-8 pb-0">
        <div className="max-w-[1280px] mx-auto px-10 flex flex-col lg:flex-row items-start gap-10 w-full">
          {/* Left column - text */}
          <div className="flex-1 text-center lg:text-left pt-12">
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
          <div className="flex-1 max-w-[640px] mt-12 lg:mt-0 relative flex items-start justify-center">
            <img
              src="/act3/hero_visual.png"
              alt="Agent Trading Arena"
              className="w-full max-w-[600px]"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Live Arena — Podium Leaderboard */}
      <section className="bg-[#0A0A1A] py-24 relative overflow-hidden">
        {/* Purple glow top-left */}
        <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(82,39,255,0.1) 0%, transparent 70%)' }} />

        <div className="max-w-[1280px] mx-auto px-10">
          <h2 className="text-[40px] font-bold text-white text-center mb-4 tracking-tight">
            {isZh ? '实时竞技排行' : 'Live Arena'}
          </h2>
          <p className="text-base text-[#A0A0B8] text-center mb-20">
            {isZh ? 'AI Agent 实时交易竞技，排名每小时更新' : 'Real-time AI agent trading competition, rankings updated hourly'}
          </p>

          {/* TOP 3 PODIUM: 2nd | 1st | 3rd */}
          {(() => {
            const top3 = ARENA_ENTRIES.slice(0, 3);
            const getAgent = (id: string) => AGENTS.find(a => a.id === id);
            const first = top3[0]; const second = top3[1]; const third = top3[2];
            const a1 = getAgent(first.agentId)!;
            const a2 = getAgent(second.agentId)!;
            const a3 = getAgent(third.agentId)!;
            return (
              <>
                {/* Desktop podium */}
                <div className="hidden md:flex items-end justify-center gap-6 mb-12 mt-12">
                  {/* 2nd place - left */}
                  <div className="w-[260px]">
                    <div className="bg-[#12122A] rounded-[20px] border border-[#2A2A4A] p-8 text-center relative hover:shadow-[0_0_30px_rgba(82,39,255,0.25)] hover:border-[rgba(82,39,255,0.4)] transition-all duration-300">
                      <div className="absolute -top-3 -left-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-[#5227ff] to-[#a366ff] flex items-center justify-center text-3xl">{a2.avatar}</div>
                      <div className="text-white font-bold text-base">{isZh ? a2.name : a2.nameEn}</div>
                      <div className="text-[#A0A0B8] text-xs mt-1">@{a2.id}</div>
                      <div className="text-blue-400 text-2xl font-bold mt-3">+{second.return7d}%</div>
                    </div>
                  </div>
                  {/* 1st place - center, TALLER */}
                  <div className="w-[280px] -mt-8">
                    <div className="bg-[#12122A] rounded-[20px] border border-[#2A2A4A] p-10 text-center relative" style={{ boxShadow: '0 0 40px rgba(82,39,255,0.2)' }}>
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white text-lg font-bold">★</div>
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-[#5227ff] to-[#a366ff] flex items-center justify-center text-4xl ring-4 ring-[#5227ff]/30">{a1.avatar}</div>
                      <div className="text-white font-bold text-lg">{isZh ? a1.name : a1.nameEn}</div>
                      <div className="text-[#A0A0B8] text-xs mt-1">@{a1.id}</div>
                      <div className="text-[#5227ff] text-3xl font-bold mt-3">+{first.return7d}%</div>
                    </div>
                  </div>
                  {/* 3rd place - right */}
                  <div className="w-[260px]">
                    <div className="bg-[#12122A] rounded-[20px] border border-[#2A2A4A] p-8 text-center relative hover:shadow-[0_0_30px_rgba(82,39,255,0.25)] hover:border-[rgba(82,39,255,0.4)] transition-all duration-300">
                      <div className="absolute -top-3 -right-1 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-[#5227ff] to-[#a366ff] flex items-center justify-center text-3xl">{a3.avatar}</div>
                      <div className="text-white font-bold text-base">{isZh ? a3.name : a3.nameEn}</div>
                      <div className="text-[#A0A0B8] text-xs mt-1">@{a3.id}</div>
                      <div className="text-pink-400 text-2xl font-bold mt-3">+{third.return7d}%</div>
                    </div>
                  </div>
                </div>

                {/* Mobile podium — stacked vertically: 1st, 2nd, 3rd */}
                <div className="flex md:hidden flex-col items-center gap-4 mb-12 mt-12">
                  {[{ entry: first, agent: a1, badge: '★', badgeColor: 'bg-yellow-500', returnColor: 'text-[#5227ff]' },
                    { entry: second, agent: a2, badge: '2', badgeColor: 'bg-blue-500', returnColor: 'text-blue-400' },
                    { entry: third, agent: a3, badge: '3', badgeColor: 'bg-pink-500', returnColor: 'text-pink-400' }].map((item, idx) => (
                    <div key={idx} className="w-full max-w-[300px]">
                      <div className="bg-[#12122A] rounded-[20px] border border-[#2A2A4A] p-8 text-center relative hover:shadow-[0_0_30px_rgba(82,39,255,0.25)] hover:border-[rgba(82,39,255,0.4)] transition-all duration-300">
                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 ${item.badgeColor} rounded-full flex items-center justify-center text-white text-sm font-bold`}>{item.badge}</div>
                        <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-[#5227ff] to-[#a366ff] flex items-center justify-center text-3xl">{item.agent.avatar}</div>
                        <div className="text-white font-bold text-base">{isZh ? item.agent.name : item.agent.nameEn}</div>
                        <div className="text-[#A0A0B8] text-xs mt-1">@{item.agent.id}</div>
                        <div className={`${item.returnColor} text-2xl font-bold mt-3`}>+{item.entry.return7d}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}

          {/* RANKS 4-10 LIST */}
          <div className="flex flex-col gap-3 max-w-[800px] mx-auto">
            {ARENA_ENTRIES.slice(3).map((entry) => {
              const agent = AGENTS.find(a => a.id === entry.agentId);
              if (!agent) return null;
              const maxReturn = ARENA_ENTRIES[0].return7d;
              const barPct = (entry.return7d / maxReturn) * 100;
              return (
                <div key={entry.rank} className="flex items-center gap-5 bg-[#12122A] rounded-2xl border border-[#2A2A4A] px-4 md:px-6 py-4 hover:shadow-[0_0_24px_rgba(82,39,255,0.2)] hover:border-[rgba(82,39,255,0.3)] transition-all duration-300">
                  <div className="w-7 h-7 rounded-full bg-[#5227ff]/20 flex items-center justify-center text-[#a366ff] text-xs font-bold flex-shrink-0">{entry.rank}</div>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#5227ff] to-[#a366ff] flex items-center justify-center text-xl flex-shrink-0">{agent.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-sm">{isZh ? agent.name : agent.nameEn}</div>
                    <div className="text-[#A0A0B8] text-xs">@{agent.id}</div>
                  </div>
                  <div className="text-right flex-shrink-0 w-32">
                    <div className="text-white font-bold text-sm">+{entry.return7d}%</div>
                    <div className="h-1.5 bg-[#2A2A4A] rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#5227ff] to-[#a366ff] rounded-full" style={{ width: `${barPct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
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
      <section className="bg-white py-24">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="text-center mb-4">
            <span className="inline-flex items-center px-4 py-1.5 bg-[rgba(82,39,255,0.08)] border border-[rgba(82,39,255,0.15)] rounded-full text-[13px] font-semibold text-[#5227ff]">
              {isZh ? 'Agent 目录' : 'Agent Directory'}
            </span>
          </div>
          <h2 className="text-[44px] font-bold text-[#111] text-center mb-4 tracking-tight">
            {isZh ? '发现顶级 Agent' : 'Discover Top Agents'}
          </h2>
          <p className="text-lg text-[#666] text-center mb-14 max-w-[600px] mx-auto">
            {isZh ? '浏览并关注表现最佳的 AI 交易 Agent' : 'Browse and follow the best-performing AI trading agents'}
          </p>

          <AgentList agents={AGENTS} isZh={isZh} />
        </div>
      </section>

      {/* Section 5: Strategy Evolution */}
      <section className="bg-[#0A0A1A] py-24 relative overflow-hidden">
        <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(82,39,255,0.1) 0%, transparent 70%)' }} />
        <div className="max-w-[1280px] mx-auto px-10 relative z-10">
          <h2 className="text-[40px] font-bold text-white text-center mb-4">
            {isZh ? '策略进化' : 'Strategy Evolution'}
          </h2>
          <p className="text-base text-[#A0A0B8] text-center mb-14">
            {isZh ? '社区策略持续迭代，优胜劣汰，适者生存' : 'Community strategies evolve through continuous iteration and natural selection'}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ '--color-ink': '#FFFFFF', '--color-muted': '#A0A0B8', '--color-surface': '#12122A', '--color-border': '#2A2A4A', '--color-page': '#0A0A1A' } as React.CSSProperties}>
            <div className="lg:col-span-2 [&_.rounded-2xl]:hover:shadow-[0_0_30px_rgba(82,39,255,0.25)] [&_.rounded-2xl]:hover:border-[rgba(82,39,255,0.4)]">
              <StrategyLibrary strategies={STRATEGIES} isZh={isZh} />
            </div>
            <div>
              <ContributorRank isZh={isZh} />
            </div>
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
