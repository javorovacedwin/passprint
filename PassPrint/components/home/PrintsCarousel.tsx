"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { studioWorks } from "@/content/artworks";
import { formatPrice, studioPrintPrice } from "@/content/pricing";

/**
 * A row of prints to flick through, the way a print shop keeps its browser
 * racks: one painting per card, the title in caps beneath, the lowest price.
 * Native scroll-snap does the work; the two arrows only nudge it along, so
 * touch, trackpad and keyboard all behave as the browser already does.
 */
export function PrintsCarousel() {
  const track = useRef<HTMLUListElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-[var(--container-page)] px-gutter">
        <SectionHeader index="§ 01" label="A3 · A4 · A5 · A6 · edition of 50" title="Prints" />
      </div>
      <div className="mx-auto mt-6 flex max-w-[var(--container-page)] items-end justify-between gap-6 px-gutter">
        <p className="max-w-[var(--container-measure)] leading-relaxed text-ink-soft">
          Every painting in the studio, printed on heavyweight uncoated stock
          and numbered by hand.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            className="print-block-sm flex h-11 w-11 items-center justify-center font-mono text-lg transition-colors duration-[var(--duration-ui)] hover:bg-ink hover:text-paper"
            aria-label="Previous prints"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            className="print-block-sm flex h-11 w-11 items-center justify-center font-mono text-lg transition-colors duration-[var(--duration-ui)] hover:bg-ink hover:text-paper"
            aria-label="Next prints"
          >
            →
          </button>
        </div>
      </div>

      <ul
        ref={track}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-[var(--spacing-gutter)] px-gutter pb-4 [scrollbar-width:thin]"
      >
        {studioWorks.map((work) => (
          <li
            key={work.slug}
            className="w-[78vw] max-w-[22rem] shrink-0 snap-start sm:w-[44vw] lg:w-[23vw]"
          >
            <Link href={`#${work.slug}`} className="group/print block">
              <div className="print-block p-3">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-deep">
                  <Image
                    src={work.image.src}
                    alt={work.image.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 44vw, 78vw"
                    className="object-cover transition-transform duration-[var(--duration-slide)] ease-[var(--ease-ink)] group-hover/print:scale-[1.04] motion-reduce:transition-none"
                  />
                </div>
              </div>
              <h3 className="mt-4 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-ink group-hover/print:text-vermilion-deep">
                {work.title}
              </h3>
              <p className="mt-1 font-serif-book text-lg">
                <span className="text-pencil">from </span>
                <span className="font-bold text-vermilion">{formatPrice(studioPrintPrice.a6)}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
