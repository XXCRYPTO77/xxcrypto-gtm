'use client';

import { useT } from '@/i18n/LocaleContext';
import { BarChart3, MessageSquare, Shield, ArrowRight } from 'lucide-react';
import { HeroBackdrop } from '@/shared/ui/HeroBackdrop';
import { ClawMark } from '@/shared/ui/ClawMark';

interface CWClawLandingProps {
  onNext: () => void;
}

export function CWClawLanding({ onNext }: CWClawLandingProps) {
  const t = useT();
  const c = t.agentChat.landing as Record<string, string>;
  const isZh = t.nav.cta === 'EN';

  // Replace "CWClaw" branding in any copy with "Claw 42".
  const brandify = (s: string) =>
    s.replace(/CWClaw/gi, 'Claw 42').replace(/CwClaw/g, 'Claw 42');

  const features = [
    { Icon: BarChart3, title: c.f1Title, desc: c.f1Desc },
    { Icon: MessageSquare, title: c.f2Title, desc: c.f2Desc },
    { Icon: Shield, title: c.f3Title, desc: c.f3Desc },
  ];

  const stats = [
    { value: c.stat1, note: isZh ? '覆盖全链路' : 'full pipeline' },
    { value: c.stat2, note: isZh ? '永不下线' : 'always on' },
    { value: c.stat3, note: isZh ? '资产绝对安全' : 'assets locked' },
  ];

  return (
    <div className="space-y-20">
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0b0b14] px-6 pt-16 pb-20 sm:px-10 sm:pt-20 sm:pb-24">
        <HeroBackdrop variant="intense" />

        <div className="relative flex flex-col items-center gap-7 text-center">
          {/* Mascot */}
          <div className="flex justify-center">
            <ClawMark size={140} />
          </div>

          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide"
            style={{
              borderColor: 'rgba(108,79,255,0.3)',
              background: 'rgba(108,79,255,0.08)',
              color: '#b8a6ff',
            }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6c4fff] animate-pulse" />
            {isZh ? 'Act II · 认养你的 Agent' : 'Act II · Adopt your Agent'}
          </span>

          {/* Title */}
          <h1
            className="font-black tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            <span className="cw-title-gradient">
              {isZh ? '认养你的 Claw 42' : 'Adopt Your Claw 42'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            {brandify(c.heroSub || '')}
          </p>

          {/* CTA */}
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-full bg-[#d1ff55] px-7 py-3 text-sm font-semibold text-black transition-all hover:bg-[#dfff7a] hover:shadow-[0_0_32px_rgba(209,255,85,0.35)]"
          >
            {c.cta} <ArrowRight size={16} />
          </button>

          {/* Stats strip — unified white / subtle */}
          <div className="mt-4 grid w-full max-w-3xl grid-cols-3 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 text-center backdrop-blur-sm"
              >
                <div
                  className="font-black tabular-nums leading-none"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    background:
                      'linear-gradient(180deg, #ffffff 0%, #b8a6ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-white/45">
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FEATURES ============== */}
      <section>
        <div className="mb-8 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6c4fff]">
            {isZh ? 'Claw 42 能做什么' : 'What Claw 42 can do'}
          </div>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
            {isZh ? '三件事，一次就懂' : 'Three things, crystal clear'}
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {features.map(({ Icon, title, desc }, i) => (
            <div
              key={i}
              className="cw-card-interactive group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0f0f14] p-6"
            >
              {/* Corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-60"
                style={{
                  background:
                    'radial-gradient(circle, #6c4fff 0%, transparent 70%)',
                }}
              />

              <div className="relative">
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#6c4fff]/25 text-[#b8a6ff] transition-colors group-hover:border-[#6c4fff]/60 group-hover:text-white"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(108,79,255,0.18) 0%, rgba(108,79,255,0.04) 100%)',
                  }}
                >
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-base font-semibold text-white">
                  {brandify(title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {brandify(desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== BOTTOM CTA ============== */}
      <div className="text-center">
        <button
          onClick={onNext}
          className="text-sm text-[#b8a6ff] hover:text-white transition-colors font-medium"
        >
          {isZh ? '已有账号，直接开始 →' : 'Already have an account? Start now →'}
        </button>
      </div>
    </div>
  );
}
