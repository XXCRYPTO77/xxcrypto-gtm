# CWC MVP 网站 · 四幕架构 v2

> **定稿日期**: 2026-04-13
> **状态**: Dan确认，可执行
> **前置文档**: `inbox/P0-E-20260410-cwc-mvp-roadmap.md`（原始任务包，部分结构已被本文档覆盖）

---

## 0. 核心认知（覆盖原任务包中的理解）

**四幕 = 四个产品里程碑，不是版本号分组。**

每一幕的页面就是那个阶段的产品Demo——用户点进去看到的是产品本身，不是PRD的可视化。

**可扩展性硬约束**：每个Act的代码模块必须可独立抽出接入主站。Demo壳是scaffolding，产品模块是资产。展示完一幕，该幕代码直接进入真实产品开发，开发完独立抽出接主站。后面的幕继续在Demo壳里迭代。流水线交付。

| 幕 | 版本锚点 | 产品形态 | 用户体验 |
|---|---|---|---|
| Act 1 | v1.0 | Skills落地页 | 看到产品，知道是什么，复制prompt能试 |
| Act 2 | v1.1 | Agent交互界面 | 选风格，上手聊，走完全流程 |
| Act 3 | v1.5 | 交易Skill生态（终态） | 双Agent+Skill进化+交易竞技+分润闭环 |
| Act 4 | v2.0+ | 远景（轻一档） | 接回主站路径+安全风控+蓝图 |

**支撑功能归属（P系列，版本间隙过渡带）**：
- P1-P3(TG通道/通知推送/API Key管理) → Act 1 和 Act 2 之间的过渡带
- P4-P8(市场概览/链上数据/新闻聚合/大额确认/AI报告) → Act 2 和 Act 3 之间的过渡带
- P9-P11(转化漏斗/IP白名单/异常告警) → Act 3 和 Act 4 之间的过渡带
- v1.6-v1.9(安全架构) → Act 4 安全风控概览板块

**完整内容spec**：`docs/4-ACT-SPEC-v2.md`（2026-04-13锁定，内容规划的唯一truth source）
**Airy任务包**：`docs/AIRY-TASK-PACKAGE.md`（英文，直接交给Airy使用）

---

## 1. 首页（路线图总览）

四张Act卡片，每张代表一个产品形态。点击进入对应页面。

每张卡片内容：
- Act编号 + 标题（能跑/能用/能生长/远景）
- 一句话描述产品形态
- 版本锚点标签
- 代表性视觉元素/缩略图

底部：Extensions延展区（跟单Agent化/DeriW/mascot/外部API/KOL Agent化）保留。

---

## 2. Act 1「看到」— v1.0 Skills落地页

### 定位
这个页面本身就是v1.0产品。用户打开就是CoinW Agent Skills的官方落地页。

### 页面结构（按PRD §4.2）

**2.1 Hero区**
- 主标题 + 副标题
- CTA-1："立即开始" → 平滑滚动到快速开始区
- CTA-2："API文档" → 外链 https://www.coinw.com/api-doc/common/introduction （新标签页）
- 品牌视觉元素（CoinW紫色主调）

**2.2 快速开始 · 3步**
1. 生成 API Key — 在CoinW站内生成专属Agent用Key
2. 一键安装 Skills — 复制命令到Agent环境
3. 发一句话试试 — "帮我看看今天BTC行情"

**2.3 一键安装命令块**
- `npx @coinw/agent-skills install`
- 点击复制到剪贴板 + "已复制" toast反馈

**2.4 常用场景卡 · 4张**
- 每日加密日报 / 价格提醒 / 持仓总览 / 自动交易
- 每张卡片：icon + 标题 + prompt文本 + "立即试用"按钮
- 点击"立即试用" → 复制prompt到剪贴板 + toast"已复制，前往你的Agent粘贴使用"

