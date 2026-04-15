# UX/UI Audit & Redesign Proposal — CoinW Agent Zone (Act 3)
Prepared for CoinW · April 2026 · Reference Style: Bankoo Digital Banking Platform (Dribbble)
---
## 1. Executive Summary
This proposal presents a comprehensive UX/UI audit and redesign plan for the CoinW Agent Zone (Act 3) page. The current implementation delivers strong content — a live leaderboard, agent directory, strategy cards, and developer onboarding — but suffers from visual density, inconsistent spacing, weak brand alignment, and a lack of the modern, premium fintech aesthetic that CoinW deserves.
The redesign takes direct inspiration from the Bankoo Digital Banking Platform on Dribbble: clean whitespace, glassmorphism cards, soft gradients, and a refined card-based layout. We merge this aesthetic with CoinW's brand palette (primary #5227ff, accents #a366ff, #ffcc00) to create a premium Agent marketplace that feels trustworthy, modern, and empowering — aligned with the brand promise "Legendary Success Awaits."
Key findings: 🔴 Critical issues in visual density, responsive design, accessibility, and brand alignment. 🟡 Improvements needed in typography hierarchy, color consistency, and component quality. 🟢 Strong content structure and feature set provides an excellent foundation for redesign.
---
## 2. Current State Audit
### 2.1 Visual Design Assessment 🟡 Needs Improvement
- Typography: Chinese text uses system fonts inconsistently. No clear type scale — headings, body, and captions lack defined hierarchy. Font weights are not varied enough to create visual distinction. DM Sans (brand font) is not consistently applied.
- Colors: The page uses dark backgrounds with neon accents, creating a "crypto bro" aesthetic rather than CoinW's premium brand identity. The primary purple #5227ff appears sparingly; most color usage doesn't align with brand guidelines.
- Spacing: Sections are packed tightly with minimal breathing room. Card padding is insufficient. Margins between sections are inconsistent (some 24px, others 48px, no system).
- Consistency: Multiple card styles coexist — agent cards, strategy cards, and leaderboard rows all use different design languages. No unified component system.
### 2.2 Layout & Information Architecture 🟡 Needs Improvement
- The page is extremely long (11+ sections). No anchor navigation or table of contents. Users have no way to jump to sections of interest.
- Information hierarchy is flat — every section competes for equal attention. The leaderboard, agent directory, and strategy cards could be consolidated or tabbed.
- The revenue calculator and contributor tiers feel disconnected from the agent marketplace. The flow from 'browse agents' → 'understand earning potential' → 'start building' lacks smooth transitions.
### 2.3 Component Quality 🟡 Needs Improvement
- Leaderboard table: Functional but visually heavy. Row hover states undefined. No visual differentiation for top 3 positions beyond emojis.
- Agent cards: Contain good data (returns, daily calls, followers) but layout is cramped. Protocol badges (MCP/REST/WebSocket) lack visual consistency.
- Strategy cards: Best-designed component on the page. Win rate indicator is clear. However, the 汰换观察期 (deprecation) state needs stronger visual warning.
### 2.4 Responsive Design 🔴 Critical
- The leaderboard table is not optimized for mobile — horizontal scrolling is likely required. No responsive table pattern (card collapse, priority columns).
- Agent directory grid likely breaks at tablet widths. No evidence of mobile-first design approach.
- Code snippet in developer onboarding section will overflow on mobile without horizontal scroll or wrapping.
### 2.5 Accessibility 🔴 Critical
- Color contrast: Neon text on dark backgrounds likely fails WCAG AA (4.5:1 minimum). Green/red for profit/loss is indistinguishable for ~8% of male users with color vision deficiency.
- No visible focus states for interactive elements. Keyboard navigation appears untested.
- Emoji-only labels (🌙, 🕷️, 🦞) lack text alternatives. Screen readers will read unicode names, not agent names.
### 2.6 Brand Alignment 🔴 Critical
- The dark, dense aesthetic contradicts CoinW's brand tone of 'Inspirational, Empowering, Professional.' Current design feels more underground/degen than premium fintech.
- Primary brand color #5227ff is underutilized. The page doesn't feel like it belongs to CoinW's ecosystem.
- DM Sans typography is not consistently applied. Brand phrases ('Legendary Success,' 'Trade like a pro') are absent from the page.
---
## 3. UX Issues & Pain Points
### High Impact
1. Visual Overload: 11 sections with no progressive disclosure or navigation. Users face cognitive overload scrolling through agents, strategies, rankings, calculator, tiers, and social feed all at once.
1. No Clear User Journey: The page serves both agent consumers (traders wanting to use agents) and developers (wanting to build agents) but doesn't differentiate these paths until late in the page.
1. Trust Deficit: The design lacks the premium, trustworthy feel expected of a platform handling $48M+ in trading volume. Glassmorphism and refined spacing would dramatically improve perceived credibility.
1. Mobile Unusability: Table-heavy layouts and dense card grids make the page likely unusable on phones, which represent 60-70% of crypto traffic.
### Medium Impact
1. Strategy Card Status Ambiguity: The difference between ✓ 活跃, 🔥 趋势, and ⚠ 汰换观察期 needs clearer visual treatment — colored status badges instead of emoji prefixes.
1. Revenue Calculator UX: Slider-based calculators need real-time feedback, visual progress indicators, and clear output formatting. Current implementation appears basic.
1. Contributor Tier Progression: The 3-tier system (Community → Certified → Partner) lacks visual progression. Users can't see where they are or what's needed to advance.
### Low Impact
1. Achievement Plaza timestamps are relative (good) but entries lack engagement metrics (likes, comments) to drive social proof and engagement.
1. Developer onboarding code snippet lacks syntax highlighting and copy-to-clipboard functionality.
---
## 4. Redesign Strategy
### 4.1 Design Direction — Bankoo Meets CoinW
The Bankoo Digital Banking Platform exemplifies modern fintech design: generous whitespace (60-80px section gaps), glassmorphism card effects, soft gradients, and large rounded corners (16-24px border-radius). We adapt this for CoinW by replacing Bankoo's neutral blues with CoinW's vibrant purple (#5227ff) and shifting from a dark crypto aesthetic to a light, premium fintech feel.
- Light base background: #FAFAFE (warm near-white) with subtle purple-tinted glassmorphism cards
- Card style: background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(82,39,255,0.08); border-radius: 24px
- Gradient backgrounds for hero/CTA: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fafafe 100%)
- Elevated surfaces: box-shadow: 0 4px 24px rgba(82,39,255,0.06)
- Accent glow for CTAs: box-shadow: 0 8px 32px rgba(82,39,255,0.25)
### 4.2 Color Strategy
Primary palette derived from CoinW brand guidelines, adapted for a light theme:
- Backgrounds — Page: #FAFAFE | Surface: #FFFFFF | Elevated: rgba(82,39,255,0.03) | Muted: #f5f3ff
- Primary — Default: #5227ff | Hover: #4520d9 | Light: #ede9fe | Ultra-light: #f5f3ff
- Secondary — Purple: #a366ff | Gold: #ffcc00 | Gold muted: #fef3c7
- Text — Heading: #1a1a2e | Body: #333333 | Secondary: #6b7280 | Placeholder: #9ca3af
- Semantic — Success: #10b981 | Warning: #f59e0b | Danger: #ef4444 | Info: #5227ff
- Profit/Loss — Profit: #10b981 (green) with ▲ icon | Loss: #ef4444 (red) with ▼ icon — ALWAYS pair color with directional icon for colorblind accessibility
### 4.3 Typography Plan
Font stack: 'DM Sans', 'Microsoft JhengHei', system-ui, sans-serif. Monospace: 'JetBrains Mono', 'Fira Code', monospace.
- Display: 48px / line-height 56px / weight 700 — Hero headline only
- H1: 36px / 44px / 700 — Section titles
- H2: 28px / 36px / 600 — Subsection titles
- H3: 22px / 28px / 600 — Card titles, component headers
- Body Large: 18px / 28px / 400 — Hero descriptions, key paragraphs
- Body: 16px / 24px / 400 — Default text
- Small: 14px / 20px / 400 — Captions, metadata, table cells
- Mono: 14px / 20px / JetBrains Mono 400 — Code snippets, numerical data in tables
### 4.4 Spacing & Grid
8px base unit. 12-column grid, max-width 1280px, 24px gutters. Responsive breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px. Section spacing: 80px desktop / 48px mobile. Card gap: 24px. Internal card padding: 24-32px desktop / 16-20px mobile.
---
## 5. Section-by-Section Redesign Proposals
### 5a. Navigation / Header
Current State: No sticky navigation visible. Users cannot jump between sections on a very long page. No user role differentiation (trader vs developer).
Proposed Changes:
- Add sticky top navigation bar: height 64px, background rgba(255,255,255,0.8) with backdrop-filter: blur(12px), border-bottom: 1px solid rgba(82,39,255,0.06)
- Left: CoinW logo + 'Agent Zone' text badge (background: #ede9fe, color: #5227ff, border-radius: 8px, padding: 4px 12px)
- Center: Anchor links — Overview | Leaderboard | Agents | Strategies | For Developers — font: DM Sans 14px/500, color: #6b7280, active: #5227ff with 2px bottom border
- Right: 'Connect Agent' primary CTA button (bg: #5227ff, color: white, border-radius: 12px, padding: 10px 24px, hover: #4520d9 with shadow glow)
- On scroll past hero: nav shows condensed stats (134 agents · $48M volume) in center, replacing anchor links
### 5b. Hero Section
Current State: Stats displayed (134 agents, 68 strategies, $48M volume) with descriptive text. Functional but lacks visual impact and premium feel.
Proposed Changes:
- Full-width hero with gradient background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 30%, #faf5ff 70%, #fafafe 100%)
- Headline: 'Agent Zone' in Display size (48px/700), color #1a1a2e. Subline: 'Where AI Agents Compete, Evolve & Earn' in Body Large (18px/400), color #6b7280
- 3 stat cards in a row, glassmorphism style: background rgba(255,255,255,0.6), backdrop-filter blur(16px), border-radius 20px, padding 32px, box-shadow 0 4px 24px rgba(82,39,255,0.06)
- Each stat card: large number in 36px/700 #5227ff, label in 14px/400 #6b7280. Subtle animated counter on scroll-into-view.
- Below stats: two CTA buttons — 'Browse Agents' (primary solid #5227ff) and 'Start Building' (secondary outline, border: 2px solid #5227ff, color #5227ff)
Interaction Notes: Stats animate with countUp.js on first scroll into view. Subtle floating gradient orbs in background (CSS animation, 20s infinite, opacity 0.3). Parallax effect on gradient at 0.3x scroll speed.
### 5c. Leaderboard Table
Current State: Dense table with 10 rows showing agent name, 7-day return, max drawdown, call count, and credit rewards. Functional but visually heavy.
Proposed Changes:
- Wrap in glassmorphism container: bg rgba(255,255,255,0.7), border-radius 24px, padding 32px, backdrop-filter blur(20px)
- Section header: 'Live Arena' H2 (28px/600) with animated 🔴 live dot (CSS pulse animation, #ef4444)
- Top 3 rows get special treatment: gold (#ffcc00), silver (#c0c0c0), bronze (#cd7f32) left-border 3px with matching subtle background tint
- Table header: font 12px/600 uppercase tracking 0.05em, color #9ca3af, border-bottom 1px solid #e5e7eb
- Table cells: font 14px JetBrains Mono for numbers, DM Sans for text. Row height 56px. Alternating row bg: transparent / rgba(82,39,255,0.02)
- Returns column: #10b981 for positive with ▲, #ef4444 for negative with ▼ — pair color with icon always
- Credit rewards: golden badge with #ffcc00 bg, #92400e text, border-radius 8px, padding 2px 8px
Interaction: Row hover → translateY(-1px) with shadow increase. Click → expand to show agent detail card inline. Tab controls: 7d / 30d / All-time toggle.
### 5d. Core Capabilities Grid
Current State: 8 features in a grid (AI Trading, Real-time Competition, Strategy Evolution, Risk Management, Community Ecosystem, Revenue Sharing, Fast Execution, Enterprise Security). Basic icon + title + description.
Proposed Changes:
- 2×4 grid on desktop (4 columns), 2×2 on tablet, 1-column on mobile. Gap: 24px.
- Each capability card: bg white, border-radius 20px, padding 32px, border: 1px solid #e5e7eb, hover border-color #5227ff transition 0.2s
- Icon: 48×48px container with #ede9fe background, border-radius 12px, centered SVG icon in #5227ff
- Title: H3 22px/600, color #1a1a2e, margin-top 16px
- Description: Body 16px/400, color #6b7280, margin-top 8px, max 2 lines
Interaction: Hover → card lifts (translateY(-4px), box-shadow 0 12px 32px rgba(82,39,255,0.08)), icon bg transitions to #5227ff with white icon. Stagger entrance animation (fade-up, 100ms delay per card).
### 5e. Agent Directory Cards
Current State: Cards show emoji avatar, agent name, type badge (Community/Official), developer name, description, return %, daily calls, followers, and protocol badge. Layout is cramped with too much data competing for attention.
Proposed Changes:
- 3-column grid desktop, 2-column tablet, 1-column mobile. Card: bg white, border-radius 20px, padding 24px, border: 1px solid #e5e7eb
- Card header: 56×56px avatar circle (gradient bg from #5227ff to #a366ff with white emoji), right side: name (18px/600) + type badge (Community: #ede9fe bg/#5227ff text, Official: #5227ff bg/white text, 12px/500, border-radius 6px)
- Developer line: 14px/400 #9ca3af, preceded by small avatar
- Description: 16px/400 #6b7280, 2-line clamp with ellipsis
- Stats row at bottom: 3 columns — Return (large 18px/700, colored), Daily Calls (14px mono), Followers (14px). Divider lines between.
- Protocol badge: bottom-right, pill shape — MCP: #10b981 bg, REST: #5227ff bg, WebSocket: #f59e0b bg — all white text, 12px, border-radius 999px
Interaction: Hover → shadow increase + border-color #a366ff. Click → slide-out detail panel or modal. Filter bar above: All | Official | Community | Sort by: Returns | Calls | Followers.
### 5f. Strategy Cards
Current State: Cards show strategy type tag, name, status badge, developer, description, win rate score, trade count, PnL, and version. The win rate indicator is the strongest existing component.
Proposed Changes:
- Horizontal scrollable row on desktop (4 visible, peek next), full-width stack on mobile
- Card: bg white, border-radius 20px, padding 24px, width 300px, border: 1px solid #e5e7eb
- Type tag top-left: colored pill — 现货(Spot): #ede9fe, 套利(Arb): #d1fae5, 信号(Signal): #fef3c7, 合约(Futures): #fce7f3, 风控(Risk): #e0e7ff
- Status badge top-right: ✓ Active → #10b981 bg, dot + text; 🔥 Trending → #f59e0b bg; ⚠ Under Review → #ef4444 bg
- Win Rate: circular progress ring (SVG), 64px diameter. Stroke color: >70 #10b981, 50-70 #f59e0b, <50 #ef4444. Number centered inside, 22px/700
- Stats grid 2×2: Trades count | PnL (colored) | Version | Developer — each 14px, #6b7280 label, #1a1a2e value
Interaction: Card hover → lift + shadow. Scroll with snap-to-card. Under Review cards get 60% opacity with 'Review Period' overlay on hover.
### 5g. Developer Rankings
Current State: List of developers ranked by strategies count, PnL, and monthly calls. Uses basic list/card format.
Proposed Changes:
- Podium-style top 3: Three cards in a row, center card (rank 1) larger and elevated. Gold/silver/bronze accent borders.
- Rank 1 card: bg gradient linear-gradient(135deg, #fef3c7 0%, #fff 100%), border: 2px solid #ffcc00, padding 32px, crown icon
- Remaining ranks 4-10: compact horizontal list items, height 64px, avatar + name + stats inline, alternating bg tint
- Stats per developer: badge count (strategies), total PnL (colored), monthly calls — displayed as inline pills
Interaction: Hover on rank card → expand to show strategy breakdown. Animated rank changes if data updates live.
### 5h. Revenue Calculator
Current State: Slider for monthly call count with basic output showing Credit and USDT equivalent. Formula displayed as text.
Proposed Changes:
- Glassmorphism container: bg rgba(255,255,255,0.7), border-radius 24px, padding 48px, backdrop-filter blur(20px)
- Large range slider: custom styled — track height 8px, bg #e5e7eb, filled portion gradient #5227ff → #a366ff. Thumb: 24px circle, white, box-shadow 0 2px 8px rgba(82,39,255,0.3)
- Input field above slider: editable number input, 36px/700, #1a1a2e, with '月调用次数' label in 14px #6b7280
- Output section: two large result cards side by side — Credit card (bg #ede9fe, icon + number 28px/700 #5227ff) and USDT card (bg #fef3c7, icon + number 28px/700 #92400e)
- Formula displayed below in a subtle code block: bg #f8fafc, border-radius 12px, font JetBrains Mono 14px
Interaction: Real-time calculation on slider drag — numbers animate with spring easing. Subtle confetti animation at max slider value. Tooltip follows thumb showing exact value.
### 5i. Contributor Tiers
Current State: Three tiers (Community → Certified → Official Partner) shown as separate blocks with bullet point features. No visual progression.
Proposed Changes:
- Horizontal progression layout: 3 cards connected by a dashed progress line (SVG). Progress line colored up to current tier.
- Tier 1 (Community): bg white, border #e5e7eb, icon: 👤 in #ede9fe circle. Benefits in 14px bullets.
- Tier 2 (Certified): bg white, border #a366ff, icon: ✓ badge in #a366ff circle. 'KYC Required' sub-badge.
- Tier 3 (Partner): bg linear-gradient(135deg, #5227ff 0%, #a366ff 100%), text white, icon: ⭐ in white circle. Premium glow effect.
- Each card: border-radius 20px, padding 32px, min-height 280px. Current user's tier highlighted with scale(1.05) + shadow.
Interaction: Hover on locked tier → show requirements overlay. Progress line animates on scroll-into-view. Unlocked tiers pulse subtly.
### 5j. Achievement Plaza (战绩广场 / Social Feed)
Current State: Social feed of agent trade results with PnL, duration, skills used. Timestamps are relative. Good content but presented as plain cards without engagement features.
Proposed Changes:
- Feed layout: single column, max-width 720px, centered. Each post: bg white, border-radius 20px, padding 24px, border 1px solid #e5e7eb, margin-bottom 16px
- Post header: agent avatar (48px, gradient ring) + name (16px/600) + timestamp (14px #9ca3af) + type badge
- Post title: 18px/600 #1a1a2e, margin-top 12px
- Post body: 16px/400 #333333, margin-top 8px
- Stats bar at bottom: horizontal flex with dividers — PnL (colored + icon) | Duration | Win Rate | Skills Used (as small pills)
- Engagement bar: 👍 Like count + 💬 Comment count + 🔗 Share — 14px #9ca3af, hover #5227ff
- Warning-level posts (预警): left border 3px solid #f59e0b, subtle yellow tint bg rgba(245,158,11,0.05)
Interaction: Like button → animate (scale bounce 1.2 → 1.0), count increment. Infinite scroll with skeleton loading states. Filter: All | PnL Wins | Alerts | Top Agents.
### 5k. Developer Onboarding
Current State: 3-step process (Register → Choose Protocol → Publish). Code snippet for MCP connection. Basic stepper layout.
Proposed Changes:
- Visual stepper: 3 circles connected by line, each circle 48px with step number, bg #5227ff for active/completed, #e5e7eb for upcoming. Line fills with purple as user progresses conceptually.
- Step content area: bg white, border-radius 24px, padding 48px. Each step revealed in tabs or accordion — not all visible at once.
- Code snippet: styled code block with syntax highlighting (PrismJS or Shiki). bg #1a1a2e, border-radius 16px, padding 24px. Language badge top-right. Copy button top-right with ✓ feedback.
- Protocol selection: 3 selectable cards (MCP / REST / WebSocket) with radio selection, each showing key benefits. Selected: border #5227ff + bg #f5f3ff
Interaction: Step transitions with slide animation. Code block has line highlighting on hover. 'Copy' button → 'Copied!' with green check, reverts after 2s.
### 5l. Footer CTA
Current State: Basic call-to-action section asking developers to build agents. Minimal styling.
Proposed Changes:
- Full-width section: bg gradient linear-gradient(135deg, #5227ff 0%, #a366ff 50%, #7c3aed 100%), border-radius 32px (inset from page edges by 32px), padding 80px 48px
- Headline: '准备好构建你的 Agent 了吗？' / 'Ready to Build Your Agent?' — 36px/700, white
- Subline: Brand phrase 'Legendary Success Awaits' — 18px/400, rgba(255,255,255,0.8)
- Two buttons: 'Start Building' (bg white, color #5227ff, border-radius 16px, padding 16px 40px, font 16px/600) and 'View Documentation' (border 2px solid rgba(255,255,255,0.5), color white, same sizing)
- Decorative: Subtle floating grid pattern overlay (SVG, 5% opacity white). Animated gradient orbs in corners.
Interaction: Buttons hover → scale(1.02) + shadow increase. Background gradient slowly shifts (CSS animation, 10s infinite). On scroll into view: headline fades up, buttons fade up with 200ms delay.
---
## 6. Design System Recommendations
### 6.1 Token System
```css
/* === CoinW Agent Zone Design Tokens === */

/* Colors */
--color-primary: #5227ff;
--color-primary-hover: #4520d9;
--color-primary-light: #ede9fe;
--color-primary-ultra-light: #f5f3ff;
--color-secondary: #a366ff;
--color-gold: #ffcc00;
--color-gold-muted: #fef3c7;

--color-bg-page: #FAFAFE;
--color-bg-surface: #FFFFFF;
--color-bg-elevated: rgba(82, 39, 255, 0.03);

--color-text-heading: #1a1a2e;
--color-text-body: #333333;
--color-text-secondary: #6b7280;
--color-text-placeholder: #9ca3af;

--color-success: #10b981;
--color-warning: #f59e0b;
--color-danger: #ef4444;

/* Typography */
--font-sans: 'DM Sans', 'Microsoft JhengHei', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

--text-display: 700 48px/56px var(--font-sans);
--text-h1: 700 36px/44px var(--font-sans);
--text-h2: 600 28px/36px var(--font-sans);
--text-h3: 600 22px/28px var(--font-sans);
--text-body-lg: 400 18px/28px var(--font-sans);
--text-body: 400 16px/24px var(--font-sans);
--text-small: 400 14px/20px var(--font-sans);
--text-mono: 400 14px/20px var(--font-mono);

/* Spacing (8px base) */
--space-1: 4px;  --space-2: 8px;  --space-3: 12px;
--space-4: 16px; --space-5: 20px; --space-6: 24px;
--space-8: 32px; --space-10: 40px; --space-12: 48px;
--space-16: 64px; --space-20: 80px;

/* Radii */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 24px;
--radius-full: 999px;

/* Shadows */
--shadow-sm: 0 1px 3px rgba(82, 39, 255, 0.04);
--shadow-md: 0 4px 12px rgba(82, 39, 255, 0.06);
--shadow-lg: 0 8px 24px rgba(82, 39, 255, 0.08);
--shadow-xl: 0 12px 32px rgba(82, 39, 255, 0.12);
--shadow-glow: 0 8px 32px rgba(82, 39, 255, 0.25);

/* Glass */
--glass-bg: rgba(255, 255, 255, 0.7);
--glass-border: 1px solid rgba(82, 39, 255, 0.08);
--glass-blur: blur(20px);
```
### 6.2 Reusable Component Patterns
- Card: .card { bg: var(--color-bg-surface); border-radius: var(--radius-2xl); padding: var(--space-8); border: var(--glass-border); transition: all 0.2s ease; } .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
- Glass Card: .glass-card { bg: var(--glass-bg); backdrop-filter: var(--glass-blur); border: var(--glass-border); border-radius: var(--radius-2xl); }
- Button Primary: .btn-primary { bg: var(--color-primary); color: white; border-radius: var(--radius-md); padding: 10px 24px; font: 500 14px/20px var(--font-sans); transition: all 0.15s; } .btn-primary:hover { bg: var(--color-primary-hover); box-shadow: var(--shadow-glow); }
- Badge: .badge { display: inline-flex; padding: 2px 10px; border-radius: var(--radius-full); font: 500 12px/16px var(--font-sans); } Variants: --primary (#ede9fe / #5227ff), --success (#d1fae5 / #059669), --warning (#fef3c7 / #92400e), --danger (#fee2e2 / #dc2626)
- Stat Card: .stat-card { text-align: center; } .stat-value { font: var(--text-h1); color: var(--color-primary); } .stat-label { font: var(--text-small); color: var(--color-text-secondary); margin-top: var(--space-2); }
- Table: .table thead { font: 600 12px uppercase; color: var(--color-text-placeholder); letter-spacing: 0.05em; } .table td { font: var(--text-small); padding: 16px 12px; } .table tr:hover { bg: var(--color-bg-elevated); }
---
## 7. Interaction & Animation Guide
### 7.1 Micro-interactions
- Card hover: transform translateY(-2px) to translateY(-4px), shadow increase. Transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
- Button press: scale(0.98) on mousedown, scale(1.0) on release. 100ms transition.
- Number counters: countUp.js with duration 2s, easing easeOutExpo. Trigger on intersection observer (threshold 0.5).
- Like/React: scale(1.3) → scale(1.0) spring animation (200ms). Color fills from #9ca3af to #5227ff.
- Badge/tag appearance: fade-in + translateY(4px → 0), 150ms ease-out.
### 7.2 Page Transitions & Loading
- Section entrance: fade-up (opacity 0→1, translateY(24px→0)), 400ms per section, staggered 100ms between child elements. Use Intersection Observer.
- Skeleton loading: animated gradient shimmer (background-size: 200%, keyframes shimmer { from bg-position 200% 0; to 0% 0 }, 1.5s infinite). Rounded skeleton shapes matching final component dimensions.
- Table data loading: rows fade in staggered (50ms per row) from top to bottom.
- Page load: hero section fades in immediately (0ms delay), subsequent sections load as user scrolls (lazy intersection).
### 7.3 Special Interactions
- Leaderboard rank changes: row slides to new position with 500ms ease-in-out, flash highlight on the row (#fef3c7 → transparent).
- Revenue calculator slider: output numbers use spring animation (framer-motion or CSS spring). Thumb shows tooltip with exact value on drag.
- Achievement Plaza infinite scroll: last 2 items fade to 50% opacity as loading indicator. New items slide in from bottom.
- Code copy button: 'Copy' → icon spins 180° → '✓ Copied' in #10b981, reverts after 2s.
---
## 8. Responsive Design Strategy
### 8.1 Breakpoints
- sm: 640px — Single column everything. Nav becomes hamburger.
- md: 768px — 2-column grids. Table shows priority columns only.
- lg: 1024px — 3-column agent grid. Full table. Side-by-side layouts.
- xl: 1280px — Max content width. 4-column capability grid. Full feature display.
### 8.2 Mobile-First Critical Changes
- Navigation: Collapse to hamburger menu + single CTA button. Sticky bottom nav on mobile with 4 icons: Overview | Agents | Strategies | Build.
- Leaderboard: Transform table into ranked cards. Each card: agent avatar + name + return + rank. Expand on tap for full stats. Show top 5 by default, 'Show All' button.
- Agent Directory: Single column cards, swipeable horizontally as an alternative. Filter bar becomes bottom sheet.
- Strategy Cards: Horizontal scroll with snap, 85vw width per card. Dot indicators below.
- Revenue Calculator: Full-width slider, results stack vertically.
- Achievement Plaza: Full-width feed, no side padding reduction. Images lazy-loaded.
- Contributor Tiers: Vertical stack with connecting line on left side (timeline style).
- Code Block: Horizontal scroll with visible scrollbar. Font-size reduce to 13px. Full-width.
---
## 9. Implementation Priority
### Phase 1 — Quick Wins (1-2 weeks)
1. Apply design tokens (colors, typography, spacing) across all components — immediate visual uplift
1. Add DM Sans font loading + JetBrains Mono for code
1. Increase whitespace: section gaps to 80px, card padding to 24-32px
1. Add sticky navigation with anchor links
1. Fix color accessibility: replace red/green-only profit/loss with icon+color pairs
1. Add hover states to all interactive elements
### Phase 2 — Core Redesign (3-4 weeks)
1. Implement glassmorphism card system across all sections
1. Redesign hero section with gradient background + animated stats
1. Rebuild leaderboard with top-3 highlighting + responsive card fallback
1. Redesign agent directory cards with new layout + filter system
1. Redesign strategy cards with circular win-rate indicator
1. Add skeleton loading states
1. Implement responsive breakpoints for all sections
### Phase 3 — Polish & Enhancement (2-3 weeks)
1. Add micro-interactions: scroll animations, hover effects, counter animations
1. Implement Achievement Plaza engagement features (likes, comments)
1. Revenue calculator with spring animations + real-time feedback
1. Contributor tiers with progression visualization
1. Developer onboarding with interactive stepper + protocol selection cards
1. Footer CTA with animated gradient background
1. Performance optimization: lazy loading, image optimization, code splitting
1. Accessibility audit: WCAG AA compliance, keyboard nav, screen reader testing
---
## 10. Technical Recommendations
### 10.1 CSS & Framework
- Tailwind CSS v4 — utility-first approach aligns perfectly with the token system. Custom theme config maps directly to our design tokens.
- Framer Motion (React) or GSAP — for scroll-triggered animations and micro-interactions. Framer Motion preferred for React codebases.
- CSS backdrop-filter for glassmorphism — supported in 95%+ browsers. Fallback: solid bg with slight transparency.
- CSS Container Queries — for truly responsive components that adapt to their container, not just viewport.
### 10.2 Performance
- Font loading: <link rel='preload'> for DM Sans 400/500/600/700. Display: swap to prevent FOIT.
- Intersection Observer for lazy section rendering — don't render below-fold sections until user approaches them.
- Image optimization: Use next/image or equivalent. SVG for all icons. Avoid raster images for UI elements.
- Bundle analysis: Keep first-load JS under 150KB gzipped. Code-split animations library.
- Reduce DOM depth: Current 11 sections likely create deep nesting. Flatten where possible.
### 10.3 Accessibility Checklist
- ✅ All text meets WCAG AA contrast ratio (4.5:1 body, 3:1 large text)
- ✅ All interactive elements have visible focus states (outline: 2px solid #5227ff, offset 2px)
- ✅ Profit/loss uses color + icon + text direction (never color alone)
- ✅ All emoji have aria-label text alternatives
- ✅ Tab order follows visual order. Skip-to-content link at top.
- ✅ Leaderboard table has proper <th> scope attributes
- ✅ Animations respect prefers-reduced-motion media query
- ✅ Touch targets minimum 44×44px on mobile
- ✅ Language attribute set (lang='zh-CN' with lang='en' on English elements)
---
> This proposal provides a complete, actionable blueprint for transforming the CoinW Agent Zone from a functional prototype into a premium fintech experience. Every recommendation is grounded in CoinW's brand guidelines, the Bankoo reference aesthetic, and modern UX best practices. The phased approach allows for immediate visual improvements while building toward a comprehensive redesign.
— End of Proposal —
