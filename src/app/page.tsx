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
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,170,0.08),transparent_60%)]" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/5 text-[#00d4aa] text-sm mb-6">
            Powered by CoinW Exchange
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Make AI Trading<br />
            <span className="bg-gradient-to-r from-[#00d4aa] to-[#3b82f6] bg-clip-text text-transparent">for Every Trader</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Break the barriers of AI trading. No code, no complexity — just connect and let your personalized AI agent trade smarter for you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard" className="px-8 py-3.5 bg-[#00d4aa] hover:bg-[#00b894] text-black font-semibold rounded-xl text-base transition-all hover:shadow-[0_0_30px_rgba(0,212,170,0.3)]">
              Get Started Free
            </Link>
            <a href="#how-it-works" className="px-8 py-3.5 border border-[#1f2937] hover:border-[#00d4aa]/50 text-white rounded-xl text-base transition-all">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Why XXCrypto?</h2>
          <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">Everything you need to trade like a pro, powered by AI</p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-[#111827]/80 border border-[#1f2937] backdrop-blur-sm hover:border-[#00d4aa]/30 transition-all group">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-28 px-6 bg-[#0d0d20]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-14">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4aa]/20 to-[#3b82f6]/20 border border-[#00d4aa]/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-[#00d4aa] font-bold text-xl">{s.num}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#00d4aa]/30 to-transparent" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-6 rounded-2xl bg-[#111827]/50 border border-[#1f2937]">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00d4aa] to-[#3b82f6] bg-clip-text text-transparent mb-1">{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-[#00d4aa]/10 to-[#3b82f6]/10 border border-[#1f2937]">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Trade Smarter?</h2>
          <p className="text-gray-400 mb-8">Join 100,000+ traders already using AI-powered strategies</p>
          <Link href="/dashboard" className="inline-block px-8 py-3.5 bg-[#00d4aa] hover:bg-[#00b894] text-black font-semibold rounded-xl transition-all hover:shadow-[0_0_30px_rgba(0,212,170,0.3)]">
            Start Trading Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1f2937] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#00d4aa] to-[#3b82f6] flex items-center justify-center text-white font-bold text-xs">XX</div>
            <span className="text-white font-semibold">XXCrypto</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Docs</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
          </div>
          <p className="text-gray-500 text-sm">© 2025 XXCrypto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
