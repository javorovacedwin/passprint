"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localeList, type Locale } from "@/content/languages";

/**
 * Typographic language selector: a small mono disclosure that opens a plain
 * list of language names. No flags — a flag is a country, not a language,
 * and this brand does not use them.
 *
 * Keyboard: Enter/Space/ArrowDown opens, arrows move, Enter selects,
 * Escape closes and restores focus. Closes on outside click.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = localeList.findIndex((l) => l.code === locale);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) itemRefs.current[focusIndex]?.focus();
  }, [open, focusIndex]);

  const choose = (next: Locale) => {
    setLocale(next);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIndex((i) => (i + 1) % localeList.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIndex((i) => (i - 1 + localeList.length) % localeList.length);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`Language — ${localeList[activeIndex]?.english ?? "English"}`}
        onClick={() => {
          setFocusIndex(activeIndex < 0 ? 0 : activeIndex);
          setOpen((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setFocusIndex(activeIndex < 0 ? 0 : activeIndex);
            setOpen(true);
          }
        }}
        className="flex items-center gap-1.5 py-2 font-mono text-[0.78rem] font-medium uppercase tracking-[0.08em] text-ink-soft transition-colors duration-[var(--duration-ui)] hover:text-ink"
      >
        {localeList[activeIndex]?.short ?? "EN"}
        <span
          aria-hidden="true"
          className={`text-[0.6rem] transition-transform duration-[var(--duration-ui)] ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Language"
          onKeyDown={onListKeyDown}
          className="absolute right-0 top-full z-50 mt-1 min-w-[10.5rem] border border-hairline bg-paper py-1 shadow-[var(--shadow-paper)]"
        >
          {localeList.map((l, i) => {
            const selected = l.code === locale;
            return (
              <li key={l.code} role="option" aria-selected={selected}>
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  tabIndex={-1}
                  onClick={() => choose(l.code)}
                  className={`flex w-full items-baseline justify-between gap-4 px-3 py-2 text-left transition-colors duration-[var(--duration-ui)] ${
                    selected ? "text-accent-deep" : "text-ink-soft hover:bg-paper-deep hover:text-ink"
                  }`}
                >
                  <span className="text-[0.92rem]">{l.native}</span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-pencil">
                    {l.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
