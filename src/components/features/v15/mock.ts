/**
 * v1.5 Agent Zone — 假数据模型
 *
 * 供 features/v1-5/ 下的组件直接 import：
 *   - SkillMarketplace 消费 SKILL_MARKET
 *   - AgentZoneGraph 消费 AGENT_ZONE_MOCK
 *   - CreditDashboard 消费 CREDIT_DASHBOARD_MOCK
 *
 * 所有数字、名字、描述都是 mock。展示一个"已经在跑"的 Agent 的截面快照。
 * 迁移到 src/ 时路径：src/components/features/v1-5/data/mock.ts
 */

// ============================================================================
// § Skill Marketplace — 14 张 Skill 卡
// ============================================================================

export type SkillCategory = 'info' | 'trade' | 'strategy' | 'onchain' | 'ai';

export interface SkillCardMock {
  readonly id: string;
  readonly category: SkillCategory;
  readonly name: string;                // 直接用，不走 i18n（v1.5 是 Deep A mock，内容小）
  readonly nameEn: string;
  readonly desc: string;                // 一句话描述
  readonly descEn: string;
  readonly provider: string;            // "CoinW 官方" / "社区开发者" / "Alpha Lab" ...
  readonly stats: {
    readonly calls7d: number;
    readonly rating: number;            // 0-5
    readonly creditCost: number;        // 每次调用消耗
  };
  readonly loaded: boolean;             // 当前 Agent 是否已挂载
}

export const SKILL_MARKET: readonly SkillCardMock[] = [
  // --- info (4) ---
  {
    id: 'sk-market-data',
    category: 'info',
    name: '实时行情',
    nameEn: 'Live Market Data',
    desc: '全币种价格、K 线、深度、成交',
    descEn: 'Full-coin quotes, K-lines, depth, trades',
    provider: 'CoinW 官方',
    stats: { calls7d: 1842, rating: 4.9, creditCost: 1 },
    loaded: true,
  },
  {
    id: 'sk-market-overview',
    category: 'info',
    name: '市场概览',
    nameEn: 'Market Overview',
    desc: '热门币种、资金流向、板块轮动',
    descEn: 'Hot coins, fund flows, sector rotation',
    provider: 'CoinW 官方',
    stats: { calls7d: 612, rating: 4.7, creditCost: 2 },
    loaded: true,
  },
  {
    id: 'sk-news-feed',
    category: 'info',
    name: '新闻聚合',
    nameEn: 'News Feed',
    desc: '多源加密新闻 + 事件日历',
    descEn: 'Multi-source crypto news + event calendar',
    provider: '社区 · AlphaBot',
    stats: { calls7d: 204, rating: 4.3, creditCost: 1 },
    loaded: false,
  },
  {
    id: 'sk-announcements',
    category: 'info',
    name: '交易所公告',
    nameEn: 'Exchange Announcements',
    desc: '上币、维护、规则变更',
    descEn: 'Listings, maintenance, rule changes',
    provider: 'CoinW 官方',
    stats: { calls7d: 156, rating: 4.5, creditCost: 1 },
    loaded: true,
  },

  // --- trade (3) ---
  {
    id: 'sk-spot-order',
    category: 'trade',
    name: '现货下单',
    nameEn: 'Spot Order',
    desc: '限价市价下单、撤单、订单查询',
    descEn: 'Limit/market orders, cancel, query',
    provider: 'CoinW 官方',
    stats: { calls7d: 318, rating: 4.8, creditCost: 3 },
    loaded: true,
  },
  {
    id: 'sk-futures-order',
    category: 'trade',
    name: '合约下单',
    nameEn: 'Futures Order',
    desc: '合约限价市价、止盈止损',
    descEn: 'Futures limit/market, TP/SL',
    provider: 'CoinW 官方',
    stats: { calls7d: 224, rating: 4.7, creditCost: 4 },
    loaded: true,
  },
  {
    id: 'sk-portfolio',
    category: 'trade',
    name: '持仓总览',
    nameEn: 'Portfolio Overview',
    desc: '全钱包持仓 + 盈亏分析',
    descEn: 'All-wallet holdings + PnL analysis',
    provider: 'CoinW 官方',
    stats: { calls7d: 489, rating: 4.9, creditCost: 1 },
    loaded: true,
  },

  // --- strategy (3) ---
  {
    id: 'sk-grid-bot',
    category: 'strategy',
    name: '网格策略',
    nameEn: 'Grid Bot',
    desc: '震荡行情自动高抛低吸',
    descEn: 'Range-bound auto buy-low sell-high',
    provider: '社区 · Alpha Lab',
    stats: { calls7d: 147, rating: 4.4, creditCost: 5 },
    loaded: true,
  },
  {
    id: 'sk-dca',
    category: 'strategy',
    name: '定投策略',
    nameEn: 'DCA Strategy',
    desc: '按计划分批建仓，长期积累',
    descEn: 'Scheduled averaging-in for long-term accumulation',
    provider: '社区 · Alpha Lab',
    stats: { calls7d: 92, rating: 4.5, creditCost: 2 },
    loaded: false,
  },
  {
    id: 'sk-signal-follow',
    category: 'strategy',
    name: '信号跟单',
    nameEn: 'Signal Follow',
    desc: '订阅聪明钱信号自动执行',
    descEn: 'Subscribe to smart-money signals, auto-execute',
    provider: '社区 · SmartMoney Pro',
    stats: { calls7d: 76, rating: 4.2, creditCost: 6 },
    loaded: false,
  },

  // --- onchain (2) ---
  {
    id: 'sk-whale-tracker',
    category: 'onchain',
    name: '巨鲸追踪',
    nameEn: 'Whale Tracker',
    desc: '大额链上转账 + 交易所资金流',
    descEn: 'Large on-chain transfers + exchange flows',
    provider: '社区 · ChainSight',
    stats: { calls7d: 183, rating: 4.6, creditCost: 3 },
    loaded: true,
  },
  {
    id: 'sk-defi-yield',
    category: 'onchain',
    name: 'DeFi 收益',
    nameEn: 'DeFi Yield Scanner',
    desc: '扫描全链 LP / 借贷收益',
    descEn: 'Scan cross-chain LP and lending yields',
    provider: '社区 · YieldLens',
    stats: { calls7d: 58, rating: 4.1, creditCost: 4 },
    loaded: false,
  },

  // --- ai (2) ---
  {
    id: 'sk-report-writer',
    category: 'ai',
    name: '日报生成',
    nameEn: 'Daily Report',
    desc: 'AI 汇总行情 + 链上 + 新闻生成日报',
    descEn: 'AI-composed daily digest: market + chain + news',
    provider: 'CoinW 官方',
    stats: { calls7d: 127, rating: 4.8, creditCost: 5 },
    loaded: true,
  },
  {
    id: 'sk-risk-analyzer',
    category: 'ai',
    name: '风险分析',
    nameEn: 'Risk Analyzer',
    desc: 'AI 分析仓位风险 + 相关性',
    descEn: 'AI analysis of position risk and correlations',
    provider: 'CoinW 官方',
    stats: { calls7d: 89, rating: 4.6, creditCost: 4 },
    loaded: true,
  },
];

