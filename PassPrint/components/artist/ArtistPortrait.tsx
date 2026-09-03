import type { Artist } from "@/content/types";

interface ArtistPortraitProps {
  artist: Artist;
  className?: string;
}

/**
 * Honest portrait placeholder: a labelled archive frame, never an
 * AI-generated face. Replace with a real photograph before launch
 * (public/artists/<slug>_portrait.jpg) by swapping this for next/image.
 */
export function ArtistPortrait({ artist, className = "" }: ArtistPortraitProps) {
  return (
    <div className={`relative aspect-[4/5] border border-hairline bg-paper-deep/60 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="absolute right-5 top-5 h-16 w-16 opacity-40"
        aria-hidden="true"
      >
        <circle cx="50" cy="36" r="16" fill="none" stroke="var(--color-pencil)" strokeWidth="2" />
        <path d="M22 88 a 28 28 0 0 1 56 0" fill="none" stroke="var(--color-pencil)" strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
        <p className="mono-label">Portrait — to be photographed</p>
        <p className="mono-label mt-1">
          {artist.city}, {artist.country}
        </p>
      </div>
    </div>
  );
}
