/**
 * Dialog state machine for Act 2 v1.1.
 *
 * Three complete paths, each a sequence of steps.
 * Each step has:
 *   - triggers: keywords that move user INTO this step
 *   - turns: ordered actions the agent performs (tool call, text, structured card)
 *   - nextHints: suggested user replies rendered as quick-action chips
 *
 * Runner matches user input against the NEXT step's triggers within the active path;
 * fallback replies handle off-path input.
 */

export type PathId = 'A' | 'B' | 'C';

export interface AgentTurnTool {
  kind: 'tool';
  skillCodes: string[]; // M1, M2...
  durationMs: number;
  label: { zh: string; en: string };
}

export interface AgentTurnText {
  kind: 'text';
  text: { zh: string; en: string };
}

export interface AgentTurnCard {
  kind: 'card';
  variant: 'dailyReport' | 'limitOrder' | 'mcpInstall';
  payload: Record<string, unknown>;
}

export type AgentTurn = AgentTurnTool | AgentTurnText | AgentTurnCard;

export interface DialogStep {
  id: string;
  triggers: string[]; // lowercased substrings; empty array = entry step
  userEcho: { zh: string; en: string }; // what to show in user bubble if triggered via chip
  turns: AgentTurn[];
  nextHints?: { zh: string; en: string }[]; // quick-action chips to render after turns play
}

export interface DialogPath {
  id: PathId;
  title: { zh: string; en: string };
  icon: string;
  steps: DialogStep[];
}

// ── Path A — Daily Report ────────────────────────────────────────────────────

const pathA: DialogPath = {
  id: 'A',
  title: { zh: '市场日报', en: 'Daily Report' },
  icon: '📰',
  steps: [
    {
      id: 'A1',
      triggers: ['行情', '市场', 'market', 'overview'],
      userEcho: { zh: '帮我看看今天加密市场整体情况', en: 'How is the crypto market doing today?' },
      turns: [
        {
          kind: 'tool',
          skillCodes: ['M1', 'M4'],
          durationMs: 1400,
          label: { zh: '拉取主流币行情 + 市场概览', en: 'Fetching quotes + market overview' },
        },
        {
          kind: 'text',
          text: {
            zh: 'BTC $87,432 (+2.3%)，ETH $4,125 (+1.8%)，SOL $172 (+4.1%)。总市值 $3.2T，24h 成交 $98B。资金偏多，主流币普涨。需要我生成一份完整日报吗？',
            en: 'BTC $87,432 (+2.3%), ETH $4,125 (+1.8%), SOL $172 (+4.1%). Total cap $3.2T, 24h volume $98B. Broad bullish tone. Want me to compile a full daily report?',
          },
        },
      ],
      nextHints: [
        { zh: '生成日报', en: 'Generate report' },
        { zh: '看看公告', en: 'Show announcements' },
      ],
    },
    {
      id: 'A2',
      triggers: ['日报', 'report', '生成'],
      userEcho: { zh: '给我生成日报', en: 'Generate the daily report' },
      turns: [
        {
          kind: 'tool',
          skillCodes: ['M2', 'M3', 'M4'],
          durationMs: 1800,
          label: { zh: '聚合涨跌榜 + 公告 + 链上数据', en: 'Aggregating gainers, announcements, on-chain' },
        },
        {
          kind: 'card',
          variant: 'dailyReport',
          payload: {
            date: '2026-04-14',
            btc: { price: 87432, change: 2.3 },
            eth: { price: 4125, change: 1.8 },
            sol: { price: 172, change: 4.1 },
            totalCap: '$3.2T',
            volume24h: '$98B',
            fearGreed: 68,
            topGainer: { symbol: 'ENA', change: 18.4 },
            topLoser: { symbol: 'ARB', change: -6.2 },
            netInflow: '$520M',
            highlights: [
              { zh: 'SOL 突破 $170 关键阻力，链上活跃度增 12%', en: 'SOL breaks $170 resistance, on-chain activity +12%' },
              { zh: 'ENA 受 Pendle 集成利好领涨', en: 'ENA leads on Pendle integration news' },
              { zh: '美股开盘后资金净流入 $520M', en: 'Net inflow $520M after US market open' },
            ],
          },
        },
      ],
      nextHints: [
        { zh: '下单 BTC', en: 'Place BTC order' },
        { zh: '发现更多 Skills', en: 'Discover more skills' },
      ],
    },
  ],
};

// ── Path B — Limit Order ─────────────────────────────────────────────────────

