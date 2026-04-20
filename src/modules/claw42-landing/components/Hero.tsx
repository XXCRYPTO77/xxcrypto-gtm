'use client';

import React from 'react';
import { useT } from '../i18n/useT';

export function Hero() {
  const t = useT();
  const h = t.hero;

  return (
    <section className="relative overflow-hidden pt-28 pb-36 text-white">
      {/* Purple glow backdrop */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 35%, rgba(108,79,255,0.45) 0%, rgba(60,29,180,0.25) 40%, rgba(0,0,0,0.9) 75%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[520px] -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 50% 100%, rgba(82,39,255,0.45) 0%, transparent 60%)',
        }}
      />

      <div className="mx-auto max-w-[1100px] px-8 flex flex-col items-center text-center">
        {/* 3D visual: robot + planet + coins — SVG/CSS composition */}
        <HeroVisual />

        {/* Invite pill */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/10 px-4 py-1.5 text-xs font-semibold text-white/90">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#d1ff55]" />
          {h.pill}
        </div>

        <h1
          className="mt-6 font-black leading-[1.1] tracking-tight"
          style={{ fontSize: 'clamp(40px, 5vw, 57px)' }}
        >
          {h.title}
        </h1>

        <p className="mt-6 max-w-[780px] text-[16px] leading-[1.7] text-white/70">
          {h.subtitle}
        </p>

        <div className="mt-10 flex items-center gap-4">
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-black hover:bg-white/90 transition"
          >
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[11px] font-medium text-black/60">{h.ctaPrimarySub}</span>
              <span>{h.ctaPrimary}</span>
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
          >
            {h.ctaSecondary}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  // Layered composition: glowing planet ring, floating coins, 3D-ish robot head.
  return (
    <div className="relative mt-4 h-[320px] w-full max-w-[720px]">
      {/* Planet ring */}
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 h-[260px] w-[560px] rounded-full border border-white/10"
           style={{ transform: 'translate(-50%,-50%) rotateX(65deg)', boxShadow: '0 0 60px rgba(108,79,255,0.45)' }} />
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 h-[220px] w-[480px] rounded-full border border-[#6c4fff]/40"
           style={{ transform: 'translate(-50%,-50%) rotateX(65deg)' }} />

      {/* BTC coin */}
      <FloatingCoin className="left-[18%] top-[18%]" symbol="₿" color="#f7931a" />
      {/* ETH coin */}
      <FloatingCoin className="right-[20%] top-[12%]" symbol="Ξ" color="#627eea" />
      {/* USDT coin */}
      <FloatingCoin className="right-[10%] bottom-[24%]" symbol="₮" color="#26a17b" small />

      {/* Robot */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
        <RobotHead />
      </div>
    </div>
  );
}

function FloatingCoin({
  className = '',
  symbol,
  color,
  small,
}: { className?: string; symbol: string; color: string; small?: boolean }) {
  const size = small ? 54 : 76;
  return (
    <div
      className={`absolute flex items-center justify-center rounded-full font-black ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color} 0%, ${color}cc 60%, #000 100%)`,
        color: '#fff',
        fontSize: small ? 26 : 36,
        boxShadow: `0 8px 28px ${color}55, inset 0 1px 0 rgba(255,255,255,0.4)`,
        border: '2px solid rgba(255,255,255,0.15)',
      }}
    >
      {symbol}
    </div>
  );
}

function RobotHead() {
  return (
    <svg width="180" height="200" viewBox="0 0 180 200" aria-hidden="true">
      <defs>
        <linearGradient id="robotBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f5f7" />
          <stop offset="55%" stopColor="#b8b8c4" />
          <stop offset="100%" stopColor="#5a5a68" />
        </linearGradient>
        <linearGradient id="robotFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a22" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
      {/* antenna */}
      <circle cx="90" cy="20" r="6" fill="#6c4fff" />
      <line x1="90" y1="26" x2="90" y2="40" stroke="#6c4fff" strokeWidth="3" />
      {/* head */}
      <rect x="30" y="38" width="120" height="110" rx="24" fill="url(#robotBody)" stroke="rgba(255,255,255,0.3)" />
      {/* face */}
      <rect x="46" y="56" width="88" height="62" rx="16" fill="url(#robotFace)" />
      {/* eyes */}
      <circle cx="72" cy="88" r="8" fill="#6c4fff">
        <animate attributeName="opacity" values="1;0.5;1" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="108" cy="88" r="8" fill="#6c4fff">
        <animate attributeName="opacity" values="1;0.5;1" dur="2.8s" repeatCount="indefinite" />
      </circle>
      {/* mouth */}
      <rect x="76" y="104" width="28" height="6" rx="3" fill="#6c4fff" opacity="0.7" />
      {/* neck / body base */}
      <rect x="66" y="148" width="48" height="22" rx="6" fill="#7a7a88" />
      <rect x="52" y="166" width="76" height="20" rx="10" fill="url(#robotBody)" />
    </svg>
  );
}
