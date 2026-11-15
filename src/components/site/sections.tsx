import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BadgeCheck, Lock, Quote, Scale, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AREAS, CLIENT_LOGOS, FAQ, POSTS, TESTIMONIALS, type Area } from "@/lib/data";
import { LeadForm } from "./LeadForm";
import { SectionHeading } from "./Section";

export function LogosStrip({ title = "Empresas que garantem segurança jurídica com a Consullex" }: { title?: string }) {
  return (
    <section className="border-y border-border bg-card">
      <div className="container-page py-10">
        <p className="text-center text-support text-sm text-muted-foreground">{title}</p>
        <div className="mt-6 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {CLIENT_LOGOS.map((l) => (
            <div key={l} className="text-center text-lg font-semibold tracking-tight text-navy/45 transition-colors hover:text-navy">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsBand({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line-dark lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.value} className="bg-navy p-6 sm:p-8">
          <p className="text-4xl font-semibold text-gold sm:text-5xl">{s.value}</p>
          <p className="mt-3 text-support text-sm leading-relaxed text-on-dark-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function AreasGrid({ filter }: { filter?: Area["audience"] }) {
  const areas = filter ? AREAS.filter((a) => a.audience === filter || a.audience === "ambos") : AREAS;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((a) => (
        <Link
          key={a.slug}
          to="/especialistas"
          search={{ area: a.slug }}
          className="group flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-soft"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-navy transition-colors group-hover:bg-navy group-hover:text-gold">
            <a.icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span>
            <span className="block font-semibold text-navy">{a.name}</span>
            <span className="mt-1 block text-support text-sm leading-relaxed text-muted-foreground">{a.short}</span>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy">
              Ver especialistas <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i] ?? TESTIMONIALS[0]!;
  const go = (d: number) => setI((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  return (
    <section className="bg-night-glow py-24 text-on-dark">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading tone="light" eyebrow="Depoimentos" title="O que dizem quem já conta com a Consullex" />
          <div className="mt-8 flex gap-2">
            <Button variant="outline-light" size="icon" onClick={() => go(-1)} aria-label="Anterior"><ArrowLeft /></Button>
            <Button variant="outline-light" size="icon" onClick={() => go(1)} aria-label="Próximo"><ArrowRight /></Button>
          </div>
        </div>
        <figure key={i} className="animate-rise rounded-3xl border border-line-dark bg-night/60 p-8 sm:p-12 lg:col-span-8">
          <Quote className="h-10 w-10 text-gold" />
          <blockquote className="mt-6 text-xl leading-relaxed text-on-dark sm:text-2xl">“{t.quote}”</blockquote>
          <figcaption className="mt-8 flex items-center justify-between gap-4">
            <span>
              <span className="block font-semibold">{t.name}</span>
              <span className="text-support text-sm text-on-dark-muted">{t.role}</span>
            </span>
            <span className="flex gap-1.5">
              {TESTIMONIALS.map((_, k) => (
                <button key={k} onClick={() => setI(k)} aria-label={`Depoimento ${k + 1}`} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-3 bg-on-dark/30"}`} />
              ))}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function EthicsSection() {
  const items = [
    { icon: BadgeCheck, title: "Advogados verificados", text: "Inscrição ativa na OAB, formação e experiência conferidas antes de entrar na plataforma." },
    { icon: Scale, title: "Padrão ético OAB", text: "Sem captação irregular e sem promessas de resultado. Informação clara e honorários transparentes." },
    { icon: Lock, title: "Sigilo e LGPD", text: "Criptografia de ponta a ponta e documentos compartilhados apenas com o profissional escolhido." },
  ];
  return (
    <section className="py-24">
      <div className="container-page grid items-center gap-12 rounded-3xl border border-border bg-ivory/60 p-8 sm:p-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-card px-3 py-1.5 text-xs font-semibold text-navy">
            <ShieldCheck className="h-4 w-4 text-gold" /> Em conformidade com o Código de Ética da OAB
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-tight text-navy sm:text-4xl">Segurança e ética em primeiro lugar</h2>
          <p className="mt-4 text-support leading-relaxed text-muted-foreground">
            Acreditamos que o direito deve ser acessível, ético e humano. Tecnologia é o meio, pessoas são o propósito.
          </p>
          <Button variant="outline-navy" className="mt-6" asChild><Link to="/sobre">Como escolhemos os advogados</Link></Button>
        </div>
        <div className="grid gap-4 lg:col-span-7">
          {items.map((it) => (
            <div key={it.title} className="flex gap-4 rounded-2xl bg-card p-5 shadow-soft">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold"><it.icon className="h-5 w-5" /></span>
              <div>
                <h3 className="font-semibold text-navy">{it.title}</h3>
                <p className="mt-1 text-support text-sm leading-relaxed text-muted-foreground">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ items = FAQ }: { items?: { q: string; a: string }[] }) {
  return (
    <section className="py-24">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Dúvidas frequentes" title="Perguntas frequentes" description="Não encontrou o que procurava? Fale com a gente." />
          <Button variant="outline-navy" className="mt-6" asChild><Link to="/ajuda">Central de ajuda</Link></Button>
        </div>
        <Accordion type="single" collapsible className="lg:col-span-8">
          {items.map((f, k) => (
            <AccordionItem key={f.q} value={`f${k}`}>
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-navy hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-support text-[15px] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function BlogSection() {
  return (
    <section className="bg-surface py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Conteúdos" title="Informação clara para decidir melhor" />
          <Button variant="outline-navy" asChild><Link to="/conteudos">Ver todos os conteúdos</Link></Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <Link key={p.slug} to="/conteudos" className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lift">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.image} alt="" loading="lazy" width={1024} height={640} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium text-muted-foreground"><span className="font-semibold text-gold">{p.category}</span> · {p.readTime}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-navy">{p.title}</h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy">
                  {p.category === "Vídeo" ? "Assistir agora" : "Ler mais"} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LeadSection({
  title = "Empresas líderes sabem a importância da segurança jurídica",
  text = "Vá além de um escritório tradicional e conte com um parceiro que une tecnologia, dados e advogados especialistas para prevenir riscos.",
}: { title?: string; text?: string }) {
  return (
    <section id="demonstracao" className="relative overflow-hidden bg-navy py-24 text-on-dark">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Vamos conversar</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-[2.5rem] sm:leading-[1.15]">{title}</h2>
          <p className="mt-5 max-w-lg text-support leading-relaxed text-on-dark-muted">{text}</p>
          <ul className="mt-8 space-y-3 text-sm">
            {["Diagnóstico jurídico inicial sem custo", "Planos sob medida para o tamanho da sua empresa", "Conformidade com LGPD e legislação trabalhista"].map((t) => (
              <li key={t} className="flex items-center gap-3"><BadgeCheck className="h-5 w-5 text-gold" /> {t}</li>
            ))}
          </ul>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
