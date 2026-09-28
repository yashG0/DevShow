import type { ReactNode } from "react";
import { Check, ChevronDown, Moon, Palette, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useTheme } from "../theme/ThemeProvider";
import { themes, type ThemeName } from "../theme/themes";

const lightThemes = themes.filter((theme) => theme.mode === "light");

const darkThemes = themes.filter((theme) => theme.mode === "dark");

const themeColors: Record<ThemeName, string> = {
  paper: "#4f46e5",
  arctic: "#2563eb",
  lavender: "#7c3aed",
  mint: "#059669",
  blush: "#e11d48",
  obsidian: "#8b5cf6",
  midnight: "#3b82f6",
  violet: "#a855f7",
  emerald: "#10b981",
  rose: "#f43f5e",
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function selectTheme(name: ThemeName) {
    setTheme(name);
    setOpen(false);
  }

  const currentTheme = themes.find((item) => item.name === theme);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Change appearance"
        className={[
          "flex items-center gap-2",
          "rounded-[var(--radius-md)]",
          "border border-[var(--border)]",
          "bg-[var(--surface)]",
          "px-3 py-2",
          "text-[var(--text-secondary)]",
          "transition",
          "hover:bg-[var(--surface-hover)]",
          "hover:text-[var(--text-primary)]",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[var(--accent)]/30",
        ].join(" ")}
      >
        <Palette size={16} />

        <span className="hidden text-sm sm:block">{currentTheme?.label}</span>

        <ChevronDown
          size={15}
          className={["transition-transform", open ? "rotate-180" : ""].join(
            " ",
          )}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Appearance"
          className={[
            "absolute right-0 top-full z-50 mt-2",
            "w-[320px]",
            "rounded-[var(--radius-xl)]",
            "border border-[var(--border)]",
            "bg-[var(--surface)]",
            "p-4",
            "shadow-[var(--shadow-md)]",
          ].join(" ")}
        >
          <div className="mb-4">
            <h2 className="text-sm font-semibold">Appearance</h2>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Choose a visual theme for DevShow.
            </p>
          </div>

          <ThemeGroup
            icon={<Sun size={15} />}
            label="Light"
            themes={lightThemes}
            selectedTheme={theme}
            onSelect={selectTheme}
          />

          <div className="my-4 border-t border-[var(--border)]" />

          <ThemeGroup
            icon={<Moon size={15} />}
            label="Dark"
            themes={darkThemes}
            selectedTheme={theme}
            onSelect={selectTheme}
          />
        </div>
      )}
    </div>
  );
}

type ThemeGroupProps = {
  icon: ReactNode;
  label: string;
  themes: typeof themes;
  selectedTheme: ThemeName;
  onSelect: (theme: ThemeName) => void;
};

function ThemeGroup({
  icon,
  label,
  themes,
  selectedTheme,
  onSelect,
}: ThemeGroupProps) {
  return (
    <section>
      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)]">
        {icon}
        <span>{label}</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {themes.map((item) => {
          const selected = item.name === selectedTheme;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onSelect(item.name)}
              className={[
                "group flex items-center gap-3",
                "rounded-[var(--radius-md)]",
                "border",
                "p-2.5",
                "text-left",
                "transition",
                selected
                  ? "border-[var(--accent)] bg-[var(--surface-hover)]"
                  : "border-transparent hover:border-[var(--border)] hover:bg-[var(--surface-hover)]",
              ].join(" ")}
            >
              <span
                className="h-7 w-7 shrink-0 rounded-full ring-4 ring-black/5"
                style={{
                  backgroundColor: themeColors[item.name],
                }}
              />

              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium">
                  {item.label}
                </span>
              </span>

              {selected && (
                <Check size={15} className="shrink-0 text-[var(--accent)]" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
