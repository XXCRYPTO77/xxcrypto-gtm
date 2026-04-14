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
  const activeAct = pathname.startsWith('/act1')
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
    { id: 'act1', label: 'Act I', href: '/act1' },
    { id: 'act2', label: 'Act II', href: '/act2' },
    { id: 'act3', label: 'Act III', href: '/act3' },
    { id: 'act4', label: 'Act IV', href: '/act4' },
    { id: 'skills', label: 'Skills', href: '/skills' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: Brand + Back Arrow */}
        <div className="flex items-center gap-2">
          {isSubpage && (
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded p-1 hover:bg-gray-100"
              aria-label="Back to home"
            >
              <ArrowLeft size={16} className="text-gray-600" />
            </Link>
          )}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5227FF] font-bold text-white">
              C
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-bold text-gray-900">CoinW Agent Skill</span>
            </span>
          </Link>
        </div>

        {/* Center: Act Links */}
        <div className="hidden items-center gap-8 md:flex">
          {acts.map((act) => (
            <Link
              key={act.id}
              href={act.href}
              className={`text-sm font-medium transition-colors ${
                activeAct === act.id
                  ? 'text-[#5227FF]'
                  : 'text-gray-600 hover:text-[#5227FF]'
              }`}
            >
              {act.label}
            </Link>
          ))}
        </div>

        {/* Right: LangToggle */}
        <div className="flex items-center gap-3">
          <LangToggle />
        </div>
      </div>
    </nav>
  );
}
