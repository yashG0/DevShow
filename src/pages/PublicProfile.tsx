import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Code2, ExternalLink, Globe } from "lucide-react";
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

  const initials = profile.display_name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-16">
      {/* Developer header */}
      <section className="border-b border-[var(--border)] pb-12">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-2xl font-semibold">
            {profile.avatar_path ? (
              <img
                src={profile.avatar_path}
                alt={profile.display_name}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          {/* Identity */}
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
              Developer
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              {profile.display_name}
            </h1>

            <p className="mt-2 font-mono text-sm text-[var(--text-muted)]">
              @{profile.username}
            </p>

            {profile.bio && (
              <p className="mt-6 max-w-2xl whitespace-pre-line text-base leading-7 text-[var(--text-secondary)]">
                {profile.bio}
              </p>
            )}

            {/* Social links */}
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.github_url && (
                <SocialLink
                  href={profile.github_url}
                  label="GitHub"
                  icon={<Code2 size={14} />}
                />
              )}

              {profile.linkedin_url && (
                <SocialLink
                  href={profile.linkedin_url}
                  label="LinkedIn"
                  icon={<Code2 size={14} />}
                />
              )}

              {profile.website_url && (
                <SocialLink
                  href={profile.website_url}
                  label="Website"
                  icon={<Globe size={14} />}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="pt-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Selected work
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Projects
            </h2>
          </div>

          <span className="font-mono text-xs text-[var(--text-muted)]">
            {profile.projects.length}{" "}
            {profile.projects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {profile.projects.length === 0 ? (
          <div className="mt-8 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] px-6 py-14 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              No published projects yet.
            </p>
          </div>
        ) : (
          <div className="mt-7 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {profile.projects.map((project, index) => (
              <article key={project.id} className="group py-7">
                <div className="flex gap-5">
                  {/* Project number */}
                  <span className="hidden shrink-0 pt-1 font-mono text-xs text-[var(--text-muted)] sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    {/* Project title */}
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/dev/${profile.username}/${project.slug}`)
                      }
                      className="text-left"
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold tracking-[-0.025em] transition-colors group-hover:text-[var(--accent)]">
                          {project.title}
                        </h3>

                        <ArrowUpRight
                          size={17}
                          className="text-[var(--text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </div>
                    </button>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                      {project.tagline}
                    </p>

                    {/* Tech */}
                    {project.tech.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--text-secondary)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Project metadata */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--text-muted)]">
                      <span>{project.view_count} views</span>

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--text)]"
                        >
                          <Code2 size={13} />
                          Source
                        </a>
                      )}

                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--text)]"
                        >
                          <ExternalLink size={13} />
                          Live demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
    >
      {icon}
      {label}
      <ExternalLink size={12} className="text-[var(--text-muted)]" />
    </a>
  );
}
