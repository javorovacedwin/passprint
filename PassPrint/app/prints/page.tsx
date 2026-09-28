import type { Metadata } from "next";
import { WorkGrid, WorkTile } from "@/components/artwork/WorkTile";
import { PageTitle } from "@/components/ui/PageTitle";
import { studioWorks } from "@/content/artworks";
import { formatPrice, studioPrintPrice } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Prints",
  description: "Prints of the paintings of Bakir C. in A3, A4, A5 and A6, edition of 50, numbered by hand.",
};

export default function PrintsPage() {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-20 md:py-28">
      <PageTitle label="A3 · A4 · A5 · A6" title="Prints">
        Edition of 50 per size, numbered by hand.
      </PageTitle>

      <div className="mt-20">
        <WorkGrid>
          {studioWorks.map((work, i) => (
            <WorkTile
              key={work.slug}
              work={work}
              href={`/prints/${work.slug}`}
              line={`From ${formatPrice(studioPrintPrice.a6)}`}
              priority={i < 3}
            />
          ))}
        </WorkGrid>
      </div>
    </div>
  );
}
