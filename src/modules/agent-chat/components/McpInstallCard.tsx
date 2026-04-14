'use client';

import { Link2, Shield, Zap, Package } from 'lucide-react';

interface McpInstallPayload {
  endpoint: string;
  skillCount: number;
  authMethod: string;
  latency: string;
  status: string;
  nextActions: { zh: string; en: string }[];
}

interface Props {
  payload: McpInstallPayload;
  isZh: boolean;
}

export function McpInstallCard({ payload, isZh }: Props) {
  const labels = isZh
    ? { title: 'MCP 接入完成', endpoint: '服务端点', skills: 'Skills 数量', auth: '鉴权', latency: '握手延迟', nextTry: '现在可以试试' }
    : { title: 'MCP Connected', endpoint: 'Endpoint', skills: 'Skills', auth: 'Auth', latency: 'Handshake', nextTry: 'Try now' };

  return (
    <div className="flex justify-start">
      <div className="w-full max-w-[85%] rounded-2xl border-2 border-brand/30 bg-brand-soft/40 p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 border-b border-brand/20 pb-2.5">
          <Link2 className="h-5 w-5 text-brand" />
          <div className="text-base font-semibold text-ink">{labels.title}</div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            {payload.status}
          </span>
        </div>

        <div className="mb-4 rounded-lg bg-white/60 p-3 font-mono text-xs text-ink">
          {payload.endpoint}
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          <Stat icon={<Package className="h-3.5 w-3.5" />} label={labels.skills} value={`${payload.skillCount}`} />
          <Stat icon={<Shield className="h-3.5 w-3.5" />} label={labels.auth} value={payload.authMethod} />
          <Stat icon={<Zap className="h-3.5 w-3.5" />} label={labels.latency} value={payload.latency} />
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold text-muted">{labels.nextTry}</div>
          <ul className="space-y-1 text-sm text-ink">
            {payload.nextActions.map((a, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-brand">→</span>
                <span>{isZh ? a.zh : a.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/60 p-2.5">
      <div className="mb-0.5 flex items-center gap-1 text-[11px] text-muted">
        {icon}
        {label}
      </div>
      <div className="text-xs font-semibold text-ink">{value}</div>
    </div>
  );
}
