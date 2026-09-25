"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ButtonLink } from "@/components/ui/Button";
import { ContentsFlatLay } from "@/components/home/WhatArrives";
import { artistBySlug } from "@/content/artists";
import {
  currentEdition as localEdition,
  isConcealed,
  production,
} from "@/content/collections";
import { formatPrice, planPricing, singleEditionPrice } from "@/content/pricing";
import type { SubscriptionPlan } from "@/content/types";
import type { Edition } from "@/content/types";

/**
 * This month's edition, and the point where the site becomes a shop. The
 * envelope is laid flat so you can see what arrives and what each piece
 * is; the edition can be ordered now, even while its country is withheld.
 */
export function FeaturedArtwork({
  edition,
  monthlyPlan,
}: {
  edition?: Edition;
  /** The one-month membership, so the edition can be joined from here. */
  monthlyPlan?: SubscriptionPlan;
}) {
  const currentEdition = edition ?? localEdition;
  const artist = artistBySlug(currentEdition.artistSlug);
  const hidden = isConcealed(currentEdition);
  const monthName = currentEdition.month.split(" ")[0];

  return (
    <section className="mx-auto max-w-[var(--container-page)] px-gutter py-24">
      <SectionHeader
        index="§ 02"
        label={`${currentEdition.code} · ${currentEdition.monthCode}`}
        title={hidden ? "This month: join the club" : `This month: ${currentEdition.subject}`}
        ink="vermilion"
      />
      <p className="mono-label mt-4">
        {hidden
          ? `${currentEdition.month} · join now — the country is revealed in the envelope`
          : `${currentEdition.site} · ${currentEdition.country}`}
      </p>

      <div className="mt-12">
        <ContentsFlatLay edition={currentEdition} />
      </div>

      <div className="mt-14 grid gap-12 border-t border-hairline pt-10 lg:grid-cols-[1.35fr_1fr]">
        <div className="max-w-[var(--container-measure)]">
          <h3 className="font-serif-display text-2xl">
            {hidden ? `Join now, open it in ${monthName}` : `${currentEdition.subject}, drawn from the ground`}
          </h3>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-soft">
            {hidden
              ? `Members receive the ${currentEdition.month} envelope first. Which country it is stays a surprise until the envelope arrives.`
              : currentEdition.note}
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
              <dt className="text-pencil">Format</dt>
              <dd className="mt-1 text-ink">
                {production.mainFormat} + {production.companionFormat}
              </dd>
            </div>
            <div>
              <dt className="text-pencil">Edition</dt>
              <dd className="mt-1 text-ink">
                {currentEdition.editionSize}, numbered by hand
              </dd>
            </div>
          </dl>
        </div>

        {/* the shop moment: join the club first, one envelope second */}
        <div className="self-start border border-ink/30 bg-paper-deep/40 p-6">
          <p className="mono-label">Join the club · shipping included</p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-serif-book text-3xl font-bold text-ink">
              {formatPrice(planPricing.monthly.price)}
              <span className="ml-2 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-pencil">a month</span>
            </p>
          </div>
          <p className="mt-2 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.06em] text-pencil">
            6 months {formatPrice(planPricing["six-months"].price)} · 1 year {formatPrice(planPricing.annual.price)} — cheaper per envelope
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <AddToCartButton
              variantId={monthlyPlan?.sellingPlanId ? monthlyPlan.variantId ?? null : null}
              sellingPlanId={monthlyPlan?.sellingPlanId ?? null}
              available={monthlyPlan?.available ?? true}
              label="Join for 1 month"
            />
            <ButtonLink href="/subscribe" variant="text">
              6 months or a year →
            </ButtonLink>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-5">
            <p className="text-[0.95rem] text-ink-soft">
              Just this envelope, once: <strong className="text-ink">{formatPrice(singleEditionPrice)}</strong>
            </p>
            <AddToCartButton
              variantId={currentEdition.variantId ?? null}
              available={currentEdition.available ?? true}
              label="Buy once"
              variant="framed"
            />
          </div>
          <p className="mt-4 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.06em] text-pencil">
            Join before the 20th for this month&apos;s envelope · secure checkout by Shopify
          </p>
        </div>
      </div>
    </section>
  );
}
