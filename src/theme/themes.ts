export type ThemeMode = "light" | "dark";

export type ThemeName =
  | "paper"
  | "arctic"
  | "lavender"
  | "mint"
  | "blush"
  | "obsidian"
  | "midnight"
  | "violet"
  | "emerald"
  | "rose";

export type Theme = {
  name: ThemeName;
  mode: ThemeMode;
  label: string;
};

export const themes: Theme[] = [
  {
    name: "paper",
    mode: "light",
    label: "Paper",
  },
  {
    name: "arctic",
    mode: "light",
    label: "Arctic",
  },
  {
    name: "lavender",
    mode: "light",
    label: "Lavender",
  },
  {
    name: "mint",
    mode: "light",
    label: "Mint",
  },
  {
    name: "blush",
    mode: "light",
    label: "Blush",
  },
  {
    name: "obsidian",
    mode: "dark",
    label: "Obsidian",
  },
  {
    name: "midnight",
    mode: "dark",
    label: "Midnight",
  },
  {
    name: "violet",
    mode: "dark",
    label: "Violet",
  },
  {
    name: "emerald",
    mode: "dark",
    label: "Emerald",
  },
  {
    name: "rose",
    mode: "dark",
    label: "Rose",
  },
];
