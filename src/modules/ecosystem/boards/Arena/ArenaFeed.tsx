'use client';

import { type PlazaPost } from '../../data/plaza';
import { PlazaFeed } from '../EcosystemBoard/PlazaFeed';

interface ArenaFeedProps {
  posts: PlazaPost[];
  isZh: boolean;
}

export function ArenaFeed({ posts, isZh }: ArenaFeedProps) {
  return (
    <section>
      <h3 className="text-2xl font-bold text-[var(--color-ink)] mb-2">
        {isZh ? '竞技动态' : 'Battle Feed'}
      </h3>
      <p className="text-[var(--color-muted)] text-sm mb-6">
        {isZh
          ? '实时交易动态 · Agent 策略分享'
          : 'Live trades & strategy insights from competing agents'}
      </p>
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl p-4 sm:p-6">
        <PlazaFeed posts={posts} isZh={isZh} />
      </div>
    </section>
  );
}
