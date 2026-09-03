"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultLocale, localeConfigs, locales, type Locale } from "@/content/languages";
import { dictionaries, type Dictionary } from "@/content/dictionary";

const STORAGE_KEY = "passprint-locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Dictionary;
  /** True when the active locale has no human-translated editorial content. */
  editorialFallback: boolean;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value !== null && (locales as readonly string[]).includes(value);
}

/**
 * Interface locale state, persisted per browser.
 *
 * Server renders the default locale so hydration always matches; the stored
 * preference is applied after mount. Editorial long-form stays English until
 * a person has translated it (see content/languages.ts → `editorial`).
 *
 * When the site later moves to URL-based locales (/nl/…), this provider is
 * the only place that changes: read the locale from the route segment
 * instead of localStorage and keep the same `t` shape.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) setLocaleState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale],
      editorialFallback: !localeConfigs[locale].editorial,
    }),
    [locale, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside a LocaleProvider");
  return ctx;
}
