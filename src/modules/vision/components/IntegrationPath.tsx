'use client';

import React from 'react';
import { ArrowRight, Code2, Package, Layers } from 'lucide-react';
import { HeroBackdrop } from '@/shared/ui/HeroBackdrop';

const STEPS = [
  {
    icon: Code2,
    phase: 'Phase 1',
    title: '模块化 Demo 开发',
    desc: '每个 Act 按模块独立开发。代码结构从第一天就满足抽出条件——无 Next.js 专属 API，无 Demo 壳依赖。',
    detail: 'modules/ 目录下每个模块独立，shell/ 是可丢弃的 scaffolding。',
  },
  {
    icon: Package,
    phase: 'Phase 2',
    title: '展示通过 → 立即抽出',
    desc: '产品委员会确认某一幕，对应模块直接进入正式开发排期。不需要重写，不需要重新设计。',
    detail: '目标：Demo 即 MVP 原型，抽出成本 < 2 天工作量。',
  },
  {
    icon: Layers,
    phase: 'Phase 3',
    title: '接入主站',
    desc: '后端：Java/Python 服务对接 MCP Server。前端：H5 / iOS / Android 页面嵌入 React 组件（iframe 或 Web Component），或按 H5 规范重写。',
    detail: '接口协议先行定义，两端可并行开发。Demo 期间的 mock 数据替换为真实 API 调用。',
  },
];

export function IntegrationPath() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop variant="default" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="mb-10 text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide mb-5"
            style={{
              borderColor: 'rgba(108,79,255,0.3)',
              background: 'rgba(108,79,255,0.08)',
              color: '#b8a6ff',
            }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6c4fff] animate-pulse" />
            Act IV · v2.0+
          </span>
          <h2
            className="font-black tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
          >
            <span className="cw-title-gradient">接回主站路径</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted text-base sm:text-lg">
            Demo 不是一次性的。每一幕完成即可抽出，流水线交付。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="cw-card-interactive relative flex flex-col gap-4 rounded-2xl border border-border bg-page p-6">
              {/* Connector arrow */}
              {idx < STEPS.length - 1 && (
                <span className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <ArrowRight size={14} />
                </span>
              )}

              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon size={18} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand">{step.phase}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-ink mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.desc}</p>
              </div>

              <p className="mt-auto rounded-lg bg-gray-50 px-3 py-2 text-xs text-muted leading-relaxed">
                {step.detail}
              </p>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
