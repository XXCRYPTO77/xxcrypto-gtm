'use client';

import React, { useState } from 'react';
import { useT } from '../i18n/useT';

export function InstallBlock() {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(t.install.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-[1100px] px-8">
        <h2
          className="text-center font-black tracking-tight"
          style={{ fontSize: 'clamp(32px, 3.5vw, 45px)' }}
        >
          {t.install.title}
        </h2>

        <div className="mt-12 rounded-2xl border border-white/10 bg-[#0e0e12] shadow-[0_30px_80px_rgba(108,79,255,0.2)] overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#e95032]" />
            <span className="h-3 w-3 rounded-full bg-[#f5a623]" />
            <span className="h-3 w-3 rounded-full bg-[#14a739]" />
            <span className="ml-4 text-[11px] font-medium tracking-wider text-white/50">
              {t.install.terminalLabel}
            </span>
            <button
              onClick={handleCopy}
              className="ml-auto text-[11px] font-semibold text-white/60 hover:text-white transition"
            >
              {copied ? '✓ Copied' : '⧉ Copy'}
            </button>
          </div>
          {/* Command */}
          <div className="flex items-start gap-3 px-6 py-6 font-mono text-[16px]">
            <span className="text-[#6c4fff] font-bold">{t.install.prompt}</span>
            <span className="text-white whitespace-pre-wrap break-all">
              {t.install.command}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
