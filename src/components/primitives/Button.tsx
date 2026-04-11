'use client';

import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: Variant;
  size?: Size;
  href?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-med active:bg-brand shadow-sm',
  secondary:
    'bg-brand-soft text-brand hover:bg-brand-light active:bg-brand-light',
  ghost:
    'bg-transparent text-ink hover:bg-gray-50 active:bg-gray-100 border border-border',
};

const SIZE: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm rounded-md',
  md: 'h-11 px-6 text-base rounded-lg',
  lg: 'h-14 px-8 text-lg rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  fullWidth,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const cn = [
    'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    VARIANT[variant],
    SIZE[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a href={href} className={cn} role="button">
        {children}
      </a>
    );
  }
  return (
    <button className={cn} {...rest}>
      {children}
    </button>
  );
}
