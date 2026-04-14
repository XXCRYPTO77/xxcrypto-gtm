'use client';

import { useT } from '@/i18n/LocaleContext';
import { Card } from '@/components/primitives/Card';

const SCORE = 68;
const RADIUS = 50;
const STROKE = 10;
const CIRCUMFERENCE = Math.PI * RADIUS;

function getLabel(score: number, t: ReturnType<typeof useT>) {
  if (score <= 25) return t.sentiment.extreme_fear;
  if (score <= 45) return t.sentiment.fear;
  if (score <= 55) return t.sentiment.neutral;
  if (score <= 75) return t.sentiment.greed;
  return t.sentiment.extreme_greed;
}

export function SentimentGauge() {
  const t = useT();
  const offset = CIRCUMFERENCE - (SCORE / 100) * CIRCUMFERENCE;
  return (
    <Card variant="elevated" className="flex flex-col items-center">
      <h3 className="text-sm font-semibold text-ink mb-3">{t.sentiment.title}</h3>
      <svg width="120" height="72" viewBox="0 0 120 72">
        <defs>
          <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <path d={`M ${60 - RADIUS} 62 A ${RADIUS} ${RADIUS} 0 0 1 ${60 + RADIUS} 62`} fill="none" stroke="#e5e7eb" strokeWidth={STROKE} strokeLinecap="round" />
        <path d={`M ${60 - RADIUS} 62 A ${RADIUS} ${RADIUS} 0 0 1 ${60 + RADIUS} 62`} fill="none" stroke="url(#gauge-grad)" strokeWidth={STROKE} strokeLinecap="round" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset} />
        <text x="60" y="52" textAnchor="middle" className="text-2xl font-bold fill-ink">{SCORE}</text>
      </svg>
      <span className="text-sm font-medium text-accent-green mt-1">{getLabel(SCORE, t)}</span>
    </Card>
  );
}
