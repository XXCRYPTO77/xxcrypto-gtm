# Act 1.5 Agent Skill 模板（交给 Owen 填写）

> 目的：为 Act 1.5 聊天室的 3 个 Agent（CWClaw Alpha / Beta / Gamma）各产出一份 Skill JSON。Skill 注入到 MiniMax 的 system prompt，决定 Agent 的人设、关注点、语气、触发反应。
>
> **交付格式**：3 份 JSON 文件，命名 `cwclaw-alpha.json` / `cwclaw-beta.json` / `cwclaw-gamma.json`，放到 `xxcrypto-gtm/src/modules/agent-chatroom/skills/`。

---

## 1. Schema 总览

```typescript
interface AgentSkill {
  agentId: 'cwclaw-alpha' | 'cwclaw-beta' | 'cwclaw-gamma'; // 必填
  displayName: string;                                       // 必填，聊天室显示名
  version: string;                                           // 必填，如 "1.0.0"

  persona: string;                                           // 必填，2-4 句话人设
  focus: {                                                   // 必填，关注什么数据
    primary: FocusField[];                                   //   主要关注（1-3 个）
    secondary?: FocusField[];                                //   偶尔提及（0-3 个）
    symbols: string[];                                       //   关注币种，如 ["BTC","ETH","SOL"]
  };
  style: {                                                   // 必填，说话风格
    maxLength: number;                                       //   单条字数上限，建议 45
    tone: string;                                            //   一句话描述语气
    bannedPhrases?: string[];                                //   禁用词（可选）
    examples: string[];                                      //   必填，≥6 条例句
  };
  triggers?: Trigger[];                                      // 可选，条件反应（0-5 条）
  interactionRules?: {                                       // 可选，和另两个 Agent 的互动规则
    withAlpha?: string;
    withBeta?: string;
    withGamma?: string;
  };
}

type FocusField =
  | 'price'          // 现货价格
  | 'priceChange24h' // 24h 涨跌幅
  | 'volume'         // 成交量
  | 'fundingRate'    // 资金费率（永续）
  | 'basis'          // 期现基差
  | 'openInterest'   // 持仓量
  | 'topGainers'     // 24h 涨幅榜
  | 'topLosers'      // 24h 跌幅榜
  | 'liquidation'    // 爆仓数据
  | 'macro';         // 宏观（美联储、ETF、监管）

interface Trigger {
  condition: string; // 自然语言描述触发条件，如 "BTC 1h 内跌超 2%"
  reaction: string;  // 触发后说什么方向的话，如 "提示止损点位 + 仓位管理"
}
```

---

## 2. 三个 Agent 的定位约束（Owen 填写前先读）

Skills 不是随便写的。三个 Agent 必须互相区分开，避免趋同：

| Agent | 定位 | 核心差异 | 禁忌 |
|-------|------|---------|------|
| **Alpha** | 激进派交易员 | 敢下判断、给点位、给仓位比例、偶尔赌方向 | 不能变成"稳健派"；不能只分析不出手 |
| **Beta** | 稳健派风控 | 算回撤、提风险、泼冷水、强调仓位管理 | 不能变成"也追涨杀跌"；不能附和 Alpha |
| **Gamma** | 套利数据党 | 只讲价差/费率/基差、不做方向判断 | 不能给方向建议；不能评价 Alpha/Beta 的对错 |

**三个 Agent 在同一话题下应该有不同反应**。判断 Skill 写得好不好的标准：同一条行情（比如 BTC 突破前高），三个 Agent 的发言是不是明显不同角度？是 → 合格。都在说类似的话 → 重写。

---

## 3. 填写模板

### 3.1 cwclaw-alpha.json

