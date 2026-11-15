import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2, ChevronRight, MailCheck, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/site/AuthLayout";
import { Stepper } from "@/components/site/FlowHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { isProfessionalEmail, isValidCNPJ, isValidCPF, isValidEmail, maskCNPJ, maskCPF, maskPhone, onlyDigits } from "@/lib/validators";

type Perfil = "cliente" | "empresa";

export const Route = createFileRoute("/cadastro")({
  validateSearch: (s: Record<string, unknown>): { perfil?: Perfil | undefined } => ({
    perfil: s["perfil"] === "empresa" || s["perfil"] === "cliente" ? s["perfil"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Criar conta | Consullex" },
      { name: "description", content: "Crie sua conta Consullex como pessoa física ou empresa. É simples, rápido e gratuito." },
      { property: "og:title", content: "Criar conta | Consullex" },
      { property: "og:description", content: "Cadastro para pessoas físicas e empresas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SignUp,
});

const STEPS: Record<Perfil, string[]> = {
  cliente: ["Dados pessoais", "Contato", "Senha", "Verificação"],
  empresa: ["Empresa", "Responsável", "Contato", "Senha", "Verificação"],
};

function SignUp() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState<Perfil | null>(search.perfil ?? null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [d, setD] = useState({
    name: "", cpf: "", birth: "", email: "", phone: "", password: "", confirm: "", terms: false,
    company: "", tradeName: "", cnpj: "", legalName: "", legalCpf: "", legalRole: "", otp: "",
  });
  const set = (k: keyof typeof d, v: string | boolean) => setD((p) => ({ ...p, [k]: v }));

  if (!perfil) {
    return (
      <AuthLayout title="Comece em poucos minutos" text="Crie sua conta gratuita para encontrar especialistas, agendar consultas e acompanhar tudo com segurança.">
        <h1 className="text-3xl font-semibold text-navy">Criar conta</h1>
        <p className="mt-2 text-support text-sm text-muted-foreground">Como você vai usar a Consullex?</p>
        <div className="mt-6 grid gap-3">
          {([["cliente", "Pessoa Física", "Quero orientação jurídica para mim ou minha família.", UserRound], ["empresa", "Empresa", "Quero segurança jurídica para meu negócio e equipe.", Building2]] as const).map(([p, t, s, Icon]) => (
            <button key={p} onClick={() => setPerfil(p)} className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-secondary text-navy"><Icon className="h-5 w-5" /></span>
              <span className="flex-1"><span className="block font-semibold text-navy">{t}</span><span className="text-support text-sm text-muted-foreground">{s}</span></span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">Já tem conta? <Link to="/entrar" className="font-semibold text-navy hover:underline">Entrar</Link></p>
      </AuthLayout>
    );
  }

  const steps = STEPS[perfil];
  const key = steps[step] ?? "";

  const validate = (): string => {
    switch (key) {
      case "Dados pessoais":
        if (d.name.trim().split(" ").length < 2) return "Informe seu nome completo.";
        if (!isValidCPF(d.cpf)) return "CPF inválido. Confira os números.";
        if (!d.birth) return "Informe sua data de nascimento.";
        return "";
      case "Empresa":
        if (d.company.trim().length < 3) return "Informe a razão social.";
        if (!isValidCNPJ(d.cnpj)) return "CNPJ inválido. Confira os números.";
        return "";
      case "Responsável":
        if (d.legalName.trim().split(" ").length < 2) return "Informe o nome completo do responsável legal.";
        if (!isValidCPF(d.legalCpf)) return "CPF do responsável inválido.";
        if (!d.legalRole.trim()) return "Informe o cargo do responsável.";
        return "";
      case "Contato":
        if (perfil === "empresa" ? !isProfessionalEmail(d.email) : !isValidEmail(d.email))
          return perfil === "empresa" ? "Use um e-mail corporativo (domínio da empresa)." : "Informe um e-mail válido.";
        if (onlyDigits(d.phone).length < 10) return "Informe um telefone com DDD.";
        return "";
      case "Senha":
        if (d.password.length < 8 || !/\d/.test(d.password) || !/[A-Za-z]/.test(d.password)) return "A senha precisa ter 8 caracteres, com letras e números.";
        if (d.password !== d.confirm) return "As senhas não coincidem.";
        if (!d.terms) return "É preciso aceitar os Termos de Uso e a Política de Privacidade.";
        return "";
      case "Verificação":
        if (d.otp.length < 6) return "Digite o código de 6 dígitos enviado ao seu e-mail.";
        return "";
    }
    return "";
  };

  const next = (e: FormEvent) => {
    e.preventDefault();
    const msg = validate();
    setError(msg);
    if (msg) return;
    if (step < steps.length - 1) return setStep(step + 1);
    toast.success("Conta criada com sucesso!");
    navigate({ to: perfil === "cliente" ? "/painel/cliente" : "/painel/empresa" });
  };

  return (
    <AuthLayout
      title={perfil === "empresa" ? "Segurança jurídica para todo o seu time" : "Orientação jurídica sem complicação"}
      text={perfil === "empresa" ? "Validamos os dados da empresa para manter a plataforma segura e confiável." : "Seus dados são protegidos pela LGPD e usados apenas para seu atendimento."}
    >
      <button onClick={() => { setPerfil(null); setStep(0); setError(""); }} className="text-sm text-muted-foreground hover:text-navy">← Trocar perfil</button>
      <h1 className="mt-3 text-3xl font-semibold text-navy">{perfil === "empresa" ? "Cadastro da empresa" : "Cadastro pessoal"}</h1>
      <div className="mt-5"><Stepper steps={steps.map((_, i) => (i === step ? key : ""))} current={step} /></div>

      <form onSubmit={next} className="mt-6 space-y-4" noValidate>
        {key === "Dados pessoais" && (
          <>
            <F id="name" label="Nome completo"><Input id="name" value={d.name} onChange={(e) => set("name", e.target.value)} className="h-11" /></F>
            <F id="cpf" label="CPF"><Input id="cpf" inputMode="numeric" value={d.cpf} onChange={(e) => set("cpf", maskCPF(e.target.value))} placeholder="000.000.000-00" className="h-11" /></F>
            <F id="birth" label="Data de nascimento"><Input id="birth" type="date" value={d.birth} onChange={(e) => set("birth", e.target.value)} className="h-11" /></F>
          </>
        )}
        {key === "Empresa" && (
          <>
            <F id="company" label="Razão social"><Input id="company" value={d.company} onChange={(e) => set("company", e.target.value)} className="h-11" /></F>
            <F id="trade" label="Nome fantasia (opcional)"><Input id="trade" value={d.tradeName} onChange={(e) => set("tradeName", e.target.value)} className="h-11" /></F>
            <F id="cnpj" label="CNPJ"><Input id="cnpj" inputMode="numeric" value={d.cnpj} onChange={(e) => set("cnpj", maskCNPJ(e.target.value))} placeholder="00.000.000/0000-00" className="h-11" /></F>
          </>
        )}
        {key === "Responsável" && (
          <>
            <F id="lname" label="Nome do responsável legal"><Input id="lname" value={d.legalName} onChange={(e) => set("legalName", e.target.value)} className="h-11" /></F>
            <F id="lcpf" label="CPF do responsável"><Input id="lcpf" inputMode="numeric" value={d.legalCpf} onChange={(e) => set("legalCpf", maskCPF(e.target.value))} placeholder="000.000.000-00" className="h-11" /></F>
            <F id="lrole" label="Cargo"><Input id="lrole" value={d.legalRole} onChange={(e) => set("legalRole", e.target.value)} placeholder="Ex.: Sócio-diretor" className="h-11" /></F>
          </>
        )}
        {key === "Contato" && (
          <>
            <F id="email" label={perfil === "empresa" ? "E-mail corporativo" : "E-mail"}><Input id="email" type="email" value={d.email} onChange={(e) => set("email", e.target.value)} className="h-11" /></F>
            <F id="phone" label="Telefone / WhatsApp"><Input id="phone" inputMode="tel" value={d.phone} onChange={(e) => set("phone", maskPhone(e.target.value))} placeholder="(11) 90000-0000" className="h-11" /></F>
          </>
        )}
        {key === "Senha" && (
          <>
            <F id="pw" label="Crie uma senha"><Input id="pw" type="password" value={d.password} onChange={(e) => set("password", e.target.value)} className="h-11" /></F>
            <p className="-mt-2 text-xs text-muted-foreground">Mínimo de 8 caracteres, com letras e números.</p>
            <F id="pw2" label="Confirme a senha"><Input id="pw2" type="password" value={d.confirm} onChange={(e) => set("confirm", e.target.value)} className="h-11" /></F>
            <div className="flex items-start gap-3 pt-1">
              <Checkbox id="terms" checked={d.terms} onCheckedChange={(v) => set("terms", v === true)} className="mt-0.5" />
              <Label htmlFor="terms" className="text-sm font-normal leading-relaxed text-graphite">
                Li e aceito os <Link to="/termos" className="font-semibold text-navy underline">Termos de Uso</Link> e a <Link to="/privacidade" className="font-semibold text-navy underline">Política de Privacidade</Link>.
              </Label>
            </div>
          </>
        )}
        {key === "Verificação" && (
          <div className="rounded-2xl bg-surface p-6 text-center">
            <MailCheck className="mx-auto h-10 w-10 text-gold" />
            <p className="mt-3 font-semibold text-navy">Verifique seu e-mail</p>
            <p className="mt-1 text-support text-sm text-muted-foreground">Enviamos um código de 6 dígitos para <span className="font-medium text-navy">{d.email}</span>.</p>
            <div className="mt-5 flex justify-center">
              <InputOTP maxLength={6} value={d.otp} onChange={(v) => set("otp", v)}>
                <InputOTPGroup>{[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup>
              </InputOTP>
            </div>
            <button type="button" onClick={() => toast("Novo código enviado.")} className="mt-4 text-xs font-semibold text-navy hover:underline">Reenviar código</button>
          </div>
        )}

        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
        <div className="flex gap-2 pt-2">
          {step > 0 && <Button type="button" variant="outline-navy" size="lg" onClick={() => { setError(""); setStep(step - 1); }}>Voltar</Button>}
          <Button type="submit" variant="navy" size="lg" className="flex-1">{step === steps.length - 1 ? "Concluir cadastro" : "Continuar"}</Button>
        </div>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground">Etapa {step + 1} de {steps.length}</p>
    </AuthLayout>
  );
}

function F({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
