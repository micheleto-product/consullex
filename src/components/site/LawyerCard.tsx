import { Link } from "@tanstack/react-router";
import { MapPin, Monitor, Building, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { brl } from "@/lib/booking";
import type { Lawyer } from "@/lib/data";
import { Stars } from "./Section";

export function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-lift">
      <div className="flex gap-4">
        <img src={lawyer.photo} alt={lawyer.name} width={88} height={88} loading="lazy" className="h-[88px] w-[88px] shrink-0 rounded-xl object-cover" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-navy">{lawyer.name}</h3>
            {lawyer.isNew && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-navy">Novo na Consullex</span>}
          </div>
          <p className="text-support text-sm text-graphite">{lawyer.headline}</p>
          <p className="mt-1 text-xs text-muted-foreground">{lawyer.oab} · {lawyer.years} anos de experiência</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Stars value={lawyer.rating} />
            <span className="font-semibold text-navy">{lawyer.rating.toFixed(1)}</span>
            <span>({lawyer.reviews} avaliações)</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {lawyer.specialties.slice(0, 3).map((s) => (
          <span key={s} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-graphite">{s}</span>
        ))}
      </div>
      <p className="mt-4 line-clamp-3 text-support text-sm leading-relaxed text-muted-foreground">{lawyer.bio}</p>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {lawyer.city}/{lawyer.state}</span>
        <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {lawyer.sessions} atendimentos</span>
        {lawyer.modes.includes("online") && <span className="inline-flex items-center gap-1"><Monitor className="h-3.5 w-3.5" /> Online</span>}
        {lawyer.modes.includes("presencial") && <span className="inline-flex items-center gap-1"><Building className="h-3.5 w-3.5" /> Presencial</span>}
      </div>
      <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4 mt-5">
        <div>
          <p className="text-xs text-muted-foreground">Sessão de {lawyer.duration} min</p>
          <p className="text-xl font-semibold text-navy">{brl(lawyer.price)}</p>
          {lawyer.availableNow && <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-bright"><span className="h-1.5 w-1.5 rounded-full bg-emerald-bright" /> Horários esta semana</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline-navy" size="sm" asChild>
            <Link to="/especialistas/$slug" params={{ slug: lawyer.slug }}>Ver perfil</Link>
          </Button>
          <Button variant="gold" size="sm" asChild>
            <Link to="/agendar/$slug" params={{ slug: lawyer.slug }}>Agendar</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