// ============================================================================
// § Agent Zone — 中心 Agent 节点图
// ============================================================================

export interface AgentZoneNode {
  readonly id: string;
  readonly label: string;             // "实时行情"
  readonly labelEn: string;
  readonly kind: 'center' | 'orbit';
  readonly skillId?: string;          // 对应 SKILL_MARKET.id
  readonly angle?: number;            // 0-360 度，center 时不填
  readonly radius?: number;           // px，center 时不填
  readonly pulse?: boolean;           // 是否正在调用
}

/**
 * 极坐标布局：中心 Agent 节点 + 12 个已挂载 Skill 节点围绕
 * 节点位置用 angle+radius 计算，SVG 渲染时换算成 (cx, cy)
 */
export const AGENT_ZONE_MOCK: {
  readonly center: AgentZoneNode;
  readonly orbit: readonly AgentZoneNode[];
  readonly activeConnections: readonly { from: string; to: string; intensity: number }[];
} = {
  center: {
    id: 'agent-core',
    label: 'Alpha Agent',
    labelEn: 'Alpha Agent',
    kind: 'center',
  },
  orbit: [
    { id: 'n1',  skillId: 'sk-market-data',      kind:'orbit', label:'实时行情',   labelEn:'Market Data',    angle: 0,   radius: 220, pulse: true },
    { id: 'n2',  skillId: 'sk-market-overview',  kind:'orbit', label:'市场概览',   labelEn:'Overview',       angle: 30,  radius: 220 },
    { id: 'n3',  skillId: 'sk-announcements',    kind:'orbit', label:'公告',       labelEn:'Announcements',  angle: 60,  radius: 220 },
    { id: 'n4',  skillId: 'sk-spot-order',       kind:'orbit', label:'现货下单',   labelEn:'Spot Order',     angle: 90,  radius: 220, pulse: true },
    { id: 'n5',  skillId: 'sk-futures-order',    kind:'orbit', label:'合约下单',   labelEn:'Futures',        angle: 120, radius: 220 },
    { id: 'n6',  skillId: 'sk-portfolio',        kind:'orbit', label:'持仓',       labelEn:'Portfolio',      angle: 150, radius: 220 },
    { id: 'n7',  skillId: 'sk-grid-bot',         kind:'orbit', label:'网格',       labelEn:'Grid Bot',       angle: 180, radius: 220 },
    { id: 'n8',  skillId: 'sk-whale-tracker',    kind:'orbit', label:'巨鲸追踪',   labelEn:'Whale Tracker',  angle: 210, radius: 220, pulse: true },
    { id: 'n9',  skillId: 'sk-report-writer',    kind:'orbit', label:'日报',       labelEn:'Daily Report',   angle: 240, radius: 220 },
    { id: 'n10', skillId: 'sk-risk-analyzer',    kind:'orbit', label:'风险分析',   labelEn:'Risk Analyzer',  angle: 270, radius: 220 },
    { id: 'n11', skillId: 'sk-market-data',      kind:'orbit', label:'+ 更多',     labelEn:'+ More',         angle: 300, radius: 220 },
    { id: 'n12', skillId: 'sk-market-data',      kind:'orbit', label:'+',          labelEn:'+',              angle: 330, radius: 220 },
  ],
  // 当前"亮"着的调用连线 — 动画上从中心流向目标节点
  activeConnections: [
    { from: 'agent-core', to: 'n1', intensity: 0.9 },   // 强调用
    { from: 'agent-core', to: 'n4', intensity: 0.7 },
    { from: 'agent-core', to: 'n8', intensity: 0.5 },
  ],
};

