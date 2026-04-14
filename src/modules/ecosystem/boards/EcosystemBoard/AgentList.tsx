'use client';

import { useState } from 'react';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';
import { type Agent } from '../../data/agents';

interface AgentListProps {
  agents: Agent[];
  isZh: boolean;
}

type Filter = 'all' | 'official' | 'external';
type Sort = 'return' | 'followers' | 'calls';

export function AgentList({ agents, isZh }: AgentListProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('return');
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const toggleFollow = (id: string) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = agents.filter((a) => {
    if (filter === 'official') return a.type === 'official';
    if (filter === 'external') return a.type === 'external';
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'return') return b.metrics.return7d - a.metrics.return7d;
    if (sort === 'followers') return b.metrics.followers - a.metrics.followers;
    return b.metrics.dailyCalls - a.metrics.dailyCalls;
  });

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: isZh ? '全部' : 'All' },
    { key: 'official', label: isZh ? '官方' : 'Official' },
    { key: 'external', label: isZh ? '外部接入' : 'External' },
  ];

  const sorts: { key: Sort; label: string }[] = [
    { key: 'return', label: isZh ? '收益率' : 'Return' },
    { key: 'followers', label: isZh ? '关注数' : 'Followers' },
    { key: 'calls', label: isZh ? '调用量' : 'Calls' },
  ];

  return (
    <div>
      {/* Filter + Sort */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700"
        >
          {sorts.map((s) => (
            <option key={s.key} value={s.key}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((agent) => {
          const isFollowed = following.has(agent.id);
          const ret = agent.metrics.return7d;
          return (
            <Card key={agent.id} variant="elevated" className="flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                  style={{ background: agent.accent + '22' }}
                >
                  {agent.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink truncate">
                      {isZh ? agent.name : agent.nameEn}
                    </span>
                    <Badge tone={agent.type === 'official' ? 'brand' : 'neutral'} className="text-[10px] !py-0.5 !px-2">
                      {agent.type === 'official'
                        ? (isZh ? '官方认证' : 'Official')
                        : (isZh ? '社区 Agent' : 'Community')}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted truncate">{isZh ? agent.source : agent.sourceEn}</div>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-sm text-muted line-clamp-2">{isZh ? agent.tagline : agent.taglineEn}</p>

              {/* Metrics */}
              <div className="flex items-center gap-4 border-t border-border pt-3 text-xs">
                <span className={ret >= 0 ? 'font-semibold text-green-600' : 'font-semibold text-red-500'}>
                  {ret >= 0 ? '+' : ''}{ret}%
                </span>
                <span className="text-muted">{agent.metrics.dailyCalls.toLocaleString()} {isZh ? '日调用' : 'calls/d'}</span>
                <span className="text-muted">{agent.metrics.followers.toLocaleString()} {isZh ? '关注' : 'followers'}</span>
              </div>

              {/* Follow + Protocol */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => toggleFollow(agent.id)}
                  className={`rounded-full px-4 py-1 text-xs font-medium transition-colors ${
                    isFollowed
                      ? 'bg-gray-100 text-gray-500'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {isFollowed ? (isZh ? '已关注' : 'Following') : (isZh ? '关注' : 'Follow')}
                </button>
                {agent.protocol && (
                  <Badge tone="neutral" className="text-[10px] !py-0.5 !px-2">{agent.protocol}</Badge>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
