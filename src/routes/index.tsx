import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2, CalendarCheck, CheckCircle2, Search, ShieldCheck, Star, UserRound, Video } from "lucide-react";
import { useState } from "react";

import heroImg from "@/assets/hero-consulta.jpg";
import { LawyerCard } from "@/components/site/LawyerCard";
import { SectionHeading } from "@/components/site/Section";
import { SiteShell } from "@/components/site/SiteShell";
import {
  AreasGrid,
  BlogSection,
  EthicsSection,
  FaqSection,
  LeadSection,
  LogosStrip,
  StatsBand,
  TestimonialsSection,
} from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { AREAS, LAWYERS } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Consullex — Encontre o advogado ideal com ética e tecnologia" },
      { name: "description", content: "Conectamos você e sua empresa a advogados especialistas verificados pela OAB. Consultas online ou presenciais, com transparência e segurança." },
      { property: "og:title", content: "Consullex — Encontre o advogado ideal com ética e tecnologia" },
      { property: "og:description", content: "Advogados especialistas verificados, consultas online ou presenciais e preços transparentes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

type Audience = "pf" | "pj";

const HERO = {
  pf: {
    badge: "Atendimento jurídico humano e digital",
    title: "Segurança jurídica é para toda pessoa",
    text: "Encontre advogados especialistas verificados, compare perfis e agende sua consulta online ou presencial — com preço claro desde o início.",
  },
  pj: {
    badge: "O benefício jurídico para sua empresa",
    title: "Segurança jurídica é para todo negócio",
    text: "Da consultoria preventiva à resolução de conflitos: tecnologia, dados e especialistas para sua empresa crescer com tranquilidade.",
  },
};

function Home() {
  const [aud, setAud] = useState<Audience>("pf");
  const [area, setArea] = useState("");
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const h = HERO[aud];

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-soft" role="tablist">
              {(["pf", "pj"] as const).map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={aud === k}
                  onClick={() => setAud(k)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${aud === k ? "bg-navy text-on-dark" : "text-graphite hover:text-navy"}`}
                >
                  {k === "pf" ? <UserRound className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                  {k === "pf" ? "Para você" : "Para sua empresa"}
                </button>
              ))}
            </div>
            <div key={aud} className="animate-rise">
              <p className="mt-8 eyebrow">{h.badge}</p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.08] text-navy sm:text-5xl lg:text-[3.5rem]">{h.title}</h1>
              <p className="mt-5 max-w-xl text-support text-lg leading-relaxed text-muted-foreground">{h.text}</p>
            </div>

            {aud === "pf" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate({ to: "/especialistas", search: { area: area || undefined, q: q || undefined } });
                }}
                className="mt-8 flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-lift sm:flex-row"
              >
                <label className="flex min-w-0 flex-[2] items-center gap-2 px-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex.: divórcio, contrato, voo" className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                </label>
                <select value={area} onChange={(e) => setArea(e.target.value)} className="h-11 rounded-lg border border-border bg-surface px-3 text-sm text-graphite outline-none sm:w-40" aria-label="Área jurídica">
                  <option value="">Todas as áreas</option>
                  {AREAS.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
                </select>
                <Button type="submit" variant="gold" size="lg">Encontrar advogado</Button>
              </form>
            ) : (
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="gold" size="xl" asChild><a href="#demonstracao">Agendar demonstração</a></Button>
                <Button variant="outline-navy" size="xl" asChild><Link to="/empresas">Conhecer soluções</Link></Button>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Advogados verificados pela OAB</span>
              <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 fill-gold text-gold" /> 4,9 de média em 12 mil avaliações</span>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
              <img src={heroImg} alt="Cliente em consulta online com advogado" width={1280} height={1408} className="aspect-[4/4.4] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            </div>
            <div className="animate-float absolute -left-4 top-10 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-lift sm:-left-10">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald text-on-dark"><CalendarCheck className="h-5 w-5" /></span>
              <span>
                <span className="block text-sm font-semibold text-navy">Consulta confirmada!</span>
                <span className="text-xs text-muted-foreground">Hoje, 10h00 · Videochamada</span>
              </span>
            </div>
            <div className="absolute -bottom-6 right-4 flex items-center gap-4 rounded-2xl bg-navy p-4 text-on-dark shadow-lift sm:-right-6">
              <QrMock />
              <span className="max-w-[9rem] text-support text-xs leading-snug text-on-dark-muted">
                <span className="block text-sm font-semibold text-on-dark">Baixe o app</span>
                Escaneie o QR code e leve a Consullex no bolso.
              </span>
            </div>
            <div className="absolute bottom-24 left-6 hidden items-center gap-2 rounded-full bg-card/95 px-3 py-2 text-xs font-semibold text-navy shadow-soft sm:flex">
              <Video className="h-4 w-4 text-gold" /> 1.600+ especialistas online
            </div>
          </div>
        </div>
      </section>

      <LogosStrip />

      {/* Como funciona */}
      <HowItWorks />

      {/* Métricas */}
      <section className="bg-navy py-24 text-on-dark">
        <div className="container-page">
          <SectionHeading tone="light" eyebrow="Impacto" title="Cuidamos da segurança jurídica com tecnologia e dados" description="Resultados medidos com clientes e empresas parceiras em 2026." />
          <div className="mt-12">
            <StatsBand
              items={[
                { value: "71%", label: "consideram a Consullex um dos 3 principais benefícios oferecidos pela empresa." },
                { value: "84%", label: "relatam mais agilidade na revisão e assinatura de contratos." },
                { value: "82%", label: "perceberam melhora na conformidade com a LGPD." },
                { value: "48h", label: "é o tempo médio entre a busca e a primeira consulta." },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Áreas */}
      <section className="py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Áreas jurídicas" title="Especialistas para cada momento da sua vida e do seu negócio" />
          <div className="mt-12"><AreasGrid /></div>
        </div>
      </section>

      {/* Advogados em destaque */}
      <section className="bg-surface py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Em destaque" title="Advogados bem avaliados e com agenda aberta" />
            <Button variant="outline-navy" asChild><Link to="/especialistas">Ver todos os especialistas</Link></Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {LAWYERS.slice(0, 3).map((l) => <LawyerCard key={l.slug} lawyer={l} />)}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <EthicsSection />
      <BlogSection />
      <FaqSection />
      <LeadSection />
    </SiteShell>
  );
}

function HowItWorks() {
  const [tab, setTab] = useState<Audience>("pf");
  const steps =
    tab === "pf"
      ? [
          { t: "Conte o que precisa", d: "Busque por área, cidade, preço ou idioma e compare perfis verificados." },
          { t: "Agende em poucos cliques", d: "Escolha data e horário na agenda do advogado, online ou presencial." },
          { t: "Receba orientação clara", d: "Converse com o especialista, envie documentos e acompanhe tudo no seu painel." },
        ]
      : [
          { t: "Diagnóstico jurídico", d: "Mapeamos riscos trabalhistas, contratuais e de LGPD da sua operação." },
          { t: "Plano sob medida", d: "Benefício para colaboradores e consultoria para a empresa, em um só lugar." },
          { t: "Gestão com dados", d: "Painel com consultas, equipe, faturas e relatórios mensais de risco." },
        ];
  return (
    <section className="py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Como funciona" title="Simples, transparente e do seu jeito" />
          <div className="inline-flex rounded-full bg-muted p-1">
            {(["pf", "pj"] as const).map((k) => (
              <button key={k} onClick={() => setTab(k)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${tab === k ? "bg-card text-navy shadow-soft" : "text-muted-foreground"}`}>
                {k === "pf" ? "Para você" : "Para sua empresa"}
              </button>
            ))}
          </div>
        </div>
        <div key={tab} className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.t} className="animate-rise relative rounded-2xl border border-border bg-card p-7" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="text-5xl font-semibold text-gold/40">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold text-navy">{s.t}</h3>
              <p className="mt-2 text-support text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              <CheckCircle2 className="absolute right-6 top-7 h-5 w-5 text-emerald-bright" />
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button variant="navy" size="lg" asChild>
            {tab === "pf" ? <Link to="/para-voce">Saiba mais para você</Link> : <Link to="/empresas">Saiba mais para empresas</Link>}
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Decorative QR-like pattern (deterministic). */
function QrMock() {
  const cells = Array.from({ length: 81 }, (_, i) => ((i * 37 + (i % 7) * 11) % 5 < 2) || [0, 1, 2, 9, 11, 18, 19, 20, 6, 7, 8, 15, 17, 24, 25, 26, 54, 55, 56, 63, 65, 72, 73, 74].includes(i));
  return (
    <span className="grid h-16 w-16 grid-cols-9 gap-px rounded-md bg-on-dark p-1.5" aria-hidden="true">
      {cells.map((on, i) => <span key={i} className={on ? "bg-navy" : "bg-on-dark"} />)}
    </span>
  );
}
