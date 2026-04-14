'use client';

import { type Agent } from '../../data/agents';

interface NetworkTopologyProps {
  agents: Agent[];
  isZh: boolean;
}

const STATS = [
  { key: 'agents', value: '134' },
  { key: 'strategies', value: '68' },
  { key: 'dailyCalls', value: '1,284,000' },
  { key: 'volume7d', value: '$48M' },
];

export function NetworkTopology({ agents, isZh }: NetworkTopologyProps) {
  const official = agents.filter((a) => a.type === 'official');
  const external = agents.filter((a) => a.type === 'external');

  const eco = (globalThis as any).__ECO_T__;

  // Position nodes in circles around center (50%, 50%)
  const cx = 50;
  const cy = 50;
  const innerR = 18;
  const outerR = 35;

  const positionInCircle = (items: Agent[], radius: number, offsetAngle = -90) =>
    items.map((a, i) => {
      const angle = offsetAngle + (360 / items.length) * i;
      const rad = (angle * Math.PI) / 180;
      return {
        agent: a,
        x: cx + radius * Math.cos(rad),
        y: cy + radius * Math.sin(rad),
      };
    });

  const officialNodes = positionInCircle(official, innerR);
  const externalNodes = positionInCircle(external, outerR, -90 + 22);
  const allNodes = [...officialNodes, ...externalNodes];

  return (
    <div>
      {/* Topology SVG — hidden on mobile */}
      <div className="relative mx-auto hidden md:block" style={{ aspectRatio: '16/9', maxWidth: 900 }}>
        <div className="absolute inset-0 rounded-2xl bg-gray-950 overflow-hidden">
          {/* SVG lines + flowing dots */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              {allNodes.map((n, i) => (
                <path
                  key={`path-${n.agent.id}`}
                  id={`line-${n.agent.id}`}
                  d={`M ${cx} ${cy} L ${n.x} ${n.y}`}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.15"
                  fill="none"
                />
              ))}
            </defs>
            {allNodes.map((n) => (
              <use key={`use-${n.agent.id}`} href={`#line-${n.agent.id}`} />
            ))}
            {/* Flowing dots */}
            {allNodes.map((n, i) => (
              <circle key={`dot-${n.agent.id}`} r="0.5" fill="white" opacity="0.8">
                <animateMotion
                  dur={`${2.5 + i * 0.3}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                >
                  <mpath href={`#line-${n.agent.id}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
              </circle>
            ))}
          </svg>

          {/* Center node */}
          <div
            className="absolute z-10 flex items-center justify-center rounded-full text-white font-bold text-2xl"
            style={{
              width: 64,
              height: 64,
              background: '#5227FF',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 30px rgba(82,39,255,0.5)',
            }}
          >
            C
          </div>

          {/* Agent nodes */}
          {allNodes.map((n) => (
            <div
              key={n.agent.id}
              className="group absolute z-10 flex items-center justify-center rounded-full cursor-pointer transition-transform hover:scale-110"
              style={{
                width: 40,
                height: 40,
                background: n.agent.accent,
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: 20,
              }}
            >
              {n.agent.avatar}
              {/* Tooltip */}
              <div className="pointer-events-none absolute bottom-full mb-2 hidden rounded-lg bg-gray-800 px-3 py-1.5 text-xs text-white whitespace-nowrap group-hover:block">
                <div className="font-semibold">{isZh ? n.agent.name : n.agent.nameEn}</div>
                <div className={n.agent.metrics.return7d >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {n.agent.metrics.return7d >= 0 ? '+' : ''}{n.agent.metrics.return7d}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: emoji list */}
      <div className="flex flex-wrap justify-center gap-3 md:hidden mb-4">
        {agents.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-center rounded-full"
            style={{ width: 40, height: 40, background: a.accent, fontSize: 20 }}
          >
            {a.avatar}
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.key} className="rounded-xl bg-gray-950 px-4 py-3 text-center">
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-gray-400">{s.key}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
