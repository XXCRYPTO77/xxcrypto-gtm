'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';
import { useT } from '@/i18n/LocaleContext';
import { CHAT_SKILLS } from '../data/skills';
import type { SkillRef } from '../data/skills';

interface SkillDiscoveryProps {
  onNext: () => void;
}

type GroupFilter = 'all' | SkillRef['group'];

const TABS: { key: GroupFilter; zh: string; en: string }[] = [
  { key: 'all', zh: '全部', en: 'All' },
  { key: 'info', zh: '信息', en: 'Info' },
  { key: 'trade', zh: '交易', en: 'Trade' },
  { key: 'auth', zh: '认证', en: 'Auth' },
  { key: 'platform', zh: '平台', en: 'Platform' },
];

const GROUP_LABEL: Record<string, { zh: string; en: string }> = {
  info: { zh: '信息', en: 'Info' },
  trade: { zh: '交易', en: 'Trade' },
  auth: { zh: '认证', en: 'Auth' },
  platform: { zh: '平台', en: 'Platform' },
};

export function SkillDiscovery({ onNext }: SkillDiscoveryProps) {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  const [activeGroup, setActiveGroup] = useState<GroupFilter>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let list = CHAT_SKILLS;
    if (activeGroup !== 'all') {
      list = list.filter((s) => s.group === activeGroup);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.code.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.nameEn.toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeGroup, search]);

  const toggle = (code: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      {/* Hero */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">
            {isZh
              ? '18 项 Skills，覆盖加密交易全流程'
              : '18 Skills, Full Crypto Trading Stack'}
          </h1>
          <p className="mt-2 text-muted">
            {isZh
              ? '了解 Agent 能为你做什么，然后选择专属 Agent'
              : 'Discover what Agent can do, then pick your Agent'}
          </p>
        </div>
        <div className="relative shrink-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isZh ? '搜索 Skill…' : 'Search skills…'}
            className="rounded-xl border border-border bg-white py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveGroup(tab.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeGroup === tab.key
                ? 'bg-brand-soft text-brand'
                : 'text-muted hover:text-ink'
            }`}
          >
            {isZh ? tab.zh : tab.en}
          </button>
        ))}
      </div>

      {/* Card wall */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((skill) => {
          const isSelected = selected.has(skill.code);
          return (
            <button
              key={skill.code}
              type="button"
              onClick={() => toggle(skill.code)}
              className="text-left"
              title={isZh ? skill.name : skill.nameEn}
            >
              <Card
                variant="elevated"
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'border-brand-light bg-brand-soft/30' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Badge tone="brand">{skill.code}</Badge>
                    <span className="font-semibold text-ink">
                      {isZh ? skill.name : skill.nameEn}
                    </span>
                  </div>
                  <Badge tone="neutral">
                    {isZh
                      ? GROUP_LABEL[skill.group].zh
                      : GROUP_LABEL[skill.group].en}
                  </Badge>
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 flex flex-wrap items-center gap-4">
        {selected.size > 0 && (
          <button
            onClick={onNext}
            className="rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:opacity-90"
          >
            {isZh ? '基于你的选择推荐 Agent →' : 'Get Agent Recommendations →'}
          </button>
        )}
        <button
          onClick={onNext}
          className="rounded-xl border border-border px-6 py-3 font-medium text-muted hover:text-ink"
        >
          {isZh ? '跳过，看所有 Agent →' : 'Skip, See All Agents →'}
        </button>
      </div>
    </div>
  );
}
