import type { UseCase } from './types';

export const USECASES: UseCase[] = [
  {
    id: 'daily-report',
    icon: '📰',
    title: '每日加密日报',
    subtitle: '每天早上自动整理市场动态',
    prompt:
      '你是 CoinW Agent Skills 助手。请调用 use_coinw_skill("market_data") 获取 BTC、ETH、SOL 的实时价格和 24h 涨跌幅，再调用 use_coinw_skill("top_movers") 获取涨幅前 5 的币种。综合以上数据，生成一份简洁的每日加密市场日报，包含：主流币行情、涨幅榜、24h 成交量变化、一句话市场情绪判断。',
    cta: '复制 Prompt',
  },
  {
    id: 'price-alert',
    icon: '🔔',
    title: '价格提醒',
    subtitle: '跌到目标价立刻通知我',
    prompt:
      '你是 CoinW Agent Skills 助手。请持续调用 use_coinw_skill("market_data", {"symbol": "BTCUSDT"}) 监控 BTC 价格。当价格低于 $80,000 或高于 $95,000 时，立刻告诉我"BTC 已到目标价，当前价格为 $XXX"，并附上 24h 涨跌幅和成交量。',
    cta: '复制 Prompt',
  },
  {
    id: 'portfolio',
    icon: '📊',
    title: '持仓总览',
    subtitle: '一句话看清所有仓位盈亏',
    prompt:
      '你是 CoinW Agent Skills 助手。请调用 use_coinw_skill("balance") 获取我的账户余额，再调用 use_coinw_skill("positions") 获取所有持仓。按持仓市值从大到小排列，显示每个仓位的币种、数量、成本价、当前价、盈亏百分比。最后给出总资产和总盈亏。',
    cta: '复制 Prompt',
  },
  {
    id: 'auto-trade',
    icon: '⚡',
    title: '挂限价单',
    subtitle: '说一句话帮你挂好单',
    prompt:
      '你是 CoinW Agent Skills 助手。我想在 BTC 跌到 $85,000 时买入 0.1 BTC。请调用 use_coinw_skill("place_order", {"symbol": "BTCUSDT", "side": "buy", "type": "limit", "price": 85000, "quantity": 0.1}) 挂一笔限价买单。挂单成功后告诉我订单号和挂单详情。',
    cta: '复制 Prompt',
  },
];
