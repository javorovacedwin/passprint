"use client";

import { useId, useState } from "react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { StudioWorkOption } from "@/content/types";

/** Choose a size, see its price, add it to the cart. */
export function PrintBuyPanel({ options }: { options: StudioWorkOption[] }) {
  const [selected, setSelected] = useState(options[0]);
  const name = useId();

  return (
    <fieldset>
      <legend className="mono-label">Size</legend>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((option) => {
          const active = option.id === selected.id;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer flex-col items-center gap-1 border px-3 py-4 text-center transition-colors duration-[var(--duration-ui)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt ${
                active ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink/60"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={active}
                onChange={() => setSelected(option)}
                className="sr-only"
              />
              <span className="font-serif-display text-xl">{option.label}</span>
              <span className={`text-[0.66rem] tracking-[0.06em] ${active ? "text-paper/70" : "text-pencil"}`}>
                {option.detail}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-hairline-soft pt-8">
        <p className="font-serif-display text-[2.2rem] leading-none" aria-live="polite">
          {selected.price}
        </p>
        <AddToCartButton
          variantId={selected.variantId}
          available={selected.available}
          label="Add to cart"
          className="min-w-[14rem]"
        />
      </div>
    </fieldset>
  );
}
