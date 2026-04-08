"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl" style={{ background: 'rgba(0,0,0,0.85)', borderBottom: '1px solid rgba(5,220,128,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#05DC80] to-[#3b82f6] flex items-center justify-center text-white font-bold text-sm">XX</div>
          <span className="text-white font-bold text-xl">XXCrypto</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm">Features</a>
          <a href="#how-it-works" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm">How it Works</a>
          <a href="#stats" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm">Stats</a>
        </div>
        <Link href="/dashboard" className="btn-glow px-5 py-2 text-sm inline-block">
          Launch App
        </Link>
      </div>
    </nav>
  );
}
