export type EditionStatus = "current" | "announced" | "sealed" | "published";

export interface Edition {
  /** Archive code, e.g. "NP-01". */
  code: string;
  /** 1–12 within the collection. */
  number: number;
  /** e.g. "August 2026" */
  month: string;
  /** Short month code for stamps, e.g. "08.2026". */
  monthCode: string;
  /** The facet of the place this edition depicts, e.g. "The fortress". */
  subject: string;
  /** The specific site, in local spelling, e.g. "Gradina". */
  site: string;
  /** Coordinates of the site, e.g. "43.1408 N, 20.5186 E". */
  coordinates: string;
  /** Print technique for this edition; null until announced. */
  technique: string | null;
  /** Hand-numbered run size; null until announced. */
  editionSize: number | null;
  /** Slug of the artist; all of Collection 01 is one artist. */
  artistSlug: string | null;
  status: EditionStatus;
  /** One or two factual sentences. Empty until announced. */
  note: string;
  /** Storefront ProductVariant GID, when the data came from Shopify. */
  variantId?: string | null;
  /** Whether the edition can be bought right now (from Shopify). */
  available?: boolean;
}

export interface Collection {
  /** e.g. "COLLECTION 01". */
  code: string;
  number: number;
  /** The place the whole collection depicts, e.g. "Novi Pazar". */
  title: string;
  city: string;
  /** Country is orientation only, never a theme. */
  country: string;
  /** Historical/administrative region, e.g. "Raška · Sandžak". */
  region: string;
  /** City coordinates, printed on the collection masthead. */
  coordinates: string;
  year: string;
  /** One accent colour per collection. */
  accent: string;
  /** e.g. "August 2026". */
  launchMonth: string;
  editions: Edition[];
}

/**
 * Production is identical for every collection — only the artwork, places,
 * stories, envelope colour and collection identity change. One source of
 * truth, shown across the site.
 */
export interface ProductionSpec {
  mainFormat: string;
  mainDimensions: string;
  companionFormat: string;
  companionDimensions: string;
  paper: string;
  finish: string;
  numbering: string;
  packaging: string;
  shipping: string;
}

/** A featured work on the artist page. */
export interface ArtistWork {
  editionCode: string;
  title: string;
  subject: string;
  technique: string;
}

export interface Artist {
  slug: string;
  name: string;
  /** e.g. "Creative Director of PassPrint". */
  role: string;
  city: string;
  country: string;
  technique: string;
  /** A short standfirst for the artist page and cards. */
  standfirst: string;
  /** Direct quote in the artist's own words. */
  quote: string;
  /** Long-form biography, paragraph by paragraph. */
  biography: string[];
  philosophy: string[];
  process: string[];
  studio: string;
  materials: string[];
  inspiration: string[];
  /** Their connection to the place they depict. */
  connection: string;
  featuredWorks: ArtistWork[];
  /** Which collection(s) they made. */
  collectionCodes: string[];
}

export interface SubscriptionPlan {
  id: "monthly" | "annual" | "gift";
  name: string;
  /** Formatted price string, injected from content/pricing.ts. */
  price: string;
  priceDetail: string;
  summary: string;
  items: string[];
  cta: string;
  footnote: string;
  recommended?: boolean;
  /** Storefront ProductVariant GID, when the data came from Shopify. */
  variantId?: string | null;
  /** Whether the plan can be bought right now (from Shopify). */
  available?: boolean;
}

export interface FaqEntry {
  group: string;
  question: string;
  answer: string;
}

export interface VoteRegion {
  id: string;
  name: string;
  /** Three example places a collection there could visit. */
  samplePlaces: string[];
  /** One factual sentence on why this region is makeable. */
  reason: string;
  coordinates: string;
}
