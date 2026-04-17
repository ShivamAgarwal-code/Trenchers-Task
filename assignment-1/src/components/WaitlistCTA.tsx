"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      id="waitlist"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Ready to enter
          <br />
          <span className="text-accent text-glow">the trenches?</span>
        </h2>
        <p className="mt-5 text-muted max-w-md mx-auto">
          Join the waitlist for early access. First 1,000 traders get priority
          onboarding and zero fees for life.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-xl border border-accent-green/30 bg-accent-green/5 p-6"
          >
            <div className="text-accent-green font-semibold">
              You&apos;re in.
            </div>
            <p className="mt-1 text-sm text-muted">
              We&apos;ll hit your inbox when it&apos;s time. Welcome to the
              trenches.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 h-12 rounded-xl border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-colors"
            />
            <button
              type="submit"
              className="h-12 rounded-xl bg-accent px-6 text-sm font-bold text-background hover:brightness-110 glow-accent transition-all whitespace-nowrap"
            >
              Join Waitlist
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-muted/50">
          No spam. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
