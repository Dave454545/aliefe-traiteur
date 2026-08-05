import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { palettes, type Palette } from "@/constants/theme";

type ThemeMode = "light" | "dark" | "system";
type ResolvedScheme = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  scheme: ResolvedScheme;
  colors: Palette;
  setMode: (mode: ThemeMode) => void;
  toggleScheme: () => void;
};

const STORAGE_KEY = "aliefe.theme-mode";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === "light" || stored === "dark" || stored === "system") {
        setModeState(stored);
      }
    });
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const scheme: ResolvedScheme = mode === "system" ? (systemScheme === "dark" ? "dark" : "light") : mode;

  const toggleScheme = useCallback(() => {
    setMode(scheme === "dark" ? "light" : "dark");
  }, [scheme, setMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, scheme, colors: palettes[scheme], setMode, toggleScheme }),
    [mode, scheme, setMode, toggleScheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