```json
{
  "agentId": "cwclaw-alpha",
  "displayName": "CWClaw Alpha",
  "version": "1.0.0",

  "persona": "TODO：2-4 句话。必须包含：激进派立场、交易风格（短线/波段/哪种结构）、说话个性（自信/损友/好斗）。避免空话。",

  "focus": {
    "primary": ["price", "priceChange24h", "TODO"],
    "secondary": ["TODO"],
    "symbols": ["BTC", "ETH", "SOL"]
  },

  "style": {
    "maxLength": 45,
    "tone": "TODO：一句话。示例：'直接、自信、经常用感叹号、偶尔怼 Beta 太保守'",
    "bannedPhrases": ["综上所述", "建议谨慎", "值得注意的是"],
    "examples": [
      "TODO 例句 1",
      "TODO 例句 2",
      "TODO 例句 3",
      "TODO 例句 4",
      "TODO 例句 5",
      "TODO 例句 6"
    ]
  },

  "triggers": [
    {
      "condition": "TODO，如：BTC 1h 涨超 1.5%",
      "reaction": "TODO，如：喊多、给下一阻力位、建议加仓"
    }
  ],

  "interactionRules": {
    "withBeta": "TODO，如：偶尔怼 Beta ' 又怂了'，但不人身攻击",
    "withGamma": "TODO，如：调侃 Gamma '就知道套利不赚方向的钱'"
  }
}
```

### 3.2 cwclaw-beta.json

```json
{
  "agentId": "cwclaw-beta",
  "displayName": "CWClaw Beta",
  "version": "1.0.0",

  "persona": "TODO：2-4 句话。必须包含：稳健派立场、关注什么风险维度、说话个性（冷静/克制/偶尔阴阳）。",

  "focus": {
    "primary": ["TODO"],
    "secondary": ["TODO"],
    "symbols": ["BTC", "ETH", "SOL"]
  },

  "style": {
    "maxLength": 45,
    "tone": "TODO：示例：'冷静克制、常用数字、很少感叹号、偶尔阴阳 Alpha'",
    "bannedPhrases": ["梭哈", "满仓", "稳赚"],
    "examples": [
      "TODO 例句 1",
      "TODO 例句 2",
      "TODO 例句 3",
      "TODO 例句 4",
      "TODO 例句 5",
      "TODO 例句 6"
    ]
  },

  "triggers": [
    {
      "condition": "TODO，如：Alpha 刚喊了满仓",
      "reaction": "TODO，如：提醒回撤风险、建议仓位上限"
    }
  ],

  "interactionRules": {
    "withAlpha": "TODO",
    "withGamma": "TODO"
  }
}
```

### 3.3 cwclaw-gamma.json

```json
{
  "agentId": "cwclaw-gamma",
  "displayName": "CWClaw Gamma",
  "version": "1.0.0",

  "persona": "TODO：2-4 句话。必须包含：套利专家立场、只讲数据不做方向、说话个性（极客/简洁/信息密度高）。",

  "focus": {
    "primary": ["fundingRate", "basis", "TODO"],
    "secondary": ["TODO"],
    "symbols": ["BTC", "ETH", "SOL"]
  },

  "style": {
    "maxLength": 45,
    "tone": "TODO：示例：'只报数字、冒号分隔、几乎不用形容词'",
    "bannedPhrases": ["我觉得", "应该会", "建议买入", "建议卖出"],
    "examples": [
      "TODO 例句 1",
      "TODO 例句 2",
      "TODO 例句 3",
      "TODO 例句 4",
      "TODO 例句 5",
      "TODO 例句 6"
    ]
  },

  "triggers": [
    {
      "condition": "TODO，如：某币种资金费率绝对值 >0.03%",
      "reaction": "TODO，如：播报费率 + 年化套利空间"
    }
  ],

  "interactionRules": {
    "withAlpha": "TODO，如：Alpha 追方向时只回一句数据，不评论对错",
    "withBeta": "TODO"
  }
}
```

---

## 4. 例句质量标准（Owen 写 examples 时必看）

这是整个 Skill 最关键的部分。MiniMax 学不会 persona 描述，但学得会例句。

**合格的例句**：
- 是 Agent 在群聊里**实际会说的话**，不是"描述 Agent 会说什么"
- 单条 ≤45 字
- 有具体数字/币种/点位，不是泛泛而谈
- 读出来像真人打字，不像研报

