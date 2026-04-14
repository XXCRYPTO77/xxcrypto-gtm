'use client';

import type { Strategy } from '../../data/strategies';

interface StrategyDetailProps {
  strategy: Strategy;
  isZh: boolean;
}

const MOCK_TRADES = [
  { date: '2026-04-13', win: true, pnl: 120 },
  { date: '2026-04-13', win: true, pnl: 85 },
  { date: '2026-04-12', win: false, pnl: -42 },
  { date: '2026-04-12', win: true, pnl: 210 },
  { date: '2026-04-11', win: true, pnl: 165 },
];

export function StrategyDetail({ strategy, isZh }: StrategyDetailProps) {
  const versions = strategy.versions;

  return (
    <div className="mt-4 space-y-6 border-t border-border pt-4">
      {/* Evolution Timeline */}
      <div>
        <h4 className="text-sm font-semibold text-ink mb-3">
          {isZh ? '进化时间线' : 'Evolution Timeline'}
        </h4>
        {/* Desktop: horizontal */}
        <div className="hidden sm:flex items-start gap-0 overflow-x-auto">
          {versions.map((v, i) => (
            <div key={v.version} className="flex items-start">
              <div className="flex flex-col items-center min-w-[140px]">
                <div
                  className={`w-4 h-4 rounded-full border-2 border-brand ${
                    i === versions.length - 1 ? 'bg-brand' : 'bg-page'
                  }`}
                />
                <span className="text-xs font-semibold text-ink mt-1">{v.version}</span>
                <span className="text-xs text-muted">{v.releasedAt}</span>
                <span className="text-xs text-muted">
                  {isZh ? '胜率' : 'WR'} {v.winRateIndex}
                </span>
                <p className="text-xs text-muted mt-1 text-center max-w-[130px]">
                  {isZh ? v.changelog : v.changelogEn}
                </p>
              </div>
              {i < versions.length - 1 && (
                <div className="flex-shrink-0 w-12 h-0.5 bg-border mt-2" />
              )}
            </div>
          ))}
        </div>
        {/* Mobile: vertical */}
        <div className="sm:hidden space-y-3">
          {versions.map((v, i) => (
            <div key={v.version} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 border-brand ${
                    i === versions.length - 1 ? 'bg-brand' : 'bg-page'
                  }`}
                />
                {i < versions.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
              </div>
              <div className="pb-3">
                <span className="text-xs font-semibold text-ink">{v.version}</span>
                <span className="text-xs text-muted ml-2">{v.releasedAt}</span>
                <span className="text-xs text-muted ml-2">
                  {isZh ? '胜率' : 'WR'} {v.winRateIndex}
                </span>
                <p className="text-xs text-muted">{isZh ? v.changelog : v.changelogEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Trades */}
      <div>
        <h4 className="text-sm font-semibold text-ink mb-2">
          {isZh ? '近期实盘记录' : 'Recent Trades'}
        </h4>
        <div className="text-xs">
          <div className="flex gap-6 text-muted font-semibold mb-1">
            <span className="w-24">{isZh ? '时间' : 'Date'}</span>
            <span className="w-8">{isZh ? '结果' : 'Result'}</span>
            <span>PnL</span>
          </div>
          {MOCK_TRADES.map((t, i) => (
            <div key={i} className="flex gap-6 py-0.5">
              <span className="w-24 text-muted">{t.date}</span>
              <span className={`w-8 ${t.win ? 'text-cw-green' : 'text-cw-red'}`}>
                {t.win ? '✓' : '✗'}
              </span>
              <span className={t.pnl >= 0 ? 'text-cw-green' : 'text-cw-red'}>
                {t.pnl >= 0 ? '+' : ''}${Math.abs(t.pnl)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
