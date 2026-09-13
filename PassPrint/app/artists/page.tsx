import type { Metadata } from "next";
import { ArtworkPlaceholder } from "@/components/artwork/ArtworkPlaceholder";
import { ArtistPortrait } from "@/components/artist/ArtistPortrait";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { leadArtist } from "@/content/artists";
import { balkanCollection, currentEdition } from "@/content/collections";

export const metadata: Metadata = {
  title: "Ajla M. — Artist",
  description:
    "Ajla M., born and working in Mostar, draws the launch edition of The Balkan Collection. Biography, philosophy, process, studio and featured works.",
};

/** Small helper: a titled block of paragraphs, set like a catalogue essay. */
function Essay({
  index,
  label,
  title,
  paragraphs,
}: {
  index: string;
  label: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <section className="mt-20">
      <SectionHeader index={index} label={label} title={title} />
      <div className="mt-6 max-w-[var(--container-measure)] space-y-5 text-[1.02rem] leading-relaxed text-ink-soft">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </section>
  );
}

export default function ArtistsPage() {
  const artist = leadArtist;

  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      {/* introduction */}
      <header className="grid gap-10 border-b border-hairline pb-14 lg:grid-cols-[1.6fr_1fr] lg:items-end">
        <div>
          <p className="mono-label">
            {currentEdition.code} · one city, one artist
          </p>
          <h1 className="font-serif-display mt-5 text-[clamp(2.6rem,7vw,4.6rem)]">
            {artist.name}
          </h1>
          <p className="mono-label mt-4">
            {artist.role} · {artist.city}, {artist.country} · {artist.technique}
          </p>
          <p className="mt-6 max-w-[var(--container-measure)] text-[1.08rem] leading-relaxed text-ink-soft">
            {artist.standfirst}
          </p>
        </div>
        <figure>
          <ArtistPortrait artist={artist} />
          <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-pencil">
            {artist.name} in the studio, {artist.city}
          </figcaption>
        </figure>
      </header>

      {/* the quote, given room */}
      <blockquote className="mt-16 border-l-2 border-accent pl-6 md:pl-10">
        <p className="font-serif-display max-w-4xl text-[clamp(1.5rem,3.4vw,2.4rem)] italic leading-snug">
          &ldquo;{artist.quote}&rdquo;
        </p>
        <cite className="mono-label mt-5 block not-italic">
          — {artist.name}
        </cite>
      </blockquote>

      <Essay index="§ 01" label="Biography" title="A life in one city" paragraphs={artist.biography} />
      <Essay index="§ 02" label="Artistic philosophy" title="Against the postcard" paragraphs={artist.philosophy} />
      <Essay index="§ 03" label="Creative process" title="How an edition is made" paragraphs={artist.process} />

      {/* studio + materials + inspiration */}
      <section className="mt-20">
        <SectionHeader index="§ 04" label="The studio" title="Where the work is made" />
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          <div>
            <p className="mono-label mb-3">Studio</p>
            <p className="text-[0.98rem] leading-relaxed text-ink-soft">{artist.studio}</p>
          </div>
          <div>
            <p className="mono-label mb-3">Materials</p>
            <ul className="space-y-2">
              {artist.materials.map((m) => (
                <li key={m} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
                  <span aria-hidden="true" className="mt-[0.65em] h-px w-4 shrink-0 bg-accent" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono-label mb-3">Inspiration</p>
            <ul className="space-y-2">
              {artist.inspiration.map((m) => (
                <li key={m} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
                  <span aria-hidden="true" className="mt-[0.65em] h-px w-4 shrink-0 bg-hairline" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* featured works */}
      <section className="mt-20">
        <SectionHeader index="§ 05" label="Featured works" title="Selected plates" />
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {artist.featuredWorks.map((work) => (
            <li key={work.editionCode}>
              <figure>
                <div className="border border-hairline bg-paper shadow-[var(--shadow-paper)]">
                  <ArtworkPlaceholder
                    seedKey={work.editionCode}
                    title={`${work.title} — ${work.subject}`}
                    className="block aspect-[148/210] w-full"
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="font-serif-display text-lg">{work.title}</p>
                  <p className="mono-label mt-1">
                    {work.editionCode} · {work.subject}
                  </p>
                  <p className="mono-label mt-0.5">{work.technique}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* the region relationship — the strongest storytelling element */}
      <section className="mt-20 border-y border-hairline bg-paper-deep/40 px-6 py-12 md:px-10">
        <p className="mono-label">The artist and the place</p>
        <p className="font-serif-display mt-5 max-w-4xl text-[clamp(1.4rem,2.8vw,2rem)] leading-snug">
          {artist.connection}
        </p>
      </section>

      {/* collections */}
      <section className="mt-20">
        <SectionHeader index="§ 06" label="Collections" title="Work for PassPrint" />
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="border-b border-hairline">
                {["Collection", "Edition", "Place", "Role", "Year"].map((h) => (
                  <th key={h} scope="col" className="mono-label py-3 pr-6 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono text-[0.82rem] text-ink-soft">
              <tr className="border-b border-hairline-soft">
                <td className="py-3 pr-6 text-ink">{balkanCollection.code}</td>
                <td className="py-3 pr-6">{currentEdition.code}</td>
                <td className="py-3 pr-6">{currentEdition.city}, {currentEdition.country}</td>
                <td className="py-3 pr-6">Launch artist</td>
                <td className="py-3">{currentEdition.month}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* behind the scenes */}
      <section className="mt-20">
        <SectionHeader index="§ 07" label="Behind the scenes" title="From the studio floor" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { label: "Proofing", note: "Test pulls on the final stock, checked against the drawing in daylight." },
            { label: "Registration", note: "The two layers are aligned by eye, one sheet at a time." },
            { label: "Numbering", note: "Every copy signed off and numbered by hand before it is packed." },
          ].map((item) => (
            <figure key={item.label} className="border border-hairline bg-paper-deep/30 p-5">
              {/* TODO: replace with real studio photography (public/artists/) */}
              <div className="mb-4 flex aspect-[4/3] items-center justify-center border border-hairline-soft bg-[repeating-linear-gradient(-45deg,transparent,transparent_7px,rgb(23_23_26_/_0.04)_7px,rgb(23_23_26_/_0.04)_8px)]">
                <span className="mono-label">Photograph to come</span>
              </div>
              <figcaption>
                <p className="mono-label">{item.label}</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{item.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="mt-16 flex flex-wrap gap-6 border-t border-hairline pt-10">
        <ButtonLink href="/collection" variant="framed">
          See the collection
        </ButtonLink>
        <ButtonLink href="/subscribe" variant="text">
          Join the club →
        </ButtonLink>
      </div>

      <p className="mono-label mt-12">
        Every later city in this collection is made by a different artist
        with the same kind of connection to their own place. They are
        announced with their edition.
      </p>
    </div>
  );
}
