"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trade {
  id: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  solAmount: number;
  time: string;
  wallet: string;
}

function generateTrade(): Trade {
  const isBuy = Math.random() > 0.45;
  const solAmount = Math.random() * 5 + 0.1;
  const price = 0.00045 + (Math.random() - 0.5) * 0.00005;
  const now = new Date();
  return {
    id: Math.random().toString(36).slice(2, 10),
    type: isBuy ? "buy" : "sell",
    amount: solAmount / price,
    price,
    solAmount,
    time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`,
    wallet: `${Math.random().toString(36).slice(2, 6)}...${Math.random().toString(36).slice(2, 6)}`,
  };
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toFixed(1);
}

type TradeFilter = "all" | "buy" | "sell";

export default function RecentTrades() {
  const [trades, setTrades] = useState<Trade[]>(() =>
    Array.from({ length: 15 }, generateTrade)
  );
  const [flashId, setFlashId] = useState<string | null>(null);
  const [filter, setFilter] = useState<TradeFilter>("all");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addTrade = useCallback(() => {
    const newTrade = generateTrade();
    setFlashId(newTrade.id);
    setTrades((prev) => [newTrade, ...prev.slice(0, 24)]);
    setTimeout(() => setFlashId(null), 600);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(addTrade, 1500 + Math.random() * 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [addTrade]);

  const filteredTrades = filter === "all" ? trades : trades.filter((t) => t.type === filter);
  const buyCount = trades.filter((t) => t.type === "buy").length;
  const sellCount = trades.length - buyCount;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="border border-border rounded-xl bg-surface flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-mono font-bold text-foreground">
            Recent Trades
          </h3>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-live-pulse" />
            <span className="text-[10px] font-mono text-muted">LIVE</span>
          </div>
        </div>
        {/* Filter tabs */}
        <div className="flex items-center gap-0.5 bg-background rounded-md p-0.5">
          {(["all", "buy", "sell"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase transition-colors ${
                filter === f
                  ? f === "buy"
                    ? "bg-accent-green/15 text-accent-green"
                    : f === "sell"
                      ? "bg-accent-red/15 text-accent-red"
                      : "bg-surface-light text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f}
              {f !== "all" && (
                <span className="ml-0.5 opacity-60">
                  {f === "buy" ? buyCount : sellCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Buy/sell pressure bar */}
      <div className="px-3 sm:px-4 py-1.5 border-b border-border/50 flex items-center gap-2">
        <div className="flex-1 h-1 bg-background rounded-full overflow-hidden flex">
          <motion.div
            className="h-full bg-accent-green"
            animate={{ width: `${(buyCount / trades.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="h-full bg-accent-red"
            animate={{ width: `${(sellCount / trades.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-[10px] font-mono text-muted whitespace-nowrap">
          <span className="text-accent-green">{((buyCount / trades.length) * 100).toFixed(0)}%</span>
          {" / "}
          <span className="text-accent-red">{((sellCount / trades.length) * 100).toFixed(0)}%</span>
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[50px_1fr_70px_54px] sm:grid-cols-[60px_1fr_80px_60px] px-3 sm:px-4 py-1.5 text-[10px] font-mono text-muted/60 uppercase tracking-wider border-b border-border/50">
        <span>Type</span>
        <span>Amount</span>
        <span className="text-right">SOL</span>
        <span className="text-right">Time</span>
      </div>

      {/* Trades list */}
      <div className="flex-1 overflow-y-auto max-h-[350px] sm:max-h-[400px]">
        <AnimatePresence initial={false}>
          {filteredTrades.map((trade) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor:
                  flashId === trade.id
                    ? trade.type === "buy"
                      ? "rgba(0, 230, 118, 0.08)"
                      : "rgba(255, 61, 87, 0.08)"
                    : "transparent",
              }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-[50px_1fr_70px_54px] sm:grid-cols-[60px_1fr_80px_60px] px-3 sm:px-4 py-2 sm:py-1.5 text-xs font-mono border-b border-border/30 hover:bg-surface-light/50 transition-colors"
            >
              <span
                className={`font-bold uppercase ${
                  trade.type === "buy" ? "text-accent-green" : "text-accent-red"
                }`}
              >
                {trade.type}
              </span>
              <span className="text-foreground truncate">
                {formatNumber(trade.amount)} <span className="text-muted">tkn</span>
              </span>
              <span className="text-right text-foreground">
                {trade.solAmount.toFixed(2)}
              </span>
              <span className="text-right text-muted">{trade.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
