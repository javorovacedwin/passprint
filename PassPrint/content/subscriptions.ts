import type { SubscriptionPlan } from "./types";
import { formatFrom, formatPrice, planPricing } from "./pricing";

/*
  Subscription plan COPY lives here; plan PRICES live in content/pricing.ts
  and are injected below — nothing is hardcoded. Change a number in pricing.ts
  and it flows through here to every component.

  Each plan `id` matches a Shopify selling-plan / product handle so the two
  can be kept in sync (see lib/shopify).
*/

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: formatPrice(planPricing.monthly.price),
    priceDetail: `${planPricing.monthly.cadence} · shipping included (BE/NL/EU)`,
    summary: "The current edition, every month, until you say stop.",
    items: [
      "Two prints — a numbered A5 main print and an A6 companion study",
      "The story card: the place, the artist, the sources",
      "A stamped envelope, its colour set by the collection",
      "Cancel any time before the 20th — one click, no phone call",
    ],
    cta: "Start monthly",
    footnote: "Order before the 20th and your first envelope is this month's edition.",
  },
  {
    id: "annual",
    name: "Annual",
    price: formatPrice(planPricing.annual.price),
    priceDetail: `${planPricing.annual.cadence} · ${planPricing.annual.effective}`,
    summary: "All twelve editions of the collection, paid once.",
    items: [
      "Twelve monthly editions — one former-Yugoslav city a month, from October 2026",
      "The collector's archive folder, sized for the full set",
      "The final print — a thirteenth work, members only",
      "Your edition number reserved for the whole year",
    ],
    cta: "Join for the year",
    footnote: "The archive folder ships with edition twelve.",
    recommended: true,
  },
  {
    id: "gift",
    name: "Gift",
    price: formatFrom(planPricing.gift.price),
    priceDetail: planPricing.gift.cadence,
    summary: "A fixed run of envelopes to someone else's address. It ends when it ends.",
    items: [
      "Three, six or twelve editions — you choose",
      "An announcement card, printed or digital, to give on the day",
      "Nothing renews. The recipient never receives a bill",
      "Starts with the month you pick",
    ],
    cta: "Give a run",
    footnote: "Order before the 15th of December for an envelope under the tree.",
  },
];
