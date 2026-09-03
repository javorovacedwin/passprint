import Link from "next/link";
import { ArtworkPlaceholder } from "@/components/artwork/ArtworkPlaceholder";
import { artistBySlug } from "@/content/artists";
import { production } from "@/content/collections";
import type { Collection, Edition } from "@/content/types";

interface EditionRecordProps {
  edition: Edition;
  collection: Collection;
  index: number;
  total: number;
}

const statusLabel: Record<Edition["status"], string> = {
  current: "Open — orders close on the 20th",
  published: "Closed — not reprinted",
  announced: "Announced",
  sealed: "Sealed until announced",
};

/**
 * A single catalogue record, set like a page in an exhibition catalogue:
 * plate on the left, tombstone data on the right, story below. Anchored by
 * edition code so the index can navigate between records.
 */
export function EditionRecord({ edition, collection, index, total }: EditionRecordProps) {
  const artist = artistBySlug(edition.artistSlug);
  const withArt = edition.status === "current" || edition.status === "published";
  const revealed = withArt || edition.status === "announced";
  const prev = index > 0 ? collection.editions[index - 1] : null;
  const next = index < total - 1 ? collection.editions[index + 1] : null;

  return (
    <article
      id={edition.code}
      className="scroll-mt-24 border-t border-hairline pt-10"
      aria-label={`${edition.code} — ${edition.subject}`}
    >
      <div className="grid gap-8 md:grid-cols-[minmax(180px,1fr)_1.7fr]">
        {/* the plate */}
        <figure>
          <div className="border border-hairline bg-paper shadow-[var(--shadow-paper)]">
            {withArt ? (
              <ArtworkPlaceholder
                seedKey={edition.code}
                title={`${edition.subject}, ${collection.city}`}
                className="block aspect-[148/210] w-full"
              />
            ) : (
              <div className="flex aspect-[148/210] w-full items-center justify-center bg-[repeating-linear-gradient(-45deg,transparent,transparent_7px,rgb(23_23_26_/_0.05)_7px,rgb(23_23_26_/_0.05)_8px)]">
                <span className="mono-label">{edition.status === "announced" ? "Announced" : "Sealed"}</span>
              </div>
            )}
          </div>
          <figcaption className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.06em] text-pencil">
            Plate {edition.number} of {total}
          </figcaption>
        </figure>

        {/* tombstone + story */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-mono text-[0.8rem] font-medium uppercase tracking-[0.08em] text-accent-deep">
              {edition.code}
            </span>
            <span className="mono-label">{edition.month}</span>
          </div>
          <h3 className="font-serif-display mt-2 text-[clamp(1.6rem,3vw,2.2rem)]">
            {edition.subject === "To be revealed" ? "———" : edition.subject}
          </h3>
          <p className="mono-label mt-2">
            {edition.site !== "———" ? `${edition.site} · ` : ""}
            {collection.city}, {collection.country}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-hairline-soft py-4 font-mono text-[0.72rem] uppercase tracking-[0.05em] sm:grid-cols-3">
            <div>
              <dt className="text-pencil">Coordinates</dt>
              <dd className="mt-1 text-ink">{edition.coordinates}</dd>
            </div>
            <div>
              <dt className="text-pencil">Technique</dt>
              <dd className="mt-1 text-ink">{edition.technique ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-pencil">Edition</dt>
              <dd className="mt-1 text-ink">{edition.editionSize ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-pencil">Format</dt>
              <dd className="mt-1 text-ink">{production.mainFormat} + {production.companionFormat}</dd>
            </div>
            <div>
              <dt className="text-pencil">Artist</dt>
              <dd className="mt-1 text-ink">{artist?.name ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-pencil">Status</dt>
              <dd className="mt-1 text-ink">{revealed ? edition.status : "sealed"}</dd>
            </div>
          </dl>

          {edition.note ? (
            <p className="mt-5 max-w-[38rem] text-[1rem] leading-relaxed text-ink-soft">
              {edition.note}
            </p>
          ) : (
            <p className="mt-5 max-w-[38rem] text-[1rem] leading-relaxed text-pencil">
              {statusLabel[edition.status]}. The subject and story are held back
              until this edition is announced.
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.06em]">
            <span className="text-pencil">{statusLabel[edition.status]}</span>
            <span className="flex gap-4">
              {prev && (
                <Link href={`#${prev.code}`} className="text-ink hover:text-accent-deep">
                  ← {prev.code}
                </Link>
              )}
              {next && (
                <Link href={`#${next.code}`} className="text-ink hover:text-accent-deep">
                  {next.code} →
                </Link>
              )}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
