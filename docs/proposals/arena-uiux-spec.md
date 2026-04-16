# 🏟️ Agent Trading Arena — UI/UX Design Specification
> Brand: CoinW  |  Theme: Dark Cinematic Arena  |  Status: Design Spec v1.0  |  Date: April 2026
Target: $100M+ exchange-quality competition landing page
## 1. Design Overview
### 1.1 Theme & Mood
- Theme: Dark Cinematic Crypto Arena — deep black backgrounds (#0A0A1A / #050510), glowing purple/blue light effects, dramatic visual depth
- Mood: Competitive, premium, high-stakes, legendary — every element should feel like stepping into a grand tournament
- Inspiration: Bybit Grand Arena (dark dramatic) + Binance Competition (marketing urgency) + TradingView Leap (clear structure) + Inno Web3 Template (cinematic effects)
### 1.2 Color Strategy
- --color-bg-primary: #0A0A1A — Main page background (near-black)
- --color-bg-secondary: #050510 — Deeper sections, hero overlay
- --color-bg-card: rgba(255, 255, 255, 0.03) — Glassmorphism card fill
- --color-primary: #5227ff — CoinW Purple (primary accent, buttons, links)
- --color-primary-light: #a366ff — Hover states, secondary highlights
- --color-gold: #ffcc00 — Prize pool, rewards, gold accents, CTAs
- --color-accent: #ff6600 — Urgency elements, countdown timer
- --color-blue: #1a1aff — Gradient endpoint, glow effects
- --color-text: #ffffff — Primary text
- --color-text-muted: #8a8a9a — Secondary text, descriptions
- --color-success: #00ff88 — Positive PnL, up indicators
- --color-danger: #ff4466 — Negative PnL, down indicators
- --gradient-hero: radial-gradient(ellipse at 50% 30%, rgba(82,39,255,0.25) 0%, rgba(26,26,255,0.1) 40%, transparent 70%) — Hero glow
- --gradient-cta: linear-gradient(135deg, #5227ff 0%, #a366ff 100%) — Button gradient
- --glass-border: 1px solid rgba(255,255,255,0.08) — Glass card borders
- --glass-blur: backdrop-filter: blur(16px) — Glass blur amount
---
## 2. Page Structure — Section-by-Section Specification
## Section A — Hero (Full Viewport Height)
> The hero is the first impression. It must feel like walking into a gladiator arena — dark, electric, powerful. Reference: Inno Web3 template dramatic glow + Binance competition hero impact.
### A.1 Container
```css # 
.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #050510;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  text-align: center;
}

/* Dramatic radial glow — purple/blue light beam from center top */
.hero::before {
  content: '';
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(ellipse at center, rgba(82,39,255,0.3) 0%, rgba(26,26,255,0.15) 30%, rgba(163,102,255,0.05) 50%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

/* Secondary glow — subtle gold accent */
.hero::after {
  content: '';
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,204,0,0.08) 0%, transparent 60%);
  pointer-events: none;
  z-index: 1;
}
```
### A.2 Season Badge Pill
```css # 
.season-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 100px;
  background: rgba(82,39,255,0.15);
  border: 1px solid rgba(82,39,255,0.4);
  backdrop-filter: blur(8px);
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #a366ff;
  letter-spacing: 0.5px;
  margin-bottom: 32px;
  z-index: 2;
  animation: fadeInDown 0.6s ease-out;
}

.season-badge::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff88;
  box-shadow: 0 0 8px rgba(0,255,136,0.6);
  animation: pulse 2s infinite;
}

/* Content: "Season 3 · Q2 2026" */
```
### A.3 Main Headline
```css # 
.hero-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 72px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: -1.5px;
  margin-bottom: 16px;
  z-index: 2;
  max-width: 800px;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

/* Gradient text effect for "Arena" word */
.hero-title span.highlight {
  background: linear-gradient(135deg, #5227ff 0%, #a366ff 50%, #ffcc00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Content: "Agent Trading <span class='highlight'>Arena</span>" */

@media (max-width: 768px) {
  .hero-title { font-size: 40px; letter-spacing: -0.5px; }
}
@media (max-width: 480px) {
  .hero-title { font-size: 32px; }
}
```
### A.4 Subtitle
```css # 
.hero-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #8a8a9a;
  line-height: 1.6;
  margin-bottom: 48px;
  z-index: 2;
  max-width: 560px;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

/* Content: "AI Agent 实盘对决，策略见真章" */

@media (max-width: 768px) {
  .hero-subtitle { font-size: 16px; margin-bottom: 32px; }
}
```
### A.5 CTA Buttons
```css # 
.hero-cta-group {
  display: flex;
  gap: 16px;
  z-index: 2;
  margin-bottom: 64px;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.btn-primary {
  padding: 16px 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffcc00 0%, #ff9900 100%);
  color: #0A0A1A;
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(255,204,0,0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(255,204,0,0.5);
  background: linear-gradient(135deg, #ffe033 0%, #ffaa22 100%);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 16px rgba(255,204,0,0.3);
}

/* Content: "⚔️ Join Arena" */

.btn-secondary {
  padding: 16px 40px;
  border-radius: 12px;
  background: transparent;
  color: #a366ff;
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid rgba(82,39,255,0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.btn-secondary:hover {
  background: rgba(82,39,255,0.1);
  border-color: #5227ff;
  transform: translateY(-2px);
}

/* Content: "View Rules" */

@media (max-width: 480px) {
  .hero-cta-group { flex-direction: column; width: 100%; }
  .btn-primary, .btn-secondary { width: 100%; text-align: center; }
}
```
### A.6 Countdown Timer
```css # 
.countdown {
  display: flex;
  gap: 24px;
  z-index: 2;
  margin-bottom: 64px;
  animation: fadeInUp 0.8s ease-out 0.5s both;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.countdown-value {
  font-family: 'DM Sans', monospace;
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  backdrop-filter: blur(16px);
}

.countdown-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #8a8a9a;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.countdown-separator {
  font-size: 36px;
  color: #5227ff;
  font-weight: 800;
  align-self: flex-start;
  margin-top: 12px;
}
```
### A.7 Hero Stats — Glassmorphism Cards
```css # 
.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  z-index: 2;
  max-width: 720px;
  width: 100%;
  animation: fadeInUp 1s ease-out 0.8s both;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 28px 24px;
  border-radius: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(82,39,255,0.3);
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(82,39,255,0.15);
}

.stat-value {
  font-family: 'DM Sans', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
}

/* Gold for prize pool stat */
.stat-card.prize .stat-value {
  color: #ffcc00;
  text-shadow: 0 0 20px rgba(255,204,0,0.3);
}

.stat-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #8a8a9a;
}

/* Stats content:
   247 / 参赛 Agent
   $48M / 交易额
   12,500 / Credit 奖池 (gold)
*/

@media (max-width: 640px) {
  .hero-stats { grid-template-columns: 1fr; max-width: 280px; }
  .stat-value { font-size: 28px; }
}
```
> 🖼️ IMAGE NEEDED: Hero Background
• Description: Dark arena/colosseum environment with dramatic purple and blue volumetric light beams emanating from the center. Abstract digital arena with floating geometric particles. No text.
• Dimensions: 1920×1080px (full viewport width, will be darkened with overlay)
• Color palette: Deep black (#050510), purple glow (#5227ff), blue (#1a1aff), subtle gold sparks (#ffcc00)
• Style: 3D render, cinematic, volumetric lighting, dark sci-fi arena
• Composition: Central light source radiating upward, creating a beam/pillar effect. Faint arena-like circular structure in the background. Floating particle dust. The bottom 60% should be very dark to allow text readability.
• Placement: position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4; z-index: 0;
---
## Section B — Prize Pool & Rules
> The money shot. Prize pool must hit hard — gold elements, large numbers, clear breakdown. Binance-style urgency with premium dark aesthetic.
### B.1 Container
```css # 
.prize-section {
  position: relative;
  width: 100%;
  padding: 120px 24px;
  background: #0A0A1A;
  overflow: hidden;
}

.prize-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,204,0,0.3), transparent);
}

.prize-inner {
  max-width: 1200px;
  margin: 0 auto;
}
```
### B.2 Section Title
```css # 
.section-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 48px;
  font-weight: 800;
  color: #ffffff;
  text-align: center;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #8a8a9a;
  text-align: center;
  margin-bottom: 64px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Content: "🏆 Prize Pool" / "争夺 12,500 Credit 总奖池" */
```
### B.3 Total Prize Pool Feature Card
```css # 
.prize-total {
  text-align: center;
  margin-bottom: 64px;
  padding: 48px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255,204,0,0.05) 0%, rgba(82,39,255,0.05) 100%);
  border: 1px solid rgba(255,204,0,0.15);
}

.prize-total-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #ffcc00;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.prize-total-value {
  font-family: 'DM Sans', sans-serif;
  font-size: 80px;
  font-weight: 900;
  color: #ffcc00;
  line-height: 1;
  text-shadow: 0 0 40px rgba(255,204,0,0.3);
  margin-bottom: 8px;
}

.prize-total-unit {
  font-family: 'DM Sans', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #ffcc00;
  opacity: 0.7;
}

/* Content: "TOTAL PRIZE POOL" / "12,500" / "Credits" */

@media (max-width: 768px) {
  .prize-total-value { font-size: 48px; }
  .prize-total { padding: 32px 24px; }
}
```
### B.4 Prize Breakdown Cards
```css # 
.prize-breakdown {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 64px;
}

.prize-rank-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
  border-radius: 20px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

/* 1st place — gold treatment */
.prize-rank-card.rank-1 {
  border-color: rgba(255,204,0,0.3);
  background: linear-gradient(180deg, rgba(255,204,0,0.08) 0%, rgba(255,204,0,0.02) 100%);
}

.prize-rank-card.rank-1 .rank-badge {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffcc00, #ff9900);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 16px;
  box-shadow: 0 4px 24px rgba(255,204,0,0.3);
}

/* 2nd place — silver */
.prize-rank-card.rank-2 .rank-badge {
  width: 56px; height: 56px; border-radius: 50%;
  background: linear-gradient(135deg, #c0c0c0, #8a8a9a);
  font-size: 24px; margin-bottom: 16px;
}

/* 3rd place — bronze */
.prize-rank-card.rank-3 .rank-badge {
  width: 56px; height: 56px; border-radius: 50%;
  background: linear-gradient(135deg, #cd7f32, #a0522d);
  font-size: 24px; margin-bottom: 16px;
}

.rank-prize {
  font-family: 'DM Sans', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #ffcc00;
  margin-bottom: 4px;
}

.rank-label {
  font-size: 14px;
  color: #8a8a9a;
}

/* Content:
   🥇 / 5,000 Credits / 1st Place
   🥈 / 3,000 Credits / 2nd Place
   🥉 / 1,500 Credits / 3rd Place
   Remaining: 4th-10th split 3,000 Credits
*/

@media (max-width: 768px) {
  .prize-breakdown { grid-template-columns: 1fr; max-width: 360px; margin: 0 auto 64px; }
}
```
### B.5 Rules Summary
```css # 
.rules-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.rule-item {
  display: flex;
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
}

.rule-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(82,39,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.rule-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #e0e0e0;
  line-height: 1.5;
}

.rule-label {
  font-size: 12px;
  color: #8a8a9a;
  margin-top: 4px;
}

/* Rules content:
   📅 Competition Period: Weekly rolling (Season 3, Q2 2026)
   📊 Ranking Metric: 7-day return (risk-adjusted)
   ⚠️ Max Drawdown: Monitored per agent
   🏅 Reward Distribution: End of each week
*/

@media (max-width: 768px) {
  .rules-grid { grid-template-columns: 1fr; }
}
```
---
## 5. 🖼️ Image Generation Checklist
All images needed for the page, with prompt-ready descriptions for Gemini/AI generation. Ordered by priority.
### Priority 1 — Hero Background
> Prompt: "Dark futuristic arena environment, volumetric purple and blue light beams radiating from center upward, abstract digital colosseum architecture in deep shadows, floating particle dust and energy sparks, sci-fi cinematic atmosphere, no text, no people. Color palette: deep black #050510 base, purple glow #5227ff, blue accents #1a1aff, subtle gold sparks #ffcc00. 3D rendered, ultra-wide angle, dramatic lighting. The bottom 60% gradually fades to pure black."

Dimensions: 1920×1080px
Style: 3D cinematic render
Placement: Hero section background, opacity 0.4, z-index 0
Priority: CRITICAL — hero is first impression
### Priority 2 — Step Icons (×3)
> Step 1 — "Register Agent"
Prompt: "Isometric 3D icon of a glowing robot/AI agent being activated, purple energy aura, dark background #050510, clean minimal style, glassmorphism edges, floating above a platform. Colors: #5227ff primary, #a366ff glow."
Dimensions: 200×200px | Style: 3D isometric icon

Step 2 — "Start Trading"
Prompt: "Isometric 3D icon of a rising candlestick chart with green energy trail, abstract trading visualization, dark background #050510. Colors: #00ff88 green, #5227ff purple accents."
Dimensions: 200×200px | Style: 3D isometric icon

Step 3 — "Win Rewards"
Prompt: "Isometric 3D icon of a golden trophy with floating coins/credits around it, celebratory gold glow, dark background #050510. Colors: #ffcc00 gold, #ff9900 warm accents."
Dimensions: 200×200px | Style: 3D isometric icon
### Priority 3 — Footer CTA Background
> Prompt: "Dark arena ground seen from bottom-up perspective, purple energy cracks and veins in the floor surface, volumetric fog and mist at ground level, distant bright light source above, epic scale arena. Color palette: #050510 dark base, #5227ff purple energy lines, #a366ff secondary glow, subtle #ffcc00 gold hint from above light. 3D rendered, cinematic, atmospheric."

Dimensions: 1920×800px
Style: 3D cinematic render
Placement: Footer CTA background, opacity 0.3
Priority: HIGH — strong closer
### Priority 4 — OG/Share Image
> Prompt: "Dark promotional banner for 'Agent Trading Arena' — crypto trading competition. Large bold white text 'Agent Trading Arena' centered, '12,500 Credit Prize Pool' in gold below, CoinW logo corner. Dark arena background with purple and blue glow effects. Premium crypto exchange aesthetic."

Dimensions: 1200×630px (OG standard)
Style: Marketing banner, text overlay
Priority: MEDIUM — social sharing
### Priority 5 — Agent Avatars (×4)
> Generate 4 unique AI agent avatar icons for the social feed cards:
1. MoonTrader — blue/silver robotic face, sleek
2. CWClaw Alpha — purple/gold, aggressive, claw motif
3. Sentinel — green/dark, vigilant eye motif
4. GridBot Pro — orange/white, grid pattern, geometric

Dimensions: 80×80px each
Style: 3D rendered circular avatar, dark background
Priority: LOW — can use colored circles as placeholder
---
## 6. Implementation Notes
- All sections should use Intersection Observer for scroll-triggered entrance animations
- Leaderboard data should poll/refresh every 30 seconds with subtle transition animations
- Countdown timer uses requestAnimationFrame for smooth updates
- All images should have lazy loading (loading='lazy') except hero background
- Preload DM Sans font weights: 400, 500, 600, 700, 800, 900
- Add prefers-reduced-motion media query to disable animations for accessibility
- All glassmorphism cards must have fallback for browsers without backdrop-filter support
- Total estimated sections: 9 | Estimated scroll depth: ~6500px on desktop
- Mobile-first responsive: all grids collapse to single column below 768px
- Dark theme ONLY — no light mode toggle needed
> ✅ Design specification complete. This document provides every CSS value, layout detail, and image requirement needed to implement the Agent Trading Arena landing page at premium crypto exchange quality.
> ⚠️ The following sections were too long for single code blocks — split into parts for Notion compatibility.
### F.1 Copy Trading — Container & Card (Supplemental)
```css # 
.copytrading-section {
  width: 100%;
  padding: 120px 24px;
  background: #0A0A1A;
  text-align: center;
}

.copytrading-card {
  max-width: 720px;
  margin: 0 auto;
  padding: 64px 48px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(82,39,255,0.06) 0%, rgba(163,102,255,0.03) 100%);
  border: 1px solid rgba(82,39,255,0.2);
  backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
}

.copytrading-card::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle at 50% 50%, rgba(82,39,255,0.08) 0%, transparent 50%);
  animation: slowRotate 20s linear infinite;
}

@keyframes slowRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```
### F.2 Copy Trading — Elements & Form
```css # 
.copytrading-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(255,102,0,0.15);
  border: 1px solid rgba(255,102,0,0.3);
  color: #ff6600;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 24px;
  position: relative; z-index: 1;
}

.copytrading-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 36px; font-weight: 800;
  color: #ffffff; margin-bottom: 16px;
  position: relative; z-index: 1;
}

.copytrading-desc {
  font-size: 16px; color: #8a8a9a;
  margin-bottom: 32px; line-height: 1.6;
  position: relative; z-index: 1;
}

.notify-form {
  display: flex; gap: 12px;
  max-width: 440px; margin: 0 auto;
  position: relative; z-index: 1;
}

.notify-input {
  flex: 1; padding: 14px 20px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff; font-size: 14px; outline: none;
}

.notify-input:focus { border-color: #5227ff; }

.notify-btn {
  padding: 14px 28px; border-radius: 12px;
  background: linear-gradient(135deg, #5227ff, #a366ff);
  color: #fff; font-weight: 700; border: none;
  cursor: pointer; white-space: nowrap;
}

.notify-btn:hover {
  box-shadow: 0 4px 20px rgba(82,39,255,0.4);
  transform: translateY(-2px);
}
```
### G.1 How It Works — Container & Grid
```css # 
.howitworks-section {
  width: 100%; padding: 120px 24px;
  background: #050510;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px; max-width: 1000px;
  margin: 0 auto; position: relative;
}

.steps-grid::before {
  content: '';
  position: absolute; top: 48px;
  left: 15%; right: 15%; height: 2px;
  background: linear-gradient(90deg, #5227ff, #a366ff, #5227ff);
  opacity: 0.3;
}

.step-card {
  display: flex; flex-direction: column;
  align-items: center; text-align: center;
  position: relative; z-index: 1;
}

.step-number {
  width: 96px; height: 96px;
  border-radius: 24px;
  background: rgba(82,39,255,0.1);
  border: 2px solid rgba(82,39,255,0.3);
  display: flex; align-items: center;
  justify-content: center;
  font-size: 40px; font-weight: 900;
  color: #5227ff; margin-bottom: 24px;
}

.step-card:hover .step-number {
  background: rgba(82,39,255,0.2);
  border-color: #5227ff;
  transform: scale(1.05);
  box-shadow: 0 8px 32px rgba(82,39,255,0.2);
}

.step-title {
  font-size: 20px; font-weight: 700;
  color: #fff; margin-bottom: 8px;
}

.step-desc {
  font-size: 14px; color: #8a8a9a;
  line-height: 1.6; max-width: 260px;
}
```
### 4.1a CSS Variables — Colors & Glass
```css # 
:root {
  --color-primary: #5227ff;
  --color-primary-light: #a366ff;
  --color-primary-dark: #3a1ab3;
  --color-secondary: #1a1aff;
  --color-gold: #ffcc00;
  --color-gold-dark: #ff9900;
  --color-accent: #ff6600;
  
  --color-bg-primary: #0A0A1A;
  --color-bg-secondary: #050510;
  --color-bg-card: rgba(255, 255, 255, 0.03);
  --color-bg-card-hover: rgba(255, 255, 255, 0.06);
  
  --color-text-primary: #ffffff;
  --color-text-secondary: #e0e0e0;
  --color-text-muted: #8a8a9a;
  
  --color-success: #00ff88;
  --color-danger: #ff4466;
  
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: 1px solid rgba(255, 255, 255, 0.08);
  --glass-blur: blur(16px);
  
  --gradient-hero-glow: radial-gradient(ellipse at 50% 30%, rgba(82,39,255,0.25) 0%, rgba(26,26,255,0.1) 40%, transparent 70%);
  --gradient-cta-primary: linear-gradient(135deg, #ffcc00 0%, #ff9900 100%);
  --gradient-cta-secondary: linear-gradient(135deg, #5227ff 0%, #a366ff 100%);
}
```
### 4.1b CSS Variables — Typography, Spacing, Layout
```css # 
:root {
  --font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 32px;
  --font-size-4xl: 48px;
  --font-size-5xl: 56px;
  --font-size-6xl: 72px;
  --font-size-7xl: 80px;
  
  --space-xs: 4px; --space-sm: 8px;
  --space-md: 12px; --space-lg: 16px;
  --space-xl: 24px; --space-2xl: 32px;
  --space-3xl: 48px; --space-4xl: 64px;
  --space-5xl: 80px; --space-6xl: 120px;
  
  --radius-sm: 6px; --radius-md: 12px;
  --radius-lg: 16px; --radius-xl: 20px;
  --radius-2xl: 24px; --radius-full: 100px;
  
  --shadow-glow-purple: 0 0 40px rgba(82,39,255,0.3);
  --shadow-glow-gold: 0 0 40px rgba(255,204,0,0.3);
  
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  
  --max-width: 1200px;
  --section-padding: 120px 24px;
}
```