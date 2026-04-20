'use client';

import { useT } from '@/i18n/LocaleContext';
import { Users, ShieldCheck, MessageSquare } from 'lucide-react';

/**
 * v1.2 – v1.4: Deep B companion capability cards.
 * Embedded below the v1.1 chat wizard in Act 2.
 */

function PermissionHierarchy({ isZh }: { isZh: boolean }) {
  const levels = isZh
    ? [
        { label: '主账户', sub: '完全控制权', width: 'w-full', bg: 'bg-brand text-white' },
        { label: '子账户 A', sub: '现货 + 查询', width: 'w-5/6 mx-auto', bg: 'bg-brand-soft border border-brand-light text-brand' },
        { label: '子账户 B', sub: '仅查询', width: 'w-4/6 mx-auto', bg: 'bg-surface border border-border text-muted' },
        { label: 'Agent 访客', sub: '只读行情', width: 'w-3/6 mx-auto', bg: 'bg-gray-50 border border-border text-muted' },
      ]
    : [
        { label: 'Master Account', sub: 'Full control', width: 'w-full', bg: 'bg-brand text-white' },
        { label: 'Sub-account A', sub: 'Spot + Query', width: 'w-5/6 mx-auto', bg: 'bg-brand-soft border border-brand-light text-brand' },
        { label: 'Sub-account B', sub: 'Query only', width: 'w-4/6 mx-auto', bg: 'bg-surface border border-border text-muted' },
        { label: 'Agent Guest', sub: 'Read-only quotes', width: 'w-3/6 mx-auto', bg: 'bg-gray-50 border border-border text-muted' },
      ];

  return (
    <div className="space-y-2 py-4">
      {levels.map((l, i) => (
        <div key={i} className={`${l.width} transition-all`}>
          <div className={`rounded-lg px-4 py-2.5 text-center ${l.bg}`}>
            <div className="text-sm font-semibold">{l.label}</div>
            <div className="text-xs opacity-70">{l.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RiskFlowDiagram({ isZh }: { isZh: boolean }) {
  const steps = isZh
    ? [
        { label: '订单提交', icon: '📝', color: 'bg-blue-50 border-blue-200 text-blue-800' },
        { label: '风控引擎', icon: '🛡️', color: 'bg-yellow-50 border-yellow-200 text-yellow-800', sub: '频率 / 额度 / IP' },
        { label: '阈值判断', icon: '⚖️', color: 'bg-orange-50 border-orange-200 text-orange-800', sub: '单笔 > $10k 触发' },
        { label: '用户二次确认', icon: '✅', color: 'bg-green-50 border-green-200 text-green-800' },
      ]
    : [
        { label: 'Order submitted', icon: '📝', color: 'bg-blue-50 border-blue-200 text-blue-800' },
        { label: 'Risk engine', icon: '🛡️', color: 'bg-yellow-50 border-yellow-200 text-yellow-800', sub: 'Rate / Amount / IP' },
        { label: 'Threshold check', icon: '⚖️', color: 'bg-orange-50 border-orange-200 text-orange-800', sub: 'Single > $10k triggers' },
        { label: 'User confirmation', icon: '✅', color: 'bg-green-50 border-green-200 text-green-800' },
      ];

  return (
    <div className="flex flex-col gap-0 py-4">
      {steps.map((s, i) => (
        <div key={i} className="flex items-stretch gap-3">
          <div className="flex flex-col items-center">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-base ${s.color}`}>
              {s.icon}
            </div>
            {i < steps.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
          </div>
          <div className={`mb-3 flex-1 rounded-xl border px-4 py-2.5 ${s.color}`}>
            <div className="text-sm font-semibold">{s.label}</div>
            {s.sub && <div className="text-xs opacity-70 mt-0.5">{s.sub}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function NotificationChannels({ isZh }: { isZh: boolean }) {
  return (
    <div className="grid gap-3 py-4">
      {/* Telegram mock */}
      <div className="rounded-xl border border-gray-200 bg-[#effdde] p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-[#229ed9] flex items-center justify-center">
            <span className="text-xs font-bold text-white">TG</span>
          </div>
          <span className="text-xs font-semibold text-gray-600">Claw 42 Agent Bot</span>
        </div>
        <div className="rounded-2xl rounded-tl-none bg-white px-3 py-2 shadow-sm text-xs text-gray-800 max-w-[90%]">
          {isZh
            ? '🔔 你的限价单已成交：BTC/USDT 0.5 @ $85,000\n盈亏：+$1,247 (+2.91%)'
            : '🔔 Limit order filled: BTC/USDT 0.5 @ $85,000\nPnL: +$1,247 (+2.91%)'}
        </div>
      </div>
      {/* Email mock */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-2 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span className="text-xs font-semibold text-gray-500">
            {isZh ? '发件人：noreply@coinw.com' : 'From: noreply@coinw.com'}
          </span>
        </div>
        <div className="text-xs font-bold text-gray-800 mb-1">
          {isZh ? '[Claw 42] 日报 · 2026-04-14' : '[Claw 42] Daily Report · 2026-04-14'}
        </div>
        <div className="text-xs text-gray-500 leading-relaxed">
          {isZh
            ? 'BTC +2.3%  ETH +1.8%  SOL +4.1%\n总市值 $3.2T · 净流入 $520M\n恐贪指数：68（贪婪）'
            : 'BTC +2.3%  ETH +1.8%  SOL +4.1%\nTotal cap $3.2T · Net inflow $520M\nFear/Greed: 68 (Greed)'}
        </div>
      </div>
    </div>
  );
}

interface Card {
  version: string;
  icon: React.ElementType;
  title: { zh: string; en: string };
  points: { zh: string; en: string }[];
  demo: React.ReactNode;
}

export function CompanionCapabilities() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  const cards: Card[] = [
    {
      version: 'v1.2',
      icon: Users,
      title: { zh: '多账户与权限分级', en: 'Multi-account & Permission Tiers' },
      points: [
        { zh: '主账户统管全部子账户，权限从上往下逐级收紧', en: 'Master account governs all sub-accounts with cascading permission scopes' },
        { zh: 'Agent 访客只能读行情，不能下单', en: 'Agent guests are read-only — cannot place orders' },
        { zh: '每层权限可细粒度配置（现货/合约/划转）', en: 'Each tier configurable at feature level (spot/futures/transfer)' },
        { zh: '子账户之间完全隔离，互不可见', en: 'Sub-accounts are fully isolated from each other' },
      ],
      demo: <PermissionHierarchy isZh={isZh} />,
    },
    {
      version: 'v1.3',
      icon: ShieldCheck,
      title: { zh: '风控与大额二次确认', en: 'Risk Gate & Large-trade Confirm' },
      points: [
        { zh: '每笔订单过三道关：频率 / 额度 / IP 白名单', en: 'Every order clears three gates: rate / amount / IP whitelist' },
        { zh: '单笔 > $10,000 强制触发用户确认弹窗', en: 'Orders > $10,000 force a user-confirmation popup' },
        { zh: '风控引擎异常熔断，自动挂起 Agent 权限', en: 'Anomaly detection trips circuit breaker, suspends agent permissions' },
        { zh: '拦截记录实时审计，不可删改', en: 'Block logs are immutable and available for real-time audit' },
      ],
      demo: <RiskFlowDiagram isZh={isZh} />,
    },
    {
      version: 'v1.4',
      icon: MessageSquare,
      title: { zh: 'TG Bot + 邮件通道', en: 'Telegram Bot + Email Channel' },
      points: [
        { zh: 'Agent 操作实时推送 Telegram 通知', en: 'Real-time Telegram push on every agent action' },
        { zh: '日报、周报定时发送到你的邮箱', en: 'Daily/weekly reports scheduled to your inbox' },
        { zh: '大额订单成交时短信备份告警', en: 'SMS backup alert when large orders fill' },
        { zh: '通知模板可自定义，支持多语言', en: 'Customizable templates, multi-language support' },
      ],
      demo: <NotificationChannels isZh={isZh} />,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 border-t border-border">
      <div className="mb-10">
        <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand mb-4">
          v1.2 · v1.3 · v1.4
        </span>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {isZh ? '配套能力' : 'Companion Capabilities'}
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          {isZh
            ? '在 Agent 对话之外，三项基础设施让托管交易真正可信：多账户隔离、风险熔断、实时通知。'
            : 'Beyond the chat interface, three infra layers make managed trading trustworthy: account isolation, risk gates, and real-time notifications.'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.version} className="cw-card-interactive rounded-2xl border border-border bg-white p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft">
                  <Icon className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <div className="font-mono text-[11px] text-muted">{card.version}</div>
                  <div className="text-base font-semibold text-ink">
                    {isZh ? card.title.zh : card.title.en}
                  </div>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {card.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted">
                    <span className="text-brand mt-0.5 shrink-0">·</span>
                    {isZh ? p.zh : p.en}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">{card.demo}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
