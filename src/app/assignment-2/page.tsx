"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DesignPhilosophy from "@/components/terminal/DesignPhilosophy";
import TokenHeader from "@/components/terminal/TokenHeader";
import PriceChart from "@/components/terminal/PriceChart";
import TradePanel from "@/components/terminal/TradePanel";
import RecentTrades from "@/components/terminal/RecentTrades";
import TokenInfo from "@/components/terminal/TokenInfo";
import TopHolders from "@/components/terminal/TopHolders";
import TokenSearch from "@/components/terminal/TokenSearch";

const NAV_ITEMS = ["Trade", "Sniper", "Portfolio", "Wallets", "Settings"] as const;

export default function Assignment2Page() {
  const [activeNav, setActiveNav] = useState<string>("Trade");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Terminal top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-accent font-bold font-mono text-base sm:text-lg tracking-tight">
              TRENCHERS
            </span>
            <span className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded-md hidden sm:inline">
              TERMINAL
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-mono">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-3 py-1.5 rounded-md transition-colors relative ${
                  activeNav === item
                    ? "bg-surface-light text-foreground"
                    : "text-muted hover:text-foreground hover:bg-surface-light/50"
                }`}
              >
                {item}
                {activeNav === item && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-light transition-colors"
              aria-label="Search tokens"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Connection status */}
            <div className="hidden sm:flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent-green animate-live-pulse" />
              <span className="text-xs font-mono text-muted">Connected</span>
            </div>

            {/* Wallet */}
            <button className="bg-surface-light text-foreground text-xs font-mono px-2.5 sm:px-3 py-1.5 rounded-lg border border-border hover:border-accent/30 transition-colors truncate max-w-[100px] sm:max-w-none">
              4rZm...8Hqn
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-light transition-colors"
              aria-label="Menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                {mobileMenuOpen ? (
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <div className="px-3 py-2 flex flex-col gap-0.5">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveNav(item);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2.5 rounded-md text-sm font-mono text-left transition-colors ${
                      activeNav === item
                        ? "bg-surface-light text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <div className="flex items-center gap-1.5 px-3 py-2 sm:hidden">
                  <div className="w-2 h-2 rounded-full bg-accent-green animate-live-pulse" />
                  <span className="text-xs font-mono text-muted">Solana Mainnet &middot; Connected</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search overlay */}
        <AnimatePresence>
          {showSearch && (
            <TokenSearch onClose={() => setShowSearch(false)} />
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-[1600px] mx-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {/* Design Philosophy Brief */}
        <DesignPhilosophy />

        {/* Token Header */}
        <TokenHeader
          name="Trenchy"
          ticker="TRENCHY"
          price={0.000452}
          change24h={34.7}
          marketCap="$452K"
          volume24h="$1.2M"
          liquidity="$142K"
          trustScore={82}
        />

        {/* Main grid layout — stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-3 sm:gap-4">
          {/* Left column: Chart + Recent Trades */}
          <div className="space-y-3 sm:space-y-4">
            <PriceChart />
            <RecentTrades />
          </div>

          {/* Right column: Trade + Info + Holders */}
          <div className="space-y-3 sm:space-y-4">
            <TradePanel />
            <TokenInfo />
            <TopHolders />
          </div>
        </div>

        {/* Research findings footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border border-border rounded-xl bg-surface p-4 sm:p-6 mt-4"
        >
          <h2 className="text-accent font-mono text-sm font-bold tracking-wider uppercase mb-4">
            Research Findings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono text-muted leading-relaxed">
            <div>
              <h3 className="text-foreground font-bold mb-2">
                What incumbents do well
              </h3>
              <ul className="space-y-1.5 list-none">
                <li>
                  <span className="text-accent-green mr-1">+</span> GMGN&apos;s token
                  discovery feed — fast scanning of new launches with key metrics
                  visible at a glance
                </li>
                <li>
                  <span className="text-accent-green mr-1">+</span> DEXScreener&apos;s
                  chart — best-in-class candlestick rendering with fast
                  timeframe switching
                </li>
                <li>
                  <span className="text-accent-green mr-1">+</span> Axiom&apos;s
                  one-click buy — reduces friction from discovery to position
                </li>
                <li>
                  <span className="text-accent-green mr-1">+</span> Photon&apos;s speed
                  — their gRPC integration gives near-instant trade confirmation
                  UX
                </li>
                <li>
                  <span className="text-accent-green mr-1">+</span> BullX&apos;s
                  portfolio view — clear PnL breakdown with unrealized vs realized
                  gains separated
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-foreground font-bold mb-2">
                Where they fall short
              </h3>
              <ul className="space-y-1.5 list-none">
                <li>
                  <span className="text-accent-red mr-1">-</span> Security data is
                  always secondary — hidden in tabs, never at the point of trade
                  decision
                </li>
                <li>
                  <span className="text-accent-red mr-1">-</span> Holder concentration
                  warnings are absent or buried — critical rug-pull signal missed
                </li>
                <li>
                  <span className="text-accent-red mr-1">-</span> Mobile UX is an
                  afterthought — tiny tap targets, horizontal scroll charts,
                  modal overload
                </li>
                <li>
                  <span className="text-accent-red mr-1">-</span> No unified risk signal
                  — traders must mentally synthesize 5+ data points to assess
                  safety
                </li>
                <li>
                  <span className="text-accent-red mr-1">-</span> Pump.fun / BonkBot
                  assume technical users — onboarding is non-existent for
                  newer meme coin traders
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="text-foreground font-bold text-xs font-mono mb-2">
              Our differentiator: Trust Score
            </h3>
            <p className="text-xs font-mono text-muted leading-relaxed">
              Synthesize contract renouncement, LP lock %, honeypot detection,
              top-holder concentration, and deployer history into a single
              color-coded badge. Surface it everywhere: token cards, trading view
              header, and inline with the buy button. This is the one UX pattern
              no incumbent does well — and it directly addresses the #1 user
              anxiety in meme coin trading.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
