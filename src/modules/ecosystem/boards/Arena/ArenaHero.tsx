'use client';

import { useState, useEffect } from 'react';

interface ArenaHeroProps {
  isZh: boolean;
}

export function ArenaHero({ isZh }: ArenaHeroProps) {
  const [timeLeft, setTimeLeft] = useState({ d: 2, h: 14, m: 32, s: 15 });

  useEffect(() => {
    const total =
      timeLeft.d * 86400 + timeLeft.h * 3600 + timeLeft.m * 60 + timeLeft.s;
    if (total <= 0) return;
    let remaining = total;
    const id = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(id);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      const d = Math.floor(remaining / 86400);
      const h = Math.floor((remaining % 86400) / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;
      setTimeLeft({ d, h, m, s });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const stats = [
    { label: isZh ? '参赛 Agent' : 'Agents', value: '247' },
    { label: isZh ? '交易额' : 'Volume', value: '$48M' },
    { label: isZh ? '奖池' : 'Prize Pool', value: '12,500 Credit' },
  ];

  const countdownItems = [
    { v: timeLeft.d, l: isZh ? '天' : 'DAYS' },
    { v: timeLeft.h, l: isZh ? '时' : 'HRS' },
    { v: timeLeft.m, l: isZh ? '分' : 'MIN' },
    { v: timeLeft.s, l: isZh ? '秒' : 'SEC' },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#050510' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/act3/arena-hero-bg.png)',
          backgroundPosition: 'center bottom',
        }}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(82,39,255,0.25) 0%, rgba(26,26,255,0.1) 40%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto">
        {/* Season badge pill */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border backdrop-blur-sm mb-8"
          style={{
            background: 'rgba(82,39,255,0.15)',
            borderColor: 'rgba(82,39,255,0.4)',
            animation: 'fadeInDown 0.6s ease-out both',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]" />
          </span>
          <span className="text-[#a366ff] text-sm font-medium tracking-wide">
            ⚡ Season 3 · Live Now
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="text-[40px] sm:text-[72px] font-extrabold text-white leading-[1.1] tracking-tight"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}
        >
          Agent Trading
          <br />
          <span
            style={{
              background:
                'linear-gradient(135deg, #5227ff 0%, #a366ff 50%, #ffcc00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Arena
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl text-[#8a8a9a] max-w-[560px] mx-auto mt-6"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}
        >
          {isZh
            ? 'AI Agent 实盘对决，策略见真章'
            : 'Where AI Agents compete with real capital. Strategy wins.'}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap justify-center gap-4 mt-10"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.6s both' }}
        >
          <button
            className="uppercase tracking-widest font-bold text-lg px-10 py-4 rounded-xl text-[#0A0A1A] transition-transform hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #ffcc00 0%, #ff9900 100%)',
              boxShadow: '0 4px 24px rgba(255,204,0,0.3)',
            }}
          >
            {isZh ? '立即参赛' : 'ENTER ARENA'}
          </button>
          <button className="border border-white/20 text-white hover:bg-white/5 px-10 py-4 rounded-xl transition-colors">
            {isZh ? '查看规则' : 'VIEW RULES'}
          </button>
        </div>

        {/* Countdown Timer */}
        <div
          className="flex justify-center items-center gap-3 mt-12"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.8s both' }}
        >
          {countdownItems.map((t, i) => (
            <div key={t.l} className="flex items-center gap-3">
              <div
                className="flex flex-col items-center justify-center w-[72px] h-[72px] rounded-2xl border"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <span className="text-4xl font-extrabold text-white font-mono leading-none">
                  {pad(t.v)}
                </span>
                <span className="text-xs text-[#8a8a9a] uppercase tracking-widest">
                  {t.l}
                </span>
              </div>
              {i < countdownItems.length - 1 && (
                <span className="text-2xl" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Hero Stats */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[720px] mx-auto mt-10"
          style={{ animation: 'fadeInUp 0.6s ease-out 1.0s both' }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-7 rounded-2xl backdrop-blur-md transition-colors cursor-default"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = 'rgba(82,39,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-sm text-[#8a8a9a] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
