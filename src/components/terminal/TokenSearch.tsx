"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TokenResult {
  name: string;
  ticker: string;
  price: string;
  change: number;
  trustScore: number;
  mcap: string;
}

const MOCK_TOKENS: TokenResult[] = [
  { name: "Trenchy", ticker: "TRENCHY", price: "$0.000452", change: 34.7, trustScore: 82, mcap: "$452K" },
  { name: "Bonk", ticker: "BONK", price: "$0.0000234", change: -5.2, trustScore: 91, mcap: "$1.8B" },
  { name: "dogwifhat", ticker: "WIF", price: "$2.34", change: 12.1, trustScore: 88, mcap: "$2.3B" },
  { name: "Popcat", ticker: "POPCAT", price: "$0.89", change: -2.8, trustScore: 76, mcap: "$870M" },
  { name: "Book of Meme", ticker: "BOME", price: "$0.012", change: 8.4, trustScore: 65, mcap: "$780M" },
  { name: "Myro", ticker: "MYRO", price: "$0.14", change: -15.3, trustScore: 42, mcap: "$140M" },
];

function TrustDot({ score }: { score: number }) {
  const color = score >= 80 ? "bg-accent-green" : score >= 50 ? "bg-yellow-400" : "bg-accent-red";
  return <div className={`w-1.5 h-1.5 rounded-full ${color}`} />;
}

export default function TokenSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const filtered = query
    ? MOCK_TOKENS.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.ticker.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_TOKENS;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 right-0 bg-surface border-b border-border shadow-2xl z-50"
    >
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 py-3">
        {/* Search input */}
        <div className="relative mb-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search token name or address..."
            className="w-full bg-background border border-border rounded-lg pl-9 pr-16 py-2.5 text-sm font-mono text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted/50 bg-surface-light px-1.5 py-0.5 rounded border border-border">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="space-y-0.5 max-h-[300px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-6 text-xs font-mono text-muted">
              No tokens found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((token) => (
              <button
                key={token.ticker}
                onClick={onClose}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-light transition-colors text-left group"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold shrink-0">
                  {token.ticker.slice(0, 2)}
                </div>
                {/* Name + ticker */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-foreground truncate">
                      {token.name}
                    </span>
                    <span className="text-xs font-mono text-muted">
                      ${token.ticker}
                    </span>
                    <TrustDot score={token.trustScore} />
                  </div>
                  <span className="text-xs font-mono text-muted">
                    MCap {token.mcap}
                  </span>
                </div>
                {/* Price + change */}
                <div className="text-right shrink-0">
                  <div className="text-sm font-mono text-foreground">{token.price}</div>
                  <div
                    className={`text-xs font-mono font-bold ${
                      token.change >= 0 ? "text-accent-green" : "text-accent-red"
                    }`}
                  >
                    {token.change >= 0 ? "+" : ""}
                    {token.change.toFixed(1)}%
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
