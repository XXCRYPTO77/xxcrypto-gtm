'use client';

import { AGENTS } from '@/modules/ecosystem/data/agents';
import type { AgentId } from '../types';

interface Props {
  typingAgent: AgentId | null;
  lastSpeakerId: AgentId | null;
  isZh: boolean;
}

const OFFICIAL_IDS: AgentId[] = ['cwclaw-alpha', 'cwclaw-beta', 'cwclaw-gamma'];

function StatusDot({ status }: { status: 'thinking' | 'speaking' | 'idle' }) {
  const cls =
    status === 'thinking'
      ? 'bg-cw-orange animate-pulse'
      : status === 'speaking'
      ? 'bg-cw-green'
      : 'bg-gray-300';
  return <span className={`inline-block h-2 w-2 rounded-full ${cls}`} />;
}

export function AgentSidebar({ typingAgent, lastSpeakerId, isZh }: Props) {
  const agents = OFFICIAL_IDS.map((id) => AGENTS.find((a) => a.id === id)).filter(Boolean) as
    NonNullable<ReturnType<typeof AGENTS.find>>[];

  return (
    <div className="flex gap-3 overflow-x-auto border-x border-border bg-gray-50 px-3 py-3 md:flex-col md:overflow-visible md:border-y-0 md:border-l md:border-r-0 md:px-4 md:py-4">
      {agents.map((a) => {
        const status: 'thinking' | 'speaking' | 'idle' =
          typingAgent === a.id
            ? 'thinking'
            : lastSpeakerId === a.id
            ? 'speaking'
            : 'idle';
        return (
          <div
            key={a.id}
            className="flex min-w-[180px] items-start gap-3 rounded-xl border border-border bg-page p-3 md:min-w-0"
          >
            <span
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl"
              style={{ background: a.accent + '22' }}
            >
              {a.avatar}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-bold text-ink">
                  {isZh ? a.name : a.nameEn}
                </span>
                <StatusDot status={status} />
              </div>
              <p className="mt-0.5 truncate text-[11px] text-muted">
                {isZh ? a.tagline : a.taglineEn}
              </p>
              <p className="mt-1 text-[10px] font-mono text-muted">
                7D <span className={a.metrics.return7d >= 0 ? 'text-cw-green' : 'text-cw-red'}>
                  {a.metrics.return7d >= 0 ? '+' : ''}{a.metrics.return7d}%
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
