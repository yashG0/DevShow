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
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* Developer identity */}
      <section>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-base font-semibold text-[var(--accent-foreground)] sm:h-14 sm:w-14 sm:rounded-2xl sm:text-lg">
              {initials}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)] sm:text-[10px]">
                <Terminal size={11} />
                01 / Workspace
              </div>

              <h1 className="mt-1.5 text-[1.7rem] font-semibold leading-tight tracking-[-0.045em] sm:mt-2 sm:text-4xl">
                {user?.display_name}
              </h1>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="font-mono text-xs text-[var(--text-secondary)] sm:text-sm">
                  @{user?.username}
                </p>

                <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--success)] sm:text-[9px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                  Profile live
                </span>
              </div>

              <p className="mt-2 max-w-2xl whitespace-pre-line text-sm leading-5 text-[var(--text-secondary)] sm:mt-3 sm:leading-6">
                {user?.bio ||
                  "Build something worth showing. Your developer profile and projects will live here."}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row lg:shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/profile")}
              className="w-full sm:w-auto"
            >
              Edit profile
            </Button>
          
            <Button
              size="sm"
              onClick={() => navigate(`/dev/${user?.username}`)}
              className="w-full sm:w-auto"
            >
              Public profile
              <ArrowUpRight size={14} />
            </Button>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[var(--border)] pb-5 sm:mt-6 sm:gap-x-5 sm:pb-7">
          {user?.github_url && (
            <ProfileLink label="GitHub" href={user.github_url} />
          )}

          {user?.linkedin_url && (
            <ProfileLink label="LinkedIn" href={user.linkedin_url} />
          )}

          {user?.website_url && (
            <ProfileLink label="Website" href={user.website_url} />
          )}

          {!user?.github_url &&
            !user?.linkedin_url &&
            !user?.website_url && (
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
        <section className="mt-7 sm:mt-10">
          <div className="mb-4 sm:mb-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)] sm:text-[10px]">
              01 / Overview
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-[-0.035em] sm:mt-1.5 sm:text-2xl">
              Analytics
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 transition-colors hover:border-[var(--border-strong)] sm:rounded-[var(--radius-lg)] sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)] sm:gap-2 sm:text-[10px] sm:tracking-[0.12em]">
                  <Eye size={12} />
                  <span className="truncate">Public views</span>
                </div>

                <span className="hidden font-mono text-[10px] text-[var(--text-muted)] sm:block">
                  / traffic
                </span>
              </div>

              <p className="mt-2.5 text-[1.7rem] font-semibold tracking-[-0.04em] sm:mt-4 sm:text-3xl">
                {totalViews}
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 transition-colors hover:border-[var(--border-strong)] sm:rounded-[var(--radius-lg)] sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)] sm:gap-2 sm:text-[10px] sm:tracking-[0.12em]">
                  <FolderGit2 size={12} />
                  <span>Published</span>
                </div>

                <span className="hidden font-mono text-[10px] text-[var(--text-muted)] sm:block">
                  / projects
                </span>
              </div>

              <p className="mt-2.5 text-[1.7rem] font-semibold tracking-[-0.04em] sm:mt-4 sm:text-3xl">
                {publishedProjects}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      <section className="mt-8 sm:mt-10">
        <div className="flex flex-col gap-3 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)] sm:text-[10px]">
              02 / Projects
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-[-0.035em] sm:mt-1.5 sm:text-2xl">
              Your work
            </h2>

            <p className="mt-1 text-xs text-[var(--text-muted)] sm:mt-1.5 sm:text-sm">
              Your projects, technologies and things you've built.
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => navigate("/projects/new")}
            className="w-full sm:w-auto"
          >
            <Plus size={15} />
            New project
          </Button>
        </div>

        {loading && (
          <div className="flex min-h-52 items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="mt-5 rounded-[var(--radius-md)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]"
          >
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="mt-5 flex min-h-56 items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-12 text-center">
            <div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)]">
                <FolderGit2 size={18} />
              </div>

              <h3 className="mt-5 text-base font-semibold">
                No projects yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                Your projects will appear here once you create your first one.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="mt-5 divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] sm:mt-6">
            {projects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index + 1}
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
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <article className="group p-3.5 transition-colors hover:bg-[var(--surface-hover)] sm:p-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="shrink-0 pt-1 font-mono text-[9px] text-[var(--text-muted)] sm:text-[10px]">
          {String(index).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={onOpen}
                  className="max-w-full text-left text-base font-semibold tracking-[-0.02em] transition-colors hover:text-[var(--accent)] sm:text-lg"
                >
                  {project.title}
                </button>

                <span
                  className={[
                    "rounded-full border px-1.5 py-0.5 text-[9px] font-medium sm:px-2 sm:text-[11px]",
                    project.is_published
                      ? "border-[var(--success)]/25 bg-[var(--success)]/10 text-[var(--success)]"
                      : "border-[var(--border)] text-[var(--text-muted)]",
                  ].join(" ")}
                >
                  {project.is_published ? "Published" : "Draft"}
                </span>
              </div>

              <p className="mt-1.5 text-xs leading-5 text-[var(--text-secondary)] sm:mt-2 sm:text-sm sm:leading-6">
                {project.tagline}
              </p>
            </div>

            {/* Open */}
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] sm:text-sm"
            >
              Open
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>

          {/* Tech */}
          {project.tech.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-5">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-[var(--border)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--text-secondary)] transition-colors group-hover:border-[var(--border-strong)] sm:px-2 sm:py-1 sm:text-[11px]"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {/* Metadata */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)]/70 pt-3 sm:mt-5 sm:gap-4 sm:pt-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)] sm:text-[11px]">
                <Eye size={12} />
                {project.view_count} views
              </span>

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text)] sm:text-[11px]"
                >
                  GitHub
                  <ExternalLink size={11} />
                </a>
              )}

              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text)] sm:text-[11px]"
                >
                  Demo
                  <ExternalLink size={11} />
                </a>
              )}
            </div>

            <span className="hidden font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)] sm:block">
              project/{String(index).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProfileLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--text)] sm:text-sm"
    >
      {label}
      <ExternalLink size={12} className="opacity-50" />
    </a>
  );
}