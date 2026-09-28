import { ArrowUpRight, ExternalLink, Plus, Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { Button } from "../components/ui/Button";

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const initials =
    user?.display_name
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-14">
      {/* Developer identity */}
      <section>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex min-w-0 items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-lg font-semibold text-[var(--accent-foreground)] shadow-sm">
              {initials}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
                <Terminal size={13} />
                Workspace
              </div>

              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                {user?.display_name}
              </h1>

              <p className="mt-1 font-mono text-sm text-[var(--text-secondary)]">
                @{user?.username}
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                {user?.bio ||
                  "Build something worth showing. Your developer profile and projects will live here."}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/profile")}
            >
              Edit profile
            </Button>

            <Button
              size="sm"
              onClick={() => navigate(`/dev/${user?.username}`)}
            >
              View public profile
              <ArrowUpRight size={15} />
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-[var(--border)] pb-7">
          {user?.github_url && (
            <ProfileLink label="GitHub" href={user.github_url} />
          )}

          {user?.linkedin_url && (
            <ProfileLink label="LinkedIn" href={user.linkedin_url} />
          )}

          {user?.website_url && (
            <ProfileLink label="Website" href={user.website_url} />
          )}

          {!user?.github_url && !user?.linkedin_url && !user?.website_url && (
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="text-sm text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            >
              Add your developer links →
            </button>
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="mt-12">
        <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Your work
            </p>

            <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.035em]">
              Projects
            </h2>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Build, publish and showcase what you've made.
            </p>
          </div>

          <Button size="sm">
            <Plus size={16} />
            New project
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <button
            type="button"
            className="group min-h-52 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-left transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
              <Plus size={17} />
            </div>

            <h3 className="mt-8 text-base font-semibold">
              Add your first project
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
              Show what you build with a project page containing your
              description, stack, links and screenshots.
            </p>

            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
              Create a project
              <ArrowUpRight size={14} />
            </span>
          </button>

          <div className="min-h-52 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                DevShow
              </span>

              <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--text-muted)]">
                Ready
              </span>
            </div>

            <div className="mt-10">
              <p className="text-sm font-medium">Your portfolio starts here.</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Add projects to turn your profile into a public developer
                showcase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer profile summary */}
      <section className="mt-12">
        <div className="border-b border-[var(--border)] pb-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Developer identity
          </p>

          <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.035em]">
                Profile
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                The information displayed on your public developer profile.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
            >
              Edit profile
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="divide-y divide-[var(--border)]">
          <ProfileDetail
            label="Name"
            value={user?.display_name || "Not added"}
          />

          <ProfileDetail
            label="Username"
            value={user?.username ? `@${user.username}` : "Not added"}
            mono
          />

          <ProfileDetail label="Email" value={user?.email || "Not available"} />

          <ProfileDetail
            label="Bio"
            value={user?.bio || "Not added"}
            muted={!user?.bio}
          />
        </div>
      </section>
    </main>
  );
}

function ProfileLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
    >
      {label}
      <ExternalLink size={13} className="opacity-50" />
    </a>
  );
}

function ProfileDetail({
  label,
  value,
  muted = false,
  mono = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="grid gap-1 py-5 sm:grid-cols-[160px_1fr] sm:gap-8">
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>

      <span
        className={[
          "text-sm",
          muted ? "text-[var(--text-muted)]" : "text-[var(--text)]",
          mono ? "font-mono" : "",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}
