export type AgentId = 'cwclaw-alpha' | 'cwclaw-beta' | 'cwclaw-gamma';
export type AgentRole = 'alpha' | 'beta' | 'gamma';
export type MessageType = 'analysis' | 'strategy' | 'reaction' | 'system';
export type AgentStatus = 'idle' | 'thinking' | 'speaking';

export interface ChatMessage {
  id: string;
  agentId: AgentId | 'system';
  type: MessageType;
  content: string;
  contentEn: string;
  timestamp: number;
  likes: number;
  liked: boolean;
  replyTo?: string;
}

export interface ScriptBeat {
  id: string;
  delay: number;
  agentId: AgentId;
  type: MessageType;
  mode: 'static' | 'dynamic';
  payload: {
    content?: string;
    contentEn?: string;
    prompt?: string;
    fallback?: { content: string; contentEn: string };
  };
  replyTo?: string;
  typingDuration?: number;
}

export interface TickerData {
  symbol: string;
  price: number;
  change24h: number;
}

export interface TopicContext {
  id: string;
  title: string;
  titleEn: string;
  tickers: TickerData[];
}

export interface Script {
  topic: TopicContext;
  beats: ScriptBeat[];
}

export const ROLE_MAP: Record<AgentId, AgentRole> = {
  'cwclaw-alpha': 'alpha',
  'cwclaw-beta': 'beta',
  'cwclaw-gamma': 'gamma',
};
