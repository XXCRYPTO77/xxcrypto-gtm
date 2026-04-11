'use client';

import React, { useState, useMemo } from 'react';
import { useT, useLocale } from '@/i18n/LocaleContext';
import { SectionHeader } from '../../primitives/SectionHeader';
import { Card } from '../../primitives/Card';
import { Badge } from '../../primitives/Badge';
import {
  SKILL_MARKET,
  SKILL_FILTERS,
  AGENT_ZONE_MOCK,
  CREDIT_DASHBOARD_MOCK,
  type SkillCategory,
} from './mock';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';

type FilterId = 'all' | SkillCategory;

export function V15Section() {
  const t = useT();
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  const v = t.v15;
  const [filter, setFilter] = useState<FilterId>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? SKILL_MARKET : SKILL_MARKET.filter((s) => s.category === filter)),
    [filter]
  );

  return (
    <section id="v15" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeader
        version={v.version}
        depth="A"
        eyebrow={v.depth}
        title={v.headline}
        lede={v.lede}
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-5">
        {/* Agent Zone node graph — left 2/5 */}
        <Card variant="elevated" className="lg:col-span-2">
          <p className="text-sm font-bold text-ink">{v.agentZone.title}</p>
          <p className="mt-1 text-xs text-muted">{v.agentZone.subtitle}</p>
          <div className="mt-4">
            <AgentZoneGraph centerLabel={v.agentZone.centerLabel} />
          </div>
        </Card>

        {/* Credit dashboard — right 3/5 */}
        <Card variant="accent" className="lg:col-span-3">
          <p className="text-sm font-bold text-brand">{v.credit.title}</p>
          <p className="mt-1 text-xs text-muted">{v.credit.subtitle}</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-mono text-5xl font-black text-ink">
              {CREDIT_DASHBOARD_MOCK.headline.valueZh}
            </span>
            <span className="text-sm font-semibold text-brand">{v.credit.unit}</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CREDIT_DASHBOARD_MOCK.metrics.map((m) => (
              <div key={m.label} className="rounded-xl bg-page p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted">
                  {isZh ? m.label : m.labelEn}
                </p>
                <p className="mt-1 font-mono text-lg font-bold text-ink">{m.value}</p>
                {m.delta && (
                  <p
                    className={`mt-1 flex items-center gap-1 text-[10px] font-semibold ${
                      m.trend === '+' ? 'text-[color:var(--accent-green)]' : 'text-[color:var(--accent-red)]'
                    }`}
                  >
                    {m.trend === '+' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {m.delta}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="mb-2 text-xs text-muted">
              {isZh ? CREDIT_DASHBOARD_MOCK.miniChart.label : CREDIT_DASHBOARD_MOCK.miniChart.labelEn}
            </p>
            <MiniBarChart points={CREDIT_DASHBOARD_MOCK.miniChart.points} />
          </div>
        </Card>
      </div>

      {/* Marketplace */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-ink">{v.marketplace.title}</h3>
        <p className="mt-1 text-sm text-muted">{v.marketplace.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {SKILL_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f.id
                  ? 'border-brand bg-brand text-white'
                  : 'border-border bg-page text-muted hover:border-brand hover:text-brand'
              }`}
            >
              {isZh ? f.labelZh : f.labelEn}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <Card key={s.id} variant="outlined" className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-base font-bold text-ink">{isZh ? s.name : s.nameEn}</p>
                  <p className="text-xs text-muted">{s.provider}</p>
                </div>
                {s.loaded && <Badge tone="brand">LOADED</Badge>}
              </div>
              <p className="line-clamp-2 text-xs text-muted">{isZh ? s.desc : s.descEn}</p>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-xs">
                <span className="flex items-center gap-1 text-muted">
                  <Star size={12} className="fill-[color:var(--accent-amber)] text-[color:var(--accent-amber)]" />
                  {s.stats.rating.toFixed(1)}
                </span>
                <span className="text-muted">{s.stats.calls7d.toLocaleString()} calls</span>
                <span className="font-mono font-bold text-brand">{s.stats.creditCost} C</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== Agent Zone node graph (SVG) ========== */
function AgentZoneGraph({ centerLabel }: { centerLabel: string }) {
  const { center, orbit, activeConnections } = AGENT_ZONE_MOCK;
  const W = 360;
  const H = 360;
  const cx = W / 2;
  const cy = H / 2;
  const radius = 130;
  const activeSet = new Set(activeConnections.map((c) => c.to));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Orbit circle */}
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--color-border)" strokeWidth={1} strokeDasharray="3 3" />

      {/* Connections */}
      {orbit.map((n) => {
        const ang = ((n.angle ?? 0) * Math.PI) / 180;
        const x = cx + radius * Math.cos(ang);
        const y = cy + radius * Math.sin(ang);
        const active = activeSet.has(n.id);
        return (
          <line
            key={`line-${n.id}`}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke={active ? 'var(--color-brand)' : 'var(--color-border)'}
            strokeWidth={active ? 1.5 : 0.8}
            opacity={active ? 0.8 : 0.4}
          >
            {active && (
              <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite" />
            )}
          </line>
        );
      })}

      {/* Orbit nodes */}
      {orbit.map((n) => {
        const ang = ((n.angle ?? 0) * Math.PI) / 180;
        const x = cx + radius * Math.cos(ang);
        const y = cy + radius * Math.sin(ang);
        const active = activeSet.has(n.id);
        return (
          <g key={n.id}>
            <circle
              cx={x}
              cy={y}
              r={active ? 8 : 5}
              fill={active ? 'var(--color-brand)' : 'var(--color-brand-light)'}
              stroke="var(--color-page)"
              strokeWidth={2}
            />
            <text
              x={x}
              y={y - 14}
              textAnchor="middle"
              className="fill-[color:var(--color-muted)] text-[9px]"
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Center node */}
      <circle cx={cx} cy={cy} r={38} fill="var(--color-brand)" />
      <circle cx={cx} cy={cy} r={46} fill="none" stroke="var(--color-brand)" strokeWidth={1} opacity={0.3}>
        <animate attributeName="r" values="40;54;40" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <text x={cx} y={cy + 4} textAnchor="middle" className="fill-white text-[11px] font-bold">
        {center.label}
      </text>
    </svg>
  );
}

/* ========== Mini bar chart ========== */
function MiniBarChart({ points }: { points: readonly number[] }) {
  const max = Math.max(...points);
  return (
    <div className="flex h-16 items-end gap-1.5">
      {points.map((p, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-brand transition-all"
          style={{ height: `${(p / max) * 100}%`, opacity: 0.4 + (p / max) * 0.6 }}
        />
      ))}
    </div>
  );
}
