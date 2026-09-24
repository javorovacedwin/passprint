import { SealLogo } from "@/components/brand/SealLogo";

interface WordmarkProps {
  className?: string;
  /** Shows the seal before the name. */
  starred?: boolean;
  /** Renders the strapline under the name. */
  strapline?: boolean;
  /** Inks, for use on dark grounds. */
  ink?: string;
  accent?: string;
  paper?: string;
  uid?: string;
  /** The name set beside the seal. The site is PassPrint; the header shows the artist. */
  name?: string;
}

/**
 * The horizontal lockup: the seal struck beside the wordmark, with the
 * brand strapline set in small letterspaced caps beneath it.
 */
export function Wordmark({
  className = "",
  starred = true,
  strapline = false,
  ink,
  accent,
  paper,
  uid = "wm",
  name = "PassPrint",
}: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-[0.42em] ${className}`}>
      {starred && (
        <SealLogo
          className="h-[1.5em] w-[1.5em] shrink-0"
          ink={ink}
          accent={accent}
          paper={paper}
          distress={false}
          uid={uid}
        />
      )}
      <span className="inline-flex flex-col leading-none">
        <span
          className="font-serif-display tracking-[0.01em]"
          style={{ fontFeatureSettings: '"liga"' }}
        >
          {name}
        </span>
        {strapline && (
          <span className="mt-[0.35em] font-mono text-[0.3em] font-semibold uppercase tracking-[0.3em] opacity-75">
            Printed Memories · Stamped Stories
          </span>
        )}
      </span>
    </span>
  );
}
