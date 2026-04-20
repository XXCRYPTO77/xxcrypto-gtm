'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import VisionModule from '@/modules/vision';

export default function Act4Page() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16 min-h-screen bg-page">
        <VisionModule />
      </main>
      <ShellFooter />
    </>
  );
}
