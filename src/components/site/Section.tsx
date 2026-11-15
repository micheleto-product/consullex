import { Star } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={cn("mt-3 text-3xl font-semibold leading-tight sm:text-[2.5rem] sm:leading-[1.15]", tone === "light" ? "text-on-dark" : "text-navy")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-support text-base leading-relaxed", tone === "light" ? "text-on-dark-muted" : "text-muted-foreground")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(value) ? "fill-gold text-gold" : "text-border")} />
      ))}
    </span>
  );
}
