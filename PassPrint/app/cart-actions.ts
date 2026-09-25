"use server";

import {
  addLine,
  createCart,
  fetchCart,
  isShopifyConfigured,
  removeLine,
  updateLine,
} from "@/lib/shopify/cart";
import type { CartResult } from "@/lib/shopify/cart-types";

/*
  Cart server actions. The client (CartProvider) calls these; the Storefront
  token stays on the server. Every action returns a discriminated CartResult
  so the UI can distinguish "commerce not configured yet" from a real error
  and fall back gracefully.
*/

function unconfigured(): CartResult {
  return { ok: false, reason: "unconfigured" };
}

export async function addToCartAction(
  cartId: string | null,
  merchandiseId: string,
  quantity = 1,
  sellingPlanId: string | null = null
): Promise<CartResult> {
  if (!isShopifyConfigured()) return unconfigured();
  try {
    const cart = cartId
      ? (await addLine(cartId, merchandiseId, quantity, sellingPlanId)) ??
        (await createCart(merchandiseId, quantity, sellingPlanId))
      : await createCart(merchandiseId, quantity, sellingPlanId);
    return cart ? { ok: true, cart } : { ok: false, reason: "error" };
  } catch (e) {
    return { ok: false, reason: "error", message: (e as Error).message };
  }
}

export async function updateLineAction(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<CartResult> {
  if (!isShopifyConfigured()) return unconfigured();
  try {
    const cart =
      quantity <= 0 ? await removeLine(cartId, lineId) : await updateLine(cartId, lineId, quantity);
    return cart ? { ok: true, cart } : { ok: false, reason: "error" };
  } catch (e) {
    return { ok: false, reason: "error", message: (e as Error).message };
  }
}

export async function removeLineAction(cartId: string, lineId: string): Promise<CartResult> {
  if (!isShopifyConfigured()) return unconfigured();
  try {
    const cart = await removeLine(cartId, lineId);
    return cart ? { ok: true, cart } : { ok: false, reason: "error" };
  } catch (e) {
    return { ok: false, reason: "error", message: (e as Error).message };
  }
}

/** Re-hydrate a stored cart on load. */
export async function refreshCartAction(cartId: string): Promise<CartResult> {
  if (!isShopifyConfigured()) return unconfigured();
  try {
    const cart = await fetchCart(cartId);
    return cart ? { ok: true, cart } : { ok: false, reason: "error" };
  } catch (e) {
    return { ok: false, reason: "error", message: (e as Error).message };
  }
}
