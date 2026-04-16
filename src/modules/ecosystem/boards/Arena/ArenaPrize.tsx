'use client';

interface ArenaPrizeProps {
  isZh: boolean;
}

const prizes = [
  { emoji: '🥇', rank: ['1st Place', '第一名'], value: '5,000', special: true },
  { emoji: '🥈', rank: ['2nd Place', '第二名'], value: '3,500', special: false },
  { emoji: '🥉', rank: ['3rd Place', '第三名'], value: '2,000', special: false },
];

const rules = [
  { icon: '⏱️', text: ['Duration: 30 days per season', '每赛季30天'] },
  { icon: '📊', text: ['Metric: Net PnL ranking', '净盈亏排名'] },
  { icon: '💰', text: ['Min: 1,000 USDT starting balance', '最低1000 USDT'] },
  { icon: '🔒', text: ['Fair: No wash trading, audited', '禁刷量，审计保障'] },
];

export function ArenaPrize({ isZh }: ArenaPrizeProps) {
  return (
    <section className="w-full py-[120px] px-6 bg-[#0A0A1A] relative overflow-hidden">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(163,102,255,0.3), transparent)' }}
      />

      {/* Section Title */}
      <h2 className="text-5xl font-extrabold text-white text-center mb-4 tracking-tight">
        {isZh ? '🏆 奖池 & 规则' : '🏆 Prize Pool & Rules'}
      </h2>
      <p className="text-lg text-[#8a8a9a] text-center mb-16 max-w-[600px] mx-auto">
        {isZh ? '争夺 12,500 Credit 总奖池' : 'Compete for the 12,500 Credit prize pool'}
      </p>

      {/* Total Prize Pool Card */}
      <div
        className="max-w-[600px] mx-auto mb-16 p-12 rounded-3xl text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(82,39,255,0.08), rgba(163,102,255,0.05))',
          border: '1px solid rgba(82,39,255,0.2)',
        }}
      >
        <div className="text-base font-semibold text-[#a366ff] uppercase tracking-[3px] mb-4">
          {isZh ? '总奖池' : 'TOTAL PRIZE POOL'}
        </div>
        <div className="text-7xl font-black text-white mb-2">12,500</div>
        <div className="text-2xl font-semibold text-[#a366ff]">Credit</div>
      </div>

      {/* Prize Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
        {prizes.map((p) => (
          <div
            key={p.value}
            className="p-8 rounded-2xl bg-[rgba(255,255,255,0.02)] backdrop-blur-sm text-center"
            style={{
              border: p.special
                ? '1px solid rgba(82,39,255,0.3)'
                : '1px solid rgba(255,255,255,0.06)',
              boxShadow: p.special ? '0 0 30px rgba(82,39,255,0.15)' : undefined,
            }}
          >
            <div className="text-4xl mb-3">{p.emoji}</div>
            <div className="text-sm text-[#8a8a9a] font-medium mb-2">
              {isZh ? p.rank[1] : p.rank[0]}
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{p.value}</div>
            <div className="text-sm text-[#a366ff]">Credit</div>
          </div>
        ))}
      </div>

      {/* Rules Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {rules.map((r, i) => (
          <div
            key={i}
            className="flex gap-3 p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]"
          >
            <div className="w-10 h-10 rounded-lg bg-[rgba(82,39,255,0.15)] flex items-center justify-center text-xl shrink-0">
              {r.icon}
            </div>
            <div className="text-sm text-[#8a8a9a] flex items-center">
              {isZh ? r.text[1] : r.text[0]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
