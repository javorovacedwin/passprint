import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkView } from "@/components/artwork/WorkView";
import { PrintBuyPanel } from "@/components/artwork/PrintBuyPanel";
import { printOptions, studioWorks, workBySlug } from "@/content/artworks";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return studioWorks.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = workBySlug((await params).slug);
  return work ? { title: `${work.title} — Print`, description: work.note } : {};
}

export default async function PrintPage({ params }: Props) {
  const work = workBySlug((await params).slug);
  if (!work) notFound();

  const details = [
    ["Edition", "50 per size, numbered by hand"],
    ["Original", `${work.dimensions ?? "—"} · sold`],
  ];

  return (
    <WorkView work={work} back={{ href: "/prints", label: "All prints" }} label="Print">
      <PrintBuyPanel options={printOptions(work)} />

      <dl className="mt-12 grid gap-y-3 text-[0.9rem] text-ink-soft">
        {details.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-6 border-b border-hairline-soft pb-3">
            <dt className="mono-label">{k}</dt>
            <dd className="text-right">{v}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 text-[0.9rem] text-ink-soft">
        <Link href="/contact" className="border-b border-ink/30 pb-0.5 hover:border-ink">
          Ask about this work
        </Link>
      </p>
    </WorkView>
  );
}
