'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import VisionModule from '@/modules/vision';

export default function Act4Page() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16 min-h-screen bg-page">
        {/* Act header */}
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-6">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-mono font-semibold text-muted">
              ACT IV · v2.0+
            </span>
          </div>
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">远景规划</h1>
        </div>

        <VisionModule />
      </main>
      <ShellFooter />
    </>
  );
}
