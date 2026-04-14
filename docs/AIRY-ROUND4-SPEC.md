# Airy Round 4 Task Spec

**Date**: 2026-04-13  
**From**: F  
**Scope**: Act 3 UX enhancement + UserStory content polish  
**Branch**: main (commit to main directly, same as before)

---

## Context

You've been working on this codebase before. Quick orientation:
- Repo: `xxcrypto-gtm/` on the mounted workspace
- Framework: Next.js + TypeScript + Tailwind v4
- i18n: `src/i18n/zh.json` + `src/i18n/en.json` + type schema at `src/i18n/types.ts`
- Locale detection: `const isZh = t.nav.cta === 'EN'` (if true → Chinese mode)
- No `next/image`, `next/link`, `next/font` inside `modules/` or `shared/`
- Icons: lucide-react only
- Primitives from `@/components/primitives/`: `Card`, `Badge`, `Button` — use these, don't create new ones

**Git workflow** (FUSE filesystem has index.lock issues — use /tmp):
```bash
cd /tmp && git clone <remote-url> xxcrypto-round4
# make changes in /tmp/xxcrypto-round4
# then copy back to mounted workspace and commit from /tmp clone
```

---

## Task 1 — Act 3 Board UX Enhancement

### 1A. ecosystem/index.tsx — Add section headers for each board

File: `src/modules/ecosystem/index.tsx`

Current state: each board is separated by `<hr>`, no titles.

**Change**: Add a section header block before each board. Header contains: sequence number (01-04), title, subtitle.

Replace the body of `EcosystemModule` with:

```tsx
export default function EcosystemModule() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';

  const boards = [
    {
      num: '01',
      title: isZh ? '双 Agent 接入' : 'Dual-Agent Integration',
      subtitle: isZh ? '接入 MCP Server，你的 Agent 立刻获得交易能力' : 'Connect via MCP Server — your Agent gains trading capability instantly',
      component: <DualAgentBoard />,
    },
    {
      num: '02',
      title: isZh ? 'Skill 进化协作' : 'Skill Evolution',
      subtitle: isZh ? '从单个调用到自主写策略，Agent 的能力边界在扩张' : 'From single calls to autonomous strategy writing — the capability boundary is expanding',
      component: <SkillEvolutionBoard />,
    },
    {
      num: '03',
      title: isZh ? 'Agent 交易竞技' : 'Agent Trading Arena',
      subtitle: isZh ? '让你的 Agent 和全网 Agent 比收益，胜者分奖池' : 'Pit your Agent against all others on-chain — winners share the prize pool',
      component: <TradingArenaBoard />,
    },
    {
      num: '04',
      title: isZh ? '分润闭环' : 'Revenue Sharing',
      subtitle: isZh ? '你的 Skill 每被调用一次，你就赚一次' : 'Every time your Skill is called, you earn',
      component: <RevenueSharingBoard />,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="mb-12">
        <span className="inline-block rounded-full border border-brand-light bg-brand-soft px-4 py-1.5 text-xs font-semibold text-brand mb-4">
          v1.5 · Agent Zone
        </span>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {isZh ? '交易 Skill 生态' : 'Trading Skill Ecosystem'}
        </h2>
      </div>

      <div className="flex flex-col gap-16">
        {boards.map((board) => (
          <div key={board.num}>
            <div className="mb-6 flex items-start gap-4">
              <span className="mt-1 text-4xl font-black text-gray-100 leading-none select-none">
                {board.num}
              </span>
              <div>
                <h3 className="text-xl font-bold text-ink">{board.title}</h3>
                <p className="text-sm text-muted mt-1">{board.subtitle}</p>
              </div>
            </div>
            {board.component}
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

### 1B. DualAgentBoard.tsx — Connect animation

File: `src/modules/ecosystem/components/DualAgentBoard.tsx`

Current: clicking "一键接入" sets `connected = true`, Agent B's content changes with no animation.

**Change**: Add CSS transition so Agent B's card animates in. Replace Agent B's content section with:

```tsx
{/* Agent B */}
<div className="flex flex-col items-center gap-4 text-center transition-all duration-500">
  <div
    className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-500 ${
      connected ? 'bg-brand-soft' : 'bg-gray-100'
    }`}
  >
    <Bot size={28} className={`transition-colors duration-500 ${connected ? 'text-brand' : 'text-muted'}`} />
  </div>
  <h3 className="text-lg font-bold text-ink">
    Agent B: {isZh ? '自定义 Agent' : 'Custom Agent'}
  </h3>
  {connected ? (
    <Badge tone="success">{isZh ? '已连接' : 'Connected'}</Badge>
  ) : (
    <Badge tone="warning" className="animate-pulse">{isZh ? '待接入' : 'Standby'}</Badge>
  )}
  <div
    className={`transition-all duration-500 overflow-hidden ${
      connected ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
    }`}
  >
    <ul className="space-y-1 text-sm text-muted">
      {skills.map((s) => (
        <li key={s.code}>
          <span className="font-mono text-xs font-bold text-ink">{s.code}</span> {s.label}
        </li>
      ))}
    </ul>
  </div>
  {!connected && (
    <button
      onClick={() => setConnected(true)}
      className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90 active:scale-95"
    >
      {isZh ? '一键接入' : 'Connect Now'}
    </button>
  )}
  {connected && (
    <p className="rounded-lg bg-brand-soft px-3 py-2 text-sm font-semibold text-brand animate-fade-in">
      BTC $87,200 ↑2.3%
    </p>
  )}
</div>
```

