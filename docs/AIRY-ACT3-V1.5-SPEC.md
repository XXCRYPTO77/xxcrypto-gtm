# Act 3 v1.5 重构 — 执行 Spec

> 这份文档是 Act 3 重构的执行 spec，同时作为 Airy 任务包的索引。
> 策略来源：`docs/research/act3-v1.5-spec.md`（Dan 2026-04-14 定稿）
> 研究参考：`docs/research/evomap-analysis.md`

---

## 1. 重构目标

把 Act 3 从 **6 模块平铺** 重组为 **3 板块叙事**：

| 旧结构 | 新结构 |
|--------|--------|
| AgentZoneMap + SkillMarketplace + DualAgentBoard + SkillEvolutionBoard + TradingArenaBoard + RevenueSharingBoard 平铺 | 板块 A / 板块 B / 板块 C 三幕叙事 |

叙事主脉：**搭台 → 进化 → 回报**

---

## 2. 三板块架构

### 板块 A · 生态 + 活动（搭台）
承载内容：
- A.1 生态总览（动态网络拓扑图，Act 3 唯一视觉高点）
- A.2 Agent 列表（两类 Agent 徽章区分，并列展示）
- A.3 竞技场（7 日收益排行）
- A.4 广场战绩墙（Agent 发战绩，支持分享到外部）
- A.5 接入指引（三步式，给外部 Agent 开发者）

### 板块 B · Skill 进化网络（进化）
承载内容：
- B.1 策略卡库（Skill = 策略卡，"交易式"词汇）
- B.2 进化时间线（单张策略卡的迭代历史）
- B.3 汰换机制说明（胜率阈值）
- B.4 贡献者 Rank

### 板块 C · 分润机制（回报）
承载内容：
- C.1 分润规则说明（官方 Agent 独有，外部 Agent 不分润）
- C.2 分润计算器（占位，slider + 预期 USDT）
- C.3 贡献者准入（分级 + KYC/入金/收益率门槛）

---

## 3. 文件结构变化

### 新增文件

```
src/modules/ecosystem/
  index.tsx                                 # 重写为三板块
  boards/                                   # 新增 boards 层
    EcosystemBoard/
      index.tsx                             # 板块 A 总入口
      NetworkTopology.tsx                   # A.1 动态网络拓扑图
      AgentList.tsx                         # A.2 列表 + 徽章
      ArenaLeaderboard.tsx                  # A.3 竞技场
      PlazaFeed.tsx                         # A.4 广场战绩墙
      ShareCard.tsx                         # A.4 可分享战绩卡（html2canvas）
      IntegrationGuide.tsx                  # A.5 接入指引
    EvolutionBoard/
      index.tsx                             # 板块 B 总入口
      StrategyCard.tsx                      # B.1 策略卡组件
      EvolutionTimeline.tsx                 # B.2 进化时间线
      TuneOutInfo.tsx                       # B.3 汰换机制说明
      ContributorRank.tsx                   # B.4 贡献者 Rank
    RevenueBoard/
      index.tsx                             # 板块 C 总入口
      RevenueRules.tsx                      # C.1 规则说明
      RevenueCalculator.tsx                 # C.2 占位计算器
      ContributorTiers.tsx                  # C.3 准入说明
  data/
    agents.ts                               # 两类 Agent mock 数据
    strategies.ts                           # 策略卡 mock
    arena.ts                                # 竞技场排行 mock
    plaza.ts                                # 广场战绩 mock
```

### 删除/归档文件

```
src/modules/ecosystem/components/
  AgentZoneMap.tsx            → 归档（NetworkTopology 重写）
  SkillMarketplace.tsx        → 归档（StrategyCard 重写，叙事变"策略卡"）
  DualAgentBoard.tsx          → 删除（AgentList 承载两类 Agent）
  SkillEvolutionBoard.tsx     → 归档（EvolutionTimeline 重写）
  TradingArenaBoard.tsx       → 归档（ArenaLeaderboard 重写）
  RevenueSharingBoard.tsx     → 归档（RevenueCalculator 重写）
```

归档方式：移到 `src/modules/ecosystem/components/_legacy/`，不立即删除，防止回滚需要。

---

## 4. 数据模型（TypeScript 接口）

### Agent 类型

```typescript
// src/modules/ecosystem/data/agents.ts

export type AgentType = 'official' | 'external';

export interface Agent {
  id: string;
  name: string;
  nameEn: string;
  type: AgentType;                   // 徽章区分
  avatar: string;                    // emoji 或 url
  accent: string;                    // 主题色
  source: string;                    // "CoinW 官方" / 开发者名
  tagline: string;
  taglineEn: string;
  metrics: {
    return7d: number;                // 7 日收益率，百分比
    dailyCalls: number;              // 日调用量
    followers: number;
    totalUsers: number;
  };
  protocol?: 'MCP' | 'REST' | 'WebSocket';   // 外部 Agent 的接入协议
}
```

### 策略卡

```typescript
// src/modules/ecosystem/data/strategies.ts

export type StrategyCategory = 'spot' | 'futures' | 'arbitrage' | 'signal' | 'risk';

export interface Strategy {
  id: string;
  name: string;
  nameEn: string;
  category: StrategyCategory;
  winRateIndex: number;              // 胜率指数 0-100
  realTrades: number;                // 实盘记录数
  cumulativePnL: number;             // 累计 PnL 贡献（USDT）
  contributor: {
    name: string;
    verified: boolean;
  };
  versions: StrategyVersion[];       // 进化时间线
  status: 'active' | 'trending' | 'at-risk' | 'deprecated';
}

export interface StrategyVersion {
  version: string;                   // v1.0, v1.1, v1.2
  releasedAt: string;                // ISO
  winRateIndex: number;
  changelog: string;
  changelogEn: string;
}
```

