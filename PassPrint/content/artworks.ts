import { formatPrice, studioPrintPrice, type Money } from "./pricing";
import type { StudioWork, StudioWorkOption } from "./types";

/*
  ────────────────────────────────────────────────────────────────────────
  STUDIO WORKS — the paintings, and the prints made from them
  ────────────────────────────────────────────────────────────────────────

  These are real photographs of real paintings, not placeholders. Every
  original is sold; each painting is still available as a print in A3, A4,
  A5 or A6, edition of 50 per size, numbered by hand.

  The prints are Shopify products (tag `print`, one per painting, a Size
  option A3–A6). Their variant ids are below, in size order.

  Never invent provenance here. What is written below is only what can be
  seen in the picture.
*/

const MEDIUM = "Acrylic on canvas, hand-painted";

/** Canvas size of each original, width × height in cm. */
const size: Record<string, string> = {
  "casing-shadows": "20 × 30 cm",
  "desert-desires": "90 × 60 cm",
  "into-the-unknown": "20 × 30 cm",
  "pieces-of-a-dream": "25 × 35 cm",
  "where-the-light-falls": "50 × 50 cm",
  "golden-hour": "40 × 50 cm",
  "fading-memories": "80 × 60 cm",
};

/** One-off price per original, set by canvas size. Kept for the record; all are sold. */
const originalPrice: Record<string, Money> = {
  "casing-shadows": { amount: 290, currency: "EUR" },
  "into-the-unknown": { amount: 290, currency: "EUR" },
  "pieces-of-a-dream": { amount: 350, currency: "EUR" },
  "golden-hour": { amount: 590, currency: "EUR" },
  "where-the-light-falls": { amount: 690, currency: "EUR" },
  "fading-memories": { amount: 990, currency: "EUR" },
  "desert-desires": { amount: 1150, currency: "EUR" },
};

/** Shopify variant ids of each print, in the order A3, A4, A5, A6. */
const printVariants: Record<string, [string, string, string, string]> = {
  "casing-shadows": ["50529691205851", "50529691238619", "50529691271387", "50529691304155"],
  "desert-desires": ["50529692516571", "50529692549339", "50529692582107", "50529692614875"],
  "into-the-unknown": ["50529692745947", "50529692778715", "50529692811483", "50529692844251"],
  "pieces-of-a-dream": ["50529692942555", "50529692975323", "50529693008091", "50529693040859"],
  "where-the-light-falls": ["50529693139163", "50529693171931", "50529693204699", "50529693237467"],
  "golden-hour": ["50529693335771", "50529693368539", "50529693401307", "50529693434075"],
  "fading-memories": ["50529693532379", "50529693565147", "50529693597915", "50529693630683"],
};

const printSizes = [
  { id: "print-a3", label: "A3", detail: "29.7 × 42 cm", price: studioPrintPrice.a3 },
  { id: "print-a4", label: "A4", detail: "21 × 29.7 cm", price: studioPrintPrice.a4 },
  { id: "print-a5", label: "A5", detail: "14.8 × 21 cm", price: studioPrintPrice.a5 },
  { id: "print-a6", label: "A6", detail: "10.5 × 14.8 cm", price: studioPrintPrice.a6 },
] as const;

function optionsFor(slug: string): StudioWorkOption[] {
  return [
    {
      id: "original",
      label: "The original",
      detail: `The painting itself — ${size[slug]}, acrylic on canvas, signed`,
      price: formatPrice(originalPrice[slug]),
      variantId: null,
      available: false,
    },
    ...printSizes.map((p, i) => ({
      id: p.id,
      label: p.label,
      detail: p.detail,
      price: formatPrice(p.price),
      variantId: `gid://shopify/ProductVariant/${printVariants[slug][i]}`,
      available: true,
    })),
  ];
}

/** The print sizes of a work, without the original. */
export const printOptions = (work: StudioWork) =>
  work.options.filter((o) => o.id !== "original");

/** What the original sold for, e.g. "€290". */
export const soldPrice = (work: StudioWork) =>
  work.options.find((o) => o.id === "original")?.price ?? "";

export const workBySlug = (slug: string) => studioWorks.find((w) => w.slug === slug);

