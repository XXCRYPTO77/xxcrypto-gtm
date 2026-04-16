import { NextResponse } from 'next/server';
import alphaSkill from '@/modules/agent-chatroom/skills/cwclaw-alpha.json';
import betaSkill from '@/modules/agent-chatroom/skills/cwclaw-beta.json';
import gammaSkill from '@/modules/agent-chatroom/skills/cwclaw-gamma.json';

/**
 * openclaw — MiniMax 代理，为 Act 1.5 Agent 聊天室生成实时消息。
 *
 * 环境变量:
 *   MINIMAX_API_KEY    必填
 *   MINIMAX_MODEL      可选，默认 MiniMax-Text-01
 *   MINIMAX_ENDPOINT   可选，默认国际版
 */

type Role = 'alpha' | 'beta' | 'gamma';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SKILLS: Record<Role, any> = {
  alpha: alphaSkill,
  beta: betaSkill,
  gamma: gammaSkill,
};

const AGENT_NAMES: Record<string, string> = {
  'cwclaw-alpha': 'Alpha',
  'cwclaw-beta': 'Beta',
  'cwclaw-gamma': 'Gamma',
  system: '系统',
};

/** 从 Skill JSON 构建 system prompt */
function buildSystemPrompt(role: Role): string {
  const skill = SKILLS[role];
  const examples = (skill.style.examples as string[]).slice(0, 6).join('\n  - ');
  const banned = (skill.style.bannedPhrases as string[]).join('、');
  const framework = (skill.analyticalFramework.coreLogic as string[]).join('；');

  // 互动规则
  const interactions: string[] = [];
  if (skill.interactionRules) {
    const ir = skill.interactionRules as Record<string, string>;
    for (const [key, val] of Object.entries(ir)) {
      interactions.push(`${key}: ${val}`);
    }
  }
  const interactionBlock = interactions.length > 0
    ? `\n和其他 Agent 互动规则：\n${interactions.join('\n')}`
    : '';

  return (
    `你是 ${skill.displayName}。${skill.persona}\n\n` +
    `分析框架：${framework}\n\n` +
    `说话风格：${skill.style.tone}。每次发言1-2句，不超过${skill.style.maxLength}字。` +
    `像人在群里打字，不是写分析报告。\n` +
    `禁用词：${banned}\n` +
    `参考发言（学风格不照抄）：\n  - ${examples}` +
    `${interactionBlock}\n\n` +
    `硬性规则：\n` +
    `- 直接输出你说的话，不加角色标签、不加引号\n` +
    `- 不用 markdown 格式\n` +
    `- 不输出分析报告模板，只说人话\n` +
    `- 偶尔可以@另一个Agent的名字（Alpha/Beta/Gamma）`
  );
}

interface MarketSnapshot {
  tickers: { symbol: string; price: number; change24h: number }[];
  fundingRates?: { symbol: string; rate: number; annualized: number }[];
  topGainers?: { symbol: string; change: number }[];
  topLosers?: { symbol: string; change: number }[];
}

interface Body {
  role: Role;
  topic: { title: string; titleEn: string; tickers: { symbol: string; price: number; change24h: number }[] };
  recentMessages: { agentId: string; content: string }[];
  market?: MarketSnapshot;
}

export async function POST(req: Request) {
  let body: Body;
  try { body = (await req.json()) as Body; }
  catch { return NextResponse.json({ error: 'invalid json' }, { status: 400 }); }

  const { role, topic, recentMessages, market } = body;
  if (!role || !SKILLS[role]) {
    return NextResponse.json({ error: 'bad params' }, { status: 400 });
  }

  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'missing MINIMAX_API_KEY' }, { status: 503 });

  const model = process.env.MINIMAX_MODEL || 'MiniMax-Text-01';
  const endpoint = process.env.MINIMAX_ENDPOINT || 'https://api.minimaxi.com/v1/text/chatcompletion_v2';

  // ─── 行情数据 ──────────────────────────────────────────────
  const tickers = market?.tickers ?? topic.tickers;
  const tickerLine = tickers
    .map((t) => `${t.symbol} $${t.price.toLocaleString(undefined, { maximumFractionDigits: 4 })} (${t.change24h >= 0 ? '+' : ''}${t.change24h.toFixed(2)}%)`)
    .join(' | ');

  // 资金费率（如果有）
  let fundingLine = '';
  if (market?.fundingRates && market.fundingRates.length > 0) {
    fundingLine = '\n资金费率：' + market.fundingRates
      .map((f) => `${f.symbol} ${f.rate >= 0 ? '+' : ''}${(f.rate * 100).toFixed(4)}%（年化${f.annualized.toFixed(1)}%）`)
      .join(' | ');
  }

  // 涨跌幅榜（如果有）
  let moversLine = '';
  if (market?.topGainers && market.topGainers.length > 0) {
    moversLine += '\n涨幅榜：' + market.topGainers.slice(0, 3).map((g) => `${g.symbol} +${g.change.toFixed(1)}%`).join('、');
  }
  if (market?.topLosers && market.topLosers.length > 0) {
    moversLine += '\n跌幅榜：' + market.topLosers.slice(0, 3).map((l) => `${l.symbol} ${l.change.toFixed(1)}%`).join('、');
  }

  // ─── 对话历史 ──────────────────────────────────────────────
  const history = recentMessages.length > 0
    ? recentMessages.map((m) => `${AGENT_NAMES[m.agentId] ?? m.agentId}: ${m.content}`).join('\n')
    : '（你是第一个开口的，先聊聊当前行情）';

  // ─── 当前时间 ──────────────────────────────────────────────
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} UTC`;

  const userMsg =
    `当前时间：${timeStr}\n` +
    `讨论话题：${topic.title}\n` +
    `实时行情：${tickerLine}${fundingLine}${moversLine}\n\n` +
    `最近对话：\n${history}\n\n` +
    `你接下来说什么？直接输出你说的话。`;

  const systemPrompt = buildSystemPrompt(role);

  const payload = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMsg },
    ],
    max_tokens: 200,
    temperature: 0.92,
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
