# Website Redesign v2

# 🔧 Implementation Guide v2 — Detailed Build Specification
Pixel-perfect specs for coding agent. Every CSS value specified. No ambiguity.
## 0. Global Design Tokens
```css
:root {
  --color-primary: #5227ff;
  --color-primary-light: #a366ff;
  --color-primary-dark: #1a1aff;
  --color-accent: #ff6600;
  --color-gold: #ffcc00;
  --color-white: #FFFFFF;
  --color-bg-light: #F5F5F7;
  --color-bg-dark: #0A0A1A;
  --color-card-dark: #12122A;
  --color-text-primary: #111111;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  --color-text-on-dark: #FFFFFF;
  --color-text-on-dark-muted: #A0A0B8;
  --color-border: #E5E5EA;
  --color-border-dark: #2A2A4A;
  --gradient-purple: linear-gradient(135deg, #5227ff 0%, #a366ff 100%);
  --glass-bg: rgba(255,255,255,0.06);
  --glass-border: rgba(255,255,255,0.1);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 24px rgba(0,0,0,0.06);
  --shadow-lg: 0 8px 40px rgba(0,0,0,0.08);
  --shadow-purple: 0 8px 32px rgba(82,39,255,0.2);
  --font-family: 'DM Sans', -apple-system, sans-serif;
  --max-width: 1280px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-full: 999px;
}

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-family); font-size: 16px; line-height: 1.6; color: #111; background: #fff; -webkit-font-smoothing: antialiased; }
```
## 0.1 Navbar
```css
.navbar {
  position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
  padding: 16px 40px; display: flex; align-items: center; justify-content: space-between;
  background: rgba(255,255,255,0.8); backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0,0,0,0.06); height: 64px;
}
/* Logo: h28px. Links: 15px/500/#333/gap32. CTA: pill #5227ff white 10px 24px r999 14px/600 */
/* Scroll >100px: shadow 0 2px 16px rgba(0,0,0,0.06). Mobile <768: hamburger */
```
## 0.2 Responsive
```css
@media (max-width:1023px) { :root { --section-pad:64px 0; --container-pad:0 24px; } h1-sizes: 40/36/32px }
@media (max-width:767px) { :root { --section-pad:48px 0; --container-pad:0 20px; } h1-sizes: 32/28/24/22px; single-col grids }
```
## 0.3 Section Background Pattern
Hero(white) → Leaderboard(#0A0A1A) → Capabilities(#F5F5F7) → Directory(white) → Strategy(#0A0A1A) → Rankings(#F5F5F7) → Calculator(white) → Tiers(#0A0A1A) → Achievement(#F5F5F7) → Onboarding(#5227ff) → Footer(#0A0A1A)
## 0.4 Reference → CoinW Mapping
- Ref Hero → Sec 1 (dashboard mockup replaces credit card, purple replaces green)
- Ref Features → Sec 3 Core Capabilities (8 cards, 2×4)
- Ref 'How it works' → Sec 10 Onboarding (purple bg)
- Ref Partner Logos → Not used
- Sections 2,4,5,6,7,8,9 → Unique to CoinW
---
## Section 1 — Hero
### Container & Decorative
```css
.hero {
  background: #fff; position: relative; overflow: hidden;
  padding: 140px 0 100px; min-height: 90vh; display: flex; align-items: center;
}
.hero::before { /* purple glow */
  content:''; position:absolute; top:-200px; right:-100px;
  width:800px; height:800px; background:radial-gradient(circle,rgba(82,39,255,0.06)0%,transparent 70%);
  border-radius:50%; pointer-events:none;
}
.hero::after { /* ring */
  content:''; position:absolute; top:50%; right:5%; transform:translateY(-50%);
  width:500px; height:500px; border-radius:50%; border:1px solid rgba(82,39,255,0.08); pointer-events:none;
}
.hero-inner { max-width:1280px; margin:0 auto; padding:0 40px; display:flex; align-items:center; gap:64px; }
```
### Left Column — Text
```css
.hero-badge {
  display:inline-flex; align-items:center; padding:6px 16px;
  background:rgba(82,39,255,0.08); border:1px solid rgba(82,39,255,0.15);
  border-radius:999px; font-size:13px; font-weight:600; color:#5227ff; margin-bottom:24px;
}
.hero-badge::before { content:''; width:6px; height:6px; bg:#5227ff; border-radius:50%; margin-right:8px; }

.hero-headline { font-size:56px; font-weight:700; line-height:1.15; letter-spacing:-0.02em; color:#111; margin-bottom:24px; }
.hero-headline .highlight { background:linear-gradient(135deg,#5227ff,#a366ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }

.hero-subtitle { font-size:18px; font-weight:400; color:#666; line-height:1.7; margin-bottom:40px; max-width:480px; }

.hero-stats { display:flex; gap:48px; }
.hero-stat-value { font-size:36px; font-weight:700; color:#111; }
.hero-stat-label { font-size:14px; font-weight:500; color:#999; margin-top:4px; }
```
### Buttons
```css
.btn-primary { padding:14px 32px; border-radius:999px; background:#5227ff; color:#fff; font-size:16px; font-weight:600; border:none; box-shadow:0 4px 16px rgba(82,39,255,0.3); transition:all .3s ease; }
.btn-primary:hover { background:#4520dd; transform:translateY(-2px); box-shadow:0 8px 24px rgba(82,39,255,0.4); }
.btn-outline { padding:14px 32px; border-radius:999px; background:transparent; color:#5227ff; font-size:16px; font-weight:600; border:2px solid #5227ff; transition:all .3s ease; }
.btn-outline:hover { background:rgba(82,39,255,0.06); transform:translateY(-2px); }
```
### Right Column — Dashboard Visual
```css
.hero-visual { flex:1; max-width:560px; position:relative; display:flex; align-items:center; justify-content:center; }
.hero-visual img { width:100%; max-width:520px; animation:float 6s ease-in-out infinite; filter:drop-shadow(0 20px 40px rgba(82,39,255,0.15)); }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
.hero-visual::before { content:''; position:absolute; width:400px; height:400px; border-radius:50%; border:2px solid rgba(82,39,255,0.1); top:50%; left:50%; transform:translate(-50%,-50%); }

@media(max-width:1023px) { .hero-inner{flex-direction:column;text-align:center} .hero-visual{max-width:400px;margin-top:48px} }
```
🖼️ IMAGE: Hero Dashboard Mockup — Dark card #12122A, mini chart with purple gradient fill, agent 'Alpha-7' green dot, '+23.5% 7D Return'. Second card behind offset. 1200×900px PNG transparent. Flat UI, slight 5° tilt.
---
## Section 2 — Live Leaderboard
```css
.leaderboard-section { background:#0A0A1A; padding:100px 0; position:relative; overflow:hidden; }
.leaderboard-section::before { content:''; position:absolute; top:-200px; left:-200px; width:600px; height:600px; background:radial-gradient(circle,rgba(82,39,255,0.1)0%,transparent 70%); pointer-events:none; }
.leaderboard-inner { max-width:1280px; margin:0 auto; padding:0 40px; }

.section-title-dark { font-size:40px; font-weight:700; color:#fff; text-align:center; margin-bottom:16px; letter-spacing:-0.02em; }
.section-subtitle-dark { font-size:16px; color:#A0A0B8; text-align:center; margin-bottom:48px; }

.leaderboard-table-wrap { background:#12122A; border-radius:20px; border:1px solid #2A2A4A; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.3); }
.leaderboard-table { width:100%; border-collapse:collapse; }
thead th { padding:16px 20px; font-size:12px; font-weight:600; color:#A0A0B8; text-transform:uppercase; letter-spacing:0.08em; border-bottom:1px solid #2A2A4A; background:rgba(255,255,255,0.02); }
tbody tr:hover { background:rgba(82,39,255,0.06); }
tbody td { padding:14px 20px; font-size:14px; font-weight:500; color:#fff; border-bottom:1px solid rgba(255,255,255,0.04); }
.rank-1{color:#ffcc00} .rank-2{color:#C0C0C0} .rank-3{color:#CD7F32}
.positive{color:#22C55E} .negative{color:#EF4444}
.agent-emoji { font-size:20px; width:32px; height:32px; background:rgba(82,39,255,0.1); border-radius:8px; display:flex; align-items:center; justify-content:center; }

@media(max-width:767px) { .leaderboard-table-wrap{overflow-x:auto} .leaderboard-table{min-width:700px} }
```
---
## Section 3 — Core Capabilities
```css
.capabilities-section { background:#F5F5F7; padding:100px 0; }
.capabilities-inner { max-width:1280px; margin:0 auto; padding:0 40px; }

.section-badge { display:inline-flex; padding:6px 16px; background:rgba(82,39,255,0.08); border:1px solid rgba(82,39,255,0.15); border-radius:999px; font-size:13px; font-weight:600; color:#5227ff; margin-bottom:16px; }
.section-title-light { font-size:44px; font-weight:700; color:#111; margin-bottom:16px; letter-spacing:-0.02em; line-height:1.2; }
.section-title-light .highlight { color:#5227ff; }
.section-subtitle-light { font-size:18px; color:#666; margin-bottom:56px; max-width:600px; line-height:1.7; }

.capabilities-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
@media(max-width:1023px){.capabilities-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:767px){.capabilities-grid{grid-template-columns:1fr}}

.capability-card { background:#fff; border-radius:20px; padding:32px 28px; border:1px solid #E5E5EA; box-shadow:0 2px 8px rgba(0,0,0,0.04); transition:all .3s ease; }
.capability-card:hover { transform:translateY(-4px); box-shadow:0 8px 40px rgba(0,0,0,0.08); border-color:rgba(82,39,255,0.2); }
.capability-icon { width:48px; height:48px; border-radius:14px; background:rgba(82,39,255,0.08); display:flex; align-items:center; justify-content:center; margin-bottom:20px; font-size:22px; }
.capability-title { font-size:18px; font-weight:700; color:#111; margin-bottom:8px; }
.capability-desc { font-size:14px; color:#666; line-height:1.6; }
```
---
## Section 4 — Agent Directory
```css
.directory-section { background:#fff; padding:100px 0; }

.directory-filters { display:flex; justify-content:center; gap:8px; margin-bottom:40px; }
.filter-tab { padding:8px 20px; border-radius:999px; font-size:14px; font-weight:500; color:#666; border:1px solid #E5E5EA; transition:all .2s; }
.filter-tab.active { background:#5227ff; color:#fff; border-color:#5227ff; }

.directory-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
@media(max-width:1023px){.directory-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:767px){.directory-grid{grid-template-columns:1fr}}

.agent-card { background:#fff; border-radius:20px; padding:24px; border:1px solid #E5E5EA; box-shadow:0 2px 8px rgba(0,0,0,0.04); transition:all .3s; }
.agent-card:hover { transform:translateY(-4px); box-shadow:0 8px 40px rgba(0,0,0,0.08); }
.agent-avatar { width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg,#5227ff,#a366ff); display:flex; align-items:center; justify-content:center; font-size:22px; }
.agent-card-name { font-size:16px; font-weight:700; color:#111; }
.badge-official { background:rgba(82,39,255,0.1); color:#5227ff; padding:2px 8px; border-radius:999px; font-size:11px; font-weight:600; }
.badge-community { background:rgba(255,102,0,0.1); color:#ff6600; padding:2px 8px; border-radius:999px; font-size:11px; font-weight:600; }
.agent-card-stats { display:flex; justify-content:space-between; padding-top:12px; border-top:1px solid #E5E5EA; }
.agent-stat-value { font-size:16px; font-weight:700; color:#22C55E; }
.agent-stat-label { font-size:11px; color:#999; }
```
---
## Section 5 — Strategy Evolution
```css
.strategy-section { background:#0A0A1A; padding:100px 0; }

.strategy-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; max-width:1280px; margin:0 auto; padding:0 40px; }
@media(max-width:1023px){.strategy-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:767px){.strategy-grid{grid-template-columns:1fr}}

.strategy-card { background:#12122A; border-radius:20px; padding:28px; border:1px solid #2A2A4A; transition:all .3s; }
.strategy-card:hover { transform:translateY(-4px); border-color:rgba(82,39,255,0.3); box-shadow:0 8px 32px rgba(82,39,255,0.15); }

.strategy-type-tag { padding:4px 12px; border-radius:999px; font-size:11px; font-weight:600; background:rgba(82,39,255,0.15); color:#a366ff; margin-bottom:16px; text-transform:uppercase; }
.strategy-title { font-size:20px; font-weight:700; color:#fff; }
.status-live { background:rgba(34,197,94,0.15); color:#22C55E; padding:2px 8px; border-radius:999px; font-size:10px; }
.status-testing { background:rgba(255,204,0,0.15); color:#ffcc00; padding:2px 8px; border-radius:999px; font-size:10px; }
.strategy-author { font-size:12px; color:#A0A0B8; margin:8px 0 12px; }
.strategy-desc { font-size:14px; color:#A0A0B8; line-height:1.6; margin-bottom:20px; -webkit-line-clamp:2; }
```
```css
/* Win rate gauge */
.gauge-label { display:flex; justify-content:space-between; font-size:12px; color:#A0A0B8; margin-bottom:6px; }
.gauge-bar { height:6px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden; }
.gauge-fill { height:100%; background:linear-gradient(135deg,#5227ff,#a366ff); border-radius:3px; transition:width 1s; }

.strategy-stats { display:flex; justify-content:space-between; padding-top:16px; border-top:1px solid #2A2A4A; }
.strategy-stat-label { font-size:11px; color:#A0A0B8; }
.strategy-stat-value { font-size:14px; font-weight:600; color:#fff; margin-top:2px; }
```
---
## Section 6 — Developer Rankings
```css
.rankings-section { background:#F5F5F7; padding:100px 0; }
.rankings-list { display:flex; flex-direction:column; gap:12px; max-width:800px; margin:0 auto; }

.ranking-item { display:flex; align-items:center; padding:20px 28px; background:#fff; border-radius:16px; border:1px solid #E5E5EA; box-shadow:0 2px 8px rgba(0,0,0,0.04); transition:all .3s; gap:20px; }
.ranking-item:hover { transform:translateX(4px); box-shadow:0 4px 24px rgba(0,0,0,0.06); }

.ranking-rank { font-size:24px; font-weight:800; color:#999; min-width:40px; text-align:center; }
.ranking-rank.top-1{color:#ffcc00} .top-2{color:#C0C0C0} .top-3{color:#CD7F32}
.ranking-avatar { width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg,#5227ff,#a366ff); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; }
.ranking-name { font-size:16px; font-weight:700; color:#111; }
.ranking-certified { font-size:11px; color:#5227ff; font-weight:600; margin-left:8px; }
.ranking-stats { display:flex; gap:32px; }
.ranking-stat-value { font-size:15px; font-weight:700; color:#111; }
.ranking-stat-label { font-size:11px; color:#999; }
```
---
## Section 7 — Revenue Calculator
```css
.calculator-section { background:#fff; padding:100px 0; }
.calculator-inner { max-width:720px; margin:0 auto; padding:0 40px; text-align:center; }
.calculator-card { background:#fff; border-radius:24px; padding:48px 40px; border:1px solid #E5E5EA; box-shadow:0 8px 40px rgba(0,0,0,0.08); }

.calculator-slider-value { font-size:36px; font-weight:700; color:#111; margin-bottom:16px; }
input[type=range] { width:100%; height:8px; -webkit-appearance:none; background:linear-gradient(to right,#5227ff var(--pct,50%),#E5E5EA var(--pct,50%)); border-radius:4px; }
input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:24px; height:24px; border-radius:50%; background:#5227ff; border:3px solid #fff; box-shadow:0 2px 8px rgba(82,39,255,0.3); }

.calculator-output { display:flex; gap:24px; margin-top:32px; }
.calc-output-box { flex:1; background:#F5F5F7; border-radius:16px; padding:24px 20px; }
.calc-output-value { font-size:28px; font-weight:700; color:#5227ff; }
.calculator-formula { margin-top:24px; padding:16px 20px; background:#F5F5F7; border-radius:12px; font-size:13px; color:#666; }
@media(max-width:767px){.calculator-output{flex-direction:column}}
```
---
## Section 8 — Contributor Tiers
```css
.tiers-section { background:#0A0A1A; padding:100px 0; }
.tiers-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; max-width:1280px; margin:0 auto; padding:0 40px; }
@media(max-width:1023px){.tiers-grid{grid-template-columns:1fr}}

.tier-card { background:#12122A; border-radius:24px; padding:36px 32px; border:1px solid #2A2A4A; transition:all .3s; display:flex; flex-direction:column; }
.tier-card:hover { border-color:rgba(82,39,255,0.3); transform:translateY(-4px); }
.tier-card.featured { border-color:#5227ff; background:linear-gradient(180deg,rgba(82,39,255,0.08)0%,#12122A 100%); box-shadow:0 0 0 1px #5227ff,0 8px 32px rgba(82,39,255,0.2); }

.tier-label { padding:4px 12px; border-radius:999px; font-size:11px; font-weight:600; margin-bottom:16px; text-transform:uppercase; align-self:flex-start; }
.tier-label-open{background:rgba(34,197,94,0.15);color:#22C55E}
.tier-label-kyc{background:rgba(82,39,255,0.15);color:#a366ff}
.tier-label-partner{background:rgba(255,204,0,0.15);color:#ffcc00}
.tier-name { font-size:24px; font-weight:700; color:#fff; margin-bottom:12px; }

.tier-list li { display:flex; gap:10px; font-size:14px; color:#A0A0B8; margin-bottom:12px; }
.tier-list li::before { content:'✓'; color:#5227ff; font-weight:700; }

.tier-cta-primary { width:100%; padding:14px 0; border-radius:999px; background:#5227ff; color:#fff; font-size:15px; font-weight:600; border:none; margin-top:24px; box-shadow:0 8px 32px rgba(82,39,255,0.2); }
.tier-cta-outline { width:100%; padding:14px 0; border-radius:999px; background:transparent; color:#fff; border:1px solid #2A2A4A; font-size:15px; font-weight:600; margin-top:24px; }
```
---
## Section 9 — Achievement Plaza
```css
.achievement-section { background:#F5F5F7; padding:100px 0; }
.achievement-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; max-width:1280px; margin:0 auto; padding:0 40px; }
@media(max-width:767px){.achievement-grid{grid-template-columns:1fr}}

.achievement-card { background:#fff; border-radius:20px; padding:28px; border:1px solid #E5E5EA; box-shadow:0 2px 8px rgba(0,0,0,0.04); transition:all .3s; }
.achievement-card:hover { box-shadow:0 4px 24px rgba(0,0,0,0.06); transform:translateY(-2px); }
.achievement-avatar { width:40px; height:40px; border-radius:10px; background:linear-gradient(135deg,#5227ff,#a366ff); display:flex; align-items:center; justify-content:center; font-size:18px; }
.achievement-name { font-size:14px; font-weight:700; color:#111; }
.achievement-time { font-size:12px; color:#999; }
.achievement-title { font-size:18px; font-weight:700; color:#111; margin-bottom:8px; }
.achievement-desc { font-size:14px; color:#666; line-height:1.6; margin-bottom:16px; }
.achievement-tags { display:flex; flex-wrap:wrap; gap:8px; }
.achievement-tag { padding:4px 12px; border-radius:999px; font-size:12px; font-weight:600; background:rgba(82,39,255,0.06); color:#5227ff; }
.achievement-tag.profit { background:rgba(34,197,94,0.08); color:#22C55E; }
```
---
## Section 10 — Developer Onboarding
Full-width #5227ff purple bg. Maps to reference 'How it works'. Left: dark code card. Right: numbered steps.
```css
.onboarding-section { background:#5227ff; padding:100px 0; position:relative; overflow:hidden; }
.onboarding-section::before { content:''; position:absolute; top:-100px; right:-100px; width:400px; height:400px; border-radius:50%; background:rgba(255,255,255,0.05); }
.onboarding-section::after { content:''; position:absolute; bottom:-150px; left:-50px; width:300px; height:300px; border-radius:50%; border:2px solid rgba(255,255,255,0.08); }

.onboarding-inner { max-width:1280px; margin:0 auto; padding:0 40px; display:flex; align-items:center; gap:64px; }

.onboarding-code-card { flex:1; max-width:520px; background:#0A0A1A; border-radius:20px; padding:32px; box-shadow:0 16px 48px rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); }
.code-window-dots { display:flex; gap:8px; margin-bottom:20px; }
.code-window-dots span { width:12px; height:12px; border-radius:50%; }
.code-window-dots span:nth-child(1){background:#FF5F57} span:nth-child(2){background:#FEBC2E} span:nth-child(3){background:#28C840}
pre { font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.8; color:#E0E0E0; }
.code-keyword{color:#a366ff} .code-string{color:#ffcc00} .code-comment{color:#666}
```
```css
.onboarding-steps { flex:1; }
.onboarding-title { font-size:40px; font-weight:700; color:#fff; margin-bottom:12px; letter-spacing:-0.02em; }
.onboarding-subtitle { font-size:16px; color:rgba(255,255,255,0.7); margin-bottom:40px; }

.onboarding-step { display:flex; gap:20px; margin-bottom:32px; }
.step-number { width:40px; height:40px; border-radius:12px; background:rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:700; color:#fff; flex-shrink:0; position:relative; }
.step-title { font-size:18px; font-weight:700; color:#fff; margin-bottom:4px; }
.step-desc { font-size:14px; color:rgba(255,255,255,0.7); line-height:1.6; }

@media(max-width:1023px){.onboarding-inner{flex-direction:column}}
```
---
## Section 11 — Footer CTA
```css
.footer-cta-section { background:#0A0A1A; padding:120px 0; text-align:center; position:relative; overflow:hidden; }
.footer-cta-section::before { content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:600px; height:600px; background:radial-gradient(circle,rgba(82,39,255,0.15)0%,transparent 70%); }
.footer-cta-inner { max-width:700px; margin:0 auto; padding:0 40px; position:relative; z-index:1; }
.footer-cta-title { font-size:48px; font-weight:700; color:#fff; margin-bottom:16px; letter-spacing:-0.02em; line-height:1.2; }
.footer-cta-subtitle { font-size:18px; color:#A0A0B8; margin-bottom:40px; }
.footer-cta-buttons { display:flex; gap:16px; justify-content:center; }
.btn-outline-dark { padding:14px 32px; border-radius:999px; background:transparent; color:#fff; font-size:16px; font-weight:600; border:2px solid rgba(255,255,255,0.3); transition:all .3s; }
.btn-outline-dark:hover { border-color:#fff; background:rgba(255,255,255,0.05); }
@media(max-width:767px){.footer-cta-title{font-size:32px} .footer-cta-buttons{flex-direction:column;align-items:center}}
```
---
## Animations
```css
.reveal { opacity:0; transform:translateY(30px); transition:opacity .8s cubic-bezier(.4,0,.2,1),transform .8s cubic-bezier(.4,0,.2,1); }
.reveal.visible { opacity:1; transform:translateY(0); }
/* JS: IntersectionObserver threshold:0.1 → add .visible */

@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

/* Leaderboard rows: stagger with animation-delay calc(0.05s * var(--i)) */
/* Stat counters: JS requestAnimationFrame 0→target over 2s */
/* Gauge fills: set width inline, CSS transition handles it */
```
---
## 🖼️ Images Needed
- Hero Dashboard: Dark card #12122A, mini chart purple gradient, agent 'Alpha-7', '+23.5%'. 2nd card behind. 1200×900px PNG transparent. Flat UI, 5° tilt.
- OG Share: 'AI Agent 在此竞技' dark bg, purple glow, CoinW logo. 1200×630px.
---
## ✅ Build Checklist
- DM Sans from Google Fonts (400,500,600,700,800)
- All CSS variables from Section 0
- Fixed navbar 64px, glassmorphism
- 11 sections, alternating backgrounds as specified
- Cards: 20-24px radius, 1px borders, soft shadows, hover translateY(-4px)
- ONLY accent: #5227ff purple. No green/red/neon.
- IntersectionObserver scroll reveal on all sections
- Calculator slider interactive (JS)
- Leaderboard: horizontal scroll mobile
- All Chinese text preserved exactly
- Responsive: 768px, 1024px, 1440px
- 100px section padding desktop, 64px tablet, 48px mobile
- Generate hero mockup image separately
- Lazy-load images, minimize CLS
