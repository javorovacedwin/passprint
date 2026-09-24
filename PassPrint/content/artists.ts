import type { Artist } from "./types";

/*
  All twelve editions of Yugo are made by one artist, Bakir C. — not because
  one person can plausibly live in twelve cities, but because his own family
  already does. Yugo is built on that fact: he is not a tourist in most of
  these places, because he has a real reason to be there that predates the
  collection.

  TODO: replace the portrait and studio placeholders with real photographs
  (public/artists/bakir-c_portrait.jpg, …). Confirm the biography with Bakir
  before launch. Never use an AI-generated face here.
*/

export const artists: Artist[] = [
  {
    slug: "bakir-c",
    name: "Bakir C.",
    role: "Artist, Yugo — Collection 01",
    city: "Novi Pazar",
    country: "Serbia",
    technique: "Drawing, screen print and giclée",
    standfirst:
      "Born in Novi Pazar to a family scattered across six countries that used to be one, Bakir C. draws the cities where he still has cousins, not the ones he had to look up.",
    quote:
      "People ask which side of the border my family is from. Wrong question — we're from all of them. My grandmother's sisters ended up in Ljubljana, Skopje and Novi Sad, and none of them stopped being family. That's the collection: not a region split six ways, but one house with six doors.",
    biography: [
      "Bakir Ćosović — Bakir C. on every card he signs — was born in Novi Pazar in the last years of Yugoslavia. His extended family, like millions of others, was scattered by the wars that followed: aunts, cousins and in-laws ended up in Zagreb, Ljubljana, Belgrade, Skopje and Podgorica, in cities that had all, a few years earlier, shared one passport.",
      "He is the sole artist behind Yugo, PassPrint's launch collection: twelve monthly editions, twelve cities across six countries that used to be one, drawn over a year by the same hand.",
      "His work is quiet and exact. He is less interested in flags and borders than in what these cities still share: the shape of a courtyard, the pitch of a roof, a bazaar street, a fortress wall built by one empire and finished by the next. He draws the family resemblance the region's recent history worked hard to deny.",
    ],
    philosophy: [
      "A border is a line on paper; a street is not. Bakir draws the second kind — the courtyards, bazaars and bridges that look like each other from Ljubljana to Skopje, because for most of the last century they were built, taxed and lived in by the same country.",
      "He works against the postcard and against the news report in equal measure — against the single famous angle, and against the idea that these places are defined by the 1990s. Both flatten a place; his drawings do the opposite.",
      "Above all, the collection is meant as a corrective: twelve cities chosen not for how different their people are, but for how much, underneath the years that pulled them apart, they still look like siblings.",
    ],
    process: [
      "Each edition begins with a visit — often to family. Bakir stays with relatives where he still has them, walks the subject at different hours, and sketches and photographs before he draws anything.",
      "The drawing is built by hand — line first, then the two colour layers that become the print. He keeps the palette deliberately narrow, usually the collection's rust accent over ink on warm paper, so the composition, not the colour, carries the work.",
      "Only then does it go to print. He proofs on the final stock, adjusts the registration by eye, and signs off the run himself before every copy is numbered by hand.",
    ],
    studio:
      "A studio in Novi Pazar, doubling this year as the base for a research trip that will pass through all six countries before it's done.",
    materials: [
      "Ink and pencil for the original drawing",
      "A two-layer approach: the collection accent over ink",
      "Premium heavyweight uncoated stock, matte",
      "Giclée pigment and screen print, depending on the edition",
    ],
    inspiration: [
      "Ottoman and Austro-Hungarian architecture, side by side in the same street",
      "The spomeniks — Yugoslavia's shared, secular war memorials",
      "Family photographs from before 1991",
      "A single Yugoslav passport, kept by his grandmother",
    ],
    connection:
      "Bakir is not a tourist in most of these twelve cities. He has a grandmother's sister in Ljubljana, a cousin's family in Skopje, in-laws in Novi Sad — reasons to go that have nothing to do with drawing, which is exactly why the drawing works.",
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