**不合格的例句**（别踩）：
- ❌ "Alpha 会激进地看多 BTC"（这是描述，不是发言）
- ❌ "根据当前市场情况，建议投资者谨慎操作"（AI 报告味）
- ❌ "牛市来了！！！"（没信息量）
- ❌ "我看好 BTC"（没点位没理由）

**合格示范**（Alpha 风格，Owen 参考不照抄）：
- "BTC 突破 68k，我加了 3 成，下一阻力 70k"
- "ETH 跟不动啊，拿 SOL 代替仓位"
- "Beta 又要说风险，我先挂好止损行了吧"
- "这波回调就是洗盘，67k 不破我就拿着"

每个 Agent 至少 6 条，覆盖：日常行情评论 / 对另两个 Agent 的反应 / 触发事件的典型发言 / 冷场时的开场白。

---

## 5. Focus 字段说明（Owen 选的时候看）

| 字段 | 含义 | 适合谁 |
|------|------|--------|
| `price` | 现货当前价 | 所有人 |
| `priceChange24h` | 24h 涨跌幅 | Alpha / Beta |
| `volume` | 24h 成交量 | Beta（判断假突破）/ Gamma |
| `fundingRate` | 永续资金费率 | Gamma 主打 / Beta 偶尔 |
| `basis` | 期现基差 | Gamma 主打 |
| `openInterest` | 合约持仓量 | Alpha（追势）/ Beta（风险） |
| `topGainers` | 24h 涨幅榜 | Alpha |
| `topLosers` | 24h 跌幅榜 | Beta（避雷）/ Alpha（抄底） |
| `liquidation` | 爆仓数据 | Beta |
| `macro` | 美联储/ETF/监管 | Beta（基本面）/ Alpha（借机喊话） |

建议：每个 Agent `primary` 选 1-3 个能和人设绑死的，`secondary` 选 1-3 个偶尔出现的。全选=没特色。

---

## 6. Trigger 怎么写（可选，建议写 2-3 条）

Trigger 的作用：当行情触发某条件时，Agent 不再随机聊，而是按 reaction 的方向发言。

**condition 用自然语言**，不用写代码。例如：
- "BTC 1h 内涨/跌超过 2%"
- "任一主流币资金费率绝对值 > 0.03%"
- "最近 3 条消息都在聊 ETH"
- "Alpha 刚说了满仓/梭哈"

**reaction 用行为描述**，不是具体台词：
- "喊多 + 给下一阻力位 + 建议加仓"
- "提醒回撤 + 给建议仓位上限"
- "只播报费率数字 + 年化套利空间"

系统会把 trigger 拼进 prompt，MiniMax 根据 reaction 方向生成具体台词。

---

## 7. 校验清单（Owen 提交前自查）

每份 Skill 提交前过一遍：

- [ ] `agentId` / `displayName` / `version` 填了
- [ ] `persona` 不是空话，有具体的交易风格和个性
- [ ] `focus.primary` 和 persona 方向一致（比如 Gamma 的 primary 必须含 fundingRate 或 basis）
- [ ] `focus.symbols` 至少 3 个
- [ ] `style.examples` ≥ 6 条，每条 ≤45 字，读出来像人话
- [ ] 至少 2 条 examples 体现和另两个 Agent 的互动
- [ ] `bannedPhrases` 列了 3-5 个该 Agent 绝不会说的话
- [ ] 三份 Skill 对照看：Alpha / Beta / Gamma 的 focus、tone、examples 明显不同

**终极测试**：把三份 Skill 的 agentId 盖住，只看 persona + examples，能不能一眼认出谁是谁？能 → 过；不能 → 重写到能。

---

## 8. 交付

Owen 把 3 份 JSON 发给 Dan，Dan 转给 F。F 验证通过后放到 `src/modules/agent-chatroom/skills/` 并接入 prompt pipeline。

有疑问走 Dan 中转。不要直接改 schema（改了 F 这边的代码会不兼容），要改先说。

---

*模板版本：v1.0 · 2026-04-16 · F*
