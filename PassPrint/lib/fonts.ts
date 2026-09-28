import { Cormorant_Garamond, Jost } from "next/font/google";

/*
  Two voices, self-hosted by next/font at build time: a fine Garamond for
  titles and a quiet geometric sans for text, labels and prices.
  latin-ext is mandatory: place names carry č ć š ž đ.
*/

export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});
