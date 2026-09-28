"use client";

import { useCart } from "./CartProvider";
import { buttonBase, buttonVariants } from "@/components/ui/Button";

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

  let text = label;
  if (!available) text = "Sold";
  else if (availability === "unconfigured" || !variantId) text = "Available soon";
  else if (pending) text = "Adding…";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => variantId && addItem(variantId, 1, sellingPlanId)}
      className={`${buttonBase} ${buttonVariants[variant]} disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      aria-label={variantId ? label : "Not yet available for purchase"}
    >
      {text}
    </button>
  );
}
