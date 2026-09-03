# PassPrint — projectcontext

Lees `passprint-plan.md` in deze map voor het volledige strategische plan (39 p.).
Dit bestand bevat alleen de regels waar je je bij het bouwen aan moet houden.

## Wat PassPrint is

Maandelijkse kunstuitgave in een envelop. Elke maand één plaats, door één kunstenaar,
in een genummerde oplage, met het verhaal erbij. Twaalf maanden = één collectie.
Eerste collectie: de Balkan. Eerste markt: BE/NL. Talen v1: NL + EN.

Interne woorden: **editie** = één maand, **collectie** = twaalf maanden.
Editiecode: `BAL-03 · MOSTAR · 43.3438 N, 17.8078 E · oplage 180`.

## Creatieve richting: "Stempelboek" (definitief — vervangt "Archief")

> **Belangrijk:** de eigenaar heeft de minimalistische "Archief"-richting
> expliciet verworpen (*"art's biggest enemy is minimalism"*) en daarna twee
> **officiële logo's** aangeleverd. Die logo's zijn nu de bron van waarheid
> voor het hele ontwerp. Volg ze; volg niet de minimalistische richting uit
> het plan, en ook niet de eerdere felle riso-posterrichting.

Organisatieprincipe = een **doorleefd paspoort / poststempel**. Rijkdom komt
uit **ornament en gravure**, niet uit veel kleuren of effecten: gestempelde
inkt met versleten randen, dubbele kaderlijnen, guilloche-rozetten,
gebogen letters op cirkels, perforatieranden, annuleringsgolven.

**Geen harde offset-schaduwen** (dat leest als neo-brutalisme / retro-gaming).
Kaders zijn gegraveerde dubbele lijnen.

### Officiële identiteit — twee inkten

```
--paper:  #F0E9DB   /* havermout papier */
--ink:    #1C2434   /* tekst, diep marineblauw-zwart */
--navy:   #1E3A60   /* PRIMAIR — ringen, letters, gravure */
--rust:   #BF5A2C   /* ACCENT — EST./2026, golven, roundel */
```

Alleen deze twee inkten. De oude namen (`vermilion`, `cobalt`, `verde`,
`marigold`, `rosa`) verwijzen nu allemaal naar navy- of rust-varianten,
zodat bestaande classes automatisch meegaan.

### De merktekens

- **Het zegel** (`components/brand/SealLogo.tsx`) — primair. Dubbele ring,
  `PASSPRINT` boven, `PRINTED MEMORIES` onder, `EST.`/`2026` in rust, en het
  geperforeerde postzegeltje met de **P** in het midden.
- **De cartouche** (`components/brand/CartoucheLogo.tsx`) — ceremonieel.
  `JOURNEYS · MARKED`, gegraveerde wereldbol, wordmark, zeshoekige badges
  (vliegtuig + kompasroos), `PRINTED MEMORIES · STAMPED STORIES`, coördinaten.
- **Merkregels:** *Printed memories. Stamped stories.* · *Journeys marked.*
- **Est. 2026.**

Typografie: **Spectral** of **Newsreader** (titels + lopende tekst) +
**IBM Plex Mono** (codes, cijfers, datums, coördinaten, oplages, prijzen).
Max. 2 families, 3 gewichten, 4 woff2-bestanden totaal.
Subset: `latin` + **`latin-ext`** (verplicht — č ć š ž đ in plaatsnamen).

### Verboden (dit maakt sites AI-achtig)

Gecentreerde hero met twee knoppen · **gradiënten** (vlakke kleurvlakken wél) ·
glassmorphism · afgeronde kaarten met wazige schaduw · bento grids · iconen in
gekleurde cirkels · pills · scroll-reveal op elk element ·
Inter/Poppins/Montserrat/Space Grotesk · dark mode met neon · fake statistieken ·
verzonnen testimonials · stock- of AI-beeld als hoofdcontent · mock-ups in
plaats van echte foto's.

De rijkdom moet uit drukwerkambacht komen (inkt, papier, ornament, typografie),
nooit uit effecten.

### Animatieregels

1. Alles beweegt als papier of inkt: schuiven, kantelen, stempelen. Nooit faden,
   zweven, pulseren, gloeien.
2. Max. één betekenisvolle beweging per sectie.
3. 200–500 ms, `cubic-bezier(.2,.7,.3,1)`, geen bounce/spring.
4. `prefers-reduced-motion: reduce` schakelt alles uit; de site moet stil even goed zijn.

Volledige lijst v1: stempel in hero (1×), onderdelen die uit de envelop schuiven,
FAQ-uitklap, paginaovergang (blad papier omhoog), bevestigingsstempel na bestelling.
Geen Three.js, geen R3F, geen Spline, geen Lottie.

## Stack

MVP: **Shopify Basic + zelfgeschreven theme (Liquid, geen page builder, geen
gekocht theme)** + Shopify Subscriptions + metaobjecten voor redactionele inhoud.
Zo weinig mogelijk apps. Analytics cookieloos (Plausible/Fathom).

Migratiepad v2/v3: Next.js frontend op Shopify Storefront API + Sanity voor
verhalen. Datamodel hieronder is voor beide identiek — niet afwijken.

## Datamodel (kern)

`Collection` 1—12 `Edition`. Elke `Edition` → één `Place`, één `Artist`,
twee `Artwork` (groot A4 / klein A6), één `Story`, één `Product`.
`Member` → veel `PassportEntry` (edition + printnummer + ontvangenOp).

Alles op de site is een weergave van `Edition`: homepage = de lopende,
archief = alle afgesloten, kaart = hun `Place`, SEO-pagina's = hun `Story`,
paspoort = filter per lid. `altTekst` is een **verplicht** veld op `Artwork`.
Druk-bestanden (300 dpi) buiten het CMS: `BAL-03_MOSTAR_LARGE_300dpi.tif`.

## Scope v1 — twaalf pagina's, niets meer

Home · Deze maand · Hoe het werkt · Abonneren · Cadeau · Kunstenaars · Over ·
FAQ · Verzending · Contact · Juridisch · Account.

**Niet in v1:** archief, kaart, stemmen, journal, digitaal paspoort, winkel,
collector's box, kunstenaarsdetailpagina's, FR/DE, verzending buiten BE/NL.

## Prestatiebudget (harde grens)

LCP < 2,0 s op 4G-mobiel · JS < 120 KB gzip · hero-beeld < 180 KB ·
fonts < 180 KB · CLS < 0,05 · INP < 200 ms · < 35 requests op home.
De hero is typografisch, dus de LCP is tekst — houd dat zo.

## Toon

Feiten boven gevoelens ("300 g, ongestreken" niet "prachtig papier").
Mensen bij naam. Schrappen: ontdekken, beleven, uniek, exclusief, magisch,
curated, "reis" (behalve letterlijk).
Balkan: lokale spelling met diakritische tekens, land alleen ter oriëntatie,
nooit "de Balkan" als eenheid, geen grenzen op kaarten, meelezer per editie vermelden.