**2.5 能力概览**
- M1-M18，四组Tab切换（信息端/交易端/认证安全/平台基础）
- **用用户语言呈现**（"帮你看行情""帮你下单""帮你管风控"），不是内部能力矩阵分析报告
- 每项：编号 + 名称 + 一句话描述

**2.6 即将推出（底部）**
- P1-P9以标签墙形式，灰色调
- 明确标注"Coming Soon"
- 不喧宾夺主，视觉权重最低

### 代码模块
```
modules/landing/
  components/
    Hero.tsx
    QuickStart.tsx
    InstallBlock.tsx
    UseCaseCards.tsx
    CapabilityTabs.tsx
    ComingSoon.tsx
  data/
    capabilities.ts      ← M1-M18数据，interface统一
    useCases.ts          ← 4个场景prompt
    types.ts
  i18n/
    zh.json              ← 模块自带翻译
    en.json
  index.tsx              ← 模块入口
```

---

## 3. Act 2「用到」— v1.1 Agent交互界面

### 定位
这个页面就是Agent产品界面。用户选择风格后直接跟Agent对话，能走完完整体验流程。

### 页面结构

**3.1 Agent预设选择（首屏）**

参考CWCLAW流程：用户进入后先选Agent角色/交易风格，再进入对话。

- 顶部引导："选择你的AI交易伙伴"
- 预设角色卡片（4-6张），每张包含：
  - Agent头像/avatar
  - 名称（如"稳健派Alpha" / "趋势猎手" / "套利专家" / "高频战士"）
  - 交易风格标签（保守/均衡/激进/量化）
  - 一句话描述（"低回撤稳收益，适合长期持有" / "追涨杀跌快进快出"）
  - 风险等级指示器（星级或色条）
  - 适合人群标签
- 用户点击选择 → 过渡动画 → 进入对话界面

**3.2 Agent对话界面（主体）**

- **左区：聊天窗**
  - 气泡式对话
  - Agent调用Skills时：loading + 工具调用气泡（类似Claude Code的tool call展示）
  - 预设快捷按钮（不需要用户打字）：
    - "看看今天市场" → 触发日报路径
    - "BTC跌到85000帮我买" → 触发限价单路径
    - "帮我找赚钱工具" → 触发发现接入路径
  - 对话内容根据选择的Agent风格有差异（同一个问题，稳健派和激进派的回答风格不同）

- **右区：Skills活跃面板**
  - 当前调用的Skills实时高亮
  - Skills列表 + 调用状态（idle/calling/done）
  - 调用历史记录

- **三条可走完的路径**：
  - 路径A — 日报（查行情→生成日报卡片）
  - 路径B — 限价单（风控检查→挂单确认）
  - 路径C — 发现接入（搜索MCP→列出Skills→接入）

**3.3 用户旅程可视化（对话区下方）**

参考CW龙虾漫画，6个面板横向排列：
1. 散户在X上刷到AI炒币 → 好奇
2. 发现CoinW Agent Skills → 点进落地页
3. 选择Agent风格 → 配好API Key
4. 第一句话："帮我看看BTC" → Agent返回日报
5. "BTC跌到85000帮我买" → Agent挂限价单
6. 仪表盘查看持仓盈亏 → 日常使用

- HTML/CSS/SVG实现（不是图片），CoinW品牌色
- 每个面板可点击，点击后对话区自动演示对应环节

**3.4 配套能力区（底部，三张小卡片，Deep B）**

- v1.2 多钱包与权限分级 — "你的Agent懂你有几个钱包"
  - 示意图：主账户→子账户→Agent，权限粒度（只读/现货/合约/完整）
- v1.3 大额风控确认 — "超过阈值，Agent停下来等你点头"
  - 流程图：订单→风控引擎→阈值判断→推送确认→超时拒绝
- v1.4 TG/Email通道 — "不装App也能用"
  - 两个mock示意：TG对话框 + 邮件模板

每张卡片：标题 + 一句话描述 + 示意图/icon + 简单交互说明文字

