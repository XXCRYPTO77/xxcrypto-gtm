'use client';

import { useState } from 'react';
import { User, Bot, Coins, PieChart, Wallet } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { useT } from '@/i18n/LocaleContext';

export function RevenueSharingBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const [calls, setCalls] = useState(5000);

  const pills = [
    { icon: User, label: isZh ? '用户使用 Skill' : 'User uses Skill' },
    { icon: Bot, label: isZh ? 'Agent 调用成功' : 'Agent call success' },
    { icon: Coins, label: isZh ? 'Credit 消耗' : 'Credit consumed' },
    { icon: PieChart, label: isZh ? '收益分配' : 'Revenue split' },
    { icon: Wallet, label: isZh ? 'Skill 提供方收益' : 'Provider earns' },
  ];

  return (
    <div className="space-y-6">
      {/* Flow diagram */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {pills.map((pill, i) => {
          const Icon = pill.icon;
          return (
            <div key={i} className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-white px-4 py-2 flex items-center gap-2 text-sm text-ink">
                <Icon size={16} className="text-brand shrink-0" />
                {pill.label}
              </span>
              {i < pills.length - 1 && (
                <span className="text-muted font-bold">→</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Calculator */}
      <Card variant="elevated" className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-ink">
            {isZh ? '月调用量' : 'Monthly calls'}
          </label>
          <span className="text-sm font-bold text-brand">{calls.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={100}
          max={50000}
          step={100}
          value={calls}
          onChange={(e) => setCalls(Number(e.target.value))}
          className="w-full accent-[#5227FF]"
        />
        <p className="text-sm text-ink">
          {isZh
            ? `预计 Credit 收益：${(calls * 0.05).toFixed(1)} Credit`
            : `Est. Credit earnings: ${(calls * 0.05).toFixed(1)} Credit`}
        </p>
        <p className="text-sm text-muted">
          {isZh
            ? `按当前汇率：$${(calls * 0.05 * 0.01).toFixed(2)}`
            : `At current rate: $${(calls * 0.05 * 0.01).toFixed(2)}`}
        </p>
      </Card>

      {/* Bullet points */}
      <Card className="space-y-2">
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>{isZh ? '每次成功调用：0.05 Credit' : 'Per successful call: 0.05 Credit'}</li>
          <li>{isZh ? 'Credit ↔ USDT 汇率由平台每周公布' : 'Credit ↔ USDT rate published weekly'}</li>
          <li>{isZh ? '前 3 个月提供方零手续费' : 'Zero platform fee for first 3 months'}</li>
        </ul>
      </Card>
    </div>
  );
}
