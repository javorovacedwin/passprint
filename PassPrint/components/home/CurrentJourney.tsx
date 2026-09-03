import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { JourneyTimeline } from "@/components/collection/JourneyTimeline";
import { noviPazar } from "@/content/collections";

/**
 * The year, in one place. This used to be two sections — a timeline and a
 * grid of the same twelve editions — which read as repetition. One
 * scrollable shelf now carries both jobs: what is coming, and the fact that
 * twelve of them make a set worth completing.
 */
export function CurrentJourney() {
  const announced = noviPazar.editions.filter((e) => e.status === "announced");

  return (
    <section className="security-tint border-y border-ink/25 bg-verde/[0.06] py-24">
      <div className="mx-auto max-w-[var(--container-page)] px-gutter">
        <SectionHeader
          index="§ 03"
          label={`${noviPazar.code} · ${noviPazar.year}`}
          title="Twelve envelopes make one collection"
        />
        <p className="mt-6 max-w-[var(--container-measure)] text-[1.02rem] leading-relaxed text-ink-soft">
          The launch collection stays in {noviPazar.city} for a full year —
          the fortress, the bazaar, the mosques, the medieval churches in the
          hills, the crafts and the everyday. Each subject is announced a few
          months ahead; the last are sealed until they ship. Complete the year
          and you receive the closing stamp and a thirteenth print.
        </p>

        <div className="mt-12">
          <JourneyTimeline />
        </div>

        <dl className="mt-10 grid gap-6 border-t border-hairline pt-6 font-mono text-[0.74rem] uppercase tracking-[0.06em] sm:grid-cols-3">
          <div>
            <dt className="text-pencil">Open now</dt>
            <dd className="mt-1 text-ink">
              {noviPazar.editions
                .filter((e) => e.status === "current")
                .map((e) => e.code)
                .join(", ")}{" "}
              — until the 20th
            </dd>
          </div>
          <div>
            <dt className="text-pencil">Announced next</dt>
            <dd className="mt-1 text-ink">
              {announced.map((e) => e.subject.toLowerCase()).join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-pencil">Completion</dt>
            <dd className="mt-1 text-ink">Closing stamp + bonus print, July 2027</dd>
          </div>
        </dl>

        <div className="mt-8">
          <ButtonLink href="/collection" variant="text">
            The full catalogue, edition by edition →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
