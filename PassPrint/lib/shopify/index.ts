import { isShopifyConfigured, shopifyFetch } from "./client";
import { COLLECTION_QUERY, SUBSCRIPTION_PRODUCTS_QUERY } from "./queries";
import { COMING_SOON, conceal, atlasCollection } from "@/content/collections";
import { subscriptionPlans as localPlans } from "@/content/subscriptions";
import type { Collection, Edition, EditionStatus, SubscriptionPlan } from "@/content/types";

/*
  ────────────────────────────────────────────────────────────────────────
  The public data API for the site.
  ────────────────────────────────────────────────────────────────────────

  Pages call these functions instead of importing content/ directly when the
  data is commercial (prices, availability, editions). Each one:

    1. asks Shopify, if credentials are configured;
    2. maps the Shopify shape onto our own types;
    3. falls back to the local content files on any miss.

  ── How to add a new EDITION in Shopify ────────────────────────────────
  Create a product in the collection for that country and set these metafields
  (namespace `passprint`, all single-line text unless noted):

    edition_code    AT-04            month         January 2027
    edition_number  4 (integer)      month_code    01.2027
    country         Slovenia
    region          (optional, e.g. "Herzegovina")
    subject         The triple bridge
    site            Tromostovje
    coordinates     46.0511 N, 14.5051 E
    technique       Screen print     edition_size  180 (integer)
    status          current | announced | sealed | published
    note            One or two factual sentences (multi-line)
    artist_slug     bakir-c — every edition is the same artist

  ── How to add a new COLLECTION (the next twelve countries) ─────────────────────────
  Create a Shopify collection, tag it `passprint`, set metafields
  `collection_code`, `region`, `year`, `accent`, `launch_month`, then add its
  twelve edition products — each one carrying its own country. Pass its
  handle to getCollection().

  ── How to add a SUBSCRIPTION product ─────────────────────────────────
  Create a product, tag it `subscription`, set `plan_id` to monthly |
  annual | gift, plus `cadence`, optional `effective` and `recommended`.
  Recurring billing itself is handled by a Shopify subscriptions app
  (selling plans); this layer reads the price and availability.
*/

const COLLECTION_HANDLE = "atlas";

interface MetafieldValue {
  value: string | null;
}

interface ShopifyEditionProduct {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: Array<{ id: string; availableForSale: boolean }> };
  code: MetafieldValue | null;
  number: MetafieldValue | null;
  month: MetafieldValue | null;
  monthCode: MetafieldValue | null;
  country: MetafieldValue | null;
  region: MetafieldValue | null;
  subject: MetafieldValue | null;
  site: MetafieldValue | null;
  coordinates: MetafieldValue | null;
  technique: MetafieldValue | null;
  editionSize: MetafieldValue | null;
  status: MetafieldValue | null;
  note: MetafieldValue | null;
  artistSlug: MetafieldValue | null;
}

interface ShopifyCollectionResponse {
  collection: {
    handle: string;
    title: string;
    collectionCode: MetafieldValue | null;
    region: MetafieldValue | null;
    year: MetafieldValue | null;
    accent: MetafieldValue | null;
    launchMonth: MetafieldValue | null;
    products: { nodes: ShopifyEditionProduct[] };
  } | null;
}

interface ShopifySubscriptionProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: Array<{ id: string; availableForSale: boolean }> };
  planId: MetafieldValue | null;
  cadence: MetafieldValue | null;
  effective: MetafieldValue | null;
  recommended: MetafieldValue | null;
}

interface ShopifySubscriptionsResponse {
  products: { nodes: ShopifySubscriptionProduct[] };
}

const mf = (field: MetafieldValue | null): string | null => field?.value ?? null;

const asStatus = (value: string | null): EditionStatus => {
  const allowed: EditionStatus[] = ["current", "announced", "sealed", "published"];
  return allowed.includes(value as EditionStatus) ? (value as EditionStatus) : "sealed";
};

