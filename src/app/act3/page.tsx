'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import EcosystemModule from '@/modules/ecosystem';
import { TransitionBand } from '@/shared/ui/TransitionBand';
import { useT } from '@/i18n/LocaleContext';

function Act3Content() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  return (
    <>
      <EcosystemModule />
      <TransitionBand
        band="band3"
        nextActLabel={isZh ? 'Act IV · 远景 →' : 'Act IV · Vision →'}
        nextActHref="/act4"
      />
    </>
  );
}

export default function Act3Page() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16 min-h-screen bg-[#08081a]">
        <Act3Content />
      </main>
      <ShellFooter />
    </>
  );
}
