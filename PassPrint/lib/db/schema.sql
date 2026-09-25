-- ─────────────────────────────────────────────────────────────────────────
-- PassPrint database schema
-- Run once in the Supabase SQL editor (Dashboard → SQL → New query → Run).
-- ─────────────────────────────────────────────────────────────────────────

-- ── Votes for the next collection ───────────────────────────────────────
-- One vote per email address. The ids match content/countries.ts (vote countries).
create table if not exists public.votes (
  id          uuid primary key default gen_random_uuid(),
  region_id   text        not null,
  email       text        not null,
  locale      text,
  created_at  timestamptz not null default now()
);

-- "One vote per email address" enforced by the database, not by the UI.
create unique index if not exists votes_email_key
  on public.votes (lower(email));

create index if not exists votes_region_idx on public.votes (region_id);

-- ── Newsletter subscribers ──────────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text        not null,
  locale        text,
  source        text        default 'footer',
  -- set once the address has also been pushed to Shopify as a customer
  synced_to_shopify boolean not null default false,
  unsubscribed_at   timestamptz,
  created_at    timestamptz not null default now()
);

create unique index if not exists newsletter_email_key
  on public.newsletter_subscribers (lower(email));

-- ── Contact messages ────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  email       text        not null,
  message     text        not null,
  locale      text,
  handled     boolean     not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists contact_created_idx
  on public.contact_messages (created_at desc);

-- ── Orders mirrored from Shopify webhooks ───────────────────────────────
-- Shopify remains the source of truth for orders; this is a local mirror so
-- the site can show fulfilment state and count an edition's run without
-- calling the Admin API on every request.
create table if not exists public.orders (
  id                bigint primary key,          -- Shopify order id
  order_number      text,
  email             text,
  total             numeric(10,2),
  currency          text,
  financial_status  text,
  fulfillment_status text,
  -- the passprint edition codes in the order, e.g. {YU-01}
  edition_codes     text[],
  raw               jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists orders_email_idx on public.orders (lower(email));

-- ── Row-level security ──────────────────────────────────────────────────
-- Every table is written only by the server using the Supabase secret key
-- (sb_secret_...), which bypasses RLS. Enabling RLS with no permissive
-- policy means the publishable/anon key can read nothing — exactly what we
-- want, since none of this data is public.
alter table public.votes                  enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages       enable row level security;
alter table public.orders                 enable row level security;

-- ── Public vote tally ───────────────────────────────────────────────────
-- A view so the site can show standings without exposing voter emails.
create or replace view public.vote_tally as
  select region_id, count(*)::int as votes
  from public.votes
  group by region_id;