/** Format a Shopify money amount the same way content/pricing.ts does. */
function formatShopifyMoney(amount: string, currencyCode: string): string {
  const value = Number(amount);
  const symbol = currencyCode === "EUR" ? "€" : `${currencyCode} `;
  const printed = Number.isInteger(value) ? value.toString() : value.toFixed(2).replace(".", ",");
  return `${symbol}${printed}`;
}

function mapEdition(product: ShopifyEditionProduct): Edition | null {
  const code = mf(product.code);
  const subject = mf(product.subject);
  if (!code || !subject) return null; // not a PassPrint edition product

  const size = mf(product.editionSize);
  const number = mf(product.number);

  return conceal({
    code,
    number: number ? Number(number) : 0,
    month: mf(product.month) ?? "",
    monthCode: mf(product.monthCode) ?? "",
    country: mf(product.country) ?? COMING_SOON,
    region: mf(product.region) ?? undefined,
    subject,
    site: mf(product.site) ?? "———",
    coordinates: mf(product.coordinates) ?? "",
    technique: mf(product.technique),
    editionSize: size ? Number(size) : null,
    artistSlug: mf(product.artistSlug),
    status: asStatus(mf(product.status)),
    note: mf(product.note) ?? "",
    variantId: product.variants.nodes[0]?.id ?? null,
    available: product.availableForSale,
  });
}

/**
 * The current collection. Shopify first, local content as fallback.
 */
export async function getCollection(
  handle: string = COLLECTION_HANDLE
): Promise<Collection> {
  if (!isShopifyConfigured()) return atlasCollection;

  const data = await shopifyFetch<ShopifyCollectionResponse>({
    query: COLLECTION_QUERY,
    variables: { handle, first: 24 },
  });

  const remote = data?.collection;
  if (!remote) return atlasCollection;

  const editions = remote.products.nodes
    .map(mapEdition)
    .filter((e): e is Edition => e !== null)
    .sort((a, b) => a.number - b.number);

  // A collection with no properly tagged editions is not usable — fall back.
  if (editions.length === 0) return atlasCollection;

  return {
    code: mf(remote.collectionCode) ?? atlasCollection.code,
    number: atlasCollection.number,
    title: remote.title || atlasCollection.title,
    region: mf(remote.region) ?? atlasCollection.region,
    year: mf(remote.year) ?? atlasCollection.year,
    accent: mf(remote.accent) ?? atlasCollection.accent,
    launchMonth: mf(remote.launchMonth) ?? atlasCollection.launchMonth,
    editions,
  };
}

/** The edition currently open for orders. */
export async function getCurrentEdition(): Promise<Edition> {
  const collection = await getCollection();
  return collection.editions.find((e) => e.status === "current") ?? collection.editions[0];
}

/**
 * Subscription plans. Prices come from Shopify when configured; the copy
 * always comes from content/subscriptions.ts so the editorial voice stays
 * under our control rather than being written in the Shopify admin.
 */
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  if (!isShopifyConfigured()) return localPlans;

  const data = await shopifyFetch<ShopifySubscriptionsResponse>({
    query: SUBSCRIPTION_PRODUCTS_QUERY,
    variables: { first: 20 },
  });

  const remote = data?.products.nodes ?? [];
  if (remote.length === 0) return localPlans;

  return localPlans.map((plan) => {
    const match = remote.find((p) => mf(p.planId) === plan.id);
    if (!match) return plan;

    const { amount, currencyCode } = match.priceRange.minVariantPrice;
    // Guard: a product that exists in Shopify but has no real price yet
    // (e.g. seeded before prices were set) keeps the local placeholder,
    // so the site never displays €0.
    const hasPrice = Number(amount) > 0;
    const price = hasPrice ? formatShopifyMoney(amount, currencyCode) : null;

    return {
      ...plan,
      // Shopify is authoritative for price and cadence when present; copy
      // and unset prices fall back to the local plan.
      price: price ? (plan.id === "gift" ? `from ${price}` : price) : plan.price,
      priceDetail: mf(match.cadence) ?? plan.priceDetail,
      variantId: match.variants.nodes[0]?.id ?? null,
      available: match.availableForSale,
    };
  });
}

export { isShopifyConfigured };