### 代码模块
```
modules/agent-chat/
  components/
    AgentPresets.tsx      ← 角色选择
    PresetCard.tsx
    ChatWindow.tsx        ← 对话主体
    SkillsPanel.tsx       ← 右侧Skills面板
    JourneyMap.tsx        ← 用户旅程6面板
    SupportFeatures.tsx   ← v1.2/v1.3/v1.4配套卡片
  engine/
    dialog-tree.ts        ← 对话状态机（interface统一，后续换LLM）
    types.ts              ← AgentMessage / SkillCall / DialogPath
    presets.ts            ← 角色预设数据
  data/
    paths/                ← 三条对话路径的预定义数据
      daily-report.ts
      limit-order.ts
      discover-skills.ts
    mock-skills.ts
  i18n/
    zh.json
    en.json
  index.tsx
```

---

## 4. Act 3「生态」— v1.5 交易Skill生态（终态）

> **2026-04-16 重构**：从单页长卷轴改为 Hub + 三子页结构。解决信息过载问题。

### 定位
产品当前规划的终态。Hub 总览 + 三个子页面，按用户动线分流。

### 路由结构（shell层）
```
/act3              → Hub 总览（入口导航 + 生态快照）
/act3/arena        → 竞技场（Agent 交易竞技 + 跟单）
/act3/zone         → AgentZone（Agent/策略发现 + 开发者入驻 + 收益模型）
/act3/events       → 活动中心（Bounty + 赛季活动 + 社区挑战）
```

### 4.0 Hub 总览页 `/act3`

一屏到底的导航页，不滚无限。

**Hero**：Act 3 标题 + "交易 Skill 生态" + 一句话定位

**生态快照**：4 个关键数字（glass pill 样式）
- 在线 Agent 数 / 策略总数 / 当前赛季 / 活跃活动数

**三张导航卡**（竞技场 / AgentZone / 活动中心）：
- 每张：icon + 标题 + 一句话描述 + 缩略视觉 + 箭头
- 点击跳转对应子路由
- 竞技场排第一位（最高视觉权重）

**安全基座**（底部）：
- 四张 SVG 架构图 Tab 切换（原 v1.6-v1.9）
- 不标版本号，作为"生态安全运转的保障"

### 4.1 子页 Arena（竞技场） `/act3/arena`

用户画像：围观比赛的散户、想跟单的用户、想证明实力的 Agent 运营者。

**Hero Banner**（全宽暗色）
- 标题 "Agent Trading Arena"
- 赛季倒计时（伪倒计时，刷新重置）
- 统计 pill：参赛 Agent 数 / 交易量 / 奖池
- CTA → smooth scroll 到排行榜

**Top 3 Podium**
- 冠亚季 3 张大卡（#1 居中偏高）
- 下方 #4-#10 紧凑表格
- 每个 Agent：头像 / 名称 / 策略类型 / 收益率 / 回撤 / 夏普

**战绩广场（Battle Feed）**
- Agent 实时战报 feed（现有 PlazaFeed）
- 每张卡：Agent + 标题 + 摘要 + PnL/持仓/Skill 标签 + 点赞/评论/分享

**跟单入口（Copy Trading）**
- 明星 Agent 卡片（3-4 张）：头像 + 30 天收益曲线 + 跟单人数 + 一键跟单
- 跟单流程说明

**流转流程图**
```
磨炼策略 → 参赛验证 → 胜出成星 → 开放跟单 → 用户获益 → 收益回流
```

视觉方向：Dark glassmorphism（参考 Airy 的 `docs/proposals/act3-arena-redesign-v2.md`）

### 4.2 子页 AgentZone `/act3/zone`

用户画像：策略开发者、Agent 开发者、想了解生态全貌的人。逛"商场"。

**Agent 发现**（现有 AgentList）
- 筛选：全部 / 官方 / 外部接入
- 排序：收益率 / 日调用 / 关注数
- Agent 卡片：头像 + 名称 + 标签 + 策略描述 + 数据 + 关注/接入协议

