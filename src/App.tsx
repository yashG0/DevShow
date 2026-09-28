import { themes } from "./theme/themes";
import { useTheme } from "./theme/ThemeProvider";

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium text-[var(--accent)]">
            DEVSHOW
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Showcase what you build.
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-[var(--text-secondary)]">
            A modern home for developers to present their projects, skills, and
            work.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {themes.map((item) => (
            <button
              key={item.name}
              onClick={() => setTheme(item.name)}
              className={[
                "rounded-[var(--radius-lg)] border p-4 text-left",
                "border-[var(--border)] bg-[var(--surface)]",
                "transition-all duration-200",
                "hover:bg-[var(--surface-hover)]",
                theme === item.name ? "ring-2 ring-[var(--accent)]" : "",
              ].join(" ")}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium">{item.label}</span>

                <span className="text-xs text-[var(--text-muted)]">
                  {item.mode}
                </span>
              </div>

              <div className="h-2 rounded-full bg-[var(--accent)]" />
            </button>
          ))}
        </div>

        <div className="mt-12 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-md)]">
          <h2 className="text-xl font-semibold">Design System Preview</h2>

          <p className="mt-2 text-[var(--text-secondary)]">
            Current theme: {theme}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 font-medium text-[var(--accent-foreground)] transition hover:bg-[var(--accent-hover)]">
              Primary Action
            </button>

            <button className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 font-medium transition hover:bg-[var(--surface-hover)]">
              Secondary Action
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
