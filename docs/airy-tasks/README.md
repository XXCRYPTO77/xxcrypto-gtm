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

## 当前任务（Act 1）

三个并行，从任意一个开始：

| 文件 | 任务 | 预估工时 | 状态 |
|------|------|----------|------|
| [A1.1-capabilities-data.md](./A1.1-capabilities-data.md) | M1-M18 能力数据文件 | 2h | 待做 |
| [A1.2-usecases-data.md](./A1.2-usecases-data.md) | 4 张场景卡 + UseCaseCards | 1h | 待做 |
| [A1.3-comingsoon.md](./A1.3-comingsoon.md) | P1-P9 Coming Soon 标签墙 | 1h | 待做 |

**注意**：A1.1 + A1.2 + A1.3 都会写 `src/modules/landing/data/types.ts`。
先做 A1.1 的那个人建这个文件，后做的人追加 interface，不要覆盖整个文件。
如果并行做（推荐），各自在自己的任务包里建完整的 types.ts，merge 时 F 会合并。
