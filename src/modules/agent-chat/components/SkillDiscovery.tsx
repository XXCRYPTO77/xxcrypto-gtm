'use client';

import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';
import { Badge } from '@/components/primitives/Badge';

interface SkillDiscoveryProps {
  onNext: () => void;
}

export function SkillDiscovery({ onNext }: SkillDiscoveryProps) {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const groups = t.v10.capability.groups as {
    id: string;
    name: string;
    items: { code: string; name: string; desc: string }[];
  }[];

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {isZh ? '发现可用 Skills' : 'Discover Available Skills'}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <Card key={group.id} variant="elevated">
            <Badge tone="brand" className="mb-4">{group.name}</Badge>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.code} className="flex items-center gap-2" title={item.desc}>
                  <Badge tone="neutral" className="text-[10px] shrink-0">{item.code}</Badge>
                  <span className="text-sm text-ink">{item.name}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={onNext}
          className="rounded-xl bg-brand px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
        >
          {isZh ? '选择 Agent →' : 'Choose Agent →'}
        </button>
      </div>
    </section>
  );
}
