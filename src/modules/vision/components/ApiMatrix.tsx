'use client';

import { useT } from '@/i18n/LocaleContext';

type Status = 'done' | 'v11' | 'v12' | 'v15' | 'v16';

interface Capability {
  code: string;
  name_zh: string;
  name_en: string;
  endpoint: string;
  auth: string;
  rateLimit: string;
  status: Status;
}

const CAPABILITIES: Capability[] = [
  // Info
  { code: 'M1', name_zh: '实时行情查询', name_en: 'Live market data', endpoint: 'GET /v1/market/ticker', auth: 'Public', rateLimit: '100/min', status: 'done' },
  { code: 'M2', name_zh: '涨跌排行', name_en: 'Gainers & losers', endpoint: 'GET /v1/market/ranking', auth: 'Public', rateLimit: '30/min', status: 'done' },
  { code: 'M3', name_zh: '交易所公告', name_en: 'Exchange announcements', endpoint: 'GET /v1/platform/notices', auth: 'Public', rateLimit: '10/min', status: 'done' },
  { code: 'M4', name_zh: '多语言返回', name_en: 'Multi-language output', endpoint: 'Header: Accept-Language', auth: 'Public', rateLimit: 'N/A', status: 'done' },
  // Trade
  { code: 'M5', name_zh: '现货合约下单撤单', name_en: 'Spot & futures order/cancel', endpoint: 'POST /v1/order/place · DELETE /v1/order/{id}', auth: 'Spot / Futures', rateLimit: '20/min', status: 'done' },
  { code: 'M6', name_zh: '订单查询', name_en: 'Order query', endpoint: 'GET /v1/order/list', auth: 'Read', rateLimit: '60/min', status: 'done' },
  { code: 'M7', name_zh: '余额查询', name_en: 'Balance query', endpoint: 'GET /v1/account/balance', auth: 'Read', rateLimit: '30/min', status: 'done' },
  { code: 'M8', name_zh: '持仓总览', name_en: 'Position overview', endpoint: 'GET /v1/account/positions', auth: 'Read', rateLimit: '30/min', status: 'done' },
  { code: 'M9', name_zh: '划转', name_en: 'Internal transfer', endpoint: 'POST /v1/account/transfer', auth: 'Full', rateLimit: '10/min', status: 'done' },
  { code: 'M10', name_zh: '禁止提现', name_en: 'Withdrawal lockdown', endpoint: 'API Key scope flag', auth: 'System', rateLimit: 'N/A', status: 'done' },
  // Auth
  { code: 'M11', name_zh: 'API Key 认证', name_en: 'API key auth', endpoint: 'Header: X-API-Key + X-Signature', auth: 'HMAC-SHA256', rateLimit: 'N/A', status: 'done' },
  { code: 'M12', name_zh: '权限分级', name_en: 'Permission tiers', endpoint: 'API Key scope: read|spot|futures|full', auth: 'System', rateLimit: 'N/A', status: 'done' },
  { code: 'M13', name_zh: '频率限制', name_en: 'Rate limiting', endpoint: 'Header: X-RateLimit-*', auth: 'System', rateLimit: 'Per tier', status: 'done' },
  { code: 'M14', name_zh: '额度上限', name_en: 'Amount caps', endpoint: 'Config: max_single_trade / max_daily', auth: 'User config', rateLimit: 'N/A', status: 'done' },
  // Platform
  { code: 'M15', name_zh: 'MCP 协议服务', name_en: 'MCP protocol server', endpoint: 'mcp://coinw.com/skills (planned)', auth: 'API Key', rateLimit: 'Inherited', status: 'v15' },
  { code: 'M16', name_zh: 'Skills 可发现性', name_en: 'Skill discoverability', endpoint: 'GET /v1/skills/catalog', auth: 'Public', rateLimit: '20/min', status: 'done' },
  { code: 'M17', name_zh: '站内落地页', name_en: 'In-exchange landing page', endpoint: 'app.coinw.com/agent-skills', auth: 'N/A', rateLimit: 'N/A', status: 'done' },
  { code: 'M18', name_zh: '基础调用统计', name_en: 'Call metrics', endpoint: 'GET /v1/analytics/usage', auth: 'Read', rateLimit: '10/min', status: 'done' },
];

