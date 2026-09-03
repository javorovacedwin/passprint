import type { Artist } from "./types";

/*
  Collection 01 is made entirely by one artist, Bakir C., who is also the
  Creative Director of PassPrint. The profile below is written to read like
  an artist page in a gallery or museum: grounded, elegant, believable. No
  invented prizes, no inflated claims — the story is his relationship to
  Novi Pazar and how he draws it.

  TODO: replace the portrait and studio placeholders with real photographs
  (public/artists/bakir-c_portrait.jpg, …). Confirm the biography with Bakir
  before launch. Never use an AI-generated face here.
*/

export const artists: Artist[] = [
  {
    slug: "bakir-c",
    name: "Bakir C.",
    role: "Creative Director, PassPrint",
    city: "Novi Pazar",
    country: "Serbia",
    technique: "Drawing, screen print and giclée",
    standfirst:
      "Born and working in Novi Pazar, Bakir C. draws the city he has known his whole life — and directs the visual identity of PassPrint.",
    quote:
      "I am not showing you the famous view, because there isn't one. I am showing you the doorway you would walk past, the pattern on the door, the light at five o'clock. That is the city I know.",
    biography: [
      "Bakir C. was born in Novi Pazar and has lived and worked there for most of his life. He studied art and design, spent time away, and came back — a decision that sits at the centre of his work. He draws the place he is from, for people who want to understand it rather than just look at it.",
      "As Creative Director of PassPrint, he is responsible for the whole visual language of the first collection: every main print, every companion study, the way the story cards are set, and the colour of the envelope. Twelve editions, one hand.",
      "His work is quiet and exact. He is less interested in monuments than in what surrounds them — the street that leads to the fortress, the shadow under an arch, the wear on a threshold that thousands of feet have crossed. He treats an ordinary courtyard with the same attention another artist might give a cathedral.",
    ],
    philosophy: [
      "A place is not its landmarks. It is the small, repeated things that the people who live there stop noticing — and those are the things Bakir chooses to draw.",
      "He works against the postcard. Where a photographer looks for the single famous angle, he looks for the angle you actually stand at: too close, slightly off, honest.",
      "Above all, the work is meant to preserve local identity without freezing it. Novi Pazar is a living city, not a museum, and the drawings are contemporary — traditional in their subject, modern in their line.",
    ],
    process: [
      "Each edition begins on foot. Bakir walks the subject at different hours and in different weather before he draws anything, photographing and sketching, waiting for the light he wants.",
      "The drawing is built by hand — line first, then the two colour layers that will become the print. He keeps the palette deliberately narrow, usually the collection's single accent against ink on warm paper, so the composition, not the colour, carries the work.",
      "Only then does it go to print. He proofs on the final stock, adjusts the registration by eye, and signs off the run himself before every copy is numbered by hand.",
    ],
    studio:
      "A small studio a few streets from the old bazaar, with north light and a flat file that is slowly filling with the collection. Most of what he draws is within walking distance of the door.",
    materials: [
      "Ink and pencil for the original drawing",
      "A two-layer approach: the collection accent over ink",
      "Premium heavyweight uncoated stock, matte",
      "Giclée pigment and screen print, depending on the edition",
    ],
    inspiration: [
      "The čaršija and its coppersmiths",
      "Ottoman domestic architecture — courtyards, eaves, carved doors",
      "The frescoes and stonework at Sopoćani and Đurđevi stupovi",
      "Filigree and textile patterns handed down through families",
      "Late-afternoon light on worked stone",
    ],
    connection:
      "Bakir is not a visitor drawing Novi Pazar from the outside. He was born there, his family is there, and the places he draws are the places he grew up in. That is the difference the whole collection rests on.",
    featuredWorks: [
      { editionCode: "NP-01", title: "Gradina", subject: "The fortress", technique: "Screen print, two layers" },
      { editionCode: "NP-02", title: "Altun-alem", subject: "The mosque", technique: "Giclée" },
      { editionCode: "NP-03", title: "Stara čaršija", subject: "The old bazaar", technique: "Screen print" },
    ],
    collectionCodes: ["COLLECTION 01"],
  },
];

export function artistBySlug(slug: string | null): Artist | undefined {
  if (!slug) return undefined;
  return artists.find((a) => a.slug === slug);
}

/** The artist directing the current collection. */
export const leadArtist: Artist = artists[0];
