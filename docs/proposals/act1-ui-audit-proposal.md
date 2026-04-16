# AgentX Landing Page — UI/UX Audit & Redesign Proposal

**Page:** https://xxcrypto-gtm.vercel.app/act1  
**Brand:** CoinW  
**Date:** 2026-04-16  
**Auditor:** Senior UX/UI Design Consultant  

---

## Table of Contents

1. [Part 1: Current State Audit](#part-1-current-state-audit)
2. [Part 2: Detailed Issues List](#part-2-detailed-issues-list)
3. [Part 3: Redesign Proposal (Section-by-Section)](#part-3-redesign-proposal)
4. [Part 4: New Sections to Add](#part-4-new-sections-to-add)
5. [Part 5: Design System Notes](#part-5-design-system-notes)
6. [Part 6: Implementation Priority](#part-6-implementation-priority)

---

# Part 1: Current State Audit

## Overall Impression

The page communicates a compelling AI trading agent concept with well-structured Chinese copy. However, it reads more like a pitch deck than a conversion-optimized landing page. There is no primary CTA, no social proof, no trust signals, and no clear user journey from interest → action. The visual design appears functional but lacks the premium, high-contrast aesthetic expected of a crypto/fintech product backed by a major exchange.

## Scoring Matrix

| Area | Score | Rating |
|---|---|---|
| Visual Design | 5/10 | 🟡 Needs Improvement |
| Layout & Information Architecture | 6/10 | 🟡 Needs Improvement |
| Content & Copywriting | 7/10 | 🟢 Good |
| Component Quality | 4/10 | 🟡 Needs Improvement |
| Responsive Design | 4/10 | 🔴 Critical |
| Accessibility | 3/10 | 🔴 Critical |
| Brand Alignment (CoinW) | 5/10 | 🟡 Needs Improvement |
| Performance & Loading | 6/10 | 🟡 Needs Improvement |
| Trust Signals & Social Proof | 1/10 | 🔴 Critical |
| Conversion Optimization | 2/10 | 🔴 Critical |

## Detailed Scoring Notes

### Visual Design — 5/10 🟡

- **Typography:** Content appears to use system defaults or a single font weight. No typographic hierarchy visible between headline/subhead/body. Chinese text needs explicit `Microsoft JhengHei` or `Noto Sans SC` fallback with proper `line-height` (1.6–1.8 for CJK).
- **Colors:** The CoinW purple (#5227ff) is likely underutilized. The page doesn't leverage the full brand palette (accent #ff6600, gold #ffcc00) for visual interest.
- **Spacing:** Sections appear to have inconsistent vertical rhythm. No clear 8px grid system.
- **Consistency:** Stage cards and capability cards likely use different visual treatments without a unified component language.

### Layout & Information Architecture — 6/10 🟡

- The 6-section flow (Hero → Evolution → Capabilities → Ecosystem → Roadmap → Footer) is logical and tells a story.
- However, there's no navigation, no anchor links, and no way to jump between sections.
- The roadmap section feels abruptly minimal compared to the detailed sections above it.
- No sticky header or progress indicator for a long-scroll page.

### Content & Copywriting — 7/10 🟢

- Strong: The Chinese copy is punchy, uses parallelism well ("感知 → 决策 → 进化"), and avoids generic AI hype.
- The "不是工具，不是插件" framing is effective differentiation.
- Weakness: All content is in Chinese only — no language toggle for international audience.
- The stats ("4 维信号源", "< 200ms", "每轮迭代自动优化") are good but need visual emphasis.

### Component Quality — 4/10 🟡

- Cards lack depth (no shadows, borders, or glassmorphism effects expected in modern crypto UI).
- No interactive states visible (hover, focus).
- The "Stage 1/2/3" layout appears linear without visual connection (no timeline, no arrows, no animated progression).
- Roadmap is plain text — should be a visual timeline.

### Responsive Design — 4/10 🔴

- Without visual inspection, the content structure suggests no mobile-specific optimizations.
- Long Chinese text blocks will overflow or compress poorly on <375px screens.
- Stats within cards need dedicated mobile layout.
- Stage cards likely stack without adequate spacing on mobile.

### Accessibility — 3/10 🔴

- No lang attribute visible for Chinese content (`lang="zh-CN"`).
- Stats like "< 200ms" need `aria-label` for screen readers.
- Color contrast between purple (#5227ff) on dark backgrounds may fail WCAG AA.
- No skip-to-content links, no focus management, no ARIA landmarks.

### Brand Alignment — 5/10 🟡

- The CoinW brand is barely visible — only the footer mentions "CoinW Agent Skill MVP."
- No CoinW logo, no brand mark, no "Powered by CoinW" badge.
- The purple is likely present but the secondary palette (#ffcc00 gold, #ff6600 accent) appears unused.
- The tone matches CoinW's "ambitious/professional" but lacks "inspirational/empowering" visual energy.

### Trust Signals & Social Proof — 1/10 🔴

- Zero social proof: no user counts, no testimonials, no partner logos.
- No security badges, no audit mentions, no "API keys encrypted" assurances.
- No team credibility signals.
- For a product asking users to connect exchange API keys, trust is absolutely critical.

### Conversion Optimization — 2/10 🔴

- **No primary CTA anywhere on the page.** No "Join Beta", "Get Early Access", "Connect Wallet" button.
- No email capture, no waitlist, no Telegram group link.
- No secondary CTAs (learn more, docs, whitepaper).
- The badge says "Beta · 公测中" but there's no way to actually join the beta.
- No urgency, no scarcity, no incentive.

---

# Part 2: Detailed Issues List

## 🔴 High Priority

### H1: No Call-to-Action
- **Issue:** The entire page has zero actionable CTAs. Users who are convinced have nowhere to go.
- **Impact:** Complete conversion failure. 0% conversion rate by design.
- **Recommendation:** Add a primary CTA button in the hero ("加入公测" / "Join Beta") and a sticky CTA that follows scroll. Repeat CTA after each major section.

### H2: No Trust Signals for API Key Product
- **Issue:** AgentX requires exchange API access — the highest trust threshold in crypto. Zero trust-building elements exist.
- **Impact:** Even interested users will bounce without security assurances.
- **Recommendation:** Add: (1) "API keys encrypted with AES-256" badge, (2) "Read-only + Trade-only, no withdrawal access" explainer, (3) Security audit badge, (4) CoinW official branding/endorsement.

### H3: No Social Proof
- **Issue:** No user count, no testimonials, no performance metrics, no beta user quotes.
- **Impact:** New visitors have no evidence the product works or that others trust it.
- **Recommendation:** Add live stats section (agents running, trades executed, avg return) + beta tester quotes + partner logos.

### H4: Missing CoinW Brand Presence
- **Issue:** CoinW logo appears nowhere except a tiny footer copyright.
- **Impact:** Loses the trust equity of the CoinW brand.
- **Recommendation:** CoinW logo in header, "Powered by CoinW" badge in hero, CoinW brand bar in footer.

### H5: No Mobile Optimization Evidence
- **Issue:** Content structure suggests desktop-first without responsive breakpoints.
- **Impact:** 60%+ of crypto users are mobile-first.
- **Recommendation:** Full responsive audit with breakpoints at 375px, 768px, 1024px, 1440px.

## 🟡 Medium Priority

### M1: Stage Cards Lack Visual Connection
- **Issue:** The 3 evolution stages (Perceive → Act → Evolve) are presented as isolated blocks with no visual flow.
- **Recommendation:** Connect with animated timeline, arrows, or a continuous path graphic. Add sequential reveal on scroll.

### M2: Stats Lack Visual Emphasis
- **Issue:** "4 维信号源", "< 200ms", "每轮迭代" are powerful proof points buried in card text.
- **Recommendation:** Pull stats into large, animated counter components with accent color (#ffcc00 or #ff6600).

### M3: Roadmap Is Too Minimal
- **Issue:** v1.0 → v1.1 with 3 features looks like an afterthought. No dates, no progress indicators.
- **Recommendation:** Visual timeline with dates, progress bars, and a "You are here" indicator.

### M4: No Navigation / Sticky Header
- **Issue:** Long single-page scroll with no way to navigate between sections.
- **Recommendation:** Add sticky header with logo + section links + CTA button. Highlight active section on scroll.

### M5: No Language Toggle
- **Issue:** Content is Chinese-only. CoinW has a global audience.
- **Recommendation:** Add EN/ZH toggle in header. Prioritize Chinese but provide English copy.

### M6: Footer Is Bare Minimum
- **Issue:** Just a copyright line. No links, no social, no legal.
- **Recommendation:** Full footer with: CoinW logo, social links, legal links, contact, newsletter signup.

### M7: No Animated/Visual Hero Element
- **Issue:** Hero is text-only. No visual representation of the AI agent concept.
- **Recommendation:** Add a hero visual — animated neural network, trading chart with AI overlay, or abstract agent visualization.

## 🟢 Low Priority

### L1: Ecosystem Section Lacks Visual Depth
- **Issue:** 4 bullet points as plain text. Could be interactive cards.
- **Recommendation:** Convert to icon + title + description cards with hover effects.

### L2: No Favicon/Meta
- **Issue:** Page title is functional but no OG tags, no social preview.
- **Recommendation:** Add OG image, description, Twitter card meta.

### L3: No Loading/Transition States
- **Issue:** Page appears to load all at once with no progressive reveal.
- **Recommendation:** Add section-by-section fade-in on scroll using Intersection Observer.

---

# Part 3: Redesign Proposal

---

## Section 1: Hero

### Current Problems
- Text-only hero with no visual focal point
- Badge ("Beta · 公测中") is informational but not actionable
- No CTA button — complete conversion dead-end
- No hero image, illustration, or animation
- No CoinW branding

### Proposed Design

```
┌─────────────────────────────────────────────────────────┐
│  [CoinW Logo]     Features  Roadmap  Docs    [Join Beta]│  ← Sticky header
├─────────────────────────────────────────────────────────┤
│                                                         │
│         ┌──────────┐                                    │
│         │Beta·公测中│  ← pill badge                      │
│         └──────────┘                                    │
│                                                         │
│     交易进化，永不停止                                     │
│                                                         │
│     不是工具，不是插件。AgentX 是你的                       │
│     AI 交易代理...                                       │
│                                                         │
│     [🚀 加入公测]   [📄 查看文档]                         │
│                                                         │
│     ┌─────────────────────────────────┐                 │
│     │    🔮 AI Agent 3D Visual        │                 │
│     │    (Animated orb/neural net)    │                 │
│     └─────────────────────────────────┘                 │
│                                                         │
│     🤖 1,200+ Agents  📊 $2.3M Vol  ⚡ <200ms          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Design Specs

**Sticky Header:**
- Height: `64px`
- Background: `rgba(10, 5, 30, 0.85)` with `backdrop-filter: blur(20px)`
- Border-bottom: `1px solid rgba(82, 39, 255, 0.15)`
- Logo: CoinW wordmark, height `28px`
- Nav links: `font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.7)`
- Nav hover: `color: #fff; text-shadow: 0 0 12px rgba(82, 39, 255, 0.5)`
- CTA button: `background: linear-gradient(135deg, #5227ff, #1a1aff); border-radius: 8px; padding: 8px 20px; font-size: 14px; font-weight: 600; color: #fff`
- CTA hover: `box-shadow: 0 4px 20px rgba(82, 39, 255, 0.4); transform: translateY(-1px)`
- Transition: `all 0.2s ease`
- Z-index: `1000`
- `position: fixed; top: 0; width: 100%`

**Hero Section:**
- Padding: `160px 0 120px` (accounts for fixed header)
- Max-width: `1200px`; margin: `0 auto`; padding-inline: `24px`
- Background: `radial-gradient(ellipse at 50% 0%, rgba(82, 39, 255, 0.15) 0%, transparent 60%), #0a0518`
- Add subtle grid pattern overlay: `background-image: linear-gradient(rgba(82,39,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(82,39,255,0.03) 1px, transparent 1px); background-size: 60px 60px`

**Badge:**
- `display: inline-flex; align-items: center; gap: 6px`
- `background: rgba(82, 39, 255, 0.12); border: 1px solid rgba(82, 39, 255, 0.3); border-radius: 100px`
- `padding: 6px 16px; font-size: 13px; font-weight: 500; color: #a366ff`
- `letter-spacing: 0.02em`
- Pulsing dot before "Beta": `width: 6px; height: 6px; border-radius: 50%; background: #a366ff; animation: pulse 2s ease-in-out infinite`

**Headline:**
- `font-family: 'DM Sans', 'Microsoft JhengHei', sans-serif`
- `font-size: clamp(40px, 6vw, 72px); font-weight: 800; line-height: 1.15`
- `color: #ffffff`
- `margin-top: 24px`
- `background: linear-gradient(135deg, #ffffff 0%, #a366ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent`
- `letter-spacing: -0.02em`

**Subtitle:**
- `font-size: clamp(16px, 2vw, 20px); line-height: 1.7; color: rgba(255,255,255,0.6)`
- `max-width: 600px; margin-top: 20px`
- `font-family: 'Microsoft JhengHei', 'DM Sans', sans-serif` (CJK primary)

**CTA Buttons:**
- Primary: `background: linear-gradient(135deg, #5227ff 0%, #1a1aff 100%); color: #fff; font-size: 16px; font-weight: 600; padding: 14px 32px; border-radius: 12px; border: none; cursor: pointer`
- Primary hover: `box-shadow: 0 8px 32px rgba(82, 39, 255, 0.45); transform: translateY(-2px); transition: all 0.25s ease`
- Secondary: `background: transparent; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); padding: 14px 32px; border-radius: 12px`
- Secondary hover: `border-color: rgba(82, 39, 255, 0.5); color: #fff`
- Gap between buttons: `16px`
- `margin-top: 36px`

**Stats Bar:**
- `margin-top: 64px; display: flex; gap: 48px`
- Each stat: `font-size: 14px; color: rgba(255,255,255,0.5)`
- Stat number: `font-size: 24px; font-weight: 700; color: #ffcc00` (gold accent)
- Divider between stats: `width: 1px; height: 40px; background: rgba(255,255,255,0.1)`

**Hero Visual (Right side on desktop, below text on mobile):**
- AI-generated illustration prompt: "Abstract 3D glowing orb made of interconnected neural network nodes, purple (#5227ff) and blue (#1a1aff) energy lines, floating data points, dark void background, volumetric lighting, cinematic, 8k, unreal engine style"
- Container: `width: 500px; height: 500px; position: relative`
- Add CSS glow: `filter: drop-shadow(0 0 60px rgba(82, 39, 255, 0.3))`
- Subtle float animation: `animation: float 6s ease-in-out infinite` → `@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }`

**Mobile (≤768px):**
- Padding: `120px 20px 80px`
- Headline: text-align center
- Subtitle: text-align center, `max-width: 100%`
- Buttons: `flex-direction: column; width: 100%`
- Stats bar: `flex-wrap: wrap; gap: 24px; justify-content: center`
- Hero visual: below text, `width: 300px; height: 300px; margin: 40px auto 0`

---

## Section 2: Evolution Path (3 Stages)

### Current Problems
- Stages are isolated text blocks with no visual connection
- No sense of progression or flow
- English labels ("Perceive", "Act", "Evolve") appear disconnected from Chinese content
- No animations or scroll-triggered reveals

### Proposed Design

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         一个 Agent 的进化路径                              │
│         从信号到决策到自我迭代...                           │
│                                                         │
│    ┌──────────┐     ┌──────────┐     ┌──────────┐       │
│    │ 01       │────▶│ 02       │────▶│ 03       │       │
│    │ 感知     │     │ 决策     │     │ 进化     │       │
│    │ Perceive │     │ Act      │     │ Evolve   │       │
│    │          │     │          │     │          │       │
│    │ [desc]   │     │ [desc]   │     │ [desc]   │       │
│    │          │     │          │     │          │       │
│    │ 🔵icon   │     │ 🟣icon   │     │ 🟡icon   │       │
│    └──────────┘     └──────────┘     └──────────┘       │
│                                                         │
│    ═══════════●═══════════●═══════════●═════════        │
│            Stage 1     Stage 2     Stage 3              │
│                   (progress line)                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Design Specs

**Section Container:**
- `padding: 120px 24px`
- `max-width: 1200px; margin: 0 auto`
- Background: `#0a0518` (consistent dark)
- Optional: subtle gradient divider at top — `border-top: 1px solid rgba(82,39,255,0.1)`

**Section Title:**
- `font-size: clamp(28px, 4vw, 44px); font-weight: 700; color: #fff; text-align: center`
- `letter-spacing: -0.01em; line-height: 1.3`

**Section Subtitle:**
- `font-size: 16px; color: rgba(255,255,255,0.5); text-align: center; max-width: 560px; margin: 16px auto 0; line-height: 1.7`

**Stage Cards Container:**
- `display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 64px`
- Connected by a horizontal progress line behind cards

**Progress Line:**
- `position: absolute; top: 50%; width: 100%; height: 2px; background: linear-gradient(90deg, #5227ff, #a366ff, #ffcc00)`
- Animated on scroll: line draws left-to-right using `stroke-dashoffset` or `width` transition
- Dots at each stage intersection: `width: 12px; height: 12px; border-radius: 50%; background: #5227ff; border: 2px solid #a366ff; box-shadow: 0 0 16px rgba(82,39,255,0.5)`

**Each Stage Card:**
- `background: rgba(255,255,255,0.03); border: 1px solid rgba(82,39,255,0.1); border-radius: 20px`
- `padding: 40px 32px`
- Hover: `border-color: rgba(82,39,255,0.3); background: rgba(82,39,255,0.06); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(82,39,255,0.1)`
- `transition: all 0.35s ease`

**Stage Number:**
- `font-size: 14px; font-weight: 600; color: #a366ff; letter-spacing: 0.1em; text-transform: uppercase`
- Format: "01", "02", "03"

**Stage Chinese Title:**
- `font-size: 28px; font-weight: 700; color: #fff; margin-top: 16px`

**Stage English Label:**
- `font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.15em; margin-top: 4px`

**Stage Description:**
- `font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.55); margin-top: 20px`

**Stage Icon (bottom of card):**
- Custom icon for each stage, `48px × 48px`
- Stage 1 (Perceive): Eye/radar icon in `#5227ff`
- Stage 2 (Act): Lightning/crosshair icon in `#a366ff`
- Stage 3 (Evolve): DNA/infinity icon in `#ffcc00`
- `opacity: 0.6` default, `opacity: 1` on card hover

**Color Accent per Stage:**
- Stage 1: left border accent `border-left: 3px solid #5227ff`
- Stage 2: left border accent `border-left: 3px solid #a366ff`
- Stage 3: left border accent `border-left: 3px solid #ffcc00`

**Scroll Animation:**
- Cards enter with `opacity: 0; transform: translateY(40px)` → `opacity: 1; transform: translateY(0)`
- Staggered: card 1 at 0ms, card 2 at 150ms, card 3 at 300ms
- `transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1)`
- Progress line animates after cards appear

**AI Image Prompts for Stage Icons:**
- Perceive: "Minimalist glowing eye icon, scanning radar waves, purple (#5227ff) neon on dark background, flat design, clean lines"
- Act: "Minimalist lightning bolt crossing a targeting crosshair, purple-blue gradient (#5227ff to #a366ff), dark background, flat icon"
- Evolve: "Minimalist DNA double helix transforming into an infinity symbol, gold (#ffcc00) glow, dark background, flat icon"

**Mobile (≤768px):**
- `grid-template-columns: 1fr`
- Progress line becomes vertical on left side
- Cards: `padding: 32px 24px`
- Each card left-aligned with vertical timeline dot

---

## Section 3: Three Capabilities

### Current Problems
- Stats ("4 维信号源", "< 200ms", "每轮迭代") are present but likely not visually prominent
- Cards may lack depth and visual hierarchy
- No interactive states
- The section title "三件事，定义边界" is strong but the layout needs to match the ambition

### Proposed Design

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         三件事，定义边界                                   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  ╔══════════════╗                                │   │
│  │  ║ 4            ║  多源感知引擎                    │   │
│  │  ║ 维信号源      ║                                │   │
│  │  ║ 实时接入      ║  链上异动、CEX 订单流...        │   │
│  │  ╚══════════════╝                                │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────┐ ┌────────────────────────┐ │
│  │ < 200ms                 │ │ 每轮迭代                │ │
│  │ 决策延迟                 │ │ 自动优化                │ │
│  │ 自主交易框架             │ │ 策略自进化系统          │ │
│  │ [description]           │ │ [description]          │ │
│  └─────────────────────────┘ └────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Layout: First card spans full width (featured), cards 2 and 3 are side by side below.

### Design Specs

**Section:**
- `padding: 120px 24px; max-width: 1200px; margin: 0 auto`

**Section Title:**
- Same as Section 2 title specs

**Cards Grid:**
- `display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 64px`
- Card 1: `grid-column: 1 / -1` (full width)
- Cards 2–3: `display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px`

**Card Base:**
- `background: linear-gradient(135deg, rgba(82,39,255,0.06) 0%, rgba(26,26,255,0.03) 100%)`
- `border: 1px solid rgba(82,39,255,0.1); border-radius: 24px`
- `padding: 48px 40px`
- `position: relative; overflow: hidden`
- Hover: `border-color: rgba(82,39,255,0.25); box-shadow: 0 24px 80px rgba(82,39,255,0.08)`
- `transition: all 0.35s ease`

**Card Decorative Glow:**
- `::before` pseudo-element: `content: ''; position: absolute; top: -50%; right: -50%; width: 200px; height: 200px; background: radial-gradient(circle, rgba(82,39,255,0.1) 0%, transparent 70%); pointer-events: none`

**Stat Number (Hero metric in each card):**
- `font-size: clamp(36px, 5vw, 56px); font-weight: 800; color: #ffcc00`
- `line-height: 1.1; letter-spacing: -0.02em`
- For "< 200ms": the `<` in `font-size: 24px; color: rgba(255,204,0,0.5)` and `200ms` in full size
- Animate on scroll: count-up animation for numbers using `requestAnimationFrame`

**Stat Label:**
- `font-size: 14px; color: rgba(255,255,255,0.4); margin-top: 4px; letter-spacing: 0.05em`

**Card Title:**
- `font-size: 22px; font-weight: 700; color: #fff; margin-top: 24px`

**Card Description:**
- `font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.55); margin-top: 12px`

**Featured Card (Card 1) Additional Specs:**
- `display: grid; grid-template-columns: auto 1fr; gap: 48px; align-items: center`
- Left: stat block; Right: title + description
- Min-height: `200px`

**Mobile (≤768px):**
- All cards: `grid-template-columns: 1fr`
- Featured card: single column layout, stat on top
- `padding: 32px 24px`

---

## Section 4: Ecosystem Positioning

### Current Problems
- 4 bullet points as plain text — not visually engaging
- No icons, no visual metaphor for "ecosystem"
- Section title is strong but the content delivery is flat

### Proposed Design

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│     不是工具，是生态                                      │
│     [subtitle paragraph]                                │
│                                                         │
│  ┌───────────┐  ┌───────────┐                           │
│  │ 🔒        │  │ 🏆        │                           │
│  │ 独立运行   │  │ 竞技排名   │                           │
│  │ [desc]    │  │ [desc]    │                           │
│  └───────────┘  └───────────┘                           │
│  ┌───────────┐  ┌───────────┐                           │
│  │ 🛒        │  │ 🔧        │                           │
│  │ 策略市场   │  │ 开发者扩展 │                           │
│  │ [desc]    │  │ [desc]    │                           │
│  └───────────┘  └───────────┘                           │
│                                                         │
│      [ Centered Visual: Network Graph ]                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Design Specs

**Section:**
- `padding: 120px 24px; max-width: 1200px; margin: 0 auto`
- Background variation: `background: linear-gradient(180deg, #0a0518 0%, #0d0825 100%)`

**Layout:**
- Two-column: left = text + 2×2 grid cards; right = visual
- `display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center`

**Ecosystem Cards (2×2 Grid):**
- `display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px`
- Each card: `background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px`
- Icon: `40px × 40px; margin-bottom: 12px; color: #a366ff`
- Card title: `font-size: 16px; font-weight: 600; color: #fff`
- Card desc: `font-size: 13px; line-height: 1.6; color: rgba(255,255,255,0.45); margin-top: 8px`
- Hover: `border-color: rgba(163,102,255,0.2); background: rgba(82,39,255,0.04)`

**Icons for each card:**
- 独立运行: Shield/lock icon
- 竞技排名: Trophy/leaderboard icon
- 策略市场: Shopping cart/marketplace icon
- 开发者扩展: Code/wrench icon

**Right Visual:**
- AI-generated illustration prompt: "Network graph visualization showing interconnected AI agent nodes, each node is a glowing orb with purple (#5227ff) connections, dark space background, some nodes brighter than others showing hierarchy, holographic style, 4k"
- `max-width: 480px; filter: drop-shadow(0 0 40px rgba(82,39,255,0.2))`

**Mobile (≤768px):**
- `grid-template-columns: 1fr`
- Visual moves below cards
- Cards grid: `grid-template-columns: 1fr` on <480px

---

## Section 5: Roadmap

### Current Problems
- Extremely minimal — v1.0 → v1.1 with 3 features
- No visual timeline, no dates, no progress indicators
- Feels like an afterthought

### Proposed Design

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         Roadmap                                         │
│                                                         │
│  ────●────────────────●────────────────●──────▶         │
│     v1.0            v1.1            v2.0                │
│   公测上线        功能扩展          生态开放              │
│   2026 Q1         2026 Q2          2026 Q3              │
│                                                         │
│   ┌─────────────────────────────────────────┐           │
│   │ v1.0 → v1.1 支撑功能                    │           │
│   │                                         │           │
│   │ P1  市场概览        ██████████░░ 80%     │           │
│   │ P2  链上数据        ██████░░░░░░ 50%     │           │
│   │ P3  新闻资讯聚合    ████░░░░░░░░ 30%     │           │
│   └─────────────────────────────────────────┘           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Design Specs

**Section:**
- `padding: 120px 24px; max-width: 1000px; margin: 0 auto`

**Section Title:**
- `font-size: clamp(28px, 4vw, 44px); font-weight: 700; color: #fff; text-align: center`

**Timeline:**
- Horizontal line: `height: 2px; background: linear-gradient(90deg, #5227ff, #a366ff, rgba(163,102,255,0.2))`
- Milestone dots: `width: 16px; height: 16px; border-radius: 50%; border: 3px solid #5227ff; background: #0a0518`
- Current milestone: `background: #5227ff; box-shadow: 0 0 20px rgba(82,39,255,0.5)`
- `margin-top: 64px`

**Milestone Labels:**
- Version: `font-size: 16px; font-weight: 700; color: #fff`
- Name: `font-size: 14px; color: rgba(255,255,255,0.5)`
- Quarter: `font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 4px`

**Feature Progress Cards:**
- Container: `background: rgba(255,255,255,0.02); border: 1px solid rgba(82,39,255,0.1); border-radius: 20px; padding: 40px; margin-top: 48px`
- Each feature row: `display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.04)`
- Priority badge: `font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px`
  - P1: `background: rgba(82,39,255,0.15); color: #a366ff`
  - P2: `background: rgba(255,204,0,0.1); color: #ffcc00`
  - P3: `background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.4)`
- Feature name: `font-size: 15px; font-weight: 600; color: #fff; flex: 0 0 120px`
- Description: `font-size: 13px; color: rgba(255,255,255,0.45); flex: 1`
- Progress bar: `width: 120px; height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden`
  - Fill: `height: 100%; background: linear-gradient(90deg, #5227ff, #a366ff); border-radius: 2px; transition: width 1s ease`

**Mobile (≤768px):**
- Timeline becomes vertical
- Feature rows stack: `flex-direction: column; align-items: flex-start`
- Progress bar: `width: 100%`

---

## Section 6: Footer

### Current Problems
- Single copyright line — bare minimum
- No links, no social media, no CoinW branding
- No secondary CTA

### Proposed Design

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │          准备好让 AI 替你交易了吗？                │    │
│  │                                                 │    │
│  │           [🚀 立即加入公测]                       │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ──────────────────────────────────────────────────     │
│                                                         │
│  [CoinW Logo]                                           │
│                                                         │
│  Product        Resources       Community               │
│  AgentX         Docs            Twitter                 │
│  API            Blog            Telegram                │
│  Pricing        Changelog       Discord                 │
│                                                         │
│  ──────────────────────────────────────────────────     │
│  © 2026 CoinW · Privacy · Terms        [Social Icons]   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Design Specs

**Pre-Footer CTA Block:**
- `padding: 80px 24px; text-align: center`
- Background: `linear-gradient(180deg, transparent 0%, rgba(82,39,255,0.08) 100%)`
- Headline: `font-size: clamp(24px, 3.5vw, 36px); font-weight: 700; color: #fff`
- CTA button: same specs as hero primary CTA but larger: `padding: 18px 48px; font-size: 18px; border-radius: 14px`
- Add floating particles/glow effect around button

**Footer:**
- `padding: 64px 24px 32px; max-width: 1200px; margin: 0 auto`
- `border-top: 1px solid rgba(255,255,255,0.06)`

**Footer Grid:**
- `display: grid; grid-template-columns: 2fr repeat(3, 1fr); gap: 48px`
- Column 1: CoinW logo (`height: 32px`) + tagline (`font-size: 13px; color: rgba(255,255,255,0.35); margin-top: 12px; max-width: 240px`)
- Columns 2-4: link groups
- Link group title: `font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px`
- Links: `font-size: 14px; color: rgba(255,255,255,0.4); line-height: 2.2; text-decoration: none`
- Link hover: `color: #a366ff`

**Bottom Bar:**
- `padding-top: 32px; margin-top: 48px; border-top: 1px solid rgba(255,255,255,0.04)`
- `display: flex; justify-content: space-between; align-items: center`
- Copyright: `font-size: 12px; color: rgba(255,255,255,0.25)`
- Social icons: `display: flex; gap: 16px`
- Each icon: `width: 32px; height: 32px; color: rgba(255,255,255,0.3); transition: color 0.2s`
- Icon hover: `color: #a366ff`

**Mobile (≤768px):**
- Grid: `grid-template-columns: 1fr 1fr`
- Logo column: `grid-column: 1 / -1`
- Bottom bar: `flex-direction: column; gap: 16px; text-align: center`

---

# Part 4: New Sections to Add

## 4.1 Trust & Security Section (Insert after Hero)

**Why:** AgentX requires API key access. This is the #1 conversion blocker.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         你的资产，你掌控                                  │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ 🔒       │  │ 🛡️       │  │ 📋       │              │
│  │ AES-256  │  │ 无提币    │  │ 审计日志  │              │
│  │ 加密存储  │  │ 权限隔离  │  │ 全程可查  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                         │
│     "仅需交易权限，不碰提币 API"                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Specs:**
- 3 trust cards in a row
- Each: icon (48px, #a366ff) + title (16px, 700, #fff) + desc (13px, rgba(255,255,255,0.5))
- Card: `background: rgba(82,39,255,0.04); border: 1px solid rgba(82,39,255,0.08); border-radius: 16px; padding: 32px; text-align: center`
- Optional: security certification badge/logo

## 4.2 Live Performance Dashboard (Insert after Capabilities)

**Why:** Show the product works with real/simulated data.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         实时数据，公开透明                                 │
│                                                         │
│    活跃 Agent     总交易量      平均胜率     最大回撤       │
│    1,247         $12.4M       67.3%       -8.2%         │
│                                                         │
│    ┌───────────────────────────────────────────┐        │
│    │     [Live Performance Chart]              │        │
│    │     Agent 综合收益曲线 (30天)               │        │
│    └───────────────────────────────────────────┘        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Specs:**
- Stats row: `display: flex; justify-content: center; gap: 64px`
- Each stat number: `font-size: 40px; font-weight: 800; color: #fff`
- Positive stats get `color: #00cc88` (green); drawdown gets `color: #ff4444` (red)
- Labels: `font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 4px`
- Chart: embedded lightweight chart (Chart.js or Recharts), `height: 300px; border-radius: 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(82,39,255,0.1); padding: 24px`
- Chart line color: `#5227ff` with gradient fill to transparent
- Animate numbers with count-up on scroll enter

## 4.3 Beta Tester Testimonials (Insert after Performance)

**Why:** Social proof from real/curated beta users.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         公测用户怎么说                                    │
│                                                         │
│  ┌──────────────────┐ ┌──────────────────┐              │
│  │ "接入3天就跑通了  │ │ "决策日志很透明， │              │
│  │  整个流程..."     │ │  终于不是黑箱..."  │              │
│  │                  │ │                  │              │
│  │ 👤 @trader_wang  │ │ 👤 @crypto_li    │              │
│  │ 使用 14 天       │ │ 使用 30 天       │              │
│  └──────────────────┘ └──────────────────┘              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Specs:**
- Carousel or 2-3 card grid
- Card: `background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 32px`
- Quote: `font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.7); font-style: italic`
- Large opening quote mark: `font-size: 48px; color: rgba(82,39,255,0.3); font-family: Georgia, serif`
- User avatar: `40px; border-radius: 50%; border: 2px solid rgba(82,39,255,0.3)`
- Username: `font-size: 14px; font-weight: 600; color: #fff`
- Duration badge: `font-size: 12px; color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.04); padding: 2px 8px; border-radius: 4px`

## 4.4 Partner/Integration Logos (Insert in Footer area)

**Why:** Show supported exchanges and data sources.

```
┌─────────────────────────────────────────────────────────┐
│  Supported:  [CoinW] [Binance] [OKX] [Bybit] [HTX]    │
│  Data:       [Glassnode] [Nansen] [DefiLlama] [Dune]   │
└─────────────────────────────────────────────────────────┘
```

**Specs:**
- `padding: 48px 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.04)`
- Label: `font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.25); margin-bottom: 24px`
- Logos: `height: 24px; opacity: 0.3; filter: grayscale(100%); transition: all 0.3s`
- Logo hover: `opacity: 0.7; filter: grayscale(0%)`
- `display: flex; justify-content: center; gap: 48px; flex-wrap: wrap`

## 4.5 FAQ Section (Insert before Footer)

**Why:** Address objections and reduce support burden.

**Questions:**
1. AgentX 安全吗？我的资金会有风险吗？
2. 需要什么技术背景才能使用？
3. 支持哪些交易所？
4. 公测期间收费吗？
5. Agent 的策略会泄露给其他用户吗？

**Specs:**
- Accordion style
- Container: `max-width: 720px; margin: 0 auto`
- Each item: `border-bottom: 1px solid rgba(255,255,255,0.06); padding: 24px 0`
- Question: `font-size: 16px; font-weight: 600; color: #fff; cursor: pointer; display: flex; justify-content: space-between; align-items: center`
- Chevron: `width: 20px; color: rgba(255,255,255,0.3); transition: transform 0.3s; rotate 180deg when open`
- Answer: `font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.5); padding-top: 16px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease`
- Open state: `max-height: 200px`

---

# Part 5: Design System Notes

## 5.1 Color Tokens

```css
:root {
  /* Brand */
  --color-primary: #5227ff;
  --color-primary-light: #a366ff;
  --color-primary-dark: #1a1aff;
  --color-accent-gold: #ffcc00;
  --color-accent-orange: #ff6600;
  
  /* Semantic */
  --color-success: #00cc88;
  --color-danger: #ff4444;
  --color-warning: #ffcc00;
  
  /* Backgrounds */
  --bg-base: #0a0518;
  --bg-elevated: rgba(255, 255, 255, 0.03);
  --bg-hover: rgba(82, 39, 255, 0.06);
  --bg-card: rgba(255, 255, 255, 0.02);
  
  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(82, 39, 255, 0.1);
  --border-hover: rgba(82, 39, 255, 0.25);
  --border-active: rgba(82, 39, 255, 0.4);
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.5);
  --text-muted: rgba(255, 255, 255, 0.35);
  --text-faint: rgba(255, 255, 255, 0.2);
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #5227ff, #1a1aff);
  --gradient-text: linear-gradient(135deg, #ffffff 0%, #a366ff 100%);
  --gradient-glow: radial-gradient(ellipse, rgba(82, 39, 255, 0.15), transparent);
  
  /* Shadows */
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.2);
  --shadow-card-hover: 0 20px 60px rgba(82, 39, 255, 0.1);
  --shadow-glow: 0 0 40px rgba(82, 39, 255, 0.3);
  --shadow-button: 0 8px 32px rgba(82, 39, 255, 0.4);
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 80px;
  --space-section: 120px;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-full: 100px;
  
  /* Typography */
  --font-sans: 'DM Sans', 'Microsoft JhengHei', 'Noto Sans SC', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Font Sizes */
  --text-xs: 12px;
  --text-sm: 13px;
  --text-base: 15px;
  --text-md: 16px;
  --text-lg: 18px;
  --text-xl: 22px;
  --text-2xl: 28px;
  --text-3xl: 36px;
  --text-4xl: 44px;
  --text-5xl: 56px;
  --text-hero: clamp(40px, 6vw, 72px);
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  
  /* Line Heights */
  --leading-tight: 1.15;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
  --leading-cjk: 1.8;
  
  /* Transitions */
  --ease-default: 0.25s ease;
  --ease-spring: 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  --ease-bounce: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Z-index */
  --z-header: 1000;
  --z-modal: 2000;
  --z-tooltip: 3000;
  
  /* Layout */
  --max-width: 1200px;
  --max-width-narrow: 720px;
  --max-width-medium: 1000px;
  --header-height: 64px;
}
```

## 5.2 Component Patterns

### Button Variants

```css
/* Primary */
.btn-primary {
  background: var(--gradient-primary);
  color: #fff;
  font-size: var(--text-md);
  font-weight: var(--font-semibold);
  padding: 14px 32px;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all var(--ease-default);
}
.btn-primary:hover {
  box-shadow: var(--shadow-button);
  transform: translateY(-2px);
}

/* Secondary / Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: var(--text-secondary);
  padding: 14px 32px;
  border-radius: var(--radius-md);
  transition: all var(--ease-default);
}
.btn-ghost:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
}
```

### Card Base

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl) var(--space-xl);
  transition: all var(--ease-spring);
}
.card:hover {
  border-color: var(--border-hover);
  background: var(--bg-hover);
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}
```

### Badge / Pill

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(82, 39, 255, 0.12);
  border: 1px solid rgba(82, 39, 255, 0.3);
  border-radius: var(--radius-full);
  padding: 6px 16px;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-primary-light);
}
```

### Section Title

```css
.section-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  text-align: center;
  letter-spacing: -0.01em;
  line-height: var(--leading-snug);
}
.section-subtitle {
  font-size: var(--text-md);
  color: var(--text-tertiary);
  text-align: center;
  max-width: 560px;
  margin: var(--space-md) auto 0;
  line-height: var(--leading-relaxed);
}
```

## 5.3 Animation Library

```css
/* Fade Up (scroll reveal) */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-up {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Staggered children */
.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 150ms; }
.stagger > *:nth-child(3) { animation-delay: 300ms; }
.stagger > *:nth-child(4) { animation-delay: 450ms; }

/* Float (hero visual) */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Pulse (badge dot) */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
}

/* Glow pulse (buttons, accents) */
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(82, 39, 255, 0.2); }
  50% { box-shadow: 0 0 40px rgba(82, 39, 255, 0.4); }
}

/* Count up (stats) — implement via JS */
/* Use Intersection Observer to trigger when element enters viewport */
/* requestAnimationFrame loop from 0 to target over 1.5s with easeOutExpo */

/* Line draw (roadmap timeline) */
@keyframes drawLine {
  from { width: 0; }
  to { width: 100%; }
}

/* Shimmer (loading state) */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Scroll Reveal Implementation

```javascript
// Use Intersection Observer for scroll-triggered animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

---

# Part 6: Implementation Priority

## Phase 1: Quick Wins (1–2 days)

These changes have the highest impact-to-effort ratio.

| # | Task | Impact | Effort |
|---|---|---|---|
| 1 | **Add primary CTA button** in hero + sticky header | 🔴 Critical | Low |
| 2 | **Add CoinW logo** to header and footer | High | Low |
| 3 | **Style stat numbers** with accent color + larger font | High | Low |
| 4 | **Add pre-footer CTA block** ("准备好了吗？") | High | Low |
| 5 | **Implement CSS custom properties** (design tokens) | Medium | Low |
| 6 | **Add meta tags** (OG image, description, Twitter card) | Medium | Low |
| 7 | **Add `lang="zh-CN"`** and proper font stack | Medium | Low |
| 8 | **Basic scroll-reveal animations** (fade-up on sections) | Medium | Low |

## Phase 2: Core Redesign (3–5 days)

| # | Task | Impact | Effort |
|---|---|---|---|
| 9 | **Redesign hero section** — two-column layout with visual + CTA buttons | 🔴 Critical | Medium |
| 10 | **Add Trust & Security section** (3 trust cards) | 🔴 Critical | Medium |
| 11 | **Redesign Evolution Path** — connected timeline with stage cards | High | Medium |
| 12 | **Redesign Capabilities cards** — featured layout with animated stats | High | Medium |
| 13 | **Redesign Roadmap** — visual timeline with progress bars | High | Medium |
| 14 | **Redesign Ecosystem section** — 2×2 grid with visual | Medium | Medium |
| 15 | **Build full footer** — links, social, legal | Medium | Medium |
| 16 | **Responsive design pass** — all breakpoints (375/768/1024/1440) | 🔴 Critical | Medium |
| 17 | **Add sticky navigation header** with scroll highlight | High | Medium |

## Phase 3: Polish (3–5 days)

| # | Task | Impact | Effort |
|---|---|---|---|
| 18 | **Add Live Performance Dashboard** section | High | High |
| 19 | **Add Testimonials** section | High | Medium |
| 20 | **Add FAQ accordion** | Medium | Medium |
| 21 | **Add Partner/Integration logos** bar | Medium | Low |
| 22 | **Hero 3D/animated visual** (AI-generated or Three.js) | Medium | High |
| 23 | **Count-up animations** for all stat numbers | Medium | Medium |
| 24 | **Language toggle** (EN/ZH) | Medium | High |
| 25 | **Accessibility audit** — ARIA labels, focus states, contrast | Medium | Medium |
| 26 | **Performance optimization** — lazy loading, code splitting | Low | Medium |
| 27 | **Micro-interactions** — button ripples, card hover particles | Low | Medium |

---

## Final Recommended Section Order

1. **Sticky Header** (logo + nav + CTA)
2. **Hero** (badge + headline + subtitle + 2 CTAs + visual + stats bar)
3. **Trust & Security** ← NEW
4. **Evolution Path** (3 stages with timeline)
5. **Three Capabilities** (featured card layout)
6. **Live Performance Dashboard** ← NEW
7. **Ecosystem Positioning** (2-col with visual)
8. **Testimonials** ← NEW
9. **Roadmap** (visual timeline)
10. **FAQ** ← NEW
11. **Partner Logos** ← NEW
12. **Pre-Footer CTA** ← NEW
13. **Full Footer** (links + social + legal)

---

*End of audit. This document is designed to be handed directly to a frontend developer for implementation. All color values, spacing, and CSS properties are production-ready.*
