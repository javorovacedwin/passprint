import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { leadArtist } from "@/content/artists";

/**
 * The painter and the easel, side by side: a real studio photograph on one
 * half, two lines about the painter on the other.
 */
export function ArtistNote() {
  const artist = leadArtist;

  return (
    <section className="border-y border-ink/25 bg-rosa/[0.07] py-24">
      <div className="mx-auto grid max-w-[var(--container-page)] items-center gap-12 px-gutter md:grid-cols-2">
        <figure className="print-block p-3">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/artworks/Conceptimage.jpeg"
              alt="A still life mid block-in on an easel in the studio: a kettle, a small ribbed vase and a bundle of firewood laid in as a rough sepia underpainting, not yet in colour."
              fill
              sizes="(min-width: 768px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-pencil">
            On the easel — before the colour goes in
          </figcaption>
        </figure>

        <div>
          <SectionHeader index="§ 04" label="The painter" title={`Hi, I'm ${artist.name}`} ink="rosa" />
          <p className="mt-8 text-[1.05rem] leading-relaxed text-ink-soft">{artist.standfirst}</p>
          <div className="mt-10">
            <ButtonLink href="/artists" variant="framed">
              More about me
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
