import { dbFetch, isDbConfigured } from "./client";

/*
  Newsletter subscribers.

  Stored here AND pushed to Shopify as a customer with email-marketing
  consent (see lib/shopify/admin.ts), so the list lives in the same place as
  the orders and can be used by Shopify's own campaign tools. Supabase keeps
  the authoritative record and the sync flag; Shopify is the mailing tool.
*/

export type SubscribeOutcome =
  | { ok: true; alreadySubscribed: boolean }
  | { ok: false; reason: "unconfigured" | "error" };

export async function subscribe(
  email: string,
  locale?: string,
  source = "footer"
): Promise<SubscribeOutcome> {
  if (!isDbConfigured()) return { ok: false, reason: "unconfigured" };

  const clean = email.trim().toLowerCase();
  const existing = await dbFetch<{ id: string }[]>({
    table: "newsletter_subscribers",
    query: `?select=id&email=eq.${encodeURIComponent(clean)}&limit=1`,
  });
  const alreadySubscribed = Array.isArray(existing) && existing.length > 0;

  if (alreadySubscribed) {
    // Re-subscribing clears any previous opt-out.
    await dbFetch({
      table: "newsletter_subscribers",
      method: "PATCH",
      query: `?email=eq.${encodeURIComponent(clean)}`,
      body: { unsubscribed_at: null },
    });
    return { ok: true, alreadySubscribed: true };
  }

  const inserted = await dbFetch<unknown[]>({
    table: "newsletter_subscribers",
    method: "POST",
    body: [{ email: clean, locale, source }],
  });

  if (inserted === null) return { ok: false, reason: "error" };
  return { ok: true, alreadySubscribed: false };
}

/** Mark an address as pushed to Shopify, so a retry job can find the rest. */
export async function markSyncedToShopify(email: string): Promise<void> {
  await dbFetch({
    table: "newsletter_subscribers",
    method: "PATCH",
    query: `?email=eq.${encodeURIComponent(email.trim().toLowerCase())}`,
    body: { synced_to_shopify: true },
  });
}
