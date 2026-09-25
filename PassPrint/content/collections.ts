import type { Collection, Edition, ProductionSpec } from "./types";

/*
  ────────────────────────────────────────────────────────────────────────
  COLLECTION 01 — ATLAS (launch, October 2026)
  ────────────────────────────────────────────────────────────────────────

  PassPrint goes country by country — one country a month, and in time
  every country in the world. An edition is a country, never a city.

  The first year opens with the six countries the artist, Bakir C. (see
  content/artists.ts), comes from: Bosnia and Herzegovina, Serbia,
  Croatia, Slovenia, Montenegro and North Macedonia. The six months after
  that go to the countries on the members' ballot (content/countries.ts);
  their order is set by the vote, so the months below are provisional.

  Local spelling with diacritics throughout; no borders on any map.

  Future collections carry on through the rest of the world; adding one
  means adding a new Collection object here (or a Shopify collection — see
  lib/shopify). The data model does not change.

  TODO before launch: confirm edition sizes with the printer; the numbers
  below are planned launch runs, not final.
*/

const ARTIST = "bakir-c";

/**
 * One planned edition. The motif (subject, site, note) is left open until
 * the artist chooses it; coordinates are the country's centre until then.
 */
function planned(
  number: number,
  month: string,
  monthCode: string,
  country: string,
  coordinates: string,
  details: Partial<Edition> = {},
): Edition {
  return {
    code: `AT-${String(number).padStart(2, "0")}`,
    number,
    month,
    monthCode,
    country,
    subject: "To be revealed",
    site: "———",
    coordinates,
    technique: null,
    editionSize: null,
    artistSlug: ARTIST,
    status: "sealed",
    note: "",
    ...details,
  };
}

/*
  The plan for the year. Kept here so it can be revealed later, but not
  shown: see `conceal` below.
*/
const plannedEditions: Edition[] = [
  planned(1, "October 2026", "10.2026", "Bosnia and Herzegovina", "43.9 N, 17.7 E", {
    technique: "Screen print, two layers",
    editionSize: 180,
    status: "current",
  }),
  planned(2, "November 2026", "11.2026", "Serbia", "44.0 N, 20.9 E", {
    technique: "Screen print",
    editionSize: 180,
    status: "announced",
  }),
  planned(3, "December 2026", "12.2026", "Croatia", "45.1 N, 15.2 E", {
    technique: "Screen print",
    editionSize: 180,
    status: "announced",
  }),
  planned(4, "January 2027", "01.2027", "Slovenia", "46.1 N, 14.8 E"),
  planned(5, "February 2027", "02.2027", "Montenegro", "42.7 N, 19.4 E"),
  planned(6, "March 2027", "03.2027", "North Macedonia", "41.6 N, 21.7 E"),
  // Months 7–12: the ballot countries, in the order the vote decides.
  planned(7, "April 2027", "04.2027", "Italy", "42.8 N, 12.8 E"),
  planned(8, "May 2027", "05.2027", "Japan", "36.2 N, 138.3 E"),
  planned(9, "June 2027", "06.2027", "Portugal", "39.6 N, 8.0 W"),
  planned(10, "July 2027", "07.2027", "Greece", "39.1 N, 21.8 E"),
  planned(11, "August 2027", "08.2027", "Iceland", "64.9 N, 19.0 W"),
  planned(12, "September 2027", "09.2027", "Morocco", "31.8 N, 7.1 W"),
];

/** What every edition shows in place of its country and subject. */
export const COMING_SOON = "Coming soon";

/**
 * No edition is named yet — not October, and not any month after it. The
 * country, subject, site and story are withheld; the month, code, format and
 * run size stay, because those are what a member signs up for.
 *
 * Applied to local content and to editions read from Shopify alike, so a
 * name in a Shopify metafield cannot slip onto the site. To reveal an
 * edition again, return it unchanged here.
 */
export function conceal(edition: Edition): Edition {
  return {
    ...edition,
    country: COMING_SOON,
    region: undefined,
    subject: "To be revealed",
    site: "———",
    coordinates: "",
    note: "",
  };
}

/** True when an edition's place is still withheld. */
export function isConcealed(edition: Edition): boolean {
  return edition.country === COMING_SOON;
}

const editions: Edition[] = plannedEditions.map(conceal);

export const atlasCollection: Collection = {
  code: "COLLECTION 01",
  number: 1,
  title: "Atlas",
  region: "The world, one country a month",
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

export const collections: Collection[] = [atlasCollection];

/** Convenience: the launch collection. */
export const currentCollection: Collection = atlasCollection;
