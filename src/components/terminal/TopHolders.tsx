"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Holder {
  rank: number;
  wallet: string;
  percentage: number;
  isWhale: boolean;
  isDev: boolean;
  label?: string;
}

const HOLDERS: Holder[] = [
  { rank: 1, wallet: "Raydi...umV2", percentage: 18.5, isWhale: false, isDev: false, label: "Raydium LP" },
  { rank: 2, wallet: "4rZm...8Hqn", percentage: 5.2, isWhale: false, isDev: true, label: "Deployer" },
  { rank: 3, wallet: "9kXp...3mNv", percentage: 4.8, isWhale: true, isDev: false },
  { rank: 4, wallet: "2bYq...7fWt", percentage: 3.1, isWhale: true, isDev: false },
  { rank: 5, wallet: "6nRs...1pKz", percentage: 2.9, isWhale: false, isDev: false },
  { rank: 6, wallet: "8mTw...4hJx", percentage: 2.4, isWhale: false, isDev: false },
  { rank: 7, wallet: "5jCv...9qLy", percentage: 1.8, isWhale: false, isDev: false },
  { rank: 8, wallet: "3gFd...6rNe", percentage: 1.5, isWhale: false, isDev: false },
  { rank: 9, wallet: "7pHb...2wMk", percentage: 1.2, isWhale: false, isDev: false },
  { rank: 10, wallet: "1sQa...8tUf", percentage: 0.9, isWhale: false, isDev: false },
];

export default function TopHolders() {
  const [hoveredRank, setHoveredRank] = useState<number | null>(null);
  const top10Total = HOLDERS.reduce((acc, h) => acc + h.percentage, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="border border-border rounded-xl bg-surface overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-border">
        <h3 className="text-sm font-mono font-bold text-foreground">
          Top Holders
        </h3>
        <span className="text-xs font-mono text-muted">
          Top 10:{" "}
          <span
            className={
              top10Total > 50
                ? "text-accent-red font-bold"
                : top10Total > 30
                  ? "text-yellow-400 font-bold"
                  : "text-accent-green font-bold"
            }
          >
            {top10Total.toFixed(1)}%
          </span>
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[28px_1fr_50px_50px] sm:grid-cols-[32px_1fr_60px_60px] px-3 sm:px-4 py-1.5 text-[10px] font-mono text-muted/60 uppercase tracking-wider border-b border-border/50">
        <span>#</span>
        <span>Wallet</span>
        <span className="text-right">%</span>
        <span className="text-right">Tag</span>
      </div>

      {/* Holders list */}
      <div className="max-h-[280px] sm:max-h-[300px] overflow-y-auto">
        {HOLDERS.map((holder, i) => (
          <motion.div
            key={holder.rank}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.05 * i }}
            onMouseEnter={() => setHoveredRank(holder.rank)}
            onMouseLeave={() => setHoveredRank(null)}
            className={`grid grid-cols-[28px_1fr_50px_50px] sm:grid-cols-[32px_1fr_60px_60px] px-3 sm:px-4 py-2 text-xs font-mono border-b border-border/30 transition-colors group ${
              hoveredRank === holder.rank ? "bg-surface-light/70" : "hover:bg-surface-light/50"
            }`}
          >
            <span className="text-muted">{holder.rank}</span>
            <span className="text-foreground group-hover:text-accent transition-colors cursor-pointer truncate">
              {holder.label || holder.wallet}
            </span>
            <span className="text-right text-foreground">
              {holder.percentage.toFixed(1)}%
            </span>
            <span className="text-right">
              {holder.isDev && (
                <span className="text-yellow-400 text-[10px] border border-yellow-400/30 rounded px-1 py-0.5">
                  DEV
                </span>
              )}
              {holder.isWhale && (
                <span className="text-accent text-[10px] border border-accent/30 rounded px-1 py-0.5">
                  WHALE
                </span>
              )}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Distribution bar */}
      <div className="px-3 sm:px-4 py-3 border-t border-border">
        <div className="w-full h-2 bg-background rounded-full overflow-hidden flex">
          {HOLDERS.map((holder) => (
            <motion.div
              key={holder.rank}
              initial={{ width: 0 }}
              animate={{
                width: `${holder.percentage}%`,
                opacity: hoveredRank === null || hoveredRank === holder.rank ? 1 : 0.3,
              }}
              transition={{ duration: 0.8, delay: hoveredRank !== null ? 0 : 0.1 * holder.rank }}
              className={`h-full ${
                holder.isDev
                  ? "bg-yellow-400"
                  : holder.isWhale
                    ? "bg-accent"
                    : holder.label
                      ? "bg-accent-green"
                      : "bg-muted/30"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-muted">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-accent-green" /> LP
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-yellow-400" /> Dev
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-accent" /> Whale
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-muted/30" /> Others
          </span>
        </div>
      </div>
    </motion.div>
  );
}
