import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqEntries } from "@/content/faq";

/** The four questions asked most, folded; the rest live on /faq. */
const picks = [
  "What exactly arrives each month?",
  "Can I cancel or pause?",
  "When does the envelope ship?",
  "What if it arrives damaged?",
];

export function HomeFaq() {
  const entries = faqEntries.filter((e) => picks.includes(e.question));

  return (
    <section className="mx-auto max-w-[var(--container-page)] px-gutter py-24">
      <SectionHeader index="§ 06" label="Questions" title="Good to know" />

      <div className="mt-10 max-w-3xl divide-y divide-hairline border-y border-ink">
        {entries.map((entry) => (
          <details key={entry.question} className="group/faq">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <span className="font-serif-display text-xl">{entry.question}</span>
              <span
                aria-hidden="true"
                className="font-mono text-lg text-vermilion transition-transform duration-[var(--duration-ui)] group-open/faq:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-[var(--container-measure)] pb-6 leading-relaxed text-ink-soft">
              {entry.answer}
            </p>
          </details>
        ))}
      </div>

      <Link
        href="/faq"
        className="mt-8 inline-block font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink underline decoration-vermilion decoration-1 underline-offset-[6px] hover:text-vermilion-deep"
      >
        All questions →
      </Link>
    </section>
  );
}
