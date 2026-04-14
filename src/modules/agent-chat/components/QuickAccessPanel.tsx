'use client';

import { useT } from '@/i18n/LocaleContext';
import { BarChart2, Layers, ClipboardList, Activity, Key, Download, Zap } from 'lucide-react';
import type { Personality } from './PersonalityWizard';

interface QuickAccessPanelProps {
  agentName: string;
  personality: Personality;
  isZh: boolean;
  onShortcut?: (trigger: string) => void;
}

const STYLE_COLORS: Record<Personality['style'], string> = {
  professional: '#3B82F6',
  humorous: '#F59E0B',
  mentor: '#10B981',
  aggressive: '#EF4444',
};

const STYLE_GRADIENTS: Record<Personality['style'], string> = {
  professional: 'linear-gradient(135deg, #1e40af, #3B82F6)',
  humorous: 'linear-gradient(135deg, #d97706, #F59E0B)',
  mentor: 'linear-gradient(135deg, #065f46, #10B981)',
  aggressive: 'linear-gradient(135deg, #991b1b, #EF4444)',
};

export function QuickAccessPanel({ agentName, personality, isZh, onShortcut }: QuickAccessPanelProps) {
  const t = useT();
  const qc = t.agentChat.quickAccess as Record<string, string>;

  const color = STYLE_COLORS[personality.style];
  const gradient = STYLE_GRADIENTS[personality.style];

  // Market shortcut triggers (must match dialog.ts triggers)
  const shortcuts = [
    { icon: BarChart2, label: qc.market, hint: qc.marketHint, trigger: isZh ? '查看行情' : 'show market' },
    { icon: Layers, label: qc.positions, hint: qc.positionsHint, trigger: isZh ? '查看持仓' : 'show positions' },
    { icon: ClipboardList, label: qc.orders, hint: qc.ordersHint, trigger: isZh ? '查看委托' : 'show orders' },
    { icon: Activity, label: qc.activity, hint: qc.activityHint, trigger: isZh ? '查看活动' : 'show activity' },
  ];

  const links = [
    { icon: Key, label: qc.apikey },
    { icon: Download, label: qc.app },
    { icon: Zap, label: qc.pro },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Agent identity card */}
      <div
        className="rounded-2xl p-4 text-white space-y-2"
        style={{ background: gradient }}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-xl">
            🦞
          </div>
          <div>
            <div className="text-sm font-bold leading-tight">{agentName}</div>
            <div className="text-[11px] text-white/70">
              CWClaw · {isZh ? '在线' : 'Online'}
            </div>
          </div>
          <div className="ml-auto h-2 w-2 rounded-full bg-emerald-300 shadow-lg shadow-emerald-400/50" />
        </div>
      </div>

      {/* Quick shortcuts */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted px-1">
          {qc.title}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {shortcuts.map(({ icon: Icon, label, hint, trigger }) => (
            <button
              key={label}
              onClick={() => onShortcut?.(trigger)}
              title={hint}
              className="flex flex-col items-start gap-1.5 rounded-xl border border-border bg-white p-3 text-left hover:border-gray-300 hover:shadow-sm active:scale-95 transition-all"
            >
              <Icon size={14} style={{ color }} />
              <span className="text-xs font-medium text-ink">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Account links */}
      <div className="space-y-1.5 mt-auto">
        {links.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex w-full items-center gap-2.5 rounded-xl border border-border bg-white px-3 py-2.5 text-left hover:border-gray-300 transition-colors group"
          >
            <Icon size={13} className="text-muted group-hover:text-ink transition-colors" />
            <span className="text-xs font-medium text-muted group-hover:text-ink transition-colors flex-1">
              {label}
            </span>
            <span className="text-xs text-muted/50">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
