import type { Metadata } from "next";
import { SealLogo } from "@/components/brand/SealLogo";
import { ButtonLink } from "@/components/ui/Button";
import { EngravedRule } from "@/components/ui/Ornaments";

export const metadata: Metadata = {
  title: "Not found",
  description: "That page could not be found.",
};

/**
 * A returned-to-sender notice rather than a bare error: the seal struck
 * over the page, and the three routes a lost visitor actually wants.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[var(--container-page)] flex-col items-center justify-center px-gutter py-24 text-center">
      <SealLogo className="w-[132px] opacity-90" uid="nf" />

      <p className="mono-label mt-8">Return to sender · 404</p>
      <h1 className="font-serif-display mt-4 text-[clamp(2.2rem,5.5vw,3.6rem)]">
        This address doesn&apos;t exist
      </h1>

      <EngravedRule className="mt-7 h-4 w-full max-w-[26rem]" />

      <p className="mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink-soft">
        The page you were looking for isn&apos;t here — it may have moved, or
        the link may have been mistyped. Everything we publish is one of the
        three below.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
        <ButtonLink href="/" variant="vermilion">
          Back to the front
        </ButtonLink>
        <ButtonLink href="/collection" variant="framed">
          The collection
        </ButtonLink>
        <ButtonLink href="/contact" variant="text">
          Write to us →
        </ButtonLink>
      </div>
    </div>
  );
}
