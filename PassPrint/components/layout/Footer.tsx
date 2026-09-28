"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";

/** A quiet colophon: the name, the pages, where else to find the studio. */
export function Footer() {
  const { t, editorialFallback } = useLocale();

  const indexLinks = [
    { href: "/originals", label: t.nav.originals },
    { href: "/prints", label: t.nav.prints },
    { href: "/artist", label: t.nav.artist },
    { href: "/contact", label: t.nav.contact },
  ];

  const heading = "mb-5 font-sans text-[0.66rem] uppercase tracking-[0.26em] text-paper/50";
  const link = "text-paper/80 transition-colors duration-[var(--duration-ui)] hover:text-paper";

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[var(--container-page)] px-gutter py-20">
        <div className="grid gap-14 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="font-brand text-[1.7rem] uppercase">Pressio Atelier</p>
            <p className="mt-5 max-w-sm leading-relaxed text-paper/70">{t.footer.tagline}</p>
          </div>

          <nav aria-label="Site index">
            <p className={heading}>{t.footer.index}</p>
            <ul className="space-y-2.5">
              {indexLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="text-paper/40">
                PassPrint <span className="ml-1 text-[0.7rem] uppercase tracking-[0.18em]">· {t.nav.comingSoon}</span>
              </li>
            </ul>
          </nav>

          <div>
            <p className={heading}>{t.footer.elsewhere}</p>
            <ul className="space-y-2.5">
              <li>
                {/* TODO: real profile URL */}
                <a href="https://instagram.com" rel="noopener noreferrer" className={link}>
                  Instagram
                </a>
              </li>
            </ul>
            <p className={`${heading} mt-10`}>{t.footer.language}</p>
            <div className="[&_button]:text-paper/80 [&_button:hover]:text-paper">
              <LanguageSwitcher />
            </div>
            {editorialFallback && (
              <p className="mt-2 max-w-[16rem] text-[0.72rem] leading-relaxed text-paper/50">
                {t.common.editorialInEnglish}
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-paper/15 pt-6 font-sans text-[0.66rem] uppercase tracking-[0.22em] text-paper/45">
          <p>© 2026 Pressio Atelier</p>
        </div>
      </div>
    </footer>
  );
}
