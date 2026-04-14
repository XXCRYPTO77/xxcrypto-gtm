'use client';

import { useT } from '@/i18n/LocaleContext';

const STEP_KEYS = [
  'adopt', 'linkAccount', 'personality', 'naming', 'chat', 'review',
] as const;

interface JourneyBarProps {
  /** 1-indexed current step (1–6) */
  current: number;
  /** 1-indexed highest step the user has reached */
  maxVisited?: number;
  onStepClick?: (step: number) => void;
  /** @deprecated use onStepClick */
  onStep?: (i: number) => void;
}

export function JourneyBar({ current, maxVisited, onStepClick, onStep }: JourneyBarProps) {
  const t = useT();
  const max = maxVisited ?? current;

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {STEP_KEYS.map((key, i) => {
        const stepNum = i + 1; // 1-indexed
        const isPast = stepNum < current;
        const isCurrent = stepNum === current;
        const isClickable = stepNum <= max;

        let cls = 'bg-surface text-muted cursor-default';
        if (isPast) cls = 'bg-brand-soft text-brand cursor-pointer hover:opacity-80';
        if (isCurrent) cls = 'bg-brand text-white cursor-default';

        return (
          <button
            key={key}
            disabled={!isClickable}
            onClick={() => {
              if (!isClickable) return;
              onStepClick?.(stepNum);
              onStep?.(i); // backward compat
            }}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${cls}`}
          >
            {t.agentChat.journey[key]}
          </button>
        );
      })}
    </div>
  );
}
