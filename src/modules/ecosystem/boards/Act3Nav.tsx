'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useT } from '@/i18n/LocaleContext';

const TABS = [
  { href: '/act3/arena', zh: '竞技场', en: 'Arena' },
  { href: '/act3/zone', zh: 'Agent Zone', en: 'Agent Zone' },
  { href: '/act3/events', zh: '活动中心', en: 'Events' },
];

/**
 * Shared sub-navigation for all ACT3 sub-pages.
 * Shows: ← back to Hub + 3 sibling tabs with active highlight.
 *
 * For Arena (dark theme), pass `dark` prop to switch to token-based colors.
 */
export function Act3Nav({ dark = false }: { dark?: boolean }) {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const pathname = usePathname();

  const backColor = dark
    ? 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
    : 'text-muted hover:text-ink';
  const tabBase = dark
    ? 'px-4 py-2 rounded-full text-sm font-medium transition-all'
    : 'px-4 py-2 rounded-full text-sm font-medium transition-all';
  const tabActive = dark
    ? 'bg-[var(--color-brand)] text-white shadow-sm'
    : 'bg-brand text-white shadow-sm';
  const tabInactive = dark
    ? 'text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)]'
    : 'text-muted hover:text-ink hover:bg-gray-100';

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
      {/* Back to Hub */}
      <Link
        href="/act3"
        className={`flex items-center gap-1.5 text-sm font-medium ${backColor} transition-colors`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {isZh ? '返回生态总览' : 'Back to Ecosystem'}
      </Link>

      {/* Sibling tabs */}
      <div className="flex gap-1.5">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`${tabBase} ${active ? tabActive : tabInactive}`}
            >
              {isZh ? tab.zh : tab.en}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
