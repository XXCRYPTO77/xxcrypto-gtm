'use client';

import { CHAT_SKILLS } from '../data/skills';

interface Props {
  activeCodes: Set<string>; // currently invoking
  usedCodes: Set<string>; // already invoked this session
  isZh: boolean;
}

const GROUP_LABELS = {
  info: { zh: '信息端', en: 'Info' },
  trade: { zh: '交易端', en: 'Trade' },
  auth: { zh: '认证安全', en: 'Auth' },
  platform: { zh: '平台基础', en: 'Platform' },
} as const;

export function SkillSidebar({ activeCodes, usedCodes, isZh }: Props) {
  const byGroup = {
    info: CHAT_SKILLS.filter((s) => s.group === 'info'),
    trade: CHAT_SKILLS.filter((s) => s.group === 'trade'),
    auth: CHAT_SKILLS.filter((s) => s.group === 'auth'),
    platform: CHAT_SKILLS.filter((s) => s.group === 'platform'),
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-ink">
          {isZh ? '当前调用的 Skills' : 'Active Skills'}
        </div>
        <div className="text-[11px] text-muted">
          {usedCodes.size}/{CHAT_SKILLS.length} {isZh ? '已用' : 'used'}
        </div>
      </div>

      <div className="space-y-3">
        {(Object.keys(byGroup) as Array<keyof typeof byGroup>).map((group) => (
          <div key={group}>
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
              {isZh ? GROUP_LABELS[group].zh : GROUP_LABELS[group].en}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {byGroup[group].map((skill) => {
                const isActive = activeCodes.has(skill.code);
                const isUsed = usedCodes.has(skill.code);
                return (
                  <span
                    key={skill.code}
                    className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] transition-all ${
                      isActive
                        ? 'border-brand bg-brand text-white shadow-sm scale-105'
                        : isUsed
                        ? 'border-brand/30 bg-brand-soft text-brand'
                        : 'border-border bg-page text-muted'
                    }`}
                    title={isZh ? skill.name : skill.nameEn}
                  >
                    <span className="font-mono font-semibold">{skill.code}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-3 text-[11px] leading-relaxed text-muted">
        {isZh
          ? '亮起 = 当前调用中。实心 = 本次会话已调用过。点击下方输入快速动作可触发不同 Skills。'
          : 'Lit = invoking now. Filled = already used this session. Use quick actions below to trigger different skills.'}
      </div>
    </div>
  );
}
