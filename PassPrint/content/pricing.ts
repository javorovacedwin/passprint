/*
  ────────────────────────────────────────────────────────────────────────
  PRICING — single source of truth for the whole site.
  ────────────────────────────────────────────────────────────────────────

  Change prices HERE and nothing else. No price is hardcoded anywhere else
  in the codebase; every component formats from these numbers via
  `formatPrice` / `formatFrom` below.

  All values are TEMPORARY PLACEHOLDERS pending final print and postage
  quotes. They are deliberately conservative for the launch audience — edit
  the `amount` fields freely.

  When Shopify is the source of truth (see lib/shopify), live prices override
  these at runtime; these remain the offline fallback. Keep the `id`s aligned
  with the Shopify product handles / selling-plan ids so the two stay in sync.
*/

export interface Money {
  /** Whole-currency amount, e.g. 19 or 17.5. */
  amount: number;
  currency: "EUR";
}

export interface PlanPricing {
  id: "monthly" | "six-months" | "annual";
  /** Headline price shown on the plan. */
  price: Money;
  /** Billing cadence label, e.g. "per month". */
  cadence: string;
  /** Optional effective/comparison note, e.g. "€16 per month". */
  effective?: string;
}

export const currency = {
  code: "EUR" as const,
  symbol: "€",
  /** en/nl use "," decimals; keep formatting centralised here. */
  locale: "nl-BE",
};

/**
 * Three terms: one month, six months or a year. The longer terms are paid
 * up front and carry the discount — €18 a month, €16 a month for six, €15
 * a month for twelve. PLACEHOLDER amounts; adjust once quotes are in.
 */
export const planPricing: Record<PlanPricing["id"], PlanPricing> = {
  monthly: {
    id: "monthly",
    price: { amount: 18, currency: "EUR" },
    cadence: "per month",
  },
  "six-months": {
    id: "six-months",
    price: { amount: 96, currency: "EUR" },
    cadence: "every 6 months",
    effective: "€16 per month · save €12",
  },
  annual: {
    id: "annual",
    price: { amount: 180, currency: "EUR" },
    cadence: "once a year",
    effective: "€15 per month · save €36",
  },
};

/** Price of a single print edition bought on its own. */
export const singleEditionPrice: Money = { amount: 24, currency: "EUR" };

/*
  Studio works — the paintings sold outside the monthly cycle, as the
  original or as a print in A3, A4, A5 or A6.

  PLACEHOLDER prices — all four print sizes are to be set with the artist. Confirm with the artist before launch; the original
  price is per work and lives in content/artworks.ts.
*/
export const studioPrintPrice = {
  a3: { amount: 85, currency: "EUR" } as Money,
  a4: { amount: 45, currency: "EUR" } as Money,
  a5: { amount: 30, currency: "EUR" } as Money,
  a6: { amount: 20, currency: "EUR" } as Money,
};

/** Format a Money value as a clean price string, e.g. "€18". */
export function formatPrice(money: Money): string {
  const whole = Number.isInteger(money.amount);
  const value = whole
    ? money.amount.toString()
    : money.amount.toFixed(2).replace(".", ",");
  return `${currency.symbol}${value}`;
}

/** Format as "from €18". */
export function formatFrom(money: Money): string {
  return `from ${formatPrice(money)}`;
}
