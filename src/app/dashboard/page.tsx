import Link from "next/link";

const trades = [
  { pair: "BTC/USDT", side: "Buy", price: "67,234.50", amount: "0.15", pnl: "+$234.50", time: "2 min ago" },
  { pair: "ETH/USDT", side: "Sell", price: "3,456.78", amount: "2.5", pnl: "+$89.20", time: "15 min ago" },
  { pair: "SOL/USDT", side: "Buy", price: "178.45", amount: "50", pnl: "-$12.30", time: "1 hr ago" },
  { pair: "BTC/USDT", side: "Sell", price: "67,890.00", amount: "0.08", pnl: "+$156.80", time: "3 hr ago" },
  { pair: "ETH/USDT", side: "Buy", price: "3,412.30", amount: "5.0", pnl: "+$67.90", time: "5 hr ago" },
];

export default function DashboardPage() {
  return (
    <div className="matrix-grid-subtle">
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      {/* Status Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="theme-card glow-card-hover p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Agent Status</h3>
            <span className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-[#05DC80] animate-pulse" />Connected</span>
          </div>
          <p className="text-[var(--text-secondary)] text-sm mb-4">Your AI agent is actively monitoring the market</p>
          <Link href="/dashboard/agent" className="px-4 py-2 bg-[#05DC80]/10 text-[#05DC80] rounded-lg text-sm hover:bg-[#05DC80]/20 transition-colors">
            Chat with Agent
          </Link>
        </div>
        <div className="theme-card glow-card-hover p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">CoinW API</h3>
            <span className="flex items-center gap-2 text-sm text-yellow-400"><span className="w-2 h-2 rounded-full bg-yellow-400" />Not Connected</span>
          </div>
          <p className="text-[var(--text-secondary)] text-sm mb-4">Connect your CoinW API to enable live trading</p>
          <Link href="/dashboard/api-setup" className="px-4 py-2 bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg text-sm hover:bg-[#3b82f6]/20 transition-colors">
            Setup API
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total PnL", value: "+$12,458.30", glow: true },
          { label: "Active Strategies", value: "3", glow: false },
          { label: "Win Rate", value: "87.5%", glow: true },
        ].map((s) => (
          <div key={s.label} className="theme-card glow-card-hover p-6">
            <p className="text-[var(--text-secondary)] text-sm mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.glow ? "number-glow" : "text-white"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Trades */}
      <div className="theme-card overflow-hidden">
        <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border-primary)' }}>
          <h3 className="text-white font-semibold">Recent Trades</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[var(--text-secondary)] text-xs uppercase">
              <th className="px-6 py-3 text-left">Pair</th>
              <th className="px-6 py-3 text-left">Side</th>
              <th className="px-6 py-3 text-right">Price</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-right">PnL</th>
              <th className="px-6 py-3 text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t, i) => (
              <tr key={i} className="border-t border-[var(--border-primary)] hover:bg-[#05DC80]/[0.02] transition-colors">
                <td className="px-6 py-3 text-white text-sm font-medium">{t.pair}</td>
                <td className={`px-6 py-3 text-sm ${t.side === "Buy" ? "text-[#05DC80]" : "text-red-400"}`}>{t.side}</td>
                <td className="px-6 py-3 text-right text-gray-300 text-sm">${t.price}</td>
                <td className="px-6 py-3 text-right text-gray-300 text-sm">{t.amount}</td>
                <td className={`px-6 py-3 text-right text-sm ${t.pnl.startsWith("+") ? "number-glow" : "text-red-400"}`}>{t.pnl}</td>
                <td className="px-6 py-3 text-right text-[var(--text-secondary)] text-sm">{t.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
