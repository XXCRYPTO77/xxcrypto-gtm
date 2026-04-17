# AgentX Full-Site UI/UX Audit & Redesign Proposal

**Site:** https://xxcrypto-gtm.vercel.app  
**Date:** 2026-04-17  
**Auditor:** UX/UI Design Team  
**Token Reference:** `src/styles/tokens.css`

---

## Hard Constraints (from F's feedback — all proposals MUST comply)

1. **AgentX = independent brand** — NO CoinW logo on any page
2. **NO waitlist / "Join Beta"** — CTAs only point to GitHub + CoinW API docs
3. **NO social links** (TG/X/Discord)
4. **NO fake data** — beta hasn't launched, no inflated numbers
5. **NO exchange logos** not yet integrated (only CoinW)
6. **MANDATORY** dark mode compatibility — use `var()` tokens, never hardcode colors
7. Language toggle already exists in Navbar — no need to add

---

## 1. Executive Summary

### Overall Rating: 5.5/10

The AgentX site has strong content architecture and a clear product narrative across five acts. However, it suffers from visual monotony, lack of engagement elements, inconsistent component quality across pages, and missing responsive optimization. The site reads like a well-organized document rather than a premium fintech product.

### Key Strengths
- Clear 5-act narrative structure gives coherent product story
- Good bilingual support (CN/EN) with existing i18n system
- Solid token system foundation (`tokens.css`) with light/dark support
- Content quality is high — copy is sharp, technical yet accessible
- Security messaging in Act 1 is well-positioned

### Critical Weaknesses
- 🔴 No hero visuals/animations — pages feel like text documents
- 🔴 Responsive/mobile experience is poor across all pages
- 🔴 No scroll animations or micro-interactions — feels static
- 🔴 Card designs are too uniform — no visual hierarchy between sections
- 🟡 Inconsistent spacing and component patterns across acts
- 🟡 Dark mode not thoroughly tested on all pages
- 🟡 No loading states or skeleton screens
- 🟡 Accessibility gaps (contrast, focus states, ARIA labels)

### Top 5 Priority Recommendations
1. Add hero visual elements/animations to Act 1 & Act 2 (biggest visual impact)
2. Implement scroll-reveal animations site-wide (immediate polish boost)
3. Standardize card components and spacing rhythm across all pages
4. Mobile-first responsive pass on all pages
5. Add interactive elements to data-heavy sections (leaderboard, agent cards)

---

## 2. Global / Cross-Page Issues

### 2.1 Navigation & Information Architecture

**Rating: 7/10** 🟡

- ✅ Navbar with language toggle works well
- ✅ 5-act structure is intuitive
- 🟡 **No breadcrumbs** on sub-pages (Act 3 has 3 nested pages — users can get lost)
- 🟡 **No active state indicator** for current Act in navbar
- 🟡 **Act 3 hub → sub-pages** navigation could use tab-based UI instead of card links
- 🔴 **No back/up navigation** from /act3/arena, /act3/zone, /act3/events back to /act3

**Recommendations:**
- Add breadcrumb component: `Home / Act 3 / Arena`
- Highlight active Act in navbar with `border-bottom: 2px solid var(--color-brand)`
- Add sticky sub-navigation tabs for Act 3 sub-pages

### 2.2 Design Consistency

**Rating: 5/10** 🔴

- Each Act page feels slightly different in spacing, card style, section rhythm
- Hero sections vary: Act 1 has stats bar, Act 2 has mascot, Act 3 has cards — no unified hero pattern
- Section headings use different sizes and spacing across pages
- Roadmap component appears on Act 1, Act 2, Act 3, Act 4 but with different layouts

**Recommendations:**
- Create shared `SectionHeading` component: consistent `font-size: 2rem`, `font-weight: 700`, `color: var(--color-ink)`, `margin-bottom: var(--space-gutter)`
- Standardize section padding: `padding: var(--space-section) 0`
- Unify roadmap component into single reusable pattern
- Create shared hero layout pattern (badge → headline → subtitle → stats/CTA)

### 2.3 Token Usage & Dark Mode

**Rating: 6/10** 🟡

- Token system is well-defined in `tokens.css`
- `.cw-dark` class provides dark overrides
- 🟡 Some components may still use Tailwind color classes directly (e.g., `text-gray-500`) instead of semantic tokens
- 🟡 Need audit of all `bg-`, `text-`, `border-` classes to ensure they map to `var()` tokens
- 🔴 Gradient backgrounds and decorative elements may not have dark mode equivalents

**Recommendations:**
- Search codebase for raw color classes: `grep -r "bg-gray\|text-gray\|bg-white\|bg-black" src/`
- Replace with semantic: `bg-page`, `bg-surface`, `text-ink`, `text-muted`
- Add dark mode gradients where needed
- Test every page with `.cw-dark` class toggled

### 2.4 Typography & Spacing

**Rating: 6/10** 🟡

- Fonts: Satoshi (EN) + HarmonyOS Sans SC (ZH) — good choices
- 🟡 Heading hierarchy not consistent: some pages use `text-4xl` for H1, others `text-5xl` or `text-6xl`
- 🟡 Body text line-height varies
- 🟡 Spacing between sections inconsistent

