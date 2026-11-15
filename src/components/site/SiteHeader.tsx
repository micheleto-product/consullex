import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { ProfileModal } from "./ProfileModal";

const NAV = [
  { to: "/para-voce", label: "Para você" },
  { to: "/empresas", label: "Para empresas" },
  { to: "/especialistas", label: "Especialistas" },
  { to: "/conteudos", label: "Conteúdos" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  return (
    <>
      <div className="bg-navy text-on-dark-muted">
        <p className="container-page py-2 text-center text-support text-xs sm:text-[13px]">
          Qual é o seu maior desafio jurídico?{" "}
          <Link to="/especialistas" className="font-semibold text-gold hover:underline">
            Encontre o especialista ideal em minutos →
          </Link>
        </p>
      </div>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Link to="/" aria-label="Consullex — início">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-graphite transition-colors hover:text-navy"
                activeProps={{ className: "text-navy after:block after:h-0.5 after:bg-gold after:mt-1 after:rounded-full" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <ProfileModal>
              <Button variant="ghost" className="font-semibold text-navy">Entrar</Button>
            </ProfileModal>
            <Button variant="navy" asChild>
              <Link to="/especialistas">Encontrar advogado</Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-6 flex flex-col gap-1">
                {NAV.map((n) => (
                  <Link key={n.to} to={n.to} className="rounded-md px-3 py-3 text-base font-medium text-navy hover:bg-muted">
                    {n.label}
                  </Link>
                ))}
                <div className="mt-6 grid gap-2">
                  <ProfileModal>
                    <Button variant="outline-navy">Entrar</Button>
                  </ProfileModal>
                  <Button variant="navy" asChild>
                    <Link to="/especialistas">Encontrar advogado</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
