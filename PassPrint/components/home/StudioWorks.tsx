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
