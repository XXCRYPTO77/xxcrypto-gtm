'use client';

import React from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { ExternalLink } from 'lucide-react';

export function LandingFooter() {
  const t = useLandingT();

  return (
    <footer className="border-t border-border py-10 bg-page">
      <div className="mx-auto max-w-7xl px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {/* Left: Brand + Copyright */}
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand font-bold text-white text-xs">
            X
          </span>
          <span className="text-sm text-muted">{t.footer.copyright}</span>
        </div>

        {/* Right: GitHub link */}
        <a
          href="https://github.com/AgentX-Trading"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors"
        >
          <ExternalLink size={14} />
          {t.footer.github}
        </a>
      </div>
    </footer>
  );
}
