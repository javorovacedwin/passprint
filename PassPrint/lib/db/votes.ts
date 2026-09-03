import { dbFetch, isDbConfigured } from "./client";

/*
  Votes for the next collection. One vote per email address, enforced by a
  unique index in Postgres rather than by the interface — see schema.sql.
*/

export interface VoteTallyRow {
  region_id: string;
  votes: number;
}

export type VoteOutcome =
  | { ok: true; tally: VoteTallyRow[] }
  | { ok: false; reason: "unconfigured" | "duplicate" | "error" };

/** Record one vote. A second vote from the same address is rejected. */
export async function castVote(
  regionId: string,
  email: string,
  locale?: string
): Promise<VoteOutcome> {
  if (!isDbConfigured()) return { ok: false, reason: "unconfigured" };

  const inserted = await dbFetch<unknown[]>({
    table: "votes",
    method: "POST",
    body: [{ region_id: regionId, email: email.trim().toLowerCase(), locale }],
  });

  if (inserted === null) {
    // The most likely cause of a rejected insert is the unique-email index.
    const existing = await hasVoted(email);
    return { ok: false, reason: existing ? "duplicate" : "error" };
  }

  const tally = await getTally();
  return { ok: true, tally };
}

/** Whether this address has already voted. */
export async function hasVoted(email: string): Promise<boolean> {
  const rows = await dbFetch<{ id: string }[]>({
    table: "votes",
    query: `?select=id&email=eq.${encodeURIComponent(email.trim().toLowerCase())}&limit=1`,
  });
  return Array.isArray(rows) && rows.length > 0;
}

/** Current standings, safe to show publicly — no addresses are exposed. */
export async function getTally(): Promise<VoteTallyRow[]> {
  const rows = await dbFetch<VoteTallyRow[]>({
    table: "vote_tally",
    query: "?select=region_id,votes",
  });
  return rows ?? [];
}
