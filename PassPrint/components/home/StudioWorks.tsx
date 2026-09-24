import Link from "next/link";
import { StudioWorkCard } from "@/components/artwork/StudioWorkCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { studioWorks } from "@/content/artworks";

/**
 * The gallery: every painting hung at full size, sold as the original or a
 * print. The prints row higher up links down to each work here by its slug.
 */
export function StudioWorks({ index = "§ 03" }: { index?: string }) {
  return (
    <section id="gallery" className="mx-auto max-w-[var(--container-page)] scroll-mt-20 px-gutter py-24">
      <SectionHeader
        index={index}
        label="Originals and prints"
        title="The gallery"
        ink="cobalt"
      />

      <p className="mt-6 max-w-[var(--container-measure)] text-[1.05rem] leading-relaxed text-ink-soft">
        Not every painting becomes an edition. These hang in the studio and
        are sold on their own — the original, once, or a giclée print in A3
        or A4. Point at a picture to see the ways to buy it.
      </p>

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
