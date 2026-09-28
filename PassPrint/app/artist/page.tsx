import type { Metadata } from "next";
import Image from "next/image";
import { WorkGrid, WorkTile } from "@/components/artwork/WorkTile";
import { ButtonLink } from "@/components/ui/Button";
import { leadArtist } from "@/content/artists";
import { soldPrice, studioWorks } from "@/content/artworks";

export const metadata: Metadata = {
  title: "Bakir C. — Artist",
  description: "Bakir C., a painter from Novi Pazar. His paintings, and the prints made from them.",
};

/** The artist, kept short on purpose: who he is, the studio photograph, a few paintings. */
export default function ArtistPage() {
  const artist = leadArtist;
  const selected = studioWorks.slice(0, 3);

  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-20 md:py-28">
      <header className="grid gap-14 md:grid-cols-2 md:items-center md:gap-20">
        <figure className="bg-paper-deep/60 p-[7%]">
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
          <figcaption className="mono-label mt-4 text-center">On the easel, {artist.city}</figcaption>
        </figure>

        <div>
          <p className="mono-label">
            {artist.role} · {artist.city}
          </p>
          <h1 className="font-serif-display mt-4 text-[clamp(3rem,7vw,5rem)]">{artist.name}</h1>
          <div className="mt-6 h-px w-12 bg-ink/30" />
          <p className="mt-6 max-w-[32rem] text-[1.05rem] leading-[1.85] text-ink-soft">
            {artist.standfirst}
          </p>
          <p className="mt-4 max-w-[32rem] leading-[1.85] text-ink-soft">{artist.biography[0]}</p>
        </div>
      </header>

      <section className="mt-32">
        <h2 className="font-serif-display text-center text-[clamp(2rem,4vw,2.8rem)]">
          Selected paintings
        </h2>
        <div className="mt-14">
          <WorkGrid>
            {selected.map((work) => (
              <WorkTile key={work.slug} work={work} href={`/originals/${work.slug}`} line={`Sold · ${soldPrice(work)}`} />
            ))}
          </WorkGrid>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <ButtonLink href="/originals" variant="framed">
            All originals
          </ButtonLink>
          <ButtonLink href="/prints" variant="ink">
            Shop prints
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
