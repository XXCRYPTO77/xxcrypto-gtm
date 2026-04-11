import React from 'react';

export interface ActDividerProps {
  num: string;
  title: string;
  desc: string;
  id?: string;
}

export function ActDivider({ num, title, desc, id }: ActDividerProps) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="relative flex flex-col gap-6">
        {/* Giant act number as decorative background */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-4 -top-8 select-none text-[18rem] font-black leading-none tracking-tight text-brand-soft sm:text-[22rem]"
        >
          {num.replace('ACT ', '')}
        </span>
        <div className="relative z-10 flex flex-col gap-5">
          <span className="text-sm font-mono font-bold uppercase tracking-widest text-brand">
            {num}
          </span>
          <h2 className="text-5xl font-black text-ink sm:text-7xl">{title}</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{desc}</p>
        </div>
      </div>
    </section>
  );
}
