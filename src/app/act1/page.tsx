'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import LandingModule from '@/modules/landing';
import { TransitionBand } from '@/shared/ui/TransitionBand';
import { useT } from '@/i18n/LocaleContext';

function Act1Content() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  return (
    <>
      <LandingModule />
      <TransitionBand
        band="band1"
        nextActLabel={isZh ? 'Act II · 用到 →' : 'Act II · Use It →'}
        nextActHref="/act2"
      />
    </>
  );
}

export default function Act1Page() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16">
        <Act1Content />
      </main>
      <ShellFooter />
    </>
  );
}
