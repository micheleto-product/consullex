import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "./Logo";

export function AuthLayout({ children, title, text }: { children: ReactNode; title: string; text: string }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-night-glow p-12 text-on-dark lg:flex lg:flex-col">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
        <Link to="/" className="relative"><Logo tone="light" /></Link>
        <div className="relative mt-auto max-w-md">
          <p className="eyebrow">Consullex</p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight">{title}</h2>
          <p className="mt-4 text-support leading-relaxed text-on-dark-muted">{text}</p>
          <blockquote className="mt-10 border-l-2 border-gold pl-5 text-support text-sm italic text-on-dark-muted">
            “Acreditamos que o direito deve ser acessível, ético e humano. Tecnologia é o meio, pessoas são o propósito.”
          </blockquote>
        </div>
        <p className="relative mt-12 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-on-dark-muted"><ShieldCheck className="h-4 w-4 text-gold" /> Ético · Seguro · Em conformidade com a OAB</p>
      </aside>
      <main className="flex flex-col bg-background">
        <div className="p-6 lg:hidden"><Link to="/"><Logo /></Link></div>
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8Z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.1a11 11 0 0 0 0 9.8l3.7-2.8Z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.2 1.6l3.1-3.1A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4Z" />
    </svg>
  );
}
