/**
 * Claw 42 API Type Definitions
 * Auto-aligned with database schema v1.0 / v1.1 / v1.2
 * Source: agentx-architecture.md
 *
 * DO NOT put runtime logic in this file — types only.
 */

// === Enums ===

export type UserTier = 'free' | 'pro' | 'enterprise';
export type Exchange = 'coinw';
export type AgentType = 'basic' | 'external';
export type StrategyType = 'grid' | 'dca' | 'momentum' | 'custom';
export type AgentStatus = 'stopped' | 'running' | 'paused' | 'error';
export type TradeSide = 'buy' | 'sell';
export type OrderType = 'market' | 'limit';
export type TradeStatus = 'filled' | 'partial' | 'cancelled' | 'rejected';
export type RiskRuleType = 'platform' | 'user';
export type RiskAction = 'rejected' | 'paused_agent';
export type RankingPeriod = '7d' | '30d' | 'all';
export type CompetitionStatus = 'upcoming' | 'active' | 'ended';
export type PositionSide = 'long' | 'short';
export type StrategyCategory =
  | 'grid'
  | 'trend'
  | 'arbitrage'
  | 'dca'
  | 'momentum'
  | 'custom';
export type PriceModel = 'free' | 'subscription' | 'profit_share';
export type StrategyStatus = 'draft' | 'review' | 'listed' | 'delisted';
export type RevenueShareStatus = 'pending' | 'paid';
export type StrategyConfigFieldType = 'number' | 'string' | 'boolean' | 'select';

// === Core Entities (V1.0) ===

export interface UserProfile {
  id: string;
  display_name: string;
  avatar_url: string;
  tier: UserTier;
  created_at: string;
}

export interface ApiKeyPermissions {
  spot: boolean;
  futures: boolean;
  withdraw: boolean;
}

export interface ApiKey {
  id: string;
  user_id: string;
  exchange: Exchange;
  label: string;
  permissions: ApiKeyPermissions;
  is_active: boolean;
  created_at: string;
}

export interface UserRiskConfig {
  max_order_size?: number;
  max_position?: number;
  max_daily_trades?: number;
  allowed_symbols?: string[];
}

export interface Agent {
  id: string;
  user_id: string;
  api_key_id: string;
  type: AgentType;
  name: string;
  strategy_type: StrategyType;
  config: Record<string, unknown>;
  risk_config: UserRiskConfig;
  status: AgentStatus;
  error_msg: string;
  last_heartbeat: string;
  created_at: string;
  updated_at: string;
}

export interface Trade {
  id: string;
  agent_id: string;
  symbol: string;
  side: TradeSide;
  order_type: OrderType;
  price: number;
  quantity: number;
  fee: number;
  realized_pnl: number;
  exchange_order_id: string;
  status: TradeStatus;
  reasoning: string;
  executed_at: string;
  created_at: string;
}

export interface AgentSnapshot {
  id: number;
  agent_id: string;
  equity: number;
  drawdown: number;
  open_positions: number;
  unrealized_pnl: number;
  snapshot_at: string;
}

export interface RiskEvent {
  id: string;
  agent_id: string;
  rule_type: RiskRuleType;
  rule_name: string;
  signal: TradeSignal;
  action: RiskAction;
  created_at: string;
}

// === Arena (V1.1) ===

export interface Ranking {
  agent_id: string;
  period: RankingPeriod;
  return_pct: number;
  sharpe: number;
  max_drawdown: number;
  win_rate: number;
  profit_factor: number;
  trade_count: number;
  rank: number;
  updated_at: string;
}

export interface CompetitionRules {
  min_trades: number;
  allowed_symbols?: string[];
  max_leverage?: number;
}

export interface PrizePool {
  total: number;
  currency: string;
  distribution: Record<number, number>;
}

export interface Competition {
  id: string;
  name: string;
  description: string;
  rules: CompetitionRules;
  prize_pool: PrizePool;
  start_at: string;
  end_at: string;
  status: CompetitionStatus;
  created_at: string;
}

export interface CompetitionEntry {
  competition_id: string;
  agent_id: string;
  final_rank: number;
  final_pnl: number;
  joined_at: string;
}

