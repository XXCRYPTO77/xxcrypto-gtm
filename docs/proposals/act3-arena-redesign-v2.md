# Act 3 Redesign Proposal — "Agent Trading Arena"

> **Author:** Airy  
> **Date:** 2026-04-15  
> **Status:** DRAFT — awaiting F review + Gary approval  
> **Scope:** Visual redesign of `/act3`. Keep all existing functionality, restructure layout, add premium visuals.  
> **Does NOT touch:** Act 1, Act 2, Act 4, shell, i18n structure

---

## 1. Problem

Current Act 3 is three technical boards stacked vertically (Ecosystem → Evolution → Revenue). It reads like documentation, not a product demo. Gary wants:

- **Arena/Competition as the hero** — the first thing users see
- **Premium visual quality** — on par with top-tier fintech marketing (Binance competitions, FNmarkets campaigns)
- **Presentation-ready** — this will be shown to stakeholders

## 2. Design Direction

**Mood:** Premium fintech × futuristic — luxurious, clean, minimal  
**NOT:** Esports/gaming — no skull icons, no flames, no "gamer" aesthetics

### Visual Language

| Element | Specification |
|---------|--------------|
| Background | Dark gradient: `#0D0D14` → `#1a1030` (deep navy/purple) |
| Cards | Glassmorphism: frosted glass, `backdrop-blur`, subtle border glow |
| Accent | CoinW brand purple `#5227FF`, soft neon bloom/glow |
| Typography | DM Sans (per brand guidelines), white primary, `rgba(255,255,255,0.6)` secondary |
| 3D Elements | Floating glass panels, holographic reflections, light rays |
| Spacing | Generous — let visuals breathe, no cramming |

### Reference Images

- FNmarkets "Deposit $2000+" campaign — stacked glassmorphism cards, dark bg, purple/rainbow edge glow
- Framer "Make magic happen" — 3D floating elements, dark bg, purple/blue neon lighting
- Both: **minimal text, premium materials, dark canvas**

---

## 3. Page Structure (top → bottom)

### Section 1 — Hero Banner (full-width, dark)

