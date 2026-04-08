"use client";

export default function Background() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() < 0.7 ? 1 : 2,
    opacity: 0.08 + Math.random() * 0.2,
    green: Math.random() < 0.3,
    delay: Math.random() * 8,
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Base black */}
      <div style={{ position: 'absolute', inset: 0, background: '#000' }} />

      {/* Central aurora beam — the Bitget-style vertical light */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '120%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(5,220,128,0.08) 20%, rgba(5,220,128,0.15) 40%, rgba(5,220,128,0.08) 60%, transparent 80%)',
        filter: 'blur(60px)',
        animation: 'auroraBreath 6s ease-in-out infinite',
      }} />

      {/* Secondary beam — slightly offset, different timing */}
      <div style={{
        position: 'absolute',
        top: '-5%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '150px',
        height: '110%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(5,220,128,0.12) 30%, rgba(5,220,128,0.2) 50%, rgba(5,220,128,0.12) 70%, transparent 100%)',
        filter: 'blur(40px)',
        animation: 'auroraBreath 4s ease-in-out infinite reverse',
      }} />

      {/* Horizontal light band across hero */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent 20%, rgba(5,220,128,0.3) 50%, transparent 80%)',
        filter: 'blur(1px)',
        animation: 'scanLine 8s ease-in-out infinite',
      }} />

      {/* Floating orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '15%', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(5,220,128,0.05) 0%, transparent 70%)',
        filter: 'blur(120px)', animation: 'orbFloat 20s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '50%', right: '10%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(5,220,128,0.04) 0%, transparent 70%)',
        filter: 'blur(150px)', animation: 'orbFloat 25s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '30%', width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(5,220,128,0.04) 0%, transparent 70%)',
        filter: 'blur(130px)', animation: 'orbFloat 18s ease-in-out infinite',
      }} />

      {/* Starfield */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {stars.map((s) => (
          <circle key={s.id} cx={s.left} cy={s.top} r={s.size}
            fill={s.green ? 'rgba(5,220,128,0.5)' : 'rgba(255,255,255,0.5)'} opacity={s.opacity}>
            <animate attributeName="opacity" values={`${s.opacity};${s.opacity * 0.2};${s.opacity}`}
              dur={`${3 + s.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(5,220,128,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(5,220,128,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* CSS animations */}
      <style>{`
        @keyframes auroraBreath {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleX(1.3); }
        }
        @keyframes scanLine {
          0%, 100% { opacity: 0; top: 15%; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; top: 35%; }
        }
      `}</style>
    </div>
  );
}
