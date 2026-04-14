'use client';

import { useState } from 'react';
import { Check, X, AlertCircle, ChevronRight } from 'lucide-react';
import { useT } from '@/i18n/LocaleContext';

interface TradeExecutionProps {
  onNext: () => void;
  onBack?: () => void;
}

const RISK_CHECKS_ZH = [
  { label: '权限验证', detail: '现货权限已授权 ✓', status: 'pass' as const },
  { label: '额度检查', detail: '$42,500 < 单笔上限 $50,000', status: 'pass' as const },
  { label: '频率检查', detail: '今日第 3 笔，未触发频率限制', status: 'pass' as const },
];
const RISK_CHECKS_EN = [
  { label: 'Permission check', detail: 'Spot trading authorized ✓', status: 'pass' as const },
  { label: 'Amount check', detail: '$42,500 < per-trade cap $50,000', status: 'pass' as const },
  { label: 'Rate check', detail: 'Trade #3 today — rate limit not triggered', status: 'pass' as const },
];

const ORDER_ZH = [
  { label: '交易对', value: 'BTC/USDT' },
  { label: '方向', value: '买入' },
  { label: '类型', value: '限价单' },
  { label: '数量', value: '0.5 BTC' },
  { label: '价格', value: '$85,000' },
  { label: '预估金额', value: '$42,500' },
];
const ORDER_EN = [
  { label: 'Pair', value: 'BTC/USDT' },
  { label: 'Side', value: 'Buy' },
  { label: 'Type', value: 'Limit' },
  { label: 'Amount', value: '0.5 BTC' },
  { label: 'Price', value: '$85,000' },
  { label: 'Est. total', value: '$42,500' },
];

export function TradeExecution({ onNext, onBack }: TradeExecutionProps) {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const checks = isZh ? RISK_CHECKS_ZH : RISK_CHECKS_EN;
  const orderFields = isZh ? ORDER_ZH : ORDER_EN;

  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {onBack && !confirmed && (
        <button onClick={onBack} className="text-sm text-brand hover:underline">
          ← {isZh ? '返回对话' : 'Back to chat'}
        </button>
      )}

      {!confirmed ? (
        <>
          {/* Agent intent */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              {isZh ? 'Agent 解析' : 'Agent Interpretation'}
            </p>
            <div className="rounded-xl border border-brand-light bg-brand-soft px-4 py-3 text-sm font-medium text-brand">
              {isZh ? '买入 0.5 BTC @ $85,000 限价单' : 'Buy 0.5 BTC @ $85,000 — Limit Order'}
            </div>
          </div>

          {/* Risk checks */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              {isZh ? '风控检查' : 'Risk Checks'}
            </p>
            <div className="space-y-2">
              {checks.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-ink">{c.label}</span>
                  </div>
                  <span className="text-xs text-muted">{c.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              {isZh ? '订单详情' : 'Order Details'}
            </p>
            <div className="rounded-xl border border-border bg-white overflow-hidden">
              {orderFields.map((f, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${
                    i < orderFields.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="text-muted">{f.label}</span>
                  <span className={`font-medium ${f.label === (isZh ? '方向' : 'Side') ? 'text-green-600' : 'text-ink'}`}>
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer + CTAs */}
          <div className="flex items-start gap-2 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3">
            <AlertCircle size={14} className="text-yellow-500 mt-0.5 shrink-0" />
            <p className="text-xs text-yellow-700">
              {isZh
                ? 'Mock 演示：订单不会真实提交。生产环境中此步骤会调用 CoinW API M5 下单接口。'
                : 'Mock demo: no real order will be placed. In production this calls CoinW API M5 (order placement).'}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 rounded-xl border border-border bg-white py-3 text-sm font-semibold text-muted hover:border-gray-300 transition-colors"
            >
              {isZh ? '取消' : 'Cancel'}
            </button>
            <button
              onClick={() => setConfirmed(true)}
              className="flex-1 rounded-xl bg-brand py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              {isZh ? '确认下单' : 'Confirm Order'}
            </button>
          </div>
        </>
      ) : (
        /* Success state */
        <div className="flex flex-col items-center gap-6 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check size={28} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink mb-1">
              {isZh ? '订单已提交' : 'Order Submitted'}
            </h2>
            <p className="text-sm text-muted max-w-sm">
              {isZh
                ? '限价买单 0.5 BTC @ $85,000 已提交至交易所，等待成交。'
                : 'Limit buy order: 0.5 BTC @ $85,000 submitted to exchange. Awaiting fill.'}
            </p>
          </div>

          <div className="w-full rounded-xl border border-border bg-gray-50 px-6 py-4 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">{isZh ? '订单 ID' : 'Order ID'}</span>
              <span className="font-mono text-xs text-ink">ORD-20260413-0042</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">{isZh ? '状态' : 'Status'}</span>
              <span className="text-yellow-600 font-medium">{isZh ? '等待成交' : 'Pending Fill'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">{isZh ? '提交时间' : 'Submitted'}</span>
              <span className="text-ink">14:32:01</span>
            </div>
          </div>

          <button
            onClick={onNext}
            className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            {isZh ? '查看复盘' : 'View Summary'}
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
