'use client';

import { CheckCircle2 } from 'lucide-react';

/** Format price: max 4 decimal places */
function fmtPrice(n: number): string {
  const decimals = n >= 1000 ? 2 : 4;
  return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

interface LimitOrderPayload {
  orderId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  type: string;
  price: number;
  amount: number;
  notional: number;
  status: string;
  timestamp: string;
}

interface Props {
  payload: LimitOrderPayload;
  isZh: boolean;
}

export function LimitOrderCard({ payload, isZh }: Props) {
  const labels = isZh
    ? { title: '限价单已创建', side: '方向', type: '类型', price: '限价', amount: '数量', notional: '预估成交额', status: '状态', id: '订单号', time: '时间', statusOpen: '待成交' }
    : { title: 'Limit Order Created', side: 'Side', type: 'Type', price: 'Price', amount: 'Amount', notional: 'Notional', status: 'Status', id: 'Order ID', time: 'Time', statusOpen: 'OPEN' };

  const sideLabel = payload.side === 'BUY' ? (isZh ? '买入' : 'BUY') : (isZh ? '卖出' : 'SELL');
  const sideColor = payload.side === 'BUY' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="flex justify-start">
      <div className="w-full max-w-[85%] rounded-2xl border-2 border-green-200 bg-green-50/30 p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 border-b border-green-200 pb-2.5">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <div className="text-base font-semibold text-ink">{labels.title}</div>
          <span className="ml-auto rounded-md bg-green-600 px-2 py-0.5 text-[11px] font-semibold text-white">
            {labels.statusOpen}
          </span>
        </div>

        <div className="mb-3 flex items-baseline gap-2">
          <span className="font-mono text-lg font-bold text-ink">{payload.symbol}</span>
          <span className={`text-sm font-semibold ${sideColor}`}>{sideLabel}</span>
          <span className="text-xs text-muted">· {payload.type}</span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <Row label={labels.price} value={`$${fmtPrice(payload.price)}`} />
          <Row label={labels.amount} value={`${payload.amount} ${payload.symbol.split('/')[0]}`} />
          <Row label={labels.notional} value={`$${payload.notional.toLocaleString()}`} />
          <Row label={labels.time} value={payload.timestamp} />
        </div>

        <div className="mt-3 border-t border-green-200 pt-2 text-[11px] font-mono text-muted">
          {labels.id}: {payload.orderId}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
