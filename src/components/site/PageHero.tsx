import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, text, children }: { eyebrow: string; title: ReactNode; text: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy text-on-dark">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-page relative py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-support text-lg leading-relaxed text-on-dark-muted">{text}</p>
        {children}
      </div>
    </section>
  );
}
