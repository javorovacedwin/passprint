import { PrintStar } from "./Ornaments";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  className?: string;
  /** One of the stamp inks for the index plate. */
  ink?: "vermilion" | "cobalt" | "marigold" | "verde" | "rosa";
}

const inkClass: Record<NonNullable<SectionHeaderProps["ink"]>, string> = {
  vermilion: "text-vermilion border-vermilion",
  cobalt: "text-cobalt border-cobalt",
  marigold: "text-marigold-deep border-marigold-deep",
  verde: "text-verde border-verde",
  rosa: "text-rosa border-rosa",
};

/**
 * Section head set like the heading of a passport page: a double rule, an
 * inked index plate, a star, and the title in the engraved display serif.
 */
export function SectionHeader({
  index,
  label,
  title,
  className = "",
  ink = "vermilion",
}: SectionHeaderProps) {
  return (
    <header className={className}>
      {/* double rule */}
      <div className="border-t border-ink" />
      <div className="mt-[3px] border-t border-ink/45" />

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <span
          className={`border px-2.5 py-1 font-mono text-[0.74rem] font-semibold uppercase tracking-[0.16em] ${inkClass[ink]}`}
        >
          {index}
        </span>
        <PrintStar className="h-3 w-3" />
        <span className="mono-label">{label}</span>
      </div>

      <h2 className="font-serif-display mt-6 max-w-4xl text-[clamp(2.1rem,5vw,3.7rem)]">
        {title}
      </h2>
    </header>
  );
}
