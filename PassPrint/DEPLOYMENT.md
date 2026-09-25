# PassPrint — headless deployment

This document takes the project from "runs locally" to "passprint.eu serves the
custom Next.js storefront, with Shopify as the commerce backend and Shopify-hosted
checkout."

---

## 1. Selected architecture

| Layer | Choice |
|---|---|
| **Public frontend** | Custom **Next.js 15** app (this repo) |
| **Commerce backend** | **Shopify** — products, prices, inventory, customers, orders |
| **Cart** | **Storefront API cart** (server-side mutations; drawer on the site) |
| **Checkout** | **Shopify-hosted checkout** (`cart.checkoutUrl`) |
| **Deployment host** | **Vercel** |

### Why Vercel and not Oxygen
Shopify **Oxygen only hosts Hydrogen** (Shopify's Remix-based framework). This
project is **plain Next.js** — no `@shopify/hydrogen` or `@shopify/remix-oxygen`
in `package.json` — so Oxygen cannot run it. Next.js's first-class host is Vercel.

### The data path
`Next.js page / server action` → `lib/shopify/*` → **Storefront API**
(`x1t200-0i.myshopify.com`) → falls back to `content/*.ts` if the token is
missing or a request fails. The Storefront token is read only on the server
(no `NEXT_PUBLIC_` prefix), so it never ships to the browser.

---

## 2. Environment variables (Vercel → Project → Settings → Environment Variables)

Set these for **Production** (and Preview, if you want previews to hit Shopify):

| Name | Value | Notes |
|---|---|---|
| `SHOPIFY_SHOP_DOMAIN` | `x1t200-0i.myshopify.com` | The **myshopify** domain — most stable for the API. Do **not** use passprint.eu here. |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | *(see §6)* | Catalogue, cart, checkout. |
| `SHOPIFY_CLIENT_ID` | *(Dev Dashboard app)* | Admin API + webhooks. |
| `SHOPIFY_CLIENT_SECRET` | *(Dev Dashboard app)* | Mints Admin tokens **and** verifies webhook HMACs. |
| `SUPABASE_URL` | `https://<project>.supabase.co` | Votes, newsletter, contact. |
| `SUPABASE_SECRET_KEY` | `sb_secret_…` | Server-side secret key. |

Every one is server-side. **None may be prefixed `NEXT_PUBLIC_`.**

There is deliberately no `SHOPIFY_ADMIN_ACCESS_TOKEN`: Admin tokens are
short-lived and minted on demand from the client credentials.

Everything else (colours, copy, fonts) is in the repo. `.env.local`
(git-ignored) mirrors these for local dev.

---

## 3. Deploy to Vercel

The project has no `git` history yet. Either path works:

### Path A — GitHub + Vercel (recommended)
```bash
git init
git add .
git commit -m "PassPrint headless storefront"
# create a repo on github.com, then:
git remote add origin https://github.com/<you>/passprint.git
git push -u origin main
```
Then on **vercel.com** → **Add New Project** → import the repo. Framework preset
auto-detects **Next.js**. Add the two env vars from §2. Deploy.

### Path B — Vercel CLI
```bash
npm i -g vercel
vercel            # first run links/creates the project
vercel env add SHOPIFY_SHOP_DOMAIN production
vercel env add SHOPIFY_STOREFRONT_ACCESS_TOKEN production
vercel env add SHOPIFY_CLIENT_ID production
vercel env add SHOPIFY_CLIENT_SECRET production
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SECRET_KEY production
vercel --prod     # production deployment
```

**First deployment URL:** Vercel gives you `https://<project>.vercel.app`.
Test everything there (see §8) **before** touching DNS.

Build command `next build`, output auto-detected. No config needed; `next.config.ts`
is already present.

---

## 4. The checkout-domain problem (read this before DNS)

Shopify's `cart.checkoutUrl` is built on the store's **primary domain**. Today
that primary domain is `passprint.eu`. If you point `passprint.eu` at Vercel
**without changing Shopify's primary domain**, every checkout link will point at
Vercel and **checkout will break**.

The fix is to give Shopify its own domain for checkout and give Vercel the main
domain. Recommended split:

| Hostname | Points to | Serves |
|---|---|---|
| `passprint.eu` | **Vercel** | the custom storefront |
| `www.passprint.eu` | **Vercel** | the custom storefront |
| `shop.passprint.eu` | **Shopify** | **checkout** (and the Online Store) |

`shop.passprint.eu` becomes Shopify's **primary domain**, so `checkoutUrl`
resolves to `https://shop.passprint.eu/checkouts/…` — Shopify-hosted, SSL by
Shopify, and branded. Customers only ever land there to pay.

*(Simpler alternative: skip `shop.passprint.eu`, set the myshopify domain as
primary, and checkout runs on `x1t200-0i.myshopify.com`. Functional, less
branded. The rest of this guide uses the recommended split.)*

---

## 5. Exact DNS changes for passprint.eu

Make these at your DNS provider (where the passprint.eu zone lives). **I will not
change DNS automatically — the connected Shopify tools cannot edit DNS, and you
asked to review changes first.** Apply them yourself.

### CHANGE — point the site at Vercel
| Record | Host | Current (Shopify) | New (Vercel) |
|---|---|---|---|
| `A` | `@` (apex `passprint.eu`) | `23.227.38.65` (Shopify) | **`76.76.21.21`** (Vercel) |
| `CNAME` | `www` | `shops.myshopify.com` | **`cname.vercel-dns.com`** |

*(Vercel shows the exact target after you add the domain in its dashboard; use
whatever it displays — the apex A value is currently `76.76.21.21`.)*

### ADD — a Shopify checkout subdomain
| Record | Host | Value |
|---|---|---|
| `CNAME` | `shop` | `shops.myshopify.com` |

### DO NOT TOUCH — preserve these (see §7)
- **All `MX` records** (email delivery).
- **All `TXT` records**: SPF (`v=spf1 …`), DKIM (`…._domainkey`), DMARC
  (`_dmarc`), and any domain-verification TXT.
- Any other subdomain records (`mail`, `autodiscover`, etc.).

### Order of operations
1. Deploy to Vercel and add `passprint.eu` + `www.passprint.eu` as domains in the
   Vercel project (Vercel will tell you they're "misconfigured" until DNS updates).
2. In Shopify, add & verify `shop.passprint.eu` and set it primary (§6).
3. Only then flip the apex `A` and `www` `CNAME` to Vercel.
4. Wait for propagation (minutes to a few hours). Vercel issues SSL automatically.

---

## 6. Exact Shopify admin settings

### a) Create the app (only you can do this — AI tools are blocked from issuing credentials)

Admin-created custom apps are no longer available for new installs, so use a
**Dev Dashboard app**:

1. **shopify.dev → Dev Dashboard → Create app**, name it e.g. "PassPrint
   storefront", and install it on the `x1t200-0i` store.
2. **Storefront API** scopes — enable:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   Copy the **Storefront API access token** →
   `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
3. **Admin API** scopes — enable `read_orders`, `read_customers`,
   `write_customers`.
4. **Client credentials** — copy the **Client ID** and **Client Secret** →
   `SHOPIFY_CLIENT_ID` and `SHOPIFY_CLIENT_SECRET`.

You never copy an Admin API token: the server exchanges the client
credentials for one on demand and refreshes it before the ~24-hour expiry.
The Client Secret also signs the webhooks, so there is nothing further to
configure for §c below beyond registering the topics.

### b) Domains
1. **Settings → Domains → Connect existing domain** → `shop.passprint.eu`
   (after the CNAME in §5 exists). Verify.
2. Set **`shop.passprint.eu` as the primary domain**.
3. Remove `passprint.eu` / `www.passprint.eu` from Shopify's connected domains
   (they now belong to Vercel). Shopify will stop trying to serve them.

### c) Checkout
No change needed — Shopify checkout follows the primary domain automatically.
Payment providers (Shopify Payments / Bancontact) stay exactly as they are.

---

## 7. Preserving email and other DNS records

Moving the website has **nothing to do with email**. Email is driven by `MX` and
`TXT` records, and the two changes in §5 only touch the apex `A` record and the
`www` `CNAME`. As long as you:

- **do not delete or edit any `MX` record**,
- **do not delete or edit `TXT` records** (SPF / DKIM / DMARC / verification),
- **only** change the apex `A` and the `www` `CNAME`, and **add** the `shop` CNAME,

email keeps working unchanged. If your DNS UI has an "email protection" or
"managed email" toggle, leave it on. Take a screenshot of the current zone before
editing, so you can compare afterwards.

---

## 8. Current Shopify Online Store channel & Dawn theme

**Keep the Online Store sales channel enabled. Do not delete it, do not unpublish
the theme.** Here's why and what changes:

- The **Storefront API reads products that are published to the Online Store
  channel** — that's how the custom site gets them. Disabling the channel would
  blank the catalogue.
- **Checkout is served by the Online Store** (on `shop.passprint.eu`). Removing it
  breaks checkout.
- After the domain split, the **Dawn theme is only reachable at
  `shop.passprint.eu`**, never at `passprint.eu`. Customers browsing the custom
  site never see it; they only touch Shopify at the `/checkouts/…` step.
- Optional polish: edit the Dawn theme's home template to **redirect
  `shop.passprint.eu` → `https://passprint.eu`**, so a stray visit to the shop
  root lands on the real site. This is cosmetic; checkout URLs are unaffected.

Net: Shopify becomes a **headless backend + checkout host**, not a storefront.

---

## 9. Test checklist

Run against the Vercel URL first, then again after DNS on `https://passprint.eu`.

**Storefront + data**
- [ ] Home, /collection, /artists, /about, /how-it-works, /subscribe, /vote,
      /faq, /contact all return 200.
- [ ] /collection shows 12 plates; prices/edition data match Shopify.
- [ ] /subscribe shows €18 / €192 / €54 (or your current Shopify prices).
- [ ] No `NEXT_PUBLIC_SHOPIFY` anything in the browser (View Source → search
      "storefront" / the token: must not appear).

**Cart (needs the token set)**
- [ ] The cart control appears in the header once the token is live.
- [ ] "Add to cart" on a subscription and on "Buy this edition" opens the drawer
      with the correct line, price and quantity.
- [ ] Quantity +/- and Remove update the drawer.
- [ ] "Checkout" goes to `https://shop.passprint.eu/checkouts/…` (Shopify), not to
      Dawn's product pages, and not to a Vercel 404.
- [ ] Completing a test order creates an order in Shopify admin.

**Domain / no-Dawn-leak**
- [ ] `https://passprint.eu` and `https://www.passprint.eu` show the **custom
      site**, not Dawn.
- [ ] Browsing never bounces the customer to the Dawn theme (only checkout is on
      the Shopify domain).
- [ ] Email still arrives (send yourself a test) — MX/TXT untouched.

**Resilience**
- [ ] Temporarily blank the token in a Preview deploy → site still renders with
      local fallback data and buttons read "Available soon" (no crash).

---

## 10. What you personally must do

1. **Create the Storefront API token** (§6a) — blocked for AI tools; only you can.
2. **Deploy to Vercel** (§3) and add the two env vars (§2).
3. **Add `shop.passprint.eu` in Shopify and set it primary; remove passprint.eu
   from Shopify domains** (§6b).
4. **Edit DNS** (§5) — apex `A` → Vercel, `www` CNAME → Vercel, add `shop`
   CNAME → Shopify. Leave MX/TXT alone.
5. **Decide on future editions** — once AT-02…AT-12 exist in Shopify, set the
   ones you don't want sold yet to Draft or out-of-stock.
6. **Install the Shopify Subscriptions app** and attach a selling plan to each
   of the three subscription products (already created, tagged `subscription`):
   - *PassPrint — 1 month* (`subscription-monthly`, €15): deliver and bill every month.
   - *PassPrint — 6 months* (`subscription-six-months`, €84): prepaid — bill
     every 6 months, deliver every month.
   - *PassPrint — 1 year* (`subscription-annual`, €156): prepaid — bill every
     12 months, deliver every month.
   Until a product has a selling plan its button on the site stays disabled, so
   nobody can be charged once for a "subscription". The Storefront token needs
   the `unauthenticated_read_selling_plans` scope.
7. Optional: add product images in Shopify; add the Dawn → passprint.eu redirect.

Everything in §1–4 of the code (framework, cart, fallback, ISR, secrets) is done
and building green. The steps above are the operational parts only you can do.