**策略进化**（现有 StrategyLibrary + TuneOut + ContributorRank）
- 策略市场：分类筛选 + 搜索 + 策略卡片（胜率指数 / 实盘 / PnL / 版本）
- TuneOut 机制说明
- 贡献者排行

**开发者入驻**（现有 IntegrationGuide）
- 三步接入：注册 → 选协议（MCP/REST/WebSocket）→ 发布上线
- 代码示例

**贡献者等级**（现有 ContributorTiers）
- 三级：社区贡献者 → 认证开发者 → 官方合作伙伴

**收益模型**（现有 RevenueRules + RevenueCalculator）
- 分润规则（官方调用分润 / 外部调用不分润）
- 收益计算器

### 4.3 子页 Events（活动中心） `/act3/events`

用户画像：活跃社区成员、想赚 Credit 的策略开发者。看"有什么活动可以参加"。

当前阶段：展示页，后续细化。

**进行中活动**
- Bounty 任务池（悬赏任务卡片：标题 / 赏金 / 竞标数 / 状态 / 截止时间）
- 赛季活动（如交易锦标赛报名、专题挑战）

**活动日历**
- 时间线形式：当前 / 即将 / 已结束

**奖励总览**
- Credit 奖励 / 徽章 / 特殊权限

竞技场 vs 活动的边界：竞技场 = 永久基础设施（排行榜一直在跑），活动 = 运营驱动的限时事件（有截止日）。

### 代码模块
```
modules/ecosystem/
  boards/
    Hub/
      EcoSnapshot.tsx        ← 4 个关键统计
      NavCards.tsx            ← 三张子页导航卡
      SecurityBase.tsx        ← 4 张 SVG 架构图 Tab
    Arena/                   ← Airy 主导开发（dark glassmorphism）
      ArenaHero.tsx
      ArenaPodium.tsx
      ArenaLeaderboard.tsx   ← 现有，重构
      PlazaFeed.tsx          ← 现有，迁移
      CopyTrading.tsx        ← 新建
      ArenaFlow.tsx          ← 新建
    AgentZone/
      AgentList.tsx          ← 现有，迁移
      StrategyLibrary.tsx    ← 现有，迁移
      StrategyDetail.tsx     ← 现有，迁移
      TuneOutInfo.tsx        ← 现有，迁移
      ContributorRank.tsx    ← 现有，迁移
      IntegrationGuide.tsx   ← 现有，迁移
      ContributorTiers.tsx   ← 现有，迁移
      RevenueRules.tsx       ← 现有，迁移
      RevenueCalculator.tsx  ← 现有，迁移
    Events/
      ActiveEvents.tsx       ← 新建（Bounty + 赛季活动）
      EventCalendar.tsx      ← 新建
      RewardsOverview.tsx    ← 新建
  data/
    agents.ts
    strategies.ts
    arena.ts
    plaza.ts
    events.ts               ← 新建
  components/_legacy/        ← 清理
  index.tsx                  ← 导出各 board 入口
```

---

## 5. Act 4「远景」— v2.0+ （轻一档）

### 定位
三幕之后的收尾板块。重点：接回主站怎么走 + 安全风控 + 蓝图。

### 页面结构

**5.1 接回主站路径（核心板块）**

可视化时间线/流程图：
1. 独立模块稳定运行（v1.5生态跑通）
2. API兼容性验证（与主站API层对齐）
3. 安全审计（代码审计+渗透测试）
4. 数据迁移（用户数据/Skill数据/Credit数据）
5. 灰度流量切换（5%→20%→50%→100%）
6. 主站原生集成（Agent Skill成为一级入口）
7. 监控+回滚预案

每步标注：关键动作 / 参与团队 / 风险点 / 预估时间

**5.2 安全风控重点展示**

