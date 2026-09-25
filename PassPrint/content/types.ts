export type EditionStatus = "current" | "announced" | "sealed" | "published";

export interface Edition {
  /** Archive code, e.g. "AT-01". */
  code: string;
  /** 1–12 within the collection. */
  number: number;
  /** e.g. "August 2026" */
  month: string;
  /** Short month code for stamps, e.g. "08.2026". */
  monthCode: string;
  /** The country this edition depicts — each edition goes somewhere new. */
  country: string;
  /** Historical/cultural region within the country, when it earns its place, e.g. "Herzegovina". Omit rather than force one. */
  region?: string;
  /** The facet of the country this edition depicts, e.g. "The old bridge". */
  subject: string;
  /** The specific site, in local spelling, e.g. "Stari Most". */
  site: string;
  /** Coordinates of the site, e.g. "43.3438 N, 17.8078 E". */
  coordinates: string;
  /** Print technique for this edition; null until announced. */
  technique: string | null;
  /** Hand-numbered run size; null until announced. */
  editionSize: number | null;
  /** Slug of the artist who draws this edition; null until cast. */
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
  /** The collection's name, e.g. "Atlas". */
  title: string;
  /**
   * Orientation only, never a unity: each edition's country, artist and story
   * stand on their own — this is not "one culture" told in twelve parts.
   */
  region: string;
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
  id: "monthly" | "six-months" | "annual";
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
  /**
   * The Shopify selling plan that makes the purchase recur. No plan can be
   * bought without one — it would be charged once, like any other product.
   */
  sellingPlanId?: string | null;
  /** Whether the plan can be bought right now (from Shopify). */
  available?: boolean;
}

export interface FaqEntry {
  group: string;
  question: string;
  answer: string;
}

export interface VoteCountry {
  id: string;
  name: string;
  /** One sentence on what the edition would draw — no cities named. */
  reason: string;
  coordinates: string;
}

/** One way a studio work can be bought: the original, or a print size. */
export interface StudioWorkOption {
  id: "original" | "print-a3" | "print-a4" | "print-a5" | "print-a6";
  /** Short label shown in the buy panel, e.g. "Original". */
  label: string;
  /** One line of spec under the label, e.g. "Giclée, A3, edition of 50". */
  detail: string;
  /** Formatted price string, injected from content/pricing.ts. */
  price: string;
  /** Storefront ProductVariant GID, when the data came from Shopify. */
  variantId: string | null;
  available: boolean;
}

/**
 * A painting from the studio, sold on its own rather than as part of a
 * monthly edition. `alt` is required, as it is on every artwork on the site.
 */
export interface StudioWork {
  slug: string;
  title: string;
  medium: string;
  /** Null until measured — the UI says so rather than inventing a size. */
  dimensions: string | null;
  /** Two or three factual sentences about what is in the picture. */
  note: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  options: StudioWorkOption[];
}
