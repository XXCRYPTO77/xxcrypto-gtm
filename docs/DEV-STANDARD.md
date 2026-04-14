# xxcrypto-gtm 开发规范

> 基于 CoinW Web端开发规范 v1.0（2026-04-14 同步），针对本项目 **Next.js 15 + React 19 + TypeScript 5 + Tailwind v4** 技术栈适配。
>
> Vue 相关条款（eslint-plugin-vue、`<script setup>`、Element Plus 变量等）在本项目不适用，已略去或标注替代方案。

---

## 1. 命名规范

### 文件与目录

| 类型 | 规范 | 示例 |
|------|------|------|
| 目录 | 小写 + 连字符（kebab-case） | `user-center/`、`order-list/` |
| 组件文件 | 大驼峰（PascalCase）+ `.tsx` | `UserCard.tsx`、`OrderTable.tsx` |
| 工具/Hook 文件 | 小驼峰（camelCase）+ `.ts` | `useRequest.ts`、`formatDate.ts` |
| 样式文件 | 小写 + 连字符 | `reset.css`、`main-layout.css` |
| 常量/配置文件 | 小写 + 连字符 | `api-config.ts`、`route-config.ts` |
| 数据文件 | 小写 + 连字符 | `agents.ts`、`strategy-data.ts` |
| 测试文件 | 与被测文件同名 + `.spec.ts` / `.test.ts` | `UserCard.spec.ts` |

### 变量 / 函数

| 类型 | 规范 | 示例 |
|------|------|------|
| 变量 | 小驼峰 | `const userInfo = {}` |
| 常量 | 全大写下划线 | `const MAX_PAGE_SIZE = 100` |
| 函数 | 小驼峰，动词开头 | `function getUserList() {}` |
| 类 | 大驼峰 | `class UserService {}` |
| TS 接口 | 大驼峰 + `I` 前缀（可选） | `interface IUserInfo {}` |
| TS 类型 | 大驼峰 | `type UserStatus = 'active' \| 'inactive'` |
| 枚举 | 大驼峰 | `enum OrderStatus { Pending, Paid }` |
| 组件 | 大驼峰 | `const UserProfile = () => {}` |
| 事件处理 | `handle` 前缀 | `const handleSubmit = () => {}` |
| 布尔变量 | `is` / `has` / `can` 前缀 | `const isLoading = false` |

---

## 2. 代码风格

| 规则 | 值 |
|------|-----|
| 缩进 | 2 个空格（禁止 Tab） |
| 语句结尾 | 始终加分号 |
| 引号 | JS/TS 单引号，JSX 属性双引号 |
| 行宽 | 单行不超过 120 字符 |
| 换行 | Unix 风格（LF） |
| 尾部逗号 | 多行结构末尾保留（ES5 trailing comma） |
| 空行 | 文件末尾保留一个空行 |

工具链：ESLint（`@typescript-eslint` + `eslint-plugin-react`）+ Prettier + Husky + lint-staged。

---

## 3. React 组件文件结构

Vue 的 `<template>/<script setup>/<style scoped>` 三段式，对应本项目：

```tsx
// 1. 导入
import { useState } from 'react';
import { useT } from '@/i18n/LocaleContext';

// 2. 类型定义（Props / 枚举 / 接口）
interface Props {
  /** 用户信息（必填） */
  userInfo: IUser;
  /** 是否显示头像，默认 true */
  showAvatar?: boolean;
}

// 3. 响应式状态（useState / useReducer）
// 4. 派生值（useMemo / useCallback）
// 5. 副作用（useEffect）
// 6. 事件处理函数（handle* 前缀）
// 7. return JSX
```

**硬约束**：
- Props 必须声明 TS 类型，必要字段设校验
- 禁止在组件内直接修改 Props（单向数据流）
- 组件超过 300 行考虑拆分
- 接口调用封装到 `api/` 目录，禁止在组件里直接写 `fetch`

---

## 4. 颜色使用规范

### 颜色来源

本项目颜色分三层，按优先级排序：

1. **CoinW 设计系统 token**（`src/styles/tokens.css`，前缀 `--cw-*`）
   - 功能色：`--cw-green` / `--cw-red` / `--cw-orange` / `--cw-blue`
   - 每色有 `-mid` / `-light` / `-badge` 变体
   - **优先用于交易相关 UI**：涨跌色、状态徽章、功能按钮

2. **品牌 token**（同文件，前缀 `--coinw-*` + 语义别名 `--color-brand*`）
   - 品牌紫：`--coinw-purple: #5227FF`
   - Tailwind 别名：`brand` / `brand-med` / `brand-light` / `brand-soft`

3. **Tailwind 内置工具色**
   - 尽量避免直接用 `green-600`、`red-500` 等 Tailwind 内置色替代功能色
   - 合法用途：灰度（`gray-*`）、通用背景（`bg-white`）、通用文字

### 颜色 Tailwind 类对照

| 用途 | Tailwind 类 | 实际值 |
|------|------------|--------|
| 涨/成功 文字 | `text-cw-green` | `#14A739` |
| 跌/错误 文字 | `text-cw-red` | `#E95032` |
| 警告 文字 | `text-cw-orange` | `#FE6F00` |
| 信息/链接 文字 | `text-cw-blue` | `#2D89CC` |
| 涨 浅底 | `bg-cw-green-light` | `#DEF2E0` |
| 跌 浅底 | `bg-cw-red-light` | `#FFF5F0` |
| 警告 浅底 | `bg-cw-orange-light` | `#FEF2EA` |
| 涨 徽章底 | `bg-cw-green-badge` | `rgba(20,167,57,0.1)` |
| 跌 徽章底 | `bg-cw-red-badge` | `rgba(233,80,50,0.1)` |
| 品牌 徽章底 | `bg-cw-brand-badge` | `rgba(82,39,255,0.1)` |

