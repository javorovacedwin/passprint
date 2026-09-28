import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "framed" | "ink" | "text" | "vermilion" | "cobalt";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

/** Shared by links and the cart button, so every button on the site matches. */
export const buttonBase =
  "inline-flex items-center justify-center gap-3 font-sans text-[0.72rem] font-normal uppercase tracking-[0.24em] transition-colors duration-[var(--duration-slide)] ease-[var(--ease-ink)]";

const solid = "px-9 py-4 border";

export const buttonVariants: Record<Variant, string> = {
  framed: `${solid} border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-paper`,
  ink: `${solid} border-ink bg-ink text-paper hover:border-navy-deep hover:bg-navy-deep`,
  vermilion: `${solid} border-ink bg-ink text-paper hover:border-navy-deep hover:bg-navy-deep`,
  cobalt: `${solid} border-navy bg-navy text-paper hover:border-navy-deep hover:bg-navy-deep`,
  text: "border-b border-ink/30 pb-1 text-ink hover:border-ink",
};

/**
 * Quiet buttons: one fine rule, generous space, small spaced capitals.
 * They fill with ink on hover instead of lifting.
 */
export function ButtonLink({
  href,
  children,
  variant = "framed",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${buttonBase} ${buttonVariants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
