/*
  Storefront GraphQL documents.

  Editorial fields travel as product/collection METAFIELDS in the
  `passprint` namespace, so a new edition is created entirely in Shopify —
  no code change. See lib/shopify/index.ts for the exact metafield keys and
  README.md for the "how to add a new edition" checklist.
*/

const EDITION_METAFIELDS = `
  code: metafield(namespace: "passprint", key: "edition_code") { value }
  number: metafield(namespace: "passprint", key: "edition_number") { value }
  month: metafield(namespace: "passprint", key: "month") { value }
  monthCode: metafield(namespace: "passprint", key: "month_code") { value }
  country: metafield(namespace: "passprint", key: "country") { value }
  region: metafield(namespace: "passprint", key: "region") { value }
  subject: metafield(namespace: "passprint", key: "subject") { value }
  site: metafield(namespace: "passprint", key: "site") { value }
  coordinates: metafield(namespace: "passprint", key: "coordinates") { value }
  technique: metafield(namespace: "passprint", key: "technique") { value }
  editionSize: metafield(namespace: "passprint", key: "edition_size") { value }
  status: metafield(namespace: "passprint", key: "status") { value }
  note: metafield(namespace: "passprint", key: "note") { value }
  artistSlug: metafield(namespace: "passprint", key: "artist_slug") { value }
`;

/**
 * One PassPrint collection and its twelve edition products. Each edition
 * carries its own country metafield — a collection is a set of twelve
 * countries (Atlas), not one place.
 */
export const COLLECTION_QUERY = /* GraphQL */ `
  query PassPrintCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      handle
      title
      description
      region: metafield(namespace: "passprint", key: "region") { value }
      year: metafield(namespace: "passprint", key: "year") { value }
      accent: metafield(namespace: "passprint", key: "accent") { value }
      launchMonth: metafield(namespace: "passprint", key: "launch_month") { value }
      collectionCode: metafield(namespace: "passprint", key: "collection_code") { value }
      products(first: $first) {
        nodes {
          id
          handle
          title
          availableForSale
          featuredImage { url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 1) { nodes { id availableForSale } }
          ${EDITION_METAFIELDS}
        }
      }
    }
  }
`;

/**
 * The subscription products. Tag a product `subscription` in Shopify and it
 * is picked up here; the `plan_id` metafield decides which plan it maps to.
 */
export const SUBSCRIPTION_PRODUCTS_QUERY = /* GraphQL */ `
  query PassPrintSubscriptions($first: Int!) {
    products(first: $first, query: "tag:subscription") {
      nodes {
        id
        handle
        title
        description
        availableForSale
        priceRange { minVariantPrice { amount currencyCode } }
        planId: metafield(namespace: "passprint", key: "plan_id") { value }
        cadence: metafield(namespace: "passprint", key: "cadence") { value }
        effective: metafield(namespace: "passprint", key: "effective") { value }
        recommended: metafield(namespace: "passprint", key: "recommended") { value }
        # the recurring plan (Shopify Subscriptions app) — without it a
        # "subscription" would be charged once, like any other product
        sellingPlanGroups(first: 5) {
          nodes { name sellingPlans(first: 5) { nodes { id name } } }
        }
        variants(first: 5) {
          nodes {
            id
            title
            availableForSale
            price { amount currencyCode }
          }
        }
      }
    }
  }
`;

/** Every PassPrint collection, so future regions appear automatically. */
export const ALL_COLLECTIONS_QUERY = /* GraphQL */ `
  query PassPrintCollections($first: Int!) {
    collections(first: $first, query: "tag:passprint") {
      nodes {
        handle
        title
        collectionCode: metafield(namespace: "passprint", key: "collection_code") { value }
        region: metafield(namespace: "passprint", key: "region") { value }
        year: metafield(namespace: "passprint", key: "year") { value }
      }
    }
  }
`;

/*
  ── Cart (Storefront API) ────────────────────────────────────────────────
  A Shopify-hosted cart lives entirely on the Storefront API. We store only
  the returned cart id in the browser; every mutation runs server-side so the
  token never reaches the client. `checkoutUrl` is the Shopify-hosted
  checkout — the customer browses on the custom site and only leaves for the
  secure checkout.
*/
const CART_FRAGMENT = /* GraphQL */ `
  fragment CartParts on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        sellingPlanAllocation { sellingPlan { id name } }
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product { title handle }
          }
        }
      }
    }
  }
`;

export const CART_QUERY = /* GraphQL */ `
  ${CART_FRAGMENT}
  query CartQuery($id: ID!) { cart(id: $id) { ...CartParts } }
`;

export const CART_CREATE = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartParts }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartParts }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_UPDATE = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartParts }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_REMOVE = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartParts }
      userErrors { field message }
    }
  }
`;
