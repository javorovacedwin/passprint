import type { Artist } from "./types";

/*
  Each edition of The Balkan Collection is made by an artist who actually
  lives in the city it depicts — that is the whole premise, so one person
  cannot make all twelve. The launch edition, BAL-01 in Mostar, is made by
  Ajla M. Artists for BAL-04 onward are cast city by city and announced with
  their edition; until then their editions carry `artistSlug: null`.

  TODO: replace the portrait and studio placeholders with real photographs
  (public/artists/ajla-m_portrait.jpg, …). Confirm the biography with Ajla
  before launch. Never use an AI-generated face here.
*/

export const artists: Artist[] = [
  {
    slug: "ajla-m",
    name: "Ajla M.",
    role: "Launch artist, BAL-01",
    city: "Mostar",
    country: "Bosnia and Herzegovina",
    technique: "Drawing, screen print and giclée",
    standfirst:
      "Born and working in Mostar, on the bank of the Neretva, Ajla M. draws the bridge and the old town she has known her whole life.",
    quote:
      "Everyone who visits photographs the bridge from the same three steps. I wanted to draw it from where I actually stand — from the coppersmiths' row, with someone's washing in the frame. That is the Mostar I know.",
    biography: [
      "Ajla M. was born in Mostar and has lived and worked there for most of her life. She studied printmaking, spent several years working between Mostar and Sarajevo, and returned to open a small studio a short walk from Stari Most — close enough to hear the divers' crowd on a Saturday afternoon.",
      "She is the first artist commissioned for The Balkan Collection, making the launch edition's main print, its companion study, and the story card that introduces the city. Each future city in the collection is made by a different artist with the same kind of standing in their own place — Mostar is the opening chapter, not the template.",
      "Her work is quiet and exact. She is less interested in the bridge as a monument than in what happens around it — the coppersmiths still working Kujundžiluk, the queue for the dive, the stone worn pale by four centuries of feet. She treats an ordinary doorway with the same attention another artist might give a landmark.",
    ],
    philosophy: [
      "A place is not its landmarks. It is the small, repeated things that the people who live there stop noticing — and those are the things Ajla chooses to draw.",
      "She works against the postcard. Where a photographer looks for the single famous angle — the parapet, the sunset, the dive — she looks for the angle you actually stand at: from the row of shops, from the riverbank steps, slightly off, honest.",
      "Above all, the work is meant to preserve local identity without freezing it. Mostar is a living, working town, not a monument to what happened to it, and the drawings are contemporary — traditional in their subject, modern in their line.",
    ],
    process: [
      "Each edition begins on foot. Ajla walks the subject at different hours and in different weather before she draws anything, photographing and sketching, waiting for the light she wants.",
      "The drawing is built by hand — line first, then the two colour layers that will become the print. She keeps the palette deliberately narrow, usually the collection's accent against ink on warm paper, so the composition, not the colour, carries the work.",
      "Only then does it go to print. She proofs on the final stock, adjusts the registration by eye, and signs off the run herself before every copy is numbered by hand.",
    ],
    studio:
      "A small studio above a coppersmith's workshop on Kujundžiluk, with a window onto the river and a flat file that is slowly filling with proofs. Most of what she draws is within walking distance of the door.",
    materials: [
      "Ink and pencil for the original drawing",
      "A two-layer approach: the collection accent over ink",
      "Premium heavyweight uncoated stock, matte",
      "Giclée pigment and screen print, depending on the edition",
    ],
    inspiration: [
      "Stari Most and the mostari who dive from it",
      "The coppersmiths' row on Kujundžiluk",
      "Ottoman-era stonework, worn pale by the river's light",
      "The scaffolding and stonemasons' records from the bridge's 2004 rebuilding",
      "Late-afternoon light on the Neretva",
    ],
    connection:
      "Ajla is not a visitor drawing Mostar from the outside. She was born there, her family is there, and she grew up a short walk from a bridge that was rebuilt, stone by stone, within her own lifetime. That is the difference every artist in this collection is chosen for.",
    featuredWorks: [
      { editionCode: "BAL-01", title: "Stari Most", subject: "The old bridge", technique: "Screen print, two layers" },
      { editionCode: "BAL-01", title: "Kujundžiluk", subject: "The coppersmiths' row", technique: "Screen print, companion study" },
      { editionCode: "BAL-01", title: "Mostari", subject: "The divers, waiting", technique: "Preparatory drawing" },
    ],
    collectionCodes: ["COLLECTION 01"],
  },
];

export function artistBySlug(slug: string | null): Artist | undefined {
  if (!slug) return undefined;
  return artists.find((a) => a.slug === slug);
}

/** The artist directing the current, open edition. */
export const leadArtist: Artist = artists[0];
