import { useEffect, useState } from "react";
import { ExternalLink, Code2, ArrowUpRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Spinner } from "../components/ui/Spinner";
import { api } from "../services/api";
import { getApiErrorMessage } from "../services/errors";

type PublicProject = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description_md: string;
  tech: string[];
  github_url: string | null;
  demo_url: string | null;
  view_count: number;
};

type PublicDeveloper = {
  username: string;
  display_name: string;
  bio: string | null;
  avatar_path: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  projects: PublicProject[];
};

export function PublicProfile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<PublicDeveloper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<PublicDeveloper>(
          `/api/public/dev/${username}`,
        );

        setProfile(response.data);
      } catch (error) {
        setError(
          getApiErrorMessage(error, "Unable to load this developer profile."),
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!profile) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="rounded-[var(--radius-lg)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 p-6 text-sm text-[var(--danger)]">
          {error || "Developer profile not found."}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
      {/* Developer identity */}
      <section className="border-b border-[var(--border)] pb-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-2xl font-semibold">
            {profile.display_name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
              Developer
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              {profile.display_name}
            </h1>

            <p className="mt-1 font-mono text-sm text-[var(--text-muted)]">
              @{profile.username}
            </p>

            {profile.bio && (
              <p className="mt-5 max-w-2xl whitespace-pre-line text-base leading-7 text-[var(--text-secondary)]">
                {profile.bio}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {profile.github_url && (
                <SocialLink href={profile.github_url} label="GitHub" />
              )}

              {profile.linkedin_url && (
                <SocialLink href={profile.linkedin_url} label="LinkedIn" />
              )}

              {profile.website_url && (
                <SocialLink href={profile.website_url} label="Website" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Selected work
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
              Projects
            </h2>
          </div>

          <span className="font-mono text-xs text-[var(--text-muted)]">
            {profile.projects.length} projects
          </span>
        </div>

        {profile.projects.length === 0 ? (
          <div className="mt-8 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] px-6 py-12 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              No published projects yet.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {profile.projects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() =>
                  navigate(`/dev/${profile.username}/${project.slug}`)
                }
                className="group w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 text-left transition-colors hover:bg-[var(--surface-hover)]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-[-0.02em]">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                      {project.tagline}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-[var(--text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>

                {project.tech.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-1.5 font-mono text-xs text-[var(--text-secondary)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span>{project.view_count} views</span>

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-1.5 hover:text-[var(--text)]"
                    >
                      <Code2 size={13} />
                      GitHub
                    </a>
                  )}

                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-1.5 hover:text-[var(--text)]"
                    >
                      <ExternalLink size={13} />
                      Live demo
                    </a>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
    >
      {label}
      <ExternalLink size={13} />
    </a>
  );
}
