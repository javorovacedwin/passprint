"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartButton } from "@/components/cart/CartButton";
import { useLocale } from "@/components/i18n/LocaleProvider";

const linkClass =
  "whitespace-nowrap font-sans text-[0.7rem] font-normal uppercase tracking-[0.24em] transition-colors duration-[var(--duration-ui)]";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { t } = useLocale();

  const before = [
    { href: "/originals", label: t.nav.originals },
    { href: "/prints", label: t.nav.prints },
  ];
  const after = [
    { href: "/artist", label: t.nav.artist },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const navLink = (link: { href: string; label: string }) => {
    const active = pathname.startsWith(link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={`${linkClass} ${active ? "text-ink" : "text-ink-soft hover:text-ink"}`}
      >
        <span className={active ? "border-b border-ink pb-1" : ""}>{link.label}</span>
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-[var(--duration-ui)] ${
        scrolled || open ? "border-hairline-soft bg-paper/97" : "border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex max-w-[var(--container-page)] items-center justify-between px-gutter py-6">
        <Link href="/" className="font-brand text-[1.45rem] uppercase text-ink">
          Pressio Atelier
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {before.map(navLink)}

          {/* PassPrint is not open yet: a label, not a link, with a line about it on hover. */}
          <span className="group/pp relative flex cursor-default items-center gap-2" tabIndex={0}>
            <span className={`${linkClass} text-ink-soft/60`}>PassPrint</span>
            <span className="border border-ink/25 px-1.5 py-[1px] font-sans text-[0.55rem] uppercase tracking-[0.18em] text-pencil">
              {t.nav.comingSoon}
            </span>
            <span
              role="tooltip"
              className="pointer-events-none invisible absolute left-1/2 top-full z-10 mt-4 w-64 -translate-x-1/2 border border-hairline-soft bg-paper p-5 text-center text-[0.85rem] leading-relaxed text-ink-soft opacity-0 transition-opacity duration-[var(--duration-ui)] group-hover/pp:visible group-hover/pp:opacity-100 group-focus/pp:visible group-focus/pp:opacity-100"
            >
              <span className="font-serif-display block text-lg italic text-ink">PassPrint</span>
              <span className="mt-2 block">{t.nav.passprintTeaser}</span>
            </span>
          </span>

          {after.map(navLink)}
          <span className="h-4 w-px bg-hairline" aria-hidden="true" />
          <LanguageSwitcher />
          <CartButton />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <CartButton />
          <LanguageSwitcher />
          <button
            ref={toggleRef}
            type="button"
            className="flex flex-col items-end gap-[6px] p-2"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
            <span
              aria-hidden="true"
              className={`block h-px w-6 bg-ink transition-transform duration-[var(--duration-ui)] ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`block h-px w-6 bg-ink transition-transform duration-[var(--duration-ui)] ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div id={menuId} hidden={!open} className="border-t border-hairline-soft bg-paper lg:hidden">
        <nav aria-label="Main mobile" className="px-gutter py-4">
          <ul className="divide-y divide-hairline-soft">
            {before.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-4 font-serif-display text-2xl"
                  aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex items-baseline justify-between py-4 text-ink-soft/60">
              <span className="font-serif-display text-2xl">PassPrint</span>
              <span className="mono-label">{t.nav.comingSoon}</span>
            </li>
            {after.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-4 font-serif-display text-2xl"
                  aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
