import Image from "next/image";
import { ImageBanner } from "@/components/home/ImageBanner";
import { WorkGrid, WorkTile } from "@/components/artwork/WorkTile";
import { ButtonLink } from "@/components/ui/Button";
import { leadArtist } from "@/content/artists";
import { studioWorks } from "@/content/artworks";
import { formatPrice, studioPrintPrice } from "@/content/pricing";

const work = (slug: string) => studioWorks.find((w) => w.slug === slug)!;

/** The opening picture — a studio painting shown on its own. */
const heroImage = {
  src: "/artworks/HomeHero.jpeg",
  alt: "Abstract painting in layered earth tones — rust, plum and warm grey — with pale, scraped patches of cream and blue-white and fine dark lines drawn across the surface.",
};

/*
  The homepage is a gallery's front room: one painting full width, a few
  prints, the painter, and a way to write. Nothing else.
*/
export default function HomePage() {
  const closing = work("where-the-light-falls");
  const featured = ["golden-hour", "casing-shadows", "into-the-unknown"].map(work);

  return (
    <>
      <ImageBanner src={heroImage.src} alt={heroImage.alt} focus="50% 45%" priority>
        <p className="mono-label">Paintings by Bakir C. · Novi Pazar</p>
        <h1 className="font-brand mt-4 text-[clamp(2.4rem,5.4vw,4rem)] uppercase">
          Pressio Atelier
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-7">
          <ButtonLink href="/prints" variant="ink">
            Shop prints
          </ButtonLink>
          <ButtonLink href="/originals" variant="text">
            Originals
          </ButtonLink>
        </div>
      </ImageBanner>

      <section className="mx-auto max-w-[var(--container-page)] px-gutter py-28 md:py-36">
        <header className="text-center">
          <p className="mono-label">Edition of 50 · numbered by hand</p>
          <h2 className="font-serif-display mt-4 text-[clamp(2.4rem,5vw,3.6rem)]">Prints</h2>
        </header>
        <div className="mt-16">
          <WorkGrid>
            {featured.map((w) => (
              <WorkTile
                key={w.slug}
                work={w}
                href={`/prints/${w.slug}`}
                line={`From ${formatPrice(studioPrintPrice.a6)}`}
              />
            ))}
          </WorkGrid>
        </div>
        <div className="mt-16 text-center">
          <ButtonLink href="/prints" variant="framed">
            All prints
          </ButtonLink>
        </div>
      </section>

      <section className="border-t border-hairline-soft bg-paper-deep/40 py-28 md:py-36">
        <div className="mx-auto grid max-w-[var(--container-page)] items-center gap-14 px-gutter md:grid-cols-2 md:gap-20">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/artworks/Conceptimage.jpeg"
              alt="A still life mid block-in on an easel in the studio: a kettle, a small ribbed vase and a bundle of firewood laid in as a rough sepia underpainting, not yet in colour."
              fill
              sizes="(min-width: 768px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mono-label">The painter</p>
            <h2 className="font-serif-display mt-4 text-[clamp(2.4rem,5vw,3.6rem)]">
              {leadArtist.name}
            </h2>
            <div className="mt-6 h-px w-12 bg-ink/30" />
            <p className="mt-6 max-w-[30rem] text-[1.05rem] leading-[1.85] text-ink-soft">
              {leadArtist.standfirst}
            </p>
            <div className="mt-10">
              <ButtonLink href="/artist" variant="text">
                About the artist
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <ImageBanner src={closing.image.src} alt={closing.image.alt} focus="50% 50%">
        <p className="mono-label">Commissions &amp; questions</p>
        <h2 className="font-serif-display mt-4 text-[clamp(1.9rem,4vw,2.8rem)]">Write to the studio</h2>
        <div className="mt-8">
          <ButtonLink href="/contact" variant="framed">
            Get in touch
          </ButtonLink>
        </div>
      </ImageBanner>
    </>
  );
}
