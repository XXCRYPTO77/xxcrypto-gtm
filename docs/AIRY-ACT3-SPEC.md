# Airy — Act 3 Task Package

**Date:** 2026-04-13  
**From:** F  
**Self-contained:** Yes — read this, start working, no extra context needed.

---

## Context

Act 3 = `/act3` route = v1.5 "Agent Zone" product demo. Currently a placeholder with a TransitionBand at the bottom. Your job: build the full ecosystem module.

**File to create:** `src/modules/ecosystem/index.tsx` (and components under `src/modules/ecosystem/components/`)

**Page wired at:** `src/app/act3/page.tsx` — update it to import EcosystemModule (see bottom of this doc).

---

## What Act 3 shows

Four boards. Each is a self-contained interactive panel. User scrolls through them top to bottom.

---

### Board 1 — 双 Agent 接入 (Dual Agent Access)

**Purpose:** Show that *any* Agent can connect to CoinW Skills — not just one built by CoinW.

**Layout:** Split view, two columns.

Left column — "Agent A: Claude":
- Avatar: purple circle, label "Claude"
- Status badge: 已连接 / Connected (green)
- Mock skill list: M1 行情 / M5 下单 / M11 认证
- One mock call result: "BTC $87,200 ↑2.3%"

Right column — "Agent B: 自定义 Agent / Custom Agent":
- Avatar: gray circle, label "My Agent"
- Status badge: 接入中 / Connecting (yellow, animated pulse)
- Single button: "一键接入 / Connect Now" → on click, badge changes to 已连接 / Connected (green) and shows same skill list

Center divider: "MCP Server" label with a vertical line, small arrow indicators going both directions (CSS only, no SVG files)

**i18n:** Hard-code zh/en with `const isZh = t.nav.cta === 'EN'`. No new i18n keys.

---

### Board 2 — Skill 进化协作 (Skill Evolution)

**Purpose:** Show the progression from basic Skill usage to Agent composing its own strategy.

**Layout:** Horizontal stepper (3 stages), each stage is a card.

Stage 1 — 单 Skill 调用 / Single Skill call:
- Icon: plug
- Label: "Agent 调用单个 Skill"
- Example: "查询 BTC 行情 → 返回价格"
- Status: done badge

Stage 2 — 组合调用 / Skill composition:
- Icon: layers
- Label: "Agent 自动串联多个 Skills"
- Example: "看行情 + 判断信号 + 挂单"
- Status: done badge

Stage 3 — 自主策略 / Autonomous strategy:
- Icon: brain/cpu
- Label: "Agent 写策略，自己跑回测"
- Example: "均线策略 → 回测 30 天 → 胜率 62%"
- Status: "v1.5" badge (planned, gray)

Stages connected by `→` arrows. Click on Stage 3 → shows a mock backtest result panel (simple text: "策略：BTC 均线 5/20 · 回测区间：2025-10 至 2026-03 · 胜率：62% · 最大回撤：8.3%").

---

### Board 3 — Agent 交易竞技 (Trading Arena)

**Purpose:** Gamification — Agents compete on leaderboard by performance.

**Layout:** Leaderboard table + live "match" ticker.

Leaderboard (top 5 rows, mock data):

| Rank | Agent | Strategy | 7D Return | Risk | Status |
|------|-------|----------|-----------|------|--------|
| 🥇 1 | Alpha-7 | 趋势跟踪 | +12.4% | 中 | 运行中 |
| 🥈 2 | QuietBot | 均值回归 | +9.1% | 低 | 运行中 |
| 🥉 3 | Storm-X | 动量策略 | +7.8% | 高 | 运行中 |
| 4 | NeutralAI | 套利 | +4.2% | 低 | 运行中 |
| 5 | My Agent | — | — | — | 未参赛 |

Row 5 ("My Agent") has a button: "参加竞技 / Enter Arena" → click → row updates to show "+0.0% · 刚加入 / Just joined" and status changes to "运行中 / Running".

Above table: two stat cards — "本周参赛 Agent / Agents this week: 247" and "总奖池 / Prize pool: 12,500 Credit"

**English equivalents:** Translate all labels. Risk = Low/Med/High. Status = Running/Not entered.

---

### Board 4 — 分润闭环 (Revenue Sharing)

**Purpose:** Show the economic flywheel — Agents earn Credits, Credits convert to revenue.

**Layout:** Flow diagram (CSS only, no image files) + a simple earnings calculator.

Flow diagram (5 nodes, horizontal):
```
用户使用 Skill → Agent 调用成功 → Credit 消耗 → 收益分配 → Skill 提供方收益
```
Each node: rounded pill with label + small icon (lucide). Arrows between them are just `→` text or a CSS border-right + arrow trick.

Below the flow: earnings calculator (interactive):
- Slider or input: "月调用量 / Monthly calls" (default 1000, range 100–50000)
- Display: "预计 Credit 收益 / Est. Credit earnings: X" (formula: calls × 0.05 Credit per call)
- Display: "按当前汇率 / At current rate: $Y" (formula: Credits × $0.01)
- Two lines updating live as slider moves

At bottom: "Credit 经济规则 / Credit Economy Rules" — 3 bullet points:
- 每次成功调用：0.05 Credit / Per successful call: 0.05 Credit
- Credit ↔ USDT 汇率由平台每周公布 / Rate published weekly by platform
- 前 3 个月提供方零手续费 / Zero platform fee for first 3 months

---

## Section header and spacing

Wrap the 4 boards in one `<section>` with consistent padding (py-10 sm:py-12, max-w-7xl mx-auto px-6). Add a visible section header at the top:

```
Title: "交易 Skill 生态 / Trading Skill Ecosystem"
Subtitle: "v1.5 · Agent Zone"
```

Separate each board with `<hr className="border-border my-10" />`.

---

## Update act3/page.tsx

Replace current content with:

```tsx
'use client';

import { ShellNavbar } from '@/shell/Navbar';
import { ShellFooter } from '@/shell/Footer';
import EcosystemModule from '@/modules/ecosystem';
import { TransitionBand } from '@/shared/ui/TransitionBand';
import { useT } from '@/i18n/LocaleContext';

function Act3Content() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  return (
    <>
      <EcosystemModule />
      <TransitionBand
        band="band3"
        nextActLabel={isZh ? 'Act IV · 远景 →' : 'Act IV · Vision →'}
        nextActHref="/act4"
      />
    </>
  );
}

export default function Act3Page() {
  return (
    <>
      <ShellNavbar />
      <main className="pt-16 min-h-screen bg-page">
        <Act3Content />
      </main>
      <ShellFooter />
    </>
  );
}
```

---

## Technical constraints (same as always)

- No `next/image`, `next/link`, `next/font` inside `modules/`
- Tailwind CSS v4 utility classes only — no arbitrary values unless necessary
- All components `'use client'`
- Use `useT()` for locale, `const isZh = t.nav.cta === 'EN'` for detection
- Import primitives from `@/components/primitives/` or `@/shared/ui`
- lucide-react for icons
- Push to `XXCRYPTO77/xxcrypto-gtm` main when done, tell Dan "Airy Act 3 complete"

---

## File structure to create

```
src/modules/ecosystem/
  index.tsx                    ← main module (exports default EcosystemModule)
  components/
    DualAgentBoard.tsx         ← Board 1
    SkillEvolutionBoard.tsx    ← Board 2
    TradingArenaBoard.tsx      ← Board 3
    RevenueSharingBoard.tsx    ← Board 4
```

F does **not** need to be consulted before you start. The spec above is final.
