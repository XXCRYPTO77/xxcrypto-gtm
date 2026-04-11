'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-border bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-ink">{t.nav.brand}</p>
            <p className="mt-2 text-sm text-muted">{t.footer.tagline}</p>
            <p className="mt-4 text-xs leading-relaxed text-muted">{t.footer.disclaimer}</p>
          </div>
          <nav className="flex flex-col gap-2 md:items-end">
            {t.footer.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-brand"
              >
                {l.label} →
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs text-muted">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
