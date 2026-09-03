# PassPrint — website

A monthly art publication in an envelope. One place, one artist, one numbered
edition — with the story that belongs to it.

**Collection 01 — Novi Pazar. Launching August 2026.**

The strategic plan behind the brand lives in [`passprint-plan.md`](passprint-plan.md);
the binding design rules in [`CLAUDE.md`](CLAUDE.md).

## Running locally

Requires Node.js 20+ (Node 24 LTS is installed at
`%LOCALAPPDATA%\Programs\nodejs` on this machine and added to the user PATH).

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

- `npm run build` — the real production build (writes to `.next`).
- `npm run verify` — same build for type-checking, into `.next-verify`. **Use
  this while `npm run dev` is running** — a plain `build` overwrites the
  directory the dev server is serving from and breaks it mid-session.

## Homepage structure

The homepage answers a first-time visitor's questions in order, and nothing
more — the long-form material lives on its own pages and is linked:

| | Section | Job |
|---|---|---|
| — | Hero | What is this? |
| § 01 | What arrives | What do I get? |
| § 02 | This month | Show me — **price + add to cart** |
| § 03 | The year | Does it keep going? |
| § 04 | The maker | Who makes it? |
| § 05 | Memberships | How do I join? |
| — | Colophon | The cartouche signs off |

The buy decision sits at § 02, next to the work itself, rather than being
buried at the foot of the page. The full catalogue (`/collection`), the
artist in depth (`/artists`) and the next-region vote (`/vote`) are
deliberately *not* on the homepage.

## Stack

- **Next.js 15** (App Router) + **TypeScript**, all pages statically prerendered
- **Tailwind CSS 4** — design tokens live in `@theme` in `app/globals.css`
- **Motion** for UI animation (no GSAP — Motion covers everything used)
- **Three.js + React Three Fiber + Drei** for the hero globe only, loaded
  dynamically so it never blocks first paint
- **Shopify Storefront API** as the commerce backend, with local fallback

No component library. Every component is custom.

## Typography — why this combination

- **Newsreader** (serif) for display and editorial voice: a genuine
  editorial face with real italics, free, and complete **latin-ext**
  coverage — mandatory for č ć š ž đ in place names like *Stara čaršija*
  and *Đurđevi stupovi*.
- **IBM Plex Sans** for interface and running text, **IBM Plex Mono** for
  codes, coordinates, prices and labels. Sans and Mono are one superfamily,
  so the site reads as two voices (editorial serif + technical Plex), not
  three fonts. All loaded locally via `next/font`.

## The first collection

Collection 01 stays in **one city for twelve months**. Each edition is a
different facet of Novi Pazar — the fortress, the bazaar, the mosque, the
medieval churches in the hills, filigree, the river, courtyards, textiles.
All twelve are drawn by **Bakir C.**, born and working there, and Creative
Director of PassPrint.

Future collections travel elsewhere; the data model does not change.

## Print sizes (do not mix these up)

| | Format | Dimensions |
|---|---|---|
| Main print | **A5** | 14.8 × 21 cm |
| Companion print | **A6** | 10.5 × 14.8 cm |

Both are defined once in `production` in
[`content/collections.ts`](content/collections.ts) and referenced everywhere.
Nothing hardcodes a paper size.

## Production is constant

Every edition and every future collection uses the same paper, print
quality, finish and packaging. **Only** the artwork, place, story, envelope
colour and collection identity change. This is stated on the homepage, the
how-it-works page, the about page and in the FAQ, and lives in one object
(`production`) so it can never drift.

## Pricing

**All prices live in one file: [`content/pricing.ts`](content/pricing.ts).**
Nothing else hardcodes a number. Change `planPricing` there and it flows
through the plans, the homepage and the subscribe page.

Values are temporary placeholders (currently €18/month) pending final print
and postage quotes. `formatPrice` / `formatFrom` handle display.

When Shopify is configured, live Shopify prices override these; the local
values remain the offline fallback.

## Languages

EN · NL · FR · DE, selectable from the top navigation (and the footer).

