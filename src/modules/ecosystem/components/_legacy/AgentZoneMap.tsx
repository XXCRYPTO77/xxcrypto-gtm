'use client';

import { useEffect, useRef, useState } from 'react';
import { useT } from '@/i18n/LocaleContext';

interface NodeDef {
  id: string;
  label: string;
  labelEn: string;
  icon: string;
  x: number; // percent, 0-100
  y: number;
  kind: 'center' | 'agent' | 'skill' | 'task';
}

const NODES: NodeDef[] = [
  // center
  { id: 'coinw', label: 'CoinW Agent', labelEn: 'CoinW Agent', icon: '⚡', x: 50, y: 50, kind: 'center' },
  // outer agents
  { id: 'claude', label: 'Claude', labelEn: 'Claude', icon: '🤖', x: 20, y: 18, kind: 'agent' },
  { id: 'gpt',    label: 'GPT-4o', labelEn: 'GPT-4o', icon: '🤖', x: 78, y: 22, kind: 'agent' },
  { id: 'custom', label: '自定义 Agent', labelEn: 'Custom Agent', icon: '🔧', x: 82, y: 72, kind: 'agent' },
  { id: 'user',   label: '用户 Agent', labelEn: 'User Agent', icon: '👤', x: 18, y: 76, kind: 'agent' },
  // skills
  { id: 'sk-info',   label: '行情 Skill', labelEn: 'Quote Skill', icon: '📊', x: 50, y: 12, kind: 'skill' },
  { id: 'sk-trade',  label: '下单 Skill', labelEn: 'Order Skill', icon: '💱', x: 86, y: 48, kind: 'skill' },
  { id: 'sk-report', label: '日报 Skill', labelEn: 'Report Skill', icon: '📰', x: 50, y: 88, kind: 'skill' },
  { id: 'sk-auth',   label: '认证 Skill', labelEn: 'Auth Skill', icon: '🔑', x: 14, y: 48, kind: 'skill' },
  // tasks
  { id: 'task1', label: '行情监控任务', labelEn: 'Monitor task', icon: '📌', x: 35, y: 32, kind: 'task' },
  { id: 'task2', label: '定时下单任务', labelEn: 'Schedule task', icon: '📌', x: 65, y: 35, kind: 'task' },
  { id: 'task3', label: '止损任务', labelEn: 'Stop-loss task', icon: '📌', x: 62, y: 68, kind: 'task' },
];

// Which nodes connect to center
const EDGES = ['claude', 'gpt', 'custom', 'user', 'sk-info', 'sk-trade', 'sk-report', 'sk-auth', 'task1', 'task2', 'task3'];

const KIND_STYLES: Record<NodeDef['kind'], string> = {
  center: 'h-16 w-16 rounded-2xl bg-brand text-white shadow-lg text-2xl',
  agent:  'h-12 w-12 rounded-xl bg-brand-soft border-2 border-brand text-xl',
  skill:  'h-10 w-10 rounded-xl bg-white border border-border text-lg shadow-sm',
  task:   'h-8 w-8 rounded-lg bg-amber-50 border border-amber-200 text-base',
};

interface Packet {
  id: number;
  edgeIdx: number;
  progress: number;
  toCenter: boolean;
}

let pid = 0;

const STATS = [
  { zh: '在线 Agent', en: 'Online Agents', value: '1,284' },
  { zh: 'Skill 调用 / 24h', en: 'Skill calls / 24h', value: '2.4M' },
  { zh: '当日任务完成', en: 'Tasks completed today', value: '38,791' },
];

export function AgentZoneMap() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const svgRef = useRef<SVGSVGElement>(null);
  const [packets, setPackets] = useState<Packet[]>([]);

  // Spawn packets on an interval
  useEffect(() => {
    const interval = setInterval(() => {
      const edgeIdx = Math.floor(Math.random() * EDGES.length);
      const toCenter = Math.random() > 0.4;
      setPackets((prev) => [
        ...prev.slice(-30),
        { id: pid++, edgeIdx, progress: 0, toCenter },
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Advance packets
  useEffect(() => {
    let raf: number;
    const step = () => {
      setPackets((prev) =>
        prev
          .map((p) => ({ ...p, progress: p.progress + 0.025 }))
          .filter((p) => p.progress < 1)
      );
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const center = NODES.find((n) => n.id === 'coinw')!;

  function pct(p: number, wOrH: number) {
    return (p / 100) * wOrH;
  }

  return (
    <div className="space-y-6">
      {/* Map */}
      <div className="relative w-full rounded-2xl border border-border bg-white overflow-hidden" style={{ paddingBottom: '56%' }}>
        <div className="absolute inset-0 p-4">
          {/* SVG for edges + packets */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient id="bg-gradient" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgb(243 239 255)" />
                <stop offset="100%" stopColor="rgb(255 255 255)" />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#bg-gradient)" />

            {/* Edges */}
            {EDGES.map((nid) => {
              const n = NODES.find((x) => x.id === nid)!;
              return (
                <line
                  key={nid}
                  x1={center.x}
                  y1={center.y}
                  x2={n.x}
                  y2={n.y}
                  stroke="rgb(212 204 255)"
                  strokeWidth="0.4"
                  strokeDasharray="2 2"
                />
              );
            })}

            {/* Packets */}
            {packets.map((p) => {
              const nid = EDGES[p.edgeIdx];
              const n = NODES.find((x) => x.id === nid)!;
              const x1 = p.toCenter ? n.x : center.x;
              const y1 = p.toCenter ? n.y : center.y;
              const x2 = p.toCenter ? center.x : n.x;
              const y2 = p.toCenter ? center.y : n.y;
              const cx = x1 + (x2 - x1) * p.progress;
              const cy = y1 + (y2 - y1) * p.progress;
              const opacity = Math.sin(p.progress * Math.PI);
              return (
                <circle
                  key={p.id}
                  cx={cx}
                  cy={cy}
                  r="1"
                  fill={n.kind === 'skill' ? '#f97316' : '#5227FF'}
                  opacity={opacity}
                />
              );
            })}
          </svg>

          {/* Node icons — absolutely positioned over SVG */}
          {NODES.map((node) => (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group cursor-default"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className={`flex items-center justify-center ${KIND_STYLES[node.kind]} transition-transform group-hover:scale-110`}>
                {node.icon}
              </div>
              <span className="rounded-md bg-white/90 px-1.5 py-0.5 text-[9px] font-medium text-ink shadow-sm whitespace-nowrap leading-tight">
                {isZh ? node.label : node.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {STATS.map((s) => (
          <div key={s.value} className="rounded-2xl border border-border bg-white p-4 text-center">
            <div className="text-2xl font-bold text-brand">{s.value}</div>
            <div className="text-xs text-muted mt-1">{isZh ? s.zh : s.en}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