export const studioWorks: StudioWork[] = [
  {
    slug: "casing-shadows",
    title: "Casing Shadows",
    medium: MEDIUM,
    dimensions: size["casing-shadows"],
    note: "Tiled eaves over a shuttered balcony, and worn steps up to an arched blue door. The olive tree carries most of the picture; the house is what is left of the square behind it.",
    image: {
      src: "/artworks/CastingShadows.jpg",
      width: 1486,
      height: 2048,
      alt: "Painting of a two-storey house with pale render and a terracotta tiled roof. A wooden balcony with blue shutters sits above an arched blue door reached by worn stone steps. An old olive tree with a twisting trunk fills the left of the picture.",
    },
    options: optionsFor("casing-shadows"),
  },
  {
    slug: "desert-desires",
    title: "Desert Desires",
    medium: MEDIUM,
    dimensions: size["desert-desires"],
    note: "Two figures in white robes stopped in open country under a pale sky: one at prayer on a mat, one kneeling beside a low shelter, a rifle laid on the ground in front of them. Painted thin, in greys and bone-white.",
    image: {
      src: "/artworks/DesertDesires.jpg",
      width: 2048,
      height: 1348,
      alt: "Painting in muted greys and bone-white of two robed figures halted in flat open country. One kneels forward on a mat, the other sits upright beside a dark low shelter. A rifle lies on the ground in the foreground and low hills run along the horizon.",
    },
    options: optionsFor("desert-desires"),
  },
  {
    slug: "into-the-unknown",
    title: "Into the Unknown",
    medium: MEDIUM,
    dimensions: size["into-the-unknown"],
    note: "A dark mountain ridge under a pale sky, seen past a foreground of wind-bent pines and a scatter of small purple flowers. Laid in with a palette knife in thick, blocky strokes rather than blended — the mountain reads as one flat plane of blue-grey.",
    image: {
      src: "/artworks/IntoTheUnknown.jpeg",
      width: 1948,
      height: 1484,
      alt: "Palette-knife painting of a dark blue-grey mountain ridge under a pale sky, framed by wind-bent pine trees on the right and a foreground scattered with small purple flowers and pale stones.",
    },
    options: optionsFor("into-the-unknown"),
  },
  {
    slug: "pieces-of-a-dream",
    title: "Pieces of a Dream",
    medium: MEDIUM,
    dimensions: size["pieces-of-a-dream"],
    note: "A flock of pigeons startles up around a carved stone column and archway, over a group of figures in old-fashioned dress feeding them from the ground — bonnets, shawls, a boy in a red jacket, a girl in a white dress. Painted in muted greys and blue-black, closer to a photograph's tonal range than to daylight colour.",
    image: {
      src: "/artworks/PiecesOfADream.jpeg",
      width: 1212,
      height: 1481,
      alt: "Painting in muted grey and blue-black tones of a flock of pigeons flying up around an ornately carved stone column and archway, above a group of people in old-fashioned dress — bonnets, shawls, a boy in a red jacket, a girl in a white dress — crouched feeding the birds on the ground.",
    },
    options: optionsFor("pieces-of-a-dream"),
  },
  {
    slug: "where-the-light-falls",
    title: "Where the Light Falls",
    medium: MEDIUM,
    dimensions: size["where-the-light-falls"],
    note: "Looking straight up through the branches of an old tree, its pale trunk forking directly overhead against patches of blue sky. The canopy is built with loaded, palette-knife strokes of green rather than individual leaves.",
    image: {
      src: "/artworks/WhereTheLightFalls.jpeg",
      width: 1684,
      height: 1714,
      alt: "Painting looking directly up through the branches of a large tree, its pale trunk forking overhead against a blue sky broken up by dense green foliage rendered in thick palette-knife strokes.",
    },
    options: optionsFor("where-the-light-falls"),
  },
  {
    slug: "golden-hour",
    title: "Golden Hour",
    medium: MEDIUM,
    dimensions: size["golden-hour"],
    note: "Two wooden fishing boats ride at anchor side by side, their sails down, hulls turned toward each other across a strip of gold reflected light. Behind them a mosque's dome and twin minarets stand in silhouette against a sunrise breaking through cloud.",
    image: {
      src: "/artworks/TwoBoatsOneHorizon.jpeg",
      width: 2048,
      height: 1410,
      alt: "Painting of two wooden sailing boats at anchor side by side on calm water, sails lowered, with a mosque's dome and two minarets silhouetted against a golden sunrise and gulls overhead.",
    },
    options: optionsFor("golden-hour"),
  },
  {
    slug: "fading-memories",
    title: "Fading Memories",
    medium: MEDIUM,
    dimensions: size["fading-memories"],
    note: "A quiet crossroads of whitewashed, timber-shuttered houses under a minaret rising behind the rooftops, rendered entirely in sepia tones like an old photograph. The street is empty; a bare tree and a low stone wall are the only things breaking the row of walls and tiled roofs.",
    image: {
      src: "/artworks/WhispersOfLight.jpeg",
      width: 2018,
      height: 1493,
      alt: "Sepia-toned painting of a quiet street corner between whitewashed, timber-shuttered houses with tiled roofs, a slender minaret rising behind them and a bare tree beside a low stone wall.",
    },
    options: optionsFor("fading-memories"),
  },
];
