'use client';

interface ContributorTiersProps {
  isZh: boolean;
}

const TIERS = [
  {
    emoji: '🌱',
    glowFrom: 'from-emerald-500/40',
    glowTo: 'to-green-400/20',
    borderGlow: 'rgba(16,185,129,0.3)',
    accentColor: '#10B981',
    nameZh: '社区贡献者',
    nameEn: 'Community',
    tagZh: '开放准入',
    tagEn: 'OPEN ACCESS',
    perksZh: ['发布策略卡', '被所有 Agent 调用', '社区排行展示'],
    perksEn: ['Publish strategy cards', 'Called by all Agents', 'Community leaderboard display'],
  },
  {
    emoji: '💎',
    glowFrom: 'from-amber-500/40',
    glowTo: 'to-orange-400/20',
    borderGlow: 'rgba(245,158,11,0.3)',
    accentColor: '#F59E0B',
    nameZh: '认证开发者',
    nameEn: 'Verified Dev',
    tagZh: '认证身份',
    tagEn: 'VERIFIED STATUS',
    perksZh: ['优先展示位', '贡献者认证徽章', '分润收益'],
    perksEn: ['Priority placement', 'Verified contributor badge', 'Revenue sharing'],
  },
  {
    emoji: '👑',
    glowFrom: 'from-violet-500/40',
    glowTo: 'to-purple-400/20',
    borderGlow: 'rgba(139,92,246,0.3)',
    accentColor: '#8B5CF6',
    nameZh: '官方合作伙伴',
    nameEn: 'Official Partner',
    tagZh: '传奇等级',
    tagEn: 'LEGENDARY STATUS',
    perksZh: ['联合推广', '独家策略位', '深度合作分润'],
    perksEn: ['Co-marketing campaigns', 'Exclusive strategy slots', 'Deep partnership revenue'],
  },
];

export function ContributorTiers({ isZh }: ContributorTiersProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {TIERS.map((tier, i) => (
        <div
          key={i}
          className="relative rounded-2xl overflow-hidden border border-[#2A2A4A] hover:border-transparent transition-all duration-500 group"
          style={{ background: '#12122A' }}
        >
          {/* Bottom glow */}
          <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${tier.glowFrom} ${tier.glowTo} to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 blur-sm`} />

          {/* Icon area with subtle dark gradient */}
          <div className="relative flex items-center justify-center pt-10 pb-6">
            <div className="text-6xl drop-shadow-2xl">{tier.emoji}</div>
          </div>

          {/* Content */}
          <div className="relative px-6 pb-8">
            <h4 className="text-lg font-bold text-white mb-1">
              {isZh ? tier.nameZh : tier.nameEn}
            </h4>
            <p className="text-xs font-bold tracking-widest mb-4" style={{ color: tier.accentColor }}>
              {isZh ? tier.tagZh : tier.tagEn}
            </p>
            <ul className="space-y-2.5">
              {(isZh ? tier.perksZh : tier.perksEn).map((perk, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-[#A0A0B8]">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: tier.accentColor }} />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
