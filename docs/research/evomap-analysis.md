# evomap.ai 调研笔记

**调研日期**：2026-04-14
**参考用途**：不限于 Act 3 demo，更重要的是 CoinW Agent 板块产品本身的"Skill 进化 / Agent 互动"能力设计储备
**原站**：https://evomap.ai

---

## 1. 产品性质（一句话）

**Agent 之间的知识进化协议基础设施**。一个 Agent 学会的解决方案，其他 Agent 可以直接继承——相当于 MCP 的升级版：MCP 解决"工具发现"，evomap 在这之上加了"为什么这个工具有效"（审计链 + 评分）+ 自然选择机制。

**定位区别**：
- MCP = 工具目录（静态）
- evomap = 工具进化网络（动态，有生存/淘汰）

---

## 2. 核心概念体系（对我们最有借鉴价值的部分）

evomap 把整个产品用生物学隐喻重新命名了，这是它最独特的设计选择：

| evomap 概念 | 字面含义 | 对应我们熟悉的东西 |
|------------|---------|-------------------|
| **Gene**（基因） | Skill 模板 | Skill 的定义 |
| **Capsule**（胶囊） | 一次成功执行的验证记录 | Skill 的一次运行 + 结果 |
| **GEP**（Genome Evolution Protocol） | 发布/继承协议 | MCP 的增强版 |
| **GDI** | Gene Dominance Index，基因优势指数 | Skill 评分 / 有效性打分 |
| **Inherit**（继承） | 其他 Agent 直接复用 | 安装/订阅 |
| **自然选择** | 低 GDI 的 Gene 被淘汰 | 下架机制 |

**Slogan**："One agent learns. A million inherit."（一个 Agent 学会，一百万继承）

**为什么这套命名值得认真抄**：
- 它不是 rebranding 游戏，而是给"Skill 能进化"这件事提供了一套自洽的描述工具。
- 用生物学词汇后，"Skill 为什么会被淘汰"不需要额外解释——进化论自带"弱者淘汰"的常识。
- 我们现在的 Skill 描述是"静态能力清单"（18 项功能），没有"Skill 会变好/变差"的语言装备。

---

## 3. 网站叙事结构（五幕）

| 幕 | Section | 主题 | 视觉核心 |
|----|---------|------|---------|
| 一 | Hero | "One agent learns. A million inherit." | Typewriter 动画、深底渐变、双螺旋隐喻 |
| 二 | Agent Onboarding | 3 步接入（curl + hello + publish） | 可复制代码框 + 步骤编号 |
| 三 | Cross-Ecosystem | "Any Agent, One Protocol" | 5 个 Agent 生态图标阵列（OpenClaw / Manus / Others） |
| 四 | Philosophy | 三大支柱：Life=Information / Evolution=Cooperation / Symbiosis=Future | 纯文本 + 大留白，无视觉装饰 |
| 五 | Capsule Hot List | 热门解决方案展示 | 卡片列表（标题 + 描述 + 元数据） |

**关键观察**：
- **首页故意不展示所有子系统**。Marketplace、Arena、Sandbox、Bounties 全部放到二级路由（/market、/arena、/sandbox）。首页只干五件事，每件事一屏。
- **Philosophy 幕特别反常**：一个技术基础设施的首页里插了一段纯哲学文案（Life = Information / Evolution = Cooperation / Symbiosis = Future），没有功能说明。这一段看似"多余"，但实际给产品增加了厚度——它不是一个工具，是一种世界观。

---

## 4. 视觉与交互特征

**"看起来高级"的来源**（按重要性排序）：

1. **叙事密度 > 视觉密度**
   - 全站没有 Three.js、没有粒子、没有 WebGL
   - 只有基础 Typewriter + Fade/Scale 过渡 + SVG 图标 + Gradient
   - "高级感"完全来自概念层的密度

2. **克制的视觉语言**
   - 深色背景（暗蓝/黑）、高对比文本（白/绿）
   - 字体组合：Rajdhani（基础）+ Orbitron（品牌）+ Cinzel（强调）
   - Section 间大留白，不拥挤

3. **关键词频度**
   - agent (140) > evolution (109) > gene (60) > skill (55) > capsule (40) > network (33) > marketplace (25)
   - evolution 频度接近 agent，说明"进化"是它的第一产品语言，不是 feature

---

## 5. Agent 互动 / Skill 进化的产品机制（最值得对标的部分）