从Act 3底部的四张架构图中提取关键安全信息，以更面向管理层的方式呈现：
- 数据隔离方案（Agent操作的资金边界）
- 风控多层防线（频率限制→额度上限→大额确认→提现禁止）
- 合规路径（监管要点、审计闭环）
- 灾难恢复（回滚预案、数据备份策略）

不是重复Act 3的SVG，是把技术图翻译成管理层能看懂的风险矩阵。

**5.3 后续规划蓝图**

时间线/路线图形式展示：
- 2026 H2：v1.0-v1.1落地，Skills+Agent上线
- 2027 H1：v1.5生态跑通，Marketplace+交易赛+跟单
- 2027 H2：v2.0合回主站，Agent Skill成为CoinW产品品类
- 2028+：延展方向（跟单Agent化/DeriW/mascot/外部API/KOL Agent化）

每个阶段标注：核心交付物 / 预期指标 / 关键依赖

**5.4 Extensions延展区**（从首页移到这里也可以，或首页和Act 4各放一份）
- 5张卡片，每张一句话

### 代码模块
```
modules/vision/
  components/
    MigrationTimeline.tsx
    SecurityOverview.tsx
    RoadmapBlueprint.tsx
    Extensions.tsx
  data/
    timeline.ts
    security-points.ts
  i18n/
    zh.json
    en.json
  index.tsx
```

---

## 6. 模块化架构（可扩展性保障）

### 目录结构
```
src/
  modules/
    landing/          ← Act 1，可独立抽出
    agent-chat/       ← Act 2，可独立抽出
    ecosystem/        ← Act 3，可独立抽出
    vision/           ← Act 4
  shell/              ← Demo壳（scaffolding，不带走）
    Navbar.tsx
    Footer.tsx
    Overview.tsx       ← 首页四张卡
  shared/             ← 跨模块共享基础设施
    ui/               ← Button, Card, Toast, Tab等原子组件
    i18n/             ← locale检测/切换基础设施
    theme/            ← CoinW品牌token（色值/字体/间距）
    hooks/            ← 通用hooks（useClipboard, useToast等）
```

### 模块独立性规则

1. **modules/X/ 不import shell/里的任何东西**
2. **modules/X/ 可以import shared/里的东西**（共享UI、主题、hooks）
3. **shell/ import modules/X/的index.tsx入口**（组装Demo展示）
4. **modules之间不互相import**（Act 2不依赖Act 1的组件）

### 数据层 — Provider Pattern

每个模块的data/用统一interface，mock和真实API可替换：

```typescript
// 示例：modules/landing/data/types.ts
export interface Capability {
  code: string;
  name: string;
  desc: string;
  group: 'info' | 'trade' | 'auth' | 'platform';
}

// modules/landing/data/provider.ts
// 现在：返回mock数据
// 以后：调用CoinW API
export function useCapabilities(): Capability[] {
  return mockCapabilities;
  // → 后续替换为 useSWR('/api/capabilities')
}
```

### 对话引擎 — Interface统一

```typescript
// modules/agent-chat/engine/types.ts
export interface AgentEngine {
  send(message: string, preset: AgentPreset): Promise<AgentResponse>;
  getActivePaths(): DialogPath[];
}

// 现在：dialog-tree.ts 实现（前端状态机）
// 以后：llm-engine.ts 实现（真LLM调用）
// 组件层零改动
```

### i18n — 模块自带

每个模块自带 i18n/zh.json 和 i18n/en.json。shared/i18n/ 只提供locale检测和切换机制。模块抽出时自带翻译文件。

### 主站接入路径

```
Phase 1: 展示通过 → modules/landing/ + shared/ 抽出 → v1.0产品接主站
Phase 2: 展示通过 → modules/agent-chat/ + shared/ 抽出 → v1.1产品接主站
Phase 3: 展示通过 → modules/ecosystem/ + shared/ 抽出 → v1.5产品接主站
```

