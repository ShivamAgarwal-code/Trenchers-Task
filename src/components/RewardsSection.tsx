"use client";

import { motion } from "framer-motion";

const tiers = [
  { name: "Bronze", multiplier: "1x", commission: "10%", color: "text-amber-600" },
  { name: "Silver", multiplier: "1.5x", commission: "15%", color: "text-zinc-400" },
  { name: "Gold", multiplier: "2x", commission: "20%", color: "text-yellow-500" },
  { name: "Platinum", multiplier: "3x", commission: "25%", color: "text-cyan-400" },
  { name: "Titan", multiplier: "5x", commission: "30%", color: "text-accent" },
];

export default function RewardsSection() {
  return (
    <section id="rewards" className="relative py-24 sm:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-green/[0.02] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent-green uppercase tracking-widest">
            Rewards
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Trade more. Earn more.
          </h2>
          <p className="mt-4 text-muted max-w-lg mx-auto">
            Actual rewards for trading. Climb tiers, earn multipliers, and stack
            referral commissions.
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-xl border border-border/50 bg-surface/50 p-5 text-center hover:border-accent/30 transition-all"
            >
              <div className={`text-2xl font-bold ${tier.color}`}>
                {tier.multiplier}
              </div>
              <div className="mt-1 text-sm font-semibold">{tier.name}</div>
              <div className="mt-3 text-xs text-muted">
                <span className="text-accent-green font-mono">
                  {tier.commission}
                </span>{" "}
                referral
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
