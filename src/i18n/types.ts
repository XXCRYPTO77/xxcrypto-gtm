/**
 * i18n type schema — single source of truth for all copy
 * Every section is a nested namespace so the editor gets autocomplete.
 * Mirror structure exactly in zh.json / en.json.
 */

export type Locale = 'zh' | 'en';

export interface Dict {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    brand: string;
    tagline: string;
    acts: { act1: string; act2: string; act3: string };
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    roadmapNote: string;
  };
  acts: {
    act1: { num: string; title: string; desc: string };
    act2: { num: string; title: string; desc: string };
    act3: { num: string; title: string; desc: string };
  };
  v10: {
    version: string;
    depth: string;
    headline: string;
    lede: string;
    market: {
      title: string;
      subtitle: string;
      coins: ReadonlyArray<{ symbol: string; name: string; price: string; change: string; up: boolean }>;
    };
    whatIs: {
      title: string;
      desc: string;
      flow: ReadonlyArray<string>;
      note: string;
    };
    why: {
      title: string;
      items: ReadonlyArray<{ tag: string; title: string; desc: string }>;
    };
    stories: {
      title: string;
      subtitle: string;
      items: ReadonlyArray<{
        id: string;
        persona: string;
        scenario: string;
        dialog: ReadonlyArray<{ role: 'user' | 'agent'; text: string }>;
        skills: ReadonlyArray<string>;
      }>;
    };
    capability: {
      title: string;
      subtitle: string;
      groups: ReadonlyArray<{
        id: string;
        name: string;
        items: ReadonlyArray<{ code: string; name: string; desc: string }>;
      }>;
    };
    advanced: {
      title: string;
      subtitle: string;
      tags: ReadonlyArray<{ code: string; name: string; desc: string }>;
    };
    quickStart: {
      title: string;
      steps: ReadonlyArray<{ n: number; title: string; desc: string }>;
    };
    install: {
      title: string;
      note: string;
      command: string;
      copied: string;
    };
    useCases: {
      title: string;
      tryLabel: string;
      toastMsg: string;
      items: ReadonlyArray<{ icon: string; title: string; desc: string }>;
    };
  };
  v11: {
    version: string; depth: string;
    headline: string; lede: string;
    chatTitle: string;
    skillsPanelTitle: string;
  };
  v12: { version: string; depth: string; headline: string; lede: string; bullets: ReadonlyArray<string> };
  v13: { version: string; depth: string; headline: string; lede: string; bullets: ReadonlyArray<string> };
  v14: { version: string; depth: string; headline: string; lede: string; bullets: ReadonlyArray<string> };
  v15: {
    version: string; depth: string;
    headline: string; lede: string;
    marketplace: { title: string; subtitle: string; filterLabel: string };
    agentZone: { title: string; subtitle: string; centerLabel: string };
    credit: { title: string; subtitle: string; unit: string };
  };
  security: {
    version: string;
    headline: string; lede: string;
    tabs: {
      architecture: { label: string; title: string; desc: string };
      threat: { label: string; title: string; desc: string };
      cicd: { label: string; title: string; desc: string };
      merge: { label: string; title: string; desc: string };
    };
  };
  v20: {
    version: string;
    headline: string; lede: string;
    pillars: ReadonlyArray<{ title: string; desc: string }>;
  };
  transitionBands: {
    band1: {
      from: string; to: string; label: string;
      items: ReadonlyArray<{ code: string; name: string; desc: string }>;
    };
    band2: {
      from: string; to: string; label: string;
      items: ReadonlyArray<{ code: string; name: string; desc: string }>;
    };
    band3: {
      from: string; to: string; label: string;
      items: ReadonlyArray<{ code: string; name: string; desc: string }>;
    };
  };
  extensions: {
    title: string; subtitle: string;
    items: ReadonlyArray<{ code: string; title: string; desc: string }>;
  };
  footer: {
    tagline: string;
    disclaimer: string;
    copyright: string;
    links: ReadonlyArray<{ label: string; href: string }>;
  };
  common: {
    copy: string; copied: string;
    learnMore: string; close: string;
    wip: string;
  };
  // Airy's Act 2 side-panel + chat i18n
  ticker: Record<string, string>;
  portfolio: {
    title: string; total: string; change: string; changePercent: string;
    coin: string; amount: string; pnl: string;
  };
  sentiment: {
    title: string; fear: string; greed: string;
    extreme_fear: string; extreme_greed: string; neutral: string; label: string;
  };
  whaleFeed: {
    title: string;
    items: ReadonlyArray<{ text: string; time: string }>;
  };
  agentChat: {
    presets: {
      title: string; subtitle: string; select: string;
      conservative: { name: string; desc: string };
      scalper: { name: string; desc: string };
      quant: { name: string; desc: string };
      trend: { name: string; desc: string };
      news: { name: string; desc: string };
      balanced: { name: string; desc: string };
      [key: string]: unknown;
    };
    chat: {
      placeholder: string; send: string;
      welcomeMsg: string; marketReply: string; tradeReply: string; reportReply: string;
      quickMarket: string; quickTrade: string; quickReport: string;
    };
    journey: { [key: string]: string };
    landing: { [key: string]: string };
    auth: { [key: string]: string };
    personality: { [key: string]: unknown };
    naming: { [key: string]: string };
    quickAccess: { [key: string]: string };
  };
}
