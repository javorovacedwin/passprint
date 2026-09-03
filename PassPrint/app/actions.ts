"use server";

import { castVote, getTally, hasVoted, type VoteTallyRow } from "@/lib/db/votes";
import { subscribe, markSyncedToShopify } from "@/lib/db/newsletter";
import { saveMessage } from "@/lib/db/contact";
import { upsertSubscriber } from "@/lib/shopify/admin";

/*
  Server actions for the site's own data: votes, newsletter, contact.

  Every secret (the Supabase service key, the Shopify Admin token) is read on
  the server inside these functions and never reaches the browser. Each
  action returns a small, typed result so the interface can tell the
  difference between "saved", "we already have you" and "not wired up yet",
  and say something honest in each case.
*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim()) && value.trim().length <= 320;
}

/* ── Votes ──────────────────────────────────────────────────────────── */

export type VoteResult =
  | { status: "recorded"; tally: VoteTallyRow[] }
  | { status: "duplicate" }
  | { status: "invalid-email" }
  | { status: "unconfigured" }
  | { status: "error" };

export async function submitVoteAction(
  regionId: string,
  email: string,
  locale?: string
): Promise<VoteResult> {
  if (!validEmail(email)) return { status: "invalid-email" };
  if (!regionId) return { status: "error" };

  const outcome = await castVote(regionId, email, locale);

  if (outcome.ok) return { status: "recorded", tally: outcome.tally };
  if (outcome.reason === "duplicate") return { status: "duplicate" };
  if (outcome.reason === "unconfigured") return { status: "unconfigured" };
  return { status: "error" };
}

/** Public standings for the vote page. */
export async function getVoteTallyAction(): Promise<VoteTallyRow[]> {
  return getTally();
}

export async function hasVotedAction(email: string): Promise<boolean> {
  if (!validEmail(email)) return false;
  return hasVoted(email);
}

/* ── Newsletter ─────────────────────────────────────────────────────── */

export type NewsletterResult =
  | { status: "subscribed" }
  | { status: "already" }
  | { status: "invalid-email" }
  | { status: "unconfigured" }
  | { status: "error" };

export async function subscribeAction(
  email: string,
  locale?: string,
  source = "footer"
): Promise<NewsletterResult> {
  if (!validEmail(email)) return { status: "invalid-email" };

  const outcome = await subscribe(email, locale, source);
  if (!outcome.ok) {
    return outcome.reason === "unconfigured"
      ? { status: "unconfigured" }
      : { status: "error" };
  }

  // Mirror the address into Shopify as a customer with marketing consent,
  // so the list lives beside the orders. A failure here is not fatal — the
  // subscriber is already saved, and `synced_to_shopify` stays false so a
  // retry can pick it up.
  const pushed = await upsertSubscriber(email, locale);
  if (pushed) await markSyncedToShopify(email);

  return { status: outcome.alreadySubscribed ? "already" : "subscribed" };
}

/* ── Contact ────────────────────────────────────────────────────────── */

export type ContactResult =
  | { status: "sent" }
  | { status: "invalid" }
  | { status: "unconfigured" }
  | { status: "error" };

export async function contactAction(
  name: string,
  email: string,
  message: string,
  locale?: string
): Promise<ContactResult> {
  if (!name.trim() || !validEmail(email) || message.trim().length < 10) {
    return { status: "invalid" };
  }

  const outcome = await saveMessage({ name, email, message, locale });
  if (outcome.ok) return { status: "sent" };
  return outcome.reason === "unconfigured"
    ? { status: "unconfigured" }
    : { status: "error" };
}