Also add `animate-fade-in` to `tailwind.config.ts` if not present. If Tailwind v4 doesn't support custom keyframes easily, use `opacity-0 animate-[fadeIn_0.4s_ease_forwards]` or just rely on the `transition-all` approach above without a custom class — the `max-h` transition is enough.

---

### 1C. SkillEvolutionBoard.tsx — Mobile vertical stepper + Stage 3 data viz

File: `src/modules/ecosystem/components/SkillEvolutionBoard.tsx`

**Change 1 — mobile vertical stepper**: Currently arrows between cards are `hidden md:block`. On mobile the stages stack vertically (`flex-col`), but there are no ↓ arrows between them.

In the stages `.map()` block, the current arrow is:
```tsx
{i < stages.length - 1 && (
  <span className="hidden md:block text-2xl font-bold text-muted shrink-0">→</span>
)}
```

Replace with:
```tsx
{i < stages.length - 1 && (
  <>
    <span className="hidden md:block text-2xl font-bold text-muted shrink-0">→</span>
    <div className="flex md:hidden justify-center">
      <span className="text-2xl font-bold text-muted">↓</span>
    </div>
  </>
)}
```

**Change 2 — Stage 3 detail**: currently shows a plain text paragraph in a Card. Replace the detail Card with a mini stat grid:

```tsx
{showDetail && (
  <div className="mt-4 rounded-2xl border border-border bg-gray-50 p-5">
    <p className="text-xs font-bold text-muted mb-4">
      {isZh ? 'BTC 均线策略 5/20 · 回测区间：2025-10 → 2026-03' : 'BTC MA Strategy 5/20 · Backtest: 2025-10 → 2026-03'}
    </p>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: isZh ? '胜率' : 'Win Rate', value: '62%', positive: true },
        { label: isZh ? '最大回撤' : 'Max Drawdown', value: '8.3%', positive: false },
        { label: isZh ? '总交易次数' : 'Total Trades', value: '84', positive: null },
        { label: isZh ? '年化收益' : 'Ann. Return', value: '+31%', positive: true },
      ].map((stat) => (
        <div key={stat.label} className="rounded-xl bg-white p-3 text-center shadow-sm">
          <p className="text-xs text-muted">{stat.label}</p>
          <p
            className={`text-lg font-bold mt-1 ${
              stat.positive === true
                ? 'text-accent-green'
                : stat.positive === false
                ? 'text-red-500'
                : 'text-ink'
            }`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
```

---

### 1D. TradingArenaBoard.tsx — Top 3 row highlight + button bounce

File: `src/modules/ecosystem/components/TradingArenaBoard.tsx`

**Change 1 — Top 3 row background**: Add a `bg` field to each row:

```tsx
const rows = [
  { rank: '🥇 1', agent: 'Alpha-7', strategy: isZh ? '趋势跟踪' : 'Trend Following', ret: '+12.4%', risk: isZh ? '中' : 'Med', bg: 'bg-yellow-50' },
  { rank: '🥈 2', agent: 'QuietBot', strategy: isZh ? '均值回归' : 'Mean Reversion', ret: '+9.1%', risk: isZh ? '低' : 'Low', bg: 'bg-gray-50' },
  { rank: '🥉 3', agent: 'Storm-X', strategy: isZh ? '动量策略' : 'Momentum', ret: '+7.8%', risk: isZh ? '高' : 'High', bg: 'bg-orange-50' },
  { rank: '4', agent: 'NeutralAI', strategy: isZh ? '套利' : 'Arbitrage', ret: '+4.2%', risk: isZh ? '低' : 'Low', bg: '' },
];
```

