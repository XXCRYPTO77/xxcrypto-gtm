'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useT, useLocale } from '@/i18n/LocaleContext';
import { SectionHeader } from '../primitives/SectionHeader';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';
import { User, Bot, Terminal, Send, Sparkles } from 'lucide-react';

type Msg = { role: 'user' | 'agent'; text: string; tool?: string };

interface DialogNode {
  trigger: readonly string[];
  steps: readonly Msg[];
  skillsUsed: readonly string[];
}

const DIALOG_TREE_ZH: readonly DialogNode[] = [
  {
    trigger: ['btc', '行情', '今天'],
    skillsUsed: ['M1', 'P1', 'P3'],
    steps: [
      { role: 'agent', tool: 'M1 实时行情', text: '拉取 BTC / ETH / 主流币实时价格……' },
      { role: 'agent', tool: 'P1 市场概览', text: '整合资金流向 + 板块轮动……' },
      { role: 'agent', tool: 'P3 新闻资讯', text: '过去 24 小时关键新闻……' },
      { role: 'agent', text: 'BTC $87,200 +2.3% · ETH $4,100 +1.8% · 稳定币净流入 $3.2 亿 · L2 板块涨 15%+' },
    ],
  },
  {
    trigger: ['85000', '买', '0.5'],
    skillsUsed: ['M5', 'M11', 'M14'],
    steps: [
      { role: 'agent', tool: 'M7 余额查询', text: '检查可用余额……OK' },
      { role: 'agent', tool: 'M14 额度校验', text: '本单 0.5 BTC ≈ $42,600，低于阈值' },
      { role: 'agent', tool: 'M5 下单', text: '提交限价单 0.5 BTC @ $85,000' },
      { role: 'agent', text: '已挂单:0.5 BTC @ $85,000,订单号 #CW-2038472' },
    ],
  },
  {
    trigger: ['找', '工具', '加密'],
    skillsUsed: ['M15', 'M16'],
    steps: [
      { role: 'agent', tool: 'MCP Registry', text: '搜索 crypto Skills……' },
      { role: 'agent', tool: 'M16 Skills 发现', text: '找到 CoinW Agent Skills:行情 / 现货合约 / 链上数据' },
      { role: 'agent', text: '需要我自动接入吗?一键完成 MCP 握手' },
    ],
  },
];

const DIALOG_TREE_EN: readonly DialogNode[] = [
  {
    trigger: ['btc', 'market', 'today'],
    skillsUsed: ['M1', 'P1', 'P3'],
    steps: [
      { role: 'agent', tool: 'M1 Live data', text: 'Pulling BTC / ETH / majors ...' },
      { role: 'agent', tool: 'P1 Market overview', text: 'Aggregating fund flows + sector rotation ...' },
      { role: 'agent', tool: 'P3 News feed', text: 'Key news from the last 24h ...' },
      { role: 'agent', text: 'BTC $87,200 +2.3% · ETH $4,100 +1.8% · Stablecoin net inflow $320M · L2 sector +15%' },
    ],
  },
  {
    trigger: ['85000', 'buy', '0.5'],
    skillsUsed: ['M5', 'M11', 'M14'],
    steps: [
      { role: 'agent', tool: 'M7 Balance', text: 'Check available balance ... OK' },
      { role: 'agent', tool: 'M14 Amount cap', text: '0.5 BTC ≈ $42,600, under threshold' },
      { role: 'agent', tool: 'M5 Order', text: 'Submitting limit order 0.5 BTC @ $85,000' },
      { role: 'agent', text: 'Order placed: 0.5 BTC @ $85,000, order #CW-2038472' },
    ],
  },
  {
    trigger: ['find', 'tool', 'crypto'],
    skillsUsed: ['M15', 'M16'],
    steps: [
      { role: 'agent', tool: 'MCP Registry', text: 'Searching crypto Skills ...' },
      { role: 'agent', tool: 'M16 Discover', text: 'Found CoinW Skills: quotes / spot & futures / on-chain' },
      { role: 'agent', text: 'Shall I connect? One-click MCP handshake.' },
    ],
  },
];

