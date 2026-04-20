'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Send } from 'lucide-react';
import { ChatBubble } from './ChatBubble';
import { ToolCallBubble } from './ToolCallBubble';
import { DailyReportCard } from './DailyReportCard';
import { LimitOrderCard } from './LimitOrderCard';
import { McpInstallCard } from './McpInstallCard';
import { QuickAccessPanel } from './QuickAccessPanel';
import type { Personality } from './PersonalityWizard';
import {
  DIALOG_PATHS,
  findMatchingStep,
  type DialogStep,
  type AgentTurn,
} from '../data/dialog';

interface ChatInterfaceProps {
  onTrade?: () => void;
  agentName?: string;
  personality?: Personality;
}

// ── Message types ────────────────────────────────────────────────────────────

type Message =
  | { kind: 'user'; id: string; text: string }
  | { kind: 'agent-text'; id: string; text: string }
  | { kind: 'agent-tool'; id: string; label: string; skillCodes: string[]; durationMs: number }
  | { kind: 'agent-card'; id: string; variant: 'dailyReport' | 'limitOrder' | 'mcpInstall'; payload: Record<string, unknown> }
  | { kind: 'nextHints'; id: string; hints: string[] };

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

// ── Component ────────────────────────────────────────────────────────────────

const DEFAULT_PERSONALITY: Personality = {
  style: 'professional',
  preference: 'mainstream',
  frequency: 'onDemand',
};

export function ChatInterface({ onTrade, agentName = 'Claw 42', personality = DEFAULT_PERSONALITY }: ChatInterfaceProps) {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  const [messages, setMessages] = useState<Message[]>([
    {
      kind: 'agent-text',
      id: nextId(),
      text: isZh
        ? `你好！我是 ${agentName}，你的专属交易 Agent。试试问我"查看 BTC 行情"、"帮我买 BTC"或"帮我找交易工具"。`
        : `Hi! I'm ${agentName}, your personal trading Agent. Try "show BTC price", "buy BTC for me", or "find crypto tools".`,
    },
  ]);

  const [input, setInput] = useState('');
  const [activeSkills, setActiveSkills] = useState<Set<string>>(new Set());
  const [usedSkills, setUsedSkills] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // auto-scroll on new message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // Play agent turns sequentially
  const playStep = useCallback(
    async (step: DialogStep) => {
      setIsPlaying(true);
      for (const turn of step.turns) {
        await playTurn(turn, setMessages, setActiveSkills, setUsedSkills, isZh);
      }
      // next-step hint chips
      if (step.nextHints && step.nextHints.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            kind: 'nextHints',
            id: nextId(),
            hints: step.nextHints!.map((h) => (isZh ? h.zh : h.en)),
          },
        ]);
      }
      setIsPlaying(false);
    },
    [isZh]
  );

  const send = useCallback(
    (rawText: string, echoOverride?: string) => {
      const text = rawText.trim();
      if (!text || isPlaying) return;

      const match = findMatchingStep(text);
      const userText = echoOverride ?? (match ? (isZh ? match.step.userEcho.zh : match.step.userEcho.en) : text);

      // Remove any previous nextHints bubbles (they're consumed once user acts)
      setMessages((prev) => [
        ...prev.filter((m) => m.kind !== 'nextHints'),
        { kind: 'user', id: nextId(), text: userText },
      ]);
      setInput('');

      if (match) {
        void playStep(match.step);
      } else {
        // Off-path fallback
        setMessages((prev) => [
          ...prev,
          {
            kind: 'agent-text',
            id: nextId(),
            text: isZh
              ? '这条指令超出当前 demo 的 mock 范围。试试这三条预设路径：「查看行情」「买入 BTC」「找交易工具」。'
              : 'Out of demo scope. Try one of the three scripted paths: "show market", "buy BTC", "find tools".',
          },
        ]);
      }
    },
    [isPlaying, isZh, playStep]
  );

  const pathChips = DIALOG_PATHS.map((p) => ({
    label: `${p.icon} ${isZh ? p.title.zh : p.title.en}`,
    trigger: p.steps[0].triggers[0],
  }));

  return (
    <div className="flex gap-6 h-[640px]">
      {/* Chat area */}
      <div className="flex flex-col flex-[3] min-w-0">
        {/* Path chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {pathChips.map((chip) => (
            <button
              key={chip.trigger}
              onClick={() => send(chip.trigger)}
              disabled={isPlaying}
              className="rounded-full border border-border bg-white px-3 py-1 text-xs text-muted hover:border-brand hover:text-brand disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {chip.label}
            </button>
          ))}
          <button
            onClick={() => onTrade?.()}
            className="rounded-full bg-brand text-white px-3 py-1 text-xs font-medium hover:opacity-90 transition-opacity ml-auto"
          >
            {isZh ? '执行交易 →' : 'Execute Trade →'}
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-3 rounded-2xl border border-border bg-page p-4"
        >
          {messages.map((m) => {
            switch (m.kind) {
              case 'user':
                return <ChatBubble key={m.id} sender="user" text={m.text} />;
              case 'agent-text':
                return <ChatBubble key={m.id} sender="agent" text={m.text} />;
              case 'agent-tool':
                return (
                  <ToolCallBubble
                    key={m.id}
                    label={m.label}
                    skillCodes={m.skillCodes}
                    durationMs={m.durationMs}
                    isZh={isZh}
                  />
                );
              case 'agent-card':
                if (m.variant === 'dailyReport')
                  return <DailyReportCard key={m.id} payload={m.payload as never} isZh={isZh} />;
                if (m.variant === 'limitOrder')
                  return <LimitOrderCard key={m.id} payload={m.payload as never} isZh={isZh} />;
                return <McpInstallCard key={m.id} payload={m.payload as never} isZh={isZh} />;
              case 'nextHints':
                return (
                  <div key={m.id} className="flex flex-wrap gap-2 pl-2">
                    {m.hints.map((h) => (
                      <button
                        key={h}
                        onClick={() => send(h)}
                        disabled={isPlaying}
                        className="rounded-full border border-brand/40 bg-brand-soft px-3 py-1 text-xs font-medium text-brand hover:bg-brand hover:text-white disabled:opacity-40 transition-colors"
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                );
            }
          })}
        </div>

        {/* Input */}
        <div className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            disabled={isPlaying}
            placeholder={
              isPlaying
                ? isZh
                  ? 'Agent 响应中...'
                  : 'Agent is responding...'
                : isZh
                ? '输入消息... 例如"查看 BTC 行情"'
                : 'Type a message... e.g. "show BTC price"'
            }
            className="flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={() => send(input)}
            disabled={isPlaying || !input.trim()}
            className="rounded-xl bg-brand px-4 py-2.5 text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Sidebar — quick access panel */}
      <div className="flex-[2] overflow-y-auto hidden lg:block">
        <QuickAccessPanel
          agentName={agentName}
          personality={personality}
          isZh={isZh}
          onShortcut={(trigger) => send(trigger)}
        />
      </div>
    </div>
  );
}

