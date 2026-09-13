import type { Metadata } from "next";
import { JourneyTimeline } from "@/components/collection/JourneyTimeline";
import { EditionRecord } from "@/components/collection/EditionRecord";
import { CatalogueIndex } from "@/components/collection/CatalogueIndex";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { leadArtist } from "@/content/artists";
import { production } from "@/content/collections";
import { mostarStory } from "@/content/mostar";
import { getCollection } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Collection 01 — The Balkan Collection",
  description:
    "The launch collection: twelve monthly editions, twelve Balkan cities, each drawn by an artist who lives there. An exhibition catalogue opening in Mostar.",
};

// Re-fetch Shopify editions/availability at most hourly (ISR).
export const revalidate = 3600;

export default async function CollectionPage() {
  // Editions come from Shopify when configured; from content/collections.ts
  // otherwise. Adding a product in Shopify adds a plate here.
  const balkanCollection = await getCollection();
  const editions = balkanCollection.editions;
  const opening = editions[0];

  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      {/* masthead */}
      <header className="grid gap-8 border-b border-hairline pb-12 lg:grid-cols-[2fr_1fr] lg:items-end">
        <div>
          <p className="mono-label">
            {balkanCollection.code} · {balkanCollection.region} · {balkanCollection.year}
          </p>
          <h1 className="font-serif-display mt-5 text-[clamp(2.6rem,7vw,4.6rem)]">
            {balkanCollection.title}
          </h1>
          <p className="mt-5 max-w-[var(--container-measure)] text-[1.05rem] italic leading-relaxed text-ink-soft">
            Twelve months, twelve cities across the Balkans, each with its own
            artist and its own story. {mostarStory.standfirst} We open in{" "}
            {opening.city}.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-[0.72rem] uppercase tracking-[0.06em]">
          <div>
            <dt className="text-pencil">Opens in</dt>
            <dd className="mt-1 text-ink">{opening.city}, {opening.country}</dd>
          </div>
          <div>
            <dt className="text-pencil">Editions</dt>
            <dd className="mt-1 text-ink">12 · monthly</dd>
          </div>
          <div>
            <dt className="text-pencil">Launch</dt>
            <dd className="mt-1 text-ink">{balkanCollection.launchMonth}</dd>
          </div>
          <div>
            <dt className="text-pencil">Format</dt>
            <dd className="mt-1 text-ink">{production.mainFormat} + {production.companionFormat}</dd>
          </div>
        </dl>
      </header>

      {/* introduction — the opening city, Mostar */}
      <section className="mt-14 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="max-w-[var(--container-measure)] space-y-6 text-[1.05rem] leading-relaxed text-ink-soft">
          <p className="mono-label !text-accent-deep">
            {opening.code} · Why we open here
          </p>
          {mostarStory.full.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
        <aside className="h-fit border border-hairline bg-paper-deep/40 p-6">
          <p className="mono-label mb-4">{opening.city}, in brief</p>
          <dl className="divide-y divide-hairline-soft">
            {mostarStory.facts.map((f) => (
              <div key={f.label} className="grid gap-0.5 py-3">
                <dt className="mono-label">{f.label}</dt>
                <dd className="font-mono text-[0.8rem] text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* the year as a route */}
      <section className="mt-20">
        <SectionHeader index="Route" label="Twelve cities, one collection" title="The year at a glance" />
        <div className="mt-10">
          <JourneyTimeline editions={editions} code={balkanCollection.code} />
        </div>
      </section>

      {/* the catalogue proper */}
      <section className="mt-24">
        <SectionHeader index="Cat." label="Exhibition catalogue" title="The plates" />
        <div className="mt-10 grid gap-12 lg:grid-cols-[160px_1fr]">
          <CatalogueIndex editions={editions} />
          <div className="space-y-14">
            {editions.map((edition, i) => (
              <EditionRecord
                key={edition.code}
                edition={edition}
                collection={balkanCollection}
                index={i}
                total={editions.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* the artist */}
      <section className="mt-24 border-t border-hairline pt-12">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-end">
          <div className="max-w-[var(--container-measure)]">
            <p className="mono-label">The maker of {opening.code}</p>
            <h2 className="font-serif-display mt-4 text-3xl">{leadArtist.name}</h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">
              {leadArtist.standfirst} {leadArtist.connection}
            </p>
          </div>
          <div className="md:justify-self-end">
            <ButtonLink href="/artists" variant="framed">
              The artist, in full
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* full register */}
      <section className="mt-24">
        <SectionHeader index="Reg." label="Edition register" title="The register" />
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-hairline">
                {["Code", "Month", "City", "Subject", "Site", "Technique", "Edition", "Status"].map((h) => (
                  <th key={h} scope="col" className="mono-label py-3 pr-6 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono text-[0.82rem] text-ink-soft">
              {editions.map((e) => {
                const sealed = e.status === "sealed";
                return (
                  <tr key={e.code} className="border-b border-hairline-soft">
                    <td className="py-3 pr-6 text-ink">
                      <a href={`#${e.code}`} className="hover:text-accent-deep">{e.code}</a>
                    </td>
                    <td className="py-3 pr-6">{e.month}</td>
                    <td className="py-3 pr-6 text-ink">{e.city}</td>
                    <td className="py-3 pr-6">{sealed ? "— sealed —" : e.subject}</td>
                    <td className="py-3 pr-6">{sealed ? "—" : e.site}</td>
                    <td className="py-3 pr-6">{e.technique ?? "—"}</td>
                    <td className="py-3 pr-6">{e.editionSize ?? "—"}</td>
                    <td className="py-3">
                      {e.status === "current" ? (
                        <span className="text-accent-deep">open until the 20th</span>
                      ) : (
                        e.status
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-16 flex flex-wrap gap-6">
        <ButtonLink href="/subscribe" variant="ink">
          Join the collection
        </ButtonLink>
        <ButtonLink href="/how-it-works" variant="text">
          How the monthly cycle works →
        </ButtonLink>
      </div>
    </div>
  );
}