// ============================================================================
// § Credit Dashboard — Credit 经济假数据
// ============================================================================

export interface CreditMetric {
  readonly label: string;
  readonly labelEn: string;
  readonly value: string;
  readonly trend?: '+' | '-' | 'flat';
  readonly delta?: string;            // "+12%"
}

export const CREDIT_DASHBOARD_MOCK: {
  readonly headline: { valueZh: string; valueEn: string; unit: string };
  readonly metrics: readonly CreditMetric[];
  readonly miniChart: {
    readonly label: string;
    readonly labelEn: string;
    readonly points: readonly number[];   // 7 天调用量
  };
} = {
  headline: {
    valueZh: '18,900',
    valueEn: '18,900',
    unit: 'Credit',
  },
  metrics: [
    { label:'已装载 Skills', labelEn:'Skills loaded',    value:'12',       trend:'+', delta:'+2' },
    { label:'7 日调用',      labelEn:'7-day calls',      value:'3,472',    trend:'+', delta:'+18%' },
    { label:'Credit 余额',   labelEn:'Credit balance',   value:'18,900',   trend:'-', delta:'-432' },
    { label:'累积收益',      labelEn:'Cumulative PnL',   value:'+$4,127',  trend:'+', delta:'+$312' },
  ],
  miniChart: {
    label: '7 日调用趋势',
    labelEn: '7-day call trend',
    points: [412, 438, 509, 476, 621, 598, 418],
  },
};

// ============================================================================
// § 筛选器配置（供 SkillMarketplace 的 tabs 使用）
// ============================================================================

export const SKILL_FILTERS: readonly {
  readonly id: 'all' | SkillCategory;
  readonly labelZh: string;
  readonly labelEn: string;
}[] = [
  { id:'all',      labelZh:'全部',   labelEn:'All'      },
  { id:'info',     labelZh:'信息',   labelEn:'Info'     },
  { id:'trade',    labelZh:'交易',   labelEn:'Trade'    },
  { id:'strategy', labelZh:'策略',   labelEn:'Strategy' },
  { id:'onchain',  labelZh:'链上',   labelEn:'On-chain' },
  { id:'ai',       labelZh:'AI',     labelEn:'AI'       },
];

// ============================================================================
// § 统计小助手
// ============================================================================

export const SKILL_MARKET_STATS = {
  total:       SKILL_MARKET.length,
  loaded:      SKILL_MARKET.filter(s => s.loaded).length,
  byCategory:  {
    info:     SKILL_MARKET.filter(s => s.category === 'info').length,
    trade:    SKILL_MARKET.filter(s => s.category === 'trade').length,
    strategy: SKILL_MARKET.filter(s => s.category === 'strategy').length,
    onchain:  SKILL_MARKET.filter(s => s.category === 'onchain').length,
    ai:       SKILL_MARKET.filter(s => s.category === 'ai').length,
  },
} as const;
