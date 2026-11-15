import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ptBR } from "date-fns/locale";
import { Building, CalendarDays, Copy, CreditCard, FileText, Monitor, Paperclip, QrCode, Receipt, Tag, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { FlowHeader, Stepper } from "@/components/site/FlowHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { applyCoupon, brl, saveBooking, slotsFor, type Mode, type PaymentMethod } from "@/lib/booking";
import { AREAS, LAWYERS, areaName, getLawyer } from "@/lib/data";
import { onlyDigits } from "@/lib/validators";

export const Route = createFileRoute("/agendar/$slug")({
  loader: ({ params }) => {
    const lawyer = getLawyer(params.slug);
    if (!lawyer) throw notFound();
    return { lawyer };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `Agendar consulta com ${loaderData.lawyer.name} | Consullex` : "Agendamento indisponível | Consullex";
    return {
      meta: [
        { title },
        { name: "description", content: "Escolha data e horário, conte sobre seu caso e conclua o pagamento com segurança." },
        { property: "og:title", content: title },
        { property: "og:description", content: "Agende sua consulta jurídica online ou presencial." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: Booking,
});

const STEPS = ["Horário", "Dados", "Atendimento", "Pagamento", "Resumo"];
const TIMEZONES = ["Brasília (GMT-3)", "Manaus (GMT-4)", "Rio Branco (GMT-5)", "Fernando de Noronha (GMT-2)", "Lisboa (GMT+0)"];

function Booking() {
  const { lawyer: l } = Route.useLoaderData();
  const navigate = useNavigate();
  const seed = LAWYERS.findIndex((x) => x.slug === l.slug) + 1;

  const [step, setStep] = useState(0);
  const [today, setToday] = useState<Date | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [tz, setTz] = useState<string>("Brasília (GMT-3)");
  const [area, setArea] = useState(l.area);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>(l.modes[0] ?? "online");
  const [payment, setPayment] = useState<PaymentMethod>("cartao");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | undefined>();
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "", installments: "1" });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setToday(t);
  }, []);

  const slots = useMemo(() => (date ? slotsFor(seed, date) : []), [date, seed]);
  const pricing = applyCoupon(l.price, coupon);

  const validate = () => {
    if (step === 0 && (!date || !time)) return "Escolha uma data e um horário disponível.";
    if (step === 1 && (subject.trim().length < 4 || description.trim().length < 20)) return "Informe um assunto e descreva seu caso com pelo menos 20 caracteres.";
    if (step === 3 && payment === "cartao") {
      if (onlyDigits(card.number).length < 16 || card.name.trim().length < 3 || !/^\d{2}\/\d{2}$/.test(card.exp) || onlyDigits(card.cvv).length < 3)
        return "Confira os dados do cartão.";
    }
    if (step === 4 && !agree) return "Confirme que leu e concorda com os termos para continuar.";
    return "";
  };

  const next = () => {
    const msg = validate();
    setError(msg);
    if (msg) return;
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    saveBooking({
      slug: l.slug,
      lawyerName: l.name,
      dateISO: date!.toISOString(),
      time,
      timezone: tz,
      area: areaName(area),
      subject,
      description,
      attachments: files,
      mode,
      payment,
      coupon,
      price: l.price,
      discount: pricing.discount,
      total: pricing.total,
      code: `CX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    });
    navigate({ to: "/confirmacao" });
  };

  const dateLabel = date ? date.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" }) : "—";
  const paymentLabel = { cartao: "Cartão de crédito", pix: "Pix", boleto: "Boleto bancário" }[payment];

  return (
    <div className="min-h-screen bg-surface">
      <FlowHeader label="Agendamento seguro" />
      <div className="container-page py-8">
        <Link to="/especialistas/$slug" params={{ slug: l.slug }} className="text-sm text-muted-foreground hover:text-navy">← Voltar ao perfil</Link>
        <div className="mt-4"><Stepper steps={STEPS} current={step} /></div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            {step === 0 && (
              <section>
                <h1 className="text-2xl font-semibold text-navy">Escolha a melhor data e horário</h1>
                <p className="mt-1 text-support text-sm text-muted-foreground">Os horários são exibidos no fuso selecionado.</p>
                <div className="mt-6 grid gap-8 md:grid-cols-[auto_1fr]">
                  <div className="rounded-2xl border border-border p-2">
                    {today ? (
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={date}
                        onSelect={(d) => { setDate(d); setTime(""); }}
                        disabled={[{ before: new Date(today.getTime() + 86400000) }, { dayOfWeek: [0] }]}
                        className="[--cell-size:2.4rem]"
                      />
                    ) : <div className="h-[320px] w-[300px]" />}
                  </div>
                  <div>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-navy">Fuso horário</span>
                      <select value={tz} onChange={(e) => setTz(e.target.value)} className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-gold">
                        {TIMEZONES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </label>
                    <p className="mb-3 mt-6 text-sm font-semibold text-navy first-letter:uppercase">{date ? dateLabel : "Selecione uma data"}</p>
                    {date && (slots.length ? (
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {slots.map((s) => (
                          <button key={s} onClick={() => setTime(s)} className={`rounded-lg border py-2.5 text-sm font-semibold transition-colors ${time === s ? "border-navy bg-navy text-gold" : "border-border text-navy hover:border-gold"}`}>{s}</button>
                        ))}
                      </div>
                    ) : <p className="text-sm text-muted-foreground">Sem horários neste dia. Tente outra data.</p>)}
                  </div>
                </div>
              </section>
            )}

            {step === 1 && (
              <section className="space-y-5">
                <div>
                  <h1 className="text-2xl font-semibold text-navy">Conte-nos mais sobre sua necessidade</h1>
                  <p className="mt-1 text-support text-sm text-muted-foreground">Essas informações são sigilosas e compartilhadas apenas com {l.name}.</p>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-navy">Área / especialidade</span>
                  <select value={area} onChange={(e) => setArea(e.target.value)} className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-gold">
                    {AREAS.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
                  </select>
                </label>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-semibold text-navy">Assunto</Label>
                  <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ex.: Revisão de contrato de locação" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc" className="font-semibold text-navy">Descrição detalhada</Label>
                  <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} placeholder="Descreva o que aconteceu, datas importantes e o que você gostaria de entender." />
                  <p className="text-xs text-muted-foreground">{description.trim().length}/20 caracteres mínimos</p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-navy">Anexos (opcional)</p>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 text-sm text-muted-foreground transition-colors hover:border-gold hover:text-navy">
                    <Paperclip className="h-4 w-4" /> Clique para anexar documentos (PDF, imagens)
                    <input type="file" multiple className="sr-only" onChange={(e) => setFiles((f) => [...f, ...Array.from(e.target.files ?? []).map((x) => x.name)])} />
                  </label>
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((f, i) => (
                        <li key={f + i} className="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-sm text-graphite">
                          <span className="flex items-center gap-2"><FileText className="h-4 w-4" /> {f}</span>
                          <button onClick={() => setFiles(files.filter((_, k) => k !== i))} aria-label="Remover"><X className="h-4 w-4" /></button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            )}

            {step === 2 && (
              <section>
                <h1 className="text-2xl font-semibold text-navy">Como você deseja realizar a consulta?</h1>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {(["online", "presencial"] as const).map((m) => {
                    const available = l.modes.includes(m);
                    return (
                      <button
                        key={m}
                        disabled={!available}
                        onClick={() => setMode(m)}
                        className={`rounded-2xl border-2 p-6 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50 ${mode === m ? "border-gold bg-gold/5 shadow-soft" : "border-border hover:border-navy/30"}`}
                      >
                        {m === "online" ? <Monitor className="h-6 w-6 text-navy" /> : <Building className="h-6 w-6 text-navy" />}
                        <p className="mt-4 font-semibold text-navy">{m === "online" ? "Online (videochamada)" : "Presencial"}</p>
                        <p className="mt-1 text-support text-sm text-muted-foreground">
                          {m === "online" ? "Você recebe o link seguro por e-mail e no seu painel." : available ? l.office : "Este advogado atende apenas online."}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {step === 3 && (
              <section>
                <h1 className="text-2xl font-semibold text-navy">Escolha a forma de pagamento</h1>
                <div className="mt-6 flex gap-2">
                  <Input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Cupom de desconto (opcional)" className="h-11" />
                  <Button
                    variant="outline-navy"
                    size="lg"
                    onClick={() => {
                      const r = applyCoupon(l.price, couponInput);
                      if (r.valid) { setCoupon(couponInput.trim().toUpperCase()); toast.success("Cupom aplicado!"); }
                      else { setCoupon(undefined); toast.error("Cupom inválido ou expirado."); }
                    }}
                  >
                    <Tag /> Aplicar
                  </Button>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {([["cartao", "Cartão de crédito", CreditCard], ["pix", "Pix", QrCode], ["boleto", "Boleto", Receipt]] as const).map(([v, label, Icon]) => (
                    <button key={v} onClick={() => setPayment(v)} className={`flex items-center gap-3 rounded-xl border-2 p-4 text-sm font-semibold transition-all ${payment === v ? "border-gold bg-gold/5 text-navy" : "border-border text-graphite hover:border-navy/30"}`}>
                      <Icon className="h-5 w-5" /> {label}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  {payment === "cartao" && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2 sm:col-span-2"><Label htmlFor="cc">Número do cartão</Label><Input id="cc" inputMode="numeric" placeholder="0000 0000 0000 0000" value={card.number} onChange={(e) => setCard({ ...card, number: onlyDigits(e.target.value).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ") })} className="h-11" /></div>
                      <div className="space-y-2 sm:col-span-2"><Label htmlFor="cn">Nome impresso no cartão</Label><Input id="cn" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })} className="h-11" /></div>
                      <div className="space-y-2"><Label htmlFor="ce">Validade</Label><Input id="ce" placeholder="MM/AA" value={card.exp} onChange={(e) => setCard({ ...card, exp: onlyDigits(e.target.value).slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2") })} className="h-11" /></div>
                      <div className="space-y-2"><Label htmlFor="cv">CVV</Label><Input id="cv" inputMode="numeric" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: onlyDigits(e.target.value).slice(0, 4) })} className="h-11" /></div>
                      <label className="block sm:col-span-2">
                        <span className="mb-2 block text-sm font-medium">Parcelas</span>
                        <select value={card.installments} onChange={(e) => setCard({ ...card, installments: e.target.value })} className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none">
                          {[1, 2, 3].map((n) => <option key={n} value={n}>{n}x de {brl(pricing.total / n)} sem juros</option>)}
                        </select>
                      </label>
                    </div>
                  )}
                  {payment === "pix" && (
                    <div className="flex flex-col items-center gap-4 rounded-2xl bg-surface p-6 text-center sm:flex-row sm:text-left">
                      <span className="grid h-28 w-28 place-items-center rounded-xl bg-card shadow-soft"><QrCode className="h-20 w-20 text-navy" /></span>
                      <div>
                        <p className="font-semibold text-navy">O QR Code Pix é gerado ao confirmar</p>
                        <p className="mt-1 text-support text-sm text-muted-foreground">Pagamento aprovado na hora. Você também poderá usar o Pix copia e cola.</p>
                        <Button variant="soft" size="sm" className="mt-3" onClick={() => toast("O código será liberado após a confirmação.")}><Copy /> Pix copia e cola</Button>
                      </div>
                    </div>
                  )}
                  {payment === "boleto" && (
                    <div className="rounded-2xl bg-surface p-6">
                      <p className="font-semibold text-navy">Boleto com vencimento em 1 dia útil</p>
                      <p className="mt-1 text-support text-sm text-muted-foreground">O horário fica reservado até a compensação (até 2 dias úteis). Enviaremos o boleto por e-mail.</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {step === 4 && (
              <section>
                <h1 className="text-2xl font-semibold text-navy">Revise os detalhes</h1>
                <dl className="mt-6 divide-y divide-border rounded-2xl border border-border">
                  {[
                    ["Advogado", l.name],
                    ["Data e horário", `${dateLabel} às ${time} · ${tz}`],
                    ["Tipo de atendimento", mode === "online" ? "Online (videochamada)" : `Presencial · ${l.office}`],
                    ["Área", areaName(area)],
                    ["Assunto", subject],
                    ["Anexos", files.length ? `${files.length} arquivo(s)` : "Nenhum"],
                    ["Forma de pagamento", paymentLabel],
                    ["Valor", brl(pricing.total)],
                  ].map(([k, v]) => (
                    <div key={k} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[180px_1fr]">
                      <dt className="text-sm text-muted-foreground">{k}</dt>
                      <dd className="text-sm font-medium text-navy">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex items-start gap-3">
                  <Checkbox id="agree" checked={agree} onCheckedChange={(v) => setAgree(v === true)} className="mt-0.5" />
                  <Label htmlFor="agree" className="text-sm font-normal leading-relaxed text-graphite">
                    Li e concordo com os <Link to="/termos" className="font-semibold text-navy underline">Termos de Uso</Link> e a <Link to="/privacidade" className="font-semibold text-navy underline">Política de Privacidade</Link>.
                  </Label>
                </div>
              </section>
            )}

            {error && <p className="mt-5 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">{error}</p>}

            <div className="mt-8 flex justify-between gap-3 border-t border-border pt-6">
              <Button variant="outline-navy" size="lg" onClick={() => { setError(""); setStep(Math.max(0, step - 1)); }} disabled={step === 0}>Voltar</Button>
              <Button variant={step === 4 ? "gold" : "navy"} size="lg" onClick={next}>{step === 4 ? "Confirmar agendamento" : "Continuar"}</Button>
            </div>
          </div>

          <aside>
            <div className="sticky top-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <img src={l.photo} alt="" width={56} height={56} className="h-14 w-14 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-navy">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.oab}</p>
                </div>
              </div>
              <div className="mt-5 space-y-2 text-sm text-graphite">
                <p className="flex items-center gap-2 first-letter:uppercase"><CalendarDays className="h-4 w-4 text-gold" /> {date ? `${dateLabel}${time ? ` · ${time}` : ""}` : "Data a definir"}</p>
                <p className="flex items-center gap-2">{mode === "online" ? <Monitor className="h-4 w-4 text-gold" /> : <Building className="h-4 w-4 text-gold" />} {mode === "online" ? "Online" : "Presencial"} · {l.duration} min</p>
              </div>
              <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
                <div className="flex justify-between text-graphite"><span>Consulta</span><span>{brl(l.price)}</span></div>
                {pricing.discount > 0 && <div className="flex justify-between text-emerald-bright"><span>Cupom {coupon}</span><span>− {brl(pricing.discount)}</span></div>}
                <div className="flex justify-between pt-2 text-lg font-semibold text-navy"><span>Total</span><span>{brl(pricing.total)}</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
