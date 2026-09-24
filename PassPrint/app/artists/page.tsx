import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { leadArtist } from "@/content/artists";
import { studioWorks } from "@/content/artworks";

export const metadata: Metadata = {
  title: "Bakir C. — Artist",
  description:
    "Bakir C., a painter from Novi Pazar, makes every PassPrint edition. His paintings, as originals and prints.",
};

/**
 * The artist, kept short on purpose: who he is in two paragraphs, the
 * studio photograph, and his paintings. Everything else is in the work.
 */
export default function ArtistsPage() {
  const artist = leadArtist;
  const selected = studioWorks.slice(0, 3);

  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      <header className="grid gap-12 border-b border-hairline pb-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="mono-label">
            {artist.role} · {artist.city}, {artist.country}
          </p>
          <h1 className="font-serif-display mt-5 text-[clamp(2.6rem,7vw,4.6rem)]">
            {artist.name}
          </h1>
          <p className="mt-6 max-w-[var(--container-measure)] text-[1.1rem] leading-relaxed text-ink">
            {artist.standfirst}
          </p>
          <div className="mt-5 max-w-[var(--container-measure)] space-y-4 leading-relaxed text-ink-soft">
            {artist.biography.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <figure className="print-block p-3">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/artworks/Conceptimage.jpeg"
              alt="A still life mid block-in on an easel in the studio: a kettle, a small ribbed vase and a bundle of firewood laid in as a rough sepia underpainting, not yet in colour."
              fill
              priority
              sizes="(min-width: 768px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-pencil">
            On the easel, {artist.city}
          </figcaption>
        </figure>
      </header>

      <section className="mt-20">
        <SectionHeader index="§ 01" label={artist.technique} title="Selected paintings" />
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((work) => (
            <li key={work.slug}>
              <Link href="/collection#originals" className="group/sel block">
                <div className="print-block p-3">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-deep">
                    <Image
                      src={work.image.src}
                      alt={work.image.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-[var(--duration-slide)] ease-[var(--ease-ink)] group-hover/sel:scale-[1.04] motion-reduce:transition-none"
                    />
                  </div>
                </div>
                <p className="mt-4 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-ink group-hover/sel:text-vermilion-deep">
                  {work.title}
                </p>
                <p className="mono-label mt-1">{work.medium}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 flex flex-wrap gap-6 border-t border-hairline pt-10">
        <ButtonLink href="/collection" variant="framed">
          All paintings
        </ButtonLink>
        <ButtonLink href="/subscribe" variant="text">
          Join PassPrint →
        </ButtonLink>
      </div>
    </div>
  );
}