// ── Turn player ──────────────────────────────────────────────────────────────

async function playTurn(
  turn: AgentTurn,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setActiveSkills: React.Dispatch<React.SetStateAction<Set<string>>>,
  setUsedSkills: React.Dispatch<React.SetStateAction<Set<string>>>,
  isZh: boolean
) {
  if (turn.kind === 'tool') {
    // light up active skills
    setActiveSkills(new Set(turn.skillCodes));
    setMessages((prev) => [
      ...prev,
      {
        kind: 'agent-tool',
        id: nextId(),
        label: isZh ? turn.label.zh : turn.label.en,
        skillCodes: turn.skillCodes,
        durationMs: turn.durationMs,
      },
    ]);
    await sleep(turn.durationMs);
    // mark used + clear active
    setUsedSkills((prev) => new Set([...prev, ...turn.skillCodes]));
    setActiveSkills(new Set());
    await sleep(150);
    return;
  }

  if (turn.kind === 'text') {
    await sleep(400);
    setMessages((prev) => [
      ...prev,
      { kind: 'agent-text', id: nextId(), text: isZh ? turn.text.zh : turn.text.en },
    ]);
    await sleep(300);
    return;
  }

  if (turn.kind === 'card') {
    await sleep(400);
    setMessages((prev) => [
      ...prev,
      { kind: 'agent-card', id: nextId(), variant: turn.variant, payload: turn.payload },
    ]);
    await sleep(300);
    return;
  }
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
