import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '@/i18n/LocaleContext';

export const metadata: Metadata = {
  title: 'CoinW Agent Skill · MVP Roadmap',
  description: 'Turn an Agent into the trading brain of every CoinW user — from reading the market to placing orders in one sentence.',
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
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
