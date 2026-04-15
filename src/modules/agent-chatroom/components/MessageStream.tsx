'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { AgentId, ChatMessage } from '../types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface Props {
  messages: ChatMessage[];
  typingAgent: AgentId | null;
  isZh: boolean;
  onLike: (id: string) => void;
}

export function MessageStream({ messages, typingAgent, isZh, onLike }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // 滚动监听：用户往上滑 → 暂停自动滚
  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    setAutoScroll(nearBottom);
  };

  useEffect(() => {
    if (!autoScroll) return;
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typingAgent, autoScroll]);

  const jumpToLatest = () => {
    setAutoScroll(true);
    const el = ref.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="relative flex-1 min-h-0">
      <div
        ref={ref}
        onScroll={handleScroll}
        className="h-full overflow-y-auto border border-border border-t-0 bg-gray-50 px-4 py-3 md:border-l-0"
      >
        {messages.length === 0 && !typingAgent && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted">
              {isZh ? '等待 Agent 开口…' : 'Waiting for Agents to speak…'}
            </p>
          </div>
        )}

        {messages.map((m) => (
          <MessageBubble key={m.id} msg={m} isZh={isZh} onLike={onLike} />
        ))}

        {typingAgent && <TypingIndicator agentId={typingAgent} isZh={isZh} />}
      </div>

      {!autoScroll && (
        <button
          type="button"
          onClick={jumpToLatest}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-brand-med"
        >
          <ChevronDown className="h-3.5 w-3.5" />
          {isZh ? '回到最新' : 'Jump to latest'}
        </button>
      )}
    </div>
  );
}
