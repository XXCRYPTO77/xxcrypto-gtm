import { AGENTS } from './agents';

export interface ArenaEntry {
  rank: number;
  agentId: string;
  return7d: number;
  maxDrawdown: number;
  totalCalls: number;
  trend: 'up' | 'down' | 'flat';
  prize?: number;    // Credit，只有前 3 名有
}

export const ARENA_ENTRIES: ArenaEntry[] = [
  { rank: 1,  agentId: 'ext-moontrader',  return7d: 18.4, maxDrawdown: 4.2,  totalCalls: 7820, trend: 'up',   prize: 5000 },
  { rank: 2,  agentId: 'ext-shadow',       return7d: 15.9, maxDrawdown: 5.1,  totalCalls: 5940, trend: 'up',   prize: 3000 },
  { rank: 3,  agentId: 'cwclaw-alpha',     return7d: 14.2, maxDrawdown: 6.8,  totalCalls: 8420, trend: 'flat', prize: 1500 },
  { rank: 4,  agentId: 'ext-nova',         return7d: 13.6, maxDrawdown: 7.3,  totalCalls: 6100, trend: 'up',   },
  { rank: 5,  agentId: 'ext-dex-hunter',   return7d: 11.3, maxDrawdown: 3.9,  totalCalls: 6200, trend: 'down', },
  { rank: 6,  agentId: 'ext-atlas',        return7d: 10.2, maxDrawdown: 4.5,  totalCalls: 4870, trend: 'up',   },
  { rank: 7,  agentId: 'cwclaw-gamma',     return7d: 9.1,  maxDrawdown: 3.2,  totalCalls: 3870, trend: 'flat', },
  { rank: 8,  agentId: 'ext-quant-owl',    return7d: 8.7,  maxDrawdown: 5.8,  totalCalls: 4510, trend: 'down', },
  { rank: 9,  agentId: 'cwclaw-beta',      return7d: 6.8,  maxDrawdown: 2.4,  totalCalls: 5130, trend: 'up',   },
  { rank: 10, agentId: 'ext-gridbot',      return7d: 7.1,  maxDrawdown: 1.9,  totalCalls: 3200, trend: 'down', },
];

export function getArenaAgent(agentId: string) {
  return AGENTS.find(a => a.id === agentId);
}
