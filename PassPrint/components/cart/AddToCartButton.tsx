"use client";

import { useCart } from "./CartProvider";

interface AddToCartButtonProps {
  /** Storefront ProductVariant GID. Null when running on local fallback. */
  variantId: string | null;
  /** Makes the line a subscription (Shopify selling plan). */
  sellingPlanId?: string | null;
  available?: boolean;
  label?: string;
  variant?: "ink" | "framed";
  className?: string;
}

/**
 * Adds a Shopify variant to the cart via the Storefront API. When the store
 * isn't wired up yet (no variant id / no token) the button is disabled with
 * an honest label rather than pretending to work.
 */
export function AddToCartButton({
  variantId,
  sellingPlanId = null,
  available = true,
  label = "Add to cart",
  variant = "ink",
  className = "",
}: AddToCartButtonProps) {
  const { addItem, pending, availability } = useCart();

  const disabled =
    !variantId || !available || availability === "unconfigured" || pending;

  const base =
    "inline-flex items-center justify-center gap-2 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] px-6 py-3 border transition-colors duration-[var(--duration-ui)] disabled:cursor-not-allowed disabled:opacity-45";
  const look =
    variant === "ink"
      ? "border-vermilion bg-vermilion text-paper shadow-[inset_0_0_0_2px_var(--color-vermilion),inset_0_0_0_2.6px_var(--color-paper)] hover:bg-vermilion-deep"
      : "border-current text-ink shadow-[inset_0_0_0_2px_var(--color-paper),inset_0_0_0_2.6px_currentColor] hover:bg-ink hover:text-paper";

  let text = label;
  if (!available) text = "Sold out";
  else if (availability === "unconfigured" || !variantId) text = "Available soon";
  else if (pending) text = "Adding…";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => variantId && addItem(variantId, 1, sellingPlanId)}
      className={`${base} ${look} ${className}`}
      aria-label={variantId ? `${label} — ${variantId}` : "Not yet available for purchase"}
    >
      {text}
    </button>
  );
}
