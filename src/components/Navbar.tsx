import { Link } from "react-router-dom"

import { Button } from "./ui/Button"
import { ThemeSwitcher } from "./ThemeSwitcher"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight"
        >
          Dev<span className="text-[var(--accent)]">Show</span>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          <Link
            to="/"
            className="rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          >
            Log in
          </Link>

          <Button size="sm">
            Get started
          </Button>

          <ThemeSwitcher />
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
