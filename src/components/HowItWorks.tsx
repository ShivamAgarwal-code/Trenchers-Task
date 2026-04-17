"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Connect",
    description: "Import your wallet or create a new one. Self-custody — your keys never leave the browser.",
  },
  {
    step: "02",
    title: "Configure",
    description: "Set your sniper filters, copy trading targets, and risk parameters. One-time setup.",
  },
  {
    step: "03",
    title: "Trade",
    description: "The bot runs 24/7. New tokens sniped, whales mirrored, positions managed. You sleep, it doesn't.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest">
            How it works
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Three steps. Zero code.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-6"
              >
                <div className="relative flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent font-mono text-sm font-bold">
                  {step.step}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
