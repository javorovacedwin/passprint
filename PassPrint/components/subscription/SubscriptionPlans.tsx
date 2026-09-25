import { ButtonLink } from "@/components/ui/Button";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { SubscriptionPlan } from "@/content/types";

/*
  Three memberships set as columns divided by hairlines — a rate card in a
  publication, not a SaaS pricing table.

  `purchasable` decides the call to action:
    - false (homepage preview): a link to /subscribe.
    - true (/subscribe): a real add-to-cart against the Shopify variant.
  Recurring billing is handled by Shopify selling plans on those products;
  see README.
*/

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[];
  purchasable?: boolean;
}

/** Each plan gets its own press ink. */
const planInk: Record<string, { band: string; deep: string; badge: string }> = {
  monthly: { band: "var(--color-cobalt)", deep: "var(--color-cobalt-deep)", badge: "bg-cobalt text-paper" },
  annual: { band: "var(--color-vermilion)", deep: "var(--color-vermilion-deep)", badge: "bg-vermilion text-paper" },
  "six-months": { band: "var(--color-marigold)", deep: "var(--color-marigold-deep)", badge: "bg-marigold text-ink" },
};

export function SubscriptionPlans({ plans, purchasable = false }: SubscriptionPlansProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3 md:gap-5">
      {plans.map((plan) => {
        const ink = planInk[plan.id] ?? planInk.monthly;
        return (
        <article
          key={plan.id}
          className={`print-block relative flex flex-col p-7 ${
            plan.recommended ? "md:-translate-y-2" : ""
          }`}
        >
          {/* ink band across the top of the panel */}
          <div className="absolute inset-x-0 top-0 h-2" style={{ background: ink.band }} aria-hidden="true" />
          {plan.recommended && (
            <p className="absolute -top-3.5 right-5 rotate-2 border border-vermilion bg-paper px-2.5 py-1 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-vermilion">
              Most chosen
            </p>
          )}
          <h3 className="font-serif-display mt-2 text-3xl">{plan.name}</h3>
          <p className="font-serif-book mt-4 text-[2.2rem] font-bold" style={{ color: ink.deep }}>{plan.price}</p>
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-pencil">
            {plan.priceDetail}
          </p>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">{plan.summary}</p>
          <ul className="mt-5 flex-1 space-y-2.5 border-t-2 border-ink/15 pt-5">
            {plan.items.map((item) => (
              <li key={item} className="flex gap-3 text-[0.94rem] leading-relaxed text-ink-soft">
                <svg viewBox="-50 -50 100 100" className="mt-[0.3em] h-3 w-3 shrink-0" aria-hidden="true" style={{ color: ink.band }}>
                  <path fill="currentColor" d="M0 -46 L9 -12 L44 -18 L16 0 L44 18 L9 12 L0 46 L-9 12 L-44 18 L-16 0 L-44 -18 L-9 -12 Z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7">
            {purchasable ? (
              <AddToCartButton
                // Without a selling plan Shopify would charge once, not every
                // term — so the button stays shut until the plan exists.
                variantId={plan.sellingPlanId ? plan.variantId ?? null : null}
                sellingPlanId={plan.sellingPlanId ?? null}
                available={plan.available ?? true}
                label={plan.cta}
                variant={plan.recommended ? "ink" : "framed"}
                className="w-full"
              />
            ) : (
              <ButtonLink
                href={`/subscribe#${plan.id}`}
                variant={plan.recommended ? "vermilion" : "framed"}
                className="w-full justify-center"
              >
                {plan.cta}
              </ButtonLink>
            )}
          </div>
          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.05em] leading-relaxed text-pencil">
            {plan.footnote}
          </p>
        </article>
        );
      })}
    </div>
  );
}
