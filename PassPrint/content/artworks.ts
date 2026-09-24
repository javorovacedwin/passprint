import { formatPrice, studioPrintPrice, type Money } from "./pricing";
import type { StudioWork, StudioWorkOption } from "./types";

/*
  ────────────────────────────────────────────────────────────────────────
  STUDIO WORKS — paintings sold outside the monthly cycle
  ────────────────────────────────────────────────────────────────────────

  These are real photographs of real paintings, not placeholders. They are
  sold as the original or as a print in A3, A4, A5 or A6 — and are
  deliberately kept separate from the twelve monthly editions so the
  subscription proposition stays clean.

  TODO before launch, all flagged in the data below:
    · confirm the medium of each painting (read from the surface, not told)
    · measure every canvas — `dimensions: null` makes the site say
      "dimensions on request" rather than print a size that may be wrong
    · set the original prices, and fill in the Shopify variant ids so the
      buy panel stops saying "available soon"
    · "Two Boats, One Horizon" is our placeholder title for the painting
      Bakir filed as "Unknown name" — confirm he's happy with it, or ask
      him for the real one

  Never invent provenance here. What is written below is only what can be
  seen in the picture.
*/

/** PLACEHOLDER. One-off price per painting; confirm with the artist. */
const originalPrice: Record<string, Money> = {
  "casting-shadows": { amount: 650, currency: "EUR" },
  "desert-desires": { amount: 520, currency: "EUR" },
  "into-the-unknown": { amount: 480, currency: "EUR" },
  "pieces-of-a-dream": { amount: 720, currency: "EUR" },
  "where-the-light-falls": { amount: 460, currency: "EUR" },
  "two-boats-one-horizon": { amount: 540, currency: "EUR" },
  "whispers-of-light": { amount: 560, currency: "EUR" },
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
      detail: "29.7 × 42 cm, edition of 50",
      price: formatPrice(studioPrintPrice.a3),
      variantId: null,
      available: true,
    },
    {
      id: "print-a4",
      label: "Print · A4",
      detail: "21 × 29.7 cm, edition of 50",
      price: formatPrice(studioPrintPrice.a4),
      variantId: null,
      available: true,
    },
    {
      id: "print-a5",
      label: "Print · A5",
      detail: "14.8 × 21 cm, edition of 50",
      price: formatPrice(studioPrintPrice.a5),
      variantId: null,
      available: true,
    },
    {
      id: "print-a6",
      label: "Print · A6",
      detail: "10.5 × 14.8 cm, edition of 50",
      price: formatPrice(studioPrintPrice.a6),
      variantId: null,
      available: true,
    },
  ];
}

export const studioWorks: StudioWork[] = [
  {
    slug: "casting-shadows",
    title: "Casting Shadows",
    // TODO: confirm — reads as acrylic from the surface, not stated by the artist.
    medium: "Acrylic on canvas board",
    dimensions: null,
    note: "Tiled eaves over a shuttered balcony, and worn steps up to an arched blue door. The olive tree carries most of the picture; the house is what is left of the square behind it.",
    image: {
      src: "/artworks/CastingShadows.jpg",
      width: 1486,
      height: 2048,
      alt: "Painting of a two-storey house with pale render and a terracotta tiled roof. A wooden balcony with blue shutters sits above an arched blue door reached by worn stone steps. An old olive tree with a twisting trunk fills the left of the picture.",
    },
    options: optionsFor("casting-shadows"),
  },
  {
    slug: "desert-desires",
    title: "Desert Desires",
    // TODO: confirm — reads as oil and charcoal on board.
    medium: "Oil and charcoal on board",
    dimensions: null,
    note: "Two figures in white robes stopped in open country under a pale sky: one at prayer on a mat, one kneeling beside a low shelter, a rifle laid on the ground in front of them. Painted thin, in greys and bone-white, with the horizon drawn rather than painted.",
    image: {
      src: "/artworks/DesertDesires.jpg",
      width: 2048,
      height: 1348,
      alt: "Painting in muted greys and bone-white of two robed figures halted in flat open country. One kneels forward on a mat, the other sits upright beside a dark low shelter. A rifle lies on the ground in the foreground and low hills are drawn in charcoal along the horizon.",
    },
    options: optionsFor("desert-desires"),
  },
  {
    slug: "into-the-unknown",
    title: "Into the Unknown",
    // TODO: confirm — thick, ridged paint suggests oil applied with a palette knife.
    medium: "Oil on canvas, palette knife",
    dimensions: null,
    note: "A dark mountain ridge under a pale sky, seen past a foreground of wind-bent pines and a scatter of small purple flowers. Laid in with a palette knife in thick, blocky strokes rather than blended — the mountain reads as one flat plane of blue-grey.",
    image: {
      src: "/artworks/IntoTheUnknown.jpeg",
      width: 1948,
      height: 1484,
      alt: "Palette-knife oil painting of a dark blue-grey mountain ridge under a pale sky, framed by wind-bent pine trees on the right and a foreground scattered with small purple flowers and pale stones.",
    },
    options: optionsFor("into-the-unknown"),
  },
  {
    slug: "pieces-of-a-dream",
    title: "Pieces of a Dream",
    // TODO: confirm medium — thin, layered paint over visible canvas weave.
    medium: "Acrylic on canvas",
    dimensions: null,
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
    // TODO: confirm — same heavy, ridged palette-knife handling as "Into the Unknown".
    medium: "Oil on canvas, palette knife",
    dimensions: null,
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
    slug: "two-boats-one-horizon",
    // TODO: this is a placeholder title for the file Bakir sent as "Unknown
    // name" — he asked us to name it. Confirm he's happy with it before print.
    title: "Two Boats, One Horizon",
    // TODO: confirm medium — smooth, blended gradients suggest oil or thinned acrylic.
    medium: "Acrylic on canvas",
    dimensions: null,
    note: "Two wooden fishing boats ride at anchor side by side, their sails down, hulls turned toward each other across a strip of gold reflected light. Behind them a mosque's dome and twin minarets stand in silhouette against a sunrise breaking through cloud.",
    image: {
      src: "/artworks/TwoBoatsOneHorizon.jpeg",
      width: 2048,
      height: 1410,
      alt: "Painting of two wooden sailing boats at anchor side by side on calm water, sails lowered, with a mosque's dome and two minarets silhouetted against a golden sunrise and gulls overhead.",
    },
    options: optionsFor("two-boats-one-horizon"),
  },
  {
    slug: "whispers-of-light",
    title: "Whispers of Light",
    // TODO: confirm — smooth sepia-toned surface, consistent with oil glazing.
    medium: "Oil on canvas, sepia monochrome",
    dimensions: null,
    note: "A quiet crossroads of whitewashed, timber-shuttered houses under a minaret rising behind the rooftops, rendered entirely in sepia tones like an old photograph. The street is empty; a bare tree and a low stone wall are the only things breaking the row of walls and tiled roofs.",
    image: {
      src: "/artworks/WhispersOfLight.jpeg",
      width: 2018,
      height: 1493,
      alt: "Sepia-toned painting of a quiet street corner between whitewashed, timber-shuttered houses with tiled roofs, a slender minaret rising behind them and a bare tree beside a low stone wall.",
    },
    options: optionsFor("whispers-of-light"),
  },
];
