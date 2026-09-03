"use client";

import { useCart } from "./CartProvider";

/**
 * The header cart trigger. Hidden entirely until commerce is wired up, so
 * a pre-launch site doesn't show an empty cart control. Drawn as a small
 * parcel mark in SVG — no icon library.
 */
export function CartButton({ className = "" }: { className?: string }) {
  const { count, openCart, availability } = useCart();

  if (availability === "unconfigured") return null;

  return (
    <button
      type="button"
      onClick={openCart}
      className={`relative flex items-center gap-2 p-2 font-mono text-[0.78rem] font-medium uppercase tracking-[0.08em] text-ink-soft transition-colors duration-[var(--duration-ui)] hover:text-ink ${className}`}
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M2 4.5 L13.5 4.5 L12.5 13.5 L3 13.5 Z" />
        <path d="M5.5 4.5 V3.2 a1.6 1.6 0 0 1 4.5 0 V4.5" />
      </svg>
      <span className="tabular-nums">{count}</span>
    </button>
  );
}
