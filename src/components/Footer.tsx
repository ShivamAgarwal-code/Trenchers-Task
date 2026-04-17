export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 px-4">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-accent/10 border border-accent/20">
            <span className="text-accent font-mono font-bold text-xs">T</span>
          </div>
          <span className="text-sm font-semibold">
            Trenchers<span className="text-accent">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-muted hover:text-foreground transition-colors">
            Twitter
          </a>
          <a href="#" className="text-xs text-muted hover:text-foreground transition-colors">
            Telegram
          </a>
          <a href="#" className="text-xs text-muted hover:text-foreground transition-colors">
            Discord
          </a>
          <a href="#" className="text-xs text-muted hover:text-foreground transition-colors">
            Docs
          </a>
        </div>

        <p className="text-xs text-muted/50">
          &copy; 2026 TrenchersAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
