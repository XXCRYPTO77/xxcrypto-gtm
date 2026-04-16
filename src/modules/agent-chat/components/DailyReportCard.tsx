'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

/** Format price: max 4 decimal places */
function fmtPrice(n: number): string {
  const decimals = n >= 1000 ? 2 : 4;
  return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

interface DailyReportPayload {
  date: string;
  btc: { price: number; change: number };
  eth: { price: number; change: number };
  sol: { price: number; change: number };
  totalCap: string;
  volume24h: string;
  fearGreed: number;
  topGainer: { symbol: string; change: number };
  topLoser: { symbol: string; change: number };
  netInflow: string;
  highlights: { zh: string; en: string }[];
}

interface Props {
  payload: DailyReportPayload;
  isZh: boolean;
}

export function DailyReportCard({ payload, isZh }: Props) {
  const labels = isZh
    ? { title: '加密市场日报', cap: '总市值', vol: '24h 成交', fg: '恐贪指数', gainer: '日内涨幅榜首', loser: '日内跌幅榜首', inflow: '资金净流入', highlights: '要点' }
    : { title: 'Crypto Market Daily', cap: 'Total Cap', vol: '24h Volume', fg: 'Fear/Greed', gainer: 'Top Gainer', loser: 'Top Loser', inflow: 'Net Inflow', highlights: 'Highlights' };

  const fgLabel = payload.fearGreed >= 75 ? (isZh ? '极度贪婪' : 'Extreme Greed')
    : payload.fearGreed >= 55 ? (isZh ? '贪婪' : 'Greed')
    : payload.fearGreed >= 45 ? (isZh ? '中性' : 'Neutral')
    : payload.fearGreed >= 25 ? (isZh ? '恐惧' : 'Fear')
    : (isZh ? '极度恐惧' : 'Extreme Fear');

  return (
    <div className="flex justify-start">
      <div className="w-full max-w-[90%] rounded-2xl border border-border bg-white p-5 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
          <div>
            <div className="text-xs text-muted">{payload.date}</div>
            <div className="text-base font-semibold text-ink">{labels.title}</div>
          </div>
          <div className="rounded-md bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">CoinW</div>
        </div>

        {/* Price ticker */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          {[payload.btc, payload.eth, payload.sol].map((c, i) => {
            const symbol = ['BTC', 'ETH', 'SOL'][i];
            const up = c.change >= 0;
            return (
              <div key={symbol} className="rounded-lg border border-border bg-page p-2.5">
                <div className="text-[11px] text-muted">{symbol}</div>
                <div className="text-sm font-semibold text-ink">${fmtPrice(c.price)}</div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${up ? 'text-green-600' : 'text-red-600'}`}>
                  {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {up ? '+' : ''}{c.change}%
                </div>
              </div>
            );
          })}
        </div>

        {/* Metrics grid */}
        <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <MetricRow label={labels.cap} value={payload.totalCap} />
          <MetricRow label={labels.vol} value={payload.volume24h} />
          <MetricRow label={labels.fg} value={`${payload.fearGreed} · ${fgLabel}`} />
          <MetricRow label={labels.inflow} value={payload.netInflow} tone="positive" />
          <MetricRow label={labels.gainer} value={`${payload.topGainer.symbol} +${payload.topGainer.change}%`} tone="positive" />
          <MetricRow label={labels.loser} value={`${payload.topLoser.symbol} ${payload.topLoser.change}%`} tone="negative" />
        </div>

        {/* Highlights */}
        <div>
          <div className="mb-2 text-xs font-semibold text-muted">{labels.highlights}</div>
          <ul className="space-y-1.5 text-sm text-ink">
            {payload.highlights.map((h, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-brand">·</span>
                <span>{isZh ? h.zh : h.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value, tone }: { label: string; value: string; tone?: 'positive' | 'negative' }) {
  const color = tone === 'positive' ? 'text-green-600' : tone === 'negative' ? 'text-red-600' : 'text-ink';
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className={`font-medium ${color}`}>{value}</span>
    </div>
  );
}
