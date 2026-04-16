'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AgentId, ChatMessage, TickerData, TopicContext } from '../types';
import { generateMessage, fetchMarketSnapshot } from '../api/openclawClient';
import type { MarketSnapshot } from '../api/openclawClient';

// ─── 常量 ────────────────────────────────────────────────────────
const AGENTS: AgentId[] = ['cwclaw-alpha', 'cwclaw-beta', 'cwclaw-gamma'];
const ROLE_MAP: Record<AgentId, 'alpha' | 'beta' | 'gamma'> = {
  'cwclaw-alpha': 'alpha',
  'cwclaw-beta': 'beta',
  'cwclaw-gamma': 'gamma',
};

// 打字等待 ms（模拟 Agent 思考速度）
const TYPING_MS = { min: 1200, max: 2400 };
// 消息间隔 ms（Agent 打完字到下一个 Agent 开始）
const GAP_MS = { min: 1800, max: 3800 };
// 每轮最多条数，超过后冷却 30s 重启
const ROUND_MAX = 28;
const COOLDOWN_MS = 30_000;
// 市场数据刷新间隔
const MARKET_REFRESH_MS = 15_000;

const LIKE_KEY = 'cwc-act15-likes';

function rand(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min));
}

// 不让同一个 Agent 连续发两次以上
function pickNext(last: AgentId | null): AgentId {
  const pool = last ? AGENTS.filter((a) => a !== last) : AGENTS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function readLiked(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try { return new Set(JSON.parse(window.localStorage.getItem(LIKE_KEY) || '[]')); }
  catch { return new Set(); }
}

function writeLiked(s: Set<string>) {
  try { window.localStorage.setItem(LIKE_KEY, JSON.stringify([...s])); } catch { /**/ }
}

// 用实时数据生成话题标题
function buildTopicTitle(tickers: TickerData[]): { title: string; titleEn: string } {
  const now = new Date();
  const dateStr = `${now.getMonth() + 1}/${now.getDate()}`;
  const btc = tickers.find((t) => t.symbol === 'BTC');
  const direction = btc && btc.change24h >= 0 ? '多头' : '空头';
  return {
    title: `实时讨论 · 加密市场 ${dateStr} · ${direction}氛围`,
    titleEn: `Live Discussion · Crypto ${dateStr}`,
  };
}

// ─── Hook ───────────────────────────────────────────────────────
export function useScriptEngine(initialTopic: TopicContext) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingAgent, setTypingAgent] = useState<AgentId | null>(null);
  const [round, setRound] = useState(1);
  const [topic, setTopic] = useState<TopicContext>(initialTopic);

  const cancelRef = useRef(false);
  const likedSet = useRef<Set<string>>(new Set());
  const messagesRef = useRef<ChatMessage[]>([]);
  const marketRef = useRef<MarketSnapshot | null>(null);

  // 让 messagesRef 随 state 同步
  const pushMessage = useCallback((msg: ChatMessage) => {
    messagesRef.current = [...messagesRef.current, msg];
    setMessages([...messagesRef.current]);
  }, []);

  const sleep = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      const id = window.setTimeout(resolve, ms);
      (cancelRef as any)._timers = [...((cancelRef as any)._timers || []), id];
    });
  }, []);

  // 刷新市场数据 + 同步到 topic state
  const refreshMarket = useCallback(async () => {
    const snapshot = await fetchMarketSnapshot();
    if (snapshot && snapshot.tickers.length > 0) {
      marketRef.current = snapshot;
      const newTickers: TickerData[] = snapshot.tickers.map((t) => ({
        symbol: t.symbol,
        price: t.price,
        change24h: t.change24h,
      }));
      const titles = buildTopicTitle(newTickers);
      setTopic((prev) => ({
        ...prev,
        tickers: newTickers,
        title: titles.title,
        titleEn: titles.titleEn,
      }));
    }
  }, []);

  const runLoop = useCallback(async (currentRound: number) => {
    let lastAgent: AgentId | null = null;
    let count = 0;
    let lastMarketRefresh = 0;

    // 首次立即刷新市场数据
    await refreshMarket();
    lastMarketRefresh = Date.now();

    while (!cancelRef.current && count < ROUND_MAX) {
      const agentId = pickNext(lastAgent);
      lastAgent = agentId;
      count++;

      // 定时刷新市场数据（每 15s）
      if (Date.now() - lastMarketRefresh > MARKET_REFRESH_MS) {
        await refreshMarket();
        lastMarketRefresh = Date.now();
      }

      // 1. typing 指示
      setTypingAgent(agentId);
      await sleep(rand(TYPING_MS.min, TYPING_MS.max));
      if (cancelRef.current) return;

      // 2. 生成消息（传入实时市场数据）
      const context = messagesRef.current.slice(-6);
      let content = '';
      let contentEn = '';

      try {
        const currentTickers = marketRef.current?.tickers.map((t) => ({
          symbol: t.symbol,
          price: t.price,
          change24h: t.change24h,
        })) ?? initialTopic.tickers;

        const out = await generateMessage({
          role: ROLE_MAP[agentId],
          topic: { ...initialTopic, tickers: currentTickers },
          recentMessages: context,
          market: marketRef.current ?? undefined,
        });
        content = out.content;
        contentEn = out.contentEn;
      } catch {
        // fallback：沉默降级，跳过这条继续
        setTypingAgent(null);
        await sleep(rand(GAP_MS.min, GAP_MS.max));
        continue;
      }

      if (cancelRef.current) return;

      const msgId = `${agentId}-r${currentRound}-${count}`;
      const msg: ChatMessage = {
        id: msgId,
        agentId,
        type: count % 5 === 0 ? 'strategy' : count % 3 === 0 ? 'reaction' : 'analysis',
        content,
        contentEn,
        timestamp: Date.now(),
        likes: rand(2, 28),
        liked: likedSet.current.has(msgId),
      };

      setTypingAgent(null);
      pushMessage(msg);

      // 3. 等一会儿再发下一条
      await sleep(rand(GAP_MS.min, GAP_MS.max));
    }

    if (!cancelRef.current) {
      // 冷却后重启
      await sleep(COOLDOWN_MS);
      if (!cancelRef.current) {
        messagesRef.current = [];
        setMessages([]);
        const nextRound = currentRound + 1;
        setRound(nextRound);
        runLoop(nextRound);
      }
    }
  }, [initialTopic, sleep, pushMessage, refreshMarket]);

  useEffect(() => {
    cancelRef.current = false;
    likedSet.current = readLiked();
    messagesRef.current = [];
    setMessages([]);
    setTypingAgent(null);
    (cancelRef as any)._timers = [];

    runLoop(1);

    return () => {
      cancelRef.current = true;
      ((cancelRef as any)._timers || []).forEach((id: number) => window.clearTimeout(id));
      (cancelRef as any)._timers = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTopic]);

  const likeMessage = useCallback((id: string) => {
    const set = likedSet.current;
    if (set.has(id)) set.delete(id); else set.add(id);
    writeLiked(set);
    setMessages((prev) =>
      prev.map((m) =>
        m.id !== id ? m : { ...m, liked: !m.liked, likes: m.likes + (m.liked ? -1 : 1) }
      )
    );
    messagesRef.current = messagesRef.current.map((m) =>
      m.id !== id ? m : { ...m, liked: !m.liked, likes: m.likes + (m.liked ? -1 : 1) }
    );
  }, []);

  // 现在返回 topic（含实时数据），让 UI 组件用最新 ticker
  return { messages, typingAgent, round, likeMessage, topic };
}
