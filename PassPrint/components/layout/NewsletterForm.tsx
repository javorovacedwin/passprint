"use client";

import { useState, useTransition } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { subscribeAction, type NewsletterResult } from "@/app/actions";

/**
 * Colophon newsletter field. Saves the address to the database and mirrors
 * it into Shopify as a customer with email-marketing consent, so the list
 * sits beside the orders (see app/actions.ts → subscribeAction).
 */
export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [result, setResult] = useState<NewsletterResult | null>(null);
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();
  const { t, locale } = useLocale();

  const done = result?.status === "subscribed" || result?.status === "already";

  if (done) {
    return (
      <p className={`font-mono text-[0.8rem] ${dark ? "text-paper/85" : "text-pencil"}`} role="status">
        {result?.status === "already"
          ? "You are already on the list."
          : t.footer.newsletterDone}
      </p>
    );
  }

  const problem: Partial<Record<NewsletterResult["status"], string>> = {
    "invalid-email": "That address doesn't look right.",
    unconfigured: "The list opens with the first edition.",
    error: "Something went wrong. Try again in a moment.",
  };

  return (
    <div>
      <form
        className={`flex max-w-sm items-stretch border-2 ${dark ? "border-paper/60" : "border-ink"}`}
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(async () => {
            setResult(await subscribeAction(email, locale, "footer"));
          });
        }}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          {t.footer.newsletter}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@address.eu"
          aria-invalid={result?.status === "invalid-email"}
          className={`w-full bg-transparent px-3 py-2 font-mono text-[0.8rem] focus:outline-none ${
            dark ? "text-paper placeholder:text-paper/45" : "text-ink placeholder:text-pencil"
          }`}
        />
        <button
          type="submit"
          disabled={pending}
          className={`px-4 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-[var(--duration-ui)] disabled:opacity-60 ${
            dark
              ? "border-l-2 border-paper/60 bg-vermilion text-paper hover:bg-vermilion-deep"
              : "border-l-2 border-ink bg-ink text-paper hover:bg-vermilion"
          }`}
        >
          {pending ? "…" : t.footer.newsletterAction}
        </button>
      </form>

      {result && problem[result.status] && (
        <p
          role="status"
          className={`mt-2 font-mono text-[0.72rem] ${dark ? "text-paper/70" : "text-error"}`}
        >
          {problem[result.status]}
        </p>
      )}
    </div>
  );
}
