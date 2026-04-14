'use client';

import { useState } from 'react';
import { Check, Copy, Shield, AlertTriangle } from 'lucide-react';
import { useT } from '@/i18n/LocaleContext';

interface ApiBindingProps {
  onNext: () => void;
  onBack?: () => void;
}

type PermLevel = 'read' | 'spot' | 'futures' | 'full';

const PERMS_ZH: Array<{ level: PermLevel; label: string; desc: string; badge: string }> = [
  { level: 'read', label: '只读', desc: '查看行情和持仓，不能交易', badge: '最安全' },
  { level: 'spot', label: '现货', desc: '查询 + 现货下单/撤单', badge: '推荐' },
  { level: 'futures', label: '合约', desc: '现货权限 + 合约下单/撤单', badge: '' },
  { level: 'full', label: '完整', desc: '全部权限（含划转，不含提现）', badge: '谨慎' },
];

const PERMS_EN: Array<{ level: PermLevel; label: string; desc: string; badge: string }> = [
  { level: 'read', label: 'Read', desc: 'View market data and positions only', badge: 'Safest' },
  { level: 'spot', label: 'Spot', desc: 'Read + spot order placement and cancellation', badge: 'Recommended' },
  { level: 'futures', label: 'Futures', desc: 'Spot permissions + futures trading', badge: '' },
  { level: 'full', label: 'Full', desc: 'All permissions including transfers (no withdrawal)', badge: 'Careful' },
];

const CONSTRAINTS_ZH = [
  '禁止提现（硬红线，不可修改）',
  '频率限制 100 次/分钟（防滥用）',
  '单笔上限 $10,000（可在账户设置调整）',
];
const CONSTRAINTS_EN = [
  'Withdrawal disabled — hard lock, cannot be overridden',
  'Rate limit: 100 calls/min (abuse protection)',
  'Per-trade cap: $10,000 (adjustable in account settings)',
];

const MOCK_KEY = 'cwsk_live_xK9p2mNvQ3rL7fTwY8dZhJ1cEu5';

export function ApiBinding({ onNext, onBack }: ApiBindingProps) {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const perms = isZh ? PERMS_ZH : PERMS_EN;
  const constraints = isZh ? CONSTRAINTS_ZH : CONSTRAINTS_EN;

  const [selected, setSelected] = useState<PermLevel>('spot');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  function generate() {
    setGenerated(true);
  }

  function copy() {
    navigator.clipboard.writeText(MOCK_KEY).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {onBack && (
        <button onClick={onBack} className="text-sm text-brand hover:underline">
          ← {isZh ? '返回' : 'Back'}
        </button>
      )}

      <div>
        <h2 className="text-2xl font-bold text-ink mb-1">
          {isZh ? '绑定 API Key' : 'Connect API Key'}
        </h2>
        <p className="text-sm text-muted">
          {isZh
            ? 'Agent 需要一个 API Key 才能访问你的账户。选择权限级别，系统帮你生成。'
            : 'The Agent needs an API Key to access your account. Pick a permission level and we generate it for you.'}
        </p>
      </div>

      {/* Permission selector */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          {isZh ? '权限级别' : 'Permission Level'}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {perms.map((p) => (
            <button
              key={p.level}
              onClick={() => setSelected(p.level)}
              className={`relative flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all ${
                selected === p.level
                  ? 'border-brand bg-brand-soft shadow-sm'
                  : 'border-border bg-white hover:border-brand-light'
              }`}
            >
              {p.badge && (
                <span className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  p.badge === (isZh ? '推荐' : 'Recommended')
                    ? 'bg-brand text-white'
                    : p.badge === (isZh ? '最安全' : 'Safest')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {p.badge}
                </span>
              )}
              <div className="flex items-center gap-2">
                {selected === p.level && (
                  <Check size={14} className="text-brand shrink-0" />
                )}
                <span className={`text-sm font-bold ${selected === p.level ? 'text-brand' : 'text-ink'}`}>
                  {p.label}
                </span>
              </div>
              <span className="text-xs text-muted leading-relaxed pr-8">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Security constraints */}
      <div className="rounded-xl border border-border bg-gray-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={15} className="text-muted shrink-0" />
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {isZh ? '安全约束（已强制启用）' : 'Security Constraints (Enforced)'}
          </p>
        </div>
        <ul className="space-y-2">
          {constraints.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink">
              <Check size={13} className="text-green-500 mt-0.5 shrink-0" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Generate / Key display */}
      {!generated ? (
        <button
          onClick={generate}
          className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          {isZh ? '生成 API Key' : 'Generate API Key'}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Check size={15} className="text-green-600" />
              <p className="text-sm font-semibold text-green-700">
                {isZh ? 'API Key 已生成' : 'API Key Generated'}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-white px-3 py-2.5">
              <code className="flex-1 font-mono text-xs text-ink truncate">{MOCK_KEY}</code>
              <button
                onClick={copy}
                className="shrink-0 rounded-md p-1.5 text-muted hover:bg-gray-100 transition-colors"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
            <div className="flex items-start gap-2 mt-3">
              <AlertTriangle size={13} className="text-yellow-500 mt-0.5 shrink-0" />
              <p className="text-xs text-muted">
                {isZh
                  ? '这是 Mock Key，仅用于演示。真实接入请在 CoinW 账户设置中生成。'
                  : 'This is a mock key for demo only. Real usage: generate from your CoinW account settings.'}
              </p>
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            {isZh ? '开始对话 →' : 'Start Chatting →'}
          </button>
        </div>
      )}
    </div>
  );
}