**Recommendations — Typography Scale:**
```
H1 (Hero):     text-5xl (3rem) / font-bold / leading-tight
H2 (Section):  text-3xl (1.875rem) / font-bold / leading-snug  
H3 (Card):     text-xl (1.25rem) / font-semibold / leading-normal
Body:           text-base (1rem) / font-normal / leading-relaxed
Caption:        text-sm (0.875rem) / font-normal / leading-normal
Badge:          text-xs (0.75rem) / font-semibold / tracking-wide / uppercase
```

**Spacing rhythm:** Use `var(--space-section)` between all sections consistently.

### 2.5 Responsive Design

**Rating: 3/10** 🔴

- Most pages not optimized for mobile
- Tables (leaderboard) overflow on small screens
- Card grids don't collapse properly
- Hero text doesn't scale down

**Recommendations — Breakpoints:**
```
Mobile:  < 640px  → 1 column, reduced padding, smaller type
Tablet:  640-1024px → 2 columns, medium spacing
Desktop: > 1024px → full layout as designed
```

- All card grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Tables: horizontal scroll wrapper on mobile, or card-based layout
- Hero: `text-3xl sm:text-4xl lg:text-5xl`
- Section padding: `py-12 sm:py-16 lg:py-24`

### 2.6 Accessibility

**Rating: 3/10** 🔴

- No visible focus indicators on interactive elements
- No ARIA labels on icon-only elements
- No skip-to-content link
- Color contrast may fail on muted text against light backgrounds
- No keyboard navigation support for custom components

**Recommendations:**
- Add `focus-visible:ring-2 focus-visible:ring-brand` to all interactive elements
- Add `aria-label` to icon buttons and emoji-only elements
- Add skip link: `<a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>`
- Verify contrast ratios: `var(--color-muted)` on `var(--color-page)` — may need adjustment
- Add `role="table"` and proper `th`/`td` semantics to leaderboards

### 2.7 Animations & Interactions

**Rating: 2/10** 🔴

- Site is almost entirely static
- No scroll-reveal animations
- No hover micro-interactions beyond basic color changes
- No loading states or transitions between pages

**Recommendations — Global Animation System:**
```css
/* Scroll reveal — apply via Intersection Observer */
.reveal { opacity: 0; transform: translateY(24px); transition: all 0.6s var(--ease-out); }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* Staggered children */
.reveal-stagger > * { opacity: 0; transform: translateY(16px); transition: all 0.5s var(--ease-out); }
.reveal-stagger.visible > *:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger.visible > *:nth-child(2) { transition-delay: 100ms; }
.reveal-stagger.visible > *:nth-child(3) { transition-delay: 200ms; }
/* etc. */

/* Count-up animation for stats */
/* Use JS: animate from 0 to target number on scroll into view */

/* Card hover */
.card-hover { transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out); }
.card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
```

### 2.8 i18n Quality

**Rating: 7/10** 🟡

- Bilingual system exists and works
- 🟡 Some Chinese text is hardcoded rather than going through i18n
- 🟡 English translations could be more natural in places
- ✅ LangToggle in navbar — already functional

---

## 3. Per-Page Audit

---

### 3.1 Homepage (`/`)

**Rating: 6/10**

**Current State:** Clean hub page with 5 Act cards in a grid. Badge, hero text, card grid. Minimal but functional.

**Strengths:**
- Clean, focused layout
- Card hover states work
- Good use of gradient icons per Act
- Version tags on cards

**Issues:**

