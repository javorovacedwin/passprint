export interface CartMoney {
  amount: string;
  currencyCode: string;
}

export interface CartLine {
  id: string;
  quantity: number;
  /** Product title. */
  title: string;
  /** Variant title (e.g. "Default Title" or a size). */
  variantTitle: string;
  handle: string;
  merchandiseId: string;
  price: CartMoney;
  /** The subscription this line renews on, e.g. "Delivered every month". */
  sellingPlan: string | null;
}

export interface Cart {
  id: string;
  /** Shopify-hosted checkout URL. */
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: CartMoney;
  lines: CartLine[];
}

/** Result shape returned by every cart server action. */
export type CartResult =
  | { ok: true; cart: Cart }
  | { ok: false; reason: "unconfigured" | "error"; message?: string };
