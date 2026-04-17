"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TOKENS = [
  { name: "$WIF", change: "+842%", color: "text-accent-green" },
  { name: "$BONK", change: "+1,204%", color: "text-accent-green" },
  { name: "$SLERF", change: "+367%", color: "text-accent-green" },
  { name: "$POPCAT", change: "+2,100%", color: "text-accent-green" },
  { name: "$MEW", change: "+540%", color: "text-accent-green" },
  { name: "$FWOG", change: "+1,880%", color: "text-accent-green" },
];

function LiveCounter() {
  const [count, setCount] = useState(1847);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="font-mono tabular-nums">{count.toLocaleString()}</span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 pt-20 pb-8 gradient-mesh grid-pattern noise overflow-hidden">
      {/* Ticker bar */}
      <div className="absolute top-16 left-0 right-0 border-b border-border/30 bg-surface/50 backdrop-blur-sm overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap py-2">
          {[...TOKENS, ...TOKENS].map((t, i) => (
            <span
              key={i}
              className="mx-6 text-xs font-mono flex items-center gap-2"
            >
              <span className="text-muted">{t.name}</span>
              <span className={t.color}>{t.change}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
          </span>
          <span className="text-xs font-mono text-accent">
            <LiveCounter /> traders online
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Snipe tokens before
          <br />
          <span className="text-glow text-accent">the chart loads.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-5 max-w-xl text-base sm:text-lg text-muted leading-relaxed"
        >
          The Solana trading terminal built for the trenches. Sub-2s snipe
          execution, whale copy trading, and real-time wallet tracking — all in
          one place.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="#waitlist"
            className="group relative inline-flex h-12 items-center justify-center rounded-xl bg-accent px-8 text-sm font-bold text-background transition-all hover:brightness-110 glow-accent"
          >
            Join the Waitlist
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
          <a
            href="#features"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-sm font-medium text-muted hover:text-foreground hover:border-foreground/20 transition-all"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Speed proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-12 grid grid-cols-3 gap-6 sm:gap-12"
        >
          {[
            { value: "<2s", label: "Snipe Execution" },
            { value: "0%", label: "Platform Fees" },
            { value: "24/7", label: "Bot Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-accent">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Terminal preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="relative z-10 mt-12 w-full max-w-5xl mx-auto"
      >
        <div className="rounded-xl border border-border/50 bg-surface/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-accent/5">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-accent-red/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-accent-green/60" />
            </div>
            <span className="ml-2 text-xs font-mono text-muted">
              trenchers-terminal — sniper active
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-green animate-live-pulse" />
              <span className="text-xs font-mono text-accent-green">LIVE</span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-2">
            <TerminalLine delay={1.1} color="text-muted">
              [00:14:32] Scanning Pump.fun for new launches...
            </TerminalLine>
            <TerminalLine delay={1.4} color="text-accent">
              [00:14:33] NEW TOKEN DETECTED — $TRENCHY (FdK...x9Qm)
            </TerminalLine>
            <TerminalLine delay={1.7} color="text-muted">
              [00:14:33] Running 15 safety filters... ✓ passed
            </TerminalLine>
            <TerminalLine delay={2.0} color="text-accent-green">
              [00:14:34] BUY EXECUTED — 0.5 SOL → 2,847,193 $TRENCHY
            </TerminalLine>
            <TerminalLine delay={2.3} color="text-muted">
              [00:14:34] Auto TP set: +100% / +300% / +500%
            </TerminalLine>
            <TerminalLine delay={2.6} color="text-accent-green">
              [00:15:12] TP1 HIT — Sold 33% at +112% (+0.56 SOL)
            </TerminalLine>
            <TerminalLine delay={2.9} color="text-yellow-500">
              [00:15:44] Whale wallet 7xK...mP tracked — buying $TRENCHY
            </TerminalLine>
            <TerminalLine delay={3.2} color="text-accent-green">
              [00:16:38] TP2 HIT — Sold 33% at +314% (+1.57 SOL)
            </TerminalLine>
          </div>
        </div>
        {/* Glow under terminal */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-16 w-3/4 bg-accent/10 blur-3xl rounded-full" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="mt-12 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-6 w-4 rounded-full border border-border flex items-start justify-center pt-1"
        >
          <div className="h-1.5 w-1 rounded-full bg-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function TerminalLine({
  children,
  delay,
  color,
}: {
  children: React.ReactNode;
  delay: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={color}
    >
      {children}
    </motion.div>
  );
}
