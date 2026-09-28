import { useTheme } from "../theme/ThemeProvider"
import { themes } from "../theme/themes"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <select
      value={theme}
      onChange={(event) =>
        setTheme(event.target.value as typeof theme)
      }
      aria-label="Select theme"
      className={[
        "rounded-[var(--radius-md)]",
        "border border-[var(--border)]",
        "bg-[var(--surface)]",
        "px-3 py-2",
        "text-sm text-[var(--text-primary)]",
        "outline-none",
        "transition",
        "focus:border-[var(--accent)]",
        "focus:ring-2",
        "focus:ring-[var(--accent)]/20",
      ].join(" ")}
    >
      {themes.map((item) => (
        <option key={item.name} value={item.name}>
          {item.label}
        </option>
      ))}
    </select>
  )
}
