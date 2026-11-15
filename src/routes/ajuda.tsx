import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { PageHero } from "@/components/site/PageHero";
import { SiteShell } from "@/components/site/SiteShell";
import { FaqSection } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE, whatsappLink } from "@/lib/site";
import { isValidEmail } from "@/lib/validators";

export const Route = createFileRoute("/ajuda")({
  head: () => ({
    meta: [
      { title: "Central de ajuda e contato | Consullex" },
      { name: "description", content: "Tire suas dúvidas sobre consultas, pagamentos e cadastro, ou fale com a equipe Consullex." },
      { property: "og:title", content: "Central de ajuda | Consullex" },
      { property: "og:description", content: "Perguntas frequentes e canais de atendimento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Help,
});

function Help() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2 || !isValidEmail(f.email) || f.message.trim().length < 10) { toast.error("Preencha nome, e-mail válido e uma mensagem."); return; }
    toast.success("Mensagem enviada! Responderemos em até 1 dia útil.");
    setF({ name: "", email: "", message: "" });
  };
  return (
    <SiteShell>
      <PageHero eyebrow="Suporte" title="Como podemos ajudar?" text="Estamos aqui para orientar você em cada etapa, com clareza e respeito." />
      <section className="py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[[MessageCircle, "WhatsApp", "Resposta rápida em horário comercial", whatsappLink("Olá! Preciso de ajuda com a Consullex.")], [Mail, "E-mail", SITE.email, `mailto:${SITE.email}`], [Phone, "Telefone", SITE.phoneDisplay, `tel:${SITE.phoneDisplay.replace(/\D/g, "")}`]].map(([I, t, d, href]) => {
              const Icon = I as typeof Mail;
              return (
                <a key={t as string} href={href as string} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold"><Icon className="h-5 w-5" /></span>
                  <span><span className="block font-semibold text-navy">{t as string}</span><span className="text-sm text-muted-foreground">{d as string}</span></span>
                </a>
              );
            })}
            <p className="flex items-center gap-2 px-1 text-sm text-muted-foreground"><Clock className="h-4 w-4 text-gold" /> {SITE.hours}</p>
          </div>
          <form onSubmit={submit} className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-soft" noValidate>
            <h2 className="text-xl font-semibold text-navy">Fale conosco</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="n">Nome</Label><Input id="n" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="h-11" /></div>
              <div className="space-y-2"><Label htmlFor="e">E-mail</Label><Input id="e" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className="h-11" /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="m">Mensagem</Label><Textarea id="m" rows={5} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></div>
            <Button type="submit" variant="navy" size="lg">Enviar mensagem</Button>
          </form>
        </div>
      </section>
      <FaqSection />
    </SiteShell>
  );
}
