import type { Metadata } from "next";
import { WorkGrid, WorkTile } from "@/components/artwork/WorkTile";
import { PageTitle } from "@/components/ui/PageTitle";
import { soldPrice, studioWorks } from "@/content/artworks";

export const metadata: Metadata = {
  title: "Originals",
  description: "The original paintings of Bakir C., acrylic on canvas. All are sold; each is available as a print.",
};

export default function OriginalsPage() {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-20 md:py-28">
      <PageTitle label="Acrylic on canvas" title="Originals">
        Every original has found a home. Each one lives on as a print.
      </PageTitle>

      <div className="mt-20">
        <WorkGrid>
          {studioWorks.map((work, i) => (
            <WorkTile
              key={work.slug}
              work={work}
              href={`/originals/${work.slug}`}
              line={`Sold · ${soldPrice(work)}`}
              priority={i < 3}
            />
          ))}
        </WorkGrid>
      </div>
    </div>
  );
}
