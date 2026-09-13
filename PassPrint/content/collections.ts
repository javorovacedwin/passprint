import type { Collection, Edition, ProductionSpec } from "./types";

/*
  ────────────────────────────────────────────────────────────────────────
  COLLECTION 01 — THE BALKAN COLLECTION (launch, August 2026)
  ────────────────────────────────────────────────────────────────────────

  Twelve months, twelve cities across the Balkans — a different place, and a
  different artist who actually lives there, every time. The launch edition
  opens in Mostar, Bosnia and Herzegovina, on the Neretva.

  This is deliberately not "one region told as one story": the region is
  named only for orientation. Each city keeps its own spelling (with
  diacritics), its own artist, its own reader who checks the story before
  it prints, and its own facts. No borders are drawn anywhere on the site.

  Future collections travel to other regions; adding one means adding a new
  Collection object here (or a Shopify collection — see lib/shopify). The
  data model does not change.

  TODO before launch: confirm edition sizes with the printer; the numbers
  below are planned launch runs, not final. Cast and confirm the artists for
  BAL-04 onward — they are listed as "artist to be announced" until then.
*/

const editions: Edition[] = [
  {
    code: "BAL-01",
    number: 1,
    month: "August 2026",
    monthCode: "08.2026",
    city: "Mostar",
    country: "Bosnia and Herzegovina",
    region: "Herzegovina",
    subject: "The old bridge",
    site: "Stari Most",
    coordinates: "43.3438 N, 17.8078 E",
    technique: "Screen print, two layers",
    editionSize: 180,
    artistSlug: "ajla-m",
    status: "current",
    note: "The launch edition. Stari Most, rebuilt stone by stone after 1993 and reopened in 2004, drawn from the riverbank steps below Kujundžiluk rather than from the postcard parapet — the angle the old town actually sees it from.",
  },
  {
    code: "BAL-02",
    number: 2,
    month: "September 2026",
    monthCode: "09.2026",
    city: "Sarajevo",
    country: "Bosnia and Herzegovina",
    region: "Sarajevo Canton",
    subject: "The old bazaar",
    site: "Baščaršija",
    coordinates: "43.8593 N, 18.4321 E",
    technique: "Giclée",
    editionSize: 180,
    artistSlug: null,
    status: "announced",
    note: "Baščaršija's copper row at closing time, when the shutters come halfway down and the light runs low along Ćurčiluk. Artist to be confirmed with the edition.",
  },
  {
    code: "BAL-03",
    number: 3,
    month: "October 2026",
    monthCode: "10.2026",
    city: "Beograd",
    country: "Serbia",
    subject: "The fortress",
    site: "Kalemegdan",
    coordinates: "44.8225 N, 20.4491 E",
    technique: "Screen print",
    editionSize: 180,
    artistSlug: null,
    status: "announced",
    note: "The ramparts above the confluence of the Sava and the Danube, drawn from the walk along the walls rather than the view from the terrace café. Artist to be confirmed with the edition.",
  },
  {
    code: "BAL-04",
    number: 4,
    month: "November 2026",
    monthCode: "11.2026",
    city: "Zagreb",
    country: "Croatia",
    subject: "The upper town",
    site: "Gornji grad",
    coordinates: "45.8150 N, 15.9785 E",
    technique: null,
    editionSize: null,
    artistSlug: null,
    status: "sealed",
    note: "",
  },
  {
    code: "BAL-05",
    number: 5,
    month: "December 2026",
    monthCode: "12.2026",
    city: "Dubrovnik",
    country: "Croatia",
    subject: "The walls",
    site: "Gradske zidine",
    coordinates: "42.6403 N, 18.1084 E",
    technique: null,
    editionSize: null,
    artistSlug: null,
    status: "sealed",
    note: "",
  },
  {
    code: "BAL-06",
    number: 6,
    month: "January 2027",
    monthCode: "01.2027",
    city: "Kotor",
    country: "Montenegro",
    subject: "The bay",
    site: "Boka Kotorska",
    coordinates: "42.4247 N, 18.7712 E",
    technique: null,
    editionSize: null,
    artistSlug: null,
    status: "sealed",
    note: "",
  },
  {
    code: "BAL-07",
    number: 7,
    month: "February 2027",
    monthCode: "02.2027",
    city: "Ljubljana",
    country: "Slovenia",
    subject: "The triple bridge",
    site: "Tromostovje",
    coordinates: "46.0511 N, 14.5051 E",
    technique: null,
    editionSize: null,
    artistSlug: null,
    status: "sealed",
    note: "",
  },
  {
    code: "BAL-08",
    number: 8,
    month: "March 2027",
    monthCode: "03.2027",
    city: "Skopje",
    country: "North Macedonia",
    subject: "The old bazaar",
    site: "Stara čaršija",
    coordinates: "41.9981 N, 21.4361 E",
    technique: null,
    editionSize: null,
    artistSlug: null,
    status: "sealed",
    note: "",
  },
  {
    code: "BAL-09",
    number: 9,
    month: "April 2027",
    monthCode: "04.2027",
    city: "Ohrid",
    country: "North Macedonia",
    subject: "The lake shore",
    site: "Ohridsko Ezero",
    coordinates: "41.1231 N, 20.8016 E",
    technique: null,
    editionSize: null,
    artistSlug: null,
    status: "sealed",
    note: "",
  },
  {
    code: "BAL-10",
    number: 10,
    month: "May 2027",
    monthCode: "05.2027",
    city: "Tirana",
    country: "Albania",
    subject: "The boulevard",
    site: "Bulevardi Dëshmorët e Kombit",
    coordinates: "41.3275 N, 19.8187 E",
    technique: null,
    editionSize: null,
    artistSlug: null,
    status: "sealed",
    note: "",
  },
  {
    code: "BAL-11",
    number: 11,
    month: "June 2027",
    monthCode: "06.2027",
    city: "Sofia",
    country: "Bulgaria",
    subject: "The cathedral square",
    site: "Aleksandar Nevski",
    coordinates: "42.6959 N, 23.3327 E",
    technique: null,
    editionSize: null,
    artistSlug: null,
    status: "sealed",
    note: "",
  },
  {
    code: "BAL-12",
    number: 12,
    month: "July 2027",
    monthCode: "07.2027",
    city: "———",
    country: "———",
    subject: "To be revealed",
    site: "———",
    coordinates: "·· ···· N, ·· ···· E",
    technique: null,
    editionSize: null,
    artistSlug: null,
    status: "sealed",
    note: "The twelfth city is announced to members only, one month before it ships — the destination that closes the collection.",
  },
];

export const balkanCollection: Collection = {
  code: "COLLECTION 01",
  number: 1,
  title: "The Balkan Collection",
  region: "The Balkans",
  year: "2026–2027",
  accent: "#BF5A2C",
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

export const collections: Collection[] = [balkanCollection];

/** Convenience: the launch collection. */
export const currentCollection: Collection = balkanCollection;