- Add a language in [`content/languages.ts`](content/languages.ts), then add
  its block to [`content/dictionary.ts`](content/dictionary.ts). Nothing else
  needs touching — the switcher, `<html lang>` and footer all read that list.
- Interface chrome is translated for all four languages now.
- **Editorial long-form** (stories, biography, collection essays) stays in
  English until a person translates it — we do not machine-translate cultural
  writing. Locales flagged `editorial: false` show a quiet note saying so.
  Flip the flag once a human translation is wired in.
- The provider (`components/i18n/LocaleProvider.tsx`) is the single place to
  change if you later move to URL-based locales (`/nl/…`).

## Headless commerce (cart + checkout)

This is a **headless** setup: the Next.js site is the storefront, Shopify is the
backend, and checkout is Shopify-hosted. See **[DEPLOYMENT.md](DEPLOYMENT.md)** for
the full Vercel + DNS + Shopify-domain guide (it explains the checkout-domain split
that makes headless actually work).

- **Cart** — real Storefront API cart. Mutations run in server actions
  (`app/cart-actions.ts` → `lib/shopify/cart.ts`), so the token never reaches the
  browser. State lives in `components/cart/CartProvider.tsx`; the drawer is
  `components/cart/CartDrawer.tsx`; add-to-cart is `components/cart/AddToCartButton.tsx`
  (on the subscription plans and "buy this edition"). The cart id is kept in
  `localStorage`; nothing secret is stored client-side.
- **Checkout** — the drawer's Checkout button is Shopify's `cart.checkoutUrl` — the
  only point a customer leaves the custom site, and only to pay.
- **Graceful state** — with no Storefront token, the cart control is hidden and
  add-to-cart reads "Available soon"; the site runs on local content. It lights up
  the moment the token is set.

## Backend — votes, emails, orders

Three secrets, three jobs. Everything is server-side; no key is ever prefixed
`NEXT_PUBLIC_`. Each piece degrades honestly: with nothing configured the site
still runs and the forms **say so** rather than pretending to have saved.

| Data | Stored in | Entry point |
|---|---|---|
| Votes for Collection 02 | Supabase `votes` | `app/actions.ts` → `submitVoteAction` |
| Newsletter subscribers | Supabase `newsletter_subscribers` **+ Shopify customer** | `subscribeAction` |
| Contact messages | Supabase `contact_messages` | `contactAction` |
| Orders | **Shopify** (source of truth), mirrored to Supabase `orders` | `app/api/webhooks/shopify` |

### 1. Database (Supabase)

1. Create a project at supabase.com.
2. SQL editor → paste [`lib/db/schema.sql`](lib/db/schema.sql) → Run.
3. Project Settings → API keys → copy the URL and the **secret** key
   (`sb_secret_…`) into `SUPABASE_URL` / `SUPABASE_SECRET_KEY`.

Row-level security is on for every table with no permissive policy, so the
publishable key can read nothing; only the server, holding the secret key,
can touch the data. Voter emails are never exposed — the site reads the
`vote_tally` view, which returns counts only.

**One vote per email** is enforced by a unique index in Postgres, not by the
interface, so it cannot be bypassed by clearing `localStorage`.

### 2. Orders (Shopify webhooks)

Register JSON webhooks in Shopify admin → Settings → Notifications → Webhooks
for `orders/create`, `orders/paid`, `orders/cancelled`, `orders/fulfilled`,
all pointing at:

```
https://passprint.eu/api/webhooks/shopify
```

Signatures are verified with the app's **Client Secret**
(`SHOPIFY_CLIENT_SECRET`) — no separate webhook secret is needed.

Every request is verified with a timing-safe HMAC over the **raw** body
(which is why the handler reads `text()` before parsing). Unsigned or forged
requests get a 401; storage failures return 500 so Shopify retries. Orders
upsert by id, so the repeat deliveries on paid/fulfilled update the same row.
`GET` the same URL to check it is deployed and configured.

### 3. Newsletter → Shopify customers

A signup is saved to Supabase **and** pushed to Shopify as a customer with
email-marketing consent (`lib/shopify/admin.ts` → `upsertSubscriber`), so the
mailing list lives beside the orders and works with Shopify's own campaign
tools. If the Shopify push fails the subscriber is still saved and
`synced_to_shopify` stays `false`, so a retry can find them.

