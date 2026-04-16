'use client';

import { useT } from '@/i18n/LocaleContext';
import { ARENA_ENTRIES } from '../../data/arena';
import { PLAZA_POSTS } from '../../data/plaza';
import { ArenaHero } from './ArenaHero';
import { ArenaPodium } from './ArenaPodium';
import { ArenaFeed } from './ArenaFeed';
import { CopyTrading } from './CopyTrading';
import { ArenaFlow } from './ArenaFlow';

export function ArenaBoard() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  return (
    <div className="cw-dark -mx-6 -mt-10 px-6 pt-10 pb-16 sm:-mx-6 sm:px-6 rounded-none min-h-screen">
      <div className="mx-auto max-w-7xl space-y-20">
        <ArenaHero isZh={isZh} />
        <ArenaPodium entries={ARENA_ENTRIES} isZh={isZh} />
        <ArenaFeed posts={PLAZA_POSTS} isZh={isZh} />
        <CopyTrading isZh={isZh} />
        <ArenaFlow isZh={isZh} />
      </div>
    </div>
  );
}
