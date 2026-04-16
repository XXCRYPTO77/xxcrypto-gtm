'use client';

import React from 'react';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { HowItWorks } from './components/HowItWorks';
import { Capabilities } from './components/Capabilities';
import { WhyAgentX } from './components/WhyAgentX';
import { FAQ } from './components/FAQ';
import { LandingFooter } from './components/LandingFooter';

export function LandingModule() {
  return (
    <section>
      <Hero />
      <TrustSection />
      <HowItWorks />
      <Capabilities />
      <WhyAgentX />
      <FAQ />
      <LandingFooter />
    </section>
  );
}

export default LandingModule;
