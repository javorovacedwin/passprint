import { ArtworkPlaceholder } from "@/components/artwork/ArtworkPlaceholder";
import { inkFor } from "@/components/ui/Ornaments";
import { isConcealed, yugoCollection } from "@/content/collections";
import type { Edition } from "@/content/types";

function EditionField({ edition }: { edition: Edition }) {
  const sealed = edition.status === "sealed";
  const revealed = edition.status === "published" || edition.status === "current" || edition.status === "announced";
  const withArt = edition.status === "published" || edition.status === "current";
  const toBeRevealed = edition.subject === "To be revealed";
  const ink = inkFor(edition.number - 1);

  return (
    <li
      className={`relative w-[220px] shrink-0 snap-start p-4 ${
        withArt
          ? "print-block-sm"
          : sealed
            ? "border-2 border-dashed border-ink/30 bg-paper-deep/40"
            : "border-2 border-dashed border-ink/60 bg-paper"
      }`}
    >
      {/* each month gets its own press ink along the top */}
      <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: sealed ? "transparent" : ink.bg }} aria-hidden="true" />
      <div className="flex items-baseline justify-between pt-1">
        <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.08em]" style={{ color: sealed ? "var(--color-pencil)" : ink.deep }}>
          {edition.code}
        </span>
        {edition.status === "current" && (
          <span className="border border-vermilion px-1.5 py-0.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-vermilion">
            Now printing
          </span>
        )}
      </div>

      <div className="mt-3 aspect-[4/3] border border-hairline-soft">
        {withArt ? (
          <ArtworkPlaceholder
            seedKey={edition.code}
            title={isConcealed(edition) ? `Edition artwork — ${edition.month}` : `Edition artwork — ${edition.subject}, ${edition.city}`}
            className="block h-full w-full"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,rgb(23_23_26_/_0.05)_6px,rgb(23_23_26_/_0.05)_7px)]">
            <span className="mono-label">{sealed ? "Sealed" : "Announced"}</span>
          </div>
        )}
      </div>

      <p className="mt-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-accent-deep">
        {edition.city !== "———" ? edition.city : "———"}
      </p>
      <p className="font-serif-book mt-1 text-xl font-bold">
        {toBeRevealed ? (
          <span aria-label="Subject not yet revealed">———</span>
        ) : sealed ? (
          /* the subject exists; you can't read it yet — a censor bar, not a lock */
          <span
            className="select-none bg-ink/80 text-transparent"
            aria-label="Subject sealed until announcement"
          >
            {edition.subject}
          </span>
        ) : (
          edition.subject
        )}
      </p>
      <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-pencil">
        {edition.month}
        {revealed && edition.site !== "———" ? ` · ${edition.site}` : ""}
      </p>
    </li>
  );
}

/**
 * The collection as a horizontal shelf of monthly chapters — twelve
 * different former-Yugoslav cities — joined by one cartographic dashed
 * route. Until an edition is announced its card reads "Coming soon" in
 * place of the city (see `conceal` in content/collections.ts).
 */
export function JourneyTimeline({
  editions = yugoCollection.editions,
  code = yugoCollection.code,
}: {
  editions?: Edition[];
  code?: string;
} = {}) {
  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-8 w-full -translate-y-1/2 md:block"
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 100 10"
      >
        <path
          d="M0 6 Q 25 2 50 6 T 100 4"
          fill="none"
          stroke="var(--color-vermilion)"
          strokeWidth="0.6"
          strokeDasharray="1.6 1"
          opacity="0.85"
        />
      </svg>
      <ol
        /* pt-2 so the cards' drop shadow is not sheared off by the scroller */
        className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-2"
        aria-label={`The twelve editions of ${code}`}
      >
        {editions.map((edition) => (
          <EditionField key={edition.code} edition={edition} />
        ))}
      </ol>
    </div>
  );
}