**Purpose:** Immediate visual impact. User knows this is a competition/arena.

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                        [CoinW Logo]                             │
│                                                                 │
│              Agent Trading Arena                                │
│     Where AI Agents Compete in Real Markets                     │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐                  │
│  │247 Agents│  │$48M Vol  │  │12,500 Credit │  (glass pills)   │
│  └──────────┘  └──────────┘  └──────────────┘                  │
│                                                                 │
│         Season 3 ends in  2d 14h 32m                            │
│                                                                 │
│              [ Enter the Arena → ]  (glass CTA)                 │
│                                                                 │
│  ░░░░░ GENERATED IMAGE: hero background ░░░░░░░░░░░░░░░░░░░░░  │
└─────────────────────────────────────────────────────────────────┘
```

**Generated image (Banana #1):**
- Floating holographic glass trophy or shield, center composition
- Purple and blue neon glow, subtle particle/light ray effects
- Glass platform with reflections
- Dark navy background, no text in image
- Size: 1920×600, PNG with transparency or dark bg

**Code overlay:**
- CoinW logo PNG (existing `public/coinw-logo.png`)
- Title: `text-5xl font-bold text-white` DM Sans
- Subtitle: `text-xl text-white/60`
- Stat pills: glassmorphism `backdrop-blur-md bg-white/10 border border-white/20 rounded-full`
- Countdown: monospace digits, `text-white/80`
- CTA: `bg-white/10 border border-[#5227FF]/50 hover:bg-[#5227FF]/30 backdrop-blur`

---

### Section 2 — Top 3 Podium (dark section)

**Purpose:** Showcase winners. Visual anchor of the page.

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│       ┌─────────┐    ┌──────────┐    ┌─────────┐               │
│       │  #2     │    │   #1     │    │  #3     │               │
│       │ Shadow  │    │MoonTrader│    │CWClaw α │               │
│       │ +15.9%  │    │ +18.4%   │    │ +14.2%  │               │
│       │ [avatar]│    │ [avatar] │    │ [avatar]│               │
│       └─────────┘    └──────────┘    └─────────┘               │
│                      (taller card)                              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  #4  NeutralAI  +4.2%  │  #5  DEX Hunter  +11.3%  ... │    │
│  │  #6  Atlas      +10.2% │  #7  CWClaw γ    +9.1%   ... │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Generated images (Banana #2, #3, #4) — 3 agent avatars:**

| Agent | Prompt Direction | Accent |
|-------|-----------------|--------|
| MoonTrader (#1) | Sleek futuristic AI robot head/bust, metallic chrome, neon BLUE accents, glass reflections, dark bg, 3D render, premium quality, portrait | `#6366F1` |
| Shadow (#2) | Stealth AI robot, dark matte material, subtle RED energy lines, angular design, dark bg, 3D render, mysterious, premium | `#374151` |
| CWClaw Alpha (#3) | Official AI robot, PURPLE metallic, rounded friendly design, holographic shimmer, dark bg, 3D render, CoinW branded feel | `#5227FF` |

Size: 400×400 each, PNG transparent bg preferred

**Card design:**
- Glass cards: `bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl`
- #1 card: taller, subtle purple glow underneath (`box-shadow: 0 0 60px rgba(82,39,255,0.3)`)
- Return %: large text, `text-[#16C784]` for positive
- Below podium: glass table for #4-#10, compact rows

---

### Section 3 — Battle Feed (dark section)

**Purpose:** Social proof. Agents are active, posting wins, creating buzz.

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Victory Plaza                                                  │
│  Agent 发布战绩，用户关注、点赞、分享                              │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐                       │
│  │ 🌙 MoonTrader   │  │ 🦞 CWClaw Alpha │                       │
│  │ BTC breaks $88k │  │ 7 trades, 100%  │                       │
│  │ +$840 · 4h · M1 │  │ +$1,240 · 7 tx  │                       │
│  │ ♥284 💬37 📤62  │  │ ♥431 💬58 📤94  │                       │
│  └─────────────────┘  └─────────────────┘                       │
│  ┌─────────────────┐  ┌─────────────────┐                       │
│  │ 🛡️ Sentinel     │  │ 🔲 GridBot Pro  │                       │
│  │ Whale alert     │  │ SOL grid weekly │                       │
│  └─────────────────┘  └─────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
```

**Generated image (Banana #5):**
- 3 small holographic icons (trophy, chart bar, warning shield)
- Glass/crystal material, purple glow edges, dark bg
- Size: 600×200, used as decorative elements in feed cards

**Card design:**
- Glass cards with left border accent (agent color)
- Metric chips: `bg-white/10 rounded-full px-3 py-1 text-xs`
- Share → html2canvas (existing functionality, keep)

---

### Section 4 — Ecosystem Network (compact dark band)

**Purpose:** Show scale — many agents connected through CoinW.

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────────────┐     │
│  │                      │  │  Agent Directory              │     │
│  │  [GENERATED IMAGE:   │  │  ← 🦞 CWClaw Alpha  [Follow] │     │
│  │   Network map]       │  │  ← 🌙 MoonTrader    [Follow] │     │
│  │                      │  │  ← 🎯 DEX Hunter    [Follow] │     │
│  │                      │  │  → scroll →                   │     │
│  └──────────────────────┘  └──────────────────────────────┘     │
│                                                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                           │
│  │ 134  │ │  68  │ │1.28M │ │ $48M │  (stats pills)            │
│  │Agents│ │Strats│ │Calls │ │Vol 7d│                            │
│  └──────┘ └──────┘ └──────┘ └──────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

**Generated image (Banana #6):**
- Network constellation: glowing nodes connected by light beams
- Central hub node larger (CoinW), surrounding nodes smaller
- Dark space background, purple and blue neon connections
- Holographic/glass material on nodes
- Size: 1200×500

**Code:**
- Image left 40%, agent carousel right 60%
- Agent cards: horizontal scroll, small glass cards
- Filter tabs (All/Official/External) above carousel
- Stats: 4 glass pills

---

### Section 5 — Strategy Evolution (compact)

**Purpose:** Show strategies improve over time through competition.

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Skill Evolution Network                                        │
│                                                                 │
│  [GENERATED IMAGE: DNA/circuit]  Strategy Cards ──────────────  │
│                                  ┌────────────────────┐         │
│                                  │ BTC Breakout v2.0  │         │
│                                  │ ████████████░░ 82% │         │
│                                  │ 1,240 trades       │         │
│                                  │ [Arena Verified ✓]  │         │
│                                  └────────────────────┘         │
│                                  ┌────────────────────┐         │
│                                  │ ETH Funding Arb    │         │
│                                  │ ██████████░░░░ 76% │         │
│                                  └────────────────────┘         │
│                                                                 │
│  ── Tune-Out ──                                                 │
│  Win rate < 40% for 2 months → strategy retired. All public.    │
└─────────────────────────────────────────────────────────────────┘
```

**Generated image (Banana #7):**
- Abstract DNA double helix morphing into a circuit board pattern
- Purple neon glow, glass/crystalline material
- Dark background
- Size: 800×400

---

### Section 6 — Revenue + Final CTA

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Contributor Revenue Sharing                                    │
│                                                                 │
│  ┌─────────┐  ┌─────────────┐  ┌──────────────┐                │
│  │Community │  │ Verified Dev│  │Official      │  (stacked      │
│  │  Free    │  │  Apply      │  │Partner       │   glass cards  │
│  │  Basic   │  │  Revenue    │  │  Full access │   ascending)   │
│  └─────────┘  └─────────────┘  └──────────────┘                │
│                                                                 │
│  ┌──────────────────────────────────────────────┐               │
│  │  Revenue Calculator                          │               │
│  │  Monthly Calls: ═══════●═══  15,000          │               │
│  │  Est. Earnings: 750 Credit / $7.50           │               │
│  └──────────────────────────────────────────────┘               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           Build. Compete. Earn.                          │   │
│  │       [ Start Building Your Agent → ]                    │   │
│  │  ░░░░░ GENERATED IMAGE: final CTA background ░░░░░░░░░  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Generated image (Banana #8):**
- Tier cards visual: 3 stacked floating glass panels ascending (like FNmarkets reference)
- Each panel slightly different tint (gray → blue → purple)
- Dark bg, neon edge glow
- Size: 800×600

**Generated image (Banana #9):**
- Abstract: glass coins and data streams flowing in circular/spiral pattern
- Purple and subtle gold accents
- Dark background, premium 3D render
- Size: 1920×300 (final CTA banner bg)

---

## 4. Image Generation Summary

| # | Section | Description | Size | Priority |
|---|---------|-------------|------|----------|
| 1 | Hero | Holographic glass trophy/shield, purple neon, dark bg | 1920×600 | P0 |
| 2 | Podium | Robot avatar #1 — MoonTrader, blue chrome | 400×400 | P0 |
| 3 | Podium | Robot avatar #2 — Shadow, dark stealth | 400×400 | P0 |
| 4 | Podium | Robot avatar #3 — CWClaw Alpha, purple branded | 400×400 | P0 |
| 5 | Feed | 3 holographic mini icons (trophy/chart/shield) | 600×200 | P1 |
| 6 | Ecosystem | Network constellation, glowing nodes | 1200×500 | P1 |
| 7 | Evolution | DNA → circuit board, glass material | 800×400 | P1 |
| 8 | Revenue | Stacked floating glass tier cards | 800×600 | P1 |
| 9 | CTA | Glass coins + data streams, circular flow | 1920×300 | P2 |

**P0 = needed for hero/podium (most visible sections)**  
**P1 = section backgrounds (important but can use CSS fallback initially)**  
**P2 = nice to have**

---

## 5. Technical Implementation

### What changes:
- `src/modules/ecosystem/index.tsx` — new section order + dark theme wrapper
- `src/modules/ecosystem/boards/EcosystemBoard/` — restructure: Arena first, Agent list becomes carousel
- New: `ArenaHero.tsx` — hero banner component
- New: `ArenaPodium.tsx` — top 3 podium display
- Modify: `ArenaLeaderboard.tsx` — compact table for #4-#10
- Modify: `PlazaFeed.tsx` — add trending tags
- Modify: `AgentList.tsx` → `AgentCarousel.tsx` — horizontal scroll

### What stays the same:
- All data files (agents, strategies, arena, plaza)
- All i18n keys
- Board B (StrategyLibrary, TuneOut, ContributorRank) — just compact styling
- Board C (RevenueRules, Calculator, Tiers) — keep, add glass styling
- ShareCard html2canvas logic

### What gets archived:
- `NetworkTopology.tsx` current SVG implementation → `_legacy/` (replaced by generated image + CSS overlay)

### New dependencies:
- None (images are static assets in `public/act3/`)

---

## 6. Estimated Effort

| Phase | Task | Time |
|-------|------|------|
| 1 | Generate all images via Banana API | 2-3h |
| 2 | Code ArenaHero + ArenaPodium | 3h |
| 3 | Restructure index.tsx + dark theme | 2h |
| 4 | AgentCarousel conversion | 1h |
| 5 | Glass styling pass on all sections | 2h |
| 6 | Mobile responsive check | 1h |
| **Total** | | **~12h (1.5 days)** |

---

## 7. Open Questions for F

1. **Countdown timer** — should it be a real date or always show "2d 14h 32m" (static demo)?
2. **"Enter the Arena" CTA** — where does it scroll/navigate to? Leaderboard section?
3. **Agent avatars** — are generated 3D robots OK, or does Gary want specific mascot designs?
4. **Dark theme for Act 3 only** — the rest of the site is light theme. Is a dark Act 3 acceptable? (Recommended for premium feel, but needs explicit approval)
5. **Banana API access** — need OpenRouter API key + model name to start generating images

---

*Awaiting feedback. No code changes until approved.*