export interface AgentTokenScopes {
  submit_order: boolean;
  read_market: boolean;
}

export interface AgentToken {
  id: string;
  agent_id: string;
  scopes: AgentTokenScopes;
  expires_at: string;
  is_active: boolean;
  created_at: string;
}

// === Marketplace (V1.2) ===

export interface StrategyConfigField {
  name: string;
  type: StrategyConfigFieldType;
  default: unknown;
  min?: number;
  max?: number;
  options?: string[];
  description?: string;
}

export interface StrategyConfigTemplate {
  fields: StrategyConfigField[];
}

export interface Strategy {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  category: StrategyCategory;
  config_template: StrategyConfigTemplate;
  price_model: PriceModel;
  price_amount: number;
  profit_share_pct: number;
  backtest_data: Record<string, unknown>;
  status: StrategyStatus;
  deploy_count: number;
  avg_return: number;
  created_at: string;
  updated_at: string;
}

export interface StrategyDeploy {
  id: string;
  strategy_id: string;
  user_id: string;
  agent_id: string;
  deployed_at: string;
  stopped_at: string;
}

export interface RevenueShare {
  id: string;
  strategy_id: string;
  deploy_id: string;
  period_start: string;
  period_end: string;
  gross_profit: number;
  creator_share: number;
  platform_share: number;
  status: RevenueShareStatus;
  created_at: string;
}

// === Trading / SDK ===

export interface TradeSignal {
  agent_id: string;
  symbol: string;
  side: TradeSide;
  type: OrderType;
  quantity: number;
  price?: number;
  stop_loss?: number;
  take_profit?: number;
  reasoning?: string;
}

export interface Balance {
  asset: string;
  free: number;
  locked: number;
}

export interface Position {
  symbol: string;
  side: PositionSide;
  size: number;
  entry_price: number;
  mark_price: number;
  unrealized_pnl: number;
  leverage: number;
}

export interface OrderRequest {
  symbol: string;
  side: TradeSide;
  type: OrderType;
  quantity: number;
  price?: number;
  stop_loss?: number;
  take_profit?: number;
  client_order_id?: string;
}

export interface OrderResult {
  order_id: string;
  client_order_id?: string;
  status: TradeStatus;
  filled_quantity: number;
  filled_price: number;
}

export interface Ticker {
  symbol: string;
  price: number;
  volume24h: number;
  change24h: number;
  high24h: number;
  low24h: number;
  timestamp: string;
}

export interface Kline {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: string;
}

export interface DepthLevel {
  price: number;
  quantity: number;
}

export interface OrderBook {
  symbol: string;
  bids: DepthLevel[];
  asks: DepthLevel[];
  timestamp: string;
}

export interface DecryptedKey {
  key: string;
  secret: string;
  passphrase?: string;
}

export interface OrderStatus extends OrderResult {
  symbol: string;
  side: TradeSide;
  type: OrderType;
  quantity: number;
  price?: number;
  created_at?: string;
  updated_at?: string;
}

export type TickerCallback = (ticker: Ticker) => void;
export type DepthCallback = (orderBook: OrderBook) => void;
export type Unsubscribe = () => void;

export interface ExchangeAdapter {
  getBalance(apiKey: DecryptedKey): Promise<Balance[]>;
  getPositions(apiKey: DecryptedKey): Promise<Position[]>;
  placeOrder(apiKey: DecryptedKey, order: OrderRequest): Promise<OrderResult>;
  cancelOrder(apiKey: DecryptedKey, orderId: string): Promise<void>;
  getOrder(apiKey: DecryptedKey, orderId: string): Promise<OrderStatus>;
  subscribeTicker(symbols: string[], cb: TickerCallback): Unsubscribe;
  subscribeDepth(symbol: string, cb: DepthCallback): Unsubscribe;
  getKlines(symbol: string, interval: string, limit: number): Promise<Kline[]>;
}

// === API Request/Response ===

export interface ApiError {
  code: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PaginatedResponse<T>
  extends ApiResponse<{
    items: T[];
    total: number;
    page: number;
    page_size: number;
  }> {}
