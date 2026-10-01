import {
  ArrowUpRight,
  ExternalLink,
  Eye,
  FolderGit2,
  Plus,
  Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { getApiErrorMessage } from "../services/errors";
import { getProjects, type Project } from "../services/projects";

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const initials =
    user?.display_name
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";
  const totalViews = projects.reduce(
    (total, project) => total + project.view_count,
    0,
  );

  const publishedProjects = projects.filter(
    (project) => project.is_published,
  ).length;
  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        setError(getApiErrorMessage(error, "Unable to load your projects."));
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-8 lg:px-8 lg:py-10">
      {/* Developer identity */}
      <section>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-lg font-semibold text-[var(--accent-foreground)]">
              {initials}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                <Terminal size={13} />
                Workspace
              </div>

              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                {user?.display_name}
              </h1>

              <p className="mt-1 font-mono text-sm text-[var(--text-secondary)]">
                @{user?.username}
              </p>

              <p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-6 text-[var(--text-secondary)]">
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

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-[var(--border)] pb-7">
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
              className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)]"
            >
              Add your developer links →
            </button>
          )}
        </div>
      </section>
      {/* Analytics */}
      {!loading && !error && projects.length > 0 && (
        <section className="mt-10">
          <div className="mb-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Overview
            </p>

            <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.035em]">
              Analytics
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Eye size={15} />
                Total views
              </div>

              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                {totalViews}
              </p>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <FolderGit2 size={15} />
                Published projects
              </div>

              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                {publishedProjects}
              </p>
            </div>
          </div>
        </section>
      )}
      {/* Projects */}
      <section className="mt-10">
        <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Your work
            </p>

            <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.035em]">
              Projects
            </h2>

            <p className="mt-1.5 text-sm text-[var(--text-muted)]">
              Your projects, technologies and things you've built.
            </p>
          </div>

          <Button size="sm" onClick={() => navigate("/projects/new")}>
            <Plus size={16} />
            New project
          </Button>
        </div>

        {loading && (
          <div className="flex min-h-64 items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="mt-6 rounded-[var(--radius-md)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]"
          >
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="mt-6 flex min-h-64 items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-12 text-center">
            <div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)]">
                <FolderGit2 size={18} />
              </div>

              <h3 className="mt-5 text-base font-semibold">No projects yet</h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                Your projects will appear here once you create your first one.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="mt-6 divide-y divide-[var(--border)] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            {projects.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                onOpen={() => navigate(`/projects/${project.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ProjectRow({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <article className="group p-5 transition-colors hover:bg-[var(--surface-hover)] sm:p-6">
      <div className="flex flex-col gap-6">
        {/* Project header */}
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onOpen}
                className="text-left text-lg font-semibold tracking-[-0.025em] transition-colors hover:text-[var(--accent)]"
              >
                {project.title}
              </button>

              <span
                className={[
                  "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                  project.is_published
                    ? "border-[var(--success)]/25 bg-[var(--success)]/10 text-[var(--success)]"
                    : "border-[var(--border)] text-[var(--text-muted)]",
                ].join(" ")}
              >
                {project.is_published ? "Published" : "Draft"}
              </span>
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
              {project.tagline}
            </p>
          </div>

          {/* Primary action */}
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
          >
            Open
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        {/* Technology stack */}
        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-md border border-[var(--border)] px-2 py-1 font-mono text-[11px] text-[var(--text-secondary)] transition-colors group-hover:border-[var(--border-strong)]"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Metadata + external links */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)]/70 pt-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Eye size={13} />
              {project.view_count} views
            </span>

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
              >
                GitHub
                <ExternalLink size={12} />
              </a>
            )}

            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
              >
                Demo
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
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
