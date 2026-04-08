"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.8)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.1em' }}>XXCRYPTO</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#phase1" className="nav-link" style={{ color: '#999', fontSize: '0.85rem', textDecoration: 'none' }}>Features</a>
          <a href="#how-it-works" className="nav-link" style={{ color: '#999', fontSize: '0.85rem', textDecoration: 'none' }}>How it Works</a>
          <a href="#stats" className="nav-link" style={{ color: '#999', fontSize: '0.85rem', textDecoration: 'none' }}>Stats</a>
        </div>
        <Link href="/dashboard" className="btn-glow" style={{ padding: '8px 20px', fontSize: '0.85rem', display: 'inline-block' }}>
          Launch App
        </Link>
      </div>
    </nav>
  );
}