**禁止硬编码色值**。所有颜色必须通过 CSS 变量或 Tailwind token 引用。

---

## 5. CSS / SCSS 规范

### 属性声明顺序（Tailwind utility 不受此约束，仅限 `globals.css` / CSS Modules）

```
1. 定位：position / top / right / bottom / left / z-index
2. 盒模型：display / flex / grid / float / width / height / margin / padding / border
3. 视觉：background / color / font / text / opacity / visibility
4. 动画：transition / animation / transform
5. 其他：cursor / pointer-events / user-select
```

### 选择器

```scss
/* ✅ BEM 命名 + 低特异性 */
.user-card { }
.user-card__title { }
.user-card__title--highlighted { }

/* ❌ 禁止：id 选择器、!important（紧急修复除外）、超过 3 层嵌套 */
```

---

## 6. Git 版本管理规范

### 分支命名（无 Jira 版，格式对齐公司规范）

| 分支类型 | 命名格式 | 示例 |
|---------|---------|------|
| 主干 | `master` | — |
| 测试 | `test-v{d}` | `test-v1` |
| 功能/开发 | `feature/xxcrypto-<task>-<n>` | `feature/xxcrypto-act3-board-a-1` |
| 修复 | `fix/xxcrypto-<task>-<n>` | `fix/xxcrypto-nav-lang-1` |
| 热修复 | `hotfix/xxcrypto-<task>-<n>` | `hotfix/xxcrypto-deploy-1` |

### Commit Message（Angular 规范，去 Jira ID）

```
<type>(<scope>): <message>

类型：
  feat      新功能
  fix       修复 bug
  refactor  代码重构（非功能）
  docs      文档相关
  style     代码格式（不影响逻辑）
  test      测试代码
  chore     构建工具、依赖等
  ci        CI/CD 配置
  merge     分支合并

示例：
feat(act3): 新增 EcosystemBoard 三板块结构
fix(nav): 修复语言切换按钮对齐偏移
chore: 升级 html2canvas 到 1.4.1
docs(airy): 更新 A3.0 任务包分支命名
```

### 提交纪律

- 每次提交只包含一个逻辑变更
- 提交前通过 ESLint / Prettier / TypeScript 检查
- 禁止提交调试代码（`console.log`、注释掉的代码块）
- 禁止 `git push -f` 到 `master`

---

## 7. 接口调用规范

```typescript
// api/user.ts
import { request } from '@/utils/request';

export const getUserList = (params: IUserListParams): Promise<IPageResult<IUser>> => {
  return request.get('/api/user/list', { params });
};
```

- 所有接口调用封装到 `api/` 目录
- 统一封装请求/响应拦截器（Token 携带 + 错误处理）
- 接口返回数据必须定义 TS 类型
- 接口请求中展示 Loading 状态
- 错误必须给用户可读提示，不能只 `console.error`

---

## 8. 性能规范

- 路由懒加载：页面级组件使用 `dynamic import()`（Next.js `next/dynamic`）
- 图片：使用 `next/image`，配置 `loading="lazy"`，大图走 CDN
- 第三方库按需引入，避免全量导入
- 长列表使用虚拟滚动
- `scroll` / `resize` / `input` 事件必须加 `debounce` 或 `throttle`
- 避免在 render 函数内做复杂计算，用 `useMemo` 缓存

---

## 9. 安全规范

- 禁止使用 `dangerouslySetInnerHTML`，必须使用时对内容严格过滤
- 禁止在前端代码、URL、localStorage 中存储明文密码/密钥
- 生产环境接口必须使用 HTTPS
- 定期执行 `npm audit` 检查依赖漏洞

---

## 10. 无障碍规范

- 图片必须设置有意义的 `alt`，装饰性图片设 `alt=""`
- 交互元素（按钮、链接、表单）必须可键盘操作（Tab 可聚焦，Enter/Space 可触发）
- 颜色对比度符合 WCAG 2.1 AA（正文 ≥ 4.5:1）
- 自定义组件使用 ARIA 属性（`role`、`aria-label`、`aria-expanded` 等）

---

## 11. 注释规范

```typescript
/**
 * 格式化金额（分→元）
 * @param amount - 金额（分）
 * @param currency - 货币类型，默认 CNY
 * @returns 格式化后的货币字符串
 * @example formatCurrency(10000) // '¥100.00'
 */
function formatCurrency(amount: number, currency = 'CNY'): string {}

// 因为后端返回金额单位为分，需要除以 100 转换为元（注释说"为什么"，不说"是什么"）
const displayAmount = rawAmount / 100;
```

- 公共工具函数、Hooks、Props 必须写 JSDoc
- 复杂算法/特殊业务逻辑必须注释背景和意图
- 禁止无意义注释（`// 循环`、`// 判断`）
- 废弃代码及时删除，不允许大段注释代码长期保留

---

*版本：v1.0 | 基准：CoinW Web端开发规范 v1.0 | 适配日期：2026-04-14*
*技术栈：Next.js 15 + React 19 + TypeScript 5 + Tailwind v4*
