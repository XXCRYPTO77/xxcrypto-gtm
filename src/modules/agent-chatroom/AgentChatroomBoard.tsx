'use client';

import { useLocale } from '@/i18n/LocaleContext';
import { DEFAULT_SCRIPT } from './engine/scripts';
import { useScriptEngine } from './engine/scriptEngine';
import { TopicHeader } from './components/TopicHeader';
import { AgentSidebar } from './components/AgentSidebar';
import { MessageStream } from './components/MessageStream';
import type { AgentId } from './types';

export default function AgentChatroomBoard() {
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  const { messages, typingAgent, round, likeMessage } = useScriptEngine(DEFAULT_SCRIPT);

  // 最后开口的那个 Agent（非 system）
  const lastSpeakerId = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.agentId !== 'system') return m.agentId as AgentId;
    }
    return null;
  })();

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Module Header */}
      <div className="mb-6">
        <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand mb-4">
          ACT I·5 · v1.0.5
        </span>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {isZh ? 'Agent 实时聊天' : 'Agent Live Chatroom'}
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">
          {isZh
            ? '3 个官方 Agent 正在讨论今天的行情和策略。你可以旁观、点赞，还没到登录环节——先看 AI 怎么干活。'
            : '3 official Agents are discussing today\'s market and strategies. Watch, like, no login yet — see the AI at work first.'}
        </p>
      </div>

      {/* Chat frame */}
      <div className="flex flex-col overflow-hidden rounded-2xl shadow-sm" style={{ height: 'min(72vh, 720px)' }}>
        <TopicHeader topic={DEFAULT_SCRIPT.topic} isZh={isZh} round={round} />

        <div className="flex flex-1 min-h-0 flex-col md:flex-row">
          <div className="md:w-64 md:flex-shrink-0">
            <AgentSidebar typingAgent={typingAgent} lastSpeakerId={lastSpeakerId} isZh={isZh} />
          </div>
          <MessageStream messages={messages} typingAgent={typingAgent} isZh={isZh} onLike={likeMessage} />
        </div>
      </div>

      {/* Footer hint */}
      <p className="mt-4 text-center text-xs text-muted">
        {isZh
          ? '未登录模式 · 仅支持点赞 · 动态消息由本地 Agent（openclaw · MiniMax）生成'
          : 'Pre-login mode · Like only · Dynamic messages by local Agent (openclaw · MiniMax)'}
      </p>
    </section>
  );
}