In the table row:
```tsx
<tr key={r.rank} className={`border-b border-border last:border-0 ${r.bg}`}>
```

**Change 2 — "参加竞技" button bounce**: Add `animate-bounce` to the button and stop the animation after click:

```tsx
<button
  onClick={() => setEntered(true)}
  className="rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand/90 animate-bounce"
>
  {isZh ? '参加竞技' : 'Enter Arena'}
</button>
```

`animate-bounce` is a built-in Tailwind class, no config needed.

---

### 1E. RevenueSharingBoard.tsx — Mobile vertical flow + ↓ arrows

File: `src/modules/ecosystem/components/RevenueSharingBoard.tsx`

Current flow section:
```tsx
<div className="flex flex-wrap items-center justify-center gap-2">
  {pills.map((pill, i) => {
    ...
    {i < pills.length - 1 && (
      <span className="text-muted font-bold">→</span>
    )}
  })}
</div>
```

Replace with a responsive version that uses `→` on desktop and `↓` on mobile:

```tsx
{/* Flow diagram */}
<div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-2">
  {pills.map((pill, i) => {
    const Icon = pill.icon;
    return (
      <React.Fragment key={i}>
        <span className="rounded-full border border-border bg-white px-4 py-2 flex items-center gap-2 text-sm text-ink">
          <Icon size={16} className="text-brand shrink-0" />
          {pill.label}
        </span>
        {i < pills.length - 1 && (
          <>
            <span className="hidden sm:block text-muted font-bold">→</span>
            <span className="block sm:hidden text-muted font-bold">↓</span>
          </>
        )}
      </React.Fragment>
    );
  })}
</div>
```

Make sure `React` is imported at the top: `import React from 'react';`

---

## Task 2 — UserStoryCards Content Polish

### 2A. i18n — Add skillsLabel + skill name mapping

Files: `src/i18n/zh.json`, `src/i18n/en.json`, `src/i18n/types.ts`

**zh.json**: In `v10.stories`, add two fields:

```json
"skillsLabel": "涉及能力",
"skillNames": {
  "M1": "行情查询",
  "M5": "限价挂单",
  "M11": "API 鉴权",
  "M12": "账户读取",
  "M14": "持仓管理",
  "M15": "MCP 协议",
  "M16": "Skill 发现",
  "M17": "Agent 生成",
  "P1": "情绪指数",
  "P3": "资金流向",
  "P6": "跟单配置"
}
```

**en.json**: Same structure:

```json
"skillsLabel": "Skills used",
"skillNames": {
  "M1": "Market Data",
  "M5": "Limit Order",
  "M11": "API Auth",
  "M12": "Account Read",
  "M14": "Position Mgmt",
  "M15": "MCP Protocol",
  "M16": "Skill Discovery",
  "M17": "Agent Builder",
  "P1": "Sentiment Index",
  "P3": "Fund Flow",
  "P6": "Copy-trade Config"
}
```

**types.ts**: Update `v10.stories` type:

```typescript
stories: {
  title: string;
  subtitle: string;
  skillsLabel: string;
  skillNames: Record<string, string>;
  items: ReadonlyArray<{
    id: string;
    persona: string;
    scenario: string;
    dialog: ReadonlyArray<{ role: 'user' | 'agent' | 'thinking'; text: string }>;
    skills: ReadonlyArray<string>;
  }>;
};
```

Note: `role` now includes `'thinking'` as a valid value.

---

### 2B. i18n — Expand dialogs to 3 turns with thinking step

Files: `src/i18n/zh.json`, `src/i18n/en.json`

Replace the current `v10.stories.items` dialogs. Key change: every story should have at least 3 dialog entries including one `{ role: 'thinking', text: '...' }` step showing Agent calling skills.

**zh.json** replacement (full `items` array):

