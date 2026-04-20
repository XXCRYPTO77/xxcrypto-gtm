'use client';

import React, { createContext, useCallback, useContext, useEffect } from 'react';

// Claw 42 is a dark-only theme. We keep the context shape so any existing
// consumer (useTheme / ThemeToggle) still compiles, but every value is locked
// to 'dark'.
type Theme = 'dark';

interface ThemeCtx {
  theme: Theme;
  setTheme: (_t: Theme) => void;
  toggle: () => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    // Force dark class on <html> on every mount/navigation.
    document.documentElement.classList.add('cw-dark');
  }, []);

  const setTheme = useCallback((_t: Theme) => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.add('cw-dark');
  }, []);

  const toggle = useCallback(() => {
    // no-op: dark only
  }, []);

  return (
    <Ctx.Provider value={{ theme: 'dark', setTheme, toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Defensive fallback for components rendered without the provider
    // (e.g. during isolated stories) \u2014 return a dark-only shim.
    return {
      theme: 'dark',
      setTheme: () => {},
      toggle: () => {},
    };
  }
  return ctx;
}
