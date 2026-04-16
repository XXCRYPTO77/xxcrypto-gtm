'use client';

import React from 'react';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Capabilities } from './components/Capabilities';
import { WhyAgentX } from './components/WhyAgentX';
import { LandingFooter } from './components/LandingFooter';

export function LandingModule() {
  return (
    <section>
      <Hero />
      <HowItWorks />
      <Capabilities />
      <WhyAgentX />
      <LandingFooter />
    </section>
  );
}

export default LandingModule;
