'use client';

import React from 'react';

/**
 * Claw 42 wordmark — mirrors the Figma logo weight (Satoshi 900, tracked slightly tight).
 * Keeps the brand unified across Navbar + Footer.
 */
export function Claw42Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const px = size === 'lg' ? 32 : size === 'sm' ? 22 : 26;
  return (
    <span
      className="font-[var(--font-en)] font-black tracking-tight text-white select-none inline-flex items-center gap-[0.35em]"
      style={{ fontSize: px, lineHeight: 1 }}
    >
      <span className="inline-flex w-[1em] h-[1em] items-center justify-center rounded-[0.25em] bg-gradient-to-br from-[#6c4fff] to-[#3f1fff] shadow-[0_0_18px_rgba(108,79,255,0.55)]">
        <svg viewBox="0 0 24 24" width="0.7em" height="0.7em" aria-hidden="true">
          {/* Stylised claw / 42 glyph */}
          <path
            d="M6 4c3 0 5 2 5 5v6H8V9c0-1-1-2-2-2V4zm7 0c3 0 5 2 5 5v11h-3v-5h-4V9c0-3 1-5 2-5z"
            fill="#fff"
            opacity="0.95"
          />
        </svg>
      </span>
      <span>Claw&nbsp;42</span>
    </span>
  );
}
