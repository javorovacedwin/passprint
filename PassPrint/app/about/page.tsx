import type { Metadata } from "next";
import { StampMark } from "@/components/ui/StampMark";
import { CartoucheLogo } from "@/components/brand/CartoucheLogo";
import { ButtonLink } from "@/components/ui/Button";
import { balkanCollection, currentEdition } from "@/content/collections";
import { mostarStory } from "@/content/mostar";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why PassPrint exists, why The Balkan Collection begins in Mostar, who reads the stories before they print, and how the work is made.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      {/* the ceremonial mark belongs on the page that explains the house */}
      <div className="security-tint mb-16 border border-ink/25 px-6 py-12">
        <CartoucheLogo
          className="mx-auto w-full max-w-[40rem]"
          coordinates={currentEdition.coordinates
            .replace(" N,", "° N,")
            .replace(" E", "° E")}
          uid="about"
        />
      </div>

      <div className="grid gap-14 lg:grid-cols-[2fr_1fr]">
        <article className="max-w-[var(--container-measure)]">
          <p className="mono-label">About · written in the first person</p>
          <h1 className="font-serif-display mt-5 text-[clamp(2.4rem,6vw,4rem)]">
            Why this exists
          </h1>

          <div className="mt-8 space-y-6 text-[1.05rem] leading-relaxed text-ink-soft">
            <p>
              Most places you get to know through photographs that look like
              each other. The same corner, the same angle, the same light.
              What you never learn from them is how a place feels to someone
              who lives there — which building everyone knows and why, which
              window nobody photographs, what stood there before something
              else did.
            </p>
            <p>
              PassPrint started from a simple observation: those stories
              usually live in families, not in guidebooks. Each month we
              travel to a different city and ask one artist who actually
              lives there to draw it, paint it or print it. Not the postcard
              version — the version seen by someone who has something to do
              with it.
            </p>
            <p>
              You get it by post. An envelope, two prints, a card with the
              story, and a number written by hand on the back. The edition is
              limited to what we print that month; after that, it is not
              reprinted.
            </p>
          </div>

          <h2 className="font-serif-display mt-14 text-2xl">Why we begin in {currentEdition.city}</h2>
          <div className="mt-4 space-y-6 text-[1.02rem] leading-relaxed text-ink-soft">
            {mostarStory.full.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>

          <h2 className="font-serif-display mt-12 text-2xl">How the work is made</h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">
            Each edition of {balkanCollection.title} is drawn by an artist who
            actually lives in the city it depicts — never one person drawing
            twelve places they have only visited. The launch edition is made
            by Ajla M., born and working in {currentEdition.city}. Every story
            is read before printing by someone else from the place it
            describes, and that reader is credited by name on the card. We
            name buildings and people, never a region as if it were one
            thing, and we draw no borders on any map.
          </p>

          <h2 className="font-serif-display mt-12 text-2xl">The same, every month</h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">
            The production never changes. Every edition — and every future
            collection — uses the same paper, the same print quality, the same
            finish and the same packaging. Only the artwork, the place, the
            story and the envelope colour change. When we travel to a new city,
            the object in your letterbox is made to exactly the same standard.
          </p>

          <div className="mt-12">
            <ButtonLink href="/contact" variant="text">
              Write to us →
            </ButtonLink>
          </div>
        </article>

        <aside className="lg:pt-24">
          <div className="border border-hairline bg-paper-deep/40 p-7">
            <StampMark legend="EST. 2026" size={96} />
            <dl className="mt-6 space-y-4 font-mono text-[0.74rem] uppercase tracking-[0.06em]">
              <div>
                <dt className="text-pencil">Published from</dt>
                <dd className="mt-1 text-ink">Antwerpen, Belgium</dd>
              </div>
              <div>
                <dt className="text-pencil">Launch edition</dt>
                <dd className="mt-1 text-ink">
                  {currentEdition.city} · {balkanCollection.launchMonth}
                </dd>
              </div>
              <div>
                <dt className="text-pencil">Printed at</dt>
                {/* TODO: real printer name and city once quotes are final */}
                <dd className="mt-1 text-ink">[Printer, city]</dd>
              </div>
              <div>
                <dt className="text-pencil">Region</dt>
                <dd className="mt-1 text-ink">{currentEdition.region ?? currentEdition.country}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
