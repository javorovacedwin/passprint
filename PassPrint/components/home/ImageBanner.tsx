import Image from "next/image";
import type { ReactNode } from "react";

interface ImageBannerProps {
  src: string;
  alt: string;
  /** Crop anchor for object-position, e.g. "50% 40%". */
  focus?: string;
  /** Where the caption panel sits over the painting. */
  align?: "left" | "right";
  priority?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * A painting hung the full width of the page, with a paper caption panel
 * pinned over one corner — the plate on a gallery wall, not a blurred
 * overlay. The panel is a flat paper block with the engraved double rule,
 * so the text never sits on the paint itself.
 */
export function ImageBanner({
  src,
  alt,
  focus = "50% 50%",
  align = "left",
  priority = false,
  children,
  className = "",
}: ImageBannerProps) {
  return (
    <section className={`relative border-y-2 border-ink ${className}`}>
      <div className="relative h-[72svh] min-h-[420px] w-full md:h-[86svh]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: focus }}
        />
      </div>

      <div
        className={`mx-auto max-w-[var(--container-page)] px-gutter md:absolute md:inset-x-0 md:bottom-12 ${
          align === "right" ? "md:flex md:justify-end" : ""
        }`}
      >
        <div className="print-block relative -mt-16 max-w-[34rem] p-6 sm:p-8 md:mt-0">
          {children}
        </div>
      </div>
    </section>
  );
}
