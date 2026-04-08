import Link from "next/link";
import Navbar from "@/components/Navbar";

const features = [
  { icon: "⚡", title: "Zero Barrier", desc: "No code needed. Deploy your personal AI trading agent with one click. Start in minutes, not months." },
  { icon: "🧠", title: "Personalized", desc: "AI learns your trading style, risk tolerance, and market preferences. Your agent evolves with you." },
  { icon: "🛡️", title: "Ultra Safe", desc: "Never tests with your real money. Only battle-tested, verified strategies make it to live trading." },
];

const steps = [
  { num: "01", title: "Sign Up", desc: "Create your account and connect your CoinW exchange" },
  { num: "02", title: "Connect Agent", desc: "Set up your API keys and activate your AI trading agent" },
  { num: "03", title: "Start Trading", desc: "Your agent analyzes markets 24/7 and executes winning trades" },
];

const stats = [
  { value: "100K+", label: "Active Traders" },
  { value: "$50M+", label: "Trading Volume" },
  { value: "85%+", label: "Win Rate" },
  { value: "24/7", label: "Market Coverage" },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '200px', paddingBottom: '160px', position: 'relative', overflow: 'hidden' }} className="px-6 matrix-grid-bg">
        <div className="particle-field" />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top, rgba(5,220,128,0.1), transparent 60%)' }} />
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(5,220,128,0.04)', filter: 'blur(120px)' }} className="animate-[orbFloat_15s_ease-in-out_infinite]" />
        <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(5,220,128,0.03)', filter: 'blur(100px)' }} className="animate-[orbFloat_12s_ease-in-out_infinite_reverse]" />
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className="eyebrow" style={{ display: 'inline-block', padding: '6px 20px', borderRadius: 9999, border: '1px solid rgba(5,220,128,0.3)', background: 'rgba(5,220,128,0.05)', marginBottom: 32 }}>
            Powered by CoinW Exchange
          </div>
          <h1 className="font-display italic" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 700, color: 'white', marginBottom: 24, lineHeight: 1.1 }}>
            Make AI Trading<br />
            <span className="glow-text" style={{ backgroundImage: 'linear-gradient(to right, #05DC80, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>for Every Trader</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#999', maxWidth: 640, margin: '0 auto 48px', lineHeight: 1.7 }}>
            Break the barriers of AI trading. No code, no complexity — just connect and let your personalized AI agent trade smarter for you.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/dashboard" className="btn-glow" style={{ padding: '14px 32px', fontSize: '1rem', display: 'inline-block' }}>
              Get Started Free
            </Link>
            <a href="#how-it-works" style={{ padding: '14px 32px', border: '1px solid #222', color: 'white', borderRadius: 12, fontSize: '1rem', transition: 'all 0.3s' }}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(5,220,128,0.2), transparent)' }} />

      {/* Features */}
      <section id="features" style={{ padding: '140px 24px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 16 }}>Why Choose Us</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'white', textAlign: 'center', marginBottom: 16 }}>Why XXCrypto?</h2>
          <p style={{ color: '#999', textAlign: 'center', marginBottom: 64, maxWidth: 500, margin: '0 auto 64px' }}>Everything you need to trade like a pro, powered by AI</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {features.map((f) => (
              <div key={f.title} className="shimmer-card glow-card-hover" style={{ padding: 32, borderRadius: 16, background: '#111', border: '1px solid #222' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#999', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(5,220,128,0.15), transparent)' }} />

      {/* How it Works */}
      <section id="how-it-works" style={{ padding: '140px 24px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'white', textAlign: 'center', marginBottom: 64 }}>How it Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {steps.map((s, i) => (
              <div key={s.num} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(5,220,128,0.1)', border: '1px solid rgba(5,220,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 20px rgba(5,220,128,0.15)' }}>
                  <span style={{ color: '#05DC80', fontWeight: 700, fontSize: '1.25rem' }}>{s.num}</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: '#999', fontSize: '0.9rem' }}>{s.desc}</p>
                {i < 2 && <div className="hidden md:block" style={{ position: 'absolute', top: 32, left: '60%', width: '80%', height: 1, background: 'linear-gradient(to right, rgba(5,220,128,0.3), transparent)' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(5,220,128,0.15), transparent)' }} />

      {/* Stats */}
      <section id="stats" style={{ padding: '120px 24px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {stats.map((s) => (
              <div key={s.label} className="glow-card-hover" style={{ textAlign: 'center', padding: 40, borderRadius: 16, background: '#111', border: '1px solid #222' }}>
                <div className="number-glow" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: 4 }}>{s.value}</div>
                <div style={{ color: '#999', fontSize: '0.85rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(5,220,128,0.15), transparent)' }} />

      {/* CTA */}
      <section style={{ padding: '140px 24px', background: '#0a0a0a' }}>
        <div className="glow-card-hover scan-overlay" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: 64, borderRadius: 24, background: '#111', border: '1px solid #222' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'white', marginBottom: 16 }}>Ready to Trade Smarter?</h2>
          <p style={{ color: '#999', marginBottom: 32 }}>Join 100,000+ traders already using AI-powered strategies</p>
          <Link href="/dashboard" className="btn-glow" style={{ display: 'inline-block', padding: '14px 32px', fontSize: '1rem' }}>
            Start Trading Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #222', padding: '40px 24px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: 'linear-gradient(135deg, #05DC80, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 10 }}>XX</div>
            <span style={{ color: 'white', fontWeight: 600 }}>XXCrypto</span>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: '0.85rem', color: '#666' }}>
            <a href="#" style={{ transition: 'color 0.3s' }}>Terms</a>
            <a href="#" style={{ transition: 'color 0.3s' }}>Privacy</a>
            <a href="#" style={{ transition: 'color 0.3s' }}>Docs</a>
            <a href="#" style={{ transition: 'color 0.3s' }}>Support</a>
          </div>
          <p style={{ color: '#666', fontSize: '0.85rem' }}>© 2025 XXCrypto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
