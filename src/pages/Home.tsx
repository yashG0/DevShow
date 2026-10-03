import {
  ArrowUpRight,
  Code2,
  Eye,
  FolderGit2,
  GitBranch,
  Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { Button } from "../components/ui/Button";

const HERO_TEXT = "Build. Ship. Showcase.";

export function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(HERO_TEXT.slice(0, index));

      if (index >= HERO_TEXT.length) {
        window.clearInterval(timer);
        setTypingDone(true);
      }
    }, 55);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main>
      <section className="relative overflow-hidden">
        {/* Subtle background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid w-full gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
            {/* Hero */}
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-[var(--accent)]/20 bg-[var(--accent)]/10">
                  <Terminal size={13} />
                </span>
                Developer showcase platform
              </div>

              {user ? (
                <>
                  <div className="mt-6 min-h-[170px]">
                    <p className="mb-3 font-mono text-sm text-[var(--text-muted)]">
                      $ devshow
                    </p>

                    <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                      {typedText}
                      <span
                        className={`ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] bg-[var(--accent)] ${
                          typingDone ? "animate-pulse" : ""
                        }`}
                      />
                    </h1>
                  </div>

                  <p className="mt-2 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                    Welcome back,{" "}
                    <span className="font-medium text-[var(--text)]">
                      {user.display_name}
                    </span>
                    . Your developer space is ready for the work you're
                    building.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button size="lg" onClick={() => navigate("/dashboard")}>
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
                  <div className="mt-6 min-h-[170px]">
                    <p className="mb-3 font-mono text-sm text-[var(--text-muted)]">
                      $ devshow
                    </p>

                    <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                      {typedText}
                      <span
                        className={`ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] bg-[var(--accent)] ${
                          typingDone ? "animate-pulse" : ""
                        }`}
                      />
                    </h1>
                  </div>

                  <p className="mt-2 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                    A clean developer-first space to present your projects,
                    technical skills, and the work you're proud to build.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button size="lg" onClick={() => navigate("/register")}>
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

                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-[var(--text-muted)]">
                    <span>React</span>
                    <span>FastAPI</span>
                    <span>PostgreSQL</span>
                    <span>Open source</span>
                  </div>
                </>
              )}
            </div>

            {/* Developer preview */}
            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)]">
                {/* Window header */}
                <div className="flex h-11 items-center gap-2 border-b border-[var(--border)] px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />

                  <div className="ml-3 flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                    <Code2 size={11} />
                    devshow.profile
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  {/* Developer header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)]">
                        {user?.display_name?.charAt(0).toUpperCase() || "D"}
                      </div>
                
                      <div>
                        <div className="font-semibold">
                          {user?.display_name || "Developer"}
                        </div>
                
                        <div className="font-mono text-xs text-[var(--text-muted)]">
                          @{user?.username || "yourusername"}
                        </div>
                      </div>
                    </div>
                
                    <span className="hidden rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-mono text-[9px] text-emerald-500 sm:inline-flex">
                      available
                    </span>
                  </div>
                
                  {/* Developer intro */}
                  <div className="mt-6 border-l-2 border-[var(--accent)]/30 pl-3">
                    <p className="text-xs leading-5 text-[var(--text-secondary)]">
                      Building useful software and turning ideas into shipped
                      products.
                    </p>
                  </div>
                
                  {/* Projects */}
                  <div className="mt-7">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        <FolderGit2 size={13} />
                        Projects
                      </div>
                
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">
                        03
                      </span>
                    </div>
                
                    <div className="mt-3 space-y-2">
                      <PreviewProject
                        number="01"
                        title="Project Atlas"
                        description="Production-ready web application."
                        tech={["React", "FastAPI"]}
                      />
                
                      <PreviewProject
                        number="02"
                        title="Pulse Monitor"
                        description="Monitoring and observability platform."
                        tech={["Go", "PostgreSQL"]}
                      />
                    </div>
                  </div>
                
                  {/* Profile metadata */}
                  <div className="mt-5 flex items-center gap-4 border-t border-[var(--border)] pt-4 font-mono text-[9px] text-[var(--text-muted)]">
                    <span>3 projects</span>
                    <span>•</span>
                    <span>20 views</span>
                    <span className="ml-auto">github ↗</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product statement */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                Built for developers
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                Your work deserves a place beyond the repository.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              GitHub shows the code. DevShow gives the project context — what
              you built, why you built it, the technologies behind it,
              screenshots, demos, and the work you're most proud of.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function PreviewProject({
  number,
  title,
  description,
  tech,
}: {
  number: string
  title: string
  description: string
  tech: string[]
}) {
  return (
    <div className="group rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] p-3.5 transition-all duration-200 hover:border-[var(--accent)]/30">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[9px] text-[var(--text-muted)]">
          {number}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm font-medium">
              {title}
            </p>

            <ArrowUpRight
              size={13}
              className="shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
            />
          </div>

          <p className="mt-1 truncate text-[10px] text-[var(--text-secondary)]">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-2.5 ml-7 flex gap-1.5">
        {tech.map((item) => (
          <span
            key={item}
            className="rounded-md bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-[9px] text-[var(--accent)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
