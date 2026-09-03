/*
  ────────────────────────────────────────────────────────────────────────
  SHOPIFY — where live commerce data enters the application.
  ────────────────────────────────────────────────────────────────────────

  This is the ONLY module that talks to Shopify. Everything else in the app
  imports from lib/shopify/index.ts, which returns Shopify data when the
  store is configured and falls back to the local files in content/ when it
  is not. That means:

    • the site always builds and runs, with or without Shopify credentials;
    • no product data is duplicated by hand — Shopify is the source of truth
      as soon as the env vars are present;
    • adding a collection in Shopify makes it appear on the site.

  Configure by adding to .env.local (see .env.example):

    SHOPIFY_SHOP_DOMAIN=x1t200-0i.myshopify.com
    SHOPIFY_STOREFRONT_ACCESS_TOKEN=<public Storefront API token>

  The Storefront token is a public, read-only token — but we still only read
  it on the server (no NEXT_PUBLIC_ prefix) so it never ships in the client
  bundle.
*/

const API_VERSION = "2025-01";

/** SHOPIFY_STORE_DOMAIN is the previous name, honoured during migration. */
function shopDomain(): string | undefined {
  return process.env.SHOPIFY_SHOP_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
}

export interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  /** Seconds before Next.js revalidates this data. Default: 1 hour. */
  revalidate?: number;
}

export function isShopifyConfigured(): boolean {
  return Boolean(shopDomain() && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

/**
 * Run a Storefront API query. Returns null on any failure — missing
 * credentials, network error, or GraphQL errors — so every caller can
 * simply fall back to local content instead of crashing the page.
 */
export async function shopifyFetch<T>({
  query,
  variables,
  revalidate = 3600,
}: ShopifyFetchOptions): Promise<T | null> {
  const domain = shopDomain();
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) return null;

  try {
    const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    });

    if (!res.ok) {
      console.warn(`[shopify] ${res.status} ${res.statusText}`);
      return null;
    }

    const body = (await res.json()) as { data?: T; errors?: unknown };

    if (body.errors) {
      console.warn("[shopify] GraphQL errors", body.errors);
      return null;
    }

    return body.data ?? null;
  } catch (error) {
    console.warn("[shopify] request failed", error);
    return null;
  }
}
