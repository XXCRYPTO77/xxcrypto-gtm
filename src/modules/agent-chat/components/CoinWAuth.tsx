'use client';

import { useEffect, useState } from 'react';
import { Check, Lock, Shield, User } from 'lucide-react';
import { useT } from '@/i18n/LocaleContext';

interface CoinWAuthProps {
  onNext: () => void;
}

type Stage = 'idle' | 'connecting' | 'generating' | 'done';

const MOCK_UID = '8847291';
const MOCK_KEY = 'cwsk_live_xK9p2mNvQ3rL7fTwY8dZhJ1cEu5';

export function CoinWAuth({ onNext }: CoinWAuthProps) {
  const t = useT();
  const c = t.agentChat.auth as Record<string, string>;
  const isZh = t.nav.cta === 'EN';

  const [stage, setStage] = useState<Stage>('idle');
  const [progress, setProgress] = useState(0);

  function startAuth() {
    setStage('connecting');
    setProgress(0);

    // Simulate OAuth flow
    setTimeout(() => {
      setStage('generating');
      setProgress(40);
    }, 1200);

    setTimeout(() => setProgress(70), 2200);

    setTimeout(() => {
      setProgress(100);
      setTimeout(() => setStage('done'), 300);
    }, 3200);
  }

  const steps = [
    { label: c.step1, done: stage !== 'idle' },
    { label: c.step2, done: stage === 'done' || progress >= 70 },
    { label: c.step3, done: stage === 'done' },
  ];

  return (
    <div className="mx-auto max-w-md space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-bold text-ink">{c.title}</h2>
        <p className="mt-1.5 text-sm text-muted leading-relaxed">{c.sub}</p>
      </div>

      {/* Security badge */}
      <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <Lock size={16} className="text-emerald-600 shrink-0" />
        <p className="text-xs text-emerald-700">{c.secNote}</p>
      </div>

      {/* Auth flow */}
      {stage === 'idle' ? (
        <button
          onClick={startAuth}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand py-4 text-sm font-semibold text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="text-xl">🦞</span>
          {c.bindBtn}
        </button>
      ) : (
        <div className="rounded-2xl border border-border bg-white p-5 space-y-5">
          {/* Steps progress */}
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 ${
                    s.done
                      ? 'bg-emerald-500 text-white'
                      : i === steps.findIndex((x) => !x.done)
                      ? 'border-2 border-brand bg-brand-soft text-brand animate-pulse'
                      : 'border border-border bg-gray-50 text-muted'
                  }`}
                >
                  {s.done ? <Check size={12} /> : i + 1}
                </div>
                <span
                  className={`text-sm transition-colors duration-300 ${
                    s.done ? 'text-ink font-medium' : 'text-muted'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          {stage !== 'done' && (
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted text-right">{progress}%</p>
            </div>
          )}

          {/* Done state — show credentials */}
          {stage === 'done' && (
            <div className="space-y-3 animate-in fade-in duration-500">
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <User size={13} className="text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">{c.done}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted w-8">{c.uid}</span>
                  <code className="text-xs font-mono text-ink bg-white rounded px-2 py-0.5 border border-emerald-200">
                    {MOCK_UID}
                  </code>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs text-muted w-8 shrink-0 mt-0.5">{isZh ? 'Key' : 'Key'}</span>
                  <code className="text-xs font-mono text-ink bg-white rounded px-2 py-0.5 border border-emerald-200 truncate flex-1">
                    {MOCK_KEY}
                  </code>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Shield size={12} className="text-muted" />
                <p className="text-xs text-muted">{c.keyLabel}</p>
              </div>

              <button
                onClick={onNext}
                className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                {c.next}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
