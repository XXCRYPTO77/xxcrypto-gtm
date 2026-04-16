import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { ThemeProvider } from '@/theme/ThemeContext';

export const metadata: Metadata = {
  title: 'AgentX · AI Trading Agent',
  description: 'Your AI trading agent — perceives markets, makes decisions, evolves continuously.',
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
