'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import { ArenaBoard } from '@/modules/ecosystem';

export default function ArenaPage() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16 min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
          <ArenaBoard />
        </div>
      </main>
      <ShellFooter />
    </>
  );
}
