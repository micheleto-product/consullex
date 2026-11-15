import { Link } from "@tanstack/react-router";
import { Building2, ChevronRight, UserPlus, UserRound } from "lucide-react";
import type { ReactNode } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogoMark } from "./Logo";

const optionClass =
  "group flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-soft";

export function ProfileModal({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="items-center text-center">
          <LogoMark className="h-10 w-10 text-navy" />
          <DialogTitle className="text-xl text-navy">Como você quer continuar?</DialogTitle>
          <DialogDescription>Escolha seu perfil para acessar a Consullex.</DialogDescription>
        </DialogHeader>
        <div className="mt-2 grid gap-3">
          <Link to="/entrar" search={{ perfil: "cliente" }} className={optionClass}>
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-secondary text-navy"><UserRound className="h-5 w-5" /></span>
            <span className="flex-1">
              <span className="block font-semibold text-navy">Cliente / Pessoa Física</span>
              <span className="text-support text-sm text-muted-foreground">Agendar consultas e acompanhar meus casos.</span>
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to="/entrar" search={{ perfil: "empresa" }} className={optionClass}>
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-secondary text-navy"><Building2 className="h-5 w-5" /></span>
            <span className="flex-1">
              <span className="block font-semibold text-navy">Empresa</span>
              <span className="text-support text-sm text-muted-foreground">Gerir consultorias, equipe e faturas.</span>
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to="/cadastro" className={optionClass}>
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-gold/15 text-navy"><UserPlus className="h-5 w-5" /></span>
            <span className="flex-1">
              <span className="block font-semibold text-navy">Quero me cadastrar</span>
              <span className="text-support text-sm text-muted-foreground">É simples, rápido e gratuito.</span>
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
