import { LayoutDashboard, LogOut } from "lucide-react"
import { NavLink, Link, useNavigate } from "react-router-dom"

import { useAuth } from "../auth/AuthProvider"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { Button } from "./ui/Button"

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/", { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight"
        >
          Dev<span className="text-[var(--accent)]">Show</span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              [
                "hidden rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors sm:block",
                isActive
                  ? "text-[var(--text)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]",
              ].join(" ")
            }
          >
            Home
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  [
                    "inline-flex items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[var(--surface)] text-[var(--text)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]",
                  ].join(" ")
                }
              >
                <LayoutDashboard size={16} />
                <span className="hidden sm:inline">
                  Dashboard
                </span>
              </NavLink>

              <div className="mx-2 hidden h-6 w-px bg-[var(--border)] sm:block" />

              <span className="hidden max-w-32 truncate px-2 text-sm font-medium sm:block">
                {user.display_name}
              </span>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                aria-label="Log out"
                title="Log out"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">
                  Log out
                </span>
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hidden rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)] sm:block"
              >
                Log in
              </NavLink>

              <Button
                size="sm"
                onClick={() => navigate("/register")}
              >
                Get started
              </Button>
            </>
          )}

          <div className="ml-1">
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  )
}