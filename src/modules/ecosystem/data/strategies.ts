export type StrategyCategory = 'spot' | 'futures' | 'arbitrage' | 'signal' | 'risk';

export interface StrategyVersion {
  version: string;
  releasedAt: string;
  winRateIndex: number;
  changelog: string;
  changelogEn: string;
}

export interface Strategy {
  id: string;
  name: string;
  nameEn: string;
  category: StrategyCategory;
  winRateIndex: number;         // 0-100
  realTrades: number;
  cumulativePnL: number;        // USDT
  contributor: {
    id: string;
    name: string;
    verified: boolean;
  };
  versions: StrategyVersion[];
  status: 'active' | 'trending' | 'at-risk' | 'deprecated';
  desc: string;
  descEn: string;
}

export const STRATEGIES: Strategy[] = [
  {
    id: 'btc-breakout-v2',
    name: 'BTC 突破追踪',
    nameEn: 'BTC Breakout Tracker',
    category: 'spot',
    winRateIndex: 82,
    realTrades: 1240,
    cumulativePnL: 48200,
    contributor: { id: 'c1', name: 'alpha_quant', verified: true },
    status: 'trending',
    desc: '识别 BTC 关键阻力位突破，追踪后续趋势，支持止盈止损自动设置。',
    descEn: 'Identifies BTC key resistance breakouts, tracks subsequent trend with automatic TP/SL.',
    versions: [
      { version: 'v1.0', releasedAt: '2026-01-10', winRateIndex: 64, changelog: '初始版本，基础突破判断', changelogEn: 'Initial release, basic breakout detection' },
      { version: 'v1.1', releasedAt: '2026-02-05', winRateIndex: 74, changelog: '加入成交量过滤，减少假突破', changelogEn: 'Added volume filter, fewer false breakouts' },
      { version: 'v2.0', releasedAt: '2026-03-18', winRateIndex: 82, changelog: '引入多时间框架确认，胜率大幅提升', changelogEn: 'Multi-timeframe confirmation, major win rate boost' },
    ],
  },
  {
    id: 'eth-funding-arb',
    name: 'ETH 资金费率套利',
    nameEn: 'ETH Funding Arbitrage',
    category: 'arbitrage',
    winRateIndex: 76,
    realTrades: 843,
    cumulativePnL: 31500,
    contributor: { id: 'c2', name: 'arb_master', verified: true },
    status: 'active',
    desc: '监控 ETH 现货-永续溢价，资金费率超阈值时自动对冲套利。',
    descEn: 'Monitors ETH spot-perp premium, auto hedges when funding rate exceeds threshold.',
    versions: [
      { version: 'v1.0', releasedAt: '2026-01-20', winRateIndex: 68, changelog: '基础版资金费率监控', changelogEn: 'Basic funding rate monitor' },
      { version: 'v1.1', releasedAt: '2026-02-28', winRateIndex: 76, changelog: '动态阈值调整，提高套利频率', changelogEn: 'Dynamic threshold, higher arbitrage frequency' },
    ],
  },
  {
    id: 'altcoin-momentum',
    name: '山寨币动量信号',
    nameEn: 'Altcoin Momentum',
    category: 'signal',
    winRateIndex: 61,
    realTrades: 2180,
    cumulativePnL: 19800,
    contributor: { id: 'c3', name: 'signal_lab', verified: false },
    status: 'active',
    desc: '扫描全市场山寨币 24h 相对强弱，过滤低流动性标的后给出做多信号。',
    descEn: 'Scans all alts for 24h relative strength, filters low-liquidity assets before signaling long.',
    versions: [
      { version: 'v1.0', releasedAt: '2026-02-01', winRateIndex: 54, changelog: '初始信号筛选', changelogEn: 'Initial signal filter' },
      { version: 'v1.1', releasedAt: '2026-03-10', winRateIndex: 61, changelog: '加入 BTC 主导率过滤条件', changelogEn: 'Added BTC dominance filter' },
    ],
  },
  {
    id: 'liquidation-hunter',
    name: '爆仓追踪器',
    nameEn: 'Liquidation Hunter',
    category: 'futures',
    winRateIndex: 38,
    realTrades: 567,
    cumulativePnL: -3200,
    contributor: { id: 'c4', name: 'degen_trader', verified: false },
    status: 'at-risk',
    desc: '追踪大额爆仓事件，判断短期方向性机会。胜率走低，建议等待下一版本。',
    descEn: 'Tracks large liquidation events for short-term directional plays. Win rate declining — await next version.',
    versions: [
      { version: 'v1.0', releasedAt: '2026-01-15', winRateIndex: 58, changelog: '初始版本', changelogEn: 'Initial release' },
      { version: 'v1.1', releasedAt: '2026-02-20', winRateIndex: 45, changelog: '调整触发条件，效果下降', changelogEn: 'Adjusted trigger, worse performance' },
      { version: 'v1.2', releasedAt: '2026-03-30', winRateIndex: 38, changelog: '持续走低，进入汰换观察期', changelogEn: 'Declining further, entering tune-out watchlist' },
    ],
  },
  {
    id: 'volatility-guard',
    name: '波动率护盾',
    nameEn: 'Volatility Guard',
    category: 'risk',
    winRateIndex: 88,
    realTrades: 3410,
    cumulativePnL: 67400,
    contributor: { id: 'c5', name: 'risk_quant', verified: true },
    status: 'active',
    desc: '实时监控持仓波动率，超阈值自动减仓或对冲，是其他策略的风控底座。',
    descEn: 'Real-time position volatility monitor. Auto reduces or hedges when threshold exceeded — the risk foundation for other strategies.',
    versions: [
      { version: 'v1.0', releasedAt: '2025-11-01', winRateIndex: 79, changelog: '基础波动率监控', changelogEn: 'Basic volatility monitoring' },
      { version: 'v2.0', releasedAt: '2026-01-15', winRateIndex: 88, changelog: '多资产组合波动率，引入 Kelly 仓位', changelogEn: 'Multi-asset portfolio vol + Kelly sizing' },
    ],
  },
  {
    id: 'grid-btc-usdt',
    name: 'BTC/USDT 网格',
    nameEn: 'BTC/USDT Grid',
    category: 'spot',
    winRateIndex: 71,
    realTrades: 5620,
    cumulativePnL: 28900,
    contributor: { id: 'c6', name: 'grid_pro', verified: true },
    status: 'active',
    desc: '区间震荡网格，自动设定 ±5% 网格，震荡收益稳定。突破后自动暂停。',
    descEn: 'Range grid at ±5%, auto-pauses on breakout. Consistent returns in ranging markets.',
    versions: [
      { version: 'v1.0', releasedAt: '2025-12-01', winRateIndex: 65, changelog: '固定网格间距', changelogEn: 'Fixed grid spacing' },
      { version: 'v1.1', releasedAt: '2026-02-10', winRateIndex: 71, changelog: '动态间距 + 自动暂停机制', changelogEn: 'Dynamic spacing + auto-pause' },
    ],
  },
];
