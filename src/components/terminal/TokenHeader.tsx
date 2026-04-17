"use client";

import { motion } from "framer-motion";

interface TokenHeaderProps {
  name: string;
  ticker: string;
  price: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  liquidity: string;
  trustScore: number;
}

function TrustBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "text-accent-green border-accent-green/30 bg-accent-green/5"
      : score >= 50
        ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/5"
        : "text-accent-red border-accent-red/30 bg-accent-red/5";

  const label = score >= 80 ? "HIGH" : score >= 50 ? "MED" : "LOW";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className={`flex items-center gap-1.5 border rounded-md px-2 py-1 text-xs font-mono font-bold ${color}`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          score >= 80
            ? "bg-accent-green"
            : score >= 50
              ? "bg-yellow-400"
              : "bg-accent-red"
        } animate-live-pulse`}
      />
      <span className="hidden xs:inline">TRUST</span> {label} {score}
    </motion.div>
  );
}

function formatPrice(price: number): string {
  if (price < 0.00001) return price.toExponential(2);
  if (price < 0.01) return price.toFixed(6);
  if (price < 1) return price.toFixed(4);
  return price.toFixed(2);
}

export default function TokenHeader({
  name,
  ticker,
  price,
  change24h,
  marketCap,
  volume24h,
  liquidity,
  trustScore,
}: TokenHeaderProps) {
  const isPositive = change24h >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-border rounded-xl bg-surface p-3 sm:p-4"
    >
      {/* Top row: identity + price */}
      <div className="flex items-start sm:items-center justify-between gap-3 mb-3 sm:mb-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-xs sm:text-sm shrink-0">
            {ticker.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground font-bold text-base sm:text-lg truncate">{name}</h1>
              <span className="text-muted text-xs sm:text-sm font-mono">${ticker}</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <TrustBadge score={trustScore} />
              <span className="text-muted text-[10px] sm:text-xs font-mono">SOL/Raydium</span>
            </div>
          </div>
        </div>

        {/* Price — always visible */}
        <div className="text-right shrink-0">
          <span className="text-xl sm:text-2xl font-bold font-mono text-foreground">
            ${formatPrice(price)}
          </span>
          <div
            className={`text-xs sm:text-sm font-mono font-bold ${
              isPositive ? "text-accent-green" : "text-accent-red"
            }`}
          >
            {isPositive ? "+" : ""}
            {change24h.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Stats row — scrollable on mobile */}
      <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-muted mt-3 pt-3 border-t border-border/50 overflow-x-auto scrollbar-hide">
        {[
          { label: "MCap", value: marketCap },
          { label: "24h Vol", value: volume24h },
          { label: "Liq", value: liquidity },
          { label: "Holders", value: "2,847" },
          { label: "Txns (24h)", value: "12.4K" },
        ].map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-3 shrink-0">
            {i > 0 && <div className="w-px h-5 bg-border" />}
            <div>
              <div className="text-muted/60 uppercase tracking-wider text-[10px]">{stat.label}</div>
              <div className="text-foreground whitespace-nowrap">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
