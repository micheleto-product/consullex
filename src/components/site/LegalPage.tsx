import { PageHero } from "./PageHero";
import { SiteShell } from "./SiteShell";

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: [string, string][] }) {
  return (
    <SiteShell>
      <PageHero eyebrow="Documento legal" title={title} text={intro} />
      <article className="container-page max-w-3xl py-16">
        <p className="mb-10 rounded-xl bg-ivory/70 p-4 text-sm text-graphite">Última atualização: 15 de novembro de 2026.</p>
        {sections.map(([h, p], i) => (
          <section key={h} className="mb-10">
            <h2 className="text-xl font-semibold text-navy">{i + 1}. {h}</h2>
            <p className="mt-3 text-support leading-relaxed text-graphite">{p}</p>
          </section>
        ))}
      </article>
    </SiteShell>
  );
}
