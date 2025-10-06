import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import en from "@/locales/en";
import fr from "@/locales/fr";

const STORAGE_KEY = "tech-stream-learn-locale";

const translations = {
  en,
  fr,
};

type Locale = keyof typeof translations;
type TranslationFunction = (...args: unknown[]) => string;
type TranslationValue = string | TranslationFunction;

interface LocaleOption {
  code: Locale;
  labelKey: string;
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  availableLocales: LocaleOption[];
  t: (key: string, options?: { fallback?: string; values?: Record<string, string>; args?: unknown[] }) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const getNestedValue = (obj: Record<string, unknown>, path: string): TranslationValue | undefined => {
  return path.split(".").reduce<unknown>((acc, segment) => {
    if (acc === undefined || acc === null) {
      return undefined;
    }
    if (typeof acc === "string" || typeof acc === "function") {
      return acc;
    }
    const next = (acc as Record<string, unknown>)[segment];
    if (next === undefined) {
      return undefined;
    }
    return next;
  }, obj) as TranslationValue | undefined;
};

const normalizeValue = (value: TranslationValue | undefined, options?: { values?: Record<string, string>; args?: unknown[] }) => {
  if (!value) return undefined;
  if (typeof value === "string") {
    if (options?.values) {
      return Object.entries(options.values).reduce((acc, [token, replacement]) => acc.replaceAll(`{{${token}}}`, replacement), value);
    }
    return value;
  }
  try {
    if (Array.isArray(options?.args)) {
      return value(...options.args);
    }
    return value();
  } catch (error) {
    console.error("Failed to resolve translation function", error);
    return undefined;
  }
};

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && stored in translations) {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const t = useCallback<LocaleContextValue["t"]>(
    (key, options) => {
      const fallback = options?.fallback ?? key;
      const localized = normalizeValue(getNestedValue(translations[locale] as Record<string, unknown>, key), options);
      if (localized) return localized;
      const english = normalizeValue(getNestedValue(translations.en as unknown as Record<string, unknown>, key), options);
      if (english) return english;
      return fallback;
    },
    [locale],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      availableLocales: [
        { code: "en", labelKey: "locale.english" },
        { code: "fr", labelKey: "locale.french" },
      ],
      t,
    }),
    [locale, t],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

export const useTranslation = () => {
  const { t } = useLocale();
  return { t };
};
