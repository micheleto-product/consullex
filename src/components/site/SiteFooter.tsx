import { Link, type LinkProps } from "@tanstack/react-router";
import { Clock, Mail, ShieldCheck } from "lucide-react";

import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-on-dark-muted">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-support text-sm leading-relaxed">{SITE.tagline}</p>
          <div className="mt-6 space-y-2 text-sm">
            <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" /> {SITE.hours}</p>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-on-dark"><Mail className="h-4 w-4 text-gold" /> {SITE.email}</a>
          </div>
        </div>
        <FooterCol title="Para você" links={[["/para-voce", "Como funciona"], ["/especialistas", "Encontrar advogado"], ["/cadastro", "Criar conta"]]} />
        <FooterCol title="Para empresas" links={[["/empresas", "Benefício jurídico"], ["/empresas", "Agendar demonstração"], ["/entrar", "Painel da empresa"]]} />
        <FooterCol title="Institucional" links={[["/sobre", "Quem somos"], ["/sobre", "Ética e OAB"], ["/conteudos", "Conteúdos e blog"]]} />
        <FooterCol title="Suporte" links={[["/ajuda", "Central de ajuda"], ["/privacidade", "Política de privacidade"], ["/termos", "Termos de uso"]]} />
      </div>
      <div className="border-t border-line-dark">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© 2026 Consullex. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2 tracking-[0.14em] uppercase">
            <ShieldCheck className="h-4 w-4 text-gold" /> Ético · Seguro · Em conformidade com a <span className="text-gold">OAB</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [NonNullable<LinkProps["to"]>, string][] }) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-sm font-semibold text-on-dark">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map(([to, label]) => (
          <li key={label}>
            <Link to={to} className="hover:text-gold">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
