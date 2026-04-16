import { NextResponse } from 'next/server';

/**
 * /api/market/snapshot — 聚合实时行情数据
 *
 * 数据源优先级：Binance → OKX → 返回缓存
 * 服务端 15s 缓存，避免频繁请求上游
 * 无需 API Key（Binance/OKX 公开接口）
 */

interface TickerInfo {
  symbol: string;
  price: number;
  change24h: number;
}

interface FundingInfo {
  symbol: string;
  rate: number;
  annualized: number;
}

interface MoverInfo {
  symbol: string;
  change: number;
}

interface MarketSnapshot {
  tickers: TickerInfo[];
  fundingRates: FundingInfo[];
  topGainers: MoverInfo[];
  topLosers: MoverInfo[];
  source: 'binance' | 'okx' | 'cache';
  timestamp: number;
}

// ─── 服务端缓存 ─────────────────────────────────────────────
let cachedSnapshot: MarketSnapshot | null = null;
let cacheTime = 0;
const CACHE_TTL = 15_000; // 15s

// ─── Binance 抓取 ───────────────────────────────────────────
const CORE_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
const BINANCE_TICKER_URL = 'https://api.binance.com/api/v3/ticker/24hr';
const BINANCE_FUNDING_URL = 'https://fapi.binance.com/fapi/v1/premiumIndex';

async function fetchBinanceTickers(): Promise<TickerInfo[]> {
  const resp = await fetch(
    `${BINANCE_TICKER_URL}?symbols=${encodeURIComponent(JSON.stringify(CORE_SYMBOLS))}`,
    { signal: AbortSignal.timeout(4000) }
  );
  if (!resp.ok) throw new Error(`binance ticker ${resp.status}`);
  const data = (await resp.json()) as { symbol: string; lastPrice: string; priceChangePercent: string }[];
  return data.map((d) => ({
    symbol: d.symbol.replace('USDT', ''),
    price: parseFloat(d.lastPrice),
    change24h: parseFloat(d.priceChangePercent),
  }));
}

async function fetchBinanceFunding(): Promise<FundingInfo[]> {
  const resp = await fetch(BINANCE_FUNDING_URL, { signal: AbortSignal.timeout(4000) });
  if (!resp.ok) throw new Error(`binance funding ${resp.status}`);
  const data = (await resp.json()) as { symbol: string; lastFundingRate: string }[];
  return data
    .filter((d) => CORE_SYMBOLS.includes(d.symbol))
    .map((d) => {
      const rate = parseFloat(d.lastFundingRate);
      return {
        symbol: d.symbol.replace('USDT', ''),
        rate,
        annualized: rate * 3 * 365 * 100, // 每8h一次 × 3次/天 × 365天 × 100 = %
      };
    });
}

async function fetchBinanceMovers(): Promise<{ gainers: MoverInfo[]; losers: MoverInfo[] }> {
  const resp = await fetch(BINANCE_TICKER_URL, { signal: AbortSignal.timeout(4000) });
  if (!resp.ok) throw new Error(`binance movers ${resp.status}`);
  const data = (await resp.json()) as { symbol: string; priceChangePercent: string }[];
  const usdtPairs = data
    .filter((d) => d.symbol.endsWith('USDT') && !d.symbol.includes('DOWN') && !d.symbol.includes('UP'))
    .map((d) => ({ symbol: d.symbol.replace('USDT', ''), change: parseFloat(d.priceChangePercent) }))
    .sort((a, b) => b.change - a.change);

  return {
    gainers: usdtPairs.slice(0, 5),
    losers: usdtPairs.slice(-5).reverse(),
  };
}

async function fetchFromBinance(): Promise<MarketSnapshot> {
  const [tickers, funding, movers] = await Promise.all([
    fetchBinanceTickers(),
    fetchBinanceFunding().catch(() => [] as FundingInfo[]),
    fetchBinanceMovers().catch(() => ({ gainers: [] as MoverInfo[], losers: [] as MoverInfo[] })),
  ]);
  return {
    tickers,
    fundingRates: funding,
    topGainers: movers.gainers,
    topLosers: movers.losers,
    source: 'binance',
    timestamp: Date.now(),
  };
}

// ─── OKX 降级抓取 ───────────────────────────────────────────
const OKX_TICKER_URL = 'https://www.okx.com/api/v5/market/tickers?instType=SPOT';
const OKX_SYMBOLS_MAP: Record<string, string> = {
  'BTC-USDT': 'BTC',
  'ETH-USDT': 'ETH',
  'SOL-USDT': 'SOL',
};

async function fetchFromOKX(): Promise<MarketSnapshot> {
  const resp = await fetch(OKX_TICKER_URL, { signal: AbortSignal.timeout(4000) });
  if (!resp.ok) throw new Error(`okx ${resp.status}`);
  const json = (await resp.json()) as { data: { instId: string; last: string; open24h: string }[] };
  const tickers: TickerInfo[] = [];
  for (const d of json.data) {
    const sym = OKX_SYMBOLS_MAP[d.instId];
    if (!sym) continue;
    const price = parseFloat(d.last);
    const open = parseFloat(d.open24h);
    tickers.push({ symbol: sym, price, change24h: open > 0 ? ((price - open) / open) * 100 : 0 });
  }
  return {
    tickers,
    fundingRates: [],
    topGainers: [],
    topLosers: [],
    source: 'okx',
    timestamp: Date.now(),
  };
}

// ─── 主路由 ─────────────────────────────────────────────────
export async function GET() {
  // 缓存命中
  if (cachedSnapshot && Date.now() - cacheTime < CACHE_TTL) {
    return NextResponse.json(cachedSnapshot);
  }

  try {
    const snapshot = await fetchFromBinance();
    cachedSnapshot = snapshot;
    cacheTime = Date.now();
    return NextResponse.json(snapshot);
  } catch {
    // Binance 挂了，降级 OKX
    try {
      const snapshot = await fetchFromOKX();
      cachedSnapshot = snapshot;
      cacheTime = Date.now();
      return NextResponse.json(snapshot);
    } catch {
      // 两个都挂了，返回缓存（哪怕过期）
      if (cachedSnapshot) {
        return NextResponse.json({ ...cachedSnapshot, source: 'cache' });
      }
      return NextResponse.json({ error: 'all sources failed' }, { status: 502 });
    }
  }
}