### 广场战绩

```typescript
// src/modules/ecosystem/data/plaza.ts

export interface PlazaPost {
  id: string;
  agentId: string;
  postedAt: string;                  // "2h ago" / ISO
  type: 'trade' | 'daily-summary' | 'strategy-highlight';
  content: {
    title: string;
    titleEn: string;
    body: string;
    bodyEn: string;
    metrics?: Record<string, string | number>;  // PnL / 收益率 / 持仓
  };
  interactions: {
    likes: number;
    comments: number;
    shares: number;
  };
}
```

### 竞技场排行

```typescript
// src/modules/ecosystem/data/arena.ts

export interface ArenaEntry {
  rank: number;
  agentId: string;
  return7d: number;
  maxDrawdown: number;
  totalCalls: number;
  followers: number;
  trend: 'up' | 'down' | 'flat';     // 相对昨日排名
}
```

---

## 5. i18n 结构

新增 `agentChat` 和 `landing` 之外的 `ecosystem` 大类：

```json
{
  "ecosystem": {
    "hero": {
      "version": "v1.5 · Agent Zone",
      "title": "交易 Agent 生态",
      "desc": "两类 Agent 并列，围绕交易场景的 Skill 在这里反复验证、迭代、汰换。"
    },
    "boardA": {
      "title": "生态 + 活动",
      "topology": { "title": "...", "desc": "..." },
      "agentList": { "title": "...", "filterHot": "...", "badgeOfficial": "官方认证", "badgeCommunity": "社区 Agent" },
      "arena": { "title": "...", "col_rank": "...", "col_agent": "..." },
      "plaza": { "title": "战绩广场", "shareBtn": "分享", "followBtn": "关注" },
      "integration": { "title": "接入你的 Agent", "step1": "...", "step2": "...", "step3": "..." }
    },
    "boardB": {
      "title": "Skill 进化网络",
      "strategyCard": { ... },
      "timeline": { ... },
      "tuneOut": { ... },
      "contributorRank": { ... }
    },
    "boardC": {
      "title": "贡献者分润",
      "rules": { "title": "...", "officialHit": "官方 Agent 调用 → 分润", "externalHit": "外部 Agent 调用 → 不分润" },
      "calculator": { "title": "预期收益（演示）", "disclaimer": "示意参数，上线以公告为准" },
      "tiers": { "community": "社区", "verified": "认证开发者", "partner": "官方合作伙伴" }
    }
  }
}
```

zh 和 en 两份都要更新。`src/i18n/types.ts` 同步加类型。

---

## 6. 依赖新增

**需要新加一个 npm 包**：`html2canvas`（用于板块 A 的分享卡生成 PNG）

```bash
npm install html2canvas
```

大小约 45KB gzipped，可接受。

---

## 7. Airy 任务包拆分

建议 4 个并行任务包：

| 任务 ID | 内容 | 依赖 | 预估 |
|--------|------|------|------|
| **A3.0** | 数据层 + i18n 基建 + index.tsx 三板块骨架 | 无 | 0.5 天 |
| **A3.1** | 板块 A（EcosystemBoard 全部） | A3.0 | 1.5 天 |
| **A3.2** | 板块 B（EvolutionBoard 全部） | A3.0 | 1 天 |
| **A3.3** | 板块 C（RevenueBoard 全部） | A3.0 | 0.5 天 |

**关键路径**：A3.0 必须先做，A3.1 是最重的（含网络拓扑动画 + 分享卡 + 接入指引），A3.2/A3.3 可以并行给不同人。

如果只有 Airy 一个人：顺序 A3.0 → A3.1 → A3.2 → A3.3，总约 3.5 天。

如果 F + Airy 并行：
- F 做 A3.0 + A3.1（重活）
- Airy 做 A3.2 + A3.3
- 总约 2 天

---

## 8. 验收标准（整体）

- [ ] `/act3` 首屏能看到动态网络拓扑图（两类 Agent 节点 + 数据包流动）
- [ ] Agent 列表混合展示，徽章能清楚区分两类
- [ ] 竞技场排行 + 广场战绩可滚动浏览，战绩卡可分享（PNG 下载）
- [ ] 接入指引有三步式 + 可复制代码
- [ ] 策略卡能点进详情，看到进化时间线
- [ ] 分润计算器 slider 可拖动，显示预期 USDT + disclaimer
- [ ] 所有文案中英双语可切换
- [ ] 移动端（375px 宽）不崩
- [ ] `npx tsc --noEmit` 0 错误
- [ ] Vercel build 成功

---

## 9. 演示脚本更新

Act 3 部分要同步改写：
- 4 分钟时长不变
- 结构从"网络图 1min / Marketplace 2min / Arena 30s / Revenue 30s"改为"板块 A 2min / 板块 B 1min / 板块 C 1min"
- 核心叙事从"Skill 市场"改为"两类 Agent 并列获客 + Skill 进化 + 官方独有分润"

由 F 在代码落定后更新 demo-script.md。

---

*创建：2026-04-14 / Session F*
*待定：Dan 确认执行方式（F 独立 / Airy 接手 / 并行）*
