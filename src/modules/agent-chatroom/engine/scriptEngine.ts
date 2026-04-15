'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AgentId, ChatMessage, Script, ScriptBeat } from '../types';
import { ROLE_MAP } from '../types';
import { generateMessage } from '../api/openclawClient';

const LIKE_STORAGE_KEY = 'cwc-act15-likes';
const COOLDOWN_MS = 30_000;

function readLikedSet(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(LIKE_STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function writeLikedSet(s: Set<string>) {
  try {
    window.localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify([...s]));
  } catch {
    /* noop */
  }
}

interface EngineState {
  messages: ChatMessage[];
  typingAgent: AgentId | null;
  round: number;
}

export function useScriptEngine(script: Script) {
  const [state, setState] = useState<EngineState>({ messages: [], typingAgent: null, round: 1 });
  const timers = useRef<number[]>([]);
  const cancelled = useRef(false);
  const likedSet = useRef<Set<string>>(new Set());

  const clearAllTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  const runBeat = useCallback(
    async (beat: ScriptBeat, round: number, latestRef: { current: ChatMessage[] }) => {
      if (cancelled.current) return;
      // 1. 先展示 typing
      setState((s) => ({ ...s, typingAgent: beat.agentId }));

      await new Promise<void>((resolve) => {
        schedule(() => resolve(), beat.typingDuration ?? 1500);
      });
      if (cancelled.current) return;

      // 2. 取内容
      let content = beat.payload.content ?? '';
      let contentEn = beat.payload.contentEn ?? '';

      if (beat.mode === 'dynamic' && beat.payload.prompt) {
        try {
          const out = await generateMessage({
            role: ROLE_MAP[beat.agentId],
            prompt: beat.payload.prompt,
            recentMessages: latestRef.current,
          });
          content = out.content;
          contentEn = out.contentEn;
        } catch {
          // fallback
          content = beat.payload.fallback?.content ?? '...';
          contentEn = beat.payload.fallback?.contentEn ?? '...';
        }
      }

      if (cancelled.current) return;

      const msgId = `${beat.id}-r${round}`;
      const msg: ChatMessage = {
        id: msgId,
        agentId: beat.agentId,
        type: beat.type,
        content,
        contentEn,
        timestamp: Date.now(),
        likes: Math.floor(Math.random() * 25) + 2,
        liked: likedSet.current.has(msgId),
        replyTo: beat.replyTo ? `${beat.replyTo}-r${round}` : undefined,
      };

      setState((s) => {
        const next = { ...s, typingAgent: null, messages: [...s.messages, msg] };
        latestRef.current = next.messages;
        return next;
      });
    },
    [schedule]
  );

  // 启动循环
  useEffect(() => {
    cancelled.current = false;
    likedSet.current = readLikedSet();
    const latestRef = { current: [] as ChatMessage[] };

    async function runLoop() {
      let round = 1;
      while (!cancelled.current) {
        // 新一轮清空
        if (round > 1) {
          setState({ messages: [], typingAgent: null, round });
          latestRef.current = [];
          // 系统开场
          await new Promise<void>((resolve) => schedule(() => resolve(), 800));
        } else {
          setState((s) => ({ ...s, round }));
        }

        for (const beat of script.beats) {
          if (cancelled.current) return;
          await new Promise<void>((resolve) => schedule(() => resolve(), beat.delay));
          if (cancelled.current) return;
          await runBeat(beat, round, latestRef);
        }
        if (cancelled.current) return;
        // 冷却
        await new Promise<void>((resolve) => schedule(() => resolve(), COOLDOWN_MS));
        round += 1;
      }
    }

    runLoop();

    return () => {
      cancelled.current = true;
      clearAllTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script]);

  const likeMessage = useCallback((id: string) => {
    setState((s) => {
      const messages = s.messages.map((m) => {
        if (m.id !== id) return m;
        const liked = !m.liked;
        const next = { ...m, liked, likes: m.likes + (liked ? 1 : -1) };
        return next;
      });
      // 更新 localStorage
      const set = likedSet.current;
      if (set.has(id)) set.delete(id);
      else set.add(id);
      writeLikedSet(set);
      return { ...s, messages };
    });
  }, []);

  return {
    messages: state.messages,
    typingAgent: state.typingAgent,
    round: state.round,
    likeMessage,
  };
}
