/**
 * Skills registry for Act 2 chat demo.
 * Complete M1-M18 covering all 4 groups.
 */

export interface SkillRef {
  code: string; // M1..M18
  name: string;
  nameEn: string;
  group: 'info' | 'trade' | 'auth' | 'platform';
}

export const CHAT_SKILLS: SkillRef[] = [
  // Info (4)
  { code: 'M1', name: '实时行情查询', nameEn: 'Realtime Quotes', group: 'info' },
  { code: 'M2', name: '涨跌排行', nameEn: 'Gainers & Losers', group: 'info' },
  { code: 'M3', name: '交易所公告', nameEn: 'Exchange Announcements', group: 'info' },
  { code: 'M4', name: '市场概览', nameEn: 'Market Overview', group: 'info' },
  // Trade (6)
  { code: 'M5', name: '现货/合约下单', nameEn: 'Spot/Futures Order', group: 'trade' },
  { code: 'M6', name: '订单查询', nameEn: 'Order Query', group: 'trade' },
  { code: 'M7', name: '余额查询', nameEn: 'Balance Query', group: 'trade' },
  { code: 'M8', name: '持仓总览', nameEn: 'Position Overview', group: 'trade' },
  { code: 'M9', name: '资金划转', nameEn: 'Fund Transfer', group: 'trade' },
  { code: 'M10', name: '禁止提现', nameEn: 'Withdrawal Lock', group: 'trade' },
  // Auth (4)
  { code: 'M11', name: 'API Key 认证', nameEn: 'API Key Auth', group: 'auth' },
  { code: 'M12', name: '权限分级', nameEn: 'Permission Tiers', group: 'auth' },
  { code: 'M13', name: '频率限制', nameEn: 'Rate Limiting', group: 'auth' },
  { code: 'M14', name: '额度上限', nameEn: 'Amount Caps', group: 'auth' },
  // Platform (4)
  { code: 'M15', name: 'MCP 协议服务', nameEn: 'MCP Protocol', group: 'platform' },
  { code: 'M16', name: 'Skills 可发现性', nameEn: 'Skill Discovery', group: 'platform' },
  { code: 'M17', name: '落地页入口', nameEn: 'Landing Portal', group: 'platform' },
  { code: 'M18', name: '调用统计', nameEn: 'Usage Analytics', group: 'platform' },
];

export function getSkill(code: string): SkillRef | undefined {
  return CHAT_SKILLS.find((s) => s.code === code);
}
