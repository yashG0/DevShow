import { ChevronDown, Code2, FolderGit2, Home, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/Button";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-5 sm:px-6">
        {/* Brand */}

        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]/40">
            <Code2 size={17} strokeWidth={2.2} />
          </div>

          <span className="text-[15px] font-semibold tracking-[-0.02em]">
            Dev<span className="text-[var(--accent)]">Show</span>
          </span>
        </Link>

        {/* Navigation */}

        <nav className="ml-8 hidden items-center gap-1 md:flex">
          <NavItem to="/" icon={<Home size={15} />}>
            Home
          </NavItem>

          {user && (
            <NavItem to="/dashboard" icon={<FolderGit2 size={15} />}>
              Projects
            </NavItem>
          )}
        </nav>

        {/* Right side */}

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <>
              <div className="hidden h-5 w-px bg-[var(--border)] sm:block" />

              {/* User / Profile */}

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="group hidden items-center gap-2 rounded-[var(--radius-md)] px-2 py-1.5 transition-colors hover:bg-[var(--surface-hover)] sm:flex"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-semibold text-[var(--accent-foreground)]">
                  {user.display_name?.charAt(0).toUpperCase()}
                </div>

                <div className="max-w-28 text-left">
                  <p className="truncate text-xs font-medium">
                    {user.display_name}
                  </p>

                  <p className="truncate text-[11px] text-[var(--text-muted)]">
                    @{user.username}
                  </p>
                </div>

                <ChevronDown size={14} className="text-[var(--text-muted)]" />
              </button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden sm:inline-flex"
              >
                <LogOut size={15} />
                Log out
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hidden px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text)] sm:block"
              >
                Log in
              </NavLink>

              <Button size="sm" onClick={() => navigate("/register")}>
                Get started
              </Button>
            </>
          )}

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

function NavItem({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "inline-flex items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-[var(--surface)] text-[var(--text)]"
            : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]",
        ].join(" ")
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}
