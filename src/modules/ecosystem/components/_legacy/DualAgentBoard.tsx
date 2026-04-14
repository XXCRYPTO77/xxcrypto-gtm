'use client';

import { useState } from 'react';
import { Bot } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';
import { useT } from '@/i18n/LocaleContext';

export function DualAgentBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const [connected, setConnected] = useState(false);

  const skills = [
    { code: 'M1', label: isZh ? '行情' : 'Market' },
    { code: 'M5', label: isZh ? '下单' : 'Order' },
    { code: 'M11', label: isZh ? '认证' : 'Auth' },
  ];

  return (
    <Card variant="elevated">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6">
        {/* Agent A */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft">
            <Bot size={28} className="text-brand" />
          </div>
          <h3 className="text-lg font-bold text-ink">Agent A: Claude</h3>
          <Badge tone="success">{isZh ? '已连接' : 'Connected'}</Badge>
          <ul className="space-y-1 text-sm text-muted">
            {skills.map((s) => (
              <li key={s.code}>
                <span className="font-mono text-xs font-bold text-ink">{s.code}</span> {s.label}
              </li>
            ))}
          </ul>
          <p className="rounded-lg bg-brand-soft px-3 py-2 text-sm font-semibold text-brand">
            BTC $87,200 ↑2.3%
          </p>
        </div>

        {/* Center divider */}
        <div className="hidden md:flex flex-col items-center justify-center gap-2">
          <span className="text-muted text-lg">←</span>
          <div className="h-24 w-px bg-border" />
          <span className="rounded-full border border-border bg-white px-3 py-1 text-xs font-bold text-muted">
            MCP Server
          </span>
          <div className="h-24 w-px bg-border" />
          <span className="text-muted text-lg">→</span>
        </div>
        {/* Mobile divider */}
        <div className="flex md:hidden items-center justify-center gap-2">
          <div className="h-px w-12 bg-border" />
          <span className="rounded-full border border-border bg-white px-3 py-1 text-xs font-bold text-muted">
            MCP Server
          </span>
          <div className="h-px w-12 bg-border" />
        </div>

        {/* Agent B */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Bot size={28} className="text-muted" />
          </div>
          <h3 className="text-lg font-bold text-ink">
            Agent B: {isZh ? '自定义 Agent' : 'Custom Agent'}
          </h3>
          {connected ? (
            <Badge tone="success">{isZh ? '已连接' : 'Connected'}</Badge>
          ) : (
            <Badge tone="warning" className="animate-pulse">{isZh ? '接入中' : 'Connecting'}</Badge>
          )}
          {connected ? (
            <ul className="space-y-1 text-sm text-muted">
              {skills.map((s) => (
                <li key={s.code}>
                  <span className="font-mono text-xs font-bold text-ink">{s.code}</span> {s.label}
                </li>
              ))}
            </ul>
          ) : (
            <button
              onClick={() => setConnected(true)}
              className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            >
              {isZh ? '一键接入' : 'Connect Now'}
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
