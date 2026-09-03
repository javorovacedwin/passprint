import { dbFetch, isDbConfigured } from "./client";

/*
  Contact messages. Stored so nothing is lost if an email notification
  fails; the `handled` flag lets you work through them like an inbox.
*/

export type ContactOutcome =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "error" };

export interface ContactInput {
  name: string;
  email: string;
  message: string;
  locale?: string;
}

export async function saveMessage({
  name,
  email,
  message,
  locale,
}: ContactInput): Promise<ContactOutcome> {
  if (!isDbConfigured()) return { ok: false, reason: "unconfigured" };

  const inserted = await dbFetch<unknown[]>({
    table: "contact_messages",
    method: "POST",
    body: [
      {
        name: name.trim().slice(0, 200),
        email: email.trim().toLowerCase().slice(0, 320),
        message: message.trim().slice(0, 5000),
        locale,
      },
    ],
  });

  return inserted === null ? { ok: false, reason: "error" } : { ok: true };
}
