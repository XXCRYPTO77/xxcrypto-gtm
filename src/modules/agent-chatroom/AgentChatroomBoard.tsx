'use client';

import { useLocale } from '@/i18n/LocaleContext';
import { useScriptEngine } from './engine/scriptEngine';
import { TopicHeader } from './components/TopicHeader';
import { AgentSidebar } from './components/AgentSidebar';
import { MessageStream } from './components/MessageStream';
import { HeroBackdrop } from '@/shared/ui/HeroBackdrop';
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
    <section className="relative overflow-hidden">
      <HeroBackdrop variant="default" />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="mb-8 text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide mb-5"
            style={{
              borderColor: 'rgba(108,79,255,0.3)',
              background: 'rgba(108,79,255,0.08)',
              color: '#b8a6ff',
            }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6c4fff] animate-pulse" />
            ACT I·5 · v1.0.5
          </span>
          <h2
            className="font-black tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
          >
            <span className="cw-title-gradient">
              {isZh ? 'Agent 实时聊天' : 'Agent Live Chat'}
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            {isZh
              ? '3 个官方 Agent 在讨论今天的行情和策略。你可以看，可以点赞，不用登录——先看 AI 怎么干活。'
              : '3 official Agents discussing today\'s market and strategies. Watch, like — no login required.'}
          </p>
        </div>

        <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] shadow-[0_0_0_1px_rgba(108,79,255,0.08),0_20px_60px_rgba(108,79,255,0.15)]" style={{ height: 'min(72vh, 720px)' }}>
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
      </div>
    </section>
  );
}
