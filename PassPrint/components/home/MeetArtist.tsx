import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { ArtistPortrait } from "@/components/artist/ArtistPortrait";
import { leadArtist } from "@/content/artists";
import { currentEdition } from "@/content/collections";

/**
 * The maker, not a marketing element. Bakir C. is the sole artist behind
 * Yugo — every city in the collection is drawn by the same hand. The
 * portrait area is an honest placeholder — a labelled frame, not a fake
 * face.
 */
export function MeetArtist() {
  const artist = leadArtist;

  return (
    <section className="border-y border-ink/25 bg-rosa/[0.07] py-24">
      <div className="mx-auto max-w-[var(--container-page)] px-gutter">
        <SectionHeader
          index="§ 04"
          label="The maker"
          title="One artist. Twelve editions. Six countries."
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
              As the sole artist of Yugo, Bakir makes every main print,
              companion study and story card in the collection — twelve
              editions, one hand. Each story is also read before printing by
              someone from the place it describes, credited by name on the
              card.
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
