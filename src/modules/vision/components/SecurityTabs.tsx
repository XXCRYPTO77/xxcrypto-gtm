'use client';

import { useState } from 'react';
import { useT } from '@/i18n/LocaleContext';

type TabId = 'architecture' | 'threat' | 'cicd' | 'merge';

// ── Architecture tab ──────────────────────────────────────────────────────────

function ArchitectureTab({ isZh }: { isZh: boolean }) {
  const LAYERS = isZh ? [
    { label: 'Agent 层', sub: 'Claude / GPT / 自定义 Agent', color: 'bg-purple-50 border-purple-200 text-purple-800' },
    { label: 'MCP Server', sub: 'CoinW Skills Runtime · 协议路由 + 权限验证', color: 'bg-brand-soft border-brand-light text-brand' },
    { label: 'Permission Gateway', sub: 'API Key 解析 · 权限分级 · 频率限制 · 额度检查', color: 'bg-blue-50 border-blue-200 text-blue-800' },
    { label: 'Exchange API', sub: 'CoinW 内部 REST/WS · 现货 + 合约 + 账户', color: 'bg-gray-100 border-gray-300 text-gray-700' },
  ] : [
    { label: 'Agent Layer', sub: 'Claude / GPT / Custom Agent', color: 'bg-purple-50 border-purple-200 text-purple-800' },
    { label: 'MCP Server', sub: 'CoinW Skills Runtime · Protocol routing + auth', color: 'bg-brand-soft border-brand-light text-brand' },
    { label: 'Permission Gateway', sub: 'API Key parse · Permission tiers · Rate limits · Amount caps', color: 'bg-blue-50 border-blue-200 text-blue-800' },
    { label: 'Exchange API', sub: 'CoinW Internal REST/WS · Spot + Futures + Account', color: 'bg-gray-100 border-gray-300 text-gray-700' },
  ];

  return (
    <div className="space-y-3 py-4">
      <p className="text-xs text-muted mb-5">
        {isZh
          ? '四层拓扑：Agent 发出指令 → MCP 路由 → 权限网关过滤 → 交易所 API 执行。每层之间单向通信，下层不信任上层身份。'
          : 'Four-layer topology: Agent issues command → MCP routes → Permission Gateway filters → Exchange API executes. One-way trust: each layer re-validates.'}
      </p>
      {LAYERS.map((layer, i) => (
        <div key={i} className="relative">
          <div className={`rounded-xl border px-5 py-4 ${layer.color}`}>
            <p className="font-semibold text-sm">{layer.label}</p>
            <p className="text-xs mt-0.5 opacity-80">{layer.sub}</p>
          </div>
          {i < LAYERS.length - 1 && (
            <div className="flex justify-center py-1">
              <div className="h-5 w-px bg-gray-300" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Threat Model tab ──────────────────────────────────────────────────────────

function ThreatTab({ isZh }: { isZh: boolean }) {
  const THREATS = isZh
    ? ['欺骗 (Spoofing)', '篡改 (Tampering)', '抵赖 (Repudiation)', '信息泄露 (Info Disc.)', '拒绝服务 (DoS)', '权限提升 (Elevation)']
    : ['Spoofing', 'Tampering', 'Repudiation', 'Info Disclosure', 'DoS', 'Elevation'];

  const ENTRY_POINTS = isZh
    ? ['Agent 输入', 'MCP 请求', '权限网关', '交易所 API', '用户界面']
    : ['Agent Input', 'MCP Request', 'Permission GW', 'Exchange API', 'User Interface'];

  const MITIGATIONS: Record<string, string> = {
    '欺骗 (Spoofing)·Agent 输入': 'API Key 绑定验证', 'Spoofing·Agent Input': 'API Key binding',
    '欺骗 (Spoofing)·MCP 请求': 'HMAC-SHA256 签名', 'Spoofing·MCP Request': 'HMAC-SHA256 signing',
    '欺骗 (Spoofing)·权限网关': 'Key 指纹比对', 'Spoofing·Permission GW': 'Key fingerprint check',
    '欺骗 (Spoofing)·交易所 API': '内部双向 TLS', 'Spoofing·Exchange API': 'Internal mTLS',
    '欺骗 (Spoofing)·用户界面': '二次确认', 'Spoofing·User Interface': 'Secondary confirm',
    '篡改 (Tampering)·Agent 输入': '输入校验', 'Tampering·Agent Input': 'Input validation',
    '篡改 (Tampering)·MCP 请求': '请求签名', 'Tampering·MCP Request': 'Request signing',
    '篡改 (Tampering)·权限网关': '幂等校验', 'Tampering·Permission GW': 'Idempotency check',
    '篡改 (Tampering)·交易所 API': '审计日志', 'Tampering·Exchange API': 'Audit log',
    '篡改 (Tampering)·用户界面': 'CSP 头', 'Tampering·User Interface': 'CSP headers',
    '抵赖 (Repudiation)·Agent 输入': '操作留痕', 'Repudiation·Agent Input': 'Action log',
    '信息泄露 (Info Disc.)·交易所 API': 'TLS 1.3', 'Info Disclosure·Exchange API': 'TLS 1.3',
    '拒绝服务 (DoS)·MCP 请求': '频率限制', 'DoS·MCP Request': 'Rate limiting',
    '拒绝服务 (DoS)·权限网关': '熔断器', 'DoS·Permission GW': 'Circuit breaker',
    '权限提升 (Elevation)·权限网关': '最小权限', 'Elevation·Permission GW': 'Least privilege',
    '权限提升 (Elevation)·用户界面': '大额确认', 'Elevation·User Interface': 'Large-trade confirm',
  };

  return (
    <div className="py-4 overflow-x-auto">
      <p className="text-xs text-muted mb-5">
        {isZh
          ? '6 类 STRIDE 威胁 × 5 个入口 = 30 格矩阵。有缓解措施的格子标注措施，空格 = 低风险/不适用。'
          : '6 STRIDE threat classes × 5 entry points = 30-cell matrix. Cells with mitigations noted; empty = low risk or N/A.'}
      </p>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="border border-border bg-gray-50 px-3 py-2 text-left text-muted font-semibold">
              {isZh ? '威胁 \\ 入口' : 'Threat \\ Entry'}
            </th>
            {ENTRY_POINTS.map((ep) => (
              <th key={ep} className="border border-border bg-gray-50 px-3 py-2 text-center text-muted font-semibold min-w-24">
                {ep}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {THREATS.map((threat, ti) => (
            <tr key={ti} className={ti % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <td className="border border-border px-3 py-2 font-medium text-ink whitespace-nowrap">{threat}</td>
              {ENTRY_POINTS.map((ep) => {
                const key = `${threat}·${ep}`;
                const mit = MITIGATIONS[key];
                return (
                  <td key={ep} className="border border-border px-3 py-2 text-center">
                    {mit ? (
                      <span className="inline-block rounded bg-brand-soft px-2 py-0.5 text-xs text-brand font-medium">
                        {mit}
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── CI/CD tab ─────────────────────────────────────────────────────────────────

function CicdTab({ isZh }: { isZh: boolean }) {
  const STAGES = isZh ? [
    { label: '代码提交', detail: 'PR 要求 1 名 reviewer 审批', color: 'bg-gray-100 text-gray-700' },
    { label: '静态扫描', detail: 'ESLint · TypeScript 严格模式 · Snyk 依赖审计', color: 'bg-blue-50 text-blue-700' },
    { label: '沙盒测试', detail: 'Mock API 环境 · 单元测试 · 权限矩阵回归', color: 'bg-purple-50 text-purple-700' },
    { label: '风控灰度', detail: '先 1% 流量 · 监控异常调用率 · 自动回滚阈值', color: 'bg-yellow-50 text-yellow-700' },
    { label: '生产上线', detail: '全量放量 · 审计日志启用 · 告警规则激活', color: 'bg-green-50 text-green-700' },
  ] : [
    { label: 'Code commit', detail: 'PR requires 1 reviewer approval', color: 'bg-gray-100 text-gray-700' },
    { label: 'Static scan', detail: 'ESLint · TypeScript strict · Snyk dependency audit', color: 'bg-blue-50 text-blue-700' },
    { label: 'Sandbox test', detail: 'Mock API env · Unit tests · Permission matrix regression', color: 'bg-purple-50 text-purple-700' },
    { label: 'Risk-controlled rollout', detail: '1% traffic first · Watch anomalous call rate · Auto-rollback threshold', color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Production', detail: 'Full rollout · Audit logging active · Alert rules live', color: 'bg-green-50 text-green-700' },
  ];

  return (
    <div className="py-4">
      <p className="text-xs text-muted mb-6">
        {isZh
          ? '五段流水线。每个阶段都有明确的通过标准，任何阶段失败直接阻断后续，不允许绕过。'
          : 'Five-stage pipeline. Each stage has explicit pass criteria — failure at any stage blocks downstream. No bypasses.'}
      </p>
      <div className="flex flex-col gap-0">
        {STAGES.map((s, i) => (
          <div key={i} className="relative flex gap-4 items-stretch">
            {/* Connector line */}
            <div className="flex flex-col items-center">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${s.color}`}>
                {i + 1}
              </div>
              {i < STAGES.length - 1 && (
                <div className="w-px flex-1 bg-gray-200 my-1" />
              )}
            </div>
            <div className={`mb-3 flex-1 rounded-xl border-0 ${s.color} px-4 py-3`}>
              <p className="text-sm font-bold">{s.label}</p>
              <p className="text-xs mt-0.5 opacity-80">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Merge-back tab ────────────────────────────────────────────────────────────

function MergeTab({ isZh }: { isZh: boolean }) {
  const PHASES = isZh ? [
    {
      n: 1,
      title: '独立 MCP Server',
      version: 'v1.0 – v1.5',
      desc: 'xxcrypto-gtm 独立部署，与 CoinW 主站完全解耦。快速迭代验证，不占用主站排期。',
      items: ['独立 Vercel 部署', 'Agent 通过外部 URL 接入', '主站无依赖'],
    },
    {
      n: 2,
      title: '混合部署',
      version: 'v1.6 – v1.9',
      desc: '安全基座就位后，各模块逐步迁移。模块设计从第一天就保证可独立抽出。',
      items: ['模块化代码库（已实现）', '安全审计完成', 'API 规范对齐主站标准', '灰度接入主站流量'],
    },
    {
      n: 3,
      title: '主站原生集成',
      version: 'v2.0+',
      desc: 'Agent Skill 从独立部署升级为 CoinW App 内原生品类，进入正式产品序列。',
      items: ['CoinW App 原生入口', 'Agent Skill 品类页', '全量用户可见', '持续迭代（v2.x）'],
    },
  ] : [
    {
      n: 1,
      title: 'Standalone MCP Server',
      version: 'v1.0 – v1.5',
      desc: 'xxcrypto-gtm deployed independently, fully decoupled from the main site. Fast iteration without blocking main site schedules.',
      items: ['Standalone Vercel deploy', 'Agents connect via external URL', 'Zero main-site dependency'],
    },
    {
      n: 2,
      title: 'Hybrid deployment',
      version: 'v1.6 – v1.9',
      desc: 'Security base in place. Modules migrate progressively — modular architecture ensures each can be extracted independently.',
      items: ['Modular codebase (already implemented)', 'Security audit complete', 'API spec aligned to main-site standards', 'Gradual main-site traffic integration'],
    },
    {
      n: 3,
      title: 'Native main-site integration',
      version: 'v2.0+',
      desc: 'Agent Skill graduates from standalone deployment to a native product category inside the CoinW App.',
      items: ['CoinW App native entry point', 'Agent Skill category page', 'Full user visibility', 'Ongoing iteration (v2.x)'],
    },
  ];

  return (
    <div className="py-4 grid gap-4 md:grid-cols-3">
      {PHASES.map((p) => (
        <div key={p.n} className="rounded-xl border border-border bg-white p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white text-sm font-bold">
              {p.n}
            </div>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-muted">
              {p.version}
            </span>
          </div>
          <h3 className="text-sm font-bold text-ink">{p.title}</h3>
          <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
          <ul className="space-y-1.5 mt-auto">
            {p.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-muted">
                <span className="text-brand mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const TABS: Array<{ id: TabId; zh: string; en: string }> = [
  { id: 'architecture', zh: '系统架构', en: 'Architecture' },
  { id: 'threat',       zh: '威胁模型', en: 'Threat Model' },
  { id: 'cicd',         zh: 'CI/CD 流水线', en: 'CI/CD Pipeline' },
  { id: 'merge',        zh: '合回主站', en: 'Merge-back Path' },
];

export function SecurityTabs() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const [activeTab, setActiveTab] = useState<TabId>('architecture');

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <h2 className="text-3xl font-bold text-ink sm:text-4xl mb-2">
        {isZh ? '安全架构深潜' : 'Security Architecture'}
      </h2>
      <p className="text-sm text-muted mb-8">
        {isZh
          ? 'v1.6 – v1.9 安全基座的四个维度：系统拓扑、威胁建模、开发流水线、合回主站路径。'
          : 'Four dimensions of the v1.6–v1.9 security foundation: system topology, threat modeling, dev pipeline, and merge-back path.'}
      </p>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-border mb-0 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-brand text-brand'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {isZh ? tab.zh : tab.en}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="border-x border-b border-border rounded-b-2xl px-6 bg-white">
        {activeTab === 'architecture' && <ArchitectureTab isZh={isZh} />}
        {activeTab === 'threat'       && <ThreatTab isZh={isZh} />}
        {activeTab === 'cicd'         && <CicdTab isZh={isZh} />}
        {activeTab === 'merge'        && <MergeTab isZh={isZh} />}
      </div>
    </section>
  );
}