const STATUS_LABEL: Record<Status, { zh: string; en: string; style: string }> = {
  done:  { zh: 'v1.0 ✓', en: 'v1.0 ✓', style: 'bg-green-100 text-green-700' },
  v11:   { zh: 'v1.1',    en: 'v1.1',    style: 'bg-blue-50 text-blue-600' },
  v12:   { zh: 'v1.2',    en: 'v1.2',    style: 'bg-blue-50 text-blue-600' },
  v15:   { zh: 'v1.5',    en: 'v1.5',    style: 'bg-purple-50 text-purple-600' },
  v16:   { zh: 'v1.6+',   en: 'v1.6+',   style: 'bg-gray-100 text-gray-500' },
};

const GROUP_LABELS = {
  zh: ['信息端', '交易端', '认证与安全', '平台基础'],
  en: ['Info', 'Trade', 'Auth & Security', 'Platform'],
};
const GROUP_RANGES = [[0, 4], [4, 10], [10, 14], [14, 18]];

export function ApiMatrix() {
  const t = useT();
  const isZh = t.nav.cta === 'EN';
  const groupLabels = isZh ? GROUP_LABELS.zh : GROUP_LABELS.en;

  const COL_HEADERS = isZh
    ? ['编号', '能力', '端点', '认证级别', '限频', '状态']
    : ['Code', 'Capability', 'Endpoint', 'Auth', 'Rate Limit', 'Status'];

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <h2 className="text-3xl font-bold text-ink sm:text-4xl mb-2">
        {isZh ? 'API 能力实现矩阵' : 'API Capability Matrix'}
      </h2>
      <p className="text-sm text-muted mb-8">
        {isZh
          ? 'M1–M18 全部端点。信息、交易、认证、平台四个维度，每项标注端点路径、认证要求和限频策略。'
          : 'All M1–M18 endpoints across Info, Trade, Auth, and Platform — endpoint paths, auth requirements, and rate limits.'}
      </p>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-gray-50">
              {COL_HEADERS.map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROUP_RANGES.map(([start, end], gi) => (
              <>
                <tr key={`group-${gi}`} className="border-b border-border bg-brand-soft/30">
                  <td colSpan={6} className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand">
                    {groupLabels[gi]}
                  </td>
                </tr>
                {CAPABILITIES.slice(start, end).map((cap, ri) => (
                  <tr
                    key={cap.code}
                    className={`border-b border-border last:border-0 hover:bg-gray-50/50 transition-colors ${
                      ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-xs font-bold text-muted">{cap.code}</td>
                    <td className="px-4 py-3 font-medium text-ink">{isZh ? cap.name_zh : cap.name_en}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted max-w-xs">
                      <code className="break-all">{cap.endpoint}</code>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">{cap.auth}</td>
                    <td className="px-4 py-3 text-xs text-muted">{cap.rateLimit}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_LABEL[cap.status].style}`}>
                        {isZh ? STATUS_LABEL[cap.status].zh : STATUS_LABEL[cap.status].en}
                      </span>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="md:hidden space-y-3">
        {GROUP_RANGES.map(([start, end], gi) => (
          <div key={gi}>
            <p className="text-xs font-bold uppercase tracking-wider text-brand mb-2 px-1">{groupLabels[gi]}</p>
            <div className="space-y-2">
              {CAPABILITIES.slice(start, end).map((cap) => (
                <div key={cap.code} className="cw-card-interactive rounded-xl border border-border bg-white p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-muted">{cap.code}</span>
                      <span className="text-sm font-semibold text-ink">{isZh ? cap.name_zh : cap.name_en}</span>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_LABEL[cap.status].style}`}>
                      {isZh ? STATUS_LABEL[cap.status].zh : STATUS_LABEL[cap.status].en}
                    </span>
                  </div>
                  <code className="block text-xs text-muted font-mono break-all">{cap.endpoint}</code>
                  <div className="flex gap-4 text-xs text-muted">
                    <span>Auth: {cap.auth}</span>
                    <span>Rate: {cap.rateLimit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
