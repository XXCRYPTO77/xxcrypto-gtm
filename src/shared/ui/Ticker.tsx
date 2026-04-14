'use client';

import { useT } from '@/i18n/LocaleContext';
import { Badge } from '@/components/primitives/Badge';

const COINS = [
  { key: 'btc' as const, price: '$87,432', change: '+2.3%', up: true },
  { key: 'eth' as const, price: '$4,125', change: '+1.8%', up: true },
  { key: 'sol' as const, price: '$168.50', change: '+4.2%', up: true },
  { key: 'bnb' as const, price: '$612', change: '+0.9%', up: true },
  { key: 'doge' as const, price: '$0.182', change: '-1.2%', up: false },
];

export function Ticker() {
  const t = useT();
  return (
    <div className="flex flex-wrap gap-2">
      {COINS.map((c) => (
        <div key={c.key} className="flex items-center gap-2 rounded-full border border-border bg-page px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-brand-light">
          <Badge tone="brand" className="text-[10px] px-2 py-0.5">{t.ticker[c.key]}</Badge>
          <span className="text-muted">{c.price}</span>
          <span className={c.up ? 'font-medium text-accent-green' : 'font-medium text-accent-red'}>{c.change}</span>
        </div>
      ))}
    </div>
  );
}
