import type { SubscriptionPlan } from "./types";
import { formatPrice, planPricing } from "./pricing";

/*
  Subscription plan COPY lives here; plan PRICES live in content/pricing.ts
  and are injected below — nothing is hardcoded. Change a number in pricing.ts
  and it flows through here to every component.

  Three terms, the way a mail club works: one month, six months or a year.
  The longer the term, the lower the price per envelope. Each plan `id`
  matches a Shopify product (`plan_id` metafield) whose selling plan makes
  it recur — see lib/shopify.
*/

const shared = [
  "Two prints — a numbered A5 main print and an A6 companion study",
  "The story card: the country, the artist, the sources",
  "A stamped envelope, posted to your letterbox",
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "monthly",
    name: "1 month",
    price: formatPrice(planPricing.monthly.price),
    priceDetail: `${planPricing.monthly.cadence} · shipping included (BE/NL/EU)`,
    summary: "One envelope a month, renewed monthly until you stop.",
    items: [...shared, "Cancel any time before the 20th — one click"],
    cta: "Join for 1 month",
    footnote: "Join before the 20th and your first envelope is this month's edition.",
  },
  {
    id: "six-months",
    name: "6 months",
    price: formatPrice(planPricing["six-months"].price),
    priceDetail: `${planPricing["six-months"].cadence} · ${planPricing["six-months"].effective}`,
    summary: "Six envelopes, paid once, at a lower price per envelope.",
    items: [...shared, "Renews for another six months unless you cancel"],
    cta: "Join for 6 months",
    footnote: "Join before the 20th and your first envelope is this month's edition.",
  },
  {
    id: "annual",
    name: "1 year",
    price: formatPrice(planPricing.annual.price),
    priceDetail: `${planPricing.annual.cadence} · ${planPricing.annual.effective}`,
    summary: "All twelve envelopes of the year, paid once — the best price.",
    items: [
      ...shared,
      "The final print — a thirteenth work, members only",
      "Your edition number reserved for the whole year",
    ],
    cta: "Join for a year",
    footnote: "Join before the 20th and your first envelope is this month's edition.",
    recommended: true,
  },
];
