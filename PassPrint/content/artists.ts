import type { Artist } from "./types";

/*
  All twelve editions are made by one artist, Bakir C., a painter from
  Novi Pazar. Kept deliberately short: the artist asked for less text and
  nothing about his family.

  TODO: replace the portrait and studio placeholders with real photographs
  (public/artists/bakir-c_portrait.jpg, …). Confirm the biography with Bakir
  before launch. Never use an AI-generated face here.
*/

export const artists: Artist[] = [
  {
    slug: "bakir-c",
    name: "Bakir C.",
    role: "Painter",
    city: "Novi Pazar",
    country: "Serbia",
    technique: "Oil and acrylic on canvas",
    standfirst:
      "Bakir C. is a painter from Novi Pazar. He paints streets, trees, water and old photographs — in oil, often with a palette knife, and in thin layered acrylic.",
    // No quote: we only print words the artist has actually said.
    quote: "",
    biography: [
      "Bakir Ćosović — Bakir C. on every work he signs — was born in Novi Pazar in the last years of Yugoslavia, and paints there.",
      "He is the sole artist behind PassPrint's first collection: twelve monthly editions, twelve cities across six countries that used to be one, made over a year by the same hand.",
    ],
    philosophy: [],
    process: [],
    studio: "A studio in Novi Pazar.",
    materials: [],
    inspiration: [],
    connection: "",
    featuredWorks: [
      // Edition names are withheld until each is announced — see conceal() in content/collections.ts.
      { editionCode: "YU-01", title: "Coming soon", subject: "October 2026", technique: "Screen print, two layers" },
      { editionCode: "YU-02", title: "Coming soon", subject: "November 2026", technique: "Giclée" },
      { editionCode: "YU-03", title: "Coming soon", subject: "December 2026", technique: "Screen print" },
    ],
    collectionCodes: ["COLLECTION 01"],
  },
];

export function artistBySlug(slug: string | null): Artist | undefined {
  if (!slug) return undefined;
  return artists.find((a) => a.slug === slug);
}

/** The artist behind the collection. */
export const leadArtist: Artist = artists[0];
