/*
  ────────────────────────────────────────────────────────────────────────
  DATABASE — where votes, subscribers and messages are stored.
  ────────────────────────────────────────────────────────────────────────

  Supabase (Postgres) reached over its REST API with plain fetch, so the
  project gains no dependency and this file mirrors lib/shopify/client.ts.

  Configure in .env.local / Vercel:

    SUPABASE_URL=https://<project>.supabase.co
    SUPABASE_SECRET_KEY=sb_secret_...

  The secret key is the server-side key from Supabase → Project Settings →
  API keys. It bypasses row-level security and must NEVER be given a
  NEXT_PUBLIC_ prefix — it is read only in server actions and route handlers.

  Run lib/db/schema.sql in the Supabase SQL editor once to create the tables.
*/

/** The legacy service_role JWT is still honoured during migration. */
function secretKey(): string | undefined {
  return process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && secretKey());
}

export interface DbRequest {
  /** Table name, e.g. "votes". */
  table: string;
  method?: "GET" | "POST" | "PATCH";
  /** Appended to the URL, e.g. "?select=region_id". */
  query?: string;
  body?: unknown;
  /** Extra PostgREST preference headers, e.g. "resolution=merge-duplicates". */
  prefer?: string;
}

/**
 * One request against PostgREST. Returns null on any failure — missing
 * config, network error or a non-2xx response — so callers can decide how to
 * degrade rather than throwing into a form submission.
 */
export async function dbFetch<T>({
  table,
  method = "GET",
  query = "",
  body,
  prefer,
}: DbRequest): Promise<T | null> {
  const url = process.env.SUPABASE_URL;
  const key = secretKey();
  if (!url || !key) return null;

  const preferHeader = [prefer, "return=representation"].filter(Boolean).join(",");

  try {
    const res = await fetch(`${url}/rest/v1/${table}${query}`, {
      method,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: preferHeader,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });

    if (!res.ok) {
      // Never log the payload — it can contain an email address.
      console.warn(`[db] ${table} ${method} → ${res.status}`);
      return null;
    }

    // PATCH/POST with no rows returned still succeed with an empty body.
    const text = await res.text();
    return (text ? JSON.parse(text) : []) as T;
  } catch (error) {
    console.warn("[db] request failed", error);
    return null;
  }
}
