import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Globe } from "@/components/globe/Globe";
import { HeroEnvelope } from "@/components/envelope/HeroEnvelope";
import { Guilloche, PostWaves, EngravedRule } from "@/components/ui/Ornaments";
import { Stamp, ArchEmblem, PlaneEmblem } from "@/components/ui/Stamp";
import { currentCollection, currentEdition } from "@/content/collections";

export function Hero() {
  return (
    <section className="security-tint relative overflow-hidden">
      {/* the guilloche ground of a passport page */}
      <Guilloche
        className="pointer-events-none absolute -left-56 -top-40 h-[560px] w-[560px] opacity-[0.10]"
        color="var(--color-navy)"
        petals={13}
      />
      <Guilloche
        className="pointer-events-none absolute -bottom-60 right-[44%] h-[420px] w-[420px] opacity-[0.09]"
        color="var(--color-rust)"
        petals={9}
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-81px)] max-w-[var(--container-page)] grid-cols-1 items-center gap-10 px-gutter pb-20 pt-10 lg:grid-cols-12 lg:gap-6">
        {/* left: the entry, set as a passport page */}
        <div className="relative lg:col-span-6 xl:col-span-5">
          <div className="flex items-center gap-3">
            <span className="border border-navy px-2.5 py-1 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy">
              {currentEdition.code} · {currentEdition.monthCode}
            </span>
            <span className="mono-label">Launching {currentCollection.launchMonth}</span>
          </div>

          <h1 className="font-serif-display mt-7 text-[clamp(2.7rem,6.6vw,5rem)]">
            Printed memories.
            <br />
            <span className="text-rust">Stamped stories.</span>
          </h1>

          <EngravedRule className="mt-7 h-4 w-full max-w-[34rem]" />

          <p className="mt-6 max-w-[36rem] text-[1.08rem] leading-relaxed text-ink-soft">
            Every month an envelope full of it: a numbered A5 print, an A6
            companion, and the story of one place — drawn by an artist with
            real family there, not a tourist passing through. Each
            month a new country, and in time every country in the world —
            one collection worth keeping. We begin in{" "}
            <strong className="font-semibold text-ink">{currentEdition.country}</strong>.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <ButtonLink href="/subscribe" variant="vermilion">
              Join the first collection
            </ButtonLink>
            <Link
              href="/collection"
              className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink underline decoration-cobalt decoration-1 underline-offset-[6px] transition-colors hover:text-cobalt"
            >
              Explore {currentEdition.country} →
            </Link>
          </div>

          {/* the entry table, ruled like a passport data page */}
          <dl className="mt-12 grid max-w-[32rem] grid-cols-3 border border-ink">
            <div className="border-r border-ink/40 p-3">
              <dt className="mono-label">This edition</dt>
              <dd className="font-serif-book mt-1 text-lg font-bold text-ink">{currentEdition.subject}</dd>
            </div>
            <div className="border-r border-ink/40 p-3">
              <dt className="mono-label">Edition of</dt>
              <dd className="font-serif-book mt-1 text-lg font-bold text-vermilion">{currentEdition.editionSize}</dd>
            </div>
            <div className="p-3">
              <dt className="mono-label">Closes</dt>
              <dd className="font-serif-book mt-1 text-lg font-bold text-ink">The 20th</dd>
            </div>
          </dl>

          <PostWaves className="mt-8 h-8 w-40 text-ink/60" />
        </div>

        {/* right: the page struck with stamps */}
        <div className="relative lg:col-span-6 xl:col-span-7">
          {/*
            Kept inside the column at every width. It used to be pushed out
            past the right edge, where the section's overflow-hidden sliced
            the sphere down one side.
          */}
          <div className="pointer-events-auto absolute right-0 top-0 hidden h-[340px] w-[340px] opacity-90 md:block lg:h-[420px] lg:w-[420px] xl:h-[500px] xl:w-[500px]">
            <Globe />
          </div>

          <div className="relative z-10 pt-6 md:pt-40 lg:pl-4 lg:pt-48 xl:pl-0">
            <HeroEnvelope />
          </div>

          {/* struck marks, as a well-travelled page collects them */}
          <Stamp
            topText="MOSTAR"
            bottomText="ARRIVAL"
            centerBottom={currentEdition.monthCode}
            shape="octagon"
            ink="cobalt"
            size={132}
            rotate={-13}
            emblem={<ArchEmblem />}
            idPrefix="hero-bal"
            className="pointer-events-none absolute -left-6 top-4 z-20 hidden opacity-90 lg:block"
          />
          {/* one further mark only — a page that is too heavily stamped
              reads as clutter rather than as travel */}
          <Stamp
            topText="BY POST"
            bottomText="BE · NL · EU"
            shape="rect"
            ink="vermilion"
            size={104}
            rotate={-4}
            emblem={<PlaneEmblem />}
            idPrefix="hero-post"
            className="pointer-events-none absolute -right-2 bottom-12 z-20 hidden opacity-85 xl:block"
          />
        </div>
      </div>

      <div className="press-band" aria-hidden="true" />
    </section>
  );
}
