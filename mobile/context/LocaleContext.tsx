import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import fr from "@/lib/locales/fr.json";
import en from "@/lib/locales/en.json";

export type Locale = "fr" | "en";

const dictionaries: Record<Locale, Record<string, unknown>> = { fr, en };
const STORAGE_KEY = "aliefe.locale";

function resolvePath(dict: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
}

function interpolate(value: string, vars?: Record<string, string | number>): string {
  if (!vars) return value;
  return Object.entries(vars).reduce(
    (str, [k, v]) => str.replaceAll(`{{${k}}}`, String(v)),
    value
  );
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, vars?: Record<string, string | number>) => string;
  tList: (path: string) => string[];
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

function detectDeviceLocale(): Locale {
  const tag = Localization.getLocales()[0]?.languageCode;
  return tag === "en" ? "en" : "fr";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectDeviceLocale());

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === "fr" || stored === "en") {
        setLocaleState(stored);
      }
    });
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      const value = resolvePath(dictionaries[locale], path) ?? resolvePath(dictionaries.fr, path);
      if (typeof value !== "string") return path;
      return interpolate(value, vars);
    },
    [locale]
  );

  const tList = useCallback(
    (path: string) => {
      const value = resolvePath(dictionaries[locale], path) ?? resolvePath(dictionaries.fr, path);
      return Array.isArray(value) ? (value as string[]) : [];
    },
    [locale]
  );

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale, t, tList }), [locale, setLocale, t, tList]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
