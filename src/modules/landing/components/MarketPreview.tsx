'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MarketPreview() {
  const t = useT();
  const m = t.v10.market;

  return (
    <section className="bg-gray-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{m.title}</h2>
        <p className="mt-1 text-sm text-muted">{m.subtitle}</p>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {m.coins.map((coin: { symbol: string; name: string; price: string; change: string; up: boolean }) => (
            <div
              key={coin.symbol}
              className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-black text-brand">
                {coin.symbol.slice(0, 3)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted truncate">{coin.name}</p>
                <p className="text-lg font-bold text-ink leading-tight">{coin.price}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${coin.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {coin.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {coin.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
