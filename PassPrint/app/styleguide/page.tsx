import type { Metadata } from "next";
import { ArtworkPlaceholder } from "@/components/artwork/ArtworkPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StampMark } from "@/components/ui/StampMark";
import { SealLogo } from "@/components/brand/SealLogo";
import { CartoucheLogo } from "@/components/brand/CartoucheLogo";

export const metadata: Metadata = {
  title: "Style Guide (internal)",
  robots: { index: false },
};

const tokens = [
  { name: "--color-paper", value: "#F6EFDF", role: "Warm paper background" },
  { name: "--color-ink", value: "#1A1714", role: "Text, borders, dark fields" },
  { name: "--color-pencil", value: "#6F675C", role: "Labels, captions" },
  { name: "--color-vermilion", value: "#E03D1C", role: "Primary press ink — stamps, CTAs" },
  { name: "--color-cobalt", value: "#2547C5", role: "Press ink — contents, vote" },
  { name: "--color-marigold", value: "#F0A51B", role: "Press ink — sunbursts, archive" },
  { name: "--color-verde", value: "#157A5B", role: "Press ink — the year, memberships" },
  { name: "--color-rosa", value: "#E56A8F", role: "Press ink — the artist" },
  { name: "--color-kraft", value: "#D9C39A", role: "Envelope stock" },
];

/**
 * Internal reference page — not linked from navigation, not indexed.
 */
export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      <p className="mono-label">Internal — design system reference</p>
      <h1 className="font-serif-display mt-4 text-4xl">PassPrint style guide</h1>

      <SectionHeader index="B.01" label="Identity" title="The marks" className="mt-16" />
      <div className="mt-8 grid gap-10 border border-ink p-8 md:grid-cols-[240px_1fr] md:items-center">
        <div>
          <SealLogo className="w-full max-w-[220px]" uid="sg-seal" />
          <p className="mono-label mt-3">The seal — primary mark</p>
        </div>
        <div>
          <CartoucheLogo className="w-full" uid="sg-cart" />
          <p className="mono-label mt-3">The cartouche — ceremonial mark</p>
        </div>
      </div>

      <SectionHeader index="T.01" label="Tokens" title="Colour" className="mt-16" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((t) => (
          <li key={t.name} className="flex items-center gap-4 border border-hairline p-3">
            <span className="h-12 w-12 shrink-0 border border-hairline-soft" style={{ background: t.value }} />
            <span className="font-mono text-[0.72rem] leading-relaxed">
              <span className="block text-ink">{t.name}</span>
              <span className="block text-pencil">{t.value} · {t.role}</span>
            </span>
          </li>
        ))}
      </ul>

      <SectionHeader index="T.02" label="Type" title="Typography" className="mt-16" />
      <div className="mt-8 space-y-6 border border-hairline p-7">
        <p className="font-serif-display text-4xl">Newsreader — editorial voice</p>
        <p className="max-w-xl text-[1rem] text-ink-soft">
          IBM Plex Sans carries interface and running text. Calm, neutral,
          fully readable at small sizes.
        </p>
        <p className="font-mono text-[0.82rem] text-pencil">
          IBM PLEX MONO — AT-01 · BOSNIA AND HERZEGOVINA · 43.3438 N, 17.8078 E · EDITION OF 180
        </p>
      </div>

      <SectionHeader index="T.03" label="Components" title="Marks and controls" className="mt-16" />
      <div className="print-block mt-8 flex flex-wrap items-end gap-10 p-7">
        <StampMark legend="STYLE GUIDE" size={110} />
        <div className="flex flex-col items-start gap-4">
          <ButtonLink href="#" variant="vermilion">Vermilion button</ButtonLink>
          <ButtonLink href="#" variant="cobalt">Cobalt button</ButtonLink>
          <ButtonLink href="#" variant="ink">Ink button</ButtonLink>
          <ButtonLink href="#" variant="framed">Framed button</ButtonLink>
          <ButtonLink href="#" variant="text">Text link →</ButtonLink>
        </div>
        <div className="w-40 border border-hairline">
          <ArtworkPlaceholder seedKey="STYLE" className="block aspect-[210/297] w-full" />
        </div>
      </div>

      <SectionHeader index="T.04" label="Ornaments" title="Press furniture" className="mt-16" ink="marigold" />
      <div className="mt-8 space-y-6">
        <div className="press-band" />
        <div className="ticking h-12 border-2 border-ink" />
      </div>

      <SectionHeader index="T.05" label="Motion" title="Rules" className="mt-16" ink="verde" />
      <ul className="mt-8 max-w-xl space-y-2 text-[0.95rem] text-ink-soft">
        <li>Everything moves like paper or ink: slide, tilt, stamp.</li>
        <li>One meaningful movement per section, maximum.</li>
        <li>200–500 ms, cubic-bezier(.2,.7,.3,1), no bounce.</li>
        <li>prefers-reduced-motion disables everything.</li>
      </ul>
    </div>
  );
}
