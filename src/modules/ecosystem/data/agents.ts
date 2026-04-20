export type AgentType = 'official' | 'external';

export interface Agent {
  id: string;
  name: string;
  nameEn: string;
  type: AgentType;
  avatar: string;         // emoji
  accent: string;         // hex 颜色，用于头像背景和徽章
  source: string;         // 中文来源描述
  sourceEn: string;
  tagline: string;
  taglineEn: string;
  protocol?: 'MCP' | 'REST' | 'WebSocket';   // 外部 Agent 才有
  metrics: {
    return7d: number;     // 7 日收益率，百分比，如 12.4
    dailyCalls: number;
    followers: number;
  };
}

export const AGENTS: Agent[] = [
  // 官方 Agent（3 个）
  {
    id: 'cwclaw-alpha',
    name: 'Claw 42 Alpha',
    nameEn: 'Claw 42 Alpha',
    type: 'official',
    avatar: '🦞',
    accent: '#5227FF',
    source: 'CoinW 官方',
    sourceEn: 'CoinW Official',
    tagline: '现货 + 合约全能型，激进策略',
    taglineEn: 'Full-stack spot & futures, aggressive style',
    metrics: { return7d: 14.2, dailyCalls: 8420, followers: 3210 },
  },
  {
    id: 'cwclaw-beta',
    name: 'Claw 42 Beta',
    nameEn: 'Claw 42 Beta',
    type: 'official',
    avatar: '🦀',
    accent: '#0EA5E9',
    source: 'CoinW 官方',
    sourceEn: 'CoinW Official',
    tagline: '稳健型，低回撤优先',
    taglineEn: 'Conservative mode, low drawdown priority',
    metrics: { return7d: 6.8, dailyCalls: 5130, followers: 2084 },
  },
  {
    id: 'cwclaw-gamma',
    name: 'Claw 42 Gamma',
    nameEn: 'Claw 42 Gamma',
    type: 'official',
    avatar: '🪸',
    accent: '#10B981',
    source: 'CoinW 官方',
    sourceEn: 'CoinW Official',
    tagline: '套利专家，跨市场信号',
    taglineEn: 'Arbitrage specialist, cross-market signals',
    metrics: { return7d: 9.1, dailyCalls: 3870, followers: 1456 },
  },
  // 外部 Agent（8 个）
  {
    id: 'ext-dex-hunter',
    name: 'DEX Hunter',
    nameEn: 'DEX Hunter',
    type: 'external',
    avatar: '🎯',
    accent: '#F59E0B',
    source: 'AlphaLabs',
    sourceEn: 'AlphaLabs',
    tagline: '去中心化套利机器人，已接入 CoinW Skill',
    taglineEn: 'DEX arbitrage bot, powered by CoinW Skills',
    protocol: 'MCP',
    metrics: { return7d: 11.3, dailyCalls: 6200, followers: 1830 },
  },
  {
    id: 'ext-quant-owl',
    name: 'Quant Owl',
    nameEn: 'Quant Owl',
    type: 'external',
    avatar: '🦉',
    accent: '#8B5CF6',
    source: 'OwlQuant Studio',
    sourceEn: 'OwlQuant Studio',
    tagline: '量化多策略组合，日内波段',
    taglineEn: 'Multi-strategy quant, intraday swing',
    protocol: 'MCP',
    metrics: { return7d: 8.7, dailyCalls: 4510, followers: 1240 },
  },
  {
    id: 'ext-sentinel',
    name: 'Sentinel',
    nameEn: 'Sentinel',
    type: 'external',
    avatar: '🛡️',
    accent: '#EF4444',
    source: 'Sentinel Labs',
    sourceEn: 'Sentinel Labs',
    tagline: '风险哨兵，大户异动预警',
    taglineEn: 'Risk sentinel, whale movement alerts',
    protocol: 'REST',
    metrics: { return7d: 4.2, dailyCalls: 9300, followers: 4120 },
  },
  {
    id: 'ext-moontrader',
    name: 'MoonTrader',
    nameEn: 'MoonTrader',
    type: 'external',
    avatar: '🌙',
    accent: '#6366F1',
    source: 'CryptoMoon',
    sourceEn: 'CryptoMoon',
    tagline: '链上信号聚合，FOMO 捕手',
    taglineEn: 'On-chain signal aggregator, FOMO catcher',
    protocol: 'WebSocket',
    metrics: { return7d: 18.4, dailyCalls: 7820, followers: 5630 },
  },
  {
    id: 'ext-gridbot',
    name: 'GridBot Pro',
    nameEn: 'GridBot Pro',
    type: 'external',
    avatar: '🔲',
    accent: '#14B8A6',
    source: 'GridFi',
    sourceEn: 'GridFi',
    tagline: '网格策略专家，震荡行情首选',
    taglineEn: 'Grid strategy expert, perfect for ranging markets',
    protocol: 'MCP',
    metrics: { return7d: 7.1, dailyCalls: 3200, followers: 890 },
  },
  {
    id: 'ext-shadow',
    name: 'Shadow',
    nameEn: 'Shadow',
    type: 'external',
    avatar: '🕷️',
    accent: '#374151',
    source: 'ShadowFi',
    sourceEn: 'ShadowFi',
    tagline: '暗池信号 + 机构仓位追踪',
    taglineEn: 'Dark pool signals + institutional position tracking',
    protocol: 'REST',
    metrics: { return7d: 15.9, dailyCalls: 5940, followers: 3080 },
  },
  {
    id: 'ext-atlas',
    name: 'Atlas',
    nameEn: 'Atlas',
    type: 'external',
    avatar: '🌐',
    accent: '#0284C7',
    source: 'Atlas Protocol',
    sourceEn: 'Atlas Protocol',
    tagline: '跨所套利 + 多链监控',
    taglineEn: 'Cross-exchange arbitrage + multi-chain monitoring',
    protocol: 'MCP',
    metrics: { return7d: 10.2, dailyCalls: 4870, followers: 1670 },
  },
  {
    id: 'ext-nova',
    name: 'Nova',
    nameEn: 'Nova',
    type: 'external',
    avatar: '⭐',
    accent: '#F97316',
    source: 'NovaTrade AI',
    sourceEn: 'NovaTrade AI',
    tagline: 'AI 趋势预判，60 分钟周期',
    taglineEn: 'AI trend prediction, 60-min cycle',
    protocol: 'WebSocket',
    metrics: { return7d: 13.6, dailyCalls: 6100, followers: 2430 },
  },
];
