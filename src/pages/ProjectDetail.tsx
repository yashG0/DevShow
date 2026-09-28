import { toggleProjectPublish } from "../services/projects";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Eye,
  Code2,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { api } from "../services/api";
import { getApiErrorMessage } from "../services/errors";
import type { Project } from "../services/projects";

export function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);

        const response = await api.get<Project>(`/api/projects/${projectId}`);

        setProject(response.data);
      } catch (error) {
        setError(getApiErrorMessage(error, "Unable to load this project."));
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  async function handlePublishToggle() {
    if (!project) return;

    try {
      setPublishing(true);
      setError("");

      const updatedProject = await toggleProjectPublish(project.id);
      setProject(updatedProject);
    } catch (error) {
      setError(getApiErrorMessage(error, "Failed to update project status."));
    } finally {
      setPublishing(false);
    }
  }

  async function deleteProject() {
    if (!project) return;

    const confirmed = window.confirm(
      `Delete "${project.title}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await api.delete(`/api/projects/${project.id}`);
      navigate("/dashboard");
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to delete this project."));
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)]"
        >
          <ArrowLeft size={15} />
          Workspace
        </button>

        <div className="mt-10 rounded-[var(--radius-lg)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 p-5 text-sm text-[var(--danger)]">
          {error || "Project not found."}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-14">
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
      >
        <ArrowLeft size={15} />
        Workspace
      </button>

      {/* Header */}
      <section className="mt-8 border-b border-[var(--border)] pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                Project
              </span>

              <span
                className={[
                  "rounded-full border px-2.5 py-1 text-xs font-medium",
                  project.is_published
                    ? "border-[var(--success)]/25 bg-[var(--success)]/10 text-[var(--success)]"
                    : "border-[var(--border)] text-[var(--text-muted)]",
                ].join(" ")}
              >
                {project.is_published ? "Published" : "Draft"}
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              {project.title}
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              {project.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <Eye size={14} />
                {project.view_count} views
              </span>

              <span className="font-mono">/{project.slug}</span>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePublishToggle}
              loading={publishing}
            >
              {project.is_published ? "Unpublish" : "Publish"}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(`/projects/${project.id}/edit`)}
            >
              <Pencil size={15} />
              Edit
            </Button>

            <Button variant="danger" size="sm" onClick={deleteProject}>
              <Trash2 size={15} />
              Delete
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="grid gap-10 py-10 lg:grid-cols-[1fr_280px]">
        <article>
          <div className="prose-content">
            <ReactMarkdown>{project.description_md}</ReactMarkdown>
          </div>
        </article>

        <aside className="space-y-8">
          {project.tech.length > 0 && (
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Stack
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 font-mono text-xs text-[var(--text-secondary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(project.github_url || project.demo_url) && (
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Links
              </h2>

              <div className="mt-3 space-y-2">
                {project.github_url && (
                  <ProjectLink
                    label="GitHub"
                    href={project.github_url}
                    icon={<Code2 size={15} />}
                  />
                )}

                {project.demo_url && (
                  <ProjectLink
                    label="Live demo"
                    href={project.demo_url}
                    icon={<ExternalLink size={15} />}
                  />
                )}
              </div>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function ProjectLink({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm transition-colors hover:bg-[var(--surface-hover)]"
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>

      <ExternalLink size={13} className="text-[var(--text-muted)]" />
    </a>
  );
}
