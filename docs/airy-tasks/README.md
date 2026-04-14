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

1. 从 master 拉分支：`git checkout -b feat/airy-[任务名]`
2. 做完 commit + push
3. 告诉 Dan commit hash，Dan 转给 F
4. F 评审 + 告诉 Dan merge，Dan 在本机 merge 到 master + push

**F 不能自己 push**（Cowork 沙箱权限限制）。Dan 在中间做搬运。你自己 push 没问题。

## 注意事项

- 别在 master 上直推半成品
- 不要动 `shell/` 和 `CLAUDE.md`
- 不要新增 npm 依赖（除非任务包明确说可以）

---

## 当前任务（Act 3 v1.5 重构）

**执行顺序**：A3.0 必须最先完成，A3.1 完成后 A3.2 和 A3.3 可以并行。

| 任务 | 文件 | 状态 | 依赖 |
|------|------|------|------|
| A3.0 · 数据层 + i18n + index 骨架 | [A3.0-act3-foundation.md](./A3.0-act3-foundation.md) | 🔜 待处理 | 无 |
| A3.1 · 板块 A：生态 + 活动 | [A3.1-ecosystem-board.md](./A3.1-ecosystem-board.md) | ⏳ 等 A3.0 | A3.0 |
| A3.2 · 板块 B：Skill 进化网络 | [A3.2-evolution-board.md](./A3.2-evolution-board.md) | ⏳ 等 A3.0 | A3.0 |
| A3.3 · 板块 C：分润机制 | [A3.3-revenue-board.md](./A3.3-revenue-board.md) | ⏳ 等 A3.0 | A3.0 |

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
