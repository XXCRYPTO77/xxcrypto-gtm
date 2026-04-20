/**
 * Skills registry for Act 2 chat demo + /skills reference page.
 * Complete M1-M18 covering all 4 groups.
 */

export interface SkillRef {
  code: string; // M1..M18
  name: string;
  nameEn: string;
  group: 'info' | 'trade' | 'auth' | 'platform';
  desc?: string;
  descEn?: string;
}

export const CHAT_SKILLS: SkillRef[] = [
  // Info (4)
  {
    code: 'M1', name: '实时行情查询', nameEn: 'Realtime Quotes', group: 'info',
    desc: '查询任意交易对的实时价格、24h 涨跌幅、成交量。支持 BTC/ETH/SOL 等主流币及长尾标的。',
    descEn: 'Real-time price, 24h change, and volume for any trading pair. Covers BTC, ETH, SOL and long-tail assets.',
  },
  {
    code: 'M2', name: '涨跌排行', nameEn: 'Gainers & Losers', group: 'info',
    desc: '获取全市场涨幅榜/跌幅榜，支持现货与合约分开查询，可按时间窗口筛选。',
    descEn: 'Market-wide gainers and losers list. Filterable by spot/futures and time window.',
  },
  {
    code: 'M3', name: '交易所公告', nameEn: 'Exchange Announcements', group: 'info',
    desc: '拉取 CoinW 官方公告，包含上币通知、活动、规则变更，自动推送重大消息。',
    descEn: 'Fetch CoinW official announcements including listings, events, and rule changes. Auto-pushes major notices.',
  },
  {
    code: 'M4', name: '市场概览', nameEn: 'Market Overview', group: 'info',
    desc: '全局市场快照：总市值、BTC 主导率、恐惧贪婪指数、资金费率分布、链上活跃地址数。',
    descEn: 'Global market snapshot: total cap, BTC dominance, Fear & Greed Index, funding rate distribution, on-chain active addresses.',
  },
  // Trade (6)
  {
    code: 'M5', name: '现货/合约下单', nameEn: 'Spot/Futures Order', group: 'trade',
    desc: '支持限价单、市价单、止盈止损单。合约支持多空双向，杠杆 1-100x，单笔上限 $10,000。',
    descEn: 'Limit, market, and stop orders for spot and futures. Supports long/short, 1-100x leverage, $10,000 per-trade cap.',
  },
  {
    code: 'M6', name: '订单查询', nameEn: 'Order Query', group: 'trade',
    desc: '查询当前委托、历史成交记录，支持按币对、时间、状态过滤，返回完整订单详情。',
    descEn: 'Query open orders and trade history. Filterable by pair, time range, and status. Returns full order details.',
  },
  {
    code: 'M7', name: '余额查询', nameEn: 'Balance Query', group: 'trade',
    desc: '实时查看现货账户、合约账户余额，支持按币种明细展示，返回可用 / 冻结 / 总资产。',
    descEn: 'Real-time spot and futures account balance. Per-coin breakdown with available / frozen / total.',
  },
  {
    code: 'M8', name: '持仓总览', nameEn: 'Position Overview', group: 'trade',
    desc: '查看所有合约持仓的方向、数量、开仓均价、浮盈亏、强平价，一句话读完全仓状态。',
    descEn: 'View all futures positions: direction, size, entry price, unrealized PnL, liquidation price. Full position state in one query.',
  },
  {
    code: 'M9', name: '资金划转', nameEn: 'Fund Transfer', group: 'trade',
    desc: '在现货账户与合约账户之间划转资金，不含提现。单次划转最高 $50,000，实时到账。',
    descEn: 'Transfer funds between spot and futures accounts. No withdrawal. Up to $50,000 per transfer, instant settlement.',
  },
  {
    code: 'M10', name: '禁止提现', nameEn: 'Withdrawal Lock', group: 'trade',
    desc: '硬性安全约束：API Key 永不开放提现权限，Agent 无法发起任何链上转账或提现操作。',
    descEn: 'Hard security constraint: API Key never grants withdrawal permission. Agent cannot initiate any on-chain transfer or withdrawal.',
  },
  // Auth (4)
  {
    code: 'M11', name: 'API Key 认证', nameEn: 'API Key Auth', group: 'auth',
    desc: '绑定 CoinW 账号时自动生成专属 API Key（只读 + 现货交易权限），无需用户手动配置。',
    descEn: 'Auto-generates a dedicated API Key (read + spot trade) when linking CoinW account. No manual configuration needed.',
  },
  {
    code: 'M12', name: '权限分级', nameEn: 'Permission Tiers', group: 'auth',
    desc: '四级权限：只读 / 现货 / 合约 / 完整。每级精确控制 Agent 可以调用的操作范围。',
    descEn: 'Four permission tiers: read-only / spot / futures / full. Each tier precisely scopes which operations Agent can call.',
  },
  {
    code: 'M13', name: '频率限制', nameEn: 'Rate Limiting', group: 'auth',
    desc: 'API 调用频率上限 100 次/分钟，防止 Agent 滥用接口，超出自动降速而非报错。',
    descEn: 'API call rate cap at 100 req/min. Prevents abuse; excess requests throttle gracefully rather than error.',
  },
  {
    code: 'M14', name: '额度上限', nameEn: 'Amount Caps', group: 'auth',
    desc: '单笔交易金额上限默认 $10,000，可在账户设置中调整，超出额度 Agent 会主动提醒。',
    descEn: 'Per-trade amount cap defaults to $10,000, adjustable in account settings. Agent proactively alerts when approaching limit.',
  },
  // Platform (4)
  {
    code: 'M15', name: 'MCP 协议服务', nameEn: 'MCP Protocol', group: 'platform',
    desc: '通过 MCP（Model Context Protocol）标准接口暴露所有 Skills，支持任意 AI 客户端接入。',
    descEn: 'All skills exposed via MCP (Model Context Protocol) standard interface, compatible with any AI client.',
  },
  {
    code: 'M16', name: 'Skills 可发现性', nameEn: 'Skill Discovery', group: 'platform',
    desc: 'Agent 启动时自动加载可用 Skill 列表，用户和 AI 客户端均可实时查询当前能力边界。',
    descEn: 'Agent auto-loads available skill list on startup. Users and AI clients can query current capability scope in real time.',
  },
  {
    code: 'M17', name: '落地页入口', nameEn: 'Landing Portal', group: 'platform',
    desc: '统一的 Claw 42 产品入口，整合认养流程、功能展示、用户引导，是产品对外的第一个触点。',
    descEn: 'Unified Claw 42 product entry point integrating the adoption flow, feature showcase, and user onboarding.',
  },
  {
    code: 'M18', name: '调用统计', nameEn: 'Usage Analytics', group: 'platform',
    desc: '记录每次 Skill 调用的时间、耗时、成功率，在复盘 dashboard 中可视化展示。',
    descEn: 'Tracks each skill call with timestamp, latency, and success rate. Visualized in the review dashboard.',
  },
];

export function getSkill(code: string): SkillRef | undefined {
  return CHAT_SKILLS.find((s) => s.code === code);
}
