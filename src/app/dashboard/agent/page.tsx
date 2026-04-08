"use client";

const conversations = [
  { id: 1, title: "BTC Analysis", preview: "BTC showing bullish divergence...", time: "Now", active: true },
  { id: 2, title: "Portfolio Rebalance", preview: "I suggest reducing ETH...", time: "2h ago", active: false },
  { id: 3, title: "Risk Alert", preview: "High volatility detected...", time: "Yesterday", active: false },
  { id: 4, title: "Strategy Update", preview: "New DCA strategy deployed", time: "2d ago", active: false },
];

const messages = [
  { from: "agent", text: "Good morning! I've been monitoring the markets overnight. Here's what I found:" },
  { from: "agent", text: "📊 **BTC/USDT**: Strong support at $66,800. RSI showing bullish divergence on 4H. Volume increasing.\n\n🎯 **Recommendation**: Consider a long position with entry at $67,000, TP at $69,500, SL at $66,200." },
  { from: "user", text: "What about ETH? Should I add to my position?" },
  { from: "agent", text: "ETH is currently consolidating between $3,400-$3,500. The ETH/BTC ratio is showing weakness.\n\n⚠️ I'd recommend waiting for a breakout above $3,520 before adding. Your current ETH allocation is 25% — already at your target. Adding now would over-expose you." },
  { from: "user", text: "Good call. What about SOL?" },
  { from: "agent", text: "SOL is looking strong! 🚀\n\n• Breaking out of a falling wedge pattern\n• Volume spike detected (+45% above average)\n• Next resistance at $185\n\nI've prepared a limit buy order at $176.50 with 2% of portfolio. Shall I execute?" },
];

export default function AgentPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] -m-8 overflow-hidden">
      {/* Conversation List */}
      <div className="w-80 bg-[#0d0d20] border-r border-[#1f2937] flex flex-col">
        <div className="p-4 border-b border-[#1f2937]">
          <h2 className="text-white font-semibold">Conversations</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <div key={c.id} className={`px-4 py-3 cursor-pointer border-b border-[#1f2937]/50 transition-colors ${c.active ? "bg-[#00d4aa]/5 border-l-2 border-l-[#00d4aa]" : "hover:bg-white/[0.02]"}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-white font-medium">{c.title}</span>
                <span className="text-xs text-gray-500">{c.time}</span>
              </div>
              <p className="text-xs text-gray-400 truncate">{c.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b border-[#1f2937] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#3b82f6] flex items-center justify-center text-sm">🤖</div>
          <div>
            <p className="text-white text-sm font-medium">XX Trading Agent</p>
            <p className="text-xs text-[#00d4aa]">● Online</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.from === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${m.from === "agent" ? "bg-gradient-to-br from-[#00d4aa] to-[#3b82f6]" : "bg-[#3b82f6]"}`}>
                {m.from === "agent" ? "🤖" : "👤"}
              </div>
              <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${m.from === "agent" ? "bg-[#111827] border border-[#1f2937] text-gray-200" : "bg-[#00d4aa]/10 text-white"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#1f2937]">
          <div className="flex gap-3">
            <input type="text" placeholder="Ask your agent anything..." className="flex-1 px-4 py-3 rounded-xl bg-[#111827] border border-[#1f2937] text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00d4aa]/50" />
            <button className="px-6 py-3 bg-[#00d4aa] hover:bg-[#00b894] text-black font-semibold rounded-xl text-sm transition-all">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
