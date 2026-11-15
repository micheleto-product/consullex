import { CheckCircle2, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { whatsappLink } from "@/lib/site";
import { isProfessionalEmail, maskPhone, onlyDigits } from "@/lib/validators";

type Lead = { email: string; name: string; company: string; phone: string; size: string };

const SIZES = ["1 a 20", "21 a 100", "101 a 500", "Mais de 500"];

/**
 * Multi-step lead capture. `submitLead` is the single integration point for a CRM.
 */
async function submitLead(lead: Lead) {
  // Not connected yet: plug a CRM / database here.
  console.info("[lead]", lead);
}

export function LeadForm({ title = "Agende uma conversa conosco" }: { title?: string }) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [lead, setLead] = useState<Lead>({ email: "", name: "", company: "", phone: "", size: "" });
  const set = (k: keyof Lead, v: string) => setLead((l) => ({ ...l, [k]: v }));

  const validate = () => {
    if (step === 0 && !isProfessionalEmail(lead.email)) return "Informe um e-mail profissional válido (não use e-mails pessoais).";
    if (step === 1 && (lead.name.trim().length < 3 || lead.company.trim().length < 2)) return "Preencha seu nome e o nome da empresa.";
    if (step === 2 && onlyDigits(lead.phone).length < 10) return "Informe um telefone com DDD.";
    if (step === 3 && !lead.size) return "Selecione o número de colaboradores.";
    return "";
  };

  const next = async (e: FormEvent) => {
    e.preventDefault();
    const msg = validate();
    setError(msg);
    if (msg) return;
    if (step < 3) return setStep(step + 1);
    await submitLead(lead);
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-card p-8 text-navy shadow-lift">
        <CheckCircle2 className="h-10 w-10 text-emerald-bright" />
        <h3 className="mt-4 text-2xl font-semibold">Recebemos seu contato, {lead.name.split(" ")[0]}!</h3>
        <p className="mt-2 text-support text-sm text-muted-foreground">Nossa equipe vai falar com você em até 1 dia útil. Se preferir, adiante a conversa pelo WhatsApp.</p>
        <Button variant="whatsapp" size="lg" className="mt-6 w-full" asChild>
          <a href={whatsappLink(`Olá! Sou ${lead.name}, da ${lead.company}. Gostaria de conhecer a Consullex para empresas.`)} target="_blank" rel="noreferrer">
            <MessageCircle /> Continuar no WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={next} className="rounded-2xl bg-card p-7 text-navy shadow-lift sm:p-8" noValidate>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-1 text-support text-sm text-muted-foreground">Leva menos de 1 minuto.</p>
      <div className="mt-6 space-y-4">
        {step === 0 && (
          <Field label="E-mail profissional*" id="lead-email">
            <Input id="lead-email" type="email" placeholder="nome@empresa.com.br" value={lead.email} onChange={(e) => set("email", e.target.value)} className="h-11" />
          </Field>
        )}
        {step === 1 && (
          <>
            <Field label="Seu nome*" id="lead-name">
              <Input id="lead-name" autoFocus value={lead.name} onChange={(e) => set("name", e.target.value)} className="h-11" />
            </Field>
            <Field label="Empresa*" id="lead-company">
              <Input id="lead-company" value={lead.company} onChange={(e) => set("company", e.target.value)} className="h-11" />
            </Field>
          </>
        )}
        {step === 2 && (
          <Field label="Telefone / WhatsApp*" id="lead-phone">
            <Input id="lead-phone" autoFocus inputMode="tel" placeholder="(11) 90000-0000" value={lead.phone} onChange={(e) => set("phone", maskPhone(e.target.value))} className="h-11" />
          </Field>
        )}
        {step === 3 && (
          <div>
            <p className="mb-2 text-sm font-medium">Quantos colaboradores?*</p>
            <div className="grid grid-cols-2 gap-2">
              {SIZES.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => set("size", s)}
                  className={`rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${lead.size === s ? "border-gold bg-gold/10 text-navy" : "border-border hover:border-navy/40"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <span className="text-xs font-semibold text-muted-foreground">{step + 1}/4</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${((step + 1) / 4) * 100}%` }} />
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        {step > 0 && <Button type="button" variant="outline-navy" size="lg" onClick={() => setStep(step - 1)}>Voltar</Button>}
        <Button type="submit" variant="navy" size="lg" className="flex-1">{step < 3 ? "Próximo" : "Enviar"}</Button>
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">Ao enviar, você concorda com nossa Política de Privacidade. Seus dados são tratados conforme a LGPD.</p>
    </form>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
