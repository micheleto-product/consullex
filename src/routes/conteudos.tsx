import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, FileText, GraduationCap, Library, PlayCircle, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero } from "@/components/site/PageHero";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { POSTS } from "@/lib/data";
import { isValidEmail } from "@/lib/validators";

export const Route = createFileRoute("/conteudos")({
  head: () => ({
    meta: [
      { title: "Conteúdos jurídicos e blog | Consullex" },
      { name: "description", content: "Artigos, guias, glossário, vídeos e e-books para entender seus direitos com linguagem simples." },
      { property: "og:title", content: "Conteúdos jurídicos e blog | Consullex" },
      { property: "og:description", content: "Informação jurídica clara para pessoas e empresas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Content,
});

const LIBRARY = [
  { icon: FileText, t: "Artigos", d: "Explicações práticas sobre temas do dia a dia." },
  { icon: BookOpen, t: "Guia jurídico", d: "Passo a passo para situações comuns." },
  { icon: Library, t: "Glossário", d: "Termos jurídicos traduzidos para o português claro." },
  { icon: PlayCircle, t: "Vídeos", d: "Especialistas explicando em poucos minutos." },
  { icon: GraduationCap, t: "E-books", d: "Materiais completos para baixar." },
  { icon: Calendar, t: "Eventos e webinars", d: "Encontros ao vivo com advogados convidados." },
];

const CATS = ["Todos", "Artigo", "Guia", "Vídeo"] as const;

function Content() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("Todos");
  const [email, setEmail] = useState("");
  const posts = POSTS.filter((p) => cat === "Todos" || p.category === cat);
  return (
    <SiteShell>
      <PageHero eyebrow="Biblioteca e blog" title="Conteúdos para informar e educar" text="Novidades, guias e orientações do mundo jurídico, sem jargões e com responsabilidade." />
      <section className="py-20">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LIBRARY.map((l) => (
            <div key={l.t} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-navy"><l.icon className="h-5 w-5" /></span>
              <div><h3 className="font-semibold text-navy">{l.t}</h3><p className="mt-1 text-support text-sm text-muted-foreground">{l.d}</p></div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-navy">Artigos recentes</h2>
            <div className="flex gap-2">
              {CATS.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${cat === c ? "bg-navy text-on-dark" : "bg-card text-graphite hover:text-navy"}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <article key={p.slug} className="overflow-hidden rounded-2xl border border-border bg-card">
                <img src={p.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs text-muted-foreground"><span className="font-semibold text-gold">{p.category}</span> · {p.readTime} · {p.date}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-navy">{p.title}</h3>
                  <p className="mt-2 text-support text-sm text-muted-foreground">{p.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-night-glow p-10 text-on-dark md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Receba conteúdos no seu e-mail</h2>
              <p className="mt-2 text-support text-sm text-on-dark-muted">Uma newsletter por mês. Sem spam.</p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); if (!isValidEmail(email)) { toast.error("Informe um e-mail válido."); return; } toast.success("Inscrição confirmada!"); setEmail(""); }}
              className="flex w-full gap-2 md:w-auto"
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="seu@email.com" className="h-11 bg-card text-navy md:w-72" />
              <Button type="submit" variant="gold" size="lg">Inscrever</Button>
            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