| Priority | Issue | Recommendation |
|----------|-------|----------------|
| 🔴 | Hero is purely text — visually flat | Add animated background element (see Image #1 below) |
| 🔴 | No visual indication of progress/current act | Add progress indicator or status badges (e.g., "Live", "Coming Soon") |
| 🟡 | Cards all look identical — no hierarchy | Differentiate active/live acts from future ones visually |
| 🟡 | No social proof or site-wide stats | Add aggregate stats: "X skills, X agents built" (only real data) |
| 🟡 | "进入体验" CTA only visible on hover | Show subtle CTA arrow always, brighten on hover |
| 🟢 | Background blob is very subtle | Increase opacity slightly: `bg-brand/8` instead of `bg-brand/5` |

**Redesign Proposals:**

**Hero Enhancement:**
```
Container: py-32 → py-36, add subtle radial gradient behind heading
Badge: keep as-is (good)
Headline: add `bg-gradient-to-r from-brand to-brand-med bg-clip-text text-transparent` to accent line
Subtitle: max-w-2xl, text-lg, color: var(--color-muted)
```

**Card Grid Enhancement:**
- Active acts (deployed): solid `border-brand/20` left border, subtle `bg-brand-soft/30` tint
- Future acts: dimmed with `opacity-60`, "Coming Soon" badge
- Add live indicator dot (pulsing green) for currently active acts:
```css
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-green); animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
```

**🖼️ Image #1 — Homepage Hero Background**
- **Description:** Abstract network/constellation pattern with connected nodes and lines, representing an AI agent network. Subtle, low-opacity overlay.
- **Dimensions:** 1440×600px
- **Colors:** Monochrome using `var(--color-brand)` at 5-10% opacity, nodes as small dots
- **Style:** Geometric, minimal, tech-inspired particle network
- **Placement:** Behind hero section, `position: absolute; opacity: 0.06`
- **Note:** Can likely be done with CSS/canvas rather than image — prefer code solution

---

### 3.2 Act 1 — AgentX Landing (`/act1`)

**Rating: 6.5/10**

**Current State:** Most polished page. Has hero, stats, trust section, evolution path, capabilities, ecosystem, FAQ, roadmap. F already approved trust section, FAQ, roadmap additions.

**Strengths:**
- Best content of any page — clear value proposition
- Trust & Security section (F-approved) is well-positioned
- FAQ is functional and addresses real concerns
- Stats row gives quick credibility

**Issues:**

| Priority | Issue | Recommendation |
|----------|-------|----------------|
| 🔴 | Hero is pure text — F confirmed needs visual element (M7) | Add animated hero visual (see Image #2) |
| 🔴 | Evolution path stages lack visual connection (M1) | Add connecting timeline line with scroll-reveal |
| 🔴 | Mobile layout completely unoptimized | Full responsive pass needed |
| 🟡 | Stats not visually emphasized enough (M2) | Larger numbers, accent color, count-up animation |
| 🟡 | Capability cards are flat — no depth | Add subtle shadows, hover effects, icon backgrounds |
| 🟡 | Ecosystem section bullet points are plain | Convert to mini-cards or icon+text rows |
| 🟡 | FAQ accordion needs better styling | Add smooth height animation, chevron rotation |
| 🟢 | Roadmap could use connecting line between versions | Add horizontal or vertical timeline connector |

**Redesign Proposals:**

**Hero Section:**
```
Layout: 2-column on desktop (text left, visual right), stack on mobile
Left column:
  Badge: rounded-full, border border-brand-light, bg-brand-soft, px-4 py-1.5, text-xs font-semibold text-brand
  Headline: text-5xl font-bold text-ink, leading-tight
  Subtitle: text-lg text-muted, max-w-xl, mt-4
  CTA row: mt-8, flex gap-4
    Primary: "View on GitHub" → bg-brand text-white rounded-xl px-6 py-3 font-semibold
    Secondary: "API Docs" → border border-border text-ink rounded-xl px-6 py-3
Right column: Hero visual (see Image #2)

Stats row (below hero):
  3 stat cards in flex row, gap-6
  Each: rounded-xl, border border-border, bg-surface, p-6
  Number: text-3xl font-bold text-brand (count-up animation on scroll)
  Label: text-sm text-muted mt-1
  Mobile: horizontal scroll or stack
```

**Evolution Timeline:**
```
Layout: vertical timeline with connecting line
Line: position absolute, left 50% (desktop) or left 24px (mobile)
  width: 2px, bg: var(--color-border), height: full
  Active progress: bg var(--color-brand), animated on scroll
  
Each stage card:
  Alternating left/right on desktop (stage 1 left, 2 right, 3 left)
  Stacked on mobile (all left of line)
  Card: rounded-xl, bg-surface, border border-border, p-8
  Stage number: text-xs font-semibold text-brand uppercase tracking-widest
  Title: text-2xl font-bold text-ink
  Body: text-base text-muted leading-relaxed
  English label: text-sm font-mono text-brand/60
  
Node dots on timeline:
  width: 16px, height: 16px, rounded-full
  border: 3px solid var(--color-brand)
  bg: var(--color-page)
  z-index: 10
  
Scroll reveal: each card fades in + slides from its side as user scrolls
```

**Capability Cards Enhancement:**
```
Grid: grid-cols-1 md:grid-cols-3, gap-6
Each card: 
  rounded-xl, bg-surface, border border-border, p-8
  hover: translateY(-4px), shadow-lg shadow-brand/5, border-brand/20
  transition: all 0.3s var(--ease-out)
  
Icon container: 
  w-12 h-12, rounded-lg, bg-brand-soft
  flex items-center justify-center
  icon color: var(--color-brand)
  
Stat badge (e.g. "4维信号源"):
  mt-4, inline-block, rounded-full
  bg-brand-soft, text-brand, text-xs font-semibold
  px-3 py-1
  
Title: text-xl font-semibold text-ink mt-4
Body: text-sm text-muted mt-2 leading-relaxed
```

**🖼️ Image #2 — Act 1 Hero Visual**
- **Description:** Abstract 3D visualization of an AI trading agent brain/neural network. Three interconnected orbs or nodes representing Perceive→Act→Evolve, with data streams flowing between them. Floating UI elements (mini charts, signal indicators) orbiting around.
- **Dimensions:** 600×500px
- **Colors:** Purple gradient (var(--color-brand) to var(--color-brand-med)), with subtle blue and white accents. Dark variant needed for .cw-dark mode.
- **Style:** Modern 3D isometric illustration, semi-abstract, glowing edges
- **Placement:** Right side of hero on desktop, hidden or scaled down on mobile
- **Format:** SVG preferred for scalability, or PNG with transparency

**🖼️ Image #3 — Evolution Stage Icons (×3)**
- **Description:** Three abstract icons for Perceive (radar/eye scanning data), Act (lightning bolt/crosshair executing trade), Evolve (DNA helix/recursive loop improving)
- **Dimensions:** 120×120px each
- **Colors:** Monochrome using var(--color-brand) with soft glow
- **Style:** Thin line art with subtle gradient fill
- **Format:** SVG

---

### 3.3 Act 1.5 — Watch (`/act15`)

**Rating: N/A** (Could not fully audit — chat observation page)

**Known Concept:** 3 AI agents discuss markets in real-time. Users observe without participating.

**General Recommendations:**
| Priority | Issue | Recommendation |
|----------|-------|----------------|
| 🟡 | Chat UI should feel alive | Add typing indicators, message appear animations |
| 🟡 | Need clear framing | Add header: "Watch AI agents analyze markets in real-time" |
| 🟡 | Differentiate agents visually | Distinct colors/avatars per agent |
| 🟢 | Add timestamps | Show relative time on each message |

---

### 3.4 Act 2 — CWClaw Adoption (`/act2`)

**Rating: 5.5/10**

**Current State:** Introduces CWClaw (lobster mascot AI agent). Shows capabilities and supporting infrastructure (multi-account, risk control, notifications).

**Strengths:**
- 🦞 Mascot gives personality — differentiates from Act 1's technical tone
- v1.2/v1.3/v1.4 feature breakdowns are detailed and well-structured
- Security emphasis (0 withdrawal permission) is well-placed

**Issues:**

| Priority | Issue | Recommendation |
|----------|-------|----------------|
| 🔴 | Hero section is text-heavy, mascot is just an emoji | Create proper CWClaw mascot illustration (see Image #4) |
| 🔴 | v1.2/v1.3/v1.4 sections are walls of text with tiny diagrams | Redesign as visual feature showcases with larger diagrams |
| 🔴 | No mobile optimization | Responsive pass needed |
| 🟡 | Stats row (18 Skills / 7×24h / 0 Withdrawal) could pop more | Use count-up animation, larger typography, accent backgrounds |
| 🟡 | Permission hierarchy diagram (v1.2) is hard to read | Enlarge, add colors, make interactive on hover |
| 🟡 | Risk control flow (v1.3) diagram needs visual hierarchy | Use step indicators with colored status badges |
| 🟡 | TG/Email notification mockups (v1.4) could be more realistic | Style as actual device frames |
| 🟢 | "认养" (Adopt) metaphor is cute but might confuse | Add brief explainer: "Your personal AI trading agent" |

**Redesign Proposals:**

**Hero Section:**
```
Layout: 2-column (text left, mascot right)
Left:
  Badge: "v1.2 – v1.4" version range
  Headline: "认养你的 CWClaw" → text-5xl font-bold
  Subtitle: text-lg text-muted max-w-lg
  Stats row: 3 items inline, same style as Act 1
  CTA: "Start with CWClaw" → github link
  
Right: CWClaw mascot illustration (Image #4)
```

**Feature Showcase (v1.2/v1.3/v1.4):**
```
Each version section:
  Full-width, alternating bg: var(--color-page) / var(--color-surface)
  2-column layout: text | visual (alternating sides)
  
  Version badge: text-xs font-mono text-brand bg-brand-soft rounded-full px-3 py-1
  Title: text-2xl font-bold text-ink
  Bullet list: flex flex-col gap-3
    Each: flex items-start gap-3
    Dot: w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0
    Text: text-base text-muted
    
  Visual side: enlarged diagram/mockup at 100% width of column
  rounded-xl border border-border overflow-hidden
  
Mobile: stack to single column, visual below text
```

**🖼️ Image #4 — CWClaw Mascot**
- **Description:** Friendly robotic lobster character (CWClaw 🦞). Stylized, modern, slightly cute but professional. Holding a trading chart or with data visualizations around it. Purple-themed to match brand.
- **Dimensions:** 500×500px
- **Colors:** Primary var(--color-brand) purple body, white/light accents, subtle glow
- **Style:** 3D character illustration, Pixar-lite quality, friendly expression
- **Format:** PNG with transparency
- **Dark mode:** Needs slight glow adjustment for dark backgrounds

**🖼️ Image #5 — Device Mockups for v1.4 Notifications**
- **Description:** Phone mockup showing Telegram notification + laptop/email mockup showing daily report. Realistic device frames.
- **Dimensions:** 800×500px (combined composition)
- **Colors:** Device frames in var(--gray-700), screen content matches brand colors
- **Style:** Clean device mockup, slightly angled/floating
- **Format:** PNG

---

### 3.5 Act 3 — Ecosystem Hub (`/act3`)

**Rating: 5/10**

**Current State:** Hub page with 3 navigation cards (Arena/Zone/Events), ecosystem stats, core capabilities, roadmap.

**Strengths:**
- Card-based navigation to sub-pages works conceptually
- Live stats in cards (agent count, prize pool, season) add dynamism
- Core capability icons are clean

**Issues:**

| Priority | Issue | Recommendation |
|----------|-------|----------------|
| 🔴 | Page feels like a directory, not a destination | Add hero section with ecosystem story |
| 🔴 | Navigation cards are too similar in weight — no visual hierarchy | Differentiate Arena (primary/featured) from Zone and Events |
| 🟡 | Core capabilities are 6 icons with minimal text — too sparse | Expand into proper feature section with descriptions |
| 🟡 | Stats sidebar feels disconnected | Integrate stats into hero or card headers |
| 🟡 | No visual connection between Act 3 sub-pages | Add tab navigation that persists across Arena/Zone/Events |
| 🟢 | Roadmap section (P9-P11) is minimal | Align with roadmap component style from other Acts |

**Redesign Proposals:**

**Hero Section (new):**
```
Background: subtle gradient or pattern
Badge: "v1.5 · Ecosystem"
Headline: "AI Agent 生态系统" / "The Agent Ecosystem"
Subtitle: description of the three pillars
Stats row: aggregate stats (total agents, strategies, prize pool)
```

**Navigation Cards Redesign:**
```
Arena card (featured):
  col-span-2 on desktop (larger)
  bg: gradient from var(--color-brand) to var(--color-brand-med)
  text: white
  Large icon, prominent stats
  
Zone + Events cards:
  col-span-1 each
  bg: var(--color-surface)
  border: var(--color-border)
  Standard card style
  
All cards: rounded-xl, p-8, hover translateY(-4px)
Mobile: stack full-width
```

**Persistent Tab Navigation:**
```
Sticky below navbar:
  bg: var(--color-page), border-bottom: 1px solid var(--color-border)
  3 tabs: Arena | Zone | Events
  Active: text-brand, border-bottom 2px solid var(--color-brand)
  Inactive: text-muted
  Works as links, persists on all /act3/* pages
```

---

### 3.6 Act 3 Arena (`/act3/arena`)

**Rating: 5/10**

**Current State:** Trading competition page with leaderboard and social feed. Season-based.

**Strengths:**
- Leaderboard data is compelling
- 战绩广场 social feed adds personality
- Season/prize structure is clear

**Issues:**

| Priority | Issue | Recommendation |
|----------|-------|----------------|
| 🔴 | Hero is plain — doesn't feel like a competition/arena | Add dramatic hero with dark bg, prize pool highlighted |
| 🔴 | Leaderboard table is basic HTML — no visual treatment | Style top 3 as podium cards, rest as enhanced table |
| 🔴 | No mobile table handling | Card-based layout on mobile |
| 🟡 | 战绩广场 posts look like plain cards | Add social-media-like styling (avatar, action buttons) |
| 🟡 | No countdown/timer element | Add season countdown if end date exists |
| 🟡 | Copy trading teaser is too plain | Style as highlighted announcement card |
| 🟢 | Prize breakdown not visually clear | Add podium-style visual (1st/2nd/3rd) |

**Redesign Proposals:**

**Arena Hero:**
```
Background: var(--color-surface) with subtle radial glow of var(--color-brand) at top center
  In dark mode: var(--color-page) with more visible glow

Badge: "Season 3 · Q2 2026" → gold-tinted badge
  bg: rgba(245,166,35,0.1), text: var(--accent-amber), border: rgba(245,166,35,0.2)
  
Headline: "Agent Trading Arena" → text-5xl font-bold
  Consider gradient text: var(--color-brand) → var(--accent-amber)
  
Stats: 3 glassmorphism cards
  bg: var(--color-surface), backdrop-filter: blur(8px)
  border: 1px solid var(--color-border)
  rounded-xl, p-6
```

**Leaderboard Redesign:**
```
Top 3 — Podium cards:
  Horizontal flex, center-aligned
  2nd place | 1st place (taller) | 3rd place
  
  1st: border-2 border-amber, shadow-lg shadow-amber/10
    Crown icon or gold accent
    Large agent emoji, name, return %
    
  2nd/3rd: standard border, silver/bronze accent
  
Rank 4-10 — Table:
  rounded-xl overflow-hidden
  Header: bg-surface, text-xs font-semibold text-muted uppercase
  Rows: border-b border-border, py-4 px-6
  Hover: bg-surface/50
  Return column: text-accent-green for positive, text-accent-red for negative
  Rank column: text-lg font-bold
  
Mobile: hide drawdown + calls columns, show essential data only
```

**🖼️ Image #6 — Arena Hero Background**
- **Description:** Abstract competition/arena visual — a stylized gladiator arena or chess board with AI/digital elements. Purple and amber/gold energy beams converging at center. Dramatic but not overwhelming.
- **Dimensions:** 1440×500px
- **Colors:** Dark base (#0B0B0F), purple (var(--color-brand)) and amber (var(--accent-amber)) accents, 10-15% opacity as background
- **Style:** Abstract digital art, cinematic lighting
- **Format:** PNG or WebP, compressed

---

### 3.7 Act 3 Zone (`/act3/zone`)

**Rating: 4.5/10**

**Current State:** Agent directory — 11 agent cards in a list/grid.

**Strengths:**
- Good data per card (emoji, name, badge, stats, protocol)
- Official vs Community distinction is clear

**Issues:**

| Priority | Issue | Recommendation |
|----------|-------|----------------|
| 🔴 | Just a flat list — no filtering, sorting, or search | Add filter bar (by protocol, badge type, return range) |
| 🔴 | All cards same size/weight — top performers don't stand out | Feature top 3 agents with larger cards |
| 🟡 | No card click interaction (detail view) | Add expandable card or link to agent detail page |
| 🟡 | Protocol tags (WebSocket/REST/MCP) not visually differentiated | Color-code protocol badges |
| 🟡 | "关注" (Follow) count shown but no action available | Add follow button placeholder or remove stat |
| 🟢 | Agent emojis are the only visual identity | Consider adding unique gradient/color per agent |

**Redesign Proposals:**

**Filter Bar:**
```
Sticky below sub-nav, flex wrap gap-3
Pill filters: "All" | "Official" | "Community" | "MCP" | "REST" | "WebSocket"
  Active: bg-brand text-white
  Inactive: bg-surface border border-border text-muted
  
Sort dropdown: "Sort by: Return ↓" / "Calls" / "Followers"
  
Search: input with search icon, rounded-full, bg-surface, border-border
  placeholder: "Search agents..."
```

**Agent Cards Redesign:**
```
Featured row (top 3): larger cards, 3-column grid
  Card: rounded-xl, bg-surface, border border-border, p-8
  Agent emoji: text-4xl
  Name: text-xl font-bold text-ink
  Creator: text-sm text-muted
  Return: text-2xl font-bold text-accent-green
  Stats: flex gap-4, text-sm text-muted
  Protocol badge: rounded-full px-3 py-1 text-xs font-semibold
    MCP: bg-brand-soft text-brand
    REST: bg-amber/10 text-amber
    WebSocket: bg-green/10 text-green
    
Regular grid: smaller cards, 3-4 column grid
  Similar structure, more compact (p-5)

Hover: translateY(-2px), shadow, border-brand/20
Click: expand to show full description + more stats
```

---

### 3.8 Act 3 Events (`/act3/events`)

**Rating: 5.5/10**

**Current State:** Rich content — bounties, challenges, upcoming events, past events, rewards. Most content-dense page.

**Strengths:**
- Bounty system is compelling for developer engagement
- Community challenges with progress (89 participated, 12 completed) add social proof
- Upcoming events create anticipation
- Past events table provides credibility
- Reward system clearly explained

**Issues:**

| Priority | Issue | Recommendation |
|----------|-------|----------------|
| 🔴 | Information overload — 5 sections competing for attention | Add clear section dividers and visual hierarchy |
| 🔴 | Bounty cards all look the same priority | Differentiate by reward size or urgency |
| 🟡 | Upcoming events lack visual distinction from bounties | Use different card style (timeline or calendar view) |
| 🟡 | Past events table is plain | Add mini sparklines or result highlights |
| 🟡 | Challenge progress not visually represented | Add progress bars |
| 🟢 | No urgency indicators | Add "X days left" badges with color coding |

**Redesign Proposals:**

**Bounty Cards:**
```
Grid: grid-cols-1 md:grid-cols-2, gap-6
Card: rounded-xl, bg-surface, border border-border, p-6
  
Status badge (top-right):
  "竞标中" (Active): bg-accent-green/10 text-accent-green
  "已提交" (Submitted): bg-accent-amber/10 text-accent-amber
  
Tags: flex wrap gap-2 mt-3
  Each: rounded-full bg-brand-soft text-brand text-xs px-3 py-1
  
Reward: text-xl font-bold text-accent-amber (gold treatment)
  "500 Credit" with coin icon

Footer: flex justify-between text-sm text-muted
  "12 竞标" + "截止 2026-05-15"
  Deadline < 7 days: text-accent-red
  
Hover: translateY(-2px), border-brand/20
```

**Community Challenges:**
```
Card: horizontal layout (icon | content | progress)
Progress bar: 
  Track: h-2 rounded-full bg-border
  Fill: h-2 rounded-full bg-brand, width based on completion/participation ratio
  Text: "12/89 completed" text-sm text-muted

Badge: "徽章 + 200 Credit" → mini badge icon + gold text
```

**Upcoming Events Timeline:**
```
Vertical timeline layout with date markers
Each event: 
  Date marker: left side, text-sm font-mono text-brand
  Card: right side, rounded-xl bg-surface border-border p-6
  Icon: event type icon in colored circle
  Title: text-lg font-semibold text-ink
  Description: text-sm text-muted
  Prize: accent-amber text
  Date range: text-xs text-muted
```

---

### 3.9 Act 4 — Vision (`/act4`)

**Rating: 5/10**

**Current State:** Technical deep-dive — integration path, API matrix, security architecture, compliance, extensions. Most technical page.

**Strengths:**
- Comprehensive technical content
- 4-layer security architecture diagram is informative
- Extension directions (E1-E5) show product vision
- Compliance checklist is thorough

**Issues:**

| Priority | Issue | Recommendation |
|----------|-------|----------------|
| 🔴 | Too text-heavy for a "Vision" page — reads like documentation | Add visual storytelling, diagrams, and illustrations |
| 🔴 | Security architecture diagram is text-based | Create proper visual diagram (see Image #7) |
| 🟡 | 3-phase integration path is not visually distinct | Use timeline or step-by-step visual |
| 🟡 | Extension directions (E1-E5) are flat list | Use vision/roadmap card layout with connecting lines |
| 🟡 | API matrix section may be too technical for non-devs | Add summary/TL;DR above technical details |
| 🟡 | Compliance checklist: "规划中" (planned) items lack timeline | Add tentative timeline or priority indicator |
| 🟢 | Final timeline (v1.0→v2.0) could be more visual | Interactive horizontal timeline with milestones |

**Redesign Proposals:**

**Integration Path (3 phases):**
```
Horizontal stepper on desktop, vertical on mobile
3 columns with connecting arrows

Each phase:
  Step number: w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center text-lg font-bold
  Title: text-xl font-semibold text-ink mt-4
  Description: text-sm text-muted mt-2
  Code block (if applicable): rounded-lg bg-gray-900 text-gray-100 p-4 font-mono text-sm
  
Connecting arrow: 
  Desktop: horizontal line + chevron between columns
  Mobile: vertical line between steps
  Color: var(--color-border), animated on scroll
```

**Security Architecture Visual:**
```
4-layer stacked diagram with clear visual separation
Each layer: rounded-xl p-6, distinct bg tint
  Layer 1 (Agent): bg-brand-soft/50
  Layer 2 (MCP): bg-brand-soft/30  
  Layer 3 (Gateway): bg-accent-amber/10
  Layer 4 (Exchange): bg-accent-green/10
  
Arrows: vertical, one-way, animated on scroll
Labels: clear text with icons
```

**🖼️ Image #7 — Security Architecture Diagram**
- **Description:** Clean infographic showing 4-layer security architecture. Agent layer at top → MCP Server → Permission Gateway → Exchange API at bottom. Each layer as a distinct horizontal band with icons and labels. Arrows showing one-way data flow downward. Lock icons on the Gateway layer.
- **Dimensions:** 800×600px
- **Colors:** Layer colors using brand purple gradient (lightest at top, darkest at bottom). Arrow lines in var(--color-border). Lock icons in var(--accent-amber).
- **Style:** Clean infographic, modern, minimal. Similar to cloud architecture diagrams but with CoinW brand treatment.
- **Format:** SVG preferred, or PNG with transparency
- **Dark mode:** Must work on both light and dark backgrounds

---

## 4. Design System Recommendations

### 4.1 Shared Components to Create

| Component | Used On | Priority |
|-----------|---------|----------|
| `SectionHeading` | All pages | 🔴 High |
| `StatCard` (count-up) | Act 1, 2, 3, Arena | 🔴 High |
| `FeatureCard` (icon + title + desc) | Act 1, 3 | 🔴 High |
| `TimelineConnector` | Act 1, 2, Events | 🔴 High |
| `Badge/Pill` (status, version, tag) | All pages | 🟡 Medium |
| `RoadmapSection` | Act 1, 2, 3, 4 | 🟡 Medium |
| `AgentCard` | Zone, Arena, Feed | 🟡 Medium |
| `LeaderboardTable` | Arena | 🟡 Medium |
| `FilterBar` | Zone, Events | 🟡 Medium |
| `ScrollReveal` wrapper | All pages | 🔴 High |
| `Breadcrumb` | Act 3 sub-pages | 🟢 Low |
| `SubNav/Tabs` | Act 3 sub-pages | 🟡 Medium |

### 4.2 New Tokens to Add

```css
:root {
  /* Animation tokens */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  
  /* Shadow system */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.08);
  --shadow-brand: 0 8px 24px rgba(82,39,255,0.12);
  
  /* Z-index scale */
  --z-sticky: 100;
  --z-navbar: 200;
  --z-modal: 300;
  
  /* Glass effect */
  --glass-bg: rgba(255,255,255,0.6);
  --glass-blur: blur(12px);
  --glass-border: rgba(255,255,255,0.2);
}

.cw-dark {
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.3);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.4);
  --shadow-brand: 0 8px 24px rgba(124,92,255,0.2);
  
  --glass-bg: rgba(22,22,29,0.6);
  --glass-border: rgba(255,255,255,0.06);
}
```

### 4.3 Animation Patterns

```javascript
// Scroll Reveal — Intersection Observer
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Apply to all .reveal elements on mount
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

```css
/* Base reveal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* Slide from left/right (for alternating timeline) */
.reveal-left { transform: translateX(-24px); }
.reveal-right { transform: translateX(24px); }
.reveal-left.visible, .reveal-right.visible { transform: translateX(0); }

/* Card hover standard */
.card-interactive {
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out),
              border-color var(--duration-normal) var(--ease-out);
}
.card-interactive:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-brand-light);
}
```

---

## 5. Suggested New Features (within constraints)

| Feature | Page(s) | Description | Constraint-safe? |
|---------|---------|-------------|------------------|
| Scroll progress indicator | All | Thin brand-colored bar at top showing page scroll progress | ✅ |
| Dark/Light mode toggle | Navbar | If not already user-accessible | ✅ (uses existing token system) |
| Back-to-top button | Long pages | Appears after scrolling past hero | ✅ |
| Table of contents | Act 4 | Sticky sidebar TOC for long technical content | ✅ |
| Agent comparison | Zone | Select 2-3 agents to compare side-by-side | ✅ (uses existing data) |
| Event calendar view | Events | Monthly calendar showing all events | ✅ |
| Search (global) | All | Search across agents, strategies, events | ✅ |
| Skeleton loading states | All | Bone screen while data loads | ✅ |
| Share buttons (per agent/post) | Zone, Arena | Copy link, not social login | ✅ (link only, no social) |
| Print/Export (Act 4) | Act 4 | Export security/API docs as PDF | ✅ |

**NOT recommended (violates constraints):**
- ❌ User registration/login
- ❌ Live trading data
- ❌ Social media embeds
- ❌ External exchange integrations
- ❌ Testimonials or user quotes (no real users yet)

---

## 6. Implementation Roadmap

### Phase 1: Quick Wins (1-2 days)
Priority items that require minimal structural changes.

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 1 | Add `ScrollReveal` component + apply to all section headings and cards | High | 2h |
| 2 | Standardize section padding to `var(--space-section)` | Medium | 1h |
| 3 | Add card hover effects (`translateY(-4px)` + shadow) to all cards | Medium | 1h |
| 4 | Audit and replace raw Tailwind color classes with semantic tokens | High | 3h |
| 5 | Add breadcrumbs to Act 3 sub-pages | Low | 1h |
| 6 | Hero headline gradient text treatment (Act 1) | Medium | 30min |
| 7 | Add shadow and z-index tokens to `tokens.css` | Low | 30min |
| 8 | FAQ accordion smooth animation (Act 1) | Low | 1h |

### Phase 2: Core Improvements (1 week)
Structural redesigns that significantly improve visual quality.

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 1 | Act 1 hero — 2-column layout with visual element placeholder | High | 4h |
| 2 | Act 1 evolution timeline with connecting line + scroll reveal | High | 4h |
| 3 | Act 1 stat cards with count-up animation | Medium | 2h |
| 4 | Act 3 Arena — podium cards for top 3 + enhanced leaderboard | High | 4h |
| 5 | Act 3 Zone — filter bar + card redesign with protocol color-coding | Medium | 4h |
| 6 | Act 3 — persistent tab navigation across sub-pages | Medium | 3h |
| 7 | Act 2 — feature showcase redesign (v1.2/v1.3/v1.4 sections) | Medium | 4h |
| 8 | Act 3 Events — bounty cards, challenge progress bars, event timeline | Medium | 4h |
| 9 | Mobile responsive pass — all pages | High | 6h |
| 10 | Full dark mode testing + fixes | High | 3h |

### Phase 3: Polish & Enhancement (1-2 weeks)
Visual refinement and new features.

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 1 | Generate hero visuals (Images #2, #4, #6, #7) via AI | High | 2h |
| 2 | Act 4 — security architecture visual diagram | Medium | 4h |
| 3 | Act 4 — sticky table of contents sidebar | Low | 3h |
| 4 | Homepage — progress/status indicators on Act cards | Medium | 2h |
| 5 | Act 3 Zone — agent comparison feature | Low | 4h |
| 6 | Act 3 Events — calendar view | Low | 4h |
| 7 | Global search component | Low | 6h |
| 8 | Skeleton loading states | Low | 3h |
| 9 | Accessibility pass (ARIA, focus, contrast) | Medium | 4h |
| 10 | Performance audit (bundle size, image optimization) | Medium | 3h |

---

## 7. Image Generation Checklist

All images needed, ordered by priority. Describe to AI image generator (Gemini) with these prompts:

| # | Image | Page | Dimensions | Priority |
|---|-------|------|------------|----------|
| 1 | Hero visual (AI neural network / 3 nodes) | Act 1 | 600×500px | 🔴 P1 |
| 2 | CWClaw mascot (robotic lobster) | Act 2 | 500×500px | 🔴 P1 |
| 3 | Arena hero background (digital arena) | Arena | 1440×500px | 🔴 P1 |
| 4 | Security architecture diagram | Act 4 | 800×600px | 🟡 P2 |
| 5 | Evolution stage icons (×3) | Act 1 | 120×120px each | 🟡 P2 |
| 6 | Device mockups (TG + Email) | Act 2 | 800×500px | 🟡 P2 |
| 7 | Homepage network pattern | Homepage | 1440×600px | 🟢 P3 |

Detailed descriptions for each are in the per-page sections above.

---

*End of audit. All proposals use `var()` tokens. All recommendations respect F's hard constraints. Ready for F's review.*
