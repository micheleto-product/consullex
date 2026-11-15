import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarPlus, CheckCircle2, Mail, MessageCircle, Monitor, FileText, Clock } from "lucide-react";
import { useEffect, useState } from "react";

import { FlowHeader } from "@/components/site/FlowHeader";
import { Button } from "@/components/ui/button";
import { brl, readBooking, type Booking } from "@/lib/booking";
import { whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/confirmacao")({
  head: () => ({
    meta: [
      { title: "Agendamento confirmado | Consullex" },
      { name: "description", content: "Sua consulta foi agendada com sucesso. Veja o resumo e os próximos passos." },
      { property: "og:title", content: "Agendamento confirmado | Consullex" },
      { property: "og:description", content: "Resumo da consulta e próximos passos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  const [b, setB] = useState<Booking | null | undefined>(undefined);
  useEffect(() => setB(readBooking()), []);

  if (b === undefined) return <div className="min-h-screen bg-surface"><FlowHeader /></div>;

  if (!b) {
    return (
      <div className="min-h-screen bg-surface">
        <FlowHeader />
        <div className="container-page py-24 text-center">
          <h1 className="text-2xl font-semibold text-navy">Nenhum agendamento recente</h1>
          <p className="mt-2 text-muted-foreground">Encontre um especialista e agende sua consulta em poucos minutos.</p>
          <Button variant="navy" className="mt-6" asChild><Link to="/especialistas">Buscar especialistas</Link></Button>
        </div>
      </div>
    );
  }

  const date = new Date(b.dateISO).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
  const payLabel = { cartao: "Cartão de crédito", pix: "Pix", boleto: "Boleto bancário" }[b.payment];

  return (
    <div className="min-h-screen bg-surface">
      <FlowHeader />
      <div className="container-page max-w-3xl py-12">
        <div className="animate-rise text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald text-on-dark shadow-lift"><CheckCircle2 className="h-8 w-8" /></span>
          <p className="eyebrow mt-6">Tudo certo!</p>
          <h1 className="mt-2 text-3xl font-semibold text-navy sm:text-4xl">Agendamento realizado com sucesso</h1>
          <p className="mx-auto mt-3 max-w-lg text-support text-muted-foreground">
            Enviamos a confirmação para o seu e-mail. Código do agendamento: <span className="font-semibold text-navy">{b.code}</span>
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <h2 className="text-lg font-semibold text-navy">Resumo da consulta</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ["Advogado", b.lawyerName],
              ["Data e horário", `${date} às ${b.time}`],
              ["Atendimento", b.mode === "online" ? "Online (videochamada)" : "Presencial"],
              ["Assunto", b.subject],
              ["Pagamento", payLabel],
              ["Valor pago", brl(b.total)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-medium text-navy first-letter:uppercase">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 rounded-3xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-navy">Próximos passos</h2>
          <ul className="mt-4 space-y-4">
            {[
              [Mail, "Confira seu e-mail", "Você recebeu a confirmação com todos os detalhes e o recibo."],
              [b.mode === "online" ? Monitor : Clock, b.mode === "online" ? "Link da videochamada" : "Chegue com antecedência", b.mode === "online" ? "O link seguro fica disponível no seu painel 15 minutos antes." : "Recomendamos chegar 10 minutos antes ao escritório."],
              [FileText, "Separe seus documentos", "Contratos, comprovantes e mensagens ajudam o advogado a orientar você melhor."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Mail;
              return (
                <li key={t as string} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-navy"><I className="h-5 w-5" /></span>
                  <span><span className="block font-semibold text-navy">{t as string}</span><span className="text-support text-sm text-muted-foreground">{d as string}</span></span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="whatsapp" size="xl" className="flex-1" asChild>
            <a href={whatsappLink(`Olá! Acabei de agendar uma consulta (${b.code}) com ${b.lawyerName}.`)} target="_blank" rel="noreferrer"><MessageCircle /> Falar no WhatsApp</a>
          </Button>
          <Button variant="navy" size="xl" className="flex-1" asChild><Link to="/painel/cliente">Ir para meu painel</Link></Button>
          <Button variant="outline-navy" size="xl" onClick={() => window.print()}><CalendarPlus /> Salvar</Button>
        </div>
      </div>
    </div>
  );
}
