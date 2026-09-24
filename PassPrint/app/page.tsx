import { ImageBanner } from "@/components/home/ImageBanner";
import { PrintsCarousel } from "@/components/home/PrintsCarousel";
import { FeaturedArtwork } from "@/components/artwork/FeaturedArtwork";
import { StudioWorks } from "@/components/home/StudioWorks";
import { ArtistNote } from "@/components/home/ArtistNote";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";
import { HomeFaq } from "@/components/home/HomeFaq";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Stamp, ArchEmblem } from "@/components/ui/Stamp";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { currentEdition as localEdition } from "@/content/collections";
import { studioWorks } from "@/content/artworks";
import { getCurrentEdition, getSubscriptionPlans } from "@/lib/shopify";

// Re-fetch Shopify prices at most hourly (ISR).
export const revalidate = 3600;

const work = (slug: string) => studioWorks.find((w) => w.slug === slug)!;

/*
  The homepage is laid out like an artist's own shop: the paintings first
  and full width, then a rack of prints, the monthly edition, the whole
  gallery, the painter, and only then the memberships, the list and the
  small print. Pictures lead; the passport ornament frames them.
*/

export default async function HomePage() {
  const [plans, currentEdition] = await Promise.all([
    getSubscriptionPlans(),
    getCurrentEdition(),
  ]);

  const hero = work("two-boats-one-horizon");
  const middle = work("into-the-unknown");
  const closing = work("where-the-light-falls");

  return (
    <>
      <ImageBanner src={hero.image.src} alt={hero.image.alt} focus="50% 55%" priority>
        <p className="mono-label">PassPrint · the studio of Bakir C.</p>
        <h1 className="font-serif-display mt-3 text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.95]">
          bakirpaints
        </h1>
        <p className="mt-5 text-[1.08rem] leading-relaxed text-ink-soft">
          Glad you&apos;re here. These are the paintings from my studio in
          Mostar — sold as originals, as prints, and once a month as a
          numbered edition in an envelope.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <ButtonLink href="#gallery" variant="vermilion">
            See the paintings
          </ButtonLink>
          <ButtonLink href="/subscribe" variant="text">
            Monthly edition →
          </ButtonLink>
        </div>
        <Stamp
          topText="MOSTAR"
          bottomText="STUDIO"
          centerBottom="2026"
          shape="octagon"
          ink="cobalt"
          size={104}
          rotate={-13}
          emblem={<ArchEmblem />}
          idPrefix="hero-studio"
          className="pointer-events-none absolute -right-8 -top-12 hidden opacity-90 sm:block"
        />
      </ImageBanner>

      <PrintsCarousel />

      <ImageBanner src={middle.image.src} alt={middle.image.alt} align="right" focus="50% 40%">
        <p className="mono-label">Collection 01 · Yugo</p>
        <h2 className="font-serif-display mt-3 text-[clamp(2rem,4.6vw,3.2rem)]">
          Twelve cities. One hand.
        </h2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Every month one city from the six countries that used to be one,
          painted and printed in a numbered run. It starts in{" "}
          <strong className="font-semibold text-ink">{localEdition.city}</strong>,{" "}
          {localEdition.month}.
        </p>
        <div className="mt-6">
          <ButtonLink href="/collection" variant="framed">
            See the collection
          </ButtonLink>
        </div>
      </ImageBanner>

      <FeaturedArtwork edition={currentEdition} />

      <StudioWorks index="§ 03" />

      <ArtistNote />

      <section id="join" className="security-tint border-b border-ink/25 bg-cobalt/[0.05] py-24">
        <div className="mx-auto max-w-[var(--container-page)] px-gutter">
          <SectionHeader
            index="§ 05"
            label="Shipping included BE · NL · EU"
            title="The monthly edition, by post"
          />
          <div className="mt-12">
            <SubscriptionPlans plans={plans} purchasable />
          </div>
          <p className="mt-6 max-w-[var(--container-measure)] font-mono text-[0.74rem] font-semibold uppercase tracking-[0.06em] leading-relaxed text-pencil">
            Order before the 20th and you start with this month&apos;s edition.
            Cancelling takes one click, before the 20th, no questions asked.
          </p>
        </div>
      </section>

      <HomeNewsletter />

      <HomeFaq />

      <ImageBanner src={closing.image.src} alt={closing.image.alt} focus="50% 50%">
        <h2 className="font-serif-display text-[clamp(1.9rem,4vw,2.8rem)]">
          Something you&apos;d like to ask?
        </h2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          About a painting, a size or a commission — write, and you hear back within two working days.
        </p>
        <div className="mt-6">
          <ButtonLink href="/contact" variant="framed">
            Get in touch
          </ButtonLink>
        </div>
      </ImageBanner>
    </>
  );
}