evomap 呈现的 Agent 互动模型：

**发布侧**：
- Agent 解决了一个问题 → 把解决方案封装成 Capsule → 通过 GEP 协议发布到网络
- 每次发布自带审计链（证据、参数、输入输出）

**继承侧**：
- 其他 Agent 遇到类似问题 → 查询网络 → 找到 GDI 最高的 Capsule → 直接继承使用
- 继承后也可以再验证、再改进、再发布（形成代际演化）

**生态跨越**：
- 不绑定某一个 Agent 生态（OpenClaw / Manus / 其他任意 Agent 都能接入）
- 首页专门有一幕讲这个（"Any Agent, One Protocol"）

**自然选择**：
- GDI 低的 Gene 会被降权 → 最终淘汰
- 机制层面保证网络里留下的都是"经过市场验证"的 Skill

**对我们的启示**（CoinW Agent 板块产品层）：
- 我们现在 Skill 是静态清单（18 项），没有"这个 Skill 被用了多少次 / 成功率多少 / 谁在用"的维度。
- 可以考虑把 CWClaw 的 Skill 网络做成"有反馈回路"——每次调用都留痕，高频高成功率的 Skill 自动置顶，低分的下沉。
- 这本身就是一个 GTM 故事：不是"我们发布了 18 个 Skill"，而是"我们的 Skill 网络会自己进化"。

**但也要注意边界**：
- evomap 是跨 Agent 的开放网络，我们是交易所原生 MCP 服务。
- Skill 作者激励层面可以借鉴（分润），但跨 Agent 继承这一块对交易所是把双刃剑——真的要让外部 Agent 继承我们的 Skill？还是只在自己生态里进化？
- 这是产品决策，不是技术问题。

---

## 6. 可以抄的三个具体点（for Act 3 重设计）

### 抄点 A：生物学/进化隐喻作为叙事骨架

- 现状：Act 3 的 6 个子模块各自讲各自的，没有统一叙事
- 改造：用 "Skill 会进化、Agent 会繁衍、生态会自选择" 作为三条叙事主线，把 6 个模块挂上去
- 具体措辞要决策：用生物学词汇（基因/胶囊）还是交易行业词汇（种子/复利）？

### 抄点 B：哲学三原则作为 Act 3 开篇

- evomap 的 Life/Evolution/Symbiosis 三句话是它最关键的"压舱物"
- 我们可以在 Act 3 开篇加一组三原则（内容待定，候选方向：
  - Autonomy / Collaboration / Value
  - 独立 / 协作 / 回报
  - Skill 自证 / Agent 互证 / 生态共证
  ）
- 这一段不解释功能，只立理念

### 抄点 C：首屏不堆砌，子模块下沉

- 现状：Act 3 首屏把 6 个模块都摊开 → 每个都被压扁
- 改造：首屏只留一个最吸睛的（AgentZoneMap 动态节点图），其他 5 个进 Tab 或二级路由
- 这是 evomap 最反直觉也最有效的选择——少即高级

---

## 7. 未验证的问题（留给后续讨论）

- [ ] evomap 的 /market、/arena、/sandbox 具体长什么样？（本次只爬了首页）
- [ ] evomap 有没有真实在用的 Agent？还是也是 demo/白皮书阶段？
- [ ] GDI 评分的具体算法是否公开？我们要不要设计一套自己的？
- [ ] "跨 Agent 继承" 对交易所产品是机会还是风险？需要产品决策

---

## 8. 对 CoinW Agent 板块（非 Demo，真实产品）的产品储备意义

本次调研的核心价值不在 Act 3 的视觉抄袭，而在：

1. **Skill 进化的语言装备**——我们缺一套描述"Skill 会变好/变差"的词汇体系，evomap 给了参考样本
2. **Agent 互动的产品机制**——Capsule/GDI/继承这一套反馈回路，是 CWClaw 未来可以借鉴的产品层设计
3. **叙事 > UI 的产品哲学**——evomap 证明了一个 AI 基础设施产品可以用叙事而非动画承载复杂度，这对 CoinW Agent 板块的对外传播极有启发

这些都不是 Demo 层面的事，是真实产品设计方向的储备。

---

*调研人：Session F*
*下一步：等 Dan 决策 Act 3 重设计方向，同步评估 Skill 进化机制是否纳入 CWClaw 产品 roadmap*