const pathB: DialogPath = {
  id: 'B',
  title: { zh: '限价下单', en: 'Limit Order' },
  icon: '📈',
  steps: [
    {
      id: 'B1',
      triggers: ['买', 'buy', '下单', 'order', '交易', '限价', 'limit'],
      userEcho: {
        zh: 'BTC 如果跌到 $85,000 就帮我买入 0.5 BTC',
        en: 'If BTC drops to $85,000, buy 0.5 BTC for me',
      },
      turns: [
        {
          kind: 'tool',
          skillCodes: ['M7', 'M11', 'M12'],
          durationMs: 1200,
          label: { zh: '余额校验 → API 鉴权 → 风控检查', en: 'Balance → Auth → Risk gate' },
        },
        {
          kind: 'text',
          text: {
            zh: '校验通过：账户可用 USDT $48,200，API Key 具备现货交易权限，风控评估通过（单笔金额未超过当日限额 30%）。确认挂单？',
            en: 'Checks passed: USDT $48,200 available, API has spot trade permission, risk score OK (within 30% daily cap). Confirm order?',
          },
        },
      ],
      nextHints: [
        { zh: '确认挂单', en: 'Confirm order' },
        { zh: '调整价格', en: 'Adjust price' },
      ],
    },
    {
      id: 'B2',
      triggers: ['确认', 'confirm', '挂单', 'place'],
      userEcho: { zh: '确认挂单', en: 'Confirm the order' },
      turns: [
        {
          kind: 'tool',
          skillCodes: ['M5', 'M6'],
          durationMs: 1000,
          label: { zh: '提交限价单 → 查询回执', en: 'Submit limit order → fetch receipt' },
        },
        {
          kind: 'card',
          variant: 'limitOrder',
          payload: {
            orderId: 'CW2026041400817',
            symbol: 'BTC/USDT',
            side: 'BUY',
            type: 'LIMIT',
            price: 85000,
            amount: 0.5,
            notional: 42500,
            status: 'OPEN',
            timestamp: '2026-04-14 10:32:17',
          },
        },
      ],
      nextHints: [
        { zh: '查看持仓', en: 'Show positions' },
        { zh: '生成日报', en: 'Generate report' },
      ],
    },
  ],
};

// ── Path C — Discovery & MCP Integration ─────────────────────────────────────

const pathC: DialogPath = {
  id: 'C',
  title: { zh: '发现并接入', en: 'Discover & Install' },
  icon: '🔍',
  steps: [
    {
      id: 'C1',
      triggers: ['赚钱', '发现', '工具', '找', 'find', 'discover', 'tool', 'skill'],
      userEcho: {
        zh: '帮我找一些可以在加密货币上赚钱的工具',
        en: 'Help me find some tools to trade crypto',
      },
      turns: [
        {
          kind: 'tool',
          skillCodes: ['M14'],
          durationMs: 1500,
          label: { zh: '搜索 MCP Registry', en: 'Searching MCP Registry' },
        },
        {
          kind: 'text',
          text: {
            zh: '找到 CoinW Skills 套件，包含 18 项能力：行情/下单/风控/日报。评分 4.8，已被 12,400+ Agent 接入。要接入吗？',
            en: 'Found CoinW Skills suite — 18 capabilities covering quotes/orders/risk/reports. Rating 4.8, installed by 12,400+ agents. Want to install?',
          },
        },
      ],
      nextHints: [
        { zh: '接入 CoinW Skills', en: 'Install CoinW Skills' },
        { zh: '看看评价', en: 'Show reviews' },
      ],
    },
    {
      id: 'C2',
      triggers: ['接入', '安装', 'install', '对接', 'connect'],
      userEcho: { zh: '接入吧', en: 'Install it' },
      turns: [
        {
          kind: 'tool',
          skillCodes: ['M13', 'M11'],
          durationMs: 1600,
          label: { zh: 'MCP 握手 → API Key 配置', en: 'MCP handshake → API key setup' },
        },
        {
          kind: 'card',
          variant: 'mcpInstall',
          payload: {
            endpoint: 'mcp.coinw.com/v1',
            skillCount: 18,
            authMethod: 'API Key + IP Whitelist',
            latency: '98ms',
            status: 'CONNECTED',
            nextActions: [
              { zh: '试一下"查看 BTC 行情"', en: 'Try "show BTC price"' },
              { zh: '或让 Agent 生成一份日报', en: 'Or ask the agent for a daily report' },
            ],
          },
        },
      ],
      nextHints: [
        { zh: '查看 BTC 行情', en: 'Show BTC price' },
        { zh: '生成日报', en: 'Generate report' },
      ],
    },
  ],
};

export const DIALOG_PATHS: DialogPath[] = [pathA, pathB, pathC];

export function findMatchingStep(input: string): { path: DialogPath; step: DialogStep } | null {
  const lower = input.toLowerCase().trim();
  if (!lower) return null;
  for (const path of DIALOG_PATHS) {
    for (const step of path.steps) {
      if (step.triggers.some((t) => lower.includes(t.toLowerCase()))) {
        return { path, step };
      }
    }
  }
  return null;
}
