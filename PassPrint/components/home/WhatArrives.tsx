"use client";

import { useState } from "react";
import { ArtworkPlaceholder } from "@/components/artwork/ArtworkPlaceholder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StampMark } from "@/components/ui/StampMark";
import { currentEdition, production } from "@/content/collections";

const items = [
  {
    id: "main",
    code: "01",
    name: "Main print",
    caption: `A numbered artwork on ${production.mainFormat} (${production.mainDimensions}), ${production.paper}. Hand-numbered and dated on the back.`,
  },
  {
    id: "companion",
    code: "02",
    name: "Companion study",
    caption: `A smaller ${production.companionFormat} print (${production.companionDimensions}) revealing another detail, corner or hour of the same place.`,
  },
  {
    id: "story",
    code: "03",
    name: "The story card",
    caption: "Two sides, 10 × 15 cm: the place and its sources on one, the artist and technique on the other.",
  },
  {
    id: "envelope",
    code: "04",
    name: "The envelope",
    caption: "Its colour set by the collection identity, stamped by hand before it ships. The production never changes — only what it carries.",
  },
] as const;

type ItemId = (typeof items)[number]["id"];

/**
 * The monthly contents laid flat on a table, as in a technical drawing.
 * Hover state is shared: pointing at a print OR its caption highlights the
 * same item and dims the rest, immediately. The captions carry all the
 * accessible content (the table itself is decorative), so keyboard users
 * reach everything through them.
 */
export function WhatArrives() {
  const [active, setActive] = useState<ItemId | null>(null);

  // Explicit transitions (not transition-all) so highlighting is instant.
  const objectClass = (id: ItemId) =>
    `cursor-pointer transition-[opacity,outline-color] duration-[var(--duration-ui)] outline outline-1 outline-offset-4 ${
      active === id ? "outline-accent" : "outline-transparent"
    } ${active && active !== id ? "opacity-40" : "opacity-100"}`;

  const hover = (id: ItemId) => ({
    onPointerEnter: () => setActive(id),
    onPointerLeave: () => setActive(null),
  });

  return (
    <section className="mx-auto max-w-[var(--container-page)] px-gutter py-24">
      <SectionHeader
        index="§ 01"
        label="Contents, verified"
        title="An envelope with a lot inside"
        ink="cobalt"
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
        {/*
          The table — decorative; captions below carry the semantics.

          Everything on it is placed in percentages, so the box has to keep a
          fixed ratio: with a plain min-height the prints grew with the column
          width while the table did not, and the main print pushed out past
          the bottom rule and over the hand-numbering. The ratio alone holds
          at every width — no min-height, which would fight it and widen the
          box past its column on small screens. self-start keeps the ratio
          reading width → height; stretched to the row height it would read
          the other way round and push the caption column shut.
        */}
        <div
          className="@container print-block security-tint relative aspect-[13/10] self-start p-[3.2cqw]"
          aria-hidden="true"
        >
          <span className="absolute right-[2.4cqw] top-[1.8cqw] border border-cobalt px-[1.1cqw] py-[0.3cqw] font-mono text-[1.35cqw] font-semibold uppercase tracking-[0.12em] text-cobalt">Fig. 1 — flat lay, actual contents</span>

          <div {...hover("main")} className={`absolute left-[6%] top-[14%] w-[38%] rotate-[-2deg] border border-hairline bg-paper shadow-[var(--shadow-paper)] ${objectClass("main")}`}>
            <ArtworkPlaceholder seedKey={currentEdition.code} className="block aspect-[148/210] w-full" />
            <p className="px-[1.1cqw] py-[0.55cqw] font-mono text-[1.16cqw] uppercase tracking-[0.08em] text-pencil">
              {currentEdition.code} · {production.mainFormat} · edition of {currentEdition.editionSize}
            </p>
          </div>

          <div {...hover("companion")} className={`absolute left-[48%] top-[8%] w-[20%] rotate-[3deg] border border-hairline bg-paper shadow-[var(--shadow-paper)] ${objectClass("companion")}`}>
            <ArtworkPlaceholder seedKey={`${currentEdition.code}-companion`} className="block aspect-[105/148] w-full" />
            <p className="px-[0.8cqw] py-[0.3cqw] font-mono text-[1.06cqw] uppercase tracking-[0.06em] text-pencil">
              {production.companionFormat}
            </p>
          </div>

          <div {...hover("story")} className={`absolute bottom-[12%] left-[38%] w-[30%] rotate-[1.5deg] border border-hairline bg-paper p-[1.6cqw] shadow-[var(--shadow-paper)] ${objectClass("story")}`}>
            <p className="font-serif-display text-[1.9cqw]">{currentEdition.subject}</p>
            <p className="mt-[0.5cqw] font-mono text-[1.06cqw] uppercase tracking-[0.08em] text-pencil">
              {currentEdition.city} · {currentEdition.coordinates}
            </p>
            <div className="mt-[1.1cqw] space-y-[0.8cqw]">
              <div className="h-px w-full bg-hairline" />
              <div className="h-px w-5/6 bg-hairline" />
              <div className="h-px w-4/6 bg-hairline" />
            </div>
          </div>

          <div {...hover("envelope")} className={`absolute right-[4%] top-[34%] w-[34%] rotate-[-1deg] bg-kraft p-[1.6cqw] shadow-[var(--shadow-paper)] ${objectClass("envelope")}`}>
            <div className="flex items-start justify-between">
              <StampMark
                legend={currentEdition.city.toUpperCase()}
                size={52}
                className="h-auto w-[6.9cqw]"
              />
              <div className="h-[4.7cqw] w-[3.7cqw] border border-ink/40" />
            </div>
            <div className="mt-[2.1cqw] space-y-[1.3cqw]">
              <div className="h-px w-full bg-ink/30" />
              <div className="h-px w-3/4 bg-ink/30" />
            </div>
          </div>

          {/* handwritten numbering, bottom-left of the table */}
          <p className="absolute bottom-[6%] left-[7%] rotate-[-3deg] font-serif-display text-[2.64cqw] italic text-ink/80">
            037 / {currentEdition.editionSize}
          </p>
        </div>

        {/* the captions — the accessible content */}
        <ol className="divide-y divide-hairline-soft border-t border-hairline">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="w-full py-5 text-left"
                {...hover(item.id)}
                onFocus={() => setActive(item.id)}
                onBlur={() => setActive(null)}
                aria-label={`${item.code} — ${item.name}. ${item.caption}`}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.8rem] font-medium text-accent-deep">{item.code}</span>
                  <span className={`font-serif-display text-xl transition-colors duration-[var(--duration-ui)] ${active === item.id ? "text-accent-deep" : ""}`}>
                    {item.name}
                  </span>
                </span>
                <span className="mt-2 block pl-10 text-[0.95rem] leading-relaxed text-ink-soft">
                  {item.caption}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
