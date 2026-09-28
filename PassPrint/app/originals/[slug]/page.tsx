import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkView } from "@/components/artwork/WorkView";
import { ButtonLink } from "@/components/ui/Button";
import { soldPrice, studioWorks, workBySlug } from "@/content/artworks";
import { formatPrice, studioPrintPrice } from "@/content/pricing";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return studioWorks.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = workBySlug((await params).slug);
  return work ? { title: work.title, description: work.note } : {};
}

export default async function OriginalPage({ params }: Props) {
  const work = workBySlug((await params).slug);
  if (!work) notFound();

  return (
    <WorkView work={work} back={{ href: "/originals", label: "All originals" }} label="Original">
      <div className="flex flex-wrap items-center gap-4">
        <span className="border border-ink/30 px-4 py-2 font-sans text-[0.68rem] uppercase tracking-[0.26em] text-ink-soft">
          Sold · {soldPrice(work)}
        </span>
        <span className="text-[0.9rem] text-ink-soft">This painting has found a home.</span>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-8">
        <ButtonLink href={`/prints/${work.slug}`} variant="ink">
          Prints from {formatPrice(studioPrintPrice.a6)}
        </ButtonLink>
        <ButtonLink href="/contact" variant="text">
          Ask about a commission
        </ButtonLink>
      </div>
    </WorkView>
  );
}
