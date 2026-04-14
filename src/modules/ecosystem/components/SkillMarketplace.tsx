'use client';

import { useState } from 'react';
import { Star, Download, Search } from 'lucide-react';
import { useT } from '@/i18n/LocaleContext';

type Category = 'all' | 'info' | 'trade' | 'analysis' | 'strategy';

interface SkillCard {
  id: string;
  name: string;
  nameEn: string;
  author: string;
  rating: number;
  installs: number;
  desc: string;
  descEn: string;
  category: Exclude<Category, 'all'>;
  badge?: 'new' | 'hot' | 'official';
}

const SKILLS: SkillCard[] = [
  // Info
  { id: 's1', name: '实时行情聚合', nameEn: 'Realtime Quote Aggregator', author: 'CoinW Official', rating: 4.9, installs: 18400, desc: '聚合 BTC/ETH/SOL 等主流币实时报价、深度、K线', descEn: 'Aggregate real-time quotes, depth and K-lines for major coins', category: 'info', badge: 'official' },
  { id: 's2', name: '市场热点雷达', nameEn: 'Trend Radar', author: 'AlphaLab', rating: 4.7, installs: 9300, desc: '扫描 Twitter/Reddit/链上数据，找出潜在热点', descEn: 'Scans Twitter/Reddit/on-chain to surface trending narratives', category: 'info', badge: 'hot' },
  { id: 's3', name: '交易所公告追踪', nameEn: 'Announcement Tracker', author: 'CoinW Official', rating: 4.8, installs: 12600, desc: '各大交易所新币上线/下线/维护公告实时推送', descEn: 'Real-time push for listing/delisting/maintenance announcements', category: 'info', badge: 'official' },
  { id: 's4', name: '链上巨鲸追踪', nameEn: 'On-chain Whale Watcher', author: 'ChainScope', rating: 4.6, installs: 7200, desc: '监控大额转账、交易所净流入、巨鲸地址动向', descEn: 'Monitor large transfers, exchange net flows and whale addresses', category: 'info' },
  // Trade
  { id: 's5', name: '一键下单引擎', nameEn: 'Quick Order Engine', author: 'CoinW Official', rating: 4.9, installs: 22100, desc: '现货/合约/限价/市价，统一接口一句话下单', descEn: 'Unified one-liner interface for spot/futures/limit/market orders', category: 'trade', badge: 'official' },
  { id: 's6', name: '网格交易机器人', nameEn: 'Grid Bot', author: 'QuantForge', rating: 4.5, installs: 6800, desc: '自动在价格区间内挂单，震荡行情高频获利', descEn: 'Auto-places orders in a price band to profit from sideways markets', category: 'trade', badge: 'new' },
  { id: 's7', name: '止盈止损自动化', nameEn: 'TP/SL Automation', author: 'SafeBot Labs', rating: 4.7, installs: 11200, desc: '设置目标价，Agent 自动触发市价平仓', descEn: 'Set target price; agent auto-triggers market close', category: 'trade' },
  { id: 's8', name: '跨所套利侦测', nameEn: 'Cross-Exchange Arbitrage', author: 'ArbiScan', rating: 4.4, installs: 3900, desc: '实时计算 CoinW/Binance/OKX 价差套利机会', descEn: 'Live arbitrage opportunity detection across major exchanges', category: 'trade' },
  // Analysis
  { id: 's9', name: 'AI 日报生成器', nameEn: 'AI Daily Report', author: 'CoinW Official', rating: 4.9, installs: 19500, desc: '每天 9:00 自动生成结构化市场日报并推送', descEn: 'Auto-generates structured daily market brief at 9AM', category: 'analysis', badge: 'official' },
  { id: 's10', name: '技术面分析助手', nameEn: 'Technical Analyst', author: 'ChartMind', rating: 4.6, installs: 8700, desc: 'RSI/MACD/布林带信号自动解读，给出买卖参考', descEn: 'Auto-interprets RSI/MACD/Bollinger signals with trade suggestions', category: 'analysis', badge: 'hot' },
  { id: 's11', name: '恐惧贪婪仪表盘', nameEn: 'Fear & Greed Dashboard', author: 'SentimentAI', rating: 4.5, installs: 5100, desc: '聚合链上、社交媒体、期权数据的综合情绪指数', descEn: 'Composite sentiment index from on-chain, social and options data', category: 'analysis' },
  { id: 's12', name: '持仓收益归因', nameEn: 'Portfolio Attribution', author: 'RiskLens', rating: 4.3, installs: 2800, desc: '将账户盈亏分解到每笔决策和每个 Skill 的贡献', descEn: 'Decomposes portfolio PnL by each decision and skill contribution', category: 'analysis', badge: 'new' },
  // Strategy
  { id: 's13', name: '趋势跟踪策略包', nameEn: 'Trend Following Pack', author: 'QuantForge', rating: 4.7, installs: 7600, desc: '均线交叉 + 动量过滤 + 仓位管理三合一', descEn: 'MA crossover + momentum filter + position sizing in one pack', category: 'strategy' },
  { id: 's14', name: '高频新闻交易', nameEn: 'News Scalper', author: 'AlphaLab', rating: 4.2, installs: 4400, desc: '解析重大新闻，100ms 内完成信号→下单全链路', descEn: 'Parses breaking news and completes signal-to-order in <100ms', category: 'strategy', badge: 'hot' },
  { id: 's15', name: '流动性挖矿助手', nameEn: 'Liquidity Mining Helper', author: 'DefiKit', rating: 4.4, installs: 3200, desc: '监控 AMM 池 APY，一键跨链复投最高收益池', descEn: 'Monitors AMM APYs and auto-reinvests into highest-yield pools', category: 'strategy', badge: 'new' },
  { id: 's16', name: '期权保险策略', nameEn: 'Options Insurance', author: 'RiskLens', rating: 4.6, installs: 5900, desc: '持仓自动买入保护性期权，对冲极端行情风险', descEn: 'Auto-buys protective options to hedge against extreme moves', category: 'strategy' },
];

