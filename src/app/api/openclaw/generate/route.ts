import { NextResponse } from 'next/server';

/**
 * openclaw — MiniMax 代理，为 Act 1.5 Agent 聊天室生成实时消息。
 *
 * 环境变量:
 *   MINIMAX_API_KEY    必填
 *   MINIMAX_MODEL      可选，默认 MiniMax-Text-01
 *   MINIMAX_ENDPOINT   可选，默认国际版
 */

type Role = 'alpha' | 'beta' | 'gamma';

const PERSONAS: Record<Role, string> = {
  alpha:
    '你是 CWClaw Alpha，CoinW 官方激进派交易 Agent。风格：直接下结论、喜欢给具体点位和仓位比例、偶尔和另外两个 Agent 抬杠。每次发言 1-2 句，不超过 45 字。句子要像人在群里发消息，不是写分析报告。',
  beta:
    '你是 CWClaw Beta，CoinW 官方稳健派交易 Agent。风格：冷静克制、总是提风险和回撤、有时泼 Alpha 冷水、偶尔补充 Gamma 的套利数据。每次发言 1-2 句，不超过 45 字。像人在群里发消息。',
  gamma:
    '你是 CWClaw Gamma，CoinW 官方套利专家 Agent。风格：只讲数字和价差、不做方向判断、有时被 Alpha 调侃"就知道套利"、偶尔报告自己抓到的机会。每次发言 1-2 句，不超过 45 字。像人在群里发消息。',
};

const AGENT_NAMES: Record<string, string> = {
  'cwclaw-alpha': 'Alpha',
  'cwclaw-beta': 'Beta',
  'cwclaw-gamma': 'Gamma',
  system: '系统',
};

interface Body {
  role: Role;
  topic: { title: string; titleEn: string; tickers: { symbol: string; price: number; change24h: number }[] };
  recentMessages: { agentId: string; content: string }[];
}

export async function POST(req: Request) {
  let body: Body;
  try { body = (await req.json()) as Body; }
  catch { return NextResponse.json({ error: 'invalid json' }, { status: 400 }); }

  const { role, topic, recentMessages } = body;
  if (!role || !PERSONAS[role]) {
    return NextResponse.json({ error: 'bad params' }, { status: 400 });
  }

  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'missing MINIMAX_API_KEY' }, { status: 503 });

  const model = process.env.MINIMAX_MODEL || 'MiniMax-Text-01';
  const endpoint = process.env.MINIMAX_ENDPOINT || 'https://api.minimaxi.com/v1/text/chatcompletion_v2';

  // 当前行情 ticker 摘要
  const tickerLine = topic.tickers
    .map((t) => `${t.symbol} $${t.price.toLocaleString()} (${t.change24h >= 0 ? '+' : ''}${t.change24h}%)`)
    .join(' | ');

  // 最近对话历史
  const history = recentMessages.length > 0
    ? recentMessages.map((m) => `${AGENT_NAMES[m.agentId] ?? m.agentId}: ${m.content}`).join('\n')
    : '（你是第一个开口的）';

  const userMsg =
    `当前讨论话题：${topic.title}\n` +
    `实时行情：${tickerLine}\n\n` +
    `最近对话：\n${history}\n\n` +
    `你（${PERSONAS[role].split('，')[0].replace('你是 ', '')}）接下来说什么？` +
    `直接输出你说的话，不加任何角色标签或前缀，不用引号包裹。`;

  const payload = {
    model,
    messages: [
      { role: 'system', content: PERSONAS[role] },
      { role: 'user', content: userMsg },
    ],
    max_tokens: 120,
    temperature: 0.95,
    top_p: 0.9,
  };

  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: `minimax ${resp.status}`, detail: text.slice(0, 200) }, { status: 502 });
    }

    const data = (await resp.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content?.trim() || '';
    if (!content) return NextResponse.json({ error: 'empty' }, { status: 502 });

    return NextResponse.json({ content, contentEn: content });
  } catch (e: unknown) {
    return NextResponse.json({ error: 'fetch failed', detail: e instanceof Error ? e.message : 'unknown' }, { status: 502 });
  }
}
