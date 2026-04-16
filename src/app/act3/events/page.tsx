'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import { EventsBoard, Act3Nav } from '@/modules/ecosystem';

export default function EventsPage() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16 min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
          <Act3Nav />
          <EventsBoard />
        </div>
      </main>
      <ShellFooter />
    </>
  );
}
