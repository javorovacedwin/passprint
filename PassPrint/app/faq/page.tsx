import type { Metadata } from "next";
import { faqEntries, faqGroups } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions about the prints, the subscription, shipping and the artists — answered in facts.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      <header className="max-w-3xl">
        <p className="mono-label">Answered in facts</p>
        <h1 className="font-serif-display mt-5 text-[clamp(2.4rem,6vw,4rem)]">
          Questions
        </h1>
      </header>

      <div className="mt-14 max-w-3xl space-y-14">
        {faqGroups.map((group) => (
          <section key={group} id={group === "Shipping" ? "shipping" : undefined}>
            <h2 className="mono-label border-t border-hairline pt-3">{group}</h2>
            <div className="mt-4">
              {faqEntries
                .filter((f) => f.group === group)
                .map((entry) => (
                  <details
                    key={entry.question}
                    className="group border-b border-hairline-soft"
                  >
                    <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 font-serif-display text-xl marker:content-none [&::-webkit-details-marker]:hidden">
                      {entry.question}
                      <span
                        aria-hidden="true"
                        className="font-mono text-sm text-pencil transition-transform duration-[var(--duration-ui)] group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-[36rem] pb-6 text-[0.98rem] leading-relaxed text-ink-soft">
                      {entry.answer}
                    </p>
                  </details>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
