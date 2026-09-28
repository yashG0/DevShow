import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { themes, type ThemeName } from "./themes";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "devshow-theme";

function getInitialTheme(): ThemeName {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored && themes.some((theme) => theme.name === stored)) {
    return stored as ThemeName;
  }

  return "obsidian";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(getInitialTheme);

  const setTheme = (nextTheme: ThemeName) => {
    setThemeState(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    const selectedTheme = themes.find((item) => item.name === theme);

    document.documentElement.dataset.mode = selectedTheme?.mode ?? "dark";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
