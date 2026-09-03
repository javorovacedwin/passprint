import type { Collection, Edition, ProductionSpec } from "./types";

/*
  ────────────────────────────────────────────────────────────────────────
  COLLECTION 01 — NOVI PAZAR (launch, August 2026)
  ────────────────────────────────────────────────────────────────────────

  The launch collection is devoted entirely to one city: Novi Pazar, in the
  Raška / Sandžak region of southern Serbia. Twelve months, twelve facets of
  the same place — the fortress, the bazaar, the mosques, the medieval
  churches and monasteries in the hills around it, the crafts, the river,
  everyday life. One artist makes all twelve: Bakir C. (see content/artists).

  Local spelling with diacritics throughout. The country is named for
  orientation only. No borders are drawn anywhere on the site.

  Future collections travel to other cities and cultures; adding one means
  adding a new Collection object here (or a Shopify collection — see
  lib/shopify). The data model does not change.

  TODO before launch: confirm edition sizes with the printer; the numbers
  below are planned launch runs, not final.
*/

const ARTIST = "bakir-c";

const editions: Edition[] = [
  {
    code: "NP-01",
    number: 1,
    month: "August 2026",
    monthCode: "08.2026",
    subject: "The fortress",
    site: "Gradina",
    coordinates: "43.1408 N, 20.5186 E",
    technique: "Screen print, two layers",
    editionSize: 150,
    artistSlug: ARTIST,
    status: "current",
    note: "The launch edition. Gradina, the old fortress above the Raška, drawn from the slope below its hexagonal tower rather than from the postcard viewpoint — the angle you get walking up to it.",
  },
  {
    code: "NP-02",
    number: 2,
    month: "September 2026",
    monthCode: "09.2026",
    subject: "The mosque",
    site: "Altun-alem",
    coordinates: "43.1372 N, 20.5136 E",
    technique: "Giclée",
    editionSize: 150,
    artistSlug: ARTIST,
    status: "announced",
    note: "The Altun-alem mosque, among the oldest still standing in the city, drawn in the low light of late afternoon when the stone warms.",
  },
  {
    code: "NP-03",
    number: 3,
    month: "October 2026",
    monthCode: "10.2026",
    subject: "The old bazaar",
    site: "Stara čaršija",
    coordinates: "43.1389 N, 20.5150 E",
    technique: "Screen print",
    editionSize: 150,
    artistSlug: ARTIST,
    status: "announced",
    note: "The čaršija — the trading streets that gave the city its name. Shopfronts, awnings, and the coppersmiths still working the same corner.",
  },
  {
    code: "NP-04",
    number: 4,
    month: "November 2026",
    monthCode: "11.2026",
    subject: "The oldest church",
    site: "Petrova crkva",
    coordinates: "43.1497 N, 20.5303 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "NP-05",
    number: 5,
    month: "December 2026",
    monthCode: "12.2026",
    subject: "Filigree",
    site: "The silversmiths' hands",
    coordinates: "43.1382 N, 20.5145 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "NP-06",
    number: 6,
    month: "January 2027",
    monthCode: "01.2027",
    subject: "The river in winter",
    site: "Raška",
    coordinates: "43.1400 N, 20.5170 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "NP-07",
    number: 7,
    month: "February 2027",
    monthCode: "02.2027",
    subject: "The monastery",
    site: "Sopoćani",
    coordinates: "43.0783 N, 20.4172 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "NP-08",
    number: 8,
    month: "March 2027",
    monthCode: "03.2027",
    subject: "The towers on the hill",
    site: "Đurđevi stupovi",
    coordinates: "43.1489 N, 20.4986 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "NP-09",
    number: 9,
    month: "April 2027",
    monthCode: "04.2027",
    subject: "The bath",
    site: "The old hammam",
    coordinates: "43.1386 N, 20.5158 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "NP-10",
    number: 10,
    month: "May 2027",
    monthCode: "05.2027",
    subject: "Courtyards",
    site: "The old town",
    coordinates: "43.1390 N, 20.5160 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "NP-11",
    number: 11,
    month: "June 2027",
    monthCode: "06.2027",
    subject: "Cloth and pattern",
    site: "The weavers",
    coordinates: "43.1384 N, 20.5148 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "NP-12",
    number: 12,
    month: "July 2027",
    monthCode: "07.2027",
    subject: "To be revealed",
    site: "———",
    coordinates: "·· ···· N, ·· ···· E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "The twelfth subject is announced to members only, one month before it ships — the work that closes the collection.",
  },
];

export const noviPazar: Collection = {
  code: "COLLECTION 01",
  number: 1,
  title: "Novi Pazar",
  city: "Novi Pazar",
  country: "Serbia",
  region: "Raška · Sandžak",
  coordinates: "43.1367 N, 20.5122 E",
  year: "2026–2027",
  accent: "#A65B33",
  launchMonth: "August 2026",
  editions,
};

/** Identical for every collection — only artwork and identity change. */
export const production: ProductionSpec = {
  mainFormat: "A5",
  mainDimensions: "14.8 × 21 cm",
  companionFormat: "A6",
  companionDimensions: "10.5 × 14.8 cm",
  paper: "premium heavyweight uncoated stock",
  finish: "matte, giclée pigment print",
  numbering: "numbered by hand on the back, never reprinted",
  packaging: "flat, card-stiffened, in a stamped envelope that fits a letterbox",
  shipping: "included in BE/NL/EU",
};

/** The edition open for orders right now. */
export const currentEdition: Edition =
  editions.find((e) => e.status === "current") ?? editions[0];

export const collections: Collection[] = [noviPazar];

/** Convenience: the launch collection. */
export const currentCollection: Collection = noviPazar;
