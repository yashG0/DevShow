import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Eye,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Spinner } from "../components/ui/Spinner";
import { api, getMediaUrl } from "../services/api";
import { getApiErrorMessage } from "../services/errors";

type PublicMedia = {
  id: number;
  path: string;
  alt: string | null;
  position: number;
};

type PublicProjectData = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description_md: string;
  tech: string[];
  github_url: string | null;
  demo_url: string | null;
  view_count: number;
  media: PublicMedia[];
};

type PublicDeveloper = {
  username: string;
  display_name: string;
};

type PublicProjectResponse = {
  developer: PublicDeveloper;
  project: PublicProjectData;
};

export function PublicProject() {
  const { username, slug } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<PublicProjectResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<PublicProjectResponse>(
          `/api/public/dev/${username}/${slug}`,
        );

        setData(response.data);
      } catch (error) {
        setError(getApiErrorMessage(error, "Unable to load this project."));
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [username, slug]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(`/dev/${username}`)}
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)]"
        >
          <ArrowLeft size={15} />
          {username}
        </button>

        <div className="mt-10 rounded-[var(--radius-lg)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 p-6 text-sm text-[var(--danger)]">
          {error || "Project not found."}
        </div>
      </main>
    );
  }

  const { project, developer } = data;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-14">
      <button
        type="button"
        onClick={() => navigate(`/dev/${developer.username}`)}
        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
      >
        <ArrowLeft size={15} />
        {developer.display_name}
      </button>

      {/* Header */}
      <header className="mt-8 border-b border-[var(--border)] pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          Project
        </p>

        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
              {project.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm transition-colors hover:bg-[var(--surface-hover)]"
              >
                <Code2 size={15} />
                Source
                <ArrowUpRight size={13} />
              </a>
            )}

            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Live demo
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <Eye size={14} />
            {project.view_count} views
          </span>

          <span className="font-mono">@{developer.username}</span>
        </div>
      </header>

      {/* Screenshots */}
      {project.media.length > 0 && (
        <section className="pt-10">
          <div className="space-y-5">
            {/* Hero screenshot */}
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
              <img
                src={getMediaUrl(project.media[0].path)}
                alt={project.media[0].alt ?? project.title}
                className="w-full object-cover"
              />
            </div>

            {/* Gallery */}
            {project.media.length > 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                {project.media.slice(1).map((media) => (
                  <div
                    key={media.id}
                    className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]"
                  >
                    <img
                      src={getMediaUrl(media.path)}
                      alt={media.alt ?? project.title}
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Content */}
      <section className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article>
          <div className="prose-content">
            <ReactMarkdown>{project.description_md}</ReactMarkdown>
          </div>
        </article>

        <aside>
          <div className="sticky top-24">
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Built with
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 font-mono text-xs text-[var(--text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 border-t border-[var(--border)] pt-6">
              <p className="text-xs text-[var(--text-muted)]">Built by</p>

              <button
                type="button"
                onClick={() => navigate(`/dev/${developer.username}`)}
                className="mt-2 text-sm font-medium hover:text-[var(--accent)]"
              >
                {developer.display_name}
              </button>
            </div>

            {(project.github_url || project.demo_url) && (
              <div className="mt-8 border-t border-[var(--border)] pt-6">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  Links
                </p>

                <div className="mt-3 space-y-2">
                  {project.github_url && (
                    <ProjectLink href={project.github_url} label="GitHub" />
                  )}

                  {project.demo_url && (
                    <ProjectLink href={project.demo_url} label="Live demo" />
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm transition-colors hover:bg-[var(--surface-hover)]"
    >
      <span>{label}</span>
      <ExternalLink size={13} className="text-[var(--text-muted)]" />
    </a>
  );
}
