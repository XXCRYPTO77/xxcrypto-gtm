'use client';

import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';

interface TradeSummaryProps {
  onNext: () => void;
}

export default function TradeSummary({ onNext }: TradeSummaryProps) {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  const trades = [
    { time: '14:32', agent: isZh ? '保守型' : 'Conservative', action: isZh ? '买入 BTC' : 'Buy BTC', amount: '0.5', price: '$85,000', status: isZh ? '已成交' : 'Filled', tone: 'success' as const },
    { time: '11:15', agent: isZh ? '保守型' : 'Conservative', action: isZh ? '查询行情' : 'Query Market', amount: '—', price: '—', status: isZh ? '完成' : 'Done', tone: 'brand' as const },
    { time: '09:00', agent: '—', action: isZh ? 'Agent 启动' : 'Agent Started', amount: '—', price: '—', status: '—', tone: 'neutral' as const },
  ];

  const metrics = [
    { label: isZh ? '决策准确率' : 'Decision Accuracy', value: '87%' },
    { label: isZh ? '平均响应' : 'Avg Response', value: '1.2s' },
    { label: isZh ? '风控触发' : 'Risk Triggers', value: '0' },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      {/* Section A — Today's Result */}
      <div className="mb-10 text-center">
        <p className="text-4xl font-bold text-accent-green">+$1,247</p>
        <Badge tone="success" className="mt-2">+2.91%</Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 mb-10">
        {[
          isZh ? '已执行 1 笔' : '1 Trade Executed',
          isZh ? '平均成本 $85,000' : 'Avg Cost $85,000',
          isZh ? '当前估值 $86,250' : 'Current Value $86,250',
        ].map((text) => (
          <Card key={text} variant="elevated" className="text-center">
            <p className="text-sm font-medium text-ink">{text}</p>
          </Card>
        ))}
      </div>

      {/* Section B — Trade History */}
      <h3 className="text-xl font-bold text-ink mb-4">{isZh ? '交易记录' : 'Trade History'}</h3>
      <Card variant="elevated" className="mb-10 overflow-x-auto">
        {/* Desktop table */}
        <table className="w-full text-sm hidden sm:table">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="pb-3 font-medium">{isZh ? '时间' : 'Time'}</th>
              <th className="pb-3 font-medium">Agent</th>
              <th className="pb-3 font-medium">{isZh ? '操作' : 'Action'}</th>
              <th className="pb-3 font-medium">{isZh ? '数量' : 'Amount'}</th>
              <th className="pb-3 font-medium">{isZh ? '价格' : 'Price'}</th>
              <th className="pb-3 font-medium">{isZh ? '状态' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3 text-ink">{row.time}</td>
                <td className="py-3 text-ink">{row.agent}</td>
                <td className="py-3 text-ink">{row.action}</td>
                <td className="py-3 text-ink">{row.amount}</td>
                <td className="py-3 text-ink">{row.price}</td>
                <td className="py-3"><Badge tone={row.tone}>{row.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Mobile cards */}
        <div className="space-y-4 sm:hidden">
          {trades.map((row, i) => (
            <div key={i} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-muted">{row.time}</span>
                <Badge tone={row.tone}>{row.status}</Badge>
              </div>
              <p className="text-sm font-medium text-ink">{row.action}</p>
              <p className="text-xs text-muted">{row.agent} · {row.amount} · {row.price}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Section C — Agent Performance */}
      <h3 className="text-xl font-bold text-ink mb-4">{isZh ? 'Agent 表现' : 'Agent Performance'}</h3>
      <div className="grid gap-6 sm:grid-cols-3 mb-10">
        {metrics.map((m) => (
          <Card key={m.label} variant="elevated" className="text-center">
            <p className="text-2xl font-bold text-ink">{m.value}</p>
            <p className="mt-1 text-sm text-muted">{m.label}</p>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="rounded-xl bg-brand px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
        >
          {isZh ? '重新开始' : 'Start Over'}
        </button>
      </div>
    </section>
  );
}
