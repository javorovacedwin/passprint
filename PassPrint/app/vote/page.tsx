import type { Metadata } from "next";
import { VoteModule } from "@/components/voting/VoteModule";

export const metadata: Metadata = {
  title: "Vote for the Next Region",
  description:
    "Choose where PassPrint travels after Yugo: Italy, Greece, Portugal or France. The vote is binding.",
};

export default function VotePage() {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      <header className="max-w-3xl">
        <p className="mono-label">Collection 02 · vote closes with edition twelve</p>
        <h1 className="font-serif-display mt-5 text-[clamp(2.4rem,6vw,4rem)]">
          Where do we go next?
        </h1>
        <p className="mt-6 max-w-[var(--container-measure)] text-[1.05rem] leading-relaxed text-ink-soft">
          Four regions are on the table — the four where we already have
          artists and readers, which is the only honest way to promise twelve
          good months. One vote per member. The result is binding, not
          advisory, and is announced with the final edition of Collection 01.
        </p>
      </header>

      <div className="mt-14 max-w-4xl">
        <VoteModule />
      </div>
    </div>
  );
}
