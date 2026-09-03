/*
  Language configuration — the single place to add a language.

  Adding one means: add an entry here, then add the matching block to
  content/dictionary.ts. The switcher, the <html lang> attribute and the
  footer all read from this list, so nothing else needs touching.

  `editorial` marks whether the long-form editorial content (stories,
  biographies, collection essays) has been translated yet. Interface chrome
  is translated for every locale below; editorial text falls back to English
  until a human translator has done it — we do not machine-translate
  cultural writing.
*/

export const locales = ["en", "nl", "fr", "de"] as const;

export type Locale = (typeof locales)[number];

export interface LocaleConfig {
  code: Locale;
  /** Short label for the switcher, e.g. "EN". */
  short: string;
  /** The language's own name, as speakers write it. */
  native: string;
  /** English name, for aria labels. */
  english: string;
  /** Has the editorial long-form been translated by a person? */
  editorial: boolean;
}

export const localeConfigs: Record<Locale, LocaleConfig> = {
  en: { code: "en", short: "EN", native: "English", english: "English", editorial: true },
  nl: { code: "nl", short: "NL", native: "Nederlands", english: "Dutch", editorial: false },
  fr: { code: "fr", short: "FR", native: "Français", english: "French", editorial: false },
  de: { code: "de", short: "DE", native: "Deutsch", english: "German", editorial: false },
};

export const defaultLocale: Locale = "en";

export const localeList: LocaleConfig[] = locales.map((l) => localeConfigs[l]);
