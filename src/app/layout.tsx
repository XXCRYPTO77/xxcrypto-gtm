import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { ThemeProvider } from '@/theme/ThemeContext';

export const metadata: Metadata = {
  title: 'Claw 42 · AI Trading Agent',
  description:
    'Claw 42 — AI trading agent. Perceives markets, makes decisions, evolves continuously.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh" className="cw-dark" suppressHydrationWarning>
      <head>
        {/* Inter — primary sans for Claw 42 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Satoshi kept as fallback for any previously-styled surface */}
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
