"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUICK_AMOUNTS = [0.1, 0.25, 0.5, 1, 2, 5];
const SLIPPAGE_OPTIONS = [0.5, 1, 5, 10];

export default function TradePanel() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState(1);
  const [showSlippage, setShowSlippage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    if (!amount) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }, 1500);
  };

  const isBuy = side === "buy";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="border border-border rounded-xl bg-surface p-3 sm:p-4 flex flex-col gap-3 relative"
    >
      {/* Trade confirmation toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`absolute -top-12 left-0 right-0 mx-auto w-fit px-4 py-2 rounded-lg text-xs font-mono font-bold z-50 ${
              isBuy
                ? "bg-accent-green/15 text-accent-green border border-accent-green/30"
                : "bg-accent-red/15 text-accent-red border border-accent-red/30"
            }`}
          >
            {isBuy ? "Buy" : "Sell"} order placed for {amount} SOL
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buy / Sell toggle */}
      <div className="flex rounded-lg bg-background p-0.5 gap-0.5">
        {(["buy", "sell"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className={`flex-1 py-2.5 sm:py-2 rounded-md text-sm font-bold font-mono uppercase transition-all ${
              side === s
                ? s === "buy"
                  ? "bg-accent-green/15 text-accent-green"
                  : "bg-accent-red/15 text-accent-red"
                : "text-muted hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Quick amount buttons — larger tap targets on mobile */}
      <div className="grid grid-cols-3 gap-1.5">
        {QUICK_AMOUNTS.map((qa) => (
          <button
            key={qa}
            onClick={() => setAmount(qa.toString())}
            className="py-2 sm:py-1.5 rounded-md text-xs font-mono font-medium transition-colors border"
            style={
              amount === qa.toString()
                ? {
                    borderColor: isBuy
                      ? "rgba(0, 230, 118, 0.4)"
                      : "rgba(255, 61, 87, 0.4)",
                    backgroundColor: isBuy
                      ? "rgba(0, 230, 118, 0.1)"
                      : "rgba(255, 61, 87, 0.1)",
                    color: isBuy
                      ? "var(--accent-green)"
                      : "var(--accent-red)",
                  }
                : {
                    borderColor: "var(--border)",
                    color: "var(--muted)",
                  }
            }
          >
            {qa} SOL
          </button>
        ))}
      </div>

      {/* Custom amount input */}
      <div className="relative">
        <input
          type="number"
          placeholder="Custom amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-background border border-border rounded-lg px-3 py-3 sm:py-2.5 text-sm font-mono text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-muted">
          SOL
        </span>
      </div>

      {/* Estimated output */}
      <AnimatePresence>
        {amount && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex justify-between text-xs font-mono text-muted"
          >
            <span>Est. {isBuy ? "tokens" : "SOL"}</span>
            <span className="text-foreground">
              {isBuy
                ? (parseFloat(amount || "0") / 0.00045).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })
                : (parseFloat(amount || "0") * 0.00045).toFixed(6)}{" "}
              {isBuy ? "$TRENCHY" : "SOL"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price impact warning */}
      <AnimatePresence>
        {amount && parseFloat(amount) > 3 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-xs font-mono text-yellow-400 bg-yellow-400/5 border border-yellow-400/20 rounded-lg px-3 py-2"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L1 14h14L8 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M8 6v4M8 12v0.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            High price impact (~{(parseFloat(amount) * 0.8).toFixed(1)}%)
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slippage */}
      <div>
        <button
          onClick={() => setShowSlippage(!showSlippage)}
          className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors w-full py-1"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform ${showSlippage ? "rotate-90" : ""}`}
          >
            <path
              d="M6 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Slippage: {slippage}%
        </button>
        <AnimatePresence>
          {showSlippage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-1.5 mt-2 overflow-hidden"
            >
              {SLIPPAGE_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlippage(s)}
                  className={`flex-1 py-1.5 sm:py-1 rounded text-xs font-mono transition-colors ${
                    slippage === s
                      ? "bg-accent/15 text-accent"
                      : "bg-background text-muted hover:text-foreground"
                  }`}
                >
                  {s}%
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submit button — 48px min height for mobile touch */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        disabled={!amount || isSubmitting}
        className={`w-full py-3.5 sm:py-3 rounded-lg text-sm font-bold font-mono uppercase tracking-wider transition-all min-h-[48px] ${
          !amount
            ? "bg-surface-light text-muted cursor-not-allowed"
            : isSubmitting
              ? isBuy
                ? "bg-accent-green/20 text-accent-green"
                : "bg-accent-red/20 text-accent-red"
              : isBuy
                ? "bg-accent-green text-background hover:bg-accent-green/90"
                : "bg-accent-red text-background hover:bg-accent-red/90"
        }`}
        style={
          amount && !isSubmitting
            ? {
                boxShadow: isBuy
                  ? "0 0 20px rgba(0, 230, 118, 0.2)"
                  : "0 0 20px rgba(255, 61, 87, 0.2)",
              }
            : {}
        }
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
            Processing...
          </span>
        ) : (
          `${side} ${amount || "0"} SOL`
        )}
      </motion.button>

      {/* Wallet balance + fee estimate */}
      <div className="flex flex-col gap-1 text-xs font-mono text-muted pt-1 border-t border-border">
        <div className="flex justify-between">
          <span>Balance</span>
          <span className="text-foreground">12.45 SOL</span>
        </div>
        <div className="flex justify-between">
          <span>Est. fee</span>
          <span className="text-foreground">~0.0001 SOL</span>
        </div>
      </div>
    </motion.div>
  );
}
