import type { Metadata } from "next";
import { CollectionTabs } from "@/components/collection/CollectionTabs";
import { JourneyTimeline } from "@/components/collection/JourneyTimeline";
import { StudioWorkCard } from "@/components/artwork/StudioWorkCard";
import { ButtonLink } from "@/components/ui/Button";
import { studioWorks } from "@/content/artworks";
import { production } from "@/content/collections";
import { getCollection } from "@/lib/shopify";
import type { StudioWork } from "@/content/types";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Every painting by Bakir C.: the originals, giclée prints in A3 and A4, and PassPrint — the numbered monthly edition in an envelope.",
};

// Re-fetch Shopify editions/availability at most hourly (ISR).
export const revalidate = 3600;

/** The same painting, offered only the ways one tab sells it. */
function only(work: StudioWork, ids: string[]): StudioWork {
  return { ...work, options: work.options.filter((o) => ids.includes(o.id)) };
}

function WorkGrid({ works }: { works: StudioWork[] }) {
  return (
    <div className="grid gap-16 lg:grid-cols-2 lg:gap-10">
      {works.map((work, i) => (
        <StudioWorkCard key={work.slug} work={work} index={i} anchor={false} />
      ))}
    </div>
  );
}

function TabIntro({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-12 max-w-[var(--container-measure)] text-[1.05rem] leading-relaxed text-ink-soft">
      {children}
    </p>
  );
}

export default async function CollectionPage() {
  // Editions come from Shopify when configured; from content/collections.ts
  // otherwise.
  const yugo = await getCollection();

  const originals = studioWorks.map((w) => only(w, ["original"]));
  const prints = studioWorks.map((w) => only(w, ["print-a3", "print-a4", "print-a5", "print-a6"]));

  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      <p className="mono-label">bakirpaints · PassPrint</p>
      <h1 className="font-serif-display mt-4 text-[clamp(2.6rem,7vw,4.6rem)]">Collection</h1>

      <div className="mt-10">
        <CollectionTabs
          tabs={[
            {
              id: "originals",
              label: "Originals",
              note: `${originals.length} paintings · one of each`,
              panel: (
                <>
                  <TabIntro>
                    The paintings themselves. Each exists once, is signed,
                    and leaves the studio when it is sold.
                  </TabIntro>
                  <WorkGrid works={originals} />
                </>
              ),
            },
            {
              id: "prints",
              label: "Prints",
              note: "Giclée · A3 · A4 · A5 · A6",
              panel: (
                <>
                  <TabIntro>
                    Every painting as a giclée print, in A3 (29.7 × 42 cm),
                    A4 (21 × 29.7 cm), A5 (14.8 × 21 cm) or A6 (10.5 × 14.8 cm),
                    in an edition of 50 per size, numbered by hand.
                  </TabIntro>
                  <WorkGrid works={prints} />
                </>
              ),
            },
            {
              id: "passprint",
              label: "PassPrint",
              note: "Monthly edition · by post",
              panel: (
                <>
                  <TabIntro>
                    Once a month, one city in an envelope: a numbered{" "}
                    {production.mainFormat} print, an {production.companionFormat}{" "}
                    companion and the story of the place. The first collection travels
                    twelve cities across six countries that used to be one,
                    starting {yugo.launchMonth}. Each city is announced with
                    its edition — until then, coming soon.
                  </TabIntro>
                  <JourneyTimeline editions={yugo.editions} code={yugo.code} />
                  <div className="mt-12 flex flex-wrap items-center gap-6">
                    <ButtonLink href="/subscribe" variant="vermilion">
                      Join PassPrint
                    </ButtonLink>
                    <ButtonLink href="/how-it-works" variant="text">
                      How the monthly cycle works →
                    </ButtonLink>
                  </div>
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
