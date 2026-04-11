import React from 'react';
import { Badge } from './Badge';

export interface SectionHeaderProps {
  eyebrow?: string;
  version?: string;
  depth?: 'S' | 'A' | 'B' | string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  id?: string;
}

export function SectionHeader({
  eyebrow,
  version,
  depth,
  title,
  lede,
  align = 'left',
  id,
}: SectionHeaderProps) {
  const alignCn = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const depthTone =
    depth === 'S' ? 'deepS' : depth === 'A' ? 'deepA' : depth === 'B' ? 'deepB' : 'neutral';

  return (
    <header id={id} className={`flex flex-col gap-5 ${alignCn}`}>
      <div className="flex flex-wrap items-center gap-3">
        {version && (
          <span className="text-sm font-mono font-semibold text-brand">{version}</span>
        )}
        {depth && <Badge tone={depthTone as 'deepS' | 'deepA' | 'deepB'}>{depth}</Badge>}
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            {eyebrow}
          </span>
        )}
      </div>
      <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className={`max-w-3xl text-base leading-relaxed text-muted sm:text-lg ${align === 'center' ? 'mx-auto' : ''}`}>
          {lede}
        </p>
      )}
    </header>
  );
}
