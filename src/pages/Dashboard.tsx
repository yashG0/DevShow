import { ArrowUpRight, ExternalLink, Globe, Plus } from "lucide-react";

import { useAuth } from "../auth/AuthProvider";
import { Button } from "../components/ui/Button";

export function Dashboard() {
  const { user } = useAuth();

  const initials =
    user?.display_name
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
      {/* ─────────────────────────────────────────
          Intro
         ───────────────────────────────────────── */}

      <section>
        <p className="text-sm text-[var(--text-secondary)]">Welcome back</p>

        <div className="mt-6 flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-semibold text-[var(--accent-foreground)]">
              {initials}
            </div>

            <div className="min-w-0">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {user?.display_name}
              </h1>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                @{user?.username}
              </p>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
                {user?.bio ||
                  "Tell people a little about yourself and what you create."}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <Button variant="secondary" size="sm">
              Edit profile
            </Button>

            <Button size="sm">
              View profile
              <ArrowUpRight size={15} />
            </Button>
          </div>
        </div>

        {/* Social links */}

        <div className="mt-7 flex flex-wrap gap-4 border-b border-[var(--border)] pb-8">
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
            <span className="text-xs text-[var(--text-muted)]">
              Add your social links to complete your profile.
            </span>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────
          Work
         ───────────────────────────────────────── */}

      <section className="mt-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">
              What I've made
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
              Projects
            </h2>
          </div>

          <Button size="sm">
            <Plus size={16} />
            Add project
          </Button>
        </div>

        <div className="mt-6 border-y border-[var(--border)]">
          <div className="flex min-h-72 flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)]">
              <Plus size={18} />
            </div>

            <h3 className="mt-5 text-base font-medium">Nothing here yet</h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
              Add something you've built. Your projects will appear here on your
              profile.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            >
              Add your first project
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          Personal information
         ───────────────────────────────────────── */}

      <section className="mt-14">
        <div className="border-b border-[var(--border)] pb-5">
          <p className="text-sm text-[var(--text-secondary)]">About you</p>

          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
            Profile
          </h2>
        </div>

        <div className="divide-y divide-[var(--border)]">
          <ProfileDetail
            label="Name"
            value={user?.display_name || "Not added"}
          />

          <ProfileDetail
            label="Username"
            value={user?.username ? `@${user.username}` : "Not added"}
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
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="grid gap-1 py-5 sm:grid-cols-[160px_1fr] sm:gap-8">
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>

      <span
        className={
          muted
            ? "text-sm text-[var(--text-muted)]"
            : "text-sm text-[var(--text)]"
        }
      >
        {value}
      </span>
    </div>
  );
}
