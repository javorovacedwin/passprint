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
  id: "monthly" | "annual" | "gift";
  /** Headline price shown on the plan. */
  price: Money;
  /** Billing cadence label, e.g. "per month". */
  cadence: string;
  /** Optional effective/comparison note, e.g. "€17 per month". */
  effective?: string;
  /** For the gift plan: the lowest of several term prices. */
  from?: boolean;
}

export const currency = {
  code: "EUR" as const,
  symbol: "€",
  /** en/nl use "," decimals; keep formatting centralised here. */
  locale: "nl-BE",
};

/**
 * PLACEHOLDER launch pricing. €18/month is intentionally below the earlier
 * €24 to suit the launch audience — adjust once quotes are in.
 */
export const planPricing: Record<PlanPricing["id"], PlanPricing> = {
  monthly: {
    id: "monthly",
    price: { amount: 18, currency: "EUR" },
    cadence: "per month",
  },
  annual: {
    id: "annual",
    price: { amount: 192, currency: "EUR" },
    cadence: "once, for the year",
    effective: "€16 per month",
  },
  gift: {
    id: "gift",
    price: { amount: 54, currency: "EUR" },
    cadence: "3, 6 or 12 editions, paid once",
    from: true,
  },
};

/** Price of a single print edition bought on its own. */
export const singleEditionPrice: Money = { amount: 24, currency: "EUR" };

/** Format a Money value as a clean price string, e.g. "€18". */
export function formatPrice(money: Money): string {
  const whole = Number.isInteger(money.amount);
  const value = whole
    ? money.amount.toString()
    : money.amount.toFixed(2).replace(".", ",");
  return `${currency.symbol}${value}`;
}

/** Format as "from €54", used for the gift plan. */
export function formatFrom(money: Money): string {
  return `from ${formatPrice(money)}`;
}
