'use client';

import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CopyBlockProps {
  code: string;
  label?: string;
  note?: string;
  copiedLabel?: string;
}

export function CopyBlock({ code, label = 'Copy', note, copiedLabel = 'Copied' }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }, [code]);

  return (
    <div className="group rounded-2xl border border-border bg-gray-900 p-4 text-white shadow-sm">
      {note && <p className="mb-2 text-xs text-gray-300">{note}</p>}
      <div className="flex items-center justify-between gap-4">
        <code className="block flex-1 overflow-x-auto font-mono text-sm text-brand-light">
          {code}
        </code>
        <button
          onClick={onCopy}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label={label}
        >
          {copied ? (
            <>
              <Check size={14} /> {copiedLabel}
            </>
          ) : (
            <>
              <Copy size={14} /> {label}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
