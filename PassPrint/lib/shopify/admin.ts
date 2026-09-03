import {
  getAdminToken,
  invalidateAdminToken,
  isAdminConfigured,
  shopDomain,
} from "./admin-token";

/*
  ────────────────────────────────────────────────────────────────────────
  SHOPIFY ADMIN API — orders and customers.
  ────────────────────────────────────────────────────────────────────────

  The Storefront API (lib/shopify/client.ts) is public and read-only: it
  powers the catalogue and the cart. Anything privileged — reading orders,
  creating customers — goes through the Admin API and this file.

  Authentication is handled by ./admin-token: a Dev Dashboard app exchanges
  its Client ID and Secret for a short-lived Admin token, which is cached and
  refreshed automatically. Nothing here holds a long-lived credential.

  Configure in .env.local / Vercel:

    SHOPIFY_SHOP_DOMAIN=x1t200-0i.myshopify.com
    SHOPIFY_CLIENT_ID=...
    SHOPIFY_CLIENT_SECRET=...

  Required Admin API scopes on the app:
    read_orders, read_customers, write_customers
*/

const ADMIN_API_VERSION = "2025-01";

export { isAdminConfigured };

async function adminFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  /** Internal: allows exactly one retry after a rejected token. */
  isRetry = false
): Promise<T | null> {
  const domain = shopDomain();
  if (!domain) return null;

  const token = await getAdminToken();
  if (!token) return null;

  try {
    const res = await fetch(
      `https://${domain}/admin/api/${ADMIN_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": token,
        },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
      }
    );

    // A token can be revoked before it expires. Mint a fresh one and retry
    // once; a second 401 means the credentials themselves are wrong.
    if (res.status === 401 && !isRetry) {
      invalidateAdminToken();
      return adminFetch<T>(query, variables, true);
    }

    if (!res.ok) {
      console.warn(`[shopify-admin] ${res.status} ${res.statusText}`);
      return null;
    }

    const body = (await res.json()) as { data?: T; errors?: unknown };
    if (body.errors) {
      console.warn("[shopify-admin] GraphQL errors", body.errors);
      return null;
    }
    return body.data ?? null;
  } catch (error) {
    console.warn("[shopify-admin] request failed", error);
    return null;
  }
}

/* ── Orders ─────────────────────────────────────────────────────────── */

export interface AdminOrderLine {
  title: string;
  quantity: number;
  sku: string | null;
  handle: string | null;
}

export interface AdminOrder {
  id: string;
  name: string;
  email: string | null;
  createdAt: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  total: { amount: string; currencyCode: string };
  customerName: string | null;
  city: string | null;
  country: string | null;
  lines: AdminOrderLine[];
}

const ORDERS_QUERY = /* GraphQL */ `
  query PassPrintOrders($first: Int!, $after: String, $query: String) {
    orders(first: $first, after: $after, query: $query, sortKey: CREATED_AT, reverse: true) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        name
        email
        createdAt
        displayFinancialStatus
        displayFulfillmentStatus
        currentTotalPriceSet { shopMoney { amount currencyCode } }
        customer { firstName lastName }
        shippingAddress { city countryCodeV2 }
        lineItems(first: 20) {
          nodes {
            title
            quantity
            variant { sku }
            product { handle }
          }
        }
      }
    }
  }
`;

interface RawOrders {
  orders: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: Array<{
      id: string;
      name: string;
      email: string | null;
      createdAt: string;
      displayFinancialStatus: string | null;
      displayFulfillmentStatus: string | null;
      currentTotalPriceSet: { shopMoney: { amount: string; currencyCode: string } };
      customer: { firstName: string | null; lastName: string | null } | null;
      shippingAddress: { city: string | null; countryCodeV2: string | null } | null;
      lineItems: {
        nodes: Array<{
          title: string;
          quantity: number;
          variant: { sku: string | null } | null;
          product: { handle: string | null } | null;
        }>;
      };
    }>;
  };
}

/**
 * Recent orders, newest first. `search` accepts Shopify's order query
 * syntax, e.g. `financial_status:paid` or `created_at:>2026-08-01`.
 */
export async function getOrders(
  first = 25,
  search?: string,
  after?: string
): Promise<{ orders: AdminOrder[]; hasNextPage: boolean; endCursor: string | null }> {
  const data = await adminFetch<RawOrders>(ORDERS_QUERY, {
    first,
    after,
    query: search,
  });

  if (!data) return { orders: [], hasNextPage: false, endCursor: null };

  const orders = data.orders.nodes.map((o): AdminOrder => ({
    id: o.id,
    name: o.name,
    email: o.email,
    createdAt: o.createdAt,
    financialStatus: o.displayFinancialStatus,
    fulfillmentStatus: o.displayFulfillmentStatus,
    total: o.currentTotalPriceSet.shopMoney,
    customerName:
      [o.customer?.firstName, o.customer?.lastName].filter(Boolean).join(" ") || null,
    city: o.shippingAddress?.city ?? null,
    country: o.shippingAddress?.countryCodeV2 ?? null,
    lines: o.lineItems.nodes.map((l) => ({
      title: l.title,
      quantity: l.quantity,
      sku: l.variant?.sku ?? null,
      handle: l.product?.handle ?? null,
    })),
  }));

  return {
    orders,
    hasNextPage: data.orders.pageInfo.hasNextPage,
    endCursor: data.orders.pageInfo.endCursor,
  };
}

/** How many copies of an edition have been ordered — the run, live. */
export async function getEditionOrderCount(editionHandle: string): Promise<number> {
  const { orders } = await getOrders(250, "financial_status:paid");
  return orders.reduce((total, order) => {
    const line = order.lines.find((l) => l.handle === editionHandle);
    return total + (line?.quantity ?? 0);
  }, 0);
}

/* ── Customers / marketing consent ──────────────────────────────────── */

const FIND_CUSTOMER = /* GraphQL */ `
  query FindCustomer($query: String!) {
    customers(first: 1, query: $query) {
      nodes {
        id
        defaultEmailAddress { emailAddress marketingState }
      }
    }
  }
`;

const CREATE_CUSTOMER = /* GraphQL */ `
  mutation PassPrintSubscriber($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer { id }
      userErrors { field message }
    }
  }
