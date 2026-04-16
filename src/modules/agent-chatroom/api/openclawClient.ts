import type { AgentRole, ChatMessage, TopicContext } from '../types';

// ─── Market Snapshot（和 /api/market/snapshot 返回格式一致）─────
export interface MarketSnapshot {
  tickers: { symbol: string; price: number; change24h: number }[];
  fundingRates?: { symbol: string; rate: number; annualized: number }[];
  topGainers?: { symbol: string; change: number }[];
  topLosers?: { symbol: string; change: number }[];
  source: string;
  timestamp: number;
}

interface GenerateInput {
  role: AgentRole;
  topic: TopicContext;
  recentMessages: ChatMessage[];
  market?: MarketSnapshot;
}

interface GenerateOutput {
  content: string;
  contentEn: string;
}

const TIMEOUT_MS = 8000; // 增加到8s，因为 MiniMax 可能慢

export async function generateMessage(input: GenerateInput): Promise<GenerateOutput> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const resp = await fetch('/api/openclaw/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: input.role,
        topic: {
          title: input.topic.title,
          titleEn: input.topic.titleEn,
          tickers: input.topic.tickers,
        },
        recentMessages: input.recentMessages.slice(-6).map((m) => ({
          agentId: m.agentId,
          content: m.content,
        })),
        market: input.market ?? undefined,
      }),
      signal: ctrl.signal,
    });

    if (!resp.ok) throw new Error(`openclaw ${resp.status}`);
    const data = (await resp.json()) as GenerateOutput;
    if (!data.content) throw new Error('empty');
    return { content: data.content, contentEn: data.contentEn || data.content };
  } finally {
    clearTimeout(timer);
  }
}

// ─── 市场数据获取 ─────────────────────────────────────────────
export async function fetchMarketSnapshot(): Promise<MarketSnapshot | null> {
  try {
    const resp = await fetch('/api/market/snapshot', {
      signal: AbortSignal.timeout(4000),
    });
    if (!resp.ok) return null;
    return (await resp.json()) as MarketSnapshot;
  } catch {
    return null;
  }
}
