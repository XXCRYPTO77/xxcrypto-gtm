'use client';

import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';

const HOLDINGS = [
  { coin: 'BTC', amount: '1.25', pnl: '+6.5%', up: true },
  { coin: 'ETH', amount: '15.8', pnl: '+7.1%', up: true },
  { coin: 'SOL', amount: '120', pnl: '+8.6%', up: true },
  { coin: 'BNB', amount: '8.5', pnl: '-1.9%', up: false },
];

export function Portfolio() {
  const t = useT();
  return (
    <Card variant="elevated">
      <h3 className="text-sm font-semibold text-ink mb-1">{t.portfolio.title}</h3>
      <div className="mb-3">
        <span className="text-xl font-bold text-ink">$152,847</span>
        <span className="ml-2 text-sm text-accent-green">+$3,218 / +2.1%</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted text-left">
            <th className="pb-1 font-medium">{t.portfolio.coin}</th>
            <th className="pb-1 font-medium">{t.portfolio.amount}</th>
            <th className="pb-1 font-medium text-right">{t.portfolio.pnl}</th>
          </tr>
        </thead>
        <tbody>
          {HOLDINGS.map((h) => (
            <tr key={h.coin} className="border-t border-border">
              <td className="py-1.5 font-medium text-ink">{h.coin}</td>
              <td className="py-1.5 text-muted">{h.amount}</td>
              <td className={`py-1.5 text-right font-medium ${h.up ? 'text-accent-green' : 'text-accent-red'}`}>{h.pnl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
