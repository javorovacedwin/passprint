"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import {
  addToCartAction,
  refreshCartAction,
  removeLineAction,
  updateLineAction,
} from "@/app/cart-actions";
import type { Cart } from "@/lib/shopify/cart-types";

const STORAGE_KEY = "passprint-cart-id";

type Availability = "unknown" | "ready" | "unconfigured";

interface CartContextValue {
  cart: Cart | null;
  count: number;
  open: boolean;
  pending: boolean;
  /** Whether Shopify commerce is wired up (Storefront token present). */
  availability: Availability;
  openCart: () => void;
  closeCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  enabled,
}: {
  children: ReactNode;
  /** Whether the Storefront token is configured (known on the server). */
  enabled: boolean;
}) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState<Availability>(
    enabled ? "ready" : "unconfigured"
  );
  const [pending, startTransition] = useTransition();
  const cartId = useRef<string | null>(null);

  const persist = useCallback((next: Cart | null) => {
    setCart(next);
    cartId.current = next?.id ?? null;
    if (next?.id) window.localStorage.setItem(STORAGE_KEY, next.id);
    else window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Rehydrate a stored cart on first load.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    cartId.current = stored;
    refreshCartAction(stored).then((res) => {
      if (res.ok) {
        setCart(res.cart);
        setAvailability("ready");
      } else if (res.reason === "unconfigured") {
        setAvailability("unconfigured");
      } else {
        // Cart expired or errored — clear the stale id.
        window.localStorage.removeItem(STORAGE_KEY);
        cartId.current = null;
      }
    });
  }, []);

  const addItem = useCallback(
    (merchandiseId: string, quantity = 1) => {
      startTransition(async () => {
        const res = await addToCartAction(cartId.current, merchandiseId, quantity);
        if (res.ok) {
          persist(res.cart);
          setAvailability("ready");
          setOpen(true);
        } else {
          setAvailability(res.reason === "unconfigured" ? "unconfigured" : "ready");
        }
      });
    },
    [persist]
  );

  const setQuantity = useCallback(
    (lineId: string, quantity: number) => {
      if (!cartId.current) return;
      startTransition(async () => {
        const res = await updateLineAction(cartId.current!, lineId, quantity);
        if (res.ok) persist(res.cart);
      });
    },
    [persist]
  );

  const removeItem = useCallback(
    (lineId: string) => {
      if (!cartId.current) return;
      startTransition(async () => {
        const res = await removeLineAction(cartId.current!, lineId);
        if (res.ok) persist(res.cart);
      });
    },
    [persist]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      count: cart?.totalQuantity ?? 0,
      open,
      pending,
      availability,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      addItem,
      setQuantity,
      removeItem,
    }),
    [cart, open, pending, availability, addItem, setQuantity, removeItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}
