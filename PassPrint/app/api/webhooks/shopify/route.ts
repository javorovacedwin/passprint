import crypto from "node:crypto";
import { dbFetch, isDbConfigured } from "@/lib/db/client";

/*
  ────────────────────────────────────────────────────────────────────────
  SHOPIFY WEBHOOK RECEIVER
  ────────────────────────────────────────────────────────────────────────

  Shopify POSTs here whenever an order is created, paid, cancelled or
  fulfilled, and we mirror it into the `orders` table. Shopify stays the
  source of truth; the mirror exists so the site can count an edition's run
  and show fulfilment state without calling the Admin API on every request.

  Endpoint:  https://passprint.eu/api/webhooks/shopify

  Register the topics in the Shopify Dev Dashboard app (or admin → Settings
  → Notifications → Webhooks), all with format JSON:

    orders/create, orders/paid, orders/cancelled, orders/fulfilled

  Signatures are verified with the app's **Client Secret**
  (SHOPIFY_CLIENT_SECRET) — the same credential used for the Admin API
  client_credentials grant. SHOPIFY_WEBHOOK_SECRET is still honoured for
  installations that were given a separate signing secret.

  Every request is verified with an HMAC over the RAW body — which is why
  this handler reads text() and never json() before checking the signature.
*/

export const runtime = "nodejs";
// A webhook must never be cached or statically optimised.
export const dynamic = "force-dynamic";

interface ShopifyLineItem {
  sku: string | null;
  title: string;
  quantity: number;
  product_id: number | null;
}

interface ShopifyOrder {
  id: number;
  order_number: number;
  email: string | null;
  current_total_price?: string;
  total_price?: string;
  currency: string;
  financial_status: string | null;
  fulfillment_status: string | null;
  line_items?: ShopifyLineItem[];
}

/** Timing-safe HMAC check against the raw request body. */
function verify(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  const a = Buffer.from(digest);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Pull PassPrint edition codes (YU-01 …) out of the line items. */
function editionCodes(order: ShopifyOrder): string[] {
  const codes = (order.line_items ?? [])
    .map((l) => l.sku ?? l.title)
    .map((s) => s?.match(/\b([A-Z]{2,4}-\d{2})\b/)?.[1])
    .filter((c): c is string => Boolean(c));
  return [...new Set(codes)];
}

/**
 * The signing secret: the app's Client Secret, or an explicit webhook secret
 * where one was issued separately.
 */
function signingSecret(): string | undefined {
  return process.env.SHOPIFY_CLIENT_SECRET || process.env.SHOPIFY_WEBHOOK_SECRET;
}

export async function POST(request: Request) {
  const secret = signingSecret();
  if (!secret) {
    console.warn("[webhook] no SHOPIFY_CLIENT_SECRET configured");
    return new Response("Webhook not configured", { status: 503 });
  }

  // Read the raw body first — the signature covers these exact bytes.
  const raw = await request.text();
  const signature = request.headers.get("x-shopify-hmac-sha256");

  if (!verify(raw, signature, secret)) {
    // Do not reveal why it failed.
    return new Response("Unauthorized", { status: 401 });
  }

  const topic = request.headers.get("x-shopify-topic") ?? "unknown";

  let order: ShopifyOrder;
  try {
    order = JSON.parse(raw) as ShopifyOrder;
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  if (!isDbConfigured()) {
    // Signature was valid, so acknowledge — retrying would not help.
    console.warn(`[webhook] ${topic} accepted but no database configured`);
    return new Response("OK (no store)", { status: 200 });
  }

  const row = {
    id: order.id,
    order_number: String(order.order_number ?? ""),
    email: order.email?.toLowerCase() ?? null,
    total: Number(order.current_total_price ?? order.total_price ?? 0),
    currency: order.currency,
    financial_status: order.financial_status,
    fulfillment_status: order.fulfillment_status,
    edition_codes: editionCodes(order),
    raw: order,
    updated_at: new Date().toISOString(),
  };

  // Upsert: the same order arrives again on paid/fulfilled/cancelled.
  const saved = await dbFetch({
    table: "orders",
    method: "POST",
    query: "?on_conflict=id",
    body: [row],
    prefer: "resolution=merge-duplicates",
  });

  if (saved === null) {
    // Returning 500 makes Shopify retry, which is what we want.
    return new Response("Storage failed", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}

/** A GET is useful for confirming the route is deployed. */
export async function GET() {
  return Response.json({
    endpoint: "shopify-webhook",
    configured: Boolean(signingSecret()),
    storage: isDbConfigured(),
  });
}
