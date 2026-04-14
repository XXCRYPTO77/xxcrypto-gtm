'use client';

import { useEffect, useState } from 'react';
import { Loader2, Check } from 'lucide-react';
import { getSkill } from '../data/skills';

interface ToolCallBubbleProps {
  label: string;
  skillCodes: string[];
  durationMs: number;
  isZh: boolean;
  onDone?: () => void;
}

export function ToolCallBubble({ label, skillCodes, durationMs, isZh, onDone }: ToolCallBubbleProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      onDone?.();
    }, durationMs);
    return () => clearTimeout(t);
  }, [durationMs, onDone]);

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-white px-4 py-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted">
          {done ? (
            <Check className="h-3.5 w-3.5 text-green-600" />
          ) : (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
          )}
          <span>{done ? (isZh ? '完成' : 'Done') : isZh ? '调用中' : 'Running'}</span>
          <span className="text-ink">· {label}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {skillCodes.map((code) => {
            const skill = getSkill(code);
            if (!skill) return null;
            return (
              <span
                key={code}
                className="inline-flex items-center gap-1 rounded-md bg-brand-soft px-2 py-0.5 text-[11px] font-mono text-brand"
              >
                <span className="font-semibold">{code}</span>
                <span className="font-sans">{isZh ? skill.name : skill.nameEn}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
