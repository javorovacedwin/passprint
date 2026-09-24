import type { Collection, Edition, ProductionSpec } from "./types";

/*
  ────────────────────────────────────────────────────────────────────────
  COLLECTION 01 — YUGO (launch, October 2026)
  ────────────────────────────────────────────────────────────────────────

  Twelve months, twelve cities across the six countries that used to be one:
  Bosnia and Herzegovina, Serbia, Croatia, Slovenia, Montenegro and North
  Macedonia. No Albania — it was never part of Yugoslavia, so it is not part
  of this collection. All twelve editions are drawn by one artist, Bakir C.
  (see content/artists.ts), whose own family was scattered across these
  same republics.

  The collection is deliberately not "one region told as one story", and
  even less a story about the wars that split it apart. It is built around
  what these cities still share — courtyards, bazaars, fortresses, bridges —
  rather than the borders and faiths that are usually used to tell them
  apart. Local spelling with diacritics throughout; no borders on any map.

  Opens in Mostar, Bosnia and Herzegovina, October 2026.

  Future collections travel elsewhere; adding one means adding a new
  Collection object here (or a Shopify collection — see lib/shopify). The
  data model does not change.

  TODO before launch: confirm edition sizes with the printer; the numbers
  below are planned launch runs, not final.
*/

const ARTIST = "bakir-c";

/*
  The plan for the year. Kept here so it can be revealed later, but not
  shown: see `conceal` below.
*/
const plannedEditions: Edition[] = [
  {
    code: "YU-01",
    number: 1,
    month: "October 2026",
    monthCode: "10.2026",
    city: "Mostar",
    country: "Bosnia and Herzegovina",
    region: "Herzegovina",
    subject: "The old bridge",
    site: "Stari Most",
    coordinates: "43.3438 N, 17.8078 E",
    technique: "Screen print, two layers",
    editionSize: 180,
    artistSlug: ARTIST,
    status: "current",
    note: "The launch edition. Stari Most, rebuilt stone by stone after 1993 and reopened in 2004, drawn from the riverbank steps below Kujundžiluk rather than from the postcard parapet — the angle the old town actually sees it from.",
  },
  {
    code: "YU-02",
    number: 2,
    month: "November 2026",
    monthCode: "11.2026",
    city: "Sarajevo",
    country: "Bosnia and Herzegovina",
    region: "Sarajevo Canton",
    subject: "The old bazaar",
    site: "Baščaršija",
    coordinates: "43.8593 N, 18.4321 E",
    technique: "Giclée",
    editionSize: 180,
    artistSlug: ARTIST,
    status: "announced",
    note: "Baščaršija's copper row at closing time, when the shutters come halfway down and the light runs low along Ćurčiluk.",
  },
  {
    code: "YU-03",
    number: 3,
    month: "December 2026",
    monthCode: "12.2026",
    city: "Beograd",
    country: "Serbia",
    subject: "The fortress",
    site: "Kalemegdan",
    coordinates: "44.8225 N, 20.4491 E",
    technique: "Screen print",
    editionSize: 180,
    artistSlug: ARTIST,
    status: "announced",
    note: "The ramparts above the confluence of the Sava and the Danube, drawn from the walk along the walls rather than the view from the terrace café.",
  },
  {
    code: "YU-04",
    number: 4,
    month: "January 2027",
    monthCode: "01.2027",
    city: "Novi Sad",
    country: "Serbia",
    region: "Vojvodina",
    subject: "The fortress above the river",
    site: "Petrovaradinska tvrđava",
    coordinates: "45.2551 N, 19.8452 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "YU-05",
    number: 5,
    month: "February 2027",
    monthCode: "02.2027",
    city: "Zagreb",
    country: "Croatia",
    subject: "The upper town",
    site: "Gornji grad",
    coordinates: "45.8150 N, 15.9785 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "YU-06",
    number: 6,
    month: "March 2027",
    monthCode: "03.2027",
    city: "Dubrovnik",
    country: "Croatia",
    subject: "The walls",
    site: "Gradske zidine",
    coordinates: "42.6403 N, 18.1084 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "YU-07",
    number: 7,
    month: "April 2027",
    monthCode: "04.2027",
    city: "Ljubljana",
    country: "Slovenia",
    subject: "The triple bridge",
    site: "Tromostovje",
    coordinates: "46.0511 N, 14.5051 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "YU-08",
    number: 8,
    month: "May 2027",
    monthCode: "05.2027",
    city: "Maribor",
    country: "Slovenia",
    subject: "The old vine",
    site: "Stara trta",
    coordinates: "46.5486 N, 15.6459 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "YU-09",
    number: 9,
    month: "June 2027",
    monthCode: "06.2027",
    city: "Kotor",
    country: "Montenegro",
    subject: "The bay",
    site: "Boka Kotorska",
    coordinates: "42.4247 N, 18.7712 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "YU-10",
    number: 10,
    month: "July 2027",
    monthCode: "07.2027",
    city: "Cetinje",
    country: "Montenegro",
    subject: "The old capital",
    site: "Cetinjski manastir",
    coordinates: "42.3911 N, 18.9238 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "YU-11",
    number: 11,
    month: "August 2027",
    monthCode: "08.2027",
    city: "Skopje",
    country: "North Macedonia",
    subject: "The old bazaar",
    site: "Stara čaršija",
    coordinates: "41.9981 N, 21.4361 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
  },
  {
    code: "YU-12",
    number: 12,
    month: "September 2027",
    monthCode: "09.2027",
    city: "Ohrid",
    country: "North Macedonia",
    subject: "The lake shore",
    site: "Ohridsko Ezero",
    coordinates: "41.1231 N, 20.8016 E",
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "The closing edition. Ohrid's lake is older than any border ever drawn around it — the year ends where the region's history is oldest, not where it is most divided.",
  },
];

/** What every edition shows in place of its city and subject. */
export const COMING_SOON = "Coming soon";

/**
 * No edition is named yet — not October, and not any month after it. The
 * city, subject, site and story are withheld; the month, code, format and
 * run size stay, because those are what a member signs up for.
 *
 * Applied to local content and to editions read from Shopify alike, so a
 * name in a Shopify metafield cannot slip onto the site. To reveal an
 * edition again, return it unchanged here.
 */
export function conceal(edition: Edition): Edition {
  return {
    ...edition,
    city: COMING_SOON,
    country: "———",
    region: undefined,
    subject: "To be revealed",
    site: "———",
    coordinates: "",
    note: "",
  };
}

/** True when an edition's place is still withheld. */
export function isConcealed(edition: Edition): boolean {
  return edition.city === COMING_SOON;
}

const editions: Edition[] = plannedEditions.map(conceal);

export const yugoCollection: Collection = {
  code: "COLLECTION 01",
  number: 1,
  title: "Yugo",
  region: "The former Yugoslavia",
  year: "2026–2027",
  accent: "#BF5A2C",
  launchMonth: "October 2026",
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

export const collections: Collection[] = [yugoCollection];

/** Convenience: the launch collection. */
export const currentCollection: Collection = yugoCollection;
