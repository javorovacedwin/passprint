import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { StudioWork } from "@/content/types";

/**
 * The page of a single work: the painting large on the left, and on the
 * right its title, what is in the picture, and what can be done with it.
 * Shared by a print and an original.
 */
export function WorkView({
  work,
  back,
  label,
  children,
}: {
  work: StudioWork;
  back: { href: string; label: string };
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-12 md:py-16">
      <Link
        href={back.href}
        className="mono-label inline-block transition-colors duration-[var(--duration-ui)] hover:text-ink"
      >
        ← {back.label}
      </Link>

      <div className="mt-10 grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <div className="bg-paper-deep/60 p-[7%] lg:sticky lg:top-28 lg:self-start">
          <div
            className="relative w-full"
            style={{ aspectRatio: `${work.image.width} / ${work.image.height}` }}
          >
            <Image
              src={work.image.src}
              alt={work.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 92vw"
              className="object-contain drop-shadow-[0_10px_24px_rgb(28_36_52_/_0.22)]"
            />
          </div>
        </div>

        <div className="lg:pt-6">
          <p className="mono-label">{label}</p>
          <h1 className="font-serif-display mt-4 text-[clamp(2.4rem,4.6vw,3.6rem)]">{work.title}</h1>
          <p className="mt-3 font-serif-book text-lg italic text-ink-soft">
            Bakir C. · acrylic on canvas · {work.dimensions ?? "dimensions on request"}
          </p>

          <div className="mt-8 h-px w-12 bg-ink/30" />

          <p className="mt-8 max-w-[34rem] leading-[1.85] text-ink-soft">{work.note}</p>

          <div className="mt-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
