'use client';

import React, { useEffect, useState } from 'react';
import { useT } from '@/i18n/LocaleContext';
import { LangToggle } from '../primitives/LangToggle';

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'border-b border-border bg-page/85 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand font-bold text-white">
            C
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-bold leading-tight text-ink">{t.nav.brand}</span>
            <span className="block text-xs leading-tight text-muted">{t.nav.tagline}</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#act1" className="text-sm font-medium text-muted transition-colors hover:text-brand">
            {t.nav.acts.act1}
          </a>
          <a href="#act2" className="text-sm font-medium text-muted transition-colors hover:text-brand">
            {t.nav.acts.act2}
          </a>
          <a href="#act3" className="text-sm font-medium text-muted transition-colors hover:text-brand">
            {t.nav.acts.act3}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <LangToggle />
        </div>
      </div>
    </nav>
  );
}
