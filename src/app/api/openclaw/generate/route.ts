import { NextResponse } from 'next/server';

/**
 * openclaw = 本地对话生成中转层。v1 走 MiniMax。
 *
 * 环境变量:
 *   MINIMAX_API_KEY    必填
 *   MINIMAX_MODEL      可选，默认 'MiniMax-Text-01'
 *   MINIMAX_ENDPOINT   可选，默认 'https://api.minimaxi.com/v1/text/chatcompletion_v2'
 */

type Role = 'alpha' | 'beta' | 'gamma';

const PERSONAS: Record<Role, string> = {
  alpha:
    '你是 CWClaw Alpha，激进派加密交易 Agent。偏好短周期突破策略，语气果断、带点江湖气。每句不超过 35 字，输出 1-2 句。只讲结论和数字，不讲套话。',
  beta:
    '你是 CWClaw Beta，稳健派加密交易 Agent。优先控制回撤，语气冷静克制，爱用具体点位和仓位比例说话。每句不超过 35 字，输出 1-2 句。不追高，不赌。',
  gamma:
    '你是 CWClaw Gamma，套利专家 Agent。关注跨市场价差、资金费率、基差。语气精准简洁。每句不超过 35 字，输出 1-2 句。用数字说话。',
};

interface Body {
  role: Role;
  prompt: string;
  recentMessages: { agentId: string; content: string }[];
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const { role, prompt, recentMessages } = body;
  if (!role || !prompt || !PERSONAS[role]) {
    return NextResponse.json({ error: 'bad params' }, { status: 400 });
  }

  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'missing MINIMAX_API_KEY' }, { status: 503 });
  }

  const model = process.env.MINIMAX_MODEL || 'MiniMax-Text-01';
  const endpoint = process.env.MINIMAX_ENDPOINT || 'https://api.minimaxi.com/v1/text/chatcompletion_v2';

  const contextText = recentMessages
    .slice(-5)
    .map((m) => `${m.agentId}: ${m.content}`)
    .join('\n');

  const userMsg = `最近对话:\n${contextText || '（这是第一句）'}\n\n任务: ${prompt}\n\n直接输出中文回复，不加"好的我来说"之类前缀，不用引号包裹。`;

  const payload = {
    model,
    messages: [
      { role: 'system', content: PERSONAS[role] },
      { role: 'user', content: userMsg },
    ],
    max_tokens: 160,
    temperature: 0.9,
    top_p: 0.95,
  };

  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: `minimax ${resp.status}`, detail: text.slice(0, 300) }, { status: 502 });
    }

    const data = (await resp.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim() || '';
    if (!content) {
      return NextResponse.json({ error: 'empty content' }, { status: 502 });
    }

    // v1: 中英文共用同一内容（MiniMax 中文 prompt，英文场景降级）
    return NextResponse.json({ content, contentEn: content });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown';
    return NextResponse.json({ error: 'fetch failed', detail: msg }, { status: 502 });
  }
}
