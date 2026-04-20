'use client';

import React from 'react';
import { useT, useClaw42Locale } from '../i18n/useT';
import { Claw42Logo } from './Logo';

export function Navbar() {
  const t = useT();
  const { locale, setLocale } = useClaw42Locale();
  const nav = t.nav;

  const items = [
    { label: nav.buyCrypto, chevron: true },
    { label: nav.trade, chevron: true },
    { label: nav.markets, chevron: true },
    { label: nav.copyTrading, chevron: true },
    { label: nav.bots, chevron: true, newBadge: true },
    { label: nav.finance, chevron: true },
    { label: nav.luckyHodl, chevron: true },
    { label: nav.more, chevron: true },
    { label: nav.wallet, chevron: false },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto h-full max-w-[1440px] px-8 flex items-center gap-10">
        <Claw42Logo size="md" />

        <nav className="flex items-center gap-6 text-[15px] text-white/90 font-medium">
          {items.map((it, i) => (
            <a key={i} href="#" className="inline-flex items-center gap-1 hover:text-white transition relative">
              <span>{it.label}</span>
              {it.newBadge && (
                <span className="absolute -top-2 -right-6 rounded-full bg-[#d1ff55] px-1.5 py-[1px] text-[10px] font-semibold text-black">
                  {nav.new}
                </span>
              )}
              {it.chevron && (
                <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-70">
                  <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <button
            onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
            className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 hover:text-white hover:border-white/30 transition"
          >
            {locale === 'zh' ? 'EN' : '中'}
          </button>

          <button className="text-sm text-white/80 hover:text-white transition">
            {t.nav.login}
          </button>

          <button className="rounded-md bg-[#d1ff55] px-4 py-2 text-sm font-bold text-black hover:bg-[#b6e23d] transition">
            {t.nav.deposit}
          </button>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 21c0-4 4-7 8-7s8 3 8 7M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>
      </div>
    </header>
  );
}
