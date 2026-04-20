'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleContext';
import { ArrowRight, Layers, MessagesSquare, MessageSquare, Globe, Telescope } from 'lucide-react';

const ACT_CONFIG = [
  { key: 'act1',  href: '/act1',  icon: Layers },
  { key: 'act15', href: '/act15', icon: MessagesSquare },
  { key: 'act2',  href: '/act2',  icon: MessageSquare },
  { key: 'act3',  href: '/act3',  icon: Globe },
  { key: 'act4',  href: '/act4',  icon: Telescope },
] as const;

const ACT_META: Record<string, { num: string; title: string; desc: string; versions: string }> = {
  act1:  { num: 'ACT 1',   title: '看到',   desc: 'Skills 落地页——用户看到产品是什么、能干什么，复制一段 prompt 就能试。', versions: 'v1.0' },
  act15: { num: 'ACT 1.5', title: '旁观', desc: '3 个 Agent 实时讨论行情和策略，未登录也能看。先建立信任，再谈转化。', versions: 'v1.1' },
  act2:  { num: 'ACT 2',   title: '用到',   desc: '选风格、跟 Agent 聊、走完看行情→下单→看结果的完整流程。', versions: 'v1.2' },
  act3:  { num: 'ACT 3',   title: '生态', desc: '双 Agent 接入 + Skill 进化协作 + 交易竞技 + 分润闭环——产品终态。', versions: 'v1.5' },
  act4:  { num: 'ACT 4',   title: '远景', desc: '合回主站路径、安全风控、后续规划蓝图。', versions: 'v2.0+' },
};

const ACT_META_EN: Record<string, { num: string; title: string; desc: string; versions: string }> = {
  act1:  { num: 'ACT 1',   title: 'See It',    desc: 'Skills landing page — see the product, understand it, copy a prompt and try.', versions: 'v1.0' },
  act15: { num: 'ACT 1.5', title: 'Watch',     desc: '3 Agents discuss markets and strategies in real time. No login required. Trust first, convert later.', versions: 'v1.1' },
  act2:  { num: 'ACT 2',   title: 'Use It',    desc: 'Pick a style, chat with an Agent, walk through the full trading flow.', versions: 'v1.2' },
  act3:  { num: 'ACT 3',   title: 'Ecosystem', desc: 'Dual Agent access + Skill evolution + trading arena + revenue sharing — the endgame.', versions: 'v1.5' },
  act4:  { num: 'ACT 4',   title: 'Vision',    desc: 'Main-site integration path, security & compliance, future roadmap.', versions: 'v2.0+' },
};

export default function Overview() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const meta = isZh ? ACT_META : ACT_META_EN;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden px-6 pt-24 pb-24 sm:px-8 lg:px-12 lg:pt-32">
        {/* Radial purple glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[620px] w-[1000px] rounded-full opacity-40 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #6c4fff 0%, transparent 70%)' }}
        />
        {/* Grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top, black 30%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide"
            style={{
              borderColor: 'rgba(108,79,255,0.3)',
              background: 'rgba(108,79,255,0.08)',
              color: '#b8a6ff',
            }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6c4fff] animate-pulse" />
            Claw 42 · MVP Roadmap
          </span>

          <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, #ffffff 0%, #d6ccff 55%, #6c4fff 100%)',
              }}
            >
              {isZh ? '用 AI Agent' : 'Redefine Trading'}
            </span>
            <br />
            <span className="text-white/90">
              {isZh ? '重新定义交易方式' : 'with an AI Agent'}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            {isZh
              ? '五幕产品路线图。每一幕都是一个可体验的产品 Demo——从落地页到 Agent 对话，到完整交易生态。'
              : 'A five-act product roadmap. Each act is a live, walkable demo — from landing page, to Agent chat, to the full trading ecosystem.'}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#acts"
              className="inline-flex items-center gap-2 rounded-full bg-[#d1ff55] px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-[#dfff7a] hover:shadow-[0_0_32px_rgba(209,255,85,0.35)]"
            >
              {isZh ? '探索五幕' : 'Explore 5 Acts'} <ArrowRight size={16} />
            </a>
            <a
              href="/act1"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#6c4fff] hover:bg-white/10"
            >
              {isZh ? '直接进入 Act 1' : 'Jump to Act 1'}
            </a>
          </div>
        </div>
      </section>

      {/* ============== ACT CARDS ============== */}
      <section id="acts" className="px-6 pb-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6c4fff]">
                {isZh ? '五幕' : 'The 5 Acts'}
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {isZh ? '从看到，到生态' : 'From first glance to full ecosystem'}
              </h2>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ACT_CONFIG.map(({ key, href, icon: Icon }) => {
              const m = meta[key];
              return (
                <a
                  key={key}
                  href={href}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f0f14] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#6c4fff]/50 hover:shadow-[0_0_0_1px_rgba(108,79,255,0.2),0_12px_40px_rgba(108,79,255,0.18)]"
                >
                  {/* Purple glow on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-60"
                    style={{ background: 'radial-gradient(circle, #6c4fff 0%, transparent 70%)' }}
                  />

                  {/* Version tag */}
                  <span className="absolute top-5 right-5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-white/60">
                    {m.versions}
                  </span>

                  <div className="relative">
                    {/* Icon block */}
                    <div
                      className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#6c4fff]/25 text-[#b8a6ff] transition-colors group-hover:border-[#6c4fff]/60 group-hover:text-white"
                      style={{ background: 'linear-gradient(135deg, rgba(108,79,255,0.18) 0%, rgba(108,79,255,0.04) 100%)' }}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                      {m.num}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{m.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{m.desc}</p>
                  </div>

                  {/* CTA row */}
                  <div className="relative mt-7 flex items-center gap-2 text-sm font-medium text-[#b8a6ff] transition-colors group-hover:text-[#d1ff55]">
                    {isZh ? '进入体验' : 'Learn more'}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
