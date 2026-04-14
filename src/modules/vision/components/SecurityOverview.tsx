'use client';

import React from 'react';
import { Key, Gauge, Lock, AlertTriangle } from 'lucide-react';

const LAYERS = [
  {
    icon: Key,
    code: 'L1',
    title: 'API Key 权限分级',
    desc: '只读 / 现货 / 合约 / 完整——四档权限，最小授权原则。Agent 调用必须在授权范围内，越权直接拒绝。',
    status: 'v1.0 已实现',
    statusTone: 'green',
  },
  {
    icon: Gauge,
    code: 'L2',
    title: '频率限制',
    desc: '按 Key / IP / 账户三维度限速，防止 Agent 失控轮询。超频自动降速，恶意行为触发暂停。',
    status: 'v1.0 已实现',
    statusTone: 'green',
  },
  {
    icon: Lock,
    code: 'L3',
    title: '额度上限',
    desc: '单笔 + 日累计双重上限，独立于 Agent 逻辑。平台层强制执行，任何 Agent 无法绕过。',
    status: 'v1.0 已实现',
    statusTone: 'green',
  },
  {
    icon: AlertTriangle,
    code: 'L4',
    title: '调用异常告警',
    desc: '异常模式实时检测：非常规时段大量下单、快速仓位变动、API 异常调用频次。触发后推送 + 自动暂停。',
    status: 'v1.5 规划中',
    statusTone: 'amber',
  },
];

export function SecurityOverview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <h2 className="text-3xl font-bold text-ink sm:text-4xl mb-2">安全风控概览</h2>
      <p className="text-sm text-muted mb-10">技术架构未最终确定。以下是当前规划的四层防线——每一层独立有效，叠加后覆盖主要攻击面。</p>

      {/* Architecture diagram */}
      <div className="mb-8 rounded-2xl border border-border bg-gray-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">系统分层示意</p>
        <div className="flex flex-col gap-2">
          {['Agent 调用层', 'MCP Server 层', '权限网关层（L1 L2 L3 L4）', '交易所 API 层'].map((layer, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-5 text-center text-xs font-mono text-muted">{idx + 1}</span>
              <div
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium ${
                  layer.includes('权限网关')
                    ? 'bg-brand text-white'
                    : 'bg-white border border-border text-ink'
                }`}
              >
                {layer}
              </div>
              {idx < 3 && (
                <span className="text-xs text-muted">↓</span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">所有外部调用必须穿过权限网关层，无旁路路径。</p>
      </div>

      {/* 4 layers */}
      <div className="grid gap-4 sm:grid-cols-2">
        {LAYERS.map((layer) => {
          const Icon = layer.icon;
          return (
            <div key={layer.code} className="flex gap-4 rounded-2xl border border-border bg-page p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icon size={18} />
              </span>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-muted">{layer.code}</span>
                  <h3 className="text-sm font-bold text-ink">{layer.title}</h3>
                  <span
                    className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
                      layer.statusTone === 'green'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {layer.status}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">{layer.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
