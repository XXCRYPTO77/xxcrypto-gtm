'use client';

import { useState } from 'react';
import { Search, ChevronRight, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';
import type { Strategy, StrategyCategory } from '../../data/strategies';
import { StrategyDetail } from './StrategyDetail';

interface StrategyLibraryProps {
  strategies: Strategy[];
  isZh: boolean;
}

const CATEGORY_COLORS: Record<StrategyCategory, { bg: string; text: string }> = {
  spot:      { bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]' },
  futures:   { bg: 'bg-[#FFF7ED]', text: 'text-[#C2410C]' },
  arbitrage: { bg: 'bg-[#F0FDF4]', text: 'text-[#15803D]' },
  signal:    { bg: 'bg-[#FAF5FF]', text: 'text-[#7C3AED]' },
  risk:      { bg: 'bg-[#FFF1F2]', text: 'text-[#BE123C]' },
};

const CATEGORY_LABELS: Record<string, { zh: string; en: string }> = {
  all:       { zh: '全部', en: 'All' },
  spot:      { zh: '现货', en: 'Spot' },
  futures:   { zh: '合约', en: 'Futures' },
  arbitrage: { zh: '套利', en: 'Arbitrage' },
  signal:    { zh: '信号', en: 'Signal' },
  risk:      { zh: '风控', en: 'Risk' },
};

const STATUS_STYLES: Record<string, { cls: string; zh: string; en: string }> = {
  trending:   { cls: 'bg-green-100 text-green-700', zh: '🔥 趋势策略', en: '🔥 Trending' },
  active:     { cls: 'bg-blue-50 text-blue-600', zh: '✓ 活跃', en: '✓ Active' },
  'at-risk':  { cls: 'bg-red-50 text-red-600 border border-red-200', zh: '⚠ 汰换观察期', en: '⚠ Tune-Out Watch' },
  deprecated: { cls: 'bg-gray-100 text-gray-400', zh: '已下架', en: 'Retired' },
};

const BAR_COLORS: Record<StrategyCategory, string> = {
  spot: 'bg-[#1D4ED8]',
  futures: 'bg-[#C2410C]',
  arbitrage: 'bg-[#15803D]',
  signal: 'bg-[#7C3AED]',
  risk: 'bg-[#BE123C]',
};

export function StrategyLibrary({ strategies, isZh }: StrategyLibraryProps) {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = strategies.filter((s) => {
    if (filter !== 'all' && s.category !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.descEn.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReuse = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(isZh ? '功能即将上线，敬请期待' : 'Coming soon — stay tuned!');
  };

  return (
    <div className="space-y-4">
      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="flex flex-wrap gap-2">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                filter === key
                  ? 'bg-brand text-white'
                  : 'bg-gray-100 text-muted hover:bg-gray-200'
              }`}
            >
              {isZh ? label.zh : label.en}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isZh ? '搜索策略…' : 'Search strategies…'}
            className="rounded-lg border border-border bg-page pl-8 pr-3 py-1.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-brand w-full sm:w-56"
          />
        </div>
      </div>

      {/* Strategy list */}
      <div className="space-y-3">
        {filtered.map((s) => {
          const cat = CATEGORY_COLORS[s.category];
          const status = STATUS_STYLES[s.status];
          const isOpen = expanded === s.id;
          const currentVersion = s.versions[s.versions.length - 1];

          return (
            <Card key={s.id} variant="elevated" className="cursor-pointer hover:shadow-md">
              <div onClick={() => setExpanded(isOpen ? null : s.id)}>
                {/* Row 1: name, badges, contributor */}
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${cat.bg} ${cat.text}`}>
                    {isZh ? CATEGORY_LABELS[s.category].zh : CATEGORY_LABELS[s.category].en}
                  </span>
                  <span className="font-semibold text-ink text-sm">
                    {isZh ? s.name : s.nameEn}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${status.cls}`}>
                    {isZh ? status.zh : status.en}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-muted">
                    {s.contributor.name}
                    {s.contributor.verified && (
                      <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                    )}
                  </span>
                </div>

                {/* Row 2: description */}
                <p className="text-xs text-muted truncate mb-2">
                  {isZh ? s.desc : s.descEn}
                </p>

                {/* Row 3: stats */}
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  {/* Win rate bar */}
                  <div className="flex items-center gap-2 min-w-[160px]">
                    <span className="text-muted whitespace-nowrap">
                      {isZh ? '胜率指数' : 'Win Rate'}
                    </span>
                    <div className="w-20 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${BAR_COLORS[s.category]}`}
                        style={{ width: `${s.winRateIndex}%` }}
                      />
                    </div>
                    <span className="font-semibold text-ink">{s.winRateIndex}</span>
                  </div>

                  <span className="text-muted">
                    {isZh ? '实盘' : 'Trades'}: <span className="text-ink font-medium">{s.realTrades.toLocaleString()}</span>
                  </span>
                  <span className="text-muted">
                    PnL: <span className={s.cumulativePnL >= 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                      {s.cumulativePnL >= 0 ? '+' : ''}${s.cumulativePnL.toLocaleString()}
                    </span>
                  </span>
                  <span className="text-muted">
                    {currentVersion.version}
                  </span>

                  <button
                    onClick={handleReuse}
                    className="ml-auto flex items-center gap-1 rounded-lg bg-brand-soft text-brand px-3 py-1 text-xs font-semibold hover:bg-brand hover:text-white transition-colors"
                  >
                    {isZh ? '复用到我的 Agent' : 'Reuse'} <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {isOpen && <StrategyDetail strategy={s} isZh={isZh} />}
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-center text-muted text-sm py-8">
            {isZh ? '没有匹配的策略' : 'No matching strategies'}
          </p>
        )}
      </div>
    </div>
  );
}
