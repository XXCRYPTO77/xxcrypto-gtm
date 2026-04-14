'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import AgentChatModule from '@/modules/agent-chat';
import { CompanionCapabilities } from '@/modules/agent-chat/components/CompanionCapabilities';
import { TransitionBand } from '@/shared/ui/TransitionBand';
import { useT } from '@/i18n/LocaleContext';

function Act2Content() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  return (
    <>
      <AgentChatModule />
      <CompanionCapabilities />
      <TransitionBand
        band="band2"
        nextActLabel={isZh ? 'Act III · 生态 →' : 'Act III · Ecosystem →'}
        nextActHref="/act3"
      />
    </>
  );
}

export default function Act2Page() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16 min-h-screen bg-page">
        <Act2Content />
      </main>
      <ShellFooter />
    </>
  );
}
