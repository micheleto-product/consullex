import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  CalendarClock,
  CreditCard,
  FileText,
  FolderClock,
  LayoutDashboard,
  MessageSquare,
  Search,
  Send,
  Settings,
  UserRound,
  Video,
  Download,
  History,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DashboardLayout, Panel, SettingRow, StatCard, StatusBadge, type NavItem } from "@/components/site/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { brl } from "@/lib/booking";
import { mustLawyer } from "@/lib/data";

export const Route = createFileRoute("/painel/cliente")({
  head: () => ({
    meta: [
      { title: "Meu painel | Consullex" },
      { name: "description", content: "Acompanhe suas consultas, mensagens, documentos e pagamentos." },
      { property: "og:title", content: "Meu painel | Consullex" },
      { property: "og:description", content: "Painel do cliente Consullex." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ClientDashboard,
});

const NAV: NavItem[] = [
  { id: "visao", label: "Visão geral", icon: LayoutDashboard },
  { id: "consultorias", label: "Minhas consultorias", icon: CalendarCheck },
  { id: "historico", label: "Histórico", icon: History },
  { id: "mensagens", label: "Mensagens", icon: MessageSquare, badge: 3 },
  { id: "pagamentos", label: "Pagamentos", icon: CreditCard },
  { id: "perfil", label: "Perfil", icon: UserRound },
  { id: "configuracoes", label: "Configurações", icon: Settings },
];

const pedro = mustLawyer("pedro-hayden");
const juliana = mustLawyer("juliana-meireles");
const renata = mustLawyer("renata-oliveira");
const rafael = mustLawyer("rafael-santos");
const UPCOMING = [
  { lawyer: renata, date: "Ter, 18 nov", time: "10:00", mode: "Online", subject: "Acordo de guarda compartilhada" },
  { lawyer: rafael, date: "Sex, 21 nov", time: "15:00", mode: "Online", subject: "Cobrança indevida do cartão" },
];
const PAST = [
  { lawyer: juliana, date: "04 nov 2026", subject: "Vazamento de dados pessoais", value: 280 },
  { lawyer: renata, date: "21 out 2026", subject: "Primeira orientação sobre divórcio", value: 260 },
  { lawyer: pedro, date: "02 set 2026", subject: "Contrato de prestação de serviços", value: 350 },
];
const DOCS = ["Parecer — guarda compartilhada.pdf", "Notificação extrajudicial.pdf", "Comprovantes cartão.zip", "Contrato de serviços revisado.docx"];

function ClientDashboard() {
  const [section, setSection] = useState("visao");
  return (
    <DashboardLayout nav={NAV} active={section} onNavigate={setSection} user={{ name: "Mônica Ribeiro", subtitle: "Cliente · Pessoa Física", initials: "MR" }}>
      {section === "visao" && <Overview go={setSection} />}
      {section === "consultorias" && <Consults />}
      {section === "historico" && <HistoryView />}
      {section === "mensagens" && <Messages />}
      {section === "pagamentos" && <Payments />}
      {section === "perfil" && <Profile />}
      {section === "configuracoes" && <SettingsView />}
    </DashboardLayout>
  );
}

function Title({ title, text }: { title: string; text?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-navy">{title}</h1>
      {text && <p className="mt-1 text-support text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}

function Overview({ go }: { go: (s: string) => void }) {
  const next = UPCOMING[0]!;
  return (
    <>
      <Title title="Boa tarde, Mônica" text="Aqui está um resumo do seu atendimento jurídico." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CalendarClock} label="Próximas consultas" value="2" hint="A próxima é terça-feira" />
        <StatCard icon={CalendarCheck} label="Consultas realizadas" value="7" hint="Desde março de 2026" />
        <StatCard icon={MessageSquare} label="Mensagens não lidas" value="3" hint="De 2 advogados" />
        <StatCard icon={FileText} label="Documentos" value="12" hint="Armazenados com segurança" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="relative overflow-hidden rounded-2xl bg-night-glow p-6 text-on-dark xl:col-span-2">
          <p className="eyebrow">Próxima consulta</p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
            <img src={next.lawyer.photo} alt="" className="h-16 w-16 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="text-lg font-semibold">{next.subject}</p>
              <p className="text-sm text-on-dark-muted">{next.lawyer.name} · {next.date} às {next.time} · {next.mode}</p>
            </div>
            <Button variant="gold" onClick={() => toast("A sala abre 15 minutos antes do horário.")}><Video /> Entrar na sala</Button>
          </div>
          <div className="mt-6 grid gap-3 border-t border-line-dark pt-5 text-sm sm:grid-cols-3">
            <p><span className="block text-xs text-on-dark-muted">Duração</span>{next.lawyer.duration} minutos</p>
            <p><span className="block text-xs text-on-dark-muted">Documentos enviados</span>3 arquivos</p>
            <p><span className="block text-xs text-on-dark-muted">Lembrete</span>WhatsApp, 24h antes</p>
          </div>
        </section>
        <Panel title="Acesso rápido">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="soft" className="h-auto flex-col gap-2 py-4" asChild><Link to="/especialistas"><CalendarCheck />Nova consulta</Link></Button>
            <Button variant="soft" className="h-auto flex-col gap-2 py-4" asChild><Link to="/especialistas"><Search />Especialistas</Link></Button>
            <Button variant="soft" className="h-auto flex-col gap-2 py-4" onClick={() => go("historico")}><FolderClock />Histórico</Button>
            <Button variant="soft" className="h-auto flex-col gap-2 py-4" onClick={() => go("perfil")}><UserRound />Meu perfil</Button>
          </div>
        </Panel>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Próximas consultas" action={<button onClick={() => go("consultorias")} className="text-sm font-semibold text-navy hover:underline">Ver todas</button>}>
          <ConsultList items={UPCOMING} />
        </Panel>
        <Panel title="Mensagens recentes" action={<button onClick={() => go("mensagens")} className="text-sm font-semibold text-navy hover:underline">Abrir</button>}>
          <ul className="space-y-4">
            {([[renata, "Enviei o modelo do acordo para você revisar.", "09:42"], [rafael, "Recebi os comprovantes, obrigado!", "Ontem"], [juliana, "Segue o parecer final em anexo.", "04/11"]] as const).map(([lw, m, t]) => {
              return (
                <li key={lw.slug} className="flex items-center gap-3">
                  <img src={lw.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-navy">{lw.name}</p><p className="truncate text-sm text-muted-foreground">{m as string}</p></div>
                  <span className="text-xs text-muted-foreground">{t as string}</span>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function ConsultList({ items }: { items: typeof UPCOMING }) {
  return (
    <ul className="divide-y divide-border">
      {items.map((c) => (
        <li key={c.subject} className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0">
          <img src={c.lawyer.photo} alt="" className="h-11 w-11 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-navy">{c.subject}</p>
            <p className="text-sm text-muted-foreground">{c.lawyer.name} · {c.date}, {c.time} · {c.mode}</p>
          </div>
          <StatusBadge status="Confirmada" />
        </li>
      ))}
    </ul>
  );
}

function Consults() {
  const [tab, setTab] = useState<"proximas" | "realizadas">("proximas");
  return (
    <>
      <Title title="Minhas consultorias" />
      <div className="mb-5 inline-flex rounded-lg bg-muted p-1">
        {(["proximas", "realizadas"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-md px-4 py-2 text-sm font-semibold ${tab === t ? "bg-card text-navy shadow-soft" : "text-muted-foreground"}`}>{t === "proximas" ? "Próximas" : "Realizadas"}</button>
        ))}
      </div>
      <Panel title={tab === "proximas" ? "Próximas consultas" : "Consultas realizadas"} action={<Button variant="gold" size="sm" asChild><Link to="/especialistas">Agendar nova</Link></Button>}>
        {tab === "proximas" ? <ConsultList items={UPCOMING} /> : (
          <ul className="divide-y divide-border">
            {PAST.map((c) => (
              <li key={c.subject} className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0">
                <img src={c.lawyer.photo} alt="" className="h-11 w-11 rounded-xl object-cover" />
                <div className="min-w-0 flex-1"><p className="font-semibold text-navy">{c.subject}</p><p className="text-sm text-muted-foreground">{c.lawyer.name} · {c.date}</p></div>
                <StatusBadge status="Concluída" />
                <Button variant="outline-navy" size="sm" asChild><Link to="/agendar/$slug" params={{ slug: c.lawyer.slug }}>Agendar retorno</Link></Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}

function HistoryView() {
  return (
    <>
      <Title title="Histórico" text="Consultas passadas, documentos e anexos." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Consultas passadas">
          <ul className="space-y-4">
            {PAST.map((c) => (
              <li key={c.subject} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-gold" />
                <div><p className="font-medium text-navy">{c.subject}</p><p className="text-sm text-muted-foreground">{c.lawyer.name} · {c.date}</p></div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Documentos e anexos">
          <ul className="space-y-2">
            {DOCS.map((d) => (
              <li key={d} className="flex items-center justify-between rounded-lg bg-muted px-4 py-3 text-sm">
                <span className="flex items-center gap-2 text-graphite"><FileText className="h-4 w-4 text-navy" /> {d}</span>
                <button onClick={() => toast("Download iniciado.")} aria-label="Baixar"><Download className="h-4 w-4 text-navy" /></button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function Messages() {
  const [active, setActive] = useState(0);
  const contacts = [renata, rafael, juliana];
  const [threads, setThreads] = useState<{ from: "me" | "them"; text: string }[][]>([
    [{ from: "them", text: "Olá, Mônica! Revisei os pontos que conversamos." }, { from: "them", text: "Enviei o modelo do acordo para você revisar." }],
    [{ from: "me", text: "Segue os comprovantes das cobranças." }, { from: "them", text: "Recebi os comprovantes, obrigado!" }],
    [{ from: "them", text: "Segue o parecer final em anexo." }],
  ]);
  const [text, setText] = useState("");
  const send = () => {
    if (!text.trim()) return;
    setThreads((t) => t.map((th, i) => (i === active ? [...th, { from: "me", text }] : th)));
    setText("");
  };
  return (
    <>
      <Title title="Mensagens" text="Conversas com seus advogados, protegidas por sigilo." />
      <div className="grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[280px_1fr]">
        <ul className="border-b border-border md:border-b-0 md:border-r">
          {contacts.map((c, i) => (
            <li key={c.slug}>
              <button onClick={() => setActive(i)} className={`flex w-full items-center gap-3 px-4 py-4 text-left ${active === i ? "bg-secondary" : "hover:bg-muted"}`}>
                <img src={c.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
                <span className="min-w-0"><span className="block text-sm font-semibold text-navy">{c.name}</span><span className="block truncate text-xs text-muted-foreground">{threads[i]?.at(-1)?.text}</span></span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex min-h-[420px] flex-col">
          <div className="flex-1 space-y-3 p-5">
            {(threads[active] ?? []).map((m, i) => (
              <p key={i} className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "me" ? "ml-auto bg-navy text-on-dark" : "bg-muted text-graphite"}`}>{m.text}</p>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2 border-t border-border p-4">
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Escreva uma mensagem..." className="h-11" />
            <Button type="submit" variant="navy" size="lg" aria-label="Enviar"><Send /></Button>
          </form>
        </div>
      </div>
    </>
  );
}

function Payments() {
  return (
    <>
      <Title title="Pagamentos" />
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Faturas" className="xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground"><tr><th className="pb-3 font-medium">Data</th><th className="pb-3 font-medium">Descrição</th><th className="pb-3 font-medium">Valor</th><th className="pb-3 font-medium">Status</th></tr></thead>
              <tbody className="divide-y divide-border">
                {[...UPCOMING.map((u) => ({ d: u.date, s: `Consulta — ${u.lawyer.name}`, v: u.lawyer.price, st: "Pago" as const })), ...PAST.map((p) => ({ d: p.date, s: `Consulta — ${p.lawyer.name}`, v: p.value, st: "Pago" as const }))].map((r, i) => (
                  <tr key={i}><td className="py-3 text-graphite">{r.d}</td><td className="py-3 text-navy">{r.s}</td><td className="py-3 font-semibold text-navy">{brl(r.v)}</td><td className="py-3"><StatusBadge status={r.st} /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Métodos de pagamento">
          <div className="rounded-xl bg-navy p-5 text-on-dark">
            <p className="text-xs uppercase tracking-widest text-on-dark-muted">Cartão principal</p>
            <p className="mt-6 text-lg tracking-[0.2em]">•••• •••• •••• 4821</p>
            <p className="mt-2 text-xs text-on-dark-muted">MÔNICA RIBEIRO · 08/29</p>
          </div>
          <Button variant="outline-navy" className="mt-4 w-full" onClick={() => toast("Em breve você poderá adicionar novos cartões.")}>Adicionar método</Button>
        </Panel>
      </div>
    </>
  );
}

function Profile() {
  return (
    <>
      <Title title="Perfil" text="Seus dados pessoais." />
      <Panel title="Dados pessoais">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Dados atualizados."); }} className="grid gap-4 sm:grid-cols-2">
          {[["Nome completo", "Mônica Ribeiro"], ["E-mail", "monica@email.com"], ["Telefone", "(11) 98765-4321"], ["CPF", "***.456.789-**"], ["Cidade", "São Paulo"], ["Estado", "SP"]].map(([l, v]) => (
            <div key={l} className="space-y-2"><Label>{l}</Label><Input defaultValue={v} className="h-11" disabled={l === "CPF"} /></div>
          ))}
          <div className="sm:col-span-2"><Button type="submit" variant="navy">Salvar alterações</Button></div>
        </form>
      </Panel>
    </>
  );
}

function SettingsView() {
  return (
    <>
      <Title title="Configurações" />
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Notificações">
          <SettingRow title="Lembretes de consulta" text="E-mail e WhatsApp 24h antes"><Switch defaultChecked /></SettingRow>
          <SettingRow title="Novas mensagens" text="Aviso quando o advogado responder"><Switch defaultChecked /></SettingRow>
          <SettingRow title="Conteúdos e novidades" text="Newsletter mensal"><Switch /></SettingRow>
        </Panel>
        <Panel title="Segurança">
          <SettingRow title="Verificação em duas etapas" text="Código extra ao entrar"><Switch /></SettingRow>
          <SettingRow title="Senha" text="Alterada há 3 meses"><Button variant="outline-navy" size="sm" onClick={() => toast("Enviamos um link para seu e-mail.")}>Alterar</Button></SettingRow>
        </Panel>
        <Panel title="Privacidade">
          <SettingRow title="Compartilhar histórico" text="Permitir que novos advogados vejam consultas anteriores"><Switch /></SettingRow>
          <SettingRow title="Meus dados (LGPD)" text="Baixe ou solicite a exclusão"><Button variant="outline-navy" size="sm" onClick={() => toast("Solicitação registrada.")}>Solicitar</Button></SettingRow>
        </Panel>
      </div>
    </>
  );
}
