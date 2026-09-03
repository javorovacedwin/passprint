import { Hero } from "@/components/home/Hero";
import { WhatArrives } from "@/components/home/WhatArrives";
import { CurrentJourney } from "@/components/home/CurrentJourney";
import { FeaturedArtwork } from "@/components/artwork/FeaturedArtwork";
import { MeetArtist } from "@/components/home/MeetArtist";
import { ClosingStatement } from "@/components/home/ClosingStatement";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { getCurrentEdition, getSubscriptionPlans } from "@/lib/shopify";

// Re-fetch Shopify prices at most hourly (ISR).
export const revalidate = 3600;

/*
  The homepage answers, in order, the only questions a first-time visitor
  actually has:

    1. What is this?            → Hero
    2. What do I get?           → § 01  What arrives
    3. Show me — can I buy it?  → § 02  This month  (price + add to cart)
    4. Does it keep going?      → § 03  The year
    5. Who makes it?            → § 04  The maker
    6. How do I join?           → § 05  Memberships

  Everything else — the full catalogue, the artist in depth, the vote for
  the next region — lives on its own page and is linked from here. Keeping
  those off the homepage is what stops it turning into a scroll.
*/

export default async function HomePage() {
  // Shopify when configured; local content otherwise.
  const [plans, currentEdition] = await Promise.all([
    getSubscriptionPlans(),
    getCurrentEdition(),
  ]);

  return (
    <>
      <Hero />
      <WhatArrives />
      <FeaturedArtwork edition={currentEdition} />
      <CurrentJourney />
      <MeetArtist />

      <section id="join" className="security-tint border-y border-ink/25 bg-cobalt/[0.05] py-24">
        <div className="mx-auto max-w-[var(--container-page)] px-gutter">
          <SectionHeader
            index="§ 05"
            label="Shipping included BE · NL · EU"
            title="Three ways in"
          />
          <div className="mt-12">
            <SubscriptionPlans plans={plans} purchasable />
          </div>
          <p className="mt-6 max-w-[var(--container-measure)] font-mono text-[0.74rem] font-semibold uppercase tracking-[0.06em] leading-relaxed text-pencil">
            Order before the 20th and you start with this month&apos;s edition.
            Cancelling takes one click, before the 20th, no questions asked.
          </p>
        </div>
      </section>

      <ClosingStatement />
    </>
  );
}
