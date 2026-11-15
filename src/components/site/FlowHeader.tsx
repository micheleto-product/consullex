import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";

import { Logo } from "./Logo";

export function FlowHeader({ label = "Ambiente seguro" }: { label?: string }) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" aria-label="Consullex — início"><Logo /></Link>
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Lock className="h-4 w-4 text-emerald-bright" /> {label}</span>
      </div>
    </header>
  );
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2 overflow-x-auto pb-1">
      {steps.map((s, i) => (
        <li key={i} className="flex shrink-0 items-center gap-2">
          <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold transition-colors ${i < current ? "bg-emerald-bright text-on-dark" : i === current ? "bg-navy text-gold" : "bg-muted text-muted-foreground"}`}>
            {i < current ? "✓" : i + 1}
          </span>
          <span className={`text-sm ${i === current ? "font-semibold text-navy" : "text-muted-foreground"}`}>{s}</span>
          {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-border sm:w-10" />}
        </li>
      ))}
    </ol>
  );
}
