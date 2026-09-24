"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CartButton } from "@/components/cart/CartButton";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bandHeight, setBandHeight] = useState(96);
  const pathname = usePathname();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
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

  // Lock background scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Measure the masthead's true height so the mobile menu panel starts
  // exactly under it, at any width or font-loading state.
  useLayoutEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const update = () => setBandHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div ref={bandRef}>
        {/* the struck brand line — a fixed line, not a scroller */}
        <div className="bg-navy py-1.5 text-center">
          <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-paper">
            Printed memories · Stamped stories
          </p>
        </div>

        <div
          className={`border-b-2 transition-colors duration-[var(--duration-ui)] ${
            scrolled || open
              ? "border-ink bg-paper/95 backdrop-blur-[2px]"
              : "border-transparent bg-paper"
          }`}
        >
          <div className="mx-auto max-w-[var(--container-page)] px-gutter">
            {/* mobile row: hamburger — centered wordmark — cart */}
            <div className="grid grid-cols-3 items-center py-4 lg:hidden">
              <div className="flex items-center">
                <button
                  ref={toggleRef}
                  type="button"
                  className="flex flex-col items-start gap-[5px] p-2"
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

              <Link href="/" className="flex items-center justify-center">
                <span
                  className="font-serif-display text-[1.5rem] tracking-[0.01em]"
                  style={{ fontFeatureSettings: '"liga"' }}
                >
                  BakirPaints
                </span>
              </Link>

              <div className="flex items-center justify-end">
                <CartButton />
              </div>
            </div>

            {/* desktop row: wordmark left, nav + actions right */}
            <div className="hidden items-center justify-between py-4 lg:flex">
              <Link href="/" className="flex items-baseline gap-3">
                <span
                  className="font-serif-display text-[1.7rem] tracking-[0.01em]"
                  style={{ fontFeatureSettings: '"liga"' }}
                >
                  BakirPaints
                </span>
                <span
                  className="hidden whitespace-nowrap border border-ink/50 px-1.5 py-0.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-ink-soft xl:inline"
                  aria-hidden="true"
                >
                  EST. 2026
                </span>
              </Link>

              <nav aria-label="Main" className="flex items-center gap-4 xl:gap-7">
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
            </div>
          </div>
        </div>
      </div>

      {/* full-screen mobile menu, struck right under the masthead */}
      <div
        id={menuId}
        hidden={!open}
        style={{ top: bandHeight }}
        className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Main mobile" className="px-gutter py-2">
          <ol className="divide-y divide-hairline-soft border-b border-hairline">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`-mx-gutter flex items-baseline justify-between px-gutter py-5 ${
                    i === 0 ? "bg-paper-deep/50" : ""
                  }`}
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
                className="flex items-baseline justify-between py-5 text-accent-deep"
              >
                <span className="font-serif-display text-xl">{t.nav.join}</span>
                <span className="mono-label text-accent-deep">→</span>
              </Link>
            </li>
          </ol>
        </nav>

        {/* footer of the menu — language and elsewhere, as in the masthead's colophon */}
        <div className="mt-auto border-t border-hairline bg-paper-deep/40 px-gutter py-6">
          <div className="flex items-center justify-between gap-4">
            <LanguageSwitcher />
            <div className="flex items-center gap-4 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink-soft">
              {/* TODO: real profile URLs */}
              <a href="https://instagram.com" rel="noopener noreferrer" className="hover:text-ink">
                Instagram
              </a>
              <a href="https://pinterest.com" rel="noopener noreferrer" className="hover:text-ink">
                Pinterest
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
