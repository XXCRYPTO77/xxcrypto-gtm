'use client';

import { useState } from 'react';
import { JourneyBar } from './components/JourneyBar';
import { CWClawLanding } from './components/CWClawLanding';
import { CoinWAuth } from './components/CoinWAuth';
import { PersonalityWizard, type Personality } from './components/PersonalityWizard';
import { AgentNaming } from './components/AgentNaming';
import { ChatInterface } from './components/ChatInterface';

// TradeSummary delivered by Airy — lazy-load to avoid import errors if absent
let TradeSummary: React.ComponentType<{ agentName: string; onNext: () => void }> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  TradeSummary = require('./components/TradeSummary').default;
} catch { /* not yet delivered */ }

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const DEFAULT_PERSONALITY: Personality = {
  style: 'professional',
  preference: 'mainstream',
  frequency: 'onDemand',
};

export default function AgentChatModule() {
  const [step, setStep] = useState<Step>(1);
  const [maxStep, setMaxStep] = useState<Step>(1);

  // State accumulated through onboarding
  const [personality, setPersonality] = useState<Personality>(DEFAULT_PERSONALITY);
  const [agentName, setAgentName] = useState<string>('Claw 42');

  function goTo(s: Step) {
    setStep(s);
    if (s > maxStep) setMaxStep(s);
  }

  function handleStepClick(s: number) {
    if (s <= maxStep) goTo(s as Step);
  }

  function reset() {
    setStep(1);
    setMaxStep(1);
    setPersonality(DEFAULT_PERSONALITY);
    setAgentName('Claw 42');
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <JourneyBar current={step} maxVisited={maxStep} onStepClick={handleStepClick} />

      <div className="mt-8">
        {/* Step 1 — Landing: CWClaw hero + brand intro */}
        {step === 1 && (
          <CWClawLanding onNext={() => goTo(2)} />
        )}

        {/* Step 2 — Auth: CoinW OAuth + auto API key generation */}
        {step === 2 && (
          <CoinWAuth onNext={() => goTo(3)} />
        )}

        {/* Step 3 — Personality Wizard: style → preference → frequency */}
        {step === 3 && (
          <PersonalityWizard
            onComplete={(p) => {
              setPersonality(p);
              goTo(4);
            }}
            onBack={() => goTo(2)}
          />
        )}

        {/* Step 4 — Naming: give CWClaw a name, avatar shows personality color */}
        {step === 4 && (
          <AgentNaming
            personality={personality}
            onComplete={(name) => {
              setAgentName(name);
              goTo(5);
            }}
            onBack={() => goTo(3)}
          />
        )}

        {/* Step 5 — Chat: full interface with QuickAccessPanel sidebar */}
        {step === 5 && (
          <ChatInterface
            agentName={agentName}
            personality={personality}
            onTrade={() => goTo(6)}
          />
        )}

        {/* Step 6 — Trade Summary (Airy's TradeSummary, fallback if absent) */}
        {step === 6 && (
          TradeSummary
            ? <TradeSummary agentName={agentName} onNext={reset} />
            : <TradeSummaryFallback agentName={agentName} onNext={reset} />
        )}
      </div>
    </section>
  );
}

// ── Fallback (shown until Airy updates TradeSummary to accept agentName prop) ─

function TradeSummaryFallback({ agentName, onNext }: { agentName: string; onNext: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <div className="h-16 w-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl">✅</div>
      <div>
        <h2 className="text-2xl font-bold text-ink mb-2">{agentName} 今天的表现</h2>
        <p className="text-muted max-w-md">今日 PnL: +$1,247 (+2.91%)</p>
      </div>
      <button
        onClick={onNext}
        className="rounded-xl border border-border bg-white px-6 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand transition-colors"
      >
        重新开始
      </button>
    </div>
  );
}
