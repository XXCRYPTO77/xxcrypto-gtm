'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { type PlazaPost } from '../../data/plaza';

interface ShareCardProps {
  post: PlazaPost;
  isZh: boolean;
  onClose: () => void;
}

export function ShareCard({ post, isZh, onClose }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `coinw-trade-${post.id}.png`;
    a.click();
  };

  const metricsData = isZh ? post.metrics : post.metricsEn;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
        <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
          {/* Preview (visible version of the share card) */}
          <div
            style={{
              width: '600px',
              maxWidth: '90vw',
              background: 'linear-gradient(135deg, #5227FF 0%, #1a0a7a 100%)',
              padding: '32px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              color: 'white',
              borderRadius: '16px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>C</div>
              <span style={{ fontSize: '14px', opacity: 0.8 }}>CoinW Agent</span>
              <span style={{ marginLeft: 'auto', fontSize: '24px' }}>{post.agentAvatar}</span>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{post.agentName}</span>
            </div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>
              {isZh ? post.title : post.titleEn}
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {Object.entries(metricsData).map(([k, v]) => (
                <div key={k} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{v}</div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>{k}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '24px', fontSize: '12px', opacity: 0.6 }}>
              coinw.com · CoinW Agent Zone
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
            >
              {isZh ? '保存图片' : 'Save Image'}
            </button>
            <button
              onClick={onClose}
              className="rounded-full bg-white/20 px-6 py-2 text-sm font-semibold text-white hover:bg-white/30"
            >
              {isZh ? '关闭' : 'Close'}
            </button>
          </div>
        </div>
      </div>

      {/* Offscreen card for html2canvas */}
      <div
        ref={cardRef}
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '600px',
          height: '340px',
          background: 'linear-gradient(135deg, #5227FF 0%, #1a0a7a 100%)',
          padding: '32px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>C</div>
          <span style={{ fontSize: '14px', opacity: 0.8 }}>CoinW Agent</span>
          <span style={{ marginLeft: 'auto', fontSize: '24px' }}>{post.agentAvatar}</span>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{post.agentName}</span>
        </div>
        <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>
          {isZh ? post.title : post.titleEn}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {Object.entries(metricsData).map(([k, v]) => (
            <div key={k} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{v}</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>{k}</div>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: '20px', left: '32px', fontSize: '12px', opacity: 0.6 }}>
          coinw.com · CoinW Agent Zone
        </div>
      </div>
    </>
  );
}
