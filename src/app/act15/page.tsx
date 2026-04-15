'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import AgentChatroomBoard from '@/modules/agent-chatroom/AgentChatroomBoard';
import { useLocale } from '@/i18n/LocaleContext';
import { ChevronDown } from 'lucide-react';

function Act15Content() {
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  return (
    <>
      <AgentChatroomBoard />
      {/* Next act CTA */}
      <section className="border-t border-border bg-gray-50/60 px-6 py-10">
        <div className="flex justify-center">
          <a
            href="/act2"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-page px-5 py-2.5 text-sm font-medium text-ink shadow-sm transition-all hover:border-brand hover:text-brand hover:shadow-md"
          >
            {isZh ? 'Act II · 用到 →' : 'Act II · Use It →'}
            <ChevronDown size={16} />
          </a>
        </div>
      </section>
    </>
  );
}

export default function Act15Page() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16 min-h-screen bg-page">
        <Act15Content />
      </main>
      <ShellFooter />
    </>
  );
}
