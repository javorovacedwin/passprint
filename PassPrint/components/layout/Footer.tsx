"use client";

import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { NewsletterForm } from "./NewsletterForm";
import { PrintStar } from "@/components/ui/Ornaments";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";

/**
 * The footer as a loud colophon: five-ink press band on top, then deep ink
 * with paper text and marigold accents — the last page of a poster zine,
 * not fine print.
 */
export function Footer() {
  const { t, editorialFallback } = useLocale();

  const indexLinks = [
    { href: "/collection", label: t.nav.collection },
    { href: "/artists", label: t.nav.artists },
    { href: "/about", label: t.nav.about },
    { href: "/subscribe", label: "Subscribe" },
    { href: "/vote", label: t.nav.vote },
    { href: "/faq", label: "FAQ" },
    { href: "/faq#shipping", label: "Shipping" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="mt-4">
      <div className="press-band" aria-hidden="true" />
      <div className="bg-ink text-paper">
        <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <Wordmark
                className="text-[2.4rem] text-paper"
                strapline
                ink="var(--color-paper)"
                accent="var(--color-marigold)"
                paper="var(--color-ink)"
                uid="footer"
              />
              <p className="mt-5 max-w-sm text-[1rem] leading-relaxed text-paper/85">
                {t.footer.tagline}
              </p>
              <div className="mt-7">
                <p className="mb-2 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-marigold">
                  {t.footer.newsletter}
                </p>
                <NewsletterForm dark />
              </div>
            </div>

            <nav aria-label="Site index">
              <p className="mb-3 flex items-center gap-2 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-marigold">
                <PrintStar className="h-3 w-3" color="var(--color-marigold)" />
                {t.footer.index}
              </p>
              <ul className="columns-2 gap-8 text-[1rem] leading-loose">
                {indexLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-paper/85 underline-offset-4 hover:text-paper hover:underline hover:decoration-vermilion hover:decoration-2">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-marigold">
                <PrintStar className="h-3 w-3" color="var(--color-marigold)" />
                {t.footer.elsewhere}
              </p>
              <ul className="text-[1rem] leading-loose">
                <li>
                  {/* TODO: real profile URLs */}
                  <a href="https://instagram.com" rel="noopener noreferrer" className="text-paper/85 underline-offset-4 hover:text-paper hover:underline hover:decoration-rosa hover:decoration-2">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://pinterest.com" rel="noopener noreferrer" className="text-paper/85 underline-offset-4 hover:text-paper hover:underline hover:decoration-rosa hover:decoration-2">
                    Pinterest
                  </a>
                </li>
              </ul>
              <p className="mb-1 mt-6 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-marigold">
                {t.footer.language}
              </p>
              <div className="[&_button]:text-paper/85 [&_button:hover]:text-paper">
                <LanguageSwitcher />
              </div>
              {editorialFallback && (
                <p className="mt-2 max-w-[16rem] font-mono text-[0.68rem] leading-relaxed text-paper/60">
                  {t.common.editorialInEnglish}
                </p>
              )}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-2 border-t border-paper/25 pt-5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-paper/65 sm:flex-row sm:items-baseline sm:justify-between">
            <p>© 2026 PassPrint · passprint.eu. {t.footer.rights}</p>
            <p>PASSPRINT DIGITAL EDITION — PP/W01/2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
