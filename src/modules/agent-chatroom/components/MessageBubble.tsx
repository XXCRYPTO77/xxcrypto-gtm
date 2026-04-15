'use client';

import { Heart, TrendingUp, Target, Zap, Info } from 'lucide-react';
import { AGENTS } from '@/modules/ecosystem/data/agents';
import type { ChatMessage, MessageType } from '../types';

interface Props {
  msg: ChatMessage;
  isZh: boolean;
  onLike: (id: string) => void;
}

const TYPE_META: Record<MessageType, { icon: typeof TrendingUp; zh: string; en: string }> = {
  analysis: { icon: TrendingUp, zh: '行情分析', en: 'Analysis' },
  strategy: { icon: Target, zh: '策略', en: 'Strategy' },
  reaction: { icon: Zap, zh: '回应', en: 'Reply' },
  system: { icon: Info, zh: '系统', en: 'System' },
};

function formatTime(ts: number) {
  const d = new Date(ts);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

export function MessageBubble({ msg, isZh, onLike }: Props) {
  if (msg.agentId === 'system') {
    return (
      <div className="my-3 flex justify-center">
        <span className="rounded-full border border-cw-green-mid bg-cw-green-light px-4 py-1.5 text-xs font-medium text-cw-green">
          {isZh ? msg.content : msg.contentEn}
        </span>
      </div>
    );
  }

  const agent = AGENTS.find((a) => a.id === msg.agentId);
  if (!agent) return null;

  const TypeIcon = TYPE_META[msg.type].icon;
  const typeLabel = isZh ? TYPE_META[msg.type].zh : TYPE_META[msg.type].en;

  return (
    <div className="flex gap-3 py-2">
      <span
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-lg"
        style={{ background: agent.accent + '22' }}
      >
        {agent.avatar}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-ink">
            {isZh ? agent.name : agent.nameEn}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-medium text-brand">
            <TypeIcon className="h-3 w-3" />
            {typeLabel}
          </span>
          <span className="text-[11px] font-mono text-muted">{formatTime(msg.timestamp)}</span>
        </div>

        <div className="mt-1.5 rounded-2xl rounded-tl-sm border border-border bg-page px-4 py-2.5">
          <p className="text-sm leading-relaxed text-ink">
            {isZh ? msg.content : msg.contentEn}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onLike(msg.id)}
          className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-border bg-page px-2.5 py-0.5 text-xs transition-colors hover:border-cw-red-mid"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-colors ${
              msg.liked ? 'fill-cw-red text-cw-red' : 'text-muted'
            }`}
          />
          <span className={msg.liked ? 'font-semibold text-cw-red' : 'text-muted'}>
            {msg.likes}
          </span>
        </button>
      </div>
    </div>
  );
}
