'use client';

import { useT } from '@/i18n/LocaleContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ActDivider } from '@/components/layout/ActDivider';
import { Hero } from '@/components/features/Hero';
import { V10Section } from '@/components/features/V10Section';
import { V11Section } from '@/components/features/V11Section';
import { DeepBSection } from '@/components/features/DeepBSection';
import { V15Section } from '@/components/features/v15/V15Section';
import { SecuritySection } from '@/components/features/security/SecuritySection';
import { V20Section } from '@/components/features/V20Section';
import { ExtensionsSection } from '@/components/features/ExtensionsSection';

export default function Home() {
  const t = useT();
  return (
    <>
      <Navbar />
      <main className="bg-page text-ink">
        <Hero />

        <ActDivider
          id="act1"
          num={t.acts.act1.num}
          title={t.acts.act1.title}
          desc={t.acts.act1.desc}
        />
        <V10Section />
        <V11Section />

        <ActDivider
          id="act2"
          num={t.acts.act2.num}
          title={t.acts.act2.title}
          desc={t.acts.act2.desc}
        />
        <DeepBSection />

        <ActDivider
          id="act3"
          num={t.acts.act3.num}
          title={t.acts.act3.title}
          desc={t.acts.act3.desc}
        />
        <V15Section />
        <SecuritySection />
        <V20Section />
        <ExtensionsSection />
      </main>
      <Footer />
    </>
  );
}
