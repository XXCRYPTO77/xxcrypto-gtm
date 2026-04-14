'use client';

import { useState } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Send } from 'lucide-react';
import { ChatBubble } from './ChatBubble';
import { Ticker, Portfolio, SentimentGauge, WhaleFeed } from '@/shared/ui';

interface Msg {
  sender: 'user' | 'agent';
  text: string;
}

interface ChatInterfaceProps {
  onTrade?: () => void;
}

export function ChatInterface({ onTrade }: ChatInterfaceProps) {
  const t = useT();
  const [messages, setMessages] = useState<Msg[]>([
    { sender: 'agent', text: t.agentChat.chat.welcomeMsg },
  ]);
  const [input, setInput] = useState('');

  function getReply(text: string): string {
    const lower = text.toLowerCase();
    if (lower.includes('market') || lower.includes('行情'))
      return t.agentChat.chat.marketReply;
    if (lower.includes('buy') || lower.includes('买') || lower.includes('trade') || lower.includes('交易'))
      return t.agentChat.chat.tradeReply;
    if (lower.includes('report') || lower.includes('日报'))
      return t.agentChat.chat.reportReply;
    return t.agentChat.chat.marketReply;
  }

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Msg = { sender: 'user', text: text.trim() };
    const agentMsg: Msg = { sender: 'agent', text: getReply(text) };
    setMessages((prev) => [...prev, userMsg, agentMsg]);
    setInput('');
  }

  return (
    <div className="flex gap-6 h-[600px]">
      {/* Chat area */}
      <div className="flex flex-col flex-[3] min-w-0">
        {/* Quick actions */}
        <div className="flex gap-2 mb-3">
          {[
            { label: t.agentChat.chat.quickMarket, q: '行情' },
            { label: t.agentChat.chat.quickTrade, q: '交易' },
            { label: t.agentChat.chat.quickReport, q: '日报' },
          ].map((btn) => (
            <button
              key={btn.q}
              onClick={() => send(btn.q)}
              className="rounded-full border border-border bg-white px-3 py-1 text-xs text-muted hover:border-brand hover:text-brand transition-colors"
            >
              {btn.label}
            </button>
          ))}
          <button
            onClick={() => onTrade?.()}
            className="rounded-full bg-brand text-white px-3 py-1 text-xs font-medium hover:opacity-90 transition-opacity"
          >
            {t.nav.cta === 'EN' ? '执行交易' : 'Execute Trade'}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 rounded-2xl border border-border bg-white p-4">
          {messages.map((m, i) => (
            <ChatBubble key={i} sender={m.sender} text={m.text} />
          ))}
        </div>

        {/* Input */}
        <div className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder={t.agentChat.chat.placeholder}
            className="flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none"
          />
          <button
            onClick={() => send(input)}
            className="rounded-xl bg-brand px-4 py-2.5 text-white hover:opacity-90 transition-opacity"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex-[2] space-y-4 overflow-y-auto hidden lg:block">
        <Ticker />
        <Portfolio />
        <SentimentGauge />
        <WhaleFeed />
      </div>
    </div>
  );
}
