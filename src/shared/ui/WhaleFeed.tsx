'use client';

import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';

export function WhaleFeed() {
  const t = useT();
  return (
    <Card variant="elevated">
      <h3 className="text-sm font-semibold text-ink mb-3">{t.whaleFeed.title}</h3>
      <ul className="space-y-2">
        {t.whaleFeed.items.map((item, i) => (
          <li key={i} className="flex items-start justify-between gap-2 text-sm">
            <span className="text-ink">{item.text}</span>
            <span className="shrink-0 text-muted text-xs">{item.time}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
