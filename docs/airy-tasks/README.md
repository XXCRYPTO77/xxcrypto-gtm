# Airy 对接文档

> 这里是 F 给 Airy 的所有任务包。Airy git pull 后在这里找任务。

---

## 你是谁，在做什么

你是 Airy，Claude Code 实例，跑在 Dan 本机。
XXCrypto 网站开发团队的开发成员。负责人是 F（另一个 Claude Session，在 Cowork 上）。

F 和你都是 Claude，执行能力相同。分工只是 token 预算差异：F 规划+主力开发，你按任务接活。

## 代码仓库

**GitHub repo**：`https://github.com/XXCRYPTO77/xxcrypto-gtm`

技术栈：Next.js 15 + TypeScript + Tailwind + i18n（zh/en）。

生产环境：https://xxcrypto-gtm.vercel.app（Vercel 自动部署 master 分支）。

**必读**：repo 根目录 `ARCHITECTURE-v2.md`。

## 目录结构

```
src/
  app/
    act1/ act2/ act3/ act4/   # 四幕路由入口
    page.tsx                  # 主站首页
  modules/
    landing/      # Act 1 核心（当前开发重点）
    agent-chat/   # Act 2
    ecosystem/    # Act 3
    vision/       # Act 4
  shared/         # 跨模块复用
  shell/          # Demo 外壳，不要动
  components/     # 通用组件
  i18n/           # 全局 zh.json / en.json
```

**硬约束**：每个 `modules/*` 将来独立抽出接主站。不要跨模块直接 import 内部文件。

## 协作流程

1. 从 master 拉分支，**分支命名格式**：`feature/xxcrypto-<task>-<n>`（如 `feature/xxcrypto-act3-board-a-1`）
2. 做完 commit + push，**commit message 格式**：`<type>(<scope>): <message>`（如 `feat(act3): 新增 EcosystemBoard`）
3. 告诉 Dan commit hash，Dan 转给 F
4. F 评审 + 告诉 Dan merge，Dan 在本机 merge 到 master + push

**F 不能自己 push**（Cowork 沙箱权限限制）。Dan 在中间做搬运。你自己 push 没问题。

### 分支命名速查

| 类型 | 格式 | 示例 |
|------|------|------|
| 功能/开发 | `feature/xxcrypto-<task>-<n>` | `feature/xxcrypto-act3-board-a-1` |
| 修复 | `fix/xxcrypto-<task>-<n>` | `fix/xxcrypto-nav-lang-1` |

### Commit message 速查

```
feat(act3): 新增 EcosystemBoard 三板块结构
fix(nav): 修复语言切换按钮对齐偏移
refactor(ecosystem): 重构 AgentList 筛选逻辑
docs(airy): 更新 A3.0 任务包分支命名
```

type 可选：`feat` / `fix` / `refactor` / `docs` / `style` / `test` / `chore` / `merge`

## 颜色规范

**禁止硬编码 hex 色值**，所有功能色通过 Tailwind token 引用：

| 用途 | Tailwind 类 |
|------|------------|
| 涨/成功文字 | `text-cw-green` |
| 跌/错误文字 | `text-cw-red` |
| 警告文字 | `text-cw-orange` |
| 信息文字 | `text-cw-blue` |
| 涨浅底 | `bg-cw-green-light` |
| 跌浅底 | `bg-cw-red-light` |
| 警告浅底 | `bg-cw-orange-light` |
| 涨徽章底 | `bg-cw-green-badge` |
| 跌徽章底 | `bg-cw-red-badge` |
| 品牌徽章底 | `bg-cw-brand-badge` |

完整规范见 `docs/DEV-STANDARD.md §4`。

## 注意事项

- 别在 master 上直推半成品
- 不要动 `shell/` 和 `CLAUDE.md`
- 不要新增 npm 依赖（除非任务包明确说可以）
- 颜色必须用 token，不能 hardcode hex

---

## 当前任务

| 任务 | 文件 | 状态 | 分支 |
|------|------|------|------|
| **A3.5 · Arena 子页面实现** | [A3.5-arena-subpage.md](./A3.5-arena-subpage.md) | 🔵 待开始 | `feature/xxcrypto-act3-arena-1` |

**重要变更**：ACT 3 从单页长卷轴改为 Hub + 三子页结构（`/act3` → `/act3/arena` + `/act3/zone` + `/act3/events`）。你的 Arena 设计 scope 收窄到只覆盖 `/act3/arena`。**必须先读 A3.5 任务包再动手。**

## 最近动向

- **ACT 3 架构重构**（2026-04-16）：F 拆分 ACT 3 为 Hub + Arena + AgentZone + Events 四个 board。路由、module 入口、Hub/AgentZone/Events 均由 F 完成。Arena 交给 Airy。
- **Act 1.5 Agent 实时聊天板块**：F 自开发完成，已直推 main。openclaw 走 MiniMax。参考文档 [A1.5-agent-chatroom.md](./A1.5-agent-chatroom.md)。

---

## 已完成（Act 3 v1.5 重构）

| 任务 | 文件 | 状态 | 依赖 |
|------|------|------|------|
| A3.0 · 数据层 + i18n + index 骨架 | [A3.0-act3-foundation.md](./A3.0-act3-foundation.md) | ✅ 已合并 | 无 |
| A3.1 · 板块 A：生态 + 活动 | [A3.1-ecosystem-board.md](./A3.1-ecosystem-board.md) | ✅ 已合并 | A3.0 |
| A3.2 · 板块 B：Skill 进化网络 | [A3.2-evolution-board.md](./A3.2-evolution-board.md) | ✅ 已合并 | A3.0 |
| A3.3 · 板块 C：分润机制 | [A3.3-revenue-board.md](./A3.3-revenue-board.md) | ✅ 已合并 | A3.0 |

**每完成一个任务**：push 分支，告诉 Dan commit hash，等 F 评审 merge。

**设计参考**：`docs/research/act3-v1.5-spec.md` + `docs/research/evomap-analysis.md`
**执行 Spec**：`docs/AIRY-ACT3-V1.5-SPEC.md`

---

**已完成（Act 2）**：

| 文件 | 任务 | 状态 |
|------|------|------|
| [A2.1-skill-discovery.md](./A2.1-skill-discovery.md) | SkillDiscovery 组件 + M1-M18 skills | ✅ 已合并 |
| [A2.2-trade-summary.md](./A2.2-trade-summary.md) | TradeSummary 复盘 dashboard | ✅ 已合并（F 补了 agentName prop） |

> Act 2 已完成全面重构（2026-04-14）。新流程：Landing → Auth → PersonalityWizard → AgentNaming → Chat → TradeSummary。
> SkillDiscovery 组件保留，已搬至 `/skills` 独立路由（待实现）。

**已完成（Act 1）**：

| 文件 | 任务 | 状态 |
|------|------|------|
| [A1.1-capabilities-data.md](./A1.1-capabilities-data.md) | M1-M18 能力数据 | ✅ 已合并 |
| [A1.2-usecases-data.md](./A1.2-usecases-data.md) | UseCaseCards | ✅ 已合并 |
| [A1.3-comingsoon.md](./A1.3-comingsoon.md) | ComingSoon | ✅ 已合并 |
