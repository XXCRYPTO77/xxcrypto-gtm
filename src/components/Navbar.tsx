"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[#1f2937] bg-[#0a0a1a]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#3b82f6] flex items-center justify-center text-white font-bold text-sm">XX</div>
          <span className="text-white font-bold text-xl">XXCrypto</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
          <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How it Works</a>
          <a href="#stats" className="text-gray-400 hover:text-white transition-colors text-sm">Stats</a>
        </div>
        <Link href="/dashboard" className="px-5 py-2 bg-[#00d4aa] hover:bg-[#00b894] text-black font-semibold rounded-lg text-sm transition-all hover:shadow-[0_0_20px_rgba(0,212,170,0.3)]">
          Launch App
        </Link>
      </div>
    </nav>
  );
}
