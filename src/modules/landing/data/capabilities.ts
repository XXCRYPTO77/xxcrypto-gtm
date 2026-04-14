import type { Capability } from './types';

export const CAPABILITIES: Capability[] = [
  { code: 'M1', group: 'info', name: '实时行情', desc: '帮你随时查 BTC 价格、K 线和成交量' },
  { code: 'M2', group: 'info', name: '涨跌排行', desc: '帮你快速看哪些币在涨、哪些在跌' },
  { code: 'M3', group: 'info', name: '交易所公告', desc: '帮你第一时间知道上币、维护、规则变更' },
  { code: 'M4', group: 'info', name: '多语言支持', desc: '帮你用母语看行情和分析结果' },
  { code: 'M5', group: 'trade', name: '一键下单', desc: '帮你限价、市价下单和撤单，说句话就搞定' },
  { code: 'M6', group: 'trade', name: '订单查询', desc: '帮你查看当前挂单和历史成交记录' },
  { code: 'M7', group: 'trade', name: '余额查询', desc: '帮你看可用和冻结余额，下单前心里有数' },
  { code: 'M8', group: 'trade', name: '持仓总览', desc: '帮你一眼看清所有仓位和盈亏情况' },
  { code: 'M9', group: 'trade', name: '资金划转', desc: '帮你在各个钱包之间转钱，确保下单有余额' },
  { code: 'M10', group: 'trade', name: '禁止提现', desc: '帮你锁住提现权限，Agent 只能交易不能转走钱' },
  { code: 'M11', group: 'auth', name: 'API Key 认证', desc: '帮你安全连接交易所，真金白银有保障' },
  { code: 'M12', group: 'auth', name: '权限分级', desc: '帮你精细控制只读、现货、合约不同权限' },
  { code: 'M13', group: 'auth', name: '频率限制', desc: '帮你防止接口被滥用，系统稳定运行' },
  { code: 'M14', group: 'auth', name: '额度上限', desc: '帮你设置单笔和每日交易上限，控制风险' },
  { code: 'M15', group: 'platform', name: 'MCP 协议', desc: '帮你的 Agent 通过标准协议接入所有 Skill' },
  { code: 'M16', group: 'platform', name: 'Skill 发现', desc: '帮你的 Agent 自动找到可用的交易能力' },
  { code: 'M17', group: 'platform', name: '落地页入口', desc: '帮你一站式查看、接入和生成 API Key' },
  { code: 'M18', group: 'platform', name: '调用统计', desc: '帮你追踪每个 Skill 的使用效果和频次' },
];

export const CAPABILITY_GROUPS = [
  { id: 'info' as const, label: '行情信息' },
  { id: 'trade' as const, label: '交易操作' },
  { id: 'auth' as const, label: '安全认证' },
  { id: 'platform' as const, label: '平台接入' },
];
