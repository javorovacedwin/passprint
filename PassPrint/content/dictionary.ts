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
    collection: string;
    howItWorks: string;
    artists: string;
    about: string;
    vote: string;
    join: string;
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
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      collection: "Collection",
      howItWorks: "How It Works",
      artists: "Artists",
      about: "About",
      vote: "Vote",
      join: "Join the club",
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
        "A monthly art publication in an envelope. One place, one artist, one numbered edition — with the story that belongs to it.",
    },
    common: {
      skipToContent: "Skip to content",
      editorialInEnglish: "Stories and biographies are shown in English while translation is in progress.",
    },
  },
  nl: {
    nav: {
      collection: "Collectie",
      howItWorks: "Hoe het werkt",
      artists: "Kunstenaars",
      about: "Over",
      vote: "Stemmen",
      join: "Lid worden",
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
        "Een maandelijkse kunstuitgave in een envelop. Eén plaats, één kunstenaar, één genummerde oplage — met het verhaal erbij.",
    },
    common: {
      skipToContent: "Naar de inhoud",
      editorialInEnglish: "Verhalen en biografieën staan in het Engels zolang de vertaling loopt.",
    },
  },
  fr: {
    nav: {
      collection: "Collection",
      howItWorks: "Comment ça marche",
      artists: "Artistes",
      about: "À propos",
      vote: "Voter",
      join: "Rejoindre le club",
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
        "Une publication d'art mensuelle dans une enveloppe. Un lieu, un artiste, un tirage numéroté — avec le récit qui l'accompagne.",
    },
    common: {
      skipToContent: "Aller au contenu",
      editorialInEnglish: "Les récits et biographies sont en anglais pendant la traduction.",
    },
  },
  de: {
    nav: {
      collection: "Kollektion",
      howItWorks: "So funktioniert es",
      artists: "Künstler",
      about: "Über uns",
      vote: "Abstimmen",
      join: "Mitglied werden",
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
        "Eine monatliche Kunstausgabe im Umschlag. Ein Ort, ein Künstler, eine nummerierte Auflage — mit der dazugehörigen Geschichte.",
    },
    common: {
      skipToContent: "Zum Inhalt springen",
      editorialInEnglish: "Geschichten und Biografien erscheinen auf Englisch, solange die Übersetzung läuft.",
    },
  },
};
