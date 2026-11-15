import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Building2, Briefcase, CreditCard, FileBarChart, LayoutDashboard, Plug, Receipt, Settings, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DashboardLayout, Panel, SettingRow, StatCard, StatusBadge, type NavItem } from "@/components/site/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { brl } from "@/lib/booking";
import { mustLawyer } from "@/lib/data";

export const Route = createFileRoute("/painel/empresa")({
  head: () => ({
    meta: [
      { title: "Painel da empresa | Consullex" },
      { name: "description", content: "Gerencie consultorias, equipe, faturas e relatórios jurídicos da sua empresa." },
      { property: "og:title", content: "Painel da empresa | Consullex" },
      { property: "og:description", content: "Painel corporativo Consullex." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CompanyDashboard,
});

const NAV: NavItem[] = [
  { id: "visao", label: "Visão geral", icon: LayoutDashboard },
  { id: "consultorias", label: "Consultorias", icon: Briefcase },
  { id: "equipe", label: "Equipe e usuários", icon: Users },
  { id: "faturas", label: "Faturas e pagamentos", icon: Receipt, badge: 1 },
  { id: "relatorios", label: "Relatórios", icon: BarChart3 },
  { id: "perfil", label: "Perfil da empresa", icon: Building2 },
  { id: "configuracoes", label: "Configurações", icon: Settings },
];

const pedro = mustLawyer("pedro-hayden");
const juliana = mustLawyer("juliana-meireles");
const leandro = mustLawyer("leandro-quintela");
const helena = mustLawyer("helena-tanaka");
const CONSULTS = [
  { title: "Revisão do acordo de sócios", lawyer: pedro, by: "Carla Mendes", date: "17 nov", status: "Em andamento" as const },
  { title: "Adequação LGPD — RH", lawyer: juliana, by: "Rafael Costa", date: "19 nov", status: "Confirmada" as const },
  { title: "Política de home office", lawyer: helena, by: "Carla Mendes", date: "24 nov", status: "Novo" as const },
  { title: "Planejamento tributário 2027", lawyer: leandro, by: "Bruno Alves", date: "02 nov", status: "Concluída" as const },
  { title: "Contrato com fornecedor internacional", lawyer: pedro, by: "Rafael Costa", date: "20 out", status: "Concluída" as const },
];
const TEAM = [
  { name: "Carla Mendes", email: "carla@nexuscorp.com.br", role: "Administradora", uses: 14 },
  { name: "Rafael Costa", email: "rafael@nexuscorp.com.br", role: "Gestor", uses: 9 },
  { name: "Bruno Alves", email: "bruno@nexuscorp.com.br", role: "Colaborador", uses: 4 },
  { name: "Ana Lima", email: "ana@nexuscorp.com.br", role: "Colaborador", uses: 2 },
];
const INVOICES = [
  { id: "FAT-2026-11", period: "Novembro 2026", value: 4890, status: "Em aberto" as const },
  { id: "FAT-2026-10", period: "Outubro 2026", value: 4890, status: "Pago" as const },
  { id: "FAT-2026-09", period: "Setembro 2026", value: 4350, status: "Pago" as const },
];
const USAGE = [["Jun", 18], ["Jul", 24], ["Ago", 21], ["Set", 30], ["Out", 34], ["Nov", 27]] as const;
const BY_AREA = [["Trabalhista", 38], ["Contratos", 26], ["LGPD", 18], ["Tributário", 12], ["Societário", 6]] as const;

function CompanyDashboard() {
  const [section, setSection] = useState("visao");
  return (
    <DashboardLayout nav={NAV} active={section} onNavigate={setSection} user={{ name: "Nexus Corp", subtitle: "Carla Mendes · Admin", initials: "NC" }}>
      {section === "visao" && <Overview go={setSection} />}
      {section === "consultorias" && <Consults />}
      {section === "equipe" && <Team />}
      {section === "faturas" && <Invoices />}
      {section === "relatorios" && <Reports />}
      {section === "perfil" && <CompanyProfile />}
      {section === "configuracoes" && <SettingsView />}
    </DashboardLayout>
  );
}

function Title({ title, text, action }: { title: string; text?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-navy">{title}</h1>
        {text && <p className="mt-1 text-support text-sm text-muted-foreground">{text}</p>}
      </div>
      {action}
    </div>
  );
}

function Bars({ data, max }: { data: readonly (readonly [string, number])[]; max: number }) {
  return (
    <div className="flex h-48 items-end gap-3">
      {data.map(([l, v]) => (
        <div key={l} className="flex flex-1 flex-col items-center gap-2">
          <span className="text-xs font-semibold text-navy">{v}</span>
          <div className="w-full rounded-t-lg bg-gold-gradient" style={{ height: `${(v / max) * 100}%` }} />
          <span className="text-xs text-muted-foreground">{l}</span>
        </div>
      ))}
    </div>
  );
}

function ConsultTable({ items }: { items: typeof CONSULTS }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-muted-foreground"><tr><th className="pb-3 font-medium">Assunto</th><th className="pb-3 font-medium">Advogado</th><th className="pb-3 font-medium">Solicitante</th><th className="pb-3 font-medium">Data</th><th className="pb-3 font-medium">Status</th></tr></thead>
        <tbody className="divide-y divide-border">
          {items.map((c) => (
            <tr key={c.title}>
              <td className="py-3 font-medium text-navy">{c.title}</td>
              <td className="py-3"><span className="flex items-center gap-2 text-graphite"><img src={c.lawyer.photo} alt="" className="h-7 w-7 rounded-full object-cover" />{c.lawyer.name}</span></td>
              <td className="py-3 text-graphite">{c.by}</td>
              <td className="py-3 text-graphite">{c.date}</td>
              <td className="py-3"><StatusBadge status={c.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Overview({ go }: { go: (s: string) => void }) {
  return (
    <>
      <Title title="Olá, Carla" text="Visão geral da segurança jurídica da Nexus Corp." action={<Button variant="gold" asChild><Link to="/especialistas">Nova consultoria</Link></Button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Briefcase} label="Consultas ativas" value="3" hint="1 aguardando agendamento" />
        <StatCard icon={Users} label="Equipe jurídica" value="4" hint="Usuários com acesso" />
        <StatCard icon={Receipt} label="Faturas em aberto" value={brl(4890)} hint="Vence em 10/12" />
        <StatCard icon={FileBarChart} label="Relatórios" value="6" hint="Último: outubro" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel title="Uso da plataforma" className="xl:col-span-2" action={<button onClick={() => go("relatorios")} className="text-sm font-semibold text-navy hover:underline">Ver relatórios</button>}>
          <Bars data={USAGE} max={40} />
        </Panel>
        <section className="rounded-2xl bg-night-glow p-6 text-on-dark">
          <p className="eyebrow">Índice de risco</p>
          <p className="mt-4 text-5xl font-semibold">Baixo</p>
          <p className="mt-2 text-sm text-on-dark-muted">Redução de 32% nos apontamentos trabalhistas desde junho.</p>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-on-dark/15"><div className="h-full w-1/4 rounded-full bg-gold" /></div>
        </section>
      </div>
      <div className="mt-6">
        <Panel title="Consultorias recentes" action={<button onClick={() => go("consultorias")} className="text-sm font-semibold text-navy hover:underline">Ver todas</button>}>
          <ConsultTable items={CONSULTS.slice(0, 3)} />
        </Panel>
      </div>
    </>
  );
}

function Consults() {
  const [tab, setTab] = useState<"ativas" | "historico">("ativas");
  const items = CONSULTS.filter((c) => (tab === "ativas" ? c.status !== "Concluída" : c.status === "Concluída"));
  return (
    <>
      <Title title="Consultorias" action={<Button variant="gold" asChild><Link to="/especialistas">Nova consultoria</Link></Button>} />
      <div className="mb-5 inline-flex rounded-lg bg-muted p-1">
        {(["ativas", "historico"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-md px-4 py-2 text-sm font-semibold ${tab === t ? "bg-card text-navy shadow-soft" : "text-muted-foreground"}`}>{t === "ativas" ? "Ativas" : "Histórico"}</button>
        ))}
      </div>
      <Panel title={tab === "ativas" ? "Consultorias ativas" : "Histórico"}><ConsultTable items={items} /></Panel>
    </>
  );
}

function Team() {
  const [team, setTeam] = useState(TEAM);
  const [email, setEmail] = useState("");
  return (
    <>
      <Title title="Equipe e usuários" text="Gerencie quem pode solicitar consultorias e ver relatórios." />
      <Panel
        title="Usuários"
        action={
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) { toast.error("Informe um e-mail válido."); return; }
              setTeam([...team, { name: email.split("@")[0] ?? email, email, role: "Colaborador", uses: 0 }]);
              setEmail("");
              toast.success("Convite enviado.");
            }}
            className="flex gap-2"
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@empresa.com.br" className="h-9 w-56" />
            <Button type="submit" variant="navy" size="sm"><UserPlus /> Convidar</Button>
          </form>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground"><tr><th className="pb-3 font-medium">Nome</th><th className="pb-3 font-medium">E-mail</th><th className="pb-3 font-medium">Permissão</th><th className="pb-3 font-medium">Consultas</th></tr></thead>
            <tbody className="divide-y divide-border">
              {team.map((m, i) => (
                <tr key={m.email}>
                  <td className="py-3 font-medium capitalize text-navy">{m.name}</td>
                  <td className="py-3 text-graphite">{m.email}</td>
                  <td className="py-3">
                    <select value={m.role} onChange={(e) => setTeam(team.map((t, k) => (k === i ? { ...t, role: e.target.value } : t)))} className="h-8 rounded-md border border-border bg-card px-2 text-sm">
                      {["Administradora", "Gestor", "Colaborador"].map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className="py-3 text-graphite">{m.uses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function Invoices() {
  return (
    <>
      <Title title="Faturas e pagamentos" />
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Faturas" className="xl:col-span-2">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground"><tr><th className="pb-3 font-medium">Fatura</th><th className="pb-3 font-medium">Período</th><th className="pb-3 font-medium">Valor</th><th className="pb-3 font-medium">Status</th><th /></tr></thead>
            <tbody className="divide-y divide-border">
              {INVOICES.map((f) => (
                <tr key={f.id}>
                  <td className="py-3 font-medium text-navy">{f.id}</td>
                  <td className="py-3 text-graphite">{f.period}</td>
                  <td className="py-3 font-semibold text-navy">{brl(f.value)}</td>
                  <td className="py-3"><StatusBadge status={f.status} /></td>
                  <td className="py-3 text-right">{f.status === "Em aberto" && <Button variant="gold" size="sm" onClick={() => toast("Boleto e Pix enviados para o financeiro.")}>Pagar</Button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
        <Panel title="Método de pagamento">
          <div className="flex items-center gap-3 rounded-xl border border-border p-4">
            <CreditCard className="h-6 w-6 text-navy" />
            <div><p className="font-medium text-navy">Boleto mensal</p><p className="text-sm text-muted-foreground">financeiro@nexuscorp.com.br</p></div>
          </div>
          <Button variant="outline-navy" className="mt-4 w-full" onClick={() => toast("Fale com seu gerente de conta para alterar.")}>Alterar método</Button>
        </Panel>
      </div>
    </>
  );
}

function Reports() {
  return (
    <>
      <Title title="Relatórios" text="Uso da plataforma e indicadores gerenciais." action={<Button variant="outline-navy" onClick={() => toast("Relatório enviado para seu e-mail.")}>Exportar PDF</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Briefcase} label="Consultas em 2026" value="154" hint="+22% vs. 2025" />
        <StatCard icon={FileBarChart} label="Contratos revisados" value="61" hint="Tempo médio: 2,4 dias" />
        <StatCard icon={BarChart3} label="Passivos evitados (estim.)" value="R$ 1,2 mi" hint="Base: pareceres preventivos" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Consultas por mês"><Bars data={USAGE} max={40} /></Panel>
        <Panel title="Consultas por área (%)">
          <ul className="space-y-4">
            {BY_AREA.map(([a, v]) => (
              <li key={a}>
                <div className="mb-1.5 flex justify-between text-sm"><span className="text-graphite">{a}</span><span className="font-semibold text-navy">{v}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-navy" style={{ width: `${v}%` }} /></div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function CompanyProfile() {
  return (
    <>
      <Title title="Perfil da empresa" />
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Dados da empresa" className="xl:col-span-2">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Dados atualizados."); }} className="grid gap-4 sm:grid-cols-2">
            {[["Razão social", "Nexus Corp Tecnologia Ltda."], ["Nome fantasia", "Nexus Corp"], ["CNPJ", "11.222.333/0001-81"], ["E-mail financeiro", "financeiro@nexuscorp.com.br"], ["Telefone", "(11) 3000-0000"], ["Colaboradores", "120"]].map(([l, v]) => (
              <div key={l} className="space-y-2"><Label>{l}</Label><Input defaultValue={v} disabled={l === "CNPJ"} className="h-11" /></div>
            ))}
            <div className="sm:col-span-2"><Button type="submit" variant="navy">Salvar alterações</Button></div>
          </form>
        </Panel>
        <Panel title="Membros e responsáveis">
          <ul className="space-y-4">
            {([["Carla Mendes", "Responsável legal · Administradora"], ["Rafael Costa", "Gestor de RH"], ["Bruno Alves", "Financeiro"]] as const).map(([n, r]) => (
              <li key={n} className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-sm font-semibold text-navy">{n.split(" ").map((x) => x[0]).join("")}</span>
                <div><p className="text-sm font-semibold text-navy">{n}</p><p className="text-xs text-muted-foreground">{r}</p></div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function SettingsView() {
  return (
    <>
      <Title title="Configurações" />
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Notificações">
          <SettingRow title="Novas consultorias" text="Avisar administradores"><Switch defaultChecked /></SettingRow>
          <SettingRow title="Faturas" text="Lembrete 5 dias antes do vencimento"><Switch defaultChecked /></SettingRow>
          <SettingRow title="Relatório mensal" text="Envio automático por e-mail"><Switch defaultChecked /></SettingRow>
        </Panel>
        <Panel title="Segurança">
          <SettingRow title="Verificação em duas etapas" text="Obrigatória para todos os usuários"><Switch /></SettingRow>
          <SettingRow title="Login único (SSO)" text="Disponível no plano Enterprise"><Switch disabled /></SettingRow>
        </Panel>
        <Panel title="Integrações">
          {["Google Workspace", "Microsoft 365", "Slack", "Sistema de RH"].map((i) => (
            <SettingRow key={i} title={i} text="Não conectado">
              <Button variant="outline-navy" size="sm" onClick={() => toast(`Integração com ${i} em breve.`)}><Plug /> Conectar</Button>
            </SettingRow>
          ))}
        </Panel>
      </div>
    </>
  );
}
