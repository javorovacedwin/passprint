"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { StudioWork } from "@/content/types";

/**
 * A painting hung as if in a gallery: the work centred on a paper mount, a
 * plate beneath it, and a buy panel offering the original or either print
 * size.
 *
 * The mount is square whatever the canvas is, and the picture sits inside it
 * whole — never cropped to fill a box — so a portrait and a landscape hang
 * at the same height and neither loses an edge.
 *
 * The panel slides up over the foot of the mount on hover and on focus. On
 * small screens, where there is no pointer to hover with, it is not an
 * overlay at all: it sits under the picture, permanently open.
 *
 * It is a real radio group, so it is reachable by keyboard and announced as
 * a set of choices, and focus-within is what reveals it. Nothing fades: the
 * panel slides, the way a card is pushed under a mount.
 */
export function StudioWorkCard({
  work,
  index,
  anchor = true,
}: {
  work: StudioWork;
  index: number;
  /** Gives the card an id of its slug, so other sections can link to it. */
  anchor?: boolean;
}) {
  const [selected, setSelected] = useState(work.options[0]);
  const groupName = useId();

  return (
    <article id={anchor ? work.slug : undefined} className="group/work scroll-mt-28">
      {/* the mount: a ruled paper border around the picture */}
      <div className="print-block relative overflow-hidden bg-paper p-3 sm:p-4">
        <div className="relative aspect-square w-full">
          <Image
            src={work.image.src}
            alt={work.image.alt}
            fill
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="object-contain"
            priority={index === 0}
          />
        </div>

        <fieldset className="mt-3 border-t-2 border-ink pt-3 sm:mt-4 sm:pt-4 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:translate-y-full md:bg-paper md:p-4 md:transition-transform md:duration-[var(--duration-slide)] md:ease-[var(--ease-ink)] md:group-focus-within/work:translate-y-0 md:group-hover/work:translate-y-0 motion-reduce:md:transition-none">
          <legend className="sr-only">How to buy {work.title}</legend>
          <p className="mono-label mb-2">Buy this work</p>

          <div
            className={`grid gap-px border border-hairline-soft bg-hairline-soft ${
              work.options.length === 1 ? "" : work.options.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
            }`}
          >
            {work.options.map((option) => {
              const active = option.id === selected.id;
              return (
                <label
                  key={option.id}
                  className={`flex cursor-pointer flex-col justify-between gap-1 p-2.5 transition-colors duration-[var(--duration-ui)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[-2px] has-[:focus-visible]:outline-cobalt ${
                    active ? "bg-cobalt text-paper" : "bg-paper hover:bg-paper-deep"
                  }`}
                >
                  <input
                    type="radio"
                    name={groupName}
                    value={option.id}
                    checked={active}
                    onChange={() => setSelected(option)}
                    className="sr-only"
                  />
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em]">
                      {option.label}
                    </span>
                    <span className="font-serif-book text-base font-bold">{option.price}</span>
                  </span>
                  <span
                    className={`font-mono text-[0.6rem] uppercase leading-snug tracking-[0.06em] ${
                      active ? "text-paper/75" : "text-pencil"
                    }`}
                  >
                    {option.detail}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* the plate under the picture */}
      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <h3 className="font-serif-display text-2xl">{work.title}</h3>
          <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-pencil">
            {work.medium} · {work.dimensions ?? "dimensions on request"}
          </p>
        </div>
        {/*
          The panel is hidden until hover on a pointer device, so the choice
          is repeated here — the plate always says what is selected, even
          when the store is not wired up and the button reads "available
          soon" instead of the price. Below md the panel is permanently
          open a few lines up, so the repeat would be noise: it is hidden.
        */}
        <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-3">
          <p className="hidden font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink md:block">
            {selected.label}
            <span className="font-serif-book ml-2 text-lg font-bold text-vermilion">
              {selected.price}
            </span>
          </p>
          <AddToCartButton
            variantId={selected.variantId}
            available={selected.available}
            label="Add to cart"
            variant="framed"
          />
        </div>
      </div>

      <p className="mt-4 max-w-[var(--container-measure)] leading-relaxed text-ink-soft">
        {work.note}
      </p>
    </article>
  );
}
