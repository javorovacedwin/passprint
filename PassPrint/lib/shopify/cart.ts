// This module is only ever imported by the "use server" actions in
// app/cart-actions.ts, and it reads the Storefront token from server-side
// env (no NEXT_PUBLIC_ prefix), so the token never reaches the client bundle.
import { isShopifyConfigured, shopifyFetch } from "./client";
import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
  CART_QUERY,
} from "./queries";
import type { Cart, CartLine } from "./cart-types";

/*
  Server-only cart operations against the Storefront API. These are called
  from server actions (app/cart-actions.ts); the Storefront token is read
  from the environment here and never crosses to the client.
*/

interface RawCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
  lines: {
    nodes: Array<{
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        product: { title: string; handle: string };
      };
    }>;
  };
}

interface CartMutationResult {
  cart: RawCart | null;
  userErrors: Array<{ field: string[]; message: string }>;
}

function mapCart(raw: RawCart): Cart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    subtotal: raw.cost.subtotalAmount,
    lines: raw.lines.nodes.map(
      (n): CartLine => ({
        id: n.id,
        quantity: n.quantity,
        title: n.merchandise.product.title,
        variantTitle: n.merchandise.title,
        handle: n.merchandise.product.handle,
        merchandiseId: n.merchandise.id,
        price: n.merchandise.price,
      })
    ),
  };
}

/** Cart operations never cache — they are per-shopper and mutate. */
const NO_CACHE = 0;

export { isShopifyConfigured };

export async function createCart(merchandiseId: string, quantity: number): Promise<Cart | null> {
  const data = await shopifyFetch<{ cartCreate: CartMutationResult }>({
    query: CART_CREATE,
    variables: { lines: [{ merchandiseId, quantity }] },
    revalidate: NO_CACHE,
  });
  const raw = data?.cartCreate.cart;
  return raw ? mapCart(raw) : null;
}

export async function addLine(
  cartId: string,
  merchandiseId: string,
  quantity: number
): Promise<Cart | null> {
  const data = await shopifyFetch<{ cartLinesAdd: CartMutationResult }>({
    query: CART_LINES_ADD,
    variables: { cartId, lines: [{ merchandiseId, quantity }] },
    revalidate: NO_CACHE,
  });
  const raw = data?.cartLinesAdd.cart;
  return raw ? mapCart(raw) : null;
}

export async function updateLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart | null> {
  const data = await shopifyFetch<{ cartLinesUpdate: CartMutationResult }>({
    query: CART_LINES_UPDATE,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
    revalidate: NO_CACHE,
  });
  const raw = data?.cartLinesUpdate.cart;
  return raw ? mapCart(raw) : null;
}

export async function removeLine(cartId: string, lineId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cartLinesRemove: CartMutationResult }>({
    query: CART_LINES_REMOVE,
    variables: { cartId, lineIds: [lineId] },
    revalidate: NO_CACHE,
  });
  const raw = data?.cartLinesRemove.cart;
  return raw ? mapCart(raw) : null;
}

/** Re-fetch a cart by id (e.g. on page load). Returns null if it expired. */
export async function fetchCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>({
    query: CART_QUERY,
    variables: { id: cartId },
    revalidate: NO_CACHE,
  });
  const raw = data?.cart;
  return raw ? mapCart(raw) : null;
}
