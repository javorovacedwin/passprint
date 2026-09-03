"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartButton } from "@/components/cart/CartButton";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { t } = useLocale();

  const navLinks = [
    { href: "/collection", label: t.nav.collection },
    { href: "/how-it-works", label: t.nav.howItWorks },
    { href: "/artists", label: t.nav.artists },
    { href: "/about", label: t.nav.about },
    { href: "/vote", label: t.nav.vote },
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

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 transition-colors duration-[var(--duration-ui)] ${
        scrolled || open
          ? "border-ink bg-paper/95 backdrop-blur-[2px]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[var(--container-page)] items-center justify-between px-gutter py-4">
        <Link href="/" className="flex items-baseline gap-3">
          <Wordmark className="text-[1.7rem]" />
          {/*
            Held back until xl: between the lg breakpoint and about 1150px the
            masthead, five nav items and the join button do not fit on one
            line, and this badge was the item that broke first.
          */}
          <span className="hidden whitespace-nowrap border border-ink/50 px-1.5 py-0.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-ink-soft sm:max-lg:inline xl:inline" aria-hidden="true">
            EST. 2026
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-4 lg:flex xl:gap-7">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap font-mono text-[0.78rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-[var(--duration-ui)] ${
                  active
                    ? "text-vermilion underline decoration-vermilion decoration-2 underline-offset-8"
                    : "text-ink-soft hover:text-vermilion-deep"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <LanguageSwitcher />
          <CartButton />
          <Link
            href="/subscribe"
            className="shrink-0 whitespace-nowrap border border-vermilion bg-vermilion px-4 py-2 font-mono text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-paper shadow-[inset_0_0_0_2px_var(--color-vermilion),inset_0_0_0_2.6px_var(--color-paper)] transition-colors duration-[var(--duration-ui)] hover:bg-vermilion-deep"
          >
            {t.nav.join}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <CartButton />
          <LanguageSwitcher />
          <button
            ref={toggleRef}
            type="button"
            className="flex flex-col items-end gap-[5px] p-2"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
            <span
              aria-hidden="true"
              className={`block h-px w-6 bg-ink transition-transform duration-[var(--duration-ui)] ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`block h-px bg-ink transition-all duration-[var(--duration-ui)] ${
                open ? "w-6 -translate-y-[3px] -rotate-45" : "w-4"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu: an index card that slides down under the masthead. */}
      <div
        id={menuId}
        hidden={!open}
        className="border-t border-hairline bg-paper lg:hidden"
      >
        <nav aria-label="Main mobile" className="px-gutter py-2">
          <ol className="divide-y divide-hairline-soft">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-baseline justify-between py-4"
                  aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                >
                  <span className="font-serif-display text-xl">{link.label}</span>
                  <span className="mono-label">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/subscribe"
                className="flex items-baseline justify-between py-4 text-accent-deep"
              >
                <span className="font-serif-display text-xl">{t.nav.join}</span>
                <span className="mono-label text-accent-deep">→</span>
              </Link>
            </li>
          </ol>
        </nav>
      </div>
    </header>
  );
}
