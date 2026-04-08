"use client";

export default function Background() {
  // Generate starfield dots
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() < 0.7 ? 1 : 2,
    opacity: 0.1 + Math.random() * 0.25,
    green: Math.random() < 0.3,
    delay: Math.random() * 8,
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Base black */}
      <div style={{ position: 'absolute', inset: 0, background: '#000000' }} />

      {/* Large hero gradient blob - top center */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '900px',
        height: '900px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(5,220,128,0.1) 0%, rgba(5,220,128,0.03) 40%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      {/* Orb 1 - top left, slow float */}
      <div className="animate-[orbFloat_20s_ease-in-out_infinite]" style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(5,220,128,0.07) 0%, transparent 70%)',
        filter: 'blur(150px)',
      }} />

      {/* Orb 2 - right mid */}
      <div className="animate-[orbFloat_25s_ease-in-out_infinite_reverse]" style={{
        position: 'absolute',
        top: '40%',
        right: '10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(5,220,128,0.05) 0%, transparent 70%)',
        filter: 'blur(180px)',
      }} />

      {/* Orb 3 - bottom left */}
      <div className="animate-[orbFloat_18s_ease-in-out_infinite]" style={{
        position: 'absolute',
        bottom: '5%',
        left: '25%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(5,220,128,0.06) 0%, transparent 70%)',
        filter: 'blur(160px)',
        animationDelay: '-7s',
      }} />

      {/* Orb 4 - center deep */}
      <div className="animate-[orbFloat_22s_ease-in-out_infinite]" style={{
        position: 'absolute',
        top: '60%',
        left: '50%',
        width: '700px',
        height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(5,220,128,0.04) 0%, transparent 60%)',
        filter: 'blur(200px)',
        animationDelay: '-3s',
      }} />

      {/* Starfield */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {stars.map((s) => (
          <circle
            key={s.id}
            cx={s.left}
            cy={s.top}
            r={s.size}
            fill={s.green ? 'rgba(5,220,128,0.6)' : 'rgba(255,255,255,0.6)'}
            opacity={s.opacity}
          >
            <animate
              attributeName="opacity"
              values={`${s.opacity};${s.opacity * 0.3};${s.opacity}`}
              dur={`${3 + s.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(5,220,128,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(5,220,128,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
    </div>
  );
}
