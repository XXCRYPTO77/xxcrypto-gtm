'use client';

import React from 'react';
import { useT, useClaw42Locale } from '../i18n/useT';
import { Claw42Logo } from './Logo';

export function Footer() {
  const t = useT();
  const { locale, setLocale } = useClaw42Locale();
  const f = t.footer;
  const cols = f.columns;

  return (
    <footer className="bg-black pt-20 pb-10 text-white border-t border-white/5">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Claw42Logo size="lg" />
            <p className="mt-6 text-[13px] font-bold text-white/85">{f.downloadApp}</p>
            <div className="mt-3 flex flex-col gap-2">
              <StoreButton label={f.appStore} icon="🍎" />
              <StoreButton label={f.googlePlay} icon="▶" />
            </div>
          </div>

          <Column title={cols.company.title} links={cols.company.links} />
          <Column title={cols.products.title} links={cols.products.links} />
          <Column title={cols.services.title} links={cols.services.links} />
          <Column title={cols.learn.title} links={cols.learn.links} />
        </div>

        <p className="mt-16 text-[13px] leading-[1.6] text-white/45 max-w-[900px]">
          {f.disclaimer}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6 text-[13px] text-white/50">
          <span>{f.copyright}</span>

          <div className="flex items-center gap-3">
            <SocialIcon>𝕏</SocialIcon>
            <SocialIcon>f</SocialIcon>
            <SocialIcon>ig</SocialIcon>
            <SocialIcon>in</SocialIcon>
            <SocialIcon>▶</SocialIcon>
            <button
              onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
              className="ml-4 inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-white/5 transition"
            >
              🌐 {locale === 'zh' ? '中文' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Column({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-[15px] font-bold text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-[13px] text-white/55">
        {links.map((l, i) => (
          <li key={i}>
            <a href="#" className="hover:text-white transition">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StoreButton({ label, icon }: { label: string; icon: string }) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-semibold text-white hover:bg-white/10 transition"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[12px] text-white/80 hover:bg-white/10 transition"
    >
      {children}
    </a>
  );
}
