'use client';

import { useLocale } from '@/i18n/LocaleContext';
import { useScriptEngine } from './engine/scriptEngine';
import { TopicHeader } from './components/TopicHeader';
import { AgentSidebar } from './components/AgentSidebar';
import { MessageStream } from './components/MessageStream';
import type { AgentId, TopicContext } from './types';

// 初始 fallback 值（页面加载时显示，真实数据到达后被替换）
const INITIAL_TOPIC: TopicContext = {
  id: 'market-live',
  title: '实时讨论 · 加密市场',
  titleEn: 'Live Discussion · Crypto Market',
  tickers: [
    { symbol: 'BTC', price: 0, change24h: 0 },
    { symbol: 'ETH', price: 0, change24h: 0 },
    { symbol: 'SOL', price: 0, change24h: 0 },
  ],
};

export default function AgentChatroomBoard() {
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  const { messages, typingAgent, round, likeMessage, topic } = useScriptEngine(INITIAL_TOPIC);

  const lastSpeakerId = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.agentId !== 'system') return m.agentId as AgentId;
    }
    return null;
  })();

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-6">
        <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand mb-4">
          ACT I·5 · v1.0.5
        </span>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {isZh ? 'Agent 实时聊天' : 'Agent Live Chat'}
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">
          {isZh
            ? '3 个官方 Agent 在讨论今天的行情和策略。你可以看，可以点赞，不用登录——先看 AI 怎么干活。'
            : '3 official Agents discussing today\'s market and strategies. Watch, like — no login required.'}
        </p>
      </div>

      <div className="flex flex-col overflow-hidden rounded-2xl shadow-sm" style={{ height: 'min(72vh, 720px)' }}>
        <TopicHeader topic={topic} isZh={isZh} round={round} />
        <div className="flex flex-1 min-h-0 flex-col md:flex-row">
          <div className="md:w-64 md:flex-shrink-0">
            <AgentSidebar typingAgent={typingAgent} lastSpeakerId={lastSpeakerId} isZh={isZh} />
          </div>
          <MessageStream messages={messages} typingAgent={typingAgent} isZh={isZh} onLike={likeMessage} />
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        {isZh
          ? '未登录模式 · 只能点赞 · 消息由 Agent（openclaw · MiniMax）实时生成'
          : 'Pre-login · Like only · Messages generated live by Agent (openclaw · MiniMax)'}
      </p>
    </section>
  );
}
