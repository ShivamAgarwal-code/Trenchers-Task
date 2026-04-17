import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrenchersAI — The Fastest Solana Trading Terminal",
  description:
    "Sub-2s snipe execution. Copy whale wallets. Track every move. One terminal built for the trenches.",
  openGraph: {
    title: "TrenchersAI — The Fastest Solana Trading Terminal",
    description:
      "Sub-2s snipe execution. Copy whale wallets. Track every move. One terminal built for the trenches.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrenchersAI — The Fastest Solana Trading Terminal",
    description:
      "Sub-2s snipe execution. Copy whale wallets. Track every move.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
