const positions = [
  { asset: "BTC", pair: "BTC/USDT", size: "0.45", entry: "$65,200", current: "$67,234", pnl: "+$915.30", pnlPct: "+3.1%", side: "Long" },
  { asset: "ETH", pair: "ETH/USDT", size: "12.5", entry: "$3,380", current: "$3,456", pnl: "+$950.00", pnlPct: "+2.2%", side: "Long" },
  { asset: "SOL", pair: "SOL/USDT", size: "150", entry: "$182.00", current: "$178.45", pnl: "-$532.50", pnlPct: "-1.9%", side: "Long" },
];

const history = [
  { pair: "BTC/USDT", side: "Buy", entry: "$64,500", exit: "$66,800", pnl: "+$345.00", date: "Apr 7" },
  { pair: "ETH/USDT", side: "Sell", entry: "$3,520", exit: "$3,410", pnl: "+$275.00", date: "Apr 6" },
  { pair: "SOL/USDT", side: "Buy", entry: "$170.00", exit: "$182.50", pnl: "+$625.00", date: "Apr 5" },
  { pair: "BTC/USDT", side: "Sell", entry: "$68,100", exit: "$67,200", pnl: "+$72.00", date: "Apr 4" },
];

const strategies = [
  { name: "BTC Momentum", status: "Active", winRate: "89%", trades: 156, pnl: "+$8,234" },
  { name: "ETH DCA", status: "Active", winRate: "82%", trades: 89, pnl: "+$3,120" },
  { name: "SOL Scalper", status: "Paused", winRate: "76%", trades: 234, pnl: "+$1,104" },
];

export default function PortfolioPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Portfolio</h1>

      {/* Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-[#111827] border border-[#1f2937]">
          <p className="text-gray-400 text-sm mb-1">Total Balance</p>
          <p className="text-3xl font-bold text-white">$84,532.80</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#111827] border border-[#1f2937]">
          <p className="text-gray-400 text-sm mb-1">Total PnL</p>
          <p className="text-3xl font-bold text-[#00d4aa]">+$12,458.30</p>
          <p className="text-sm text-[#00d4aa]">+17.3% all time</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#111827] border border-[#1f2937]">
          <p className="text-gray-400 text-sm mb-1">Today&apos;s PnL</p>
          <p className="text-3xl font-bold text-[#00d4aa]">+$1,332.80</p>
          <p className="text-sm text-[#00d4aa]">+1.6%</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-[#1f2937] mb-8">
        <h3 className="text-white font-semibold mb-4">Portfolio Performance</h3>
        <div className="h-48 rounded-xl bg-[#0a0a1a] border border-[#1f2937] flex items-center justify-center text-gray-600 text-sm">
          📈 PnL Chart — Coming Soon
        </div>
      </div>

      {/* Active Positions */}
      <div className="rounded-2xl bg-[#111827] border border-[#1f2937] overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-[#1f2937]"><h3 className="text-white font-semibold">Active Positions</h3></div>
        <table className="w-full">
          <thead><tr className="text-gray-500 text-xs uppercase">
            <th className="px-6 py-3 text-left">Asset</th><th className="px-6 py-3 text-left">Side</th><th className="px-6 py-3 text-right">Size</th><th className="px-6 py-3 text-right">Entry</th><th className="px-6 py-3 text-right">Current</th><th className="px-6 py-3 text-right">PnL</th>
          </tr></thead>
          <tbody>
            {positions.map((p, i) => (
              <tr key={i} className="border-t border-[#1f2937] hover:bg-white/[0.02]">
                <td className="px-6 py-3 text-white text-sm font-medium">{p.pair}</td>
                <td className="px-6 py-3 text-[#00d4aa] text-sm">{p.side}</td>
                <td className="px-6 py-3 text-right text-gray-300 text-sm">{p.size}</td>
                <td className="px-6 py-3 text-right text-gray-300 text-sm">{p.entry}</td>
                <td className="px-6 py-3 text-right text-gray-300 text-sm">{p.current}</td>
                <td className={`px-6 py-3 text-right text-sm ${p.pnl.startsWith("+") ? "text-[#00d4aa]" : "text-red-400"}`}>{p.pnl} ({p.pnlPct})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trade History */}
      <div className="rounded-2xl bg-[#111827] border border-[#1f2937] overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-[#1f2937]"><h3 className="text-white font-semibold">Trade History</h3></div>
        <table className="w-full">
          <thead><tr className="text-gray-500 text-xs uppercase">
            <th className="px-6 py-3 text-left">Pair</th><th className="px-6 py-3 text-left">Side</th><th className="px-6 py-3 text-right">Entry</th><th className="px-6 py-3 text-right">Exit</th><th className="px-6 py-3 text-right">PnL</th><th className="px-6 py-3 text-right">Date</th>
          </tr></thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i} className="border-t border-[#1f2937] hover:bg-white/[0.02]">
                <td className="px-6 py-3 text-white text-sm font-medium">{h.pair}</td>
                <td className={`px-6 py-3 text-sm ${h.side === "Buy" ? "text-[#00d4aa]" : "text-red-400"}`}>{h.side}</td>
                <td className="px-6 py-3 text-right text-gray-300 text-sm">{h.entry}</td>
                <td className="px-6 py-3 text-right text-gray-300 text-sm">{h.exit}</td>
                <td className={`px-6 py-3 text-right text-sm ${h.pnl.startsWith("+") ? "text-[#00d4aa]" : "text-red-400"}`}>{h.pnl}</td>
                <td className="px-6 py-3 text-right text-gray-500 text-sm">{h.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Strategy Performance */}
      <h3 className="text-white font-semibold mb-4">Strategy Performance</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {strategies.map((s) => (
          <div key={s.name} className="p-6 rounded-2xl bg-[#111827] border border-[#1f2937]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">{s.name}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${s.status === "Active" ? "bg-[#00d4aa]/10 text-[#00d4aa]" : "bg-yellow-500/10 text-yellow-400"}`}>{s.status}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Win Rate</span><span className="text-white">{s.winRate}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Total Trades</span><span className="text-white">{s.trades}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Total PnL</span><span className="text-[#00d4aa]">{s.pnl}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
