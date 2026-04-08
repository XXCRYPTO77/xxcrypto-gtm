"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/agent", label: "Agent", icon: "🤖" },
  { href: "/dashboard/api-setup", label: "API Setup", icon: "🔑" },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: "💼" },
  { href: "#", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40" style={{ background: 'var(--bg-secondary)', borderRight: '1px solid rgba(5,220,128,0.1)' }}>
      <Link href="/" className="flex items-center gap-2 px-6 h-16" style={{ borderBottom: '1px solid var(--border-primary)' }}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#05DC80] to-[#3b82f6] flex items-center justify-center text-white font-bold text-sm">XX</div>
        <span className="text-white font-bold text-lg">XXCrypto</span>
      </Link>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${active ? "text-[#05DC80]" : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"}`}
              style={active ? { background: 'rgba(5,220,128,0.1)', boxShadow: 'inset 3px 0 0 var(--matrix-green)' } : {}}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4" style={{ borderTop: '1px solid var(--border-primary)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#05DC80] to-[#3b82f6]" />
          <div>
            <p className="text-sm text-white">Trader</p>
            <p className="text-xs text-[var(--text-secondary)]">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
