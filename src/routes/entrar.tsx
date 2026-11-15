import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2, Eye, EyeOff, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { AuthLayout, GoogleIcon } from "@/components/site/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidEmail } from "@/lib/validators";

type Perfil = "cliente" | "empresa";

export const Route = createFileRoute("/entrar")({
  validateSearch: (s: Record<string, unknown>): { perfil?: Perfil | undefined } => ({
    perfil: s["perfil"] === "empresa" || s["perfil"] === "cliente" ? s["perfil"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Entrar | Consullex" },
      { name: "description", content: "Acesse sua conta Consullex como cliente ou empresa." },
      { property: "og:title", content: "Entrar | Consullex" },
      { property: "og:description", content: "Acesse seu painel Consullex." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState<Perfil>(search.perfil ?? "cliente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) return setError("Informe um e-mail válido.");
    if (password.length < 6) return setError("A senha precisa ter pelo menos 6 caracteres.");
    setError("");
    navigate({ to: perfil === "cliente" ? "/painel/cliente" : "/painel/empresa" });
  };

  return (
    <AuthLayout title="Que bom ter você de volta" text="Acompanhe suas consultas, documentos e conversas com advogados em um só lugar.">
      <h1 className="text-3xl font-semibold text-navy">Entrar</h1>
      <p className="mt-2 text-support text-sm text-muted-foreground">Escolha seu perfil e acesse sua conta.</p>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
        {(["cliente", "empresa"] as const).map((p) => (
          <button key={p} type="button" onClick={() => setPerfil(p)} className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors ${perfil === p ? "bg-card text-navy shadow-soft" : "text-muted-foreground"}`}>
            {p === "cliente" ? <UserRound className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
            {p === "cliente" ? "Cliente / PF" : "Empresa"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">{perfil === "empresa" ? "E-mail corporativo" : "E-mail"}</Label>
          <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={perfil === "empresa" ? "nome@empresa.com.br" : "voce@email.com"} className="h-11" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <button type="button" onClick={() => toast("Enviaremos um link de redefinição para o seu e-mail.")} className="text-xs font-semibold text-navy hover:underline">Esqueci minha senha</button>
          </div>
          <div className="relative">
            <Input id="password" type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 pr-10" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label={show ? "Ocultar senha" : "Mostrar senha"}>
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" /> <Label htmlFor="remember" className="text-sm font-normal text-graphite">Manter conectado</Label>
        </div>
        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
        <Button type="submit" variant="navy" size="lg" className="w-full">Entrar</Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" /></div>
      <Button variant="outline-navy" size="lg" className="w-full" onClick={() => navigate({ to: perfil === "cliente" ? "/painel/cliente" : "/painel/empresa" })}>
        <GoogleIcon /> Entrar com Google
      </Button>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Ainda não tem conta? <Link to="/cadastro" search={{ perfil }} className="font-semibold text-navy hover:underline">Criar conta</Link>
      </p>
    </AuthLayout>
  );
}
