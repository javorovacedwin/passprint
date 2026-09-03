import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { production } from "@/content/collections";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The monthly cycle of PassPrint: order before the 20th, printed and numbered around the 24th, posted around the 28th. Facts about paper, numbering and cancelling.",
};

const steps = [
  {
    date: "Before the 20th",
    title: "You order",
    body: "Subscribe or buy the current edition on its own. Whatever is ordered by the 20th defines the print run.",
  },
  {
    date: "The 20th",
    title: "The edition closes",
    body: "We stop taking orders for the month. The edition size is now fixed — members plus a small overrun for replacements.",
  },
  {
    date: "Around the 24th",
    title: "We print and number",
    body: "Both prints on premium heavyweight uncoated stock — the same quality every month and every collection. Each copy is numbered and dated by hand on the back. Nothing is reprinted, ever.",
  },
  {
    date: "Around the 28th",
    title: "We post",
    body: "Flat, stiffened with card, in a stamped envelope that fits through a letterbox. Ordinary post, no tracking — that is what keeps shipping included.",
  },
  {
    date: "2–5 working days",
    title: "It arrives",
    body: "Belgium and the Netherlands within the week; the rest of Europe up to ten days. Damaged in transit? One photo, and a replacement ships from the overrun.",
  },
];

const facts = [
  { label: "Main print", value: `${production.mainFormat} · ${production.mainDimensions} · ${production.paper}` },
  { label: "Companion print", value: `${production.companionFormat} · ${production.companionDimensions} · same stock` },
  { label: "Finish", value: `${production.finish} · identical for every collection` },
  { label: "Story card", value: "10 × 15 cm · two-sided · sources credited" },
  { label: "Numbering", value: "By hand, on the back · never reprinted" },
  { label: "Shipping", value: "Included in BE/NL/EU · letterbox format" },
  { label: "Cancelling", value: "One click before the 20th · pause twice a year" },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      <header className="max-w-3xl">
        <p className="mono-label">Procedure · one cycle per month</p>
        <h1 className="font-serif-display mt-5 text-[clamp(2.4rem,6vw,4rem)]">
          How a month works
        </h1>
        <p className="mt-6 max-w-[var(--container-measure)] text-[1.05rem] leading-relaxed text-ink-soft">
          PassPrint runs on one calendar rhythm, every month the same. No
          surprises, no waiting lists — just dates.
        </p>
      </header>

      <ol className="mt-16 max-w-3xl">
        {steps.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-hairline py-7 sm:grid-cols-[140px_auto_1fr]">
            <span className="mono-label hidden pt-1 sm:block">{step.date}</span>
            <span className="font-mono text-[0.8rem] font-medium text-accent-deep pt-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <span className="mono-label sm:hidden">{step.date}</span>
              <h2 className="font-serif-display text-2xl">{step.title}</h2>
              <p className="mt-2 max-w-[34rem] text-[0.98rem] leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-20 max-w-3xl">
        <SectionHeader index="Spec." label="Facts, not adjectives" title="The specifications" />
        <dl className="mt-8 divide-y divide-hairline-soft border-y border-hairline">
          {facts.map((f) => (
            <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-[200px_1fr]">
              <dt className="mono-label">{f.label}</dt>
              <dd className="font-mono text-[0.84rem] text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-14 flex flex-wrap gap-6">
        <ButtonLink href="/subscribe" variant="ink">
          Join the club
        </ButtonLink>
        <ButtonLink href="/faq" variant="text">
          Questions answered in the FAQ →
        </ButtonLink>
      </div>
    </div>
  );
}
