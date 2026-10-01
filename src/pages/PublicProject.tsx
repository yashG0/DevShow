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
  const [error, setError] = useState("");
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setError("");
        setSelectedMediaIndex(0);

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
  const sortedMedia = [...project.media].sort(
    (a, b) => a.position - b.position,
  );
  const selectedMedia = sortedMedia[selectedMediaIndex];

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
      <header className="mt-8 border-b border-[var(--border)] pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          Project
        </p>

        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
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
                className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
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
      {sortedMedia.length > 0 && (
        <section className="pt-8">
          {/* Main viewer */}
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            <div className="relative flex min-h-[220px] items-center justify-center bg-[var(--background)] p-3 sm:min-h-[500px] sm:p-5 lg:min-h-[560px]">
              <img
                src={getMediaUrl(selectedMedia.path)}
                alt={selectedMedia.alt ?? project.title}
                className="max-h-[620px] w-full rounded-md object-contain"
              />

              <div className="absolute bottom-5 right-5 rounded-md border border-[var(--border)] bg-[var(--surface)]/90 px-2.5 py-1 font-mono text-xs text-[var(--text-muted)] backdrop-blur">
                {selectedMediaIndex + 1} / {sortedMedia.length}
              </div>
            </div>
          </div>

          {/* Thumbnail navigation */}
          {sortedMedia.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {sortedMedia.map((media, index) => (
                <button
                  key={media.id}
                  type="button"
                  onClick={() => setSelectedMediaIndex(index)}
                  className={`group shrink-0 overflow-hidden rounded-lg border transition-all ${
                    index === selectedMediaIndex
                      ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/20"
                      : "border-[var(--border)] opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View screenshot ${index + 1}`}
                >
                  <img
                    src={getMediaUrl(media.path)}
                    alt={
                      media.alt ?? `${project.title} screenshot ${index + 1}`
                    }
                    className="h-20 w-32 object-cover sm:h-24 sm:w-40"
                  />
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Content */}
      <section className="grid gap-12 border-t border-[var(--border)] py-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
        <article>
          <div className="prose-content">
            <ReactMarkdown>{project.description_md}</ReactMarkdown>
          </div>
        </article>

        <aside>
          <div className="lg:sticky lg:top-24">
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
                    <ProjectLink
                      href={project.github_url}
                      label="GitHub"
                      detail={getGitHubRepoName(project.github_url)}
                    />
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

function ProjectLink({
  href,
  label,
  detail,
}: {
  href: string;
  label: string;
  detail?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-4 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm transition-colors hover:bg-[var(--surface-hover)]"
    >
      <span className="min-w-0">
        <span className="block font-medium">{label}</span>

        {detail && (
          <span className="mt-0.5 block truncate font-mono text-xs text-[var(--text-muted)]">
            {detail}
          </span>
        )}
      </span>

      <ExternalLink
        size={13}
        className="shrink-0 text-[var(--text-muted)]"
      />
    </a>
  );
}