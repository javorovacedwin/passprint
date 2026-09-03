"use client";

import { useEffect, useState, useTransition } from "react";
import { motion } from "motion/react";
import { StampMark } from "@/components/ui/StampMark";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { voteRegions } from "@/content/regions";
import {
  getVoteTallyAction,
  submitVoteAction,
  type VoteResult,
} from "@/app/actions";

/*
  The vote is now recorded server-side: one vote per email address, enforced
  by a unique index in Postgres (lib/db/schema.sql). localStorage is kept
  only to remember, on this browser, that you have already voted — it is a
  convenience, not the record.
*/

const STORAGE_KEY = "passprint-vote-region";

interface Tally {
  [regionId: string]: number;
}

export function VoteModule() {
  const [selected, setSelected] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<VoteResult | null>(null);
  const [tally, setTally] = useState<Tally>({});
  const [pending, startTransition] = useTransition();
  const { locale } = useLocale();

  const confirmed = result?.status === "recorded" || result?.status === "duplicate";

  // Remember a previous vote on this browser, and load the standings.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSelected(stored);
      setResult({ status: "duplicate" });
    }
    getVoteTallyAction().then((rows) => {
      const next: Tally = {};
      for (const row of rows) next[row.region_id] = row.votes;
      setTally(next);
    });
  }, []);

  const totalVotes = Object.values(tally).reduce((a, b) => a + b, 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    startTransition(async () => {
      const res = await submitVoteAction(selected, email, locale);
      setResult(res);
      if (res.status === "recorded") {
        window.localStorage.setItem(STORAGE_KEY, selected);
        const next: Tally = {};
        for (const row of res.tally) next[row.region_id] = row.votes;
        setTally(next);
      }
    });
  };

  const message: Record<VoteResult["status"], string> = {
    recorded: "Your vote has been entered into the next route.",
    duplicate: "You have already voted — one vote per address. Thank you.",
    "invalid-email": "That address doesn't look right. Check it and try again.",
    unconfigured:
      "Voting opens with the first edition. Nothing was recorded just now.",
    error: "Something went wrong at our end. Please try again in a moment.",
  };

  const isProblem =
    result?.status === "invalid-email" ||
    result?.status === "error" ||
    result?.status === "unconfigured";

  return (
    <form onSubmit={submit}>
      <fieldset disabled={confirmed || pending}>
        <legend className="sr-only">Choose the region for Collection 02</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          {voteRegions.map((region) => {
            const isSelected = selected === region.id;
            const count = tally[region.id] ?? 0;
            const share = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

            return (
              <label
                key={region.id}
                className={`relative block cursor-pointer p-5 transition-colors duration-[var(--duration-ui)] ${
                  isSelected
                    ? "print-block"
                    : "border border-ink/30 bg-paper-deep/40 hover:border-ink"
                } ${confirmed && !isSelected ? "opacity-45" : ""}`}
              >
                <input
                  type="radio"
                  name="next-region"
                  value={region.id}
                  checked={isSelected}
                  onChange={() => setSelected(region.id)}
                  className="sr-only"
                />
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-serif-display text-2xl">{region.name}</span>
                  <span className="mono-label">{region.coordinates}</span>
                </span>
                <span className="mt-3 block font-mono text-[0.72rem] uppercase tracking-[0.06em] text-pencil">
                  e.g. {region.samplePlaces.join(" · ")}
                </span>
                <span className="mt-3 block text-[0.95rem] leading-relaxed text-ink-soft">
                  {region.reason}
                </span>

                {/* standings, shown as a ruled bar once votes exist */}
                {totalVotes > 0 && (
                  <span className="mt-4 block">
                    <span className="flex items-baseline justify-between font-mono text-[0.68rem] uppercase tracking-[0.06em] text-pencil">
                      <span>{count} {count === 1 ? "vote" : "votes"}</span>
                      <span>{share}%</span>
                    </span>
                    <span className="mt-1 block h-1.5 w-full border border-ink/25">
                      <span
                        className="block h-full bg-rust"
                        style={{ width: `${share}%` }}
                      />
                    </span>
                  </span>
                )}

                {isSelected && (
                  <motion.span
                    layoutId="vote-stamp"
                    transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
                    className="absolute -right-3 -top-4"
                  >
                    <StampMark
                      legend={region.name.toUpperCase()}
                      size={72}
                      className={confirmed ? "" : "stamp-in"}
                    />
                  </motion.span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      {!confirmed && (
        <div className="mt-8 flex flex-wrap items-end gap-5">
          <div className="min-w-[16rem] flex-1 sm:max-w-xs">
            <label htmlFor="vote-email" className="mono-label mb-2 block">
              Your email — one vote per address
            </label>
            <input
              id="vote-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@address.eu"
              aria-invalid={result?.status === "invalid-email"}
              className="w-full border border-ink bg-paper px-3 py-2.5 font-mono text-[0.82rem] text-ink placeholder:text-pencil focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!selected || pending}
            className="border border-cobalt bg-cobalt px-6 py-3 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-paper shadow-[inset_0_0_0_2px_var(--color-cobalt),inset_0_0_0_2.6px_var(--color-paper)] transition-colors duration-[var(--duration-ui)] enabled:hover:bg-cobalt-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending ? "Entering…" : "Enter my vote"}
          </button>
        </div>
      )}

      {result && (
        <p
          role="status"
          className={`mt-6 font-mono text-[0.82rem] uppercase tracking-[0.08em] ${
            isProblem ? "text-error" : "text-rust"
          }`}
        >
          {message[result.status]}
        </p>
      )}

      {!result && (
        <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.06em] text-pencil">
          The result is binding, not advisory.
          {totalVotes > 0 ? ` ${totalVotes} votes cast so far.` : ""}
        </p>
      )}
    </form>
  );
}
