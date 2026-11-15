import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, CheckCircle2, MessageCircle, Search, Video } from "lucide-react";

import digitalImg from "@/assets/blog-digital.jpg";
import { LawyerCard } from "@/components/site/LawyerCard";
import { SectionHeading } from "@/components/site/Section";
import { SiteShell } from "@/components/site/SiteShell";
import { AreasGrid, EthicsSection, FaqSection, StatsBand, TestimonialsSection } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { LAWYERS } from "@/lib/data";
import { whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/para-voce")({
  head: () => ({
    meta: [
      { title: "Advogado para você — orientação jurídica online | Consullex" },
      { name: "description", content: "Família, consumidor, trabalho, imóveis e mais. Encontre advogados verificados e agende sua consulta online ou presencial." },
      { property: "og:title", content: "Advogado para você | Consullex" },
      { property: "og:description", content: "Orientação jurídica humana, digital e com preço transparente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForYou,
});

function ForYou() {
  return (
    <SiteShell>
      <section className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-rise">
          <p className="eyebrow">Para você · Pessoa Física</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-navy sm:text-5xl">Segurança jurídica é para toda pessoa</h1>
          <p className="mt-5 max-w-xl text-support text-lg leading-relaxed text-muted-foreground">
            Do suporte familiar aos direitos do consumidor: simplificamos o acesso ao advogado certo para você viver com mais tranquilidade.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="gold" size="xl" asChild><Link to="/especialistas">Encontrar advogado</Link></Button>
            <Button variant="outline-navy" size="xl" asChild>
              <a href={whatsappLink("Olá! Preciso de ajuda para escolher um advogado.")} target="_blank" rel="noreferrer"><MessageCircle /> Tirar dúvidas</a>
            </Button>
          </div>
          <ul className="mt-8 grid gap-2 text-sm text-graphite sm:grid-cols-2">
            {["Advogados verificados pela OAB", "Preço claro antes de agendar", "Consulta online ou presencial", "Sigilo e proteção de dados"].map((t) => (
              <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-bright" /> {t}</li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <img src={digitalImg} alt="Consulta jurídica por videochamada no celular" width={1024} height={768} className="w-full rounded-[2rem] object-cover shadow-lift" />
          <div className="animate-float absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-lift">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald text-on-dark"><Video className="h-5 w-5" /></span>
            <span><span className="block text-sm font-semibold text-navy">Sua consulta está pronta!</span><span className="text-xs text-muted-foreground">Hoje, 10h00</span></span>
          </div>
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="container-page">
          <StatsBand items={[
            { value: "1.600+", label: "especialistas verificados e prontos para atender você." },
            { value: "98%", label: "de satisfação nas avaliações dos clientes." },
            { value: "24h", label: "acesso a documentos e mensagens no seu painel." },
            { value: "R$ 180", label: "é o valor inicial de uma consulta na plataforma." },
          ]} />
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Áreas de atuação" title="Atendimento humano para proteger seus direitos" description="Escolha a área e veja os especialistas disponíveis." />
          <div className="mt-12"><AreasGrid filter="pf" /></div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Como funciona" title="Em poucos cliques, você conecta seu problema à solução" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[[Search, "Busque o especialista", "Filtre por área, preço, idioma e avaliações de outros clientes."], [CalendarCheck, "Agende sua sessão", "Escolha o melhor dia e horário na agenda do profissional."], [Video, "Resolva seu caso", "Converse por vídeo ou presencialmente e receba orientação clara."]].map(([Icon, t, d], i) => {
              const I = Icon as typeof Search;
              return (
                <div key={t as string} className="rounded-2xl bg-card p-8 text-center shadow-soft">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold"><I className="h-6 w-6" /></span>
                  <p className="mt-5 text-xs font-semibold text-gold">PASSO 0{i + 1}</p>
                  <h3 className="mt-1 text-xl font-semibold text-navy">{t as string}</h3>
                  <p className="mt-2 text-support text-sm text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Em destaque" title="Especialistas para o seu dia a dia" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {LAWYERS.filter((l) => ["familia", "consumidor", "trabalhista"].includes(l.area)).map((l) => <LawyerCard key={l.slug} lawyer={l} />)}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <EthicsSection />
      <FaqSection />
    </SiteShell>
  );
}