`;

const UPDATE_CONSENT = /* GraphQL */ `
  mutation PassPrintConsent($input: CustomerEmailMarketingConsentUpdateInput!) {
    customerEmailMarketingConsentUpdate(input: $input) {
      customer { id }
      userErrors { field message }
    }
  }
`;

/**
 * Push a newsletter subscriber into Shopify as a customer who has opted in
 * to email marketing, so the list lives beside the orders and can be used
 * by Shopify's campaign tools. Idempotent: an existing customer just has
 * their consent updated.
 *
 * Returns true when Shopify accepted the address.
 */
export async function upsertSubscriber(email: string, locale?: string): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  const clean = email.trim().toLowerCase();

  const found = await adminFetch<{
    customers: { nodes: Array<{ id: string }> };
  }>(FIND_CUSTOMER, { query: `email:${clean}` });

  const existingId = found?.customers.nodes[0]?.id;

  if (existingId) {
    const updated = await adminFetch<{
      customerEmailMarketingConsentUpdate: { userErrors: unknown[] } | null;
    }>(UPDATE_CONSENT, {
      input: {
        customerId: existingId,
        emailMarketingConsent: {
          marketingState: "SUBSCRIBED",
          marketingOptInLevel: "SINGLE_OPT_IN",
        },
      },
    });
    return Boolean(updated);
  }

  const created = await adminFetch<{
    customerCreate: { customer: { id: string } | null; userErrors: unknown[] };
  }>(CREATE_CUSTOMER, {
    input: {
      email: clean,
      locale,
      emailMarketingConsent: {
        marketingState: "SUBSCRIBED",
        marketingOptInLevel: "SINGLE_OPT_IN",
      },
      tags: ["newsletter", "passprint-site"],
    },
  });

  return Boolean(created?.customerCreate.customer?.id);
}
