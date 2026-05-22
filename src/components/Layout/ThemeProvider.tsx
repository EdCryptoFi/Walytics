"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeValues {
  animations: boolean;
  dark: boolean;
  type: "chunky" | "victorian" | "mono";
  palette: "mint" | "burgundy" | "indigo" | "mustard";
  pattern: "map" | "plain" | "tartan";
}

interface ThemeContextValue extends ThemeValues {
  setTheme: (key: keyof ThemeValues, value: ThemeValues[keyof ThemeValues]) => void;
}

const defaults: ThemeValues = {
  animations: true,
  dark: false,
  type: "chunky",
  palette: "mint",
  pattern: "map",
};

const ThemeContext = createContext<ThemeContextValue>({
  ...defaults,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeValues>(defaults);

  useEffect(() => {
    const b = document.body;
    b.dataset.anim    = theme.animations ? "on" : "off";
    b.dataset.theme   = theme.dark ? "dark" : "light";
    b.dataset.type    = theme.type;
    b.dataset.palette = theme.palette;
    b.dataset.pattern = theme.pattern;
  }, [theme]);

  function setTheme(key: keyof ThemeValues, value: ThemeValues[keyof ThemeValues]) {
    setThemeState(prev => ({ ...prev, [key]: value }));
  }

  return (
    <ThemeContext.Provider value={{ ...theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
