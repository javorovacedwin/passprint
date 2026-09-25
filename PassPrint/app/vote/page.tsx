import type { Metadata } from "next";
import { VoteModule } from "@/components/voting/VoteModule";

export const metadata: Metadata = {
  title: "Vote for Next Month's Country",
  description:
    "Choose the country PassPrint goes to next month: Italy, Japan, Portugal, Greece, Iceland or Morocco. The vote is binding.",
};

export default function VotePage() {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      <header className="max-w-3xl">
        <p className="mono-label">Next month · one country, one envelope</p>
        <h1 className="font-serif-display mt-5 text-[clamp(2.4rem,6vw,4rem)]">
          Where do we go next?
        </h1>
        <p className="mt-6 max-w-[var(--container-measure)] text-[1.05rem] leading-relaxed text-ink-soft">
          PassPrint goes to one country a month, and in time to every country
          in the world. You choose which one comes next — six are on the
          table. One vote per member. The result is binding, not advisory, and
          is announced with this month&apos;s edition.
        </p>
      </header>

      <div className="mt-14 max-w-4xl">
        <VoteModule />
      </div>
    </div>
  );
}
