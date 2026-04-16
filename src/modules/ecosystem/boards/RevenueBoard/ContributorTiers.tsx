'use client';

import { Sprout, Gem, Crown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ContributorTiersProps {
  isZh: boolean;
}

const TIERS: Array<{
  icon: LucideIcon;
  iconColor: string;
  iconGlow: string;
  glowFrom: string;
  glowTo: string;
  borderGlow: string;
  accentColor: string;
  nameZh: string;
  nameEn: string;
  tagZh: string;
  tagEn: string;
  perksZh: string[];
  perksEn: string[];
}> = [
  {
    icon: Sprout,
    iconColor: '#34D399',
    iconGlow: 'rgba(52,211,153,0.3)' ,
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
    icon: Gem,
    iconColor: '#FBBF24',
    iconGlow: 'rgba(251,191,36,0.3)',
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
    icon: Crown,
    iconColor: '#A78BFA',
    iconGlow: 'rgba(167,139,250,0.3)',
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

          {/* Glassmorphism icon */}
          <div className="relative flex items-center justify-center pt-10 pb-6">
            <div
              className="h-20 w-20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`,
                boxShadow: `0 8px 32px ${tier.iconGlow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}
            >
              <tier.icon className="h-10 w-10" style={{ color: tier.iconColor, filter: `drop-shadow(0 0 12px ${tier.iconGlow})` }} />
            </div>
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
