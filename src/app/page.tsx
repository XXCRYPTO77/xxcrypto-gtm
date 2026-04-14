'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import Overview from '@/shell/Overview';

export default function Home() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16">
        <Overview />
      </main>
      <ShellFooter />
    </>
  );
}
