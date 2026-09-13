import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { ArtistPortrait } from "@/components/artist/ArtistPortrait";
import { leadArtist } from "@/content/artists";
import { currentEdition } from "@/content/collections";

/**
 * The maker, not a marketing element. Ajla M. is the artist behind the
 * launch edition — every future city in the collection gets an artist with
 * the same kind of real connection to their own place. The portrait area is
 * an honest placeholder — a labelled frame, not a fake face.
 */
export function MeetArtist() {
  const artist = leadArtist;

  return (
    <section className="border-y border-ink/25 bg-rosa/[0.07] py-24">
      <div className="mx-auto max-w-[var(--container-page)] px-gutter">
        <SectionHeader
          index="§ 04"
          label="The maker"
          title="One city. One artist who lives there."
          ink="rosa"
        />

        <div className="mt-14 grid gap-10 md:grid-cols-[minmax(240px,1fr)_1.6fr]">
          <figure>
            <ArtistPortrait artist={artist} />
            <figcaption className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.06em] text-pencil">
              {artist.name} · {artist.city} · {currentEdition.code}
            </figcaption>
          </figure>

          <div className="max-w-[38rem]">
            <blockquote className="border-l-4 border-rosa pl-6">
              <p className="font-serif-book text-[clamp(1.4rem,2.6vw,2rem)] font-bold italic leading-snug">
                &ldquo;{artist.quote}&rdquo;
              </p>
              <cite className="mono-label mt-4 block not-italic">
                — {artist.name}, {artist.city}
              </cite>
            </blockquote>
            <p className="mt-8 text-[1.02rem] leading-relaxed text-ink-soft">
              {artist.connection}
            </p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">
              Ajla makes the launch edition&apos;s main print, companion study
              and story card — the way every city in this collection is made:
              by whoever actually lives there, not a name chosen from
              outside. Her story is also read before printing by someone
              else from {currentEdition.city}, credited by name on the card.
            </p>
            <div className="mt-8">
              <ButtonLink href="/artists" variant="text">
                The artist, in full →
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
