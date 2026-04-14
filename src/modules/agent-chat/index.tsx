'use client';

import { useState } from 'react';
import { JourneyBar } from './components/JourneyBar';
import { AgentPreset } from './components/AgentPreset';
import { ChatInterface } from './components/ChatInterface';
import { ApiBinding } from './components/ApiBinding';
import { TradeExecution } from './components/TradeExecution';
import { useT } from '@/i18n/LocaleContext';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

// Step 1 (SkillDiscovery) and Step 6 (TradeSummary) are built by Airy.
// Lazy-load to avoid import errors if they don't exist yet.
let SkillDiscovery: React.ComponentType<{ onNext: () => void }> | null = null;
let TradeSummary: React.ComponentType<{ onNext: () => void }> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  SkillDiscovery = require('./components/SkillDiscovery').SkillDiscovery;
} catch { /* not yet delivered */ }
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  TradeSummary = require('./components/TradeSummary').default;
} catch { /* not yet delivered */ }

export default function AgentChatModule() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  const [step, setStep] = useState<Step>(1);
  const [maxStep, setMaxStep] = useState<Step>(1);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  function goTo(s: Step) {
    setStep(s);
    if (s > maxStep) setMaxStep(s);
  }

  function next() {
    goTo(Math.min(step + 1, 6) as Step);
  }

  function handleAgentSelect(id: string) {
    setSelectedAgent(id);
    goTo(3);
  }

  function handleStepClick(s: number) {
    // Only allow navigating to already-visited steps
    if (s <= maxStep) goTo(s as Step);
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <JourneyBar current={step} maxVisited={maxStep} onStepClick={handleStepClick} />

      <div className="mt-8">
        {/* Step 1 — Skill Discovery (Airy) */}
        {step === 1 && (
          SkillDiscovery
            ? <SkillDiscovery onNext={next} />
            : <SkillDiscoveryPlaceholder onNext={next} isZh={isZh} />
        )}

        {/* Step 2 — Pick Agent (Airy, existing) */}
        {step === 2 && (
          <AgentPreset selected={selectedAgent} onSelect={handleAgentSelect} />
        )}

        {/* Step 3 — Bind API (F) */}
        {step === 3 && (
          <ApiBinding onNext={next} onBack={() => goTo(2)} />
        )}

        {/* Step 4 — First Chat (Airy, existing + enhanced) */}
        {step === 4 && (
          <div>
            <button
              onClick={() => goTo(3)}
              className="mb-4 text-sm text-brand hover:underline"
            >
              ← {isZh ? '返回' : 'Back'}
            </button>
            <ChatInterface onTrade={() => goTo(5)} />
          </div>
        )}

        {/* Step 5 — Execute Trade (F) */}
        {step === 5 && (
          <TradeExecution onNext={next} onBack={() => goTo(4)} />
        )}

        {/* Step 6 — Trade Summary (Airy) */}
        {step === 6 && (
          TradeSummary
            ? <TradeSummary onNext={() => { setStep(1); setMaxStep(1); setSelectedAgent(null); }} />
            : <TradeSummaryPlaceholder onNext={() => { setStep(1); setMaxStep(1); setSelectedAgent(null); }} isZh={isZh} />
        )}
      </div>
    </section>
  );
}

// ── Placeholders (removed when Airy delivers) ────────────────────────────────

function SkillDiscoveryPlaceholder({ onNext, isZh }: { onNext: () => void; isZh: boolean }) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <div className="h-16 w-16 rounded-2xl bg-brand-soft flex items-center justify-center text-3xl">🔍</div>
      <div>
        <h2 className="text-2xl font-bold text-ink mb-2">
          {isZh ? '发现可用 Skills' : 'Discover Available Skills'}
        </h2>
        <p className="text-muted max-w-md">
          {isZh
            ? '18 项核心能力覆盖信息、交易、认证、平台四个维度。（组件开发中）'
            : '18 core capabilities across Info, Trade, Auth, and Platform. (Component in development)'}
        </p>
      </div>
      <button
        onClick={onNext}
        className="rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
      >
        {isZh ? '选择 Agent →' : 'Pick an Agent →'}
      </button>
    </div>
  );
}

function TradeSummaryPlaceholder({ onNext, isZh }: { onNext: () => void; isZh: boolean }) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <div className="h-16 w-16 rounded-2xl bg-green-50 flex items-center justify-center text-3xl">✅</div>
      <div>
        <h2 className="text-2xl font-bold text-ink mb-2">
          {isZh ? '交易完成，复盘中' : 'Trade Complete — Review'}
        </h2>
        <p className="text-muted max-w-md">
          {isZh ? '今日 PnL: +$1,247 (+2.91%)（复盘 dashboard 开发中）' : 'Today PnL: +$1,247 (+2.91%) (Dashboard in development)'}
        </p>
      </div>
      <button
        onClick={onNext}
        className="rounded-xl border border-border bg-white px-6 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand transition-colors"
      >
        {isZh ? '重新开始' : 'Start Over'}
      </button>
    </div>
  );
}
