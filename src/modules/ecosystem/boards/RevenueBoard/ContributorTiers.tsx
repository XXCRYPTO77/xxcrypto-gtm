'use client';

import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';
import { Users, ShieldCheck, Crown } from 'lucide-react';

interface ContributorTiersProps {
  isZh: boolean;
}

const TIERS = [
  {
    icon: Users,
    colorClass: 'text-gray-500',
    bgClass: 'bg-gray-100',
    badgeTone: 'neutral' as const,
    nameZh: '社区贡献者',
    nameEn: 'Community',
    thresholdZh: '无门槛，任何人可发布',
    thresholdEn: 'No threshold — anyone can publish',
    perksZh: ['发布策略卡', '被所有 Agent 调用', '社区排行展示'],
    perksEn: ['Publish strategy cards', 'Called by all Agents', 'Community leaderboard'],
  },
  {
    icon: ShieldCheck,
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    badgeTone: 'brand' as const,
    nameZh: '认证开发者',
    nameEn: 'Verified Dev',
    thresholdZh: 'KYC + 最低入金（TBD）',
    thresholdEn: 'KYC + minimum deposit (TBD)',
    perksZh: ['优先展示位', '贡献者认证徽章', '分润收益'],
    perksEn: ['Priority placement', 'Verified contributor badge', 'Revenue share'],
  },
  {
    icon: Crown,
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-50',
    badgeTone: 'brand' as const,
    nameZh: '官方合作伙伴',
    nameEn: 'Official Partner',
    thresholdZh: '审核 + 收益率达标（TBD）',
    thresholdEn: 'Review + performance target (TBD)',
    perksZh: ['联合推广', '独家策略位', '深度合作分润'],
    perksEn: ['Co-marketing', 'Exclusive strategy slots', 'Deep partnership revenue'],
  },
];

export function ContributorTiers({ isZh }: ContributorTiersProps) {
  const t = useT();
  const eco = (t as any).ecosystem;

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {TIERS.map((tier, i) => {
        const Icon = tier.icon;
        const perks = isZh ? tier.perksZh : tier.perksEn;
        return (
          <Card key={i} variant="elevated" className="flex flex-col items-center text-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full ${tier.bgClass}`}>
              <Icon className={`h-7 w-7 ${tier.colorClass}`} />
            </div>
            <h4 className="text-lg font-semibold text-ink">
              {isZh ? tier.nameZh : tier.nameEn}
            </h4>
            <Badge tone={tier.badgeTone}>
              {isZh ? tier.thresholdZh : tier.thresholdEn}
            </Badge>
            <ul className="text-sm text-muted space-y-2.5 mt-3 text-left w-full">
              {perks.map((perk, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <span className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${tier.colorClass.replace('text-', 'bg-')}`} />
                  {perk}
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
