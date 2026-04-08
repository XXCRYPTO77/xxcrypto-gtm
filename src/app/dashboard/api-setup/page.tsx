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
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Step {current + 1} of {steps.length}</span>
          <span>{Math.round(((current + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-[#1f2937] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00d4aa] to-[#3b82f6] rounded-full transition-all duration-500" style={{ width: `${((current + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-8 h-8 rounded-full text-xs font-medium flex-shrink-0 transition-all ${i === current ? "bg-[#00d4aa] text-black" : i < current ? "bg-[#00d4aa]/20 text-[#00d4aa]" : "bg-[#1f2937] text-gray-500"}`}>
            {i < current ? "✓" : i + 1}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="p-8 rounded-2xl bg-[#111827] border border-[#1f2937] mb-6">
        <h2 className="text-xl font-semibold text-white mb-3">{steps[current].title}</h2>
        <p className="text-gray-400 mb-6">{steps[current].desc}</p>

        {/* Placeholder for step-specific content */}
        <div className="rounded-xl bg-[#0a0a1a] border border-[#1f2937] p-6 mb-6">
          {current === 5 && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm mb-4">
              ⚠️ <strong>WARNING:</strong> The Secret Key is only displayed once. If you lose it, you must delete this API key and create a new one.
            </div>
          )}
          {current === 6 ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">API Key</label>
                <input type="text" placeholder="Enter your CoinW API Key" className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#1f2937] text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00d4aa]/50" />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Secret Key</label>
                <input type="password" placeholder="Enter your CoinW Secret Key" className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#1f2937] text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00d4aa]/50" />
              </div>
            </div>
          ) : current === 8 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-[#00d4aa] mb-2">Successfully Connected!</h3>
              <p className="text-gray-400">Your CoinW account is now linked to your AI trading agent</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-gray-600 text-sm">
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
          className="px-6 py-2.5 border border-[#1f2937] text-gray-400 rounded-lg text-sm hover:border-[#00d4aa]/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
          Previous
        </button>
        <button onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))} disabled={current === steps.length - 1}
          className="px-6 py-2.5 bg-[#00d4aa] hover:bg-[#00b894] text-black font-semibold rounded-lg text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          {current === steps.length - 2 ? "Complete Setup" : "Next Step"}
        </button>
      </div>
    </div>
  );
}
