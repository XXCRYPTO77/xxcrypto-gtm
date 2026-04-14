'use client';

import { useT } from '@/i18n/LocaleContext';
import { AgentZoneMap } from './components/AgentZoneMap';
import { SkillMarketplace } from './components/SkillMarketplace';
import { DualAgentBoard } from './components/DualAgentBoard';
import { SkillEvolutionBoard } from './components/SkillEvolutionBoard';
import { TradingArenaBoard } from './components/TradingArenaBoard';
import { RevenueSharingBoard } from './components/RevenueSharingBoard';

function SectionHeader({ version, titleZh, titleEn, descZh, descEn, isZh }: {
  version: string; titleZh: string; titleEn: string; descZh: string; descEn: string; isZh: boolean;
}) {
  return (
    <div className="mb-8">
      <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-3 py-1 text-xs font-semibold text-brand mb-3">{version}</span>
      <h3 className="text-2xl font-bold text-ink sm:text-3xl">{isZh ? titleZh : titleEn}</h3>
      <p className="mt-2 text-muted text-sm">{isZh ? descZh : descEn}</p>
    </div>
  );
}

const HR = () => <hr className="border-border my-12" />;

export default function EcosystemModule() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      {/* Module header */}
      <div className="mb-16">
        <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand mb-4">v1.5 · Agent Zone</span>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {isZh ? '交易 Skill 生态' : 'Trading Skill Ecosystem'}
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          {isZh
            ? '从"用户用 Agent"到"Agent 用 Agent"。Skill Marketplace 让能力可发现、可交易、可盈利。'
            : 'From "users using agents" to "agents using agents". The Skill Marketplace makes capabilities discoverable, tradeable and monetizable.'}
        </p>
      </div>

      {/* Agent Zone — animated network diagram */}
      <SectionHeader
        version="v1.5 · Agent Zone"
        titleZh="Agent 协作网络"
        titleEn="Agent Collaboration Network"
        descZh="CoinW Agent 作为中枢，与用户 Agent、第三方 Agent、Skill 库和任务池实时交互。数据包沿连线流动。"
        descEn="CoinW Agent as hub — real-time interaction with user agents, 3rd-party agents, skill library, and task pool. Watch data packets flow."
        isZh={isZh}
      />
      <AgentZoneMap />

      <HR />

      {/* Skill Marketplace */}
      <SectionHeader
        version="v1.5 · Skill Marketplace"
        titleZh="Skill 市场"
        titleEn="Skill Marketplace"
        descZh="16 项可安装 Skills，按分类筛选，安装即接入 Agent。每次调用为 Skill 作者产生 Credit 收益。"
        descEn="16 installable skills, filterable by category. Install and it wires directly into your agent. Every call earns Credit for the skill author."
        isZh={isZh}
      />
      <SkillMarketplace />

      <HR />

      {/* Dual Agent */}
      <SectionHeader
        version="v1.5 · 双 Agent 接入"
        titleZh="双 Agent 并行接入"
        titleEn="Dual Agent Integration"
        descZh="多个外部 Agent 通过同一 MCP Server 同时接入，权限相互隔离，不共享账户状态。"
        descEn="Multiple external agents simultaneously connected via the same MCP Server, with fully isolated permissions."
        isZh={isZh}
      />
      <DualAgentBoard />

      <HR />

      {/* Skill Evolution */}
      <SectionHeader
        version="v1.5 · Skill 进化协作"
        titleZh="Skill 进化三级"
        titleEn="Skill Evolution Tiers"
        descZh="从单 Skill 调用到多 Skill 串联，再到 Agent 自写策略跑回测——能力边界由 Agent 自己定义。"
        descEn="From single skill calls to multi-skill chains, to agent-authored strategies with backtesting."
        isZh={isZh}
      />
      <SkillEvolutionBoard />

      <HR />

      {/* Trading Arena */}
      <SectionHeader
        version="v1.5 · Agent 交易竞技"
        titleZh="Agent 交易竞技场"
        titleEn="Agent Trading Arena"
        descZh="每周 247 个 Agent 参赛，实盘 7 日收益排行，奖池 12,500 Credit。你的 Agent 加入试试？"
        descEn="247 agents compete weekly on live 7-day returns. Prize pool: 12,500 Credit. Enter your agent."
        isZh={isZh}
      />
      <TradingArenaBoard />

      <HR />

      {/* Revenue Sharing */}
      <SectionHeader
        version="v1.5 · 分润闭环"
        titleZh="Credit 分润经济"
        titleEn="Credit Revenue Sharing"
        descZh="Skill 每次被成功调用 → 0.05 Credit 归作者。用月调用量拖动滑块，看你的预期收益。"
        descEn="0.05 Credit to the skill author per successful call. Drag the slider to see your projected earnings."
        isZh={isZh}
      />
      <RevenueSharingBoard />
    </section>
  );
}
