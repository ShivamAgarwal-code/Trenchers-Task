"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRINCIPLES = [
  {
    title: "Density without chaos.",
    body: "Terminals like GMGN and Photon cram data but sacrifice scan-ability. We use spatial grouping and muted type hierarchy so the eye finds what matters \u2014 price, PnL, risk \u2014 in under 1 second.",
  },
  {
    title: "Trust through transparency.",
    body: "Rug-pull anxiety is real. Incumbents bury security data (honeypot checks, LP locks, top-holder concentration) in secondary tabs. We surface it inline, at the point of decision, right next to the buy button.",
  },
  {
    title: "Motion = information, not decoration.",
    body: "Every animation communicates state: a green flash means a fill, a shake means a rejection, a pulse means the data is live. Zero gratuitous transitions.",
  },
  {
    title: "One-hand trading on mobile.",
    body: "Most degens trade on their phones. The critical path (token \u2192 buy \u2192 confirm) must be reachable with a thumb. No pinch-zooming charts, no modals that break scroll context.",
  },
  {
    title: "The unique angle: contextual risk scoring.",
    body: 'No terminal today gives you a single, glanceable safety signal at the moment of trade. We synthesize holder concentration, LP lock status, contract renouncement, and honeypot checks into one color-coded risk badge \u2014 the "Trust Score" \u2014 visible on every token card and at the top of every trading view.',
  },
];

export default function DesignPhilosophy() {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-accent/20 rounded-xl bg-accent/[0.02] overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left group"
      >
        <div className="flex items-center gap-2">
          <h2 className="text-accent font-mono text-sm font-bold tracking-wider uppercase">
            Design Philosophy
          </h2>
          <span className="text-[10px] font-mono text-muted bg-surface-light px-2 py-0.5 rounded">
            5 principles
          </span>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          className={`text-muted group-hover:text-foreground transition-all ${expanded ? "rotate-180" : ""}`}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3">
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="text-sm text-muted leading-relaxed font-mono"
                >
                  <span className="text-foreground font-semibold">
                    {i + 1}. {p.title}
                  </span>{" "}
                  {p.body}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
