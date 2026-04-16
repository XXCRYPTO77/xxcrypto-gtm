'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useLandingT } from '../i18n/useLandingT';
import { Brain, Zap, Dna } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  brain: Brain,
  zap: Zap,
  dna: Dna,
};

function useCountUp(target: string, active: boolean): string {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!active) return;
    // Extract number from target string
    const match = target.match(/(\d+)/);
    if (!match) { setDisplay(target); return; }
    const num = parseInt(match[1], 10);
    const prefix = target.slice(0, match.index);
    const suffix = target.slice((match.index ?? 0) + match[0].length);
    let start = 0;
    const steps = 30;
    const stepTime = 800 / steps;
    const interval = setInterval(() => {
      start++;
      const val = Math.round((start / steps) * num);
      setDisplay(`${prefix}${val}${suffix}`);
      if (start >= steps) clearInterval(interval);
    }, stepTime);
    return () => clearInterval(interval);
  }, [active, target]);
  return display;
}

export function Capabilities() {
  const t = useLandingT();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cards = t.capabilities.cards;
  const featured = cards[0];
  const rest = cards.slice(1);
  const FeaturedIcon = ICON_MAP[featured?.icon] || Brain;

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <h2 className="text-3xl font-bold text-ink text-center sm:text-4xl mb-16">
          {t.capabilities.title}
        </h2>

        {/* Featured card (full width) */}
        {featured && (
          <FeaturedCard card={featured} Icon={FeaturedIcon} visible={visible} />
        )}

        {/* Two side-by-side cards */}
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          {rest.map((card) => {
            const Icon = ICON_MAP[card.icon] || Brain;
            return <RegularCard key={card.icon} card={card} Icon={Icon} visible={visible} />;
          })}
        </div>
      </div>
    </section>
  );
}

interface CardData {
  icon: string;
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
}

function FeaturedCard({ card, Icon, visible }: { card: CardData; Icon: React.ElementType; visible: boolean }) {
  const stat = useCountUp(card.stat, visible);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-page p-8 md:p-12 transition-all duration-300 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1">
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        <div className="flex-1">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-soft text-brand mb-6">
            <Icon size={32} />
          </div>
          <h3 className="text-2xl font-bold text-ink mb-4">{card.title}</h3>
          <p className="text-base leading-relaxed text-muted">{card.desc}</p>
        </div>
        <div className="text-center md:text-right shrink-0">
          <span className="block text-4xl sm:text-5xl font-black text-brand">{stat}</span>
          <span className="block text-sm text-muted font-medium mt-1">{card.statLabel}</span>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-brand/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}

function RegularCard({ card, Icon, visible }: { card: CardData; Icon: React.ElementType; visible: boolean }) {
  const stat = useCountUp(card.stat, visible);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-page p-8 transition-all duration-300 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1">
      <div className="flex items-end justify-between mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-soft text-brand">
          <Icon size={28} />
        </div>
        <div className="text-right">
          <span className="block text-3xl sm:text-4xl font-black text-brand">{stat}</span>
          <span className="block text-xs text-muted font-medium">{card.statLabel}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-ink mb-3">{card.title}</h3>
      <p className="text-sm leading-relaxed text-muted">{card.desc}</p>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-brand/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}
