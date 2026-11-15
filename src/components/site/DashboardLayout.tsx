import { Link } from "@tanstack/react-router";
import { Bell, LogOut, Menu, Search, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";

export type NavItem = { id: string; label: string; icon: LucideIcon; badge?: number };

export function DashboardLayout({
  nav,
  active,
  onNavigate,
  user,
  children,
}: {
  nav: NavItem[];
  active: string;
  onNavigate: (id: string) => void;
  user: { name: string; subtitle: string; initials: string };
  children: ReactNode;
}) {
  const navList = (
    <nav className="flex flex-col gap-1">
      {nav.map((n) => (
        <button
          key={n.id}
          onClick={() => onNavigate(n.id)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active === n.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"}`}
        >
          <n.icon className={`h-4 w-4 ${active === n.id ? "text-gold" : ""}`} />
          <span className="flex-1 text-left">{n.label}</span>
          {n.badge ? <span className="rounded-full bg-gold px-1.5 text-[11px] font-semibold text-navy">{n.badge}</span> : null}
        </button>
      ))}
    </nav>
  );

  const sidebar = (
    <div className="flex h-full flex-col bg-sidebar p-5">
      <Link to="/" className="px-2"><Logo tone="light" /></Link>
      <div className="mt-8 flex-1">{navList}</div>
      <div className="rounded-xl border border-sidebar-border p-3">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-sm font-semibold text-navy">{user.initials}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-sidebar-accent-foreground">{user.name}</p>
            <p className="truncate text-xs text-sidebar-foreground">{user.subtitle}</p>
          </div>
          <Link to="/" aria-label="Sair" className="text-sidebar-foreground hover:text-gold"><LogOut className="h-4 w-4" /></Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 hidden h-screen lg:block">{sidebar}</aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/90 px-5 backdrop-blur lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden" aria-label="Abrir menu"><Menu className="h-5 w-5 text-navy" /></button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-0 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              {sidebar}
            </SheetContent>
          </Sheet>
          <label className="hidden max-w-sm flex-1 items-center gap-2 rounded-lg bg-muted px-3 sm:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Buscar consultas, documentos..." className="h-9 w-full bg-transparent text-sm outline-none" />
          </label>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative rounded-full p-2 text-navy hover:bg-muted" aria-label="Notificações">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold" />
            </button>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-sm font-semibold text-gold">{user.initials}</span>
          </div>
        </header>
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, hint }: { icon: LucideIcon; label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-navy"><Icon className="h-4 w-4" /></span>
      </div>
      <p className="mt-3 text-3xl font-semibold text-navy">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Panel({ title, action, children, className = "" }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-6 ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-navy">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function StatusBadge({ status }: { status: "Confirmada" | "Concluída" | "Pago" | "Em aberto" | "Em andamento" | "Novo" | "Vencida" }) {
  const map: Record<string, string> = {
    Confirmada: "bg-info/10 text-info",
    "Em andamento": "bg-info/10 text-info",
    Novo: "bg-navy text-on-dark",
    Concluída: "bg-emerald-bright/10 text-emerald-bright",
    Pago: "bg-emerald-bright/10 text-emerald-bright",
    "Em aberto": "bg-warning/15 text-graphite",
    Vencida: "bg-destructive/10 text-destructive",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${map[status]}`}>{status}</span>;
}

export function SettingRow({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border py-4 last:border-0">
      <div>
        <p className="font-medium text-navy">{title}</p>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
      {children}
    </div>
  );
}
