import React from 'react';

export interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated' | 'accent';
  className?: string;
  id?: string;
  children: React.ReactNode;
}

const VARIANT = {
  default:  'bg-page border border-border',
  outlined: 'bg-transparent border border-border',
  elevated: 'bg-page border border-border shadow-sm',
  accent:   'bg-brand-soft border border-brand-light',
};

export function Card({ variant = 'default', className = '', id, children }: CardProps) {
  return (
    <div
      id={id}
      className={`rounded-2xl p-6 transition-colors duration-150 ${VARIANT[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
