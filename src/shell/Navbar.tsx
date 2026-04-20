'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { LangToggle } from '@/components/primitives/LangToggle';

export function ShellNavbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSubpage = pathname !== '/';

  // Order matters: act15 must beat /act1 startsWith.
  const activeAct = pathname === '/'
    ? 'overview'
    : pathname.startsWith('/act15')
      ? 'act15'
      : pathname.startsWith('/act1')
        ? 'act1'
        : pathname.startsWith('/act2')
          ? 'act2'
          : pathname.startsWith('/act3')
            ? 'act3'
            : pathname.startsWith('/act4')
              ? 'act4'
              : pathname.startsWith('/skills')
                ? 'skills'
                : null;

  const acts = [
    { id: 'overview', label: 'Overview', href: '/' },
    { id: 'act1', label: 'Act 1', href: '/act1' },
    { id: 'act15', label: 'Act 1.5', href: '/act15' },
    { id: 'act2', label: 'Act 2', href: '/act2' },
    { id: 'act3', label: 'Act 3', href: '/act3' },
    { id: 'act4', label: 'Act 4', href: '/act4' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: Brand + Back Arrow */}
        <div className="flex items-center gap-2">
          {isSubpage && (
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded p-1 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Back to home"
            >
              <ArrowLeft size={16} />
            </Link>
          )}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white"
              style={{
                background:
                  'linear-gradient(135deg, #6c4fff 0%, #8169ff 100%)',
                boxShadow: '0 0 16px rgba(108,79,255,0.4)',
              }}
            >
              C
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold tracking-tight text-white">
                Claw 42
              </span>
            </span>
          </Link>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden items-center gap-7 md:flex">
          {acts.map((act) => {
            const active = activeAct === act.id;
            return (
              <Link
                key={act.id}
                href={act.href}
                className={`relative text-sm font-medium transition-colors ${
                  active ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {act.label}
                {active && (
                  <span className="absolute -bottom-[22px] left-0 right-0 h-[2px] rounded-full bg-[#6c4fff] shadow-[0_0_8px_rgba(108,79,255,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Lang toggle only (theme is dark-only now) */}
        <div className="flex items-center gap-2">
          <LangToggle />
        </div>
      </div>
    </nav>
  );
}