主站技术栈影响接入方式：
- React/Next.js → 直接以组件/子目录形式接入
- Vue/其他 → Web Component包装 或 iframe嵌入
- 架构上模块边界干净即可，两种都能走

---

## 7. 主站接入技术约束

**主站技术栈**：后端 Java + Python，前端 H5 / iOS / Android。前端非React。

**影响**：模块抽出后不能直接以React组件形式插入主站，需包装层（iframe / Web Component / 微前端）。具体方案在接入阶段根据实际情况确定。

**当前架构约束**（确保模块可脱离Next.js独立运行）：
- modules/ 内不用 `next/image`（用标准 `<img>`）
- modules/ 内不用 `next/link`（模块内部导航用 React state）
- modules/ 内不用 Server Components（全部 `'use client'`）
- modules/ 内不用 Next.js API Routes
- modules/ 内不用 `next/font`
- Next.js 只在 shell/ 层使用（路由、部署）
- modules/ 是纯 React + Tailwind，可跑在 Vite / CRA / 任何 React 构建工具上

---

## 8. 品牌与视觉

- **全程CoinW品牌**：紫色 #5227FF 主色，白色背景为主，暗色模式可选
- **品牌参考**：CoinW Company Deck 2026
- **不使用aurora/XXCrypto品牌元素**（除了repo名和footer声明）
- **mascot（橙色毛绒怪物）**：只出现在Act 4延展区

---

## 8. 验收标准（更新）

### 功能验收
- [ ] 首页四张Act卡片可点击跳转
- [ ] zh/en toggle全局生效
- [ ] Act 1：所有CTA可点（立即开始/API文档/复制命令/复制prompt+toast）
- [ ] Act 2：Agent预设选择可交互，选择后进入对话
- [ ] Act 2：对话树3条路径可走完
- [ ] Act 2：用户旅程6面板可点击联动
- [ ] Act 3：Skill Registry筛选动效正常
- [ ] Act 3：Bounty Task池可见
- [ ] Act 3：Skill进化链可视化正常
- [ ] Act 3：交易赛排行榜+跟单卡片正常
- [ ] Act 3：Credit流转图动画正常
- [ ] Act 3：安全架构图4张可切换查看
- [ ] Act 4：接回主站时间线可见
- [ ] Act 4：安全风控板块可见
- [ ] Act 4：蓝图时间线可见

### 交付物
- [ ] Vercel可访问（https://xxcrypto-gtm.vercel.app）
- [ ] GitHub代码干净（commit历史清晰）
- [ ] `docs/v1.0-demo-script.md` — 老板走查演示脚本

### 非功能
- [ ] 首屏加载 < 3s
- [ ] 移动端基本可用
- [ ] 所有假数据看起来真实

---

## 9. 与原任务包的差异

| 项目 | 原任务包（P0-E-20260410） | 本架构v2 |
|---|---|---|
| 三幕划分 | Act1=v1.0+v1.1 / Act2=v1.2-1.4 / Act3=v1.5+安全+v2.0 | Act1=v1.0 / Act2=v1.1 / Act3=v1.5 / Act4=v2.0+ |
| v1.2-v1.4 | 独立成幕（Act 2） | 嵌入Act 2配套能力区 |
| v1.6-v1.9 | 独立版本号 | 去版本号，嵌入Act 3安全基座 + Act 4安全板块 |
| v2.0 | = v1.5+安全组合，不另做 | 独立Act 4，含接回主站+安全风控+蓝图 |
| v1.0页面 | 按PRD §4.2 | 同，但P1-P9降级为底部Coming Soon |
| v1.1页面 | 对话树mock | 新增Agent预设选择 + 用户旅程可视化 |
| v1.5范围 | Marketplace + Agent Zone + Credit | 扩展为四板块：双Agent+Skill进化+交易竞技+分润闭环 |
| 可扩展性 | 未提及 | 硬约束：模块可独立抽出接主站 |

---

*本文档为开发基准。后续修改在本文档上版本追踪。*
