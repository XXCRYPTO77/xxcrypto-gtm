import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XXCrypto - AI Trading for Every Trader",
  description: "Break AI trading barriers with XXCrypto. Zero code, personalized strategies, battle-tested safety.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
