import type { Locale } from "./languages";

/*
  Interface strings, per language. Editorial long-form (stories, artist
  biography, collection essays) is NOT here — that lives in the content
  files in English and is translated by a person, not by us, per language.

  TODO before a locale is marked `editorial: true` in content/languages.ts:
  have a native speaker translate the editorial content and wire it in the
  same shape as this dictionary.
*/

export interface Dictionary {
  nav: {
    originals: string;
    prints: string;
    comingSoon: string;
    /** The one-line teaser shown on the PassPrint menu item. */
    passprintTeaser: string;
    artist: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  };
  footer: {
    index: string;
    elsewhere: string;
    language: string;
    newsletter: string;
    newsletterAction: string;
    newsletterDone: string;
    rights: string;
    tagline: string;
  };
  common: {
    skipToContent: string;
    editorialInEnglish: string;
    /** The running line at the very top of every page. */
    announcement: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      originals: "Originals",
      prints: "Prints",
      comingSoon: "Coming soon",
      passprintTeaser: "A numbered print in an envelope, once a month — one country at a time.",
      artist: "Artist",
      contact: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
    },
    footer: {
      index: "Index",
      elsewhere: "Elsewhere",
      language: "Language",
      newsletter: "One email per month",
      newsletterAction: "Sign",
      newsletterDone: "Noted. One email per month, when the new edition closes.",
      rights: "Printed matter, sent as ordinary post.",
      tagline:
        "Paintings and prints by Bakir C., from a studio in Novi Pazar.",
    },
    common: {
      skipToContent: "Skip to content",
      editorialInEnglish: "Stories and biographies are shown in English while translation is in progress.",
      announcement: "The PassPrint mail club is coming soon",
    },
  },
  nl: {
    nav: {
      originals: "Originelen",
      prints: "Prints",
      comingSoon: "Binnenkort",
      passprintTeaser: "Eén genummerde print in een envelop, elke maand — land per land.",
      artist: "Kunstenaar",
      contact: "Contact",
      openMenu: "Menu openen",
      closeMenu: "Menu sluiten",
      language: "Taal",
    },
    footer: {
      index: "Index",
      elsewhere: "Elders",
      language: "Taal",
      newsletter: "Eén e-mail per maand",
      newsletterAction: "Inschrijven",
      newsletterDone: "Genoteerd. Eén e-mail per maand, wanneer de nieuwe editie sluit.",
      rights: "Drukwerk, verstuurd als gewone post.",
      tagline:
        "Schilderijen en prints van Bakir C., uit een atelier in Novi Pazar.",
    },
    common: {
      skipToContent: "Naar de inhoud",
      editorialInEnglish: "Verhalen en biografieën staan in het Engels zolang de vertaling loopt.",
      announcement: "De PassPrint-mailclub komt binnenkort",
    },
  },
  fr: {
    nav: {
      originals: "Originaux",
      prints: "Tirages",
      comingSoon: "Bientôt",
      passprintTeaser: "Un tirage numéroté sous enveloppe, chaque mois — un pays à la fois.",
      artist: "Artiste",
      contact: "Contact",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      language: "Langue",
    },
    footer: {
      index: "Index",
      elsewhere: "Ailleurs",
      language: "Langue",
      newsletter: "Un e-mail par mois",
      newsletterAction: "S'inscrire",
      newsletterDone: "Noté. Un e-mail par mois, à la clôture de chaque édition.",
      rights: "Imprimé, envoyé par courrier ordinaire.",
      tagline:
        "Peintures et tirages de Bakir C., depuis un atelier à Novi Pazar.",
    },
    common: {
      skipToContent: "Aller au contenu",
      editorialInEnglish: "Les récits et biographies sont en anglais pendant la traduction.",
      announcement: "Le club postal PassPrint arrive bientôt",
    },
  },
  de: {
    nav: {
      originals: "Originale",
      prints: "Drucke",
      comingSoon: "Demnächst",
      passprintTeaser: "Ein nummerierter Druck im Umschlag, jeden Monat — ein Land nach dem anderen.",
      artist: "Künstler",
      contact: "Kontakt",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      language: "Sprache",
    },
    footer: {
      index: "Index",
      elsewhere: "Anderswo",
      language: "Sprache",
      newsletter: "Eine E-Mail pro Monat",
      newsletterAction: "Eintragen",
      newsletterDone: "Notiert. Eine E-Mail pro Monat, wenn die neue Ausgabe schließt.",
      rights: "Drucksache, versendet als gewöhnliche Post.",
      tagline:
        "Gemälde und Drucke von Bakir C., aus einem Atelier in Novi Pazar.",
    },
    common: {
      skipToContent: "Zum Inhalt springen",
      editorialInEnglish: "Geschichten und Biografien erscheinen auf Englisch, solange die Übersetzung läuft.",
      announcement: "Der PassPrint-Postclub kommt bald",
    },
  },
};