```json
"items": [
  {
    "id": "story1",
    "persona": "加密货币投资者",
    "scenario": "数据聚合",
    "dialog": [
      { "role": "user", "text": "帮我看看今天市场怎么样" },
      { "role": "thinking", "text": "正在调用 M1 行情接口 + P3 资金流向 + P1 市场情绪..." },
      { "role": "agent", "text": "BTC $87,200 +2.3%，ETH $4,100 +1.8%。热点：某 L2 主网上线相关币涨 15%+。稳定币净流入交易所 $3.2 亿，情绪偏多。" }
    ],
    "skills": ["M1", "P1", "P3"]
  },
  {
    "id": "story2",
    "persona": "已有 Agent 的圈外用户",
    "scenario": "自主发现",
    "dialog": [
      { "role": "user", "text": "帮我找加密货币赚钱工具" },
      { "role": "thinking", "text": "正在调用 M16 Skill 发现接口..." },
      { "role": "agent", "text": "找到了，提供行情、现货合约、链上数据，支持 MCP 接入。接入吗？" },
      { "role": "user", "text": "接入" },
      { "role": "thinking", "text": "正在调用 M15 MCP 协议完成握手..." },
      { "role": "agent", "text": "已完成 MCP 对接，行情和下单能力已就位。" }
    ],
    "skills": ["M15", "M16"]
  },
  {
    "id": "story3",
    "persona": "活跃交易者",
    "scenario": "信息到下单",
    "dialog": [
      { "role": "user", "text": "BTC 跌到 $85,000 帮我买 0.5" },
      { "role": "thinking", "text": "正在调用 M11 鉴权 + M5 限价挂单接口..." },
      { "role": "agent", "text": "已挂单：0.5 BTC @ $85,000，限价单，GTC 有效期。当前价 $87,200，预计距目标价 -2.5%。" }
    ],
    "skills": ["M5", "M11", "M14"]
  },
  {
    "id": "story4",
    "persona": "X 上刷到 AI 炒币的吃瓜群众",
    "scenario": "一键拥有 Agent",
    "dialog": [
      { "role": "user", "text": "我要一个能交易的 Agent" },
      { "role": "thinking", "text": "正在调用 P6 跟单配置 + M17 Agent 生成..." },
      { "role": "agent", "text": "已生成，默认保守模式，单笔最大 $200，止损 5%。这么用：直接发指令，或选预设策略开始跑。" }
    ],
    "skills": ["P6", "M17"]
  },
  {
    "id": "story5",
    "persona": "交易所现有用户",
    "scenario": "站内导流",
    "dialog": [
      { "role": "user", "text": "在 CoinW App 里发现 Agent Skills 入口" },
      { "role": "thinking", "text": "正在调用 M17 Agent 初始化 + M11 API Key 绑定..." },
      { "role": "agent", "text": "API Key 已生成，MCP 配置已完成。你的账户现在可以接受 Agent 指令。第一条指令是什么？" }
    ],
    "skills": ["M17", "M11", "M12"]
  }
]
```

**en.json** — mirror structure with English text (write appropriate translations).

---

### 2C. UserStoryCards.tsx — Use i18n label + skill names + thinking bubble style

File: `src/modules/landing/components/UserStoryCards.tsx`

**Change 1 — skillsLabel**: Replace hardcoded `"涉及能力："` with `t.v10.stories.skillsLabel`

**Change 2 — skill name display**: Replace raw M-code badges with readable names:

```tsx
{/* Skills used */}
<div className="flex flex-wrap items-center gap-2">
  <span className="text-xs text-muted">{t.v10.stories.skillsLabel}：</span>
  {active.skills.map((skill: string) => (
    <Badge key={skill} tone="neutral" className="text-xs">
      {t.v10.stories.skillNames[skill] ?? skill}
    </Badge>
  ))}
</div>
```

**Change 3 — thinking bubble style**: In the dialog `.map()`, add a third case for `role === 'thinking'`:

```tsx
{active.dialog.map((msg: { role: string; text: string }, i: number) => {
  if (msg.role === 'thinking') {
    return (
      <div key={i} className="flex justify-start">
        <span className="flex items-center gap-2 text-xs text-muted italic">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
          {msg.text}
        </span>
      </div>
    );
  }
  return (
    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <span
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
          msg.role === 'user'
            ? 'bg-brand text-white rounded-br-sm'
            : 'bg-white text-ink shadow-sm rounded-bl-sm'
        }`}
      >
        {msg.text}
      </span>
    </div>
  );
})}
```

---

## Verification Checklist

After changes, do `tsc --noEmit` in a /tmp clone to confirm zero TS errors before pushing.

Specific things to check:
- `t.v10.stories.skillsLabel` resolves (types.ts updated)
- `t.v10.stories.skillNames[skill]` resolves — `skillNames` typed as `Record<string, string>` so index access is fine
- `role: 'thinking'` accepted in the dialog type
- No import of non-existent primitives in any board component
- `React` imported in RevenueSharingBoard.tsx (needed for `React.Fragment`)

---

## Delivery

Commit message: `feat: act3 board UX + userstory content polish (round 4)`

Push to main. Dan will tell F when done.
