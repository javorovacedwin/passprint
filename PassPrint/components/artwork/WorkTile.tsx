import Image from "next/image";
import Link from "next/link";
import type { StudioWork } from "@/content/types";

/**
 * One picture in the gallery: the painting whole on a pale mount, and only
 * its title and one line beneath. Everything else — the story, the sizes,
 * the button — waits on the work's own page.
 */
export function WorkTile({
  work,
  href,
  line,
  priority = false,
}: {
  work: StudioWork;
  href: string;
  /** The one line under the title: a price, or "Sold". */
  line: string;
  priority?: boolean;
}) {
  return (
    <Link href={href} className="group/tile block">
      <div className="bg-paper-deep/60 p-[9%] transition-colors duration-[var(--duration-slide)] ease-[var(--ease-ink)] group-hover/tile:bg-paper-deep">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={work.image.src}
            alt={work.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-contain drop-shadow-[0_6px_14px_rgb(28_36_52_/_0.18)] transition-transform duration-[var(--duration-slide)] ease-[var(--ease-ink)] group-hover/tile:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
      </div>
      <div className="mt-5 text-center">
        <h3 className="font-serif-display text-[1.45rem]">{work.title}</h3>
        <p className="mono-label mt-1.5">{line}</p>
      </div>
    </Link>
  );
}

/** The gallery grid every listing uses. */
export function WorkGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}
