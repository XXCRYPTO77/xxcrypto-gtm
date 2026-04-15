import type { AgentRole, ChatMessage } from '../types';

interface GenerateInput {
  role: AgentRole;
  prompt: string;
  recentMessages: ChatMessage[];
}

interface GenerateOutput {
  content: string;
  contentEn: string;
}

const TIMEOUT_MS = 4000;

/**
 * 调 /api/openclaw/generate 生成动态 Agent 消息。
 * 超时 / 失败 抛错，上层（scriptEngine）用 fallback 兜底。
 */
export async function generateMessage(input: GenerateInput): Promise<GenerateOutput> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const resp = await fetch('/api/openclaw/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: input.role,
        prompt: input.prompt,
        recentMessages: input.recentMessages.slice(-5).map((m) => ({
          agentId: m.agentId,
          content: m.content,
        })),
      }),
      signal: ctrl.signal,
    });

    if (!resp.ok) throw new Error(`openclaw ${resp.status}`);

    const data = (await resp.json()) as GenerateOutput;
    if (!data.content) throw new Error('empty content');
    return { content: data.content, contentEn: data.contentEn || data.content };
  } finally {
    clearTimeout(timer);
  }
}
