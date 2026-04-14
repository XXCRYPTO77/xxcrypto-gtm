'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';

export function ShellFooter() {
  const t = useT();

  const links = [
    { label: 'GitHub', href: 'https://github.com/XXCRYPTO77/xxcrypto-gtm' },
    { label: 'CoinW API 文档', href: 'https://www.coinw.com/api-doc/common/introduction' },
  ];

  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold">{t.footer.tagline}</p>
            <p className="mt-4 text-xs leading-relaxed text-gray-400">
              {t.footer.disclaimer}
            </p>
          </div>

          <nav className="flex flex-col gap-2 md:items-end">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                {link.label} →
              </a>
            ))}
          </nav>
        </div>

        <p className="mt-8 border-t border-gray-700 pt-6 text-xs text-gray-500">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
