'use client';

import React, { useEffect } from 'react';
import { Claw42LocaleProvider } from './i18n/Provider';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InstallBlock } from './components/InstallBlock';
import { UseCases } from './components/UseCases';
import { WhyAgent } from './components/WhyAgent';
import { Ecosystem } from './components/Ecosystem';
import { ThreeSteps } from './components/ThreeSteps';
import { Disclaimer } from './components/Disclaimer';
import { Footer } from './components/Footer';

export default function Claw42LandingModule() {
  // Force dark theme for the Claw 42 landing — matches Figma v3.
  useEffect(() => {
    const el = document.documentElement;
    const had = el.classList.contains('cw-dark');
    el.classList.add('cw-dark');
    return () => {
      if (!had) el.classList.remove('cw-dark');
    };
  }, []);

  return (
    <Claw42LocaleProvider>
      <div className="min-h-screen bg-black text-white font-[var(--font-sans)]">
        <Navbar />
        <main className="pt-16">
          <Hero />
          <InstallBlock />
          <UseCases />
          <WhyAgent />
          <Ecosystem />
          <ThreeSteps />
          <Disclaimer />
        </main>
        <Footer />
      </div>
    </Claw42LocaleProvider>
  );
}
