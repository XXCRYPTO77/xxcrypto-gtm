# Airy Round 2 Task Package

**Date:** 2026-04-13  
**From:** F (Session F)  
**To:** Airy  
**Self-contained:** Yes — read this doc, start working, no extra context needed.

---

## Current State (what F already built or is building)

### Act 2 — Agent Chat Module

F is refactoring `src/modules/agent-chat/index.tsx` into a 6-step state machine. The steps:

| Step | Name | Owner | Status |
|------|------|-------|--------|
| 1 | Skill Discovery | **Airy** | ← You build this |
| 2 | Pick Agent | Airy (existing, polish) | Already exists |
| 3 | Bind API | F | F building |
| 4 | First Chat | Airy (existing, enhance) | Already exists |
| 5 | Execute Trade | F | F building |
| 6 | Trade Summary | **Airy** | ← You build this |

The `index.tsx` you receive will expose this interface for each step component:

```tsx
interface StepProps {
  onNext: () => void;   // advance to next step
  onBack?: () => void;  // go back (optional)
}
```

### Act 4 — Vision Module

F is building Act 4 panels A (API Matrix) and B (Security Tabs). You build **Panel C (Audit & Compliance)**.

---

## Your Tasks

### Task 1 — Act 2 Step 1: SkillDiscovery

**File:** `src/modules/agent-chat/components/SkillDiscovery.tsx`

**What to show:** A browse/discovery page. The user arrives here before they've picked an agent. Purpose: show them what capabilities are available so they understand what they're signing up for.

**Content:** Reuse `t.v10.capability.groups` from i18n — already has 4 groups (Info / Trade / Auth / Platform), each with 3-6 items.

**Layout:**
- Page header: "发现可用 Skills" / "Discover Available Skills"
- 4 group cards in a 2×2 grid (desktop) / 1-column stack (mobile)
- Each group card: group name badge + list of capabilities (code + name, no desc needed)
- Hover on a capability item → show desc in a tooltip or inline expand
- Bottom: `<button onClick={onNext}>选择 Agent →</button>` styled as primary CTA

**Props:**
```tsx
interface SkillDiscoveryProps {
  onNext: () => void;
}
```

---

### Task 2 — Act 2 Step 2: AgentPreset Polish

**File:** `src/modules/agent-chat/components/AgentPreset.tsx` (existing, modify)

The current AgentPreset immediately fires `onSelect` on card click. In the new flow, F's state machine handles the transition — you just need to ensure:

1. The selected card visually confirms selection (already done per your last commit)
2. Add a **"继续 →" / "Continue →"** confirm button at the bottom of the grid that only appears after a card is selected. This button fires `onSelect(selectedId)`. Right now selection fires immediately on click, which is too abrupt.

**Change:** Extract local selection state into the component. On card click → set local `localSelected`. On "Continue" button click → call `onSelect(localSelected)`.

---

### Task 3 — Act 2 Step 4: ChatInterface Enhancement

**File:** `src/modules/agent-chat/components/ChatInterface.tsx` (existing, modify)

Add one thing: a "执行交易 / Execute Trade" quick action button alongside the existing 3 quick actions. When clicked, it calls a new prop `onTrade?: () => void` which the parent (`index.tsx`) uses to advance to step 5.

```tsx
// Add to props:
interface ChatInterfaceProps {
  onTrade?: () => void;
}
```

Add a 4th quick action button: label `t.agentChat.chat.quickTrade` (already exists in i18n as "交易"), onClick calls `onTrade?.()`. Style it differently (brand-filled, not outline) to signal it leads somewhere.

---

### Task 4 — Act 2 Step 6: TradeSummary

**File:** `src/modules/agent-chat/components/TradeSummary.tsx`

**What to show:** Post-trade review dashboard. This is the last step — gives the user a sense of closure and shows the Agent's value.

**Layout (3 sections):**

**Section A — Today's Result:**
- Total PnL card: `+$1,247` in large green text, `+2.91%` badge
- 3 stat boxes: `已执行 1 笔` / `平均成本 $85,000` / `当前估值 $86,250`

