"use client";

import { useState, useTransition } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { contactAction } from "@/app/actions";

/*
  The message is stored server-side (lib/db/contact.ts) so nothing is lost
  if an email notification ever fails. Validation runs on the client for a
  fast response and again in the server action, which is the one that counts.
*/

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  form?: string;
}

export function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();
  const { locale } = useLocale();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const next: FormErrors = {};
    if (!name.trim()) {
      next.name = "Add your name, so we know who we are writing back to.";
    }
    if (!email.includes("@")) {
      next.email = "This address is missing an @ — check it and the reply will arrive.";
    }
    if (message.trim().length < 10) {
      next.message = "Tell us a little more — one or two sentences is enough.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    startTransition(async () => {
      const res = await contactAction(name, email, message, locale);
      if (res.status === "sent") {
        setSent(true);
      } else if (res.status === "unconfigured") {
        setErrors({
          form: "Our message desk isn't open yet — please write to post@passprint.eu in the meantime.",
        });
      } else if (res.status === "invalid") {
        setErrors({ form: "Please check the fields above and try again." });
      } else {
        setErrors({ form: "Something went wrong at our end. Please try again in a moment." });
      }
    });
  };

  if (sent) {
    return (
      <p className="border border-hairline bg-paper-deep/40 p-6 font-mono text-[0.84rem] text-ink" role="status">
        Received. We answer within two working days — a person, not a system.
      </p>
    );
  }

  const fieldClass =
    "w-full border border-hairline bg-paper px-3 py-2.5 text-[0.95rem] text-ink placeholder:text-pencil focus:border-ink focus:outline-none";

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl space-y-6">
      <div>
        <label htmlFor="contact-name" className="mono-label mb-2 block">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-2 text-[0.85rem] text-error">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-email" className="mono-label mb-2 block">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-2 text-[0.85rem] text-error">
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-message" className="mono-label mb-2 block">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          className={fieldClass}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-2 text-[0.85rem] text-error">
            {errors.message}
          </p>
        )}
      </div>
      {errors.form && (
        <p role="status" className="text-[0.9rem] text-error">
          {errors.form}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="border border-ink px-6 py-3 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink shadow-[inset_0_0_0_2px_var(--color-paper),inset_0_0_0_2.6px_var(--color-ink)] transition-colors duration-[var(--duration-ui)] enabled:hover:bg-ink enabled:hover:text-paper disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
