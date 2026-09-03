/*
  ────────────────────────────────────────────────────────────────────────
  SHOPIFY ADMIN ACCESS TOKENS — client_credentials grant
  ────────────────────────────────────────────────────────────────────────

  Shopify no longer issues permanent admin-created custom app tokens. A Dev
  Dashboard app authenticates with its Client ID and Client Secret and
  exchanges them for an Admin API access token that expires after ~24 hours,
  so the token has to be minted, cached and refreshed by the server.

  Configure:

    SHOPIFY_SHOP_DOMAIN=x1t200-0i.myshopify.com
    SHOPIFY_CLIENT_ID=...
    SHOPIFY_CLIENT_SECRET=...

  The secret never leaves the server, and the minted token is held only in
  module memory — never written to a cookie, a database or the client.

  On a serverless host each instance keeps its own cache, which is fine: the
  token is cheap to mint and a cold start simply mints a fresh one.
*/

interface CachedToken {
  token: string;
  /** Epoch ms after which the token must not be used. */
  expiresAt: number;
}

/** Refresh this long before actual expiry, so a request never races it. */
const REFRESH_MARGIN_MS = 5 * 60 * 1000; // 5 minutes

let cached: CachedToken | null = null;
/** In-flight mint, so concurrent callers share one request. */
let inFlight: Promise<string | null> | null = null;

export function shopDomain(): string | undefined {
  // SHOPIFY_STORE_DOMAIN is the previous name, still honoured so an existing
  // deployment keeps working mid-migration.
  return process.env.SHOPIFY_SHOP_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
}

export function isAdminConfigured(): boolean {
  return Boolean(
    shopDomain() && process.env.SHOPIFY_CLIENT_ID && process.env.SHOPIFY_CLIENT_SECRET
  );
}

async function mintToken(): Promise<string | null> {
  const domain = shopDomain();
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  if (!domain || !clientId || !clientSecret) return null;

  try {
    const res = await fetch(`https://${domain}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      // Never log the body — it may echo credentials.
      console.warn(`[shopify-admin] token mint failed: ${res.status}`);
      return null;
    }

    const body = (await res.json()) as {
      access_token?: string;
      expires_in?: number;
    };

    if (!body.access_token) {
      console.warn("[shopify-admin] token response had no access_token");
      return null;
    }

    // Shopify returns ~86400s; fall back to 1h if the field is ever absent.
    const lifetimeMs = (body.expires_in ?? 3600) * 1000;
    cached = {
      token: body.access_token,
      expiresAt: Date.now() + lifetimeMs,
    };
    return cached.token;
  } catch (error) {
    console.warn("[shopify-admin] token request failed", error);
    return null;
  }
}

/**
 * A valid Admin API token, minting or refreshing as needed. Concurrent
 * callers during a refresh share the same in-flight request.
 */
export async function getAdminToken(): Promise<string | null> {
  if (cached && Date.now() < cached.expiresAt - REFRESH_MARGIN_MS) {
    return cached.token;
  }

  if (inFlight) return inFlight;

  inFlight = mintToken().finally(() => {
    inFlight = null;
  });

  return inFlight;
}

/**
 * Drop the cached token. Called when Shopify rejects it with a 401 so the
 * next call mints a fresh one — covers a token revoked before its expiry.
 */
export function invalidateAdminToken(): void {
  cached = null;
}
