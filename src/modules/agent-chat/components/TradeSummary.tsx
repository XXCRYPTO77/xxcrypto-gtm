'use client';

import { useState } from 'react';
import {
  FileText,
  CheckCircle,
  DollarSign,
  Link,
} from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';
import { useT } from '@/i18n/LocaleContext';

interface TradeSummaryProps {
  onNext: () => void;
  agentName?: string;
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  CheckCircle,
  DollarSign,
  Link,
};

const SUMMARY = {
  date: '2026-04-14',
  duration: '28 min',
  pnl: { usd: 1247, pct: 2.91 },
  skillsUsed: 7,
  trades: 2,
  avgLatency: '1.3s',
  skillBreakdown: [
    { code: 'M1', name: '实时行情', nameEn: 'Quotes', calls: 12, ms: 1450 },
    { code: 'M2', name: '涨跌排行', nameEn: 'Gainers/Losers', calls: 1, ms: 320 },
    { code: 'M4', name: '市场概览', nameEn: 'Market Overview', calls: 2, ms: 680 },
    { code: 'M5', name: '下单', nameEn: 'Order', calls: 2, ms: 410 },
    { code: 'M6', name: '订单查询', nameEn: 'Order Query', calls: 3, ms: 290 },
    { code: 'M7', name: '余额查询', nameEn: 'Balance', calls: 4, ms: 230 },
    { code: 'M11', name: 'API Key 认证', nameEn: 'API Auth', calls: 5, ms: 180 },
  ],
  timeline: [
    { time: '10:32', zh: '挂单 BTC/USDT 限价买入 0.5 BTC @ $85,000', en: 'Placed BTC/USDT limit buy 0.5 BTC @ $85,000', icon: 'FileText' },
    { time: '10:45', zh: 'BTC 触及 $85,000，订单成交', en: 'BTC hit $85,000, order filled', icon: 'CheckCircle' },
    { time: '11:02', zh: 'Agent 建议止盈 +2%，执行市价卖出', en: 'Agent suggested +2% take-profit, executed', icon: 'DollarSign' },
    { time: '11:20', zh: 'MCP 对接完成，18 项 Skills 上线', en: 'MCP connected, 18 skills online', icon: 'Link' },
  ],
};

const MAX_CALLS = 12;

export default function TradeSummary({ onNext, agentName = 'CWClaw' }: TradeSummaryProps) {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">
            {isZh ? `${agentName} 今日的表现` : `${agentName}'s Performance Today`}
          </h1>
          <p className="mt-1 text-muted">
            {SUMMARY.date} · {SUMMARY.duration}
          </p>
        </div>
        <Badge tone="success" className="flex items-center gap-1.5">
          <CheckCircle className="h-3.5 w-3.5" />
          {isZh ? '交易完成' : 'Trade Complete'}
        </Badge>
      </div>

      {/* 4 metric cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card variant="elevated">
          <p className="text-sm text-muted">PnL</p>
          <p className="mt-1 text-2xl font-bold text-accent-green">
            +${SUMMARY.pnl.usd.toLocaleString()}
          </p>
          <Badge tone="success" className="mt-2">+{SUMMARY.pnl.pct}%</Badge>
        </Card>
        <Card variant="elevated">
          <p className="text-sm text-muted">{isZh ? 'Skills 使用' : 'Skills Used'}</p>
          <p className="mt-1 text-2xl font-bold text-brand">{SUMMARY.skillsUsed}</p>
        </Card>
        <Card variant="elevated">
          <p className="text-sm text-muted">{isZh ? '交易笔数' : 'Trades'}</p>
          <p className="mt-1 text-2xl font-bold text-ink">{SUMMARY.trades}</p>
        </Card>
        <Card variant="elevated">
          <p className="text-sm text-muted">{isZh ? '平均延迟' : 'Avg Latency'}</p>
          <p className="mt-1 text-2xl font-bold text-ink">{SUMMARY.avgLatency}</p>
        </Card>
      </div>

      {/* 2-column content */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left — Skill Usage */}
        <Card variant="elevated">
          <h2 className="mb-4 text-lg font-semibold text-ink">
            {isZh ? 'Skill 使用明细' : 'Skill Usage Breakdown'}
          </h2>
          <div className="flex flex-col gap-3">
            {SUMMARY.skillBreakdown.map((s) => (
              <div key={s.code} className="flex items-center gap-3">
                <Badge tone="neutral">{s.code}</Badge>
                <span className="min-w-[5rem] text-sm font-medium text-ink">
                  {isZh ? s.name : s.nameEn}
                </span>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-brand-soft">
                    <div
                      className="h-2 rounded-full bg-brand"
                      style={{ width: `${(s.calls / MAX_CALLS) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="shrink-0 text-xs text-muted">
                  {s.calls} calls · {s.ms}ms
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Right — Timeline */}
        <Card variant="elevated">
          <h2 className="mb-4 text-lg font-semibold text-ink">
            {isZh ? '关键事件' : 'Key Events'}
          </h2>
          <div className="relative border-l-2 border-brand-soft pl-6">
            {SUMMARY.timeline.map((ev, i) => {
              const Icon = ICONS[ev.icon] ?? FileText;
              return (
                <div key={i} className="relative mb-6 last:mb-0">
                  <div className="absolute -left-[1.9rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft">
                    <Icon className="h-3 w-3 text-brand" />
                  </div>
                  <p className="text-sm text-muted">{ev.time}</p>
                  <p className="mt-0.5 text-sm font-medium text-ink">
                    {isZh ? ev.zh : ev.en}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          onClick={onNext}
          className="rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          {isZh ? '重新开始会话 →' : 'Start New Session →'}
        </button>
        <button
          onClick={handleExport}
          className="rounded-xl border border-border px-6 py-3 font-medium text-muted hover:text-ink"
        >
          {exporting
            ? isZh ? '导出中...' : 'Exporting...'
            : isZh ? '导出复盘报告' : 'Export Report'}
        </button>
      </div>
    </div>
  );
}
