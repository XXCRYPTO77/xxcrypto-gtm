'use client';

import { AGENTS } from '@/modules/ecosystem/data/agents';
import type { AgentId } from '../types';

interface Props {
  agentId: AgentId;
  isZh: boolean;
}

export function TypingIndicator({ agentId, isZh }: Props) {
  const a = AGENTS.find((x) => x.id === agentId);
  if (!a) return null;
  const name = isZh ? a.name : a.nameEn;
  return (
    <div className="flex items-center gap-3 px-1 py-2">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full text-base"
        style={{ background: a.accent + '22' }}
      >
        {a.avatar}
      </span>
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-page px-3 py-2">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
      </div>
      <span className="text-xs text-muted">
        {isZh ? `${name} 正在思考…` : `${name} is thinking…`}
      </span>
    </div>
  );
}
