'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';

export function ShellFooter() {
  const t = useT();

  const links = [
    { label: 'GitHub', href: 'https://github.com/XXCRYPTO77/xxcrypto-gtm' },
    { label: 'CoinW API Docs', href: 'https://www.coinw.com/api-doc/common/introduction' },
  ];

  return (
    <footer className="border-t border-white/5 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left: brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #6c4fff 0%, #8169ff 100%)',
                }}
              >
                C
              </span>
              <span className="text-base font-semibold tracking-tight">Claw 42</span>
            </div>
            <p className="mt-5 text-sm font-medium text-white/80">
              {t.footer.tagline}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-white/50">
              {t.footer.disclaimer}
            </p>
          </div>

          {/* Right: links */}
          <nav className="flex flex-col gap-2 md:items-end">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Resources
            </span>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 transition-colors hover:text-[#d1ff55]"
              >
                {link.label} →
              </a>
            ))}
          </nav>
        </div>

        <p className="mt-10 border-t border-white/5 pt-6 text-xs text-white/40">
          © 2026 Claw 42. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
