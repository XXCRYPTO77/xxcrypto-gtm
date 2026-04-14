'use client';

import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';
import { CheckCircle, Circle } from 'lucide-react';

export default function AuditCompliance() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  const auditRows = [
    { ts: '2026-04-13 14:32:01', agent: 'agent-cons-001', action: isZh ? '现货买入 BTC' : 'Spot Buy BTC', perm: 'spot', amount: '$42,500', result: isZh ? '✓ 通过' : '✓ Pass', tone: 'success' as const },
    { ts: '2026-04-13 14:31:58', agent: 'agent-cons-001', action: isZh ? '风控预检' : 'Risk Pre-check', perm: 'read', amount: '—', result: isZh ? '✓ 通过' : '✓ Pass', tone: 'success' as const },
    { ts: '2026-04-13 11:15:22', agent: 'agent-cons-001', action: isZh ? '行情查询' : 'Market Query', perm: 'read', amount: '—', result: isZh ? '✓ 通过' : '✓ Pass', tone: 'success' as const },
    { ts: '2026-04-13 09:00:05', agent: 'agent-cons-001', action: isZh ? 'API 绑定' : 'API Binding', perm: 'spot', amount: '—', result: isZh ? '✓ 通过' : '✓ Pass', tone: 'success' as const },
    { ts: '2026-04-12 16:44:11', agent: 'agent-cons-001', action: isZh ? '大额确认' : 'Large Tx Confirm', perm: 'spot', amount: '$95,000', result: isZh ? '⚠ 待确认' : '⚠ Pending', tone: 'warning' as const },
    { ts: '2026-04-12 09:11:33', agent: 'agent-cons-001', action: isZh ? '调用异常' : 'Call Anomaly', perm: 'futures', amount: '—', result: isZh ? '✗ 拦截' : '✗ Blocked', tone: 'danger' as const },
  ];

  const compliance = [
    { done: true, zh: '操作留痕', en: 'Immutable Logging' },
    { done: true, zh: '异常操作自动上报', en: 'Auto Anomaly Report' },
    { done: true, zh: '权限变更二次确认', en: 'Permission Change 2FA' },
    { done: true, zh: '数据加密传输 TLS 1.3', en: 'TLS 1.3 Encryption' },
    { done: false, zh: 'KYC 联动验证', en: 'KYC Integration' },
    { done: false, zh: '反洗钱 AML 监控', en: 'AML Monitoring' },
    { done: false, zh: '定期安全审计接口', en: 'Security Audit API' },
    { done: false, zh: '监管沙盒兼容接口', en: 'Regulatory Sandbox API' },
  ];

  const dangerBadgeClass = 'bg-[color:var(--accent-red)]/10 text-[color:var(--accent-red)] border-[color:var(--accent-red)]/20';

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      {/* Section A — Audit Log */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {isZh ? '审计日志' : 'Audit Trail'}
        </h2>
        <p className="mt-2 text-muted">
          {isZh ? '每笔 Agent 操作完整留痕' : 'Every Agent action fully logged'}
        </p>
      </div>

      <Card variant="elevated" className="mb-12 overflow-x-auto">
        {/* Desktop table */}
        <table className="w-full text-sm hidden md:table">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="pb-3 font-medium">{isZh ? '时间' : 'Timestamp'}</th>
              <th className="pb-3 font-medium">Agent ID</th>
              <th className="pb-3 font-medium">{isZh ? '操作' : 'Action'}</th>
              <th className="pb-3 font-medium">{isZh ? '权限' : 'Permission'}</th>
              <th className="pb-3 font-medium">{isZh ? '金额' : 'Amount'}</th>
              <th className="pb-3 font-medium">{isZh ? '结果' : 'Result'}</th>
            </tr>
          </thead>
          <tbody>
            {auditRows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3 text-ink font-mono text-xs">{row.ts}</td>
                <td className="py-3 text-ink font-mono text-xs">{row.agent}</td>
                <td className="py-3 text-ink">{row.action}</td>
                <td className="py-3"><Badge tone="neutral">{row.perm}</Badge></td>
                <td className="py-3 text-ink">{row.amount}</td>
                <td className="py-3">
                  {row.tone === 'danger' ? (
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${dangerBadgeClass}`}>{row.result}</span>
                  ) : (
                    <Badge tone={row.tone}>{row.result}</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Mobile cards */}
        <div className="space-y-4 md:hidden">
          {auditRows.map((row, i) => (
            <div key={i} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-muted font-mono">{row.ts}</span>
                {row.tone === 'danger' ? (
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${dangerBadgeClass}`}>{row.result}</span>
                ) : (
                  <Badge tone={row.tone}>{row.result}</Badge>
                )}
              </div>
              <p className="text-sm font-medium text-ink">{row.action}</p>
              <p className="text-xs text-muted">{row.agent} · {row.perm} · {row.amount}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Section B — Compliance Checklist */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {isZh ? '合规检查项' : 'Compliance Requirements'}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {compliance.map((item, i) => (
          <Card key={i} variant="default">
            <div className="flex items-center gap-3">
              {item.done ? (
                <CheckCircle className="h-5 w-5 text-accent-green shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted shrink-0" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{isZh ? item.zh : item.en}</p>
              </div>
              <Badge tone={item.done ? 'success' : 'neutral'}>
                {item.done ? 'v1.0' : (isZh ? '规划中' : 'Planned')}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