### 4. Reading orders in the app

`lib/shopify/admin.ts` exposes `getOrders()` and `getEditionOrderCount()`
via the Admin API — the latter gives the live size of an edition's run.

**Authentication is automatic.** Shopify no longer issues permanent
admin-created custom app tokens, so a Dev Dashboard app exchanges its Client
ID and Secret for an Admin token via the `client_credentials` grant. That
token expires after ~24 hours, so `lib/shopify/admin-token.ts` mints it,
caches it in memory, refreshes it five minutes before expiry, shares one
in-flight request between concurrent callers, and re-mints once on a 401 (a
token revoked early). No long-lived Admin token is ever stored.

Requires `SHOPIFY_CLIENT_ID` + `SHOPIFY_CLIENT_SECRET`, with Admin scopes
`read_orders`, `read_customers`, `write_customers`.

## Shopify — where commerce data enters

Store: **passprint.eu** (`x1t200-0i.myshopify.com`), EUR, Belgium.

**Entry point: `lib/shopify/`** — the only module that talks to Shopify.

| File | Role |
|---|---|
| `lib/shopify/client.ts` | Storefront API fetch; returns `null` on any failure |
| `lib/shopify/queries.ts` | GraphQL documents |
| `lib/shopify/index.ts` | `getCollection()`, `getCurrentEdition()`, `getSubscriptionPlans()` — Shopify first, local content as fallback |

Pages call those functions; they never call Shopify directly. If credentials
are missing or a request fails, the site silently uses `content/*.ts`, so it
always builds and runs.

### Turning it on

1. Copy `.env.example` to `.env.local`.
2. Shopify admin → Settings → Apps and sales channels → Develop apps →
   create an app, enable the **Storefront API**, grant
   `unauthenticated_read_product_listings` and
   `unauthenticated_read_product_inventory`.
