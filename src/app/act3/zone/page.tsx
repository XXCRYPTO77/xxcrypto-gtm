'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import { AgentZoneBoard } from '@/modules/ecosystem';

export default function AgentZonePage() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16 min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
          <AgentZoneBoard />
        </div>
      </main>
      <ShellFooter />
    </>
  );
}
