/**
 * Skills registry for Act 2 chat demo.
 * Subset of M1-M18 from landing module, chosen to cover the 3 dialog paths.
 */

export interface SkillRef {
  code: string; // M1..M18
  name: string;
  nameEn: string;
  group: 'info' | 'trade' | 'auth' | 'platform';
}

export const CHAT_SKILLS: SkillRef[] = [
  // Info
  { code: 'M1', name: '实时行情查询', nameEn: 'Realtime Quotes', group: 'info' },
  { code: 'M2', name: '涨跌排行', nameEn: 'Gainers & Losers', group: 'info' },
  { code: 'M3', name: '交易所公告', nameEn: 'Exchange Announcements', group: 'info' },
  { code: 'M4', name: '市场概览', nameEn: 'Market Overview', group: 'info' },
  // Trade
  { code: 'M5', name: '现货/合约下单', nameEn: 'Spot/Futures Order', group: 'trade' },
  { code: 'M6', name: '订单查询', nameEn: 'Order Query', group: 'trade' },
  { code: 'M7', name: '余额查询', nameEn: 'Balance Query', group: 'trade' },
  { code: 'M8', name: '持仓总览', nameEn: 'Position Overview', group: 'trade' },
  // Auth
  { code: 'M11', name: 'API Key 认证', nameEn: 'API Key Auth', group: 'auth' },
  { code: 'M12', name: '风控拦截', nameEn: 'Risk Gate', group: 'auth' },
  // Platform
  { code: 'M13', name: 'MCP 协议服务', nameEn: 'MCP Protocol', group: 'platform' },
  { code: 'M14', name: 'Skills 可发现性', nameEn: 'Skill Discovery', group: 'platform' },
];

export function getSkill(code: string): SkillRef | undefined {
  return CHAT_SKILLS.find((s) => s.code === code);
}