const PROMPTS_ZH = ['帮我看看今天 BTC 行情', 'BTC 跌到 85000 买 0.5', '给我找个加密货币的赚钱工具'];
const PROMPTS_EN = ['Show me BTC today', 'Buy 0.5 BTC if it drops to 85000', 'Find me a crypto tool'];

export function V11Section() {
  const t = useT();
  const { locale } = useLocale();
  const v = t.v11;
  const isZh = locale === 'zh';
  const prompts = isZh ? PROMPTS_ZH : PROMPTS_EN;
  const tree = isZh ? DIALOG_TREE_ZH : DIALOG_TREE_EN;

  const [messages, setMessages] = useState<Msg[]>([]);
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [streaming, setStreaming] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const runPrompt = useCallback(
    (prompt: string) => {
      if (streaming) return;
      const node = tree.find((n) => n.trigger.some((k) => prompt.toLowerCase().includes(k.toLowerCase())));
      if (!node) return;

      setMessages([{ role: 'user', text: prompt }]);
      setActiveSkills([]);
      setStreaming(true);

      node.steps.forEach((step, i) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, step]);
          if (i === node.steps.length - 1) {
            setStreaming(false);
            setActiveSkills([...node.skillsUsed]);
          }
        }, (i + 1) * 700);
      });
    },
    [streaming, tree]
  );

  return (
    <section id="v11" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <SectionHeader
        version={v.version}
        depth="A"
        eyebrow={v.depth}
        title={v.headline}
        lede={v.lede}
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-5">
        {/* Chat box */}
        <Card variant="elevated" className="flex h-[540px] flex-col lg:col-span-3">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Bot size={16} className="text-brand" />
              <p className="text-sm font-bold text-ink">{v.chatTitle}</p>
            </div>
            <Badge tone="neutral">Mock</Badge>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto pr-2">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted">
                <Sparkles size={32} className="text-brand-light" />
                <p className="text-sm">↓ {isZh ? '点一个 prompt 试试' : 'Pick a prompt below'}</p>
              </div>
            )}
            {messages.map((m, i) => (
              <MessageBubble key={i} msg={m} />
            ))}
            {streaming && (
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand" />
                streaming...
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
            {prompts.map((p) => (
              <button
                key={p}
                onClick={() => runPrompt(p)}
                disabled={streaming}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-page px-3 py-1.5 text-xs text-ink transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
              >
                <Send size={11} /> {p}
              </button>
            ))}
          </div>
        </Card>

        {/* Skills panel */}
        <Card variant="outlined" className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
            <Terminal size={16} className="text-brand" />
            <p className="text-sm font-bold text-ink">{v.skillsPanelTitle}</p>
          </div>
          <div className="space-y-2">
            {['M1', 'M5', 'M7', 'M11', 'M14', 'M15', 'M16', 'P1', 'P3'].map((code) => {
              const active = activeSkills.includes(code);
              return (
                <div
                  key={code}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
                    active
                      ? 'border-brand bg-brand-soft text-brand'
                      : 'border-border bg-page text-muted'
                  }`}
                >
                  <span className="font-mono font-bold">{code}</span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      active ? 'animate-pulse bg-brand' : 'bg-gray-200'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  if (msg.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-brand px-4 py-2.5 text-sm text-white">
          <div className="flex items-start gap-2">
            <User size={13} className="mt-0.5 shrink-0" />
            <p>{msg.text}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        {msg.tool && (
          <div className="mb-1 ml-1 inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 font-mono text-[10px] text-muted">
            <Terminal size={10} /> {msg.tool}
          </div>
        )}
        <div className="flex items-start gap-2 rounded-2xl rounded-tl-sm bg-gray-50 px-4 py-2.5 text-sm text-ink">
          <Bot size={13} className="mt-0.5 shrink-0 text-brand" />
          <p>{msg.text}</p>
        </div>
      </div>
    </div>
  );
}
