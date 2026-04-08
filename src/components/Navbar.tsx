"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.8)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #05DC80, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 11 }}>XX</div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.08em' }}>XXCRYPTO</span>
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