const CAT_LABELS: Record<Category, { zh: string; en: string }> = {
  all: { zh: '全部', en: 'All' },
  info: { zh: '信息', en: 'Info' },
  trade: { zh: '交易', en: 'Trade' },
  analysis: { zh: '分析', en: 'Analysis' },
  strategy: { zh: '策略', en: 'Strategy' },
};

const BADGE_STYLES: Record<string, string> = {
  official: 'bg-brand text-white',
  hot: 'bg-red-100 text-red-700',
  new: 'bg-green-100 text-green-700',
};

const BADGE_LABELS: Record<string, { zh: string; en: string }> = {
  official: { zh: '官方', en: 'Official' },
  hot: { zh: '热门', en: 'Hot' },
  new: { zh: '新上线', en: 'New' },
};

function stars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
}

export function SkillMarketplace() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const [cat, setCat] = useState<Category>('all');
  const [query, setQuery] = useState('');
  const [installed, setInstalled] = useState<Set<string>>(new Set());

  const filtered = SKILLS.filter((s) => {
    if (cat !== 'all' && s.category !== cat) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  function toggle(id: string) {
    setInstalled((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CAT_LABELS) as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                cat === c
                  ? 'bg-brand text-white'
                  : 'border border-border bg-white text-muted hover:border-brand hover:text-brand'
              }`}
            >
              {isZh ? CAT_LABELS[c].zh : CAT_LABELS[c].en}
            </button>
          ))}
        </div>
        {/* Search */}
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isZh ? '搜索 Skills...' : 'Search skills...'}
            className="rounded-xl border border-border pl-8 pr-3 py-2 text-xs text-ink focus:border-brand focus:outline-none w-48"
          />
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex gap-4 text-xs text-muted">
        <span>{filtered.length} {isZh ? '项' : 'skills'}</span>
        <span>·</span>
        <span className="text-green-600 font-medium">{installed.size} {isZh ? '已安装' : 'installed'}</span>
        <span>·</span>
        <span>{SKILLS.reduce((a, s) => a + s.installs, 0).toLocaleString()} {isZh ? '次总安装' : 'total installs'}</span>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((skill) => {
          const isInstalled = installed.has(skill.id);
          return (
            <div
              key={skill.id}
              className={`group relative rounded-2xl border bg-white p-4 flex flex-col gap-3 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                isInstalled ? 'border-brand/40 bg-brand-soft/20' : 'border-border'
              }`}
            >
              {/* Badge */}
              {skill.badge && (
                <span className={`absolute top-3 right-3 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${BADGE_STYLES[skill.badge]}`}>
                  {isZh ? BADGE_LABELS[skill.badge].zh : BADGE_LABELS[skill.badge].en}
                </span>
              )}

              {/* Name + author */}
              <div>
                <div className="pr-10 text-sm font-semibold text-ink leading-snug">
                  {isZh ? skill.name : skill.nameEn}
                </div>
                <div className="text-[11px] text-muted mt-0.5">{skill.author}</div>
              </div>

              {/* Desc */}
              <p className="text-xs text-muted leading-relaxed flex-1">
                {isZh ? skill.desc : skill.descEn}
              </p>

              {/* Stars + installs */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {stars(skill.rating).map((filled, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${filled ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-muted">{skill.rating}</span>
                <span className="text-[11px] text-muted ml-auto flex items-center gap-0.5">
                  <Download className="h-3 w-3" />
                  {skill.installs >= 10000
                    ? `${(skill.installs / 1000).toFixed(0)}k`
                    : skill.installs.toLocaleString()}
                </span>
              </div>

              {/* Install button */}
              <button
                onClick={() => toggle(skill.id)}
                className={`rounded-xl py-2 text-xs font-semibold transition-colors ${
                  isInstalled
                    ? 'bg-green-50 border border-green-200 text-green-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                    : 'bg-brand-soft text-brand hover:bg-brand hover:text-white'
                }`}
              >
                {isInstalled
                  ? isZh ? '✓ 已安装' : '✓ Installed'
                  : isZh ? '安装' : 'Install'}
              </button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted text-sm">
          {isZh ? '没有匹配的 Skills' : 'No matching skills'}
        </div>
      )}
    </div>
  );
}
