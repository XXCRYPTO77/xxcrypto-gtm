import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { ThemeProvider } from '@/theme/ThemeContext';

export const metadata: Metadata = {
  title: 'Claw 42 · AI Trading Agent',
  description: 'Redefine trading with AI Agents. Claw 42 turns exchange primitives into AI-callable Skills — from market data to execution.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        {/* Satoshi via Fontshare CDN */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
        {/* HarmonyOS Sans SC fallback via CDN — noto sans sc is the open alternative */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
