"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

const competitors = [
  { name: "Others", time: 4200, label: "~4.2s" },
  { name: "Fast bots", time: 2800, label: "~2.8s" },
  { name: "TrenchersAI", time: 1800, label: "<2s", highlight: true },
];

export default function SpeedSection() {
  return (
    <section
      id="speed"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="text-xs font-mono text-accent uppercase tracking-widest">
              Speed
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Built in Rust.
              <br />
              <span className="text-accent text-glow">
                Streamed from validators.
              </span>
            </h2>
            <p className="mt-5 text-muted leading-relaxed max-w-lg">
              Our backend connects directly to Solana validators via gRPC
              streaming. No middleware, no delays. New tokens are detected and
              buy transactions fire in under 2 seconds — not a claim, it&apos;s
              what the code does.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-accent">
                  <AnimatedNumber target={200} prefix="<" suffix="ms" />
                </div>
                <p className="mt-1 text-xs text-muted">Execution latency</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-green">
                  <AnimatedNumber target={15} suffix="+" />
                </div>
                <p className="mt-1 text-xs text-muted">Safety filters / trade</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">
                  <AnimatedNumber target={100} suffix="%" />
                </div>
                <p className="mt-1 text-xs text-muted">Self-custody</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">
                  <AnimatedNumber target={0} suffix="%" />
                </div>
                <p className="mt-1 text-xs text-muted">Platform fees</p>
              </div>
            </div>
          </motion.div>

          {/* Right: speed comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            <p className="text-xs font-mono text-muted uppercase tracking-widest mb-6">
              Snipe execution time
            </p>
            {competitors.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-medium ${c.highlight ? "text-accent" : "text-muted"}`}
                  >
                    {c.name}
                  </span>
                  <span
                    className={`text-sm font-mono ${c.highlight ? "text-accent" : "text-muted"}`}
                  >
                    {c.label}
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-surface-light overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(c.time / 5000) * 100}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + i * 0.15,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className={`h-full rounded-full ${
                      c.highlight
                        ? "bg-gradient-to-r from-accent to-accent-green glow-accent"
                        : "bg-border"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
            <p className="text-xs text-muted/60 mt-4">
              * Based on average time from token detection to executed buy
              transaction
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
