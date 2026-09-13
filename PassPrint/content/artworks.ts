import { formatPrice, studioPrintPrice, type Money } from "./pricing";
import type { StudioWork, StudioWorkOption } from "./types";

/*
  ────────────────────────────────────────────────────────────────────────
  STUDIO WORKS — paintings sold outside the monthly cycle
  ────────────────────────────────────────────────────────────────────────

  These are real photographs of real paintings, not placeholders: the first
  original images on the site. They are sold three ways — the original, an
  A3 giclée or an A4 giclée — and are deliberately kept separate from the
  twelve monthly editions so the subscription proposition stays clean.

  TODO before launch, all three flagged in the data below:
    · confirm the medium of each painting (read from the surface, not told)
    · measure both canvases — `dimensions: null` makes the site say
      "dimensions on request" rather than print a size that may be wrong
    · set the original prices, and fill in the Shopify variant ids so the
      buy panel stops saying "available soon"

  Never invent provenance here. What is written below is only what can be
  seen in the picture.
*/

/** PLACEHOLDER. One-off price per painting; confirm with the artist. */
const originalPrice: Record<string, Money> = {
  "house-with-the-olive-tree": { amount: 650, currency: "EUR" },
  "the-halt": { amount: 520, currency: "EUR" },
};

function optionsFor(slug: string): StudioWorkOption[] {
  return [
    {
      id: "original",
      label: "The original",
      detail: "The painting itself — one only, signed",
      price: formatPrice(originalPrice[slug]),
      variantId: null,
      available: true,
    },
    {
      id: "print-a3",
      label: "Print · A3",
      detail: "Giclée, 29.7 × 42 cm, edition of 50",
      price: formatPrice(studioPrintPrice.a3),
      variantId: null,
      available: true,
    },
    {
      id: "print-a4",
      label: "Print · A4",
      detail: "Giclée, 21 × 29.7 cm, edition of 50",
      price: formatPrice(studioPrintPrice.a4),
      variantId: null,
      available: true,
    },
  ];
}

export const studioWorks: StudioWork[] = [
  {
    slug: "house-with-the-olive-tree",
    title: "House with the olive tree",
    // TODO: confirm — read as acrylic from the surface, not stated by the artist.
    medium: "Acrylic on canvas board",
    dimensions: null,
    note: "Tiled eaves over a shuttered balcony, and worn steps up to an arched blue door. The olive tree carries most of the picture; the house is what is left of the square behind it.",
    image: {
      src: "/artworks/house-with-the-olive-tree.jpg",
      width: 1486,
      height: 2048,
      alt: "Painting of a two-storey house with pale render and a terracotta tiled roof. A wooden balcony with blue shutters sits above an arched blue door reached by worn stone steps. An old olive tree with a twisting trunk fills the left of the picture.",
    },
    options: optionsFor("house-with-the-olive-tree"),
  },
  {
    slug: "the-halt",
    title: "The halt",
    // TODO: confirm — reads as oil and charcoal on board.
    medium: "Oil and charcoal on board",
    dimensions: null,
    note: "Two figures in white robes stopped in open country under a pale sky: one at prayer on a mat, one kneeling beside a low shelter, a rifle laid on the ground in front of them. Painted thin, in greys and bone-white, with the horizon drawn rather than painted.",
    image: {
      src: "/artworks/the-halt.jpg",
      width: 2048,
      height: 1348,
      alt: "Painting in muted greys and bone-white of two robed figures halted in flat open country. One kneels forward on a mat, the other sits upright beside a dark low shelter. A rifle lies on the ground in the foreground and low hills are drawn in charcoal along the horizon.",
    },
    options: optionsFor("the-halt"),
  },
];
