import { createFileRoute } from "@tanstack/react-router";
import { LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import { LawyerCard } from "@/components/site/LawyerCard";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AREAS, LANGUAGES, LAWYERS, STATES, areaName } from "@/lib/data";
import { brl } from "@/lib/booking";

type Search = { area?: string | undefined; q?: string | undefined };

export const Route = createFileRoute("/especialistas/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    area: typeof s["area"] === "string" && s["area"] ? s["area"] : undefined,
    q: typeof s["q"] === "string" && s["q"] ? s["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Buscar advogados especialistas — Consullex" },
      { name: "description", content: "Filtre advogados por área, especialidade, cidade, tipo de atendimento, preço, idioma e avaliação. Agende sua consulta online ou presencial." },
      { property: "og:title", content: "Buscar advogados especialistas — Consullex" },
      { property: "og:description", content: "Compare perfis verificados pela OAB e agende sua consulta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

type Filters = {
  q: string;
  area: string;
  specialty: string;
  state: string;
  city: string;
  modes: string[];
  maxPrice: number;
  languages: string[];
  minRating: number;
  availableNow: boolean;
};

const MAX_PRICE = 600;
const SORTS = [
  { v: "relevancia", l: "Mais relevantes" },
  { v: "avaliacao", l: "Melhor avaliação" },
  { v: "menor-preco", l: "Menor preço" },
  { v: "maior-preco", l: "Maior preço" },
  { v: "agendados", l: "Mais agendados" },
];

function SearchPage() {
  const search = Route.useSearch();
  const empty: Filters = { q: "", area: "", specialty: "", state: "", city: "", modes: [], maxPrice: MAX_PRICE, languages: [], minRating: 0, availableNow: false };
  const [f, setF] = useState<Filters>({ ...empty, q: search.q ?? "", area: search.area ?? "" });
  const [sort, setSort] = useState("relevancia");
  const [view, setView] = useState<"grid" | "list">("grid");
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setF((p) => ({ ...p, [k]: v }));

  const specialties = useMemo(
    () => Array.from(new Set(LAWYERS.filter((l) => !f.area || l.area === f.area).flatMap((l) => l.specialties))).sort(),
    [f.area],
  );
  const cities = useMemo(() => Array.from(new Set(LAWYERS.filter((l) => !f.state || l.state === f.state).map((l) => l.city))).sort(), [f.state]);

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const list = LAWYERS.filter((l) => {
      if (q && ![l.name, l.headline, l.bio, areaName(l.area), ...l.specialties].join(" ").toLowerCase().includes(q)) return false;
      if (f.area && l.area !== f.area) return false;
      if (f.specialty && !l.specialties.includes(f.specialty)) return false;
      if (f.state && l.state !== f.state) return false;
      if (f.city && l.city !== f.city) return false;
      if (f.modes.length && !f.modes.every((m) => l.modes.includes(m as "online" | "presencial"))) return false;
      if (l.price > f.maxPrice) return false;
      if (f.languages.length && !f.languages.every((x) => l.languages.includes(x))) return false;
      if (l.rating < f.minRating) return false;
      if (f.availableNow && !l.availableNow) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "avaliacao") sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    if (sort === "menor-preco") sorted.sort((a, b) => a.price - b.price);
    if (sort === "maior-preco") sorted.sort((a, b) => b.price - a.price);
    if (sort === "agendados") sorted.sort((a, b) => b.sessions - a.sessions);
    return sorted;
  }, [f, sort]);

  const activeCount = [f.area, f.specialty, f.state, f.city, f.modes.length, f.maxPrice < MAX_PRICE, f.languages.length, f.minRating, f.availableNow].filter(Boolean).length;

  const toggle = (k: "modes" | "languages", v: string) => set(k, f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v]);

  const filtersPanel = (
    <div className="space-y-7">
      <FilterSelect label="Área jurídica" value={f.area} onChange={(v) => setF((p) => ({ ...p, area: v, specialty: "" }))} options={AREAS.map((a) => [a.slug, a.name] as [string, string])} placeholder="Todas as áreas" />
      <FilterSelect label="Especialidade" value={f.specialty} onChange={(v) => set("specialty", v)} options={specialties.map((s) => [s, s] as [string, string])} placeholder="Todas" />
      <div className="grid grid-cols-2 gap-3">
        <FilterSelect label="Estado" value={f.state} onChange={(v) => setF((p) => ({ ...p, state: v, city: "" }))} options={STATES.map((s) => [s, s] as [string, string])} placeholder="Todos" />
        <FilterSelect label="Cidade" value={f.city} onChange={(v) => set("city", v)} options={cities.map((c) => [c, c] as [string, string])} placeholder="Todas" />
      </div>
      <FilterGroup title="Atendimento">
        {([["online", "Online (vídeo)"], ["presencial", "Presencial (escritório)"]] as const).map(([v, l]) => (
          <CheckRow key={v} id={`m-${v}`} label={l} checked={f.modes.includes(v)} onChange={() => toggle("modes", v)} />
        ))}
      </FilterGroup>
      <FilterGroup title={`Valor da consulta: até ${brl(f.maxPrice)}`}>
        <Slider min={150} max={MAX_PRICE} step={10} value={[f.maxPrice]} onValueChange={([v]) => set("maxPrice", v ?? MAX_PRICE)} className="mt-2" />
      </FilterGroup>
      <FilterGroup title="Idioma">
        {LANGUAGES.map((l) => <CheckRow key={l} id={`l-${l}`} label={l} checked={f.languages.includes(l)} onChange={() => toggle("languages", l)} />)}
      </FilterGroup>
      <FilterGroup title="Avaliação mínima">
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button key={r} onClick={() => set("minRating", r)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${f.minRating === r ? "border-gold bg-gold/15 text-navy" : "border-border text-graphite hover:border-navy/40"}`}>
              {r === 0 ? "Qualquer" : `${r.toString().replace(".", ",")}+ ★`}
            </button>
          ))}
        </div>
      </FilterGroup>
      <Button variant="outline-navy" className="w-full" onClick={() => setF(empty)}>Limpar filtros</Button>
    </div>
  );

  return (
    <SiteShell>
      <section className="bg-navy text-on-dark">
        <div className="container-page py-12">
          <p className="eyebrow">Descoberta</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Encontre o advogado ideal para o seu caso</h1>
          <div className="mt-8 flex flex-col gap-2 rounded-2xl bg-card p-2 sm:flex-row">
            <label className="flex flex-1 items-center gap-2 px-3 text-navy">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input value={f.q} onChange={(e) => set("q", e.target.value)} placeholder="Busque por nome, área ou palavra-chave" className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              {f.q && <button onClick={() => set("q", "")} aria-label="Limpar busca"><X className="h-4 w-4 text-muted-foreground" /></button>}
            </label>
            <select value={f.area} onChange={(e) => setF((p) => ({ ...p, area: e.target.value, specialty: "" }))} className="h-11 rounded-lg border border-border bg-surface px-3 text-sm text-graphite outline-none sm:w-56" aria-label="Área jurídica">
              <option value="">Todas as áreas</option>
              {AREAS.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
            </select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="navy" size="lg" className="lg:hidden"><SlidersHorizontal /> Filtros {activeCount > 0 && `(${activeCount})`}</Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[340px] overflow-y-auto">
                <SheetTitle className="mb-6 text-navy">Todos os filtros</SheetTitle>
                {filtersPanel}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 flex items-center gap-2 font-semibold text-navy"><SlidersHorizontal className="h-4 w-4" /> Filtros {activeCount > 0 && <span className="rounded-full bg-gold px-2 text-xs text-navy">{activeCount}</span>}</h2>
            {filtersPanel}
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-navy">{results.length}</span> {results.length === 1 ? "especialista encontrado" : "especialistas encontrados"}
              {f.area && <> em <span className="font-semibold text-navy">{areaName(f.area)}</span></>}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-graphite">
                <Switch checked={f.availableNow} onCheckedChange={(v) => set("availableNow", v)} /> Horários esta semana
              </label>
              <label className="flex items-center gap-2 text-sm text-graphite">
                Ordenar por
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-9 rounded-lg border border-border bg-card px-2 text-sm font-semibold text-navy outline-none">
                  {SORTS.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
                </select>
              </label>
              <div className="hidden rounded-lg border border-border p-0.5 sm:flex">
                <button onClick={() => setView("grid")} aria-label="Grade" className={`rounded-md p-1.5 ${view === "grid" ? "bg-navy text-on-dark" : "text-muted-foreground"}`}><LayoutGrid className="h-4 w-4" /></button>
                <button onClick={() => setView("list")} aria-label="Lista" className={`rounded-md p-1.5 ${view === "list" ? "bg-navy text-on-dark" : "text-muted-foreground"}`}><List className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
              <h3 className="text-lg font-semibold text-navy">Nenhum especialista com esses filtros</h3>
              <p className="mt-2 text-support text-sm text-muted-foreground">Tente ampliar a faixa de preço ou remover alguns filtros.</p>
              <Button variant="navy" className="mt-6" onClick={() => setF(empty)}>Limpar filtros</Button>
            </div>
          ) : (
            <div className={`mt-6 grid gap-6 ${view === "grid" ? "md:grid-cols-2" : "grid-cols-1"}`}>
              {results.map((l) => <LawyerCard key={l.slug} lawyer={l} />)}
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-navy">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function CheckRow({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id} className="text-sm font-normal text-graphite">{label}</Label>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][]; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-navy">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-graphite outline-none focus:border-gold">
        <option value="">{placeholder}</option>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}
