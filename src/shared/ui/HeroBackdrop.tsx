'use client';

import React from 'react';

interface HeroBackdropProps {
  /**
   * `default` → same intensity as Overview hero.
   * `intense` → stronger glow, use for heavier hero sections.
   * `subtle`  → lighter, for interior headers.
   */
  variant?: 'default' | 'intense' | 'subtle';
  /** Extra content to render inside the backdrop layer (e.g. extra glows). */
  children?: React.ReactNode;
}

/**
 * Shared hero backdrop — reproduces the Overview hero look:
 *   • Radial purple glow centered top
 *   • Faint grid overlay with top-biased mask
 *
 * Drop inside a `<section className="relative overflow-hidden">` wrapper.
 * The backdrop itself is `absolute inset-0` and pointer-events-none.
 */
export function HeroBackdrop({ variant = 'default', children }: HeroBackdropProps) {
  const glowHeight =
    variant === 'intense' ? 720 : variant === 'subtle' ? 420 : 620;
  const glowWidth =
    variant === 'intense' ? 1200 : variant === 'subtle' ? 800 : 1000;
  const glowOpacity =
    variant === 'intense' ? 0.5 : variant === 'subtle' ? 0.25 : 0.4;
  const gridOpacity =
    variant === 'intense' ? 0.06 : variant === 'subtle' ? 0.035 : 0.05;

  return (
    <>
      {/* Radial purple glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          height: `${glowHeight}px`,
          width: `${glowWidth}px`,
          opacity: glowOpacity,
          background: 'radial-gradient(circle, #6c4fff 0%, transparent 70%)',
        }}
      />
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: gridOpacity,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at top, black 30%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at top, black 30%, transparent 70%)',
        }}
      />
      {children}
    </>
  );
}

export default HeroBackdrop;
