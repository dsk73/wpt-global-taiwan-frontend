//src/providers/LocaleProvider.tsx

"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "zh-Hant-TW" | "en" | "ms-MY";

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextType | null>(null);

interface LocaleProviderProps {
  locale: Locale;
  children: ReactNode;
}

const STORAGE_KEY = "wpt-locale";

export function LocaleProvider({
  locale: initialLocale,
  children,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLocale);

      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocaleState(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null;

    if (savedLocale && savedLocale !== locale) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(savedLocale);
    }
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