**Section B — Trade History Table:**
- 3 rows (mock data):
  | 时间 | Agent | 操作 | 数量 | 价格 | 状态 |
  |------|-------|------|------|------|------|
  | 14:32 | 保守型 | 买入 BTC | 0.5 | $85,000 | 已成交 |
  | 11:15 | 保守型 | 查询行情 | — | — | 完成 |
  | 09:00 | — | Agent 启动 | — | — | — |

**Section C — Agent Performance:**
- 3 metric cards: `决策准确率 87%` / `平均响应 1.2s` / `风控触发 0 次`
- Bottom CTA: "重新开始 / Start Over" → calls `onNext()` to reset journey

**Props:**
```tsx
interface TradeSummaryProps {
  onNext: () => void;  // "Start Over" resets to step 1
}
```

**i18n:** Hard-code zh/en with `const isZh = t.nav.cta === 'EN'` toggle. Don't add new i18n keys.

---

### Task 5 — Act 4 Panel C: AuditCompliance

**File:** `src/modules/vision/components/AuditCompliance.tsx`

**What to show:** Audit trail demo + compliance checklist. This is a standalone section in Act 4, rendered between SecurityTabs (which F builds) and ExtensionCards.

**Layout (2 sections):**

**Section A — Audit Log Table:**
- Title: "审计日志 / Audit Trail"
- Subtitle: "每笔 Agent 操作完整留痕 / Every Agent action fully logged"
- Table with 6 mock rows:

| 时间戳 | Agent ID | 操作 | 权限级别 | 金额 | 风控结果 |
|--------|----------|------|---------|------|---------|
| 2026-04-13 14:32:01 | agent-cons-001 | 现货买入 BTC | spot | $42,500 | ✓ 通过 |
| 2026-04-13 14:31:58 | agent-cons-001 | 风控预检 | read | — | ✓ 通过 |
| 2026-04-13 11:15:22 | agent-cons-001 | 行情查询 | read | — | ✓ 通过 |
| 2026-04-13 09:00:05 | agent-cons-001 | API 绑定 | spot | — | ✓ 通过 |
| 2026-04-12 16:44:11 | agent-cons-001 | 大额确认 | spot | $95,000 | ⚠ 待确认 |
| 2026-04-12 09:11:33 | agent-cons-001 | 调用异常 | futures | — | ✗ 拦截 |

风控结果列: 通过 = green badge, 待确认 = yellow badge, 拦截 = red badge.

Mobile: collapse to card layout (each row = a card).

**Section B — Compliance Checklist:**
- Title: "合规检查项 / Compliance Requirements"
- 2-column grid (desktop), 1-column (mobile)
- 8 checklist items with status badge (done ✓ / planned ○):

| Item | Status |
|------|--------|
| KYC 联动验证 | planned |
| 反洗钱 AML 监控 | planned |
| 操作留痕（不可篡改） | done |
| 异常操作自动上报 | done |
| 权限变更二次确认 | done |
| 数据加密传输 TLS 1.3 | done |
| 定期安全审计接口 | planned |
| 监管沙盒兼容接口 | planned |

Done = green `✓` + "v1.0", Planned = gray `○` + "规划中".

**Styling:** Match Act 4 visual language — no bright colors, clean table/grid.

---

## File Boundaries (don't touch these)

F is building:
- `src/modules/agent-chat/index.tsx` — state machine
- `src/modules/agent-chat/components/ApiBinding.tsx`
- `src/modules/agent-chat/components/TradeExecution.tsx`
- `src/modules/vision/components/ApiMatrix.tsx`
- `src/modules/vision/components/SecurityTabs.tsx`
- `src/modules/vision/index.tsx`
- All i18n files

**Do NOT modify** these files. Coordinate on interface contracts only.

---

## Technical Constraints (same as before)

- No `next/image`, `next/link`, `next/font` inside `modules/` or `shared/`
- Use plain `<img>` and `<a>` tags  
- Tailwind CSS v4 utility classes only
- Use `useT()` hook for i18n, `const isZh = t.nav.cta === 'EN'` for locale detection
- Import shared primitives from `@/components/primitives/` or `@/shared/ui`
- All components are `'use client'`
- Push to `XXCRYPTO77/xxcrypto-gtm` main branch when done

---

## Delivery

When done, push to main and tell Dan "Airy round 2 complete". F will review and integrate.
