import { cn } from "@/lib/utils";

/** Consullex symbol: scales of justice whose stem ends in circuit nodes. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={cn("h-8 w-8", className)} aria-hidden="true">
      <g strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 16h22" className="stroke-current" />
        <path d="M36 16h20" className="stroke-gold" />
        <path d="M32 6v34" className="stroke-current" />
        <circle cx="32" cy="6" r="3" className="stroke-current" />
        <circle cx="32" cy="42" r="3" className="stroke-current" />
        <path d="M13 21 6 34h14L13 21Z" className="stroke-current" />
        <path d="M6 34a7 5 0 0 0 14 0" className="stroke-current" />
        <path d="M51 21 44 34h14l-7-13Z" className="stroke-gold" />
        <path d="M44 34a7 5 0 0 0 14 0" className="stroke-gold" />
        <path d="M27 30v22a5 5 0 0 0 5 5" className="stroke-current" />
        <path d="M37 30v22a5 5 0 0 1-5 5" className="stroke-gold" />
      </g>
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", tone === "light" ? "text-on-dark" : "text-navy", className)}>
      <LogoMark />
      <span className="wordmark text-[17px]">
        CONSULLE<span className="text-gold">X</span>
      </span>
    </span>
  );
}
