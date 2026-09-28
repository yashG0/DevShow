import { ArrowUpRight, Code2, FolderGit2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../auth/AuthProvider"
import { Button } from "../components/ui/Button"

export function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <main>
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-6 py-20 lg:px-8">
        <div className="grid w-full gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Hero */}

          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
              <Code2 size={16} />
              Developer showcase
            </div>

            {user ? (
              <>
                <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                  Welcome back,{" "}
                  <span className="text-[var(--accent)]">
                    {user.display_name}.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                  Your developer space is ready. Keep building,
                  add your projects, and share what you've created.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    onClick={() => navigate("/dashboard")}
                  >
                    Open workspace
                    <ArrowUpRight size={17} />
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate(`/dev/${user.username}`)}
                  >
                    View profile
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                  Show the world
                  <br />
                  what you build.
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                  DevShow gives developers a clean place to
                  present their projects, skills, and work —
                  without the noise.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    onClick={() => navigate("/register")}
                  >
                    Create your profile
                    <ArrowUpRight size={17} />
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Developer preview */}

          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)]">
              <div className="flex h-11 items-center gap-2 border-b border-[var(--border)] px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />

                <span className="ml-3 font-mono text-[11px] text-[var(--text-muted)]">
                  devshow.profile
                </span>
              </div>

              <div className="p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)]">
                    {user?.display_name
                      ?.charAt(0)
                      .toUpperCase() || "D"}
                  </div>

                  <div>
                    <div className="font-semibold">
                      {user?.display_name || "Developer"}
                    </div>

                    <div className="text-sm text-[var(--text-secondary)]">
                      @{user?.username || "yourusername"}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    <FolderGit2 size={13} />
                    Projects
                  </div>

                  <div className="mt-4 space-y-3">
                    <PreviewProject
                      title="Your next project"
                      description="A place to show what you've built."
                    />

                    <PreviewProject
                      title="Something you're proud of"
                      description="Share the work behind your ideas."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function PreviewProject({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] p-4">
      <p className="text-sm font-medium">{title}</p>

      <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
        {description}
      </p>

      <div className="mt-3 flex gap-1.5">
        <span className="rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
          React
        </span>

        <span className="rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
          FastAPI
        </span>
      </div>
    </div>
  )
}