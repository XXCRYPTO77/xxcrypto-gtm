'use client';

import React from 'react';

interface ClawMarkProps {
  size?: number;
  className?: string;
}

/**
 * Claw 42 mascot — stylized dual-pincer crab glyph.
 * Pure inline SVG, purple→cyan gradient fill with a soft radial halo
 * behind it and a subtle float animation.
 */
export function ClawMark({ size = 128, className = '' }: ClawMarkProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Claw 42"
      style={{ animation: 'cw-float 6s ease-in-out infinite' }}
    >
      <defs>
        <radialGradient id="clawHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6c4fff" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#6c4fff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#6c4fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="clawGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8a6ff" />
          <stop offset="55%" stopColor="#6c4fff" />
          <stop offset="100%" stopColor="#4bc9ff" />
        </linearGradient>
        <linearGradient id="clawBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a6fff" />
          <stop offset="100%" stopColor="#6c4fff" />
        </linearGradient>
        <filter id="clawGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Halo */}
      <circle cx="100" cy="100" r="92" fill="url(#clawHalo)" />

      <g filter="url(#clawGlowFilter)">
        {/* Left pincer */}
        <path
          d="M58 72 C48 66, 38 72, 36 86 C34 100, 42 112, 56 116 L70 120 C82 122, 90 116, 92 104 L92 96 C92 86, 86 80, 78 78 Z"
          fill="url(#clawGrad)"
          opacity="0.95"
        />
        {/* Left pincer inner line */}
        <path
          d="M62 92 C58 90, 54 92, 54 98 C54 104, 58 106, 64 106"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Right pincer (mirror) */}
        <path
          d="M142 72 C152 66, 162 72, 164 86 C166 100, 158 112, 144 116 L130 120 C118 122, 110 116, 108 104 L108 96 C108 86, 114 80, 122 78 Z"
          fill="url(#clawGrad)"
          opacity="0.95"
        />
        <path
          d="M138 92 C142 90, 146 92, 146 98 C146 104, 142 106, 136 106"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Central body */}
        <ellipse cx="100" cy="118" rx="28" ry="22" fill="url(#clawBody)" />
        {/* Body highlight */}
        <ellipse cx="92" cy="110" rx="10" ry="5" fill="rgba(255,255,255,0.35)" />

        {/* Eyes */}
        <circle cx="90" cy="116" r="3.2" fill="#fff" />
        <circle cx="110" cy="116" r="3.2" fill="#fff" />
        <circle cx="90" cy="116" r="1.4" fill="#0b0b14" />
        <circle cx="110" cy="116" r="1.4" fill="#0b0b14" />

        {/* Antennae (with connecting arms from body to pincers) */}
        <path
          d="M82 106 Q70 92 62 88"
          fill="none"
          stroke="url(#clawBody)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M118 106 Q130 92 138 88"
          fill="none"
          stroke="url(#clawBody)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Sparkle */}
        <circle cx="150" cy="60" r="2" fill="#d1ff55" opacity="0.9" />
        <circle cx="54" cy="56" r="1.5" fill="#4bc9ff" opacity="0.8" />
        <circle cx="160" cy="130" r="1.5" fill="#b8a6ff" opacity="0.8" />
      </g>

      {/* Online dot */}
      <circle cx="156" cy="150" r="9" fill="#0b0b14" />
      <circle cx="156" cy="150" r="6" fill="#22c55e">
        <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default ClawMark;
