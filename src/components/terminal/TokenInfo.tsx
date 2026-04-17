"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SecurityCheck {
  label: string;
  passed: boolean;
  tooltip: string;
}

const SECURITY_CHECKS: SecurityCheck[] = [
  { label: "Contract Renounced", passed: true, tooltip: "Deployer has renounced ownership" },
  { label: "LP Burned", passed: true, tooltip: "Liquidity pool tokens have been burned" },
  { label: "No Mint Function", passed: true, tooltip: "No ability to mint new tokens" },
  { label: "Not a Honeypot", passed: true, tooltip: "Token can be freely bought and sold" },
  { label: "Top 10 < 30%", passed: false, tooltip: "Top 10 holders own more than 30% of supply" },
];

const TOKEN_INFO = {
  contract: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  deployer: "4rZm...8Hqn",
  deployDate: "2025-04-15",
  totalSupply: "1,000,000,000",
  holders: "2,847",
  lpLocked: "95%",
  lpValue: "$142K",
  website: "trenchers.ai",
  twitter: "@TrenchersAI",
  telegram: "t.me/TrenchersAI",
};

export default function TokenInfo() {
  const [copied, setCopied] = useState(false);
  const [hoveredCheck, setHoveredCheck] = useState<number | null>(null);

  const copyAddress = () => {
    navigator.clipboard.writeText(TOKEN_INFO.contract).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const passedCount = SECURITY_CHECKS.filter((c) => c.passed).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className="border border-border rounded-xl bg-surface flex flex-col"
    >
      {/* Security Section */}
      <div className="p-3 sm:p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-mono font-bold text-foreground">
            Security
          </h3>
          <span
            className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              passedCount >= 4
                ? "text-accent-green bg-accent-green/10"
                : passedCount >= 3
                  ? "text-yellow-400 bg-yellow-400/10"
                  : "text-accent-red bg-accent-red/10"
            }`}
          >
            {passedCount}/{SECURITY_CHECKS.length} passed
          </span>
        </div>
        <div className="space-y-1.5">
          {SECURITY_CHECKS.map((check, i) => (
            <div
              key={check.label}
              className="relative flex items-center justify-between text-xs font-mono py-0.5 group"
              onMouseEnter={() => setHoveredCheck(i)}
              onMouseLeave={() => setHoveredCheck(null)}
            >
              <span className="text-muted group-hover:text-foreground transition-colors">
                {check.label}
              </span>
              <span
                className={
                  check.passed ? "text-accent-green" : "text-accent-red"
                }
              >
                {check.passed ? "\u2713" : "\u2717"}
              </span>
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredCheck === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute left-0 -top-7 bg-background border border-border rounded px-2 py-1 text-[10px] text-foreground whitespace-nowrap z-10 pointer-events-none"
                  >
                    {check.tooltip}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Info */}
      <div className="p-3 sm:p-4 border-b border-border">
        <h3 className="text-sm font-mono font-bold text-foreground mb-3">
          Contract
        </h3>
        <button
          onClick={copyAddress}
          className="w-full flex items-center gap-2 bg-background rounded-lg px-3 py-2.5 sm:py-2 text-xs font-mono text-muted hover:text-foreground transition-colors group active:scale-[0.98]"
        >
          <span className="truncate flex-1 text-left">
            {TOKEN_INFO.contract}
          </span>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`shrink-0 text-[10px] font-bold ${copied ? "text-accent-green" : "text-accent"}`}
          >
            {copied ? "COPIED!" : "COPY"}
          </motion.span>
        </button>
        <div className="mt-3 space-y-2">
          {[
            ["Deployer", TOKEN_INFO.deployer],
            ["Deployed", TOKEN_INFO.deployDate],
            ["Supply", TOKEN_INFO.totalSupply],
            ["Holders", TOKEN_INFO.holders],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between text-xs font-mono"
            >
              <span className="text-muted">{label}</span>
              <span className="text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Liquidity */}
      <div className="p-3 sm:p-4 border-b border-border">
        <h3 className="text-sm font-mono font-bold text-foreground mb-3">
          Liquidity
        </h3>
        <div className="space-y-2">
          {[
            ["LP Locked", TOKEN_INFO.lpLocked],
            ["LP Value", TOKEN_INFO.lpValue],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between text-xs font-mono"
            >
              <span className="text-muted">{label}</span>
              <span className="text-foreground">{value}</span>
            </div>
          ))}
          {/* LP lock bar */}
          <div className="w-full h-1.5 bg-background rounded-full overflow-hidden mt-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "95%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-accent-green rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className="p-3 sm:p-4">
        <h3 className="text-sm font-mono font-bold text-foreground mb-3">
          Links
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Website", value: TOKEN_INFO.website },
            { label: "Twitter", value: TOKEN_INFO.twitter },
            { label: "Telegram", value: TOKEN_INFO.telegram },
          ].map((link) => (
            <span
              key={link.label}
              className="px-2.5 py-1.5 sm:py-1 rounded-md bg-background text-xs font-mono text-muted border border-border hover:text-accent hover:border-accent/30 transition-colors cursor-pointer active:scale-[0.97]"
            >
              {link.label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
