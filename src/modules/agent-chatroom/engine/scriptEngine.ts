'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AgentId, ChatMessage, TopicContext } from '../types';
import { generateMessage } from '../api/openclawClient';

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

// ─── Hook ───────────────────────────────────────────────────────
export function useScriptEngine(topic: TopicContext) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingAgent, setTypingAgent] = useState<AgentId | null>(null);
  const [round, setRound] = useState(1);

  const cancelRef = useRef(false);
  const likedSet = useRef<Set<string>>(new Set());
  const messagesRef = useRef<ChatMessage[]>([]);

  // 让 messagesRef 随 state 同步
  const pushMessage = useCallback((msg: ChatMessage) => {
    messagesRef.current = [...messagesRef.current, msg];
    setMessages([...messagesRef.current]);
  }, []);

  const sleep = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      const id = window.setTimeout(resolve, ms);
      // 挂到 cancelRef 里，cleanup 时 clearTimeout
      (cancelRef as any)._timers = [...((cancelRef as any)._timers || []), id];
    });
  }, []);

  const runLoop = useCallback(async (currentRound: number) => {
    let lastAgent: AgentId | null = null;
    let count = 0;

    while (!cancelRef.current && count < ROUND_MAX) {
      const agentId = pickNext(lastAgent);
      lastAgent = agentId;
      count++;

      // 1. typing 指示
      setTypingAgent(agentId);
      await sleep(rand(TYPING_MS.min, TYPING_MS.max));
      if (cancelRef.current) return;

      // 2. 生成消息
      const context = messagesRef.current.slice(-6);
      let content = '';
      let contentEn = '';

      try {
        const out = await generateMessage({
          role: ROLE_MAP[agentId],
          topic,
          recentMessages: context,
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
        // 新一轮：清空消息
        messagesRef.current = [];
        setMessages([]);
        const nextRound = currentRound + 1;
        setRound(nextRound);
        runLoop(nextRound);
      }
    }
  }, [topic, sleep, pushMessage]);

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
  }, [topic]);

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

  return { messages, typingAgent, round, likeMessage };
}
