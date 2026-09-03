"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { SealLogo } from "@/components/brand/SealLogo";

function formatMoney(amount: string, currencyCode: string): string {
  const value = Number(amount);
  const symbol = currencyCode === "EUR" ? "€" : `${currencyCode} `;
  const printed = Number.isInteger(value) ? value.toString() : value.toFixed(2).replace(".", ",");
  return `${symbol}${printed}`;
}

/**
 * The cart, as a sheet that slides in from the right like paper pulled from
 * an envelope. Checkout is the Shopify-hosted checkoutUrl — the only point
 * the customer leaves the custom site, and only to pay.
 */
export function CartDrawer() {
  const { cart, open, closeCart, setQuantity, removeItem, pending } = useCart();

  // Lock scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeCart]);

  const lines = cart?.lines ?? [];
  const empty = lines.length === 0;

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`}
    >
      {/* scrim */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/30 transition-opacity duration-[var(--duration-ui)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* sheet */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col border-l border-hairline bg-paper shadow-[var(--shadow-paper-lifted)] transition-transform duration-[var(--duration-slide)] ease-[var(--ease-ink)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-baseline justify-between border-b border-hairline px-6 py-5">
          <h2 className="font-serif-display text-2xl">Your envelope</h2>
          <button
            type="button"
            onClick={closeCart}
            className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-pencil hover:text-ink"
          >
            Close
          </button>
        </header>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <SealLogo className="w-[92px] opacity-35" distress={false} uid="cart-empty" />
            <p className="mono-label">Nothing here yet</p>
            <p className="max-w-xs text-[0.98rem] leading-relaxed text-ink-soft">
              Add this month&apos;s edition or a membership and it will collect
              here.
            </p>
            <Link
              href="/subscribe"
              onClick={closeCart}
              className="mt-1 font-mono text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-ink underline decoration-vermilion underline-offset-[6px] hover:text-vermilion-deep"
            >
              See the memberships →
            </Link>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-hairline-soft overflow-y-auto px-6">
            {lines.map((line) => (
              <li key={line.id} className="flex gap-4 py-5">
                <div className="flex-1">
                  <p className="font-serif-display text-lg leading-tight">{line.title}</p>
                  {line.variantTitle && line.variantTitle !== "Default Title" && (
                    <p className="mono-label mt-1">{line.variantTitle}</p>
                  )}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-hairline">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.id, line.quantity - 1)}
                        disabled={pending}
                        className="px-2.5 py-1 font-mono text-sm text-ink-soft hover:text-ink disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center font-mono text-[0.8rem] tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.id, line.quantity + 1)}
                        disabled={pending}
                        className="px-2.5 py-1 font-mono text-sm text-ink-soft hover:text-ink disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.id)}
                      disabled={pending}
                      className="font-mono text-[0.68rem] uppercase tracking-[0.06em] text-pencil underline underline-offset-4 hover:text-error disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-mono text-[0.82rem] tabular-nums text-ink">
                  {formatMoney(line.price.amount, line.price.currencyCode)}
                </p>
              </li>
            ))}
          </ul>
        )}

        <footer className="border-t border-hairline px-6 py-5">
          <div className="flex items-baseline justify-between">
            <span className="mono-label">Subtotal</span>
            <span className="font-mono text-[0.95rem] tabular-nums text-ink">
              {cart ? formatMoney(cart.subtotal.amount, cart.subtotal.currencyCode) : "—"}
            </span>
          </div>
          <p className="mt-2 font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.05em] text-pencil">
            Shipping included in BE/NL/EU. Taxes shown at checkout.
          </p>
          <a
            href={empty ? undefined : cart?.checkoutUrl}
            aria-disabled={empty}
            className={`mt-4 flex w-full items-center justify-center gap-2 px-5 py-3 font-mono text-[0.8rem] font-medium uppercase tracking-[0.08em] transition-colors duration-[var(--duration-ui)] ${
              empty
                ? "cursor-not-allowed border border-hairline text-pencil"
                : "bg-ink text-paper hover:bg-accent-deep"
            }`}
          >
            Checkout
          </a>
        </footer>
      </aside>
    </div>
  );
}
