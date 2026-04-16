'use client';

import type { TopicContext } from '../types';
import { Radio } from 'lucide-react';

/** Format price: max 4 decimal places, with thousands separator */
function fmtPrice(n: number): string {
  // For prices >= 1, show up to 4 significant decimals (strip trailing zeros)
  // For prices < 1, always show 4 decimal places
  const decimals = n >= 1000 ? 2 : n >= 1 ? 4 : 4;
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

interface Props {
  topic: TopicContext;
  isZh: boolean;
  round: number;
}

export function TopicHeader({ topic, isZh, round }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-t-2xl border border-border border-b-0 bg-page px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cw-red opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cw-red" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-cw-red">
          {isZh ? '直播中' : 'LIVE'}
        </span>
        <span className="text-sm font-bold text-ink">
          {isZh ? topic.title : topic.titleEn}
        </span>
        {round > 1 && (
          <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold text-brand">
            {isZh ? `第 ${round} 轮` : `Round ${round}`}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        {topic.tickers.map((t) => {
          const up = t.change24h >= 0;
          return (
            <span key={t.symbol} className="flex items-center gap-1 rounded-lg border border-border bg-page px-2 py-1">
              <span className="font-mono font-semibold text-ink">{t.symbol}</span>
              <span className="font-mono text-muted">${fmtPrice(t.price)}</span>
              <span className={`font-mono font-semibold ${up ? 'text-cw-green' : 'text-cw-red'}`}>
                {up ? '+' : ''}{t.change24h.toFixed(2)}%
              </span>
            </span>
          );
        })}
        <span className="flex items-center gap-1 text-[10px] text-muted">
          <Radio className="h-3 w-3" />
          {isZh ? '模拟数据' : 'Simulated'}
        </span>
      </div>
    </div>
  );
}
