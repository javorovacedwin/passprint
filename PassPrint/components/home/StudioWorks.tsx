import Image from "next/image";
import Link from "next/link";
import { StudioWorkCard } from "@/components/artwork/StudioWorkCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { studioWorks } from "@/content/artworks";

/**
 * The paintings, sold as originals or prints. This is the only place on the
 * site where you buy a single object rather than a subscription, so it sits
 * after the maker and before the memberships — the visitor has met the hand
 * before being shown what that hand sells.
 */
export function StudioWorks() {
  return (
    <section className="mx-auto max-w-[var(--container-page)] px-gutter py-24">
      <SectionHeader
        index="§ 05"
        label="Originals and prints"
        title="Straight from the studio"
        ink="cobalt"
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
        <p className="max-w-[var(--container-measure)] text-[1.05rem] leading-relaxed text-ink-soft">
          Not every painting becomes an edition. These hang in the studio and
          sell on their own — the original, once, or a giclée print. Point at
          a picture to see how.
        </p>
        <figure className="border border-hairline bg-paper shadow-[var(--shadow-paper)]">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/artworks/Conceptimage.jpeg"
              alt="A still life mid block-in on an easel in the studio: a kettle, a small ribbed vase and a bundle of firewood laid in as a rough sepia underpainting, not yet in colour."
              fill
              sizes="(min-width: 1024px) 30vw, 92vw"
              className="object-cover"
            />
          </div>
          <figcaption className="border-t border-hairline-soft px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-pencil">
            In progress, on the easel — before the colour goes in
          </figcaption>
        </figure>
      </div>

      <div className="mt-14 grid gap-16 lg:grid-cols-2 lg:gap-10">
        {studioWorks.map((work, i) => (
          <StudioWorkCard key={work.slug} work={work} index={i} />
        ))}
      </div>

      <p className="mt-14 font-mono text-[0.74rem] font-semibold uppercase tracking-[0.06em] leading-relaxed text-pencil">
        Every print is made on the same stock as the monthly editions and
        numbered by hand.{" "}
        <Link
          href="/contact"
          className="text-ink underline decoration-cobalt decoration-1 underline-offset-4 hover:text-cobalt"
        >
          Ask about a work
        </Link>
      </p>
    </section>
  );
}
