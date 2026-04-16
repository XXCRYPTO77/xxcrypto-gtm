import type { AgentRole, ChatMessage, TopicContext } from '../types';

interface GenerateInput {
  role: AgentRole;
  topic: TopicContext;
  recentMessages: ChatMessage[];
}

interface GenerateOutput {
  content: string;
  contentEn: string;
}

const TIMEOUT_MS = 5000;

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
