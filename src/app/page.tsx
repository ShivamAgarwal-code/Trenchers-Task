import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold font-mono text-accent tracking-tight">
            TRENCHERS<span className="text-foreground">AI</span>
          </h1>
          <p className="text-sm font-mono text-muted">
            Design Challenge Submissions
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/assignment-1"
            className="block border border-border rounded-xl bg-surface p-6 hover:border-accent/40 hover:bg-surface-light transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider">
                  Assignment 1
                </span>
                <h2 className="text-lg font-bold text-foreground mt-1">
                  Landing Page Revamp
                </h2>
                <p className="text-sm font-mono text-muted mt-1">
                  Hero, features, CTA &mdash; the full marketing page
                </p>
              </div>
              <span className="text-muted group-hover:text-accent transition-colors text-xl">
                &rarr;
              </span>
            </div>
          </Link>

          <Link
            href="/assignment-2"
            className="block border border-border rounded-xl bg-surface p-6 hover:border-accent/40 hover:bg-surface-light transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider">
                  Assignment 2
                </span>
                <h2 className="text-lg font-bold text-foreground mt-1">
                  Terminal Design Prototype
                </h2>
                <p className="text-sm font-mono text-muted mt-1">
                  Token trading view with Trust Score system
                </p>
              </div>
              <span className="text-muted group-hover:text-accent transition-colors text-xl">
                &rarr;
              </span>
            </div>
          </Link>
        </div>

        <p className="text-center text-xs font-mono text-muted/50">
          Built with Next.js + Tailwind + Framer Motion
        </p>
      </div>
    </div>
  );
}
