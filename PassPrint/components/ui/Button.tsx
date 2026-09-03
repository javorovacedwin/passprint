import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "framed" | "ink" | "text" | "vermilion" | "cobalt";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const base =
  "inline-flex items-center gap-2 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-[var(--duration-ui)]";

/* An engraved double rule: outer border plus an inset hairline. */
const engraved =
  "px-6 py-3 border border-current shadow-[inset_0_0_0_2px_var(--color-paper),inset_0_0_0_2.6px_currentColor]";

const variants: Record<Variant, string> = {
  framed: `${engraved} text-ink hover:bg-ink hover:text-paper`,
  ink: `${engraved} bg-ink text-paper shadow-[inset_0_0_0_2px_var(--color-ink),inset_0_0_0_2.6px_var(--color-paper)] hover:bg-vermilion hover:text-paper`,
  vermilion: `${engraved} bg-vermilion text-paper shadow-[inset_0_0_0_2px_var(--color-vermilion),inset_0_0_0_2.6px_var(--color-paper)] hover:bg-vermilion-deep`,
  cobalt: `${engraved} bg-cobalt text-paper shadow-[inset_0_0_0_2px_var(--color-cobalt),inset_0_0_0_2.6px_var(--color-paper)] hover:bg-cobalt-deep`,
  text: "text-ink underline decoration-vermilion decoration-1 underline-offset-[6px] hover:text-vermilion-deep hover:decoration-2",
};

/**
 * Buttons framed like a stamped document panel: a rule, a hairline inside
 * it, letterspaced mono. They fill with ink on hover instead of levitating.
 */
export function ButtonLink({
  href,
  children,
  variant = "framed",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
