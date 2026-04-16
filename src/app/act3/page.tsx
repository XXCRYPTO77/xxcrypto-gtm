'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import { HubBoard } from '@/modules/ecosystem';
import { TransitionBand } from '@/shared/ui/TransitionBand';
import { useT } from '@/i18n/LocaleContext';

function Act3HubContent() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  return (
    <>
      <HubBoard />
      <div className="mt-16">
        <TransitionBand
          band="band3"
          nextActLabel={isZh ? 'Act IV \u00B7 \u8FDC\u666F \u2192' : 'Act IV \u00B7 Vision \u2192'}
          nextActHref="/act4"
        />
      </div>
    </>
  );
}

export default function Act3Page() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16 min-h-screen bg-page">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
          <Act3HubContent />
        </div>
      </main>
      <ShellFooter />
    </>
  );
}
