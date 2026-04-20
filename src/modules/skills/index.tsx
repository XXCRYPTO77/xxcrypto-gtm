'use client';

import { useState, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useT } from '@/i18n/LocaleContext';
import { CHAT_SKILLS } from '@/modules/agent-chat/data/skills';
import type { SkillRef } from '@/modules/agent-chat/data/skills';

type GroupFilter = 'all' | SkillRef['group'];

const TABS: { key: GroupFilter; zh: string; en: string; count: number }[] = [
  { key: 'all', zh: '全部', en: 'All', count: CHAT_SKILLS.length },
  { key: 'info', zh: '信息', en: 'Info', count: CHAT_SKILLS.filter((s) => s.group === 'info').length },
  { key: 'trade', zh: '交易', en: 'Trade', count: CHAT_SKILLS.filter((s) => s.group === 'trade').length },
  { key: 'auth', zh: '认证', en: 'Auth', count: CHAT_SKILLS.filter((s) => s.group === 'auth').length },
  { key: 'platform', zh: '平台', en: 'Platform', count: CHAT_SKILLS.filter((s) => s.group === 'platform').length },
];

const GROUP_COLOR: Record<SkillRef['group'], { bg: string; text: string; border: string }> = {
  info:     { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  trade:    { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
  auth:     { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  platform: { bg: '#FAF5FF', text: '#7C3AED', border: '#DDD6FE' },
};

const GROUP_LABEL: Record<SkillRef['group'], { zh: string; en: string }> = {
  info:     { zh: '信息', en: 'Info' },
  trade:    { zh: '交易', en: 'Trade' },
  auth:     { zh: '认证', en: 'Auth' },
  platform: { zh: '平台', en: 'Platform' },
};

export default function SkillsModule() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  const [activeGroup, setActiveGroup] = useState<GroupFilter>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = CHAT_SKILLS;
    if (activeGroup !== 'all') list = list.filter((s) => s.group === activeGroup);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.code.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.nameEn.toLowerCase().includes(q) ||
          (s.desc && s.desc.includes(q)) ||
          (s.descEn && s.descEn.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [activeGroup, search]);

  // Group filtered results by group for section headers
  const groups = (['info', 'trade', 'auth', 'platform'] as const).filter((g) =>
    activeGroup === 'all' || activeGroup === g
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Page header */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted uppercase tracking-wider">
          <span>🦀 Claw 42</span>
          <span>·</span>
          <span>{isZh ? 'Skills 功能对照表' : 'Skills Reference'}</span>
        </div>
        <h1 className="text-4xl font-bold text-ink leading-tight">
          {isZh ? '18 项 Skills' : '18 Skills'}
        </h1>
        <p className="text-lg text-muted max-w-xl leading-relaxed">
          {isZh
            ? '覆盖信息获取、交易执行、账号安全、平台对接四个维度。这是 Claw 42 的完整能力边界。'
            : 'Covering information, trade execution, account security, and platform integration. The complete capability boundary of Claw 42.'}
        </p>
      </div>

      {/* Search + filter row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        {/* Group tabs */}
        <div className="flex flex-wrap gap-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveGroup(tab.key)}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                activeGroup === tab.key
                  ? 'bg-ink text-white'
                  : 'bg-white border border-border text-muted hover:text-ink hover:border-gray-400'
              }`}
            >
              {isZh ? tab.zh : tab.en}
              <span
                className={`text-xs rounded-full px-1.5 py-0.5 font-normal ${
                  activeGroup === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-muted'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative shrink-0">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isZh ? '搜索 Skill…' : 'Search…'}
            className="rounded-xl border border-border bg-white py-2 pl-8 pr-4 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-brand/60 w-52"
          />
        </div>
      </div>

      {/* Skill list — grouped sections */}
      <div className="space-y-10">
        {groups.map((group) => {
          const skills = filtered.filter((s) => s.group === group);
          if (skills.length === 0) return null;
          const col = GROUP_COLOR[group];
          const label = isZh ? GROUP_LABEL[group].zh : GROUP_LABEL[group].en;

          return (
            <section key={group}>
              {/* Group header */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide"
                  style={{ background: col.bg, color: col.text, border: `1px solid ${col.border}` }}
                >
                  {label}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Skill rows */}
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div
                    key={skill.code}
                    className="flex gap-4 rounded-xl border border-border bg-white px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    {/* Code badge */}
                    <div className="shrink-0 flex items-start pt-0.5">
                      <span
                        className="rounded-md px-2 py-0.5 text-xs font-bold font-mono"
                        style={{ background: col.bg, color: col.text }}
                      >
                        {skill.code}
                      </span>
                    </div>

                    {/* Name + description */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-ink">
                        {isZh ? skill.name : skill.nameEn}
                      </div>
                      {(isZh ? skill.desc : skill.descEn) && (
                        <div className="mt-1 text-xs text-muted leading-relaxed">
                          {isZh ? skill.desc : skill.descEn}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted">
            {isZh ? '没有匹配的 Skill' : 'No matching skills'}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted">
          {isZh
            ? '18 项 Skills 全部就绪，认养一个专属的 Claw 42 开始体验'
            : 'All 18 skills ready — adopt your Claw 42 to get started'}
        </p>
        <Link
          href="/act2"
          className="inline-flex items-center gap-2 rounded-2xl bg-brand px-7 py-3 text-sm font-semibold text-white shadow hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="text-base">🦞</span>
          {isZh ? '认养你的 Claw 42 →' : 'Adopt Your Claw 42 →'}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
