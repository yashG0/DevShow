import { ArrowRight, ExternalLink, Plus } from "lucide-react"

import { useAuth } from "../auth/AuthProvider"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"

export function Dashboard() {
  const { user } = useAuth()

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-medium text-[var(--accent)]">
          Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome back, {user?.display_name}.
        </h1>

        <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
          Manage your developer profile and showcase the projects
          you're building.
        </p>
      </div>

      {/* Overview */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)]">
                Profile
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {user?.display_name}
              </h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                @{user?.username}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-sm font-semibold text-[var(--accent)]">
              {user?.display_name?.charAt(0).toUpperCase()}
            </div>
          </div>

          {user?.bio ? (
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
              {user.bio}
            </p>
          ) : (
            <p className="mt-5 text-sm text-[var(--text-muted)]">
              Your profile doesn't have a bio yet.
            </p>
          )}

          <div className="mt-6">
            <Button variant="secondary">
              Edit profile
              <ArrowRight size={16} />
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Public profile
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Your developer page
          </h2>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            Your public DevShow profile will live at:
          </p>

          <div className="mt-4 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
            <code className="block truncate text-sm text-[var(--accent)]">
              /dev/{user?.username}
            </code>
          </div>

          <div className="mt-6">
            <Button variant="secondary">
              View profile
              <ExternalLink size={16} />
            </Button>
          </div>
        </Card>
      </div>

      {/* Projects */}
      <div className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">
              Your work
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Projects
            </h2>
          </div>

          <Button>
            <Plus size={17} />
            <span className="hidden sm:inline">
              New project
            </span>
          </Button>
        </div>

        <Card className="mt-5 p-10 text-center sm:p-14">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
            <Plus size={22} />
          </div>

          <h3 className="mt-5 text-lg font-semibold">
            No projects yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
            Start showcasing what you've built. Add your first
            project to your DevShow profile.
          </p>

          <div className="mt-6">
            <Button>
              <Plus size={17} />
              Create your first project
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}