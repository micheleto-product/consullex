import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Clock, FileSearch, Lock, PiggyBank, ShieldCheck } from "lucide-react";

import teamImg from "@/assets/empresa-reuniao.jpg";
import { SectionHeading } from "@/components/site/Section";
import { SiteShell } from "@/components/site/SiteShell";
import { AreasGrid, FaqSection, LeadSection, LogosStrip, StatsBand } from "@/components/site/sections";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/empresas")({
  head: () => ({
    meta: [
      { title: "Benefício jurídico para empresas | Consullex" },
      { name: "description", content: "Prevenção de riscos, consultoria e advogados especialistas para sua empresa e colaboradores, com painel de gestão e relatórios." },
      { property: "og:title", content: "Benefício jurídico para empresas | Consullex" },
      { property: "og:description", content: "Segurança jurídica que potencializa negócios e pessoas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Companies,
});

const FEATURES = [
  { icon: FileSearch, t: "Diagnóstico inteligente", d: "Mapeamento de passivos trabalhistas, contratuais e de adequação à LGPD." },
  { icon: Clock, t: "Atendimento especializado", d: "Em até 24h para casos críticos, com canal direto com o time jurídico." },
  { icon: BarChart3, t: "Gestão do benefício", d: "Painel em tempo real com indicadores, uso da equipe e relatórios mensais." },
  { icon: PiggyBank, t: "Economia mensurável", d: "Menos multas, processos e retrabalho com uma rotina preventiva." },
];

function Companies() {
  return (
    <SiteShell>
      <section className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-rise">
          <p className="eyebrow">A solução completa para empresas</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-navy sm:text-5xl">Segurança jurídica que potencializa negócios e pessoas</h1>
          <p className="mt-5 max-w-xl text-support text-lg leading-relaxed text-muted-foreground">
            Da prevenção de riscos ao suporte consultivo: uma jornada estruturada que une tecnologia, dados e advogados especialistas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="gold" size="xl" asChild><a href="#demonstracao">Agendar demonstração</a></Button>
            <Button variant="outline-navy" size="xl" asChild><a href="#como-funciona">Como funciona</a></Button>
          </div>
          <div className="mt-8 flex gap-6 text-sm text-graphite">
            <span className="flex items-center gap-2"><Lock className="h-4 w-4 text-gold" /> Criptografia de ponta</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Conformidade LGPD</span>
          </div>
        </div>
        <img src={teamImg} alt="Equipe revisando contrato com advogada" width={1408} height={1056} className="w-full rounded-[2rem] object-cover shadow-lift" />
      </section>

      <LogosStrip />

      <section className="bg-navy py-20">
        <div className="container-page">
          <StatsBand items={[
            { value: "+1.200", label: "empresas fortalecem sua segurança jurídica com a Consullex." },
            { value: "+15 mil", label: "contratos e riscos analisados por mês." },
            { value: "+800", label: "advogados especialistas com inscrição ativa na OAB." },
            { value: "97%", label: "relatam redução de passivos e multas." },
          ]} />
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Benefícios" title="Mais resultado, menos complicação" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.t} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold"><f.icon className="h-5 w-5" /></span>
                <h3 className="mt-5 font-semibold text-navy">{f.t}</h3>
                <p className="mt-2 text-support text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-surface py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Compliance na prática" title="Sua empresa pronta para crescer com segurança" description="Um processo claro, acompanhado de perto pelo nosso time." />
          <Accordion type="single" collapsible defaultValue="s0">
            {[["Mapeamento de riscos", "Auditoria da documentação atual da empresa e análise dos contratos vigentes."], ["Diagnóstico e parecer", "Relatório com vulnerabilidades fiscais, trabalhistas e societárias, em linguagem clara e com prioridades."], ["Plano de ação contínuo", "Acesso à rede de especialistas para resolver os pontos encontrados e manter o compliance em dia."]].map(([t, d], i) => (
              <AccordionItem key={t} value={`s${i}`} className="mb-3 rounded-2xl border border-border bg-card px-6">
                <AccordionTrigger className="text-left text-base font-semibold text-navy hover:no-underline"><span><span className="mr-3 text-gold">0{i + 1}</span>{t}</span></AccordionTrigger>
                <AccordionContent className="text-support text-[15px] text-muted-foreground">{d}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Áreas" title="Especialistas para cada desafio do negócio" />
          <div className="mt-12"><AreasGrid filter="pj" /></div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Depoimentos" title="Escolhida por lideranças que priorizam segurança e pessoas" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[["A Consullex foi a mudança que fez toda a diferença. O benefício que mais contribuiu para atrair talentos seniores.", "Isabela Nascimento", "Head of People & Culture"], ["Uma ferramenta acessível que nos ajuda a mapear temas críticos em contratos e orientar decisões preventivas.", "Douglas Pereira", "VP de Recursos Humanos"], ["O impacto é evidente no dia a dia. Negociamos com mais segurança sabendo que o time tem suporte em 24h.", "Nara Zarino", "Head of Operations"]].map(([q, n, r]) => (
              <figure key={n} className="rounded-2xl border border-border bg-card p-7">
                <p className="text-gold">★★★★★</p>
                <blockquote className="mt-4 text-support leading-relaxed text-graphite">“{q}”</blockquote>
                <figcaption className="mt-6"><span className="block font-semibold text-navy">{n}</span><span className="text-sm text-muted-foreground">{r}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
      <LeadSection title="Agende uma conversa com nossos especialistas" text="Preencha o formulário e descubra o plano ideal para o tamanho e o momento da sua empresa." />
    </SiteShell>
  );
}
