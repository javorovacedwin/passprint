import type { Metadata } from "next";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { singleEditionPrice, formatPrice } from "@/content/pricing";
import { getCurrentEdition, getSubscriptionPlans } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Join PassPrint monthly, for a year, or as a gift. Two numbered prints and one story a month, shipping included in BE/NL/EU.",
};

// Re-fetch Shopify prices/availability at most hourly (ISR).
export const revalidate = 3600;

export default async function SubscribePage() {
  // Prices, variants and availability come from Shopify when configured,
  // from the local content files if not.
  const [plans, currentEdition] = await Promise.all([
    getSubscriptionPlans(),
    getCurrentEdition(),
  ]);

  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      <header className="max-w-3xl">
        <p className="mono-label">Membership · shipping included BE/NL/EU</p>
        <h1 className="font-serif-display mt-5 text-[clamp(2.4rem,6vw,4rem)]">
          Three ways to join
        </h1>
        <p className="mt-6 max-w-[var(--container-measure)] text-[1.05rem] leading-relaxed text-ink-soft">
          Order before the 20th and your first envelope is this month&apos;s
          edition — {currentEdition.code}, {currentEdition.month}, its city
          still coming soon. After the 20th you start with the next one;
          we say so before you pay, not after.
        </p>
      </header>

      <div className="mt-14">
        <SubscriptionPlans plans={plans} purchasable />
      </div>

      {/* Buy the current edition on its own — a real Shopify add-to-cart. */}
      <section className="mt-16 max-w-3xl border-t border-hairline pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mono-label">Not ready to subscribe?</p>
            <h2 className="font-serif-display mt-2 text-2xl">
              Buy {currentEdition.code} on its own
            </h2>
            <p className="mt-2 max-w-[34rem] text-[0.98rem] leading-relaxed text-ink-soft">
              The current edition — {currentEdition.code}, {currentEdition.month} —
              as a single order while its window is open. {formatPrice(singleEditionPrice)},
              shipping included.
            </p>
          </div>
          <AddToCartButton
            variantId={currentEdition.variantId ?? null}
            available={currentEdition.available ?? true}
            label="Buy this edition"
            variant="framed"
          />
        </div>
      </section>

      <section className="mt-16 max-w-3xl border-t border-hairline pt-8">
        <h2 className="font-serif-display text-2xl">Before you decide</h2>
        <ul className="mt-5 space-y-3 text-[0.98rem] leading-relaxed text-ink-soft">
          <li>
            Cancelling a monthly membership takes one click, before the 20th,
            without an email or a phone call.
          </li>
          <li>
            You can pause for one month, twice a year, and keep your place in
            the collection.
          </li>
          <li>Gift runs end by themselves. The recipient never receives a bill.</li>
          <li>
            If an envelope arrives damaged: send one photo and a replacement
            ships from the overrun. No return, no discussion.
          </li>
        </ul>
        <p className="mono-label mt-8">
          Checkout is handled securely by Shopify. Card and Bancontact accepted.
        </p>
      </section>
    </div>
  );
}
