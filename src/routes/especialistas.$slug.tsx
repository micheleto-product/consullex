import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Award, BadgeCheck, Briefcase, Building, Clock, GraduationCap, Languages, MapPin, Monitor, Play, ShieldCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Stars } from "@/components/site/Section";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { brl, slotsFor } from "@/lib/booking";
import { LAWYERS, areaName, getLawyer } from "@/lib/data";

export const Route = createFileRoute("/especialistas/$slug")({
  loader: ({ params }) => {
    const lawyer = getLawyer(params.slug);
    if (!lawyer) throw notFound();
    return { lawyer };
  },
  head: ({ loaderData }) => {
    const l = loaderData?.lawyer;
    const title = l ? `${l.name} — ${l.headline} | Consullex` : "Especialista indisponível | Consullex";
    const desc = l ? `${l.oab} · ${l.city}/${l.state}. ${l.bio}` : "Este perfil não está disponível.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(l ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-page py-32 text-center">
        <h1 className="text-3xl font-semibold text-navy">Especialista não encontrado</h1>
        <Button variant="navy" className="mt-6" asChild><Link to="/especialistas">Ver especialistas</Link></Button>
      </div>
    </SiteShell>
  ),
  component: Profile,
});

function Profile() {
  const { lawyer: l } = Route.useLoaderData();
  const seed = LAWYERS.findIndex((x) => x.slug === l.slug) + 1;
  const [days, setDays] = useState<Date[]>([]);
  useEffect(() => {
    const base = new Date();
    setDays(Array.from({ length: 4 }, (_, i) => new Date(base.getFullYear(), base.getMonth(), base.getDate() + i + 1)));
  }, []);

  return (
    <SiteShell>
      <div className="bg-navy">
        <div className="container-page py-4 text-sm text-on-dark-muted">
          <Link to="/" className="hover:text-on-dark">Início</Link> <span className="mx-2">›</span>
          <Link to="/especialistas" className="hover:text-on-dark">Especialistas</Link> <span className="mx-2">›</span>
          <span className="text-on-dark">{l.name}</span>
        </div>
      </div>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {/* Header */}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row">
              <img src={l.photo} alt={l.name} width={160} height={160} className="h-40 w-40 rounded-2xl object-cover" />
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-1 text-xs font-semibold text-emerald"><BadgeCheck className="h-3.5 w-3.5" /> Inscrição OAB verificada</span>
                <h1 className="mt-3 text-3xl font-semibold text-navy">{l.name}</h1>
                <p className="text-support text-graphite">{l.headline}</p>
                <p className="mt-1 text-sm text-muted-foreground">{l.oab} · {l.years} anos de experiência · {areaName(l.area)}</p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Stars value={l.rating} /> <span className="font-semibold text-navy">{l.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({l.reviews} avaliações)</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-graphite">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" /> {l.city}/{l.state}</span>
                  <span className="inline-flex items-center gap-1.5"><Languages className="h-4 w-4 text-gold" /> {l.languages.join(", ")}</span>
                  <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-gold" /> {l.sessions} atendimentos</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {l.specialties.map((s) => <span key={s} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-graphite">{s}</span>)}
            </div>
          </section>

          {/* Video */}
          <button
            onClick={() => toast("O vídeo de apresentação estará disponível em breve.")}
            className="group relative block w-full overflow-hidden rounded-3xl bg-navy text-left"
          >
            <img src={l.photo} alt="" className="h-64 w-full object-cover object-top opacity-50 transition-opacity group-hover:opacity-60" />
            <span className="absolute inset-0 flex items-center gap-4 p-8">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-navy shadow-gold transition-transform group-hover:scale-105"><Play className="ml-1 h-6 w-6 fill-navy" /></span>
              <span>
                <span className="block text-lg font-semibold text-on-dark">Vídeo de apresentação</span>
                <span className="text-sm text-on-dark-muted">Conheça {l.name.split(" ")[1]} em 1 minuto e meio</span>
              </span>
            </span>
          </button>

          <Block title="Sobre">
            <p className="text-support leading-relaxed text-graphite">{l.about}</p>
          </Block>

          <Block title="Formação e experiência">
            <div className="grid gap-6 sm:grid-cols-2">
              <InfoList icon={GraduationCap} title="Formação acadêmica" items={l.education} />
              <InfoList icon={Award} title="Pós-graduação e cursos" items={l.postgrad} />
              <div className="sm:col-span-2">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy"><Briefcase className="h-4 w-4 text-gold" /> Experiência profissional</p>
                <ol className="space-y-3 border-l-2 border-border pl-5">
                  {l.experience.map((e) => (
                    <li key={e.role + e.place} className="relative">
                      <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-card" />
                      <p className="font-medium text-navy">{e.role}</p>
                      <p className="text-sm text-muted-foreground">{e.place} · {e.period}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <InfoList icon={ShieldCheck} title="Comissões e entidades" items={l.commissions} />
            </div>
          </Block>

          <Block title="Avaliações">
            <div className="flex items-center gap-6 rounded-2xl bg-surface p-5">
              <p className="text-5xl font-semibold text-navy">{l.rating.toFixed(1)}</p>
              <div>
                <Stars value={l.rating} className="[&_svg]:h-5 [&_svg]:w-5" />
                <p className="mt-1 text-sm text-muted-foreground">{l.reviews} avaliações verificadas de clientes</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {l.testimonials.map((t) => (
                <figure key={t.name} className="rounded-2xl border border-border p-5">
                  <Stars value={t.rating} />
                  <blockquote className="mt-3 text-support text-sm leading-relaxed text-graphite">“{t.text}”</blockquote>
                  <figcaption className="mt-3 text-xs text-muted-foreground"><span className="font-semibold text-navy">{t.name}</span> · {t.date}</figcaption>
                </figure>
              ))}
            </div>
          </Block>
        </div>

        {/* Booking card */}
        <aside>
          <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-lift">
            <p className="text-sm text-muted-foreground">Valor da consulta</p>
            <p className="text-3xl font-semibold text-navy">{brl(l.price)}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><Clock className="h-4 w-4" /> Duração média de {l.duration} min</p>
            <div className="mt-5 space-y-2">
              <p className="text-sm font-semibold text-navy">Tipos de atendimento</p>
              {l.modes.includes("online") && <p className="flex items-center gap-2 text-sm text-graphite"><Monitor className="h-4 w-4 text-gold" /> Online por videochamada</p>}
              {l.modes.includes("presencial") && <p className="flex items-start gap-2 text-sm text-graphite"><Building className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Presencial · {l.office}</p>}
            </div>
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-navy">Próximos horários</p>
              <div className="grid grid-cols-4 gap-2">
                {days.map((d) => {
                  const slots = slotsFor(seed, d).slice(0, 3);
                  return (
                    <div key={d.toISOString()} className="text-center">
                      <p className="text-[11px] uppercase text-muted-foreground">{d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")}</p>
                      <p className="text-sm font-semibold text-navy">{d.getDate()}</p>
                      <div className="mt-2 space-y-1.5">
                        {slots.length ? slots.map((s) => (
                          <Link key={s} to="/agendar/$slug" params={{ slug: l.slug }} className="block rounded-md bg-secondary py-1.5 text-xs font-semibold text-navy hover:bg-gold">{s}</Link>
                        )) : <p className="py-1.5 text-xs text-muted-foreground">—</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Button variant="gold" size="xl" className="mt-6 w-full" asChild>
              <Link to="/agendar/$slug" params={{ slug: l.slug }}>Agendar consulta</Link>
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Cancelamento gratuito até 24h antes.</p>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <h2 className="mb-5 text-xl font-semibold text-navy">{title}</h2>
      {children}
    </section>
  );
}

function InfoList({ icon: Icon, title, items }: { icon: typeof Award; title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy"><Icon className="h-4 w-4 text-gold" /> {title}</p>
      <ul className="space-y-2 text-sm text-graphite">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}