3. Install the app, copy the Storefront access token into
   `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

Data refreshes hourly (`revalidate: 3600`).

### Adding a new edition (no code change)

Create a product in the city's Shopify collection and set these metafields
in the `passprint` namespace:

```
edition_code    NP-04              month         November 2026
edition_number  4        (integer) month_code    11.2026
subject         The oldest church  site          Petrova crkva
coordinates     43.1497 N, 20.5303 E
technique       Giclée             edition_size  150 (integer)
status          current | announced | sealed | published
note            One or two factual sentences
artist_slug     bakir-c
```

It appears on `/collection` automatically.

### Adding a new collection (a new city)

Create a Shopify collection, tag it `passprint`, set `collection_code`,
`city`, `country`, `region`, `coordinates`, `year`, `accent`, `launch_month`,
then add its twelve edition products.

### Adding a subscription product

Create a product, tag it `subscription`, set `plan_id` to `monthly`,
`annual` or `gift`, plus `cadence` (and optional `effective`,
`recommended`). Prices and availability come from Shopify; the plan **copy**
stays in `content/subscriptions.ts` so the editorial voice is not written in
the Shopify admin.

Recurring billing itself needs a Shopify subscriptions app (selling plans);
this layer reads price and availability.

> **Store status:** the store is LIVE. The Novi Pazar collection, all 12
> edition products, and the 3 subscription products are created, priced,
> Active and published to the Online Store (public on passprint.eu). The
> sealed future editions carry neutral public titles ("NP-07 — February 2027
> (sealed)"); their real subjects live in the `subject` metafield and are
> revealed by the site on schedule. This Next.js site reads that live data
> as soon as `SHOPIFY_STOREFRONT_ACCESS_TOKEN` is set; until then it uses the
> identical local content.
>
> **Two things still needed on the commerce side:**
> 1. **Recurring billing.** The three subscription products are ordinary
>    one-time products right now (Monthly €18 charges once, not monthly).
>    Install a Shopify subscriptions app and attach a selling plan to each to
>    make them truly recurring.
> 2. **Future editions are purchasable.** NP-02…NP-12 are Active and priced,
>    so they can be bought today on the Shopify theme. If you only want the
>    current edition sellable, set the future ones to Draft (or mark them
>    out of stock) until their month.

## Where to change things

| What | Where |
|---|---|
| **Prices** | `content/pricing.ts` — the only place |
| Editions, subjects, sites, coordinates | `content/collections.ts` |
| Print sizes / production spec | `production` in `content/collections.ts` |
| Bakir C.'s biography, philosophy, process | `content/artists.ts` |
| The Novi Pazar cultural story | `content/novipazar.ts` |
| Plan copy | `content/subscriptions.ts` |
| FAQ | `content/faq.ts` |
| Vote regions | `content/regions.ts` |
| Languages / UI strings | `content/languages.ts`, `content/dictionary.ts` |
| Colours, spacing, shadows, easing | `app/globals.css` |

An internal reference page lives at **`/styleguide`** (not linked, not indexed).

## Replacing images

There is **no stock photography** anywhere. Until real photos exist, all
artwork is generated as deterministic duotone SVG compositions by
`components/artwork/ArtworkPlaceholder.tsx` (seeded per edition code), and
portraits are honest labelled frames (`components/artist/ArtistPortrait.tsx`)
— never an AI-generated face.

To replace: drop photographs into `public/artworks`, `public/artists`,
`public/collections` (naming conventions in each folder's `README.txt`) and
swap the placeholder components for `next/image`.

## How the globe works

`components/globe/`:

- `Globe.tsx` — client wrapper: detects WebGL, viewport size and reduced
  motion, then dynamically imports the 3D scene (`ssr: false`). While
  loading, and wherever WebGL is missing, it renders `GlobeFallback.tsx`.
- `PaperGlobe.tsx` — the R3F scene: a matte paper-toned sphere, a thin
  pencil graticule, a copper stamped marker on **Novi Pazar**, and a dashed
  route arc from Antwerpen. Slow auto-rotation (stops for reduced motion), a
  damped lean toward the pointer, and an HTML label
  (`Novi Pazar — Collection 01`) on hover. Mobile gets fewer segments; the
  canvas caps at 1.5 dpr.
- **No borders are drawn anywhere** — deliberate, and wise in this region.

## The hover fix

Previously, only the *captions* in the "What arrives each month" flat-lay
were wired for hover, so pointing at a print did nothing until the cursor
happened to land on a caption — which read as a broken, delayed animation.

`components/home/WhatArrives.tsx` now shares one `active` state between each
print object and its caption, with `onPointerEnter`/`onPointerLeave` on both,
and uses explicit transitions (`transition-[opacity,outline-color]`) instead
of `transition-all`. Hovering either highlights the pair immediately and dims
the rest. Keyboard users reach the same state through the caption buttons.

## Deliberate simplifications

- The envelope is layered HTML/CSS/SVG with perspective, not a GLTF model.
- Checkout, accounts, newsletter and contact submission are demo-only seams;
  nothing pretends to work when it doesn't.
- Votes are per-browser (`localStorage`) until Supabase is wired in —
  `submitVote()` in `components/voting/VoteModule.tsx` is the seam.
- Editorial content is not translated yet (see Languages above).

## TODO — real content needed before launch

- [ ] Confirm Bakir C.'s biography with him; replace portrait and studio
      placeholders with real photographs.
- [ ] Photography of actual prints, envelopes and flat lays.
- [ ] Have the Novi Pazar story read by someone from the city and credit
      them by name (`content/novipazar.ts`).
- [ ] Final pricing after print/postage quotes (`content/pricing.ts`).
- [ ] Confirm edition sizes with the printer.
- [ ] Printer name and city (`app/about/page.tsx`).
- [ ] Real email and postal address (`app/contact/page.tsx`).
- [ ] Instagram / Pinterest URLs (`components/layout/Footer.tsx`).
- [ ] Shopify: create products + Storefront token; install a subscriptions
      app for recurring billing.
- [ ] Newsletter + contact endpoints.
- [ ] Legal pages (privacy, terms, withdrawal) — required in BE/EU.
- [ ] Human translation of editorial content for NL/FR/DE.
