import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Eye, Heart, Lightbulb, Scale, ShieldCheck, Target, Users } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/Section";
import { SiteShell } from "@/components/site/SiteShell";
import { EthicsSection } from "@/components/site/sections";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Quem somos — ética, segurança e tecnologia | Consullex" },
      { name: "description", content: "Conheça a Consullex: missão, valores, compromisso com o Código de Ética da OAB e como escolhemos os advogados." },
      { property: "og:title", content: "Quem somos | Consullex" },
      { property: "og:description", content: "A LegalTech que une tecnologia e humanidade para transformar a experiência jurídica." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteShell>
      <PageHero eyebrow="Quem somos" title={<>A LegalTech que une <span className="text-gold">tecnologia e humanidade</span></>} text="Conectamos pessoas e empresas a advogados de forma ética, segura e tecnológica, facilitando o acesso ao direito." />
      <section className="py-24">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[[Target, "Missão", "Conectar pessoas e empresas a advogados de forma ética, segura e tecnológica, facilitando o acesso ao direito."], [Eye, "Visão", "Ser a principal plataforma jurídica do Brasil, reconhecida pela confiança, qualidade e inovação no atendimento."], [Heart, "Propósito", "Democratizar o acesso a um atendimento jurídico de excelência."]].map(([I, t, d]) => {
            const Icon = I as typeof Target;
            return (
              <div key={t as string} className="rounded-2xl border border-border bg-card p-8">
                <Icon className="h-7 w-7 text-gold" />
                <h2 className="mt-5 text-xl font-semibold text-navy">{t as string}</h2>
                <p className="mt-2 text-support leading-relaxed text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="bg-surface py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Valores" title="O que guia cada decisão" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {[[Scale, "Ética e transparência"], [ShieldCheck, "Segurança e confiança"], [BadgeCheck, "Excelência no atendimento"], [Lightbulb, "Inovação com propósito"], [Users, "Responsabilidade social"]].map(([I, t]) => {
              const Icon = I as typeof Scale;
              return <li key={t as string} className="flex items-center gap-3 rounded-xl bg-card p-4 font-medium text-navy shadow-soft"><Icon className="h-5 w-5 text-gold" /> {t as string}</li>;
            })}
          </ul>
        </div>
      </section>
      <section className="py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Curadoria" title="Como escolhemos os advogados" description="Um processo cuidadoso para que você converse apenas com profissionais qualificados." />
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {["Verificação da inscrição ativa na OAB", "Análise de formação, especializações e experiência", "Entrevista sobre postura ética e atendimento", "Acompanhamento contínuo das avaliações"].map((s, i) => (
              <li key={s} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-4xl font-semibold text-gold/50">0{i + 1}</span>
                <p className="mt-3 font-medium text-navy">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <EthicsSection />
      <section className="pb-24">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[["Carreiras", "Venha construir o futuro do acesso à justiça com a gente."], ["Imprensa", "Materiais e contato para jornalistas."], ["Seja um especialista", "Atenda novos clientes com uma agenda organizada."]].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-ivory/70 p-8">
              <h3 className="text-lg font-semibold text-navy">{t}</h3>
              <p className="mt-2 text-support text-sm text-muted-foreground">{d}</p>
              <Button variant="link" className="mt-3 px-0 font-semibold text-navy" asChild><Link to="/ajuda">Fale com a gente →</Link></Button>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
