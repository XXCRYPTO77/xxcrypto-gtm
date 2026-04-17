'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { Button } from '@/components/primitives/Button';
import { ArrowRight, Layers, MessagesSquare, MessageSquare, Globe, Telescope } from 'lucide-react';
// Telescope used for Act 4 icon

const ACT_CONFIG = [
  { key: 'act1', href: '/act1', icon: Layers, color: 'from-brand to-brand-med' },
  { key: 'act15', href: '/act15', icon: MessagesSquare, color: 'from-amber-500 to-rose-500' },
  { key: 'act2', href: '/act2', icon: MessageSquare, color: 'from-indigo-500 to-purple-600' },
  { key: 'act3', href: '/act3', icon: Globe, color: 'from-violet-600 to-fuchsia-600' },
  { key: 'act4', href: '/act4', icon: Telescope, color: 'from-gray-600 to-gray-800' },
] as const;

const ACT_META: Record<string, { num: string; title: string; desc: string; versions: string }> = {
  act1:  { num: 'ACT 1', title: '看到', desc: 'Skills 落地页——用户看到产品是什么、能干什么，复制一段 prompt 就能试。', versions: 'v1.0' },
  act15: { num: 'ACT 2', title: '旁观', desc: '3 个 Agent 实时讨论行情和策略，未登录也能看。先建立信任，再谈转化。', versions: 'v1.1' },
  act2:  { num: 'ACT 3', title: '用到', desc: '选风格、跟 Agent 聊、走完看行情→下单→看结果的完整流程。', versions: 'v1.2' },
  act3:  { num: 'ACT 4', title: '生态', desc: '双 Agent 接入 + Skill 进化协作 + 交易竞技 + 分润闭环——产品终态。', versions: 'v1.5' },
  act4:  { num: 'ACT 5', title: '远景', desc: '合回主站路径、安全风控、后续规划蓝图。', versions: 'v2.0+' },
};

const ACT_META_EN: Record<string, { num: string; title: string; desc: string; versions: string }> = {
  act1:  { num: 'ACT 1', title: 'See It',    desc: 'Skills landing page — see the product, understand it, copy a prompt and try.', versions: 'v1.0' },
  act15: { num: 'ACT 2', title: 'Watch',     desc: '3 Agents discuss markets and strategies in real time. No login required. Trust first, convert later.', versions: 'v1.1' },
  act2:  { num: 'ACT 3', title: 'Use It',    desc: 'Pick a style, chat with an Agent, walk through the full trading flow.', versions: 'v1.2' },
  act3:  { num: 'ACT 4', title: 'Ecosystem', desc: 'Dual Agent access + Skill evolution + trading arena + revenue sharing — the endgame.', versions: 'v1.5' },
  act4:  { num: 'ACT 5', title: 'Vision',    desc: 'Main-site integration path, security & compliance, future roadmap.', versions: 'v2.0+' },
};

export default function Overview() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const meta = isZh ? ACT_META : ACT_META_EN;

  return (
    <div className="min-h-screen bg-page">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 sm:px-8 lg:px-12">
        {/* Background blob */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-brand/5 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand tracking-wide mb-6">
            CoinW × Agent Skill · MVP
          </span>
          <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
            {isZh ? '用 AI Agent' : 'Redefine Trading'}
            <br />
            <span className="text-brand">{isZh ? '重新定义交易方式' : 'with AI Agent'}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {isZh
              ? '五幕产品路线图。每一幕都是一个可体验的产品 Demo——从落地页到 Agent 对话，到完整交易生态。'
              : 'Five-act product roadmap. Each act is a live product demo — from landing page to Agent chat to the full trading ecosystem.'}
          </p>
        </div>
      </section>

      {/* Act Cards Grid */}
      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACT_CONFIG.map(({ key, href, icon: Icon, color }) => {
            const m = meta[key];
            return (
              <a
                key={key}
                href={href}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-8 transition-all duration-200 hover:border-brand hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-0.5"
              >
                {/* Version tag */}
                <span className="absolute top-6 right-6 rounded-full bg-gray-50 px-3 py-1 text-xs font-mono font-semibold text-muted">
                  {m.versions}
                </span>

                <div>
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${color} text-white mb-5`}>
                    <Icon size={22} />
                  </div>

                  {/* Act number + Title */}
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted">{m.num}</span>
                    <h2 className="text-2xl font-bold text-ink">{m.title}</h2>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted pr-8">{m.desc}</p>
                </div>

                {/* CTA */}
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
                  {isZh ? '进入体验' : 'Explore'}
                  <ArrowRight size={16} />
                </div>
              </a>
            );
          })}
        </div>
      </section>

    </div>
  );
}
