import Link from "next/link";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { LightningIcon, BrainIcon, ShieldIcon, AgentIcon, ApiIcon } from "@/components/GlassIcon";

const features = [
  { icon: "lightning", title: "Zero Barrier", desc: "No code needed. Deploy your personal AI trading agent with one click. Start in minutes, not months." },
  { icon: "brain", title: "Personalized", desc: "AI learns your trading style, risk tolerance, and market preferences. Your agent evolves with you." },
  { icon: "shield", title: "Ultra Safe", desc: "Never tests with your real money. Only battle-tested, verified strategies make it to live trading." },
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

function FeatureIcon({ type }: { type: string }) {
  if (type === "lightning") return <LightningIcon />;
  if (type === "brain") return <BrainIcon />;
  return <ShieldIcon />;
}

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', position: 'relative' }}>
      <Background />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />

        {/* Hero */}
        <section style={{ paddingTop: '200px', paddingBottom: '160px', position: 'relative', overflow: 'hidden' }} className="px-6">
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div style={{ display: 'inline-block', padding: '6px 20px', borderRadius: 9999, border: '1px solid rgba(5,220,128,0.3)', background: 'rgba(5,220,128,0.05)', marginBottom: 32, fontSize: '0.75rem', color: '#05DC80', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
              Powered by CoinW Exchange
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: 'white', marginBottom: 24, lineHeight: 1.15, letterSpacing: '0.04em' }}>
              MAKE AI TRADING<br />
              <span className="glow-text" style={{ backgroundImage: 'linear-gradient(to right, #05DC80, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FOR EVERY TRADER</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#888', maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.7, fontFamily: 'Inter, system-ui, sans-serif' }}>
              Break the barriers of AI trading. No code, no complexity — just connect and let your personalized AI agent trade smarter for you.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link href="/dashboard" className="btn-glow" style={{ padding: '14px 36px', fontSize: '1rem', display: 'inline-block' }}>
                Get Started Free
              </Link>
              <a href="#phase1" style={{ padding: '14px 36px', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: 12, fontSize: '1rem', transition: 'all 0.3s', backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.03)' }}>
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(5,220,128,0.15), transparent)' }} />

        {/* Phase 1 Core Features */}
        <section id="phase1" style={{ padding: '140px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ display: 'inline-block', padding: '6px 20px', borderRadius: 9999, border: '1px solid rgba(5,220,128,0.3)', background: 'rgba(5,220,128,0.05)', marginBottom: 20, fontSize: '0.7rem', color: '#05DC80', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                Core Platform
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 16, letterSpacing: '0.03em' }}>TWO STEPS TO AI TRADING</h2>
              <p style={{ color: '#888', maxWidth: 550, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>Connect your AI agent and link your exchange — start automated trading in minutes</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 24 }}>
              {/* Card 1: Connect Agent */}
              <div className="glow-card-hover" style={{ padding: 40, borderRadius: 20, background: 'rgba(5,220,128,0.03)', border: '1px solid rgba(5,220,128,0.12)', backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,220,128,0.08), transparent)', filter: 'blur(60px)' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <AgentIcon />
                    <div style={{ fontSize: '0.7rem', color: '#05DC80', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, padding: '4px 12px', borderRadius: 6, background: 'rgba(5,220,128,0.08)' }}>Step 1</div>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'white', marginBottom: 12, letterSpacing: '0.03em' }}>YOUR PERSONAL AI TRADING AGENT</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 28, fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Connect to our pre-configured AI Agent powered by OpenClaw. No setup needed — just activate and your agent starts analyzing markets, providing insights, and executing trades on your behalf 24/7.
                  </p>
                  {/* Mini mockup: Agent chat */}
                  <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 12, padding: 16, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#05DC80', boxShadow: '0 0 8px rgba(5,220,128,0.6)' }} />
                      <span style={{ fontSize: '0.75rem', color: '#05DC80', fontFamily: 'monospace' }}>Agent Online</span>
                    </div>
                    <div style={{ background: 'rgba(5,220,128,0.06)', borderRadius: 8, padding: '10px 14px', marginBottom: 8, borderLeft: '2px solid rgba(5,220,128,0.3)' }}>
                      <span style={{ fontSize: '0.8rem', color: '#ccc', fontFamily: 'Inter, system-ui, sans-serif' }}>BTC showing strong support at $67,200. Recommend accumulating 0.5% position with SL at $66,800.</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 14px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#888', fontFamily: 'Inter, system-ui, sans-serif' }}>Execute trade with risk management...</span>
                    </div>
                  </div>
                  <Link href="/agent" className="btn-glow" style={{ display: 'inline-block', padding: '10px 24px', fontSize: '0.85rem' }}>
                    Connect Agent →
                  </Link>
                </div>
              </div>

              {/* Card 2: Connect CoinW API */}
              <div className="glow-card-hover" style={{ padding: 40, borderRadius: 20, background: 'rgba(5,220,128,0.03)', border: '1px solid rgba(5,220,128,0.12)', backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent)', filter: 'blur(60px)' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <ApiIcon />
                    <div style={{ fontSize: '0.7rem', color: '#05DC80', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, padding: '4px 12px', borderRadius: 6, background: 'rgba(5,220,128,0.08)' }}>Step 2</div>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'white', marginBottom: 12, letterSpacing: '0.03em' }}>SEAMLESS COINW INTEGRATION</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 28, fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Link your CoinW exchange account in minutes with our guided API setup. Your AI agent securely connects to execute spot and futures trades automatically based on proven strategies.
                  </p>
                  {/* Mini mockup: API setup */}
                  <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 12, padding: 16, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 24 }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: 4, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>API Key</div>
                      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '8px 12px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: '#555', fontFamily: 'monospace' }}>xxcw-****-****-****-a3f8</div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: 4, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secret Key</div>
                      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '8px 12px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: '#555', fontFamily: 'monospace' }}>••••••••••••••••</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#05DC80', boxShadow: '0 0 8px rgba(5,220,128,0.6)' }} />
                      <span style={{ fontSize: '0.75rem', color: '#05DC80', fontFamily: 'monospace' }}>Connected — Spot & Futures enabled</span>
                    </div>
                  </div>
                  <Link href="/api-setup" className="btn-glow" style={{ display: 'inline-block', padding: '10px 24px', fontSize: '0.85rem' }}>
                    Setup API →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(5,220,128,0.15), transparent)' }} />

        {/* Features */}
        <section id="features" style={{ padding: '140px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ display: 'inline-block', padding: '6px 20px', borderRadius: 9999, border: '1px solid rgba(5,220,128,0.3)', background: 'rgba(5,220,128,0.05)', marginBottom: 20, fontSize: '0.7rem', color: '#05DC80', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                Why Choose Us
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 16, letterSpacing: '0.03em' }}>WHY XXCRYPTO?</h2>
              <p style={{ color: '#888', maxWidth: 500, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>Everything you need to trade like a pro, powered by AI</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {features.map((f) => (
                <div key={f.title} className="shimmer-card glow-card-hover" style={{ padding: 32, borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}>
                  <div style={{ marginBottom: 20 }}><FeatureIcon type={f.icon} /></div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 8, letterSpacing: '0.03em' }}>{f.title.toUpperCase()}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.7, fontFamily: 'Inter, system-ui, sans-serif' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(5,220,128,0.15), transparent)' }} />

        {/* How it Works */}
        <section id="how-it-works" style={{ padding: '140px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', textAlign: 'center', marginBottom: 64, letterSpacing: '0.03em' }}>HOW IT WORKS</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
              {steps.map((s, i) => (
                <div key={s.num} style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(5,220,128,0.08)', border: '1px solid rgba(5,220,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 20px rgba(5,220,128,0.15)' }}>
                    <span style={{ color: '#05DC80', fontWeight: 700, fontSize: '1.25rem' }}>{s.num}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: 8, letterSpacing: '0.03em' }}>{s.title.toUpperCase()}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', fontFamily: 'Inter, system-ui, sans-serif' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(5,220,128,0.15), transparent)' }} />

        {/* Stats */}
        <section id="stats" style={{ padding: '120px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              {stats.map((s) => (
                <div key={s.label} className="glow-card-hover" style={{ textAlign: 'center', padding: 40, borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="number-glow" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ color: '#888', fontSize: '0.85rem', fontFamily: 'Inter, system-ui, sans-serif' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(5,220,128,0.15), transparent)' }} />

        {/* CTA */}
        <section style={{ padding: '140px 24px' }}>
          <div className="glow-card-hover scan-overlay" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: 64, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 16, letterSpacing: '0.03em' }}>READY TO TRADE SMARTER?</h2>
            <p style={{ color: '#888', marginBottom: 32, fontFamily: 'Inter, system-ui, sans-serif' }}>Join 100,000+ traders already using AI-powered strategies</p>
            <Link href="/dashboard" className="btn-glow" style={{ display: 'inline-block', padding: '14px 36px', fontSize: '1rem' }}>
              Start Trading Now
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 4, background: 'linear-gradient(135deg, #05DC80, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 10 }}>XX</div>
              <span style={{ color: 'white', fontWeight: 600 }}>XXCrypto</span>
            </div>
            <div style={{ display: 'flex', gap: 24, fontSize: '0.85rem', color: '#555' }}>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Docs</a>
              <a href="#">Support</a>
            </div>
            <p style={{ color: '#555', fontSize: '0.85rem' }}>© 2025 XXCrypto. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
