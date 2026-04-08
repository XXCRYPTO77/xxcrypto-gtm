"use client";
import { useState } from "react";

const steps = [
  { title: "Go to CoinW API Management", desc: "Log in to CoinW and navigate to Account → API Management" },
  { title: "Create New API Key", desc: "Click 'Create API' and set a label (e.g., 'XXCrypto Agent')" },
  { title: "Set Permissions", desc: "Enable 'Read' and 'Trade' permissions. Do NOT enable 'Withdraw'." },
  { title: "IP Whitelist", desc: "Add our server IP to the whitelist for security (shown after creation)" },
  { title: "Copy API Key", desc: "Copy your API Key. This is visible anytime in your API management page." },
  { title: "Copy Secret Key", desc: "⚠️ Copy your Secret Key NOW. It is only shown ONCE and cannot be recovered!" },
  { title: "Enter Keys Here", desc: "Paste your API Key and Secret Key below to connect with your agent" },
  { title: "Verify Connection", desc: "We'll test the connection to make sure everything works correctly" },
  { title: "Complete!", desc: "Your CoinW account is connected. Your agent can now execute trades." },
];

export default function ApiSetupPage() {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">CoinW API Setup</h1>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-2">
          <span>Step {current + 1} of {steps.length}</span>
          <span>{Math.round(((current + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
          <div className="h-full progress-gradient rounded-full transition-all duration-500" style={{ width: `${((current + 1) / steps.length) * 100}%`, boxShadow: '0 0 12px rgba(5,220,128,0.4)' }} />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-8 h-8 rounded-full text-xs font-medium flex-shrink-0 transition-all ${i === current ? "bg-[#05DC80] text-black shadow-[0_0_15px_rgba(5,220,128,0.4)]" : i < current ? "bg-[#05DC80]/20 text-[#05DC80]" : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"}`}>
            {i < current ? "✓" : i + 1}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="theme-card glow-card-hover p-8 mb-6">
        <h2 className="text-xl font-semibold text-white mb-3">{steps[current].title}</h2>
        <p className="text-[var(--text-secondary)] mb-6">{steps[current].desc}</p>

        <div className="rounded-xl bg-[var(--dark-bg)] border border-[var(--border-primary)] p-6 mb-6">
          {current === 5 && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm mb-4">
              ⚠️ <strong>WARNING:</strong> The Secret Key is only displayed once. If you lose it, you must delete this API key and create a new one.
            </div>
          )}
          {current === 6 ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[var(--text-secondary)] block mb-2">API Key</label>
                <input type="text" placeholder="Enter your CoinW API Key" className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-white text-sm placeholder-[var(--text-secondary)] focus:outline-none focus:border-[#05DC80]/50" />
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)] block mb-2">Secret Key</label>
                <input type="password" placeholder="Enter your CoinW Secret Key" className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-white text-sm placeholder-[var(--text-secondary)] focus:outline-none focus:border-[#05DC80]/50" />
              </div>
            </div>
          ) : current === 8 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold neon-text mb-2">Successfully Connected!</h3>
              <p className="text-[var(--text-secondary)]">Your CoinW account is now linked to your AI trading agent</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-[var(--text-secondary)] text-sm">
              <div className="text-center">
                <div className="text-3xl mb-2">📷</div>
                <p>Screenshot / Visual Guide for Step {current + 1}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}
          className="px-6 py-2.5 border border-[var(--border-primary)] text-[var(--text-secondary)] rounded-lg text-sm hover:border-[#05DC80]/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
          Previous
        </button>
        <button onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))} disabled={current === steps.length - 1}
          className="btn-glow px-6 py-2.5 text-sm disabled:opacity-30 disabled:cursor-not-allowed">
          {current === steps.length - 2 ? "Complete Setup" : "Next Step"}
        </button>
      </div>
    </div>
  );
}
