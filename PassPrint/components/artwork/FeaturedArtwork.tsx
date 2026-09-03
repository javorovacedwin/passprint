"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArtworkPlaceholder } from "@/components/artwork/ArtworkPlaceholder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StampMark } from "@/components/ui/StampMark";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ButtonLink } from "@/components/ui/Button";
import { artistBySlug } from "@/content/artists";
import {
  currentCollection,
  currentEdition as localEdition,
  production,
} from "@/content/collections";
import { formatPrice, planPricing, singleEditionPrice } from "@/content/pricing";
import type { Edition } from "@/content/types";

type Face = "front" | "detail" | "back";

const faces: { id: Face; label: string }[] = [
  { id: "front", label: "The print" },
  { id: "detail", label: "Detail, actual size" },
  { id: "back", label: "The back" },
];

/**
 * This month's edition, and the point where the site becomes a shop: the
 * plate, its facts, its price, and a real add-to-cart. Faces are switched
 * with labelled controls (click, not hover — accessible and touch-safe).
 */
export function FeaturedArtwork({ edition }: { edition?: Edition }) {
  const [face, setFace] = useState<Face>("front");
  const currentEdition = edition ?? localEdition;
  const artist = artistBySlug(currentEdition.artistSlug);

  return (
    <section className="mx-auto max-w-[var(--container-page)] px-gutter py-24">
      <SectionHeader
        index="§ 02"
        label={`${currentEdition.code} · ${currentEdition.monthCode}`}
        title={`This month: ${currentEdition.subject}`}
        ink="vermilion"
      />
      <p className="mono-label mt-4">
        {currentEdition.site} · {currentCollection.city}, {currentCollection.country}
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.35fr_1fr]">
        <figure>
          <div className="print-block relative">
            <motion.div
              key={face}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.3, 1] }}
            >
              {face === "back" ? (
                <div className="relative flex aspect-[148/210] w-full flex-col items-center justify-center bg-paper">
                  <p className="rotate-[-2deg] font-serif-display text-3xl italic text-ink/85">
                    037 / {currentEdition.editionSize}
                  </p>
                  <p className="mt-2 rotate-[-2deg] font-serif-display text-lg italic text-ink/60">
                    {currentEdition.monthCode}
                  </p>
                  <div className="absolute bottom-8 right-8">
                    <StampMark legend={currentCollection.city.toUpperCase()} size={92} className="opacity-80" />
                  </div>
                  <p className="absolute bottom-8 left-8 max-w-[45%] font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.08em] text-pencil">
                    Printed on {production.paper}. Keep out of direct sunlight —
                    the ink is light, the paper is not.
                  </p>
                </div>
              ) : (
                <ArtworkPlaceholder
                  seedKey={currentEdition.code}
                  face={face}
                  title={`${currentEdition.subject}, ${currentCollection.city} — ${face === "detail" ? "print detail at actual size" : "main print"}`}
                  className="block aspect-[148/210] w-full"
                />
              )}
            </motion.div>
          </div>
          <figcaption className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.06em] text-pencil">
            {currentEdition.site}, {currentCollection.city} ·{" "}
            {currentEdition.coordinates} · {artist?.name} ·{" "}
            {currentEdition.technique?.toLowerCase()}, 2026 · edition of{" "}
            {currentEdition.editionSize} · {production.mainFormat}, {production.paper}
          </figcaption>

          <div className="mt-6 flex gap-0 border border-ink" role="group" aria-label="View of the print">
            {faces.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFace(f.id)}
                aria-pressed={face === f.id}
                className={`flex-1 border-r border-ink/40 px-3 py-2.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-[var(--duration-ui)] last:border-r-0 ${
                  face === f.id ? "bg-ink text-paper" : "bg-paper text-ink-soft hover:bg-paper-deep"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </figure>

        <div className="max-w-[var(--container-measure)]">
          <h3 className="font-serif-display text-2xl">
            {currentEdition.subject}, drawn from the ground
          </h3>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-soft">
            {currentEdition.note}
          </p>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">
            {currentEdition.technique} in an edition of {currentEdition.editionSize}.
            We close the order list on the 20th, print what is needed, number
            every copy by hand on the back, and never reprint.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hairline pt-5 font-mono text-[0.74rem] uppercase tracking-[0.06em]">
            <div>
              <dt className="text-pencil">Artist</dt>
              <dd className="mt-1 text-ink">{artist?.name}</dd>
            </div>
            <div>
              <dt className="text-pencil">Technique</dt>
              <dd className="mt-1 text-ink">{currentEdition.technique}</dd>
            </div>
            <div>
              <dt className="text-pencil">Coordinates</dt>
              <dd className="mt-1 text-ink">{currentEdition.coordinates}</dd>
            </div>
            <div>
              <dt className="text-pencil">Edition</dt>
              <dd className="mt-1 text-ink">
                {currentEdition.editionSize}, numbered by hand
              </dd>
            </div>
          </dl>

          {/* the shop moment: price and a real add-to-cart, right where the
              work is shown, so nobody has to hunt for how to buy it */}
          <div className="mt-8 border-t border-hairline pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-serif-book text-3xl font-bold text-ink">
                {formatPrice(singleEditionPrice)}
              </p>
              <p className="mono-label">
                {production.mainFormat} + {production.companionFormat} · shipping included
              </p>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <AddToCartButton
                variantId={currentEdition.variantId ?? null}
                available={currentEdition.available ?? true}
                label="Buy this edition"
              />
              <ButtonLink href="/subscribe" variant="text">
                Or join from {formatPrice(planPricing.monthly.price)} a month →
              </ButtonLink>
            </div>
            <p className="mt-4 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.06em] text-pencil">
              Orders close on the 20th · secure checkout by Shopify
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
