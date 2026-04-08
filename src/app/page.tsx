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
    <div className="min-h-screen bg-[var(--dark-bg)]">
      <Navbar />

      {/* Hero */}
      <section className="pt-44 pb-36 px-6 relative overflow-hidden matrix-grid-bg">
        <div className="particle-field" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(5,220,128,0.1),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[rgba(5,220,128,0.04)] blur-[120px] animate-[orbFloat_15s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[rgba(5,220,128,0.03)] blur-[100px] animate-[orbFloat_12s_ease-in-out_infinite_reverse]" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="eyebrow inline-block px-4 py-1.5 rounded-full border border-[#05DC80]/30 bg-[#05DC80]/5 mb-8">
            Powered by CoinW Exchange
          </div>
          <h1 className="font-display italic text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Make AI Trading<br />
            <span className="glow-text bg-gradient-to-r from-[#05DC80] to-[#3b82f6] bg-clip-text text-transparent">for Every Trader</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12">
            Break the barriers of AI trading. No code, no complexity — just connect and let your personalized AI agent trade smarter for you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard" className="btn-glow px-8 py-3.5 text-base inline-block">
              Get Started Free
            </Link>
            <a href="#how-it-works" className="px-8 py-3.5 border border-[var(--border-primary)] hover:border-[#05DC80]/50 text-white rounded-xl text-base transition-all">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="eyebrow text-center mb-4">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Why XXCrypto?</h2>
          <p className="text-[var(--text-secondary)] text-center mb-16 max-w-xl mx-auto">Everything you need to trade like a pro, powered by AI</p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="shimmer-card glow-card-hover p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] group">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#05DC80] transition-colors">{f.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-[#05DC80]/10 border border-[#05DC80]/20 flex items-center justify-center mx-auto mb-6" style={{ boxShadow: 'var(--glow-sm)' }}>
                  <span className="text-[#05DC80] font-bold text-xl">{s.num}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#05DC80]/30 to-transparent" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] glow-card-hover">
                <div className="number-glow text-3xl md:text-4xl font-bold mb-1">{s.value}</div>
                <div className="text-[var(--text-secondary)] text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center p-14 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-primary)] glow-card-hover scan-overlay">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Trade Smarter?</h2>
          <p className="text-[var(--text-secondary)] mb-8">Join 100,000+ traders already using AI-powered strategies</p>
          <Link href="/dashboard" className="btn-glow inline-block px-8 py-3.5 text-base">
            Start Trading Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-primary)] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#05DC80] to-[#3b82f6] flex items-center justify-center text-white font-bold text-xs">XX</div>
            <span className="text-white font-semibold">XXCrypto</span>
          </div>
          <div className="flex gap-6 text-sm text-[var(--text-secondary)]">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Docs</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
          </div>
          <p className="text-[var(--text-secondary)] text-sm">© 2025 XXCrypto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
