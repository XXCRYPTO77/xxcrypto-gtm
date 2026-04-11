import React from 'react';

type Tone = 'brand' | 'neutral' | 'success' | 'warning' | 'deepS' | 'deepA' | 'deepB';

const TONE: Record<Tone, string> = {
  brand:   'bg-brand-soft text-brand border-brand-light',
  neutral: 'bg-gray-50 text-gray-700 border-border',
  success: 'bg-[color:var(--accent-green)]/10 text-[color:var(--accent-green)] border-[color:var(--accent-green)]/20',
  warning: 'bg-[color:var(--accent-amber)]/10 text-[color:var(--accent-amber)] border-[color:var(--accent-amber)]/20',
  deepS:   'bg-brand text-white border-brand',
  deepA:   'bg-brand-light text-brand border-brand-light',
  deepB:   'bg-gray-100 text-gray-700 border-gray-200',
};

export interface BadgeProps {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ tone = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
