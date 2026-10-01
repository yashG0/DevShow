import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Plus,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";
import { api, getMediaUrl } from "../services/api";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Spinner } from "../components/ui/Spinner";
import { Textarea } from "../components/ui/Textarea";
import { getApiErrorMessage } from "../services/errors";
import {
  deleteProjectMedia,
  type Project,
  type ProjectMedia,
  uploadProjectMedia,
} from "../services/projects";

export function ProjectEdit() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [media, setMedia] = useState<ProjectMedia[]>([]);

  const [uploading, setUploading] = useState(false);
  const [deletingMediaId, setDeletingMediaId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [techInput, setTechInput] = useState("");
  const [tech, setTech] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  
  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<Project>(`/api/projects/${projectId}`);

        const data = response.data;

        setProject(data);
        setTitle(data.title);
        setTagline(data.tagline);
        setDescription(data.description_md);
        setGithubUrl(data.github_url ?? "");
        setDemoUrl(data.demo_url ?? "");
        setTech(data.tech);
        setMedia(data.media ?? []);
      } catch (error) {
        setError(getApiErrorMessage(error, "Unable to load this project."));
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  function addTech() {
    const value = techInput.trim();

    if (!value || tech.includes(value)) {
      return;
    }

    setTech((current) => [...current, value]);
    setTechInput("");
  }

  function handleTechKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTech();
    }
  }

  function removeTech(value: string) {
    setTech((current) => current.filter((item) => item !== value));
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file || !project) {
      return;
    }

    try {
      setUploading(true);
      setError("");

      const uploaded = await uploadProjectMedia(project.id, file);

      setMedia((current) => [...current, uploaded]);
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to upload screenshot."));
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function handleDeleteMedia(mediaId: number) {
    if (!project || deletingMediaId !== null) {
      return;
    }

    const confirmed = window.confirm(
      "Remove this screenshot from the project?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingMediaId(mediaId);
      setError("");

      await deleteProjectMedia(project.id, mediaId);

      setMedia((current) => current.filter((item) => item.id !== mediaId));
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to remove screenshot."));
    } finally {
      setDeletingMediaId(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaved(false);

    if (!title.trim()) {
      setError("Project title is required.");
      return;
    }

    if (!tagline.trim()) {
      setError("Project tagline is required.");
      return;
    }

    if (!description.trim()) {
      setError("Project description is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.patch<Project>(`/api/projects/${projectId}`, {
        title: title.trim(),
        tagline: tagline.trim(),
        description_md: description.trim(),
        tech,
        github_url: githubUrl.trim() || null,
        demo_url: demoUrl.trim() || null,
      });

      setProject(response.data);
      setSaved(true);
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to save your project."));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
        >
          <ArrowLeft size={15} />
          Workspace
        </button>

        <div className="mt-10 rounded-[var(--radius-md)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]">
          {error || "Project not found."}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-8 lg:py-14">
      <button
        type="button"
        onClick={() => navigate(`/projects/${project.id}`)}
        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
      >
        <ArrowLeft size={15} />
        Project
      </button>

      {/* =========================================================
          PROJECT EDIT FORM
         ========================================================= */}
      <form onSubmit={handleSubmit} className="mt-8">
        {/* Editor header */}
        <header className="flex flex-col gap-6 border-b border-[var(--border)] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
              Edit project
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              {project.title}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
              Update the details people see on your project page.
            </p>
          </div>

          {/* Form actions */}
          <div className="flex shrink-0 flex-col items-end gap-2">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                Cancel
              </Button>

              <Button type="submit" loading={saving}>
                Save changes
              </Button>
            </div>

            {saved && (
              <p role="status" className="text-xs text-[var(--success)]">
                Project saved successfully.
              </p>
            )}
          </div>
        </header>

        {/* Project details */}
        <section className="mt-10">
          <SectionHeading
            number="01"
            title="Project details"
            description="The information visitors see first."
          />

          <div className="mt-6 space-y-5">
            <Input
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={150}
            />

            <Input
              label="Tagline"
              value={tagline}
              onChange={(event) => setTagline(event.target.value)}
              maxLength={255}
            />

            <div>
              <label className="text-sm font-medium text-[var(--text)]">
                Description
              </label>

              <div className="mt-2">
                {/* Mobile tabs */}
                <div
                  className="mb-3 grid grid-cols-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 lg:hidden"
                  role="tablist"
                  aria-label="Description editor"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={!mobilePreview}
                    onClick={() => setMobilePreview(false)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      !mobilePreview
                        ? "bg-[var(--background)] text-[var(--text)] shadow-sm"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    Edit
                  </button>
              
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mobilePreview}
                    onClick={() => setMobilePreview(true)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      mobilePreview
                        ? "bg-[var(--background)] text-[var(--text)] shadow-sm"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              
                {/* Editor + preview */}
                <div className="grid gap-4 lg:grid-cols-2">
                  {/* Markdown editor */}
                  <div className={mobilePreview ? "hidden lg:block" : "block"}>
                    <Textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder={`# LinkPulse
              
              A website monitoring service built with Go and PostgreSQL.
              
              ## Features
              
              - Website health monitoring
              - Uptime tracking
              - REST API`}
                      rows={16}
                      className="h-[420px] resize-none"
                    />
              
                    <p className="mt-2 text-xs text-[var(--text-muted)]">
                      Markdown is supported.
                    </p>
                  </div>
              
                  {/* Live preview */}
                  <div
                    className={
                      mobilePreview
                        ? "block"
                        : "hidden lg:block"
                    }
                  >
                    <div className="h-[420px] overflow-y-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5">
                      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        Preview
                      </p>
              
                      <div className="prose-content">
                        {description.trim() ? (
                          <ReactMarkdown
                            components={{
                              h1: ({ children }) => (
                                <h1 className="mb-4 text-2xl font-bold tracking-tight text-[var(--text)]">
                                  {children}
                                </h1>
                              ),
                          
                              h2: ({ children }) => (
                                <h2 className="mb-3 mt-7 text-xl font-semibold tracking-tight text-[var(--text)]">
                                  {children}
                                </h2>
                              ),
                          
                              h3: ({ children }) => (
                                <h3 className="mb-2 mt-6 text-lg font-semibold text-[var(--text)]">
                                  {children}
                                </h3>
                              ),
                          
                              p: ({ children }) => (
                                <p className="mb-4 leading-7 text-[var(--text-secondary)]">
                                  {children}
                                </p>
                              ),
                          
                              ul: ({ children }) => (
                                <ul className="mb-5 ml-5 list-disc space-y-2 pl-4 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                                  {children}
                                </ul>
                              ),
                          
                              ol: ({ children }) => (
                                <ol className="mb-5 ml-5 list-decimal space-y-2 pl-4 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                                  {children}
                                </ol>
                              ),
                          
                              li: ({ children }) => (
                                <li className="pl-1 leading-6">
                                  {children}
                                </li>
                              ),
                          
                              strong: ({ children }) => (
                                <strong className="font-semibold text-[var(--text)]">
                                  {children}
                                </strong>
                              ),
                          
                              a: ({ children, href }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[var(--accent)] underline underline-offset-4"
                                >
                                  {children}
                                </a>
                              ),
                          
                              blockquote: ({ children }) => (
                                <blockquote className="my-5 border-l-2 border-[var(--accent)] pl-4 italic text-[var(--text-muted)]">
                                  {children}
                                </blockquote>
                              ),
                          
                              code: ({ children }) => (
                                <code className="rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--text)]">
                                  {children}
                                </code>
                              ),
                            }}
                          >
                            {description}
                          </ReactMarkdown>
                        ) : (
                          <p className="text-sm text-[var(--text-muted)]">
                            Your Markdown preview will appear here.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="my-10 border-t border-[var(--border)]" />

        {/* Technology */}
        <section>
          <SectionHeading
            number="02"
            title="Technology"
            description="Technologies used to build the project."
          />

          <div className="mt-6">
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                <Input
                  label="Add technology"
                  value={techInput}
                  onChange={(event) => setTechInput(event.target.value)}
                  onKeyDown={handleTechKeyDown}
                  placeholder="Python, React, PostgreSQL..."
                />
              </div>

              <Button type="button" variant="secondary" onClick={addTech}>
                <Plus size={16} />
                Add
              </Button>
            </div>

            {tech.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tech.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs"
                  >
                    {item}

                    <button
                      type="button"
                      onClick={() => removeTech(item)}
                      aria-label={`Remove ${item}`}
                      className="text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="my-10 border-t border-[var(--border)]" />

        {/* Links */}
        <section>
          <SectionHeading
            number="03"
            title="Links"
            description="Connect visitors to your source code and live project."
          />

          <div className="mt-6 space-y-5">
            <Input
              label="GitHub repository"
              type="url"
              value={githubUrl}
              onChange={(event) => setGithubUrl(event.target.value)}
              placeholder="https://github.com/username/project"
            />

            <Input
              label="Live demo"
              type="url"
              value={demoUrl}
              onChange={(event) => setDemoUrl(event.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </section>

        {/* Form messages */}
        {error && (
          <div
            role="alert"
            className="mt-8 rounded-[var(--radius-md)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]"
          >
            {error}
          </div>
        )}
      </form>

      {/* =========================================================
          SCREENSHOT MANAGEMENT
         ========================================================= */}
      <section className="mt-14 border-t border-[var(--border)] pt-10">
        {/* Screenshot heading */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <ImagePlus size={17} className="text-[var(--accent)]" />

              <h2 className="text-lg font-semibold tracking-[-0.02em]">
                Screenshots
              </h2>
            </div>

            <p className="mt-1.5 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
              Showcase the interface, workflow, or key features of your project.
            </p>
          </div>

          <div className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)]">
            {media.length} / 5
          </div>
        </div>

        {/* Existing screenshots */}
        {media.length > 0 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {media.map((item, index) => {
              const deleting = deletingMediaId === item.id;

              return (
                <div
                  key={item.id}
                  className={`group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)]/40 ${
                    deleting ? "opacity-60" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-[var(--background)]">
                    <img
                      src={getMediaUrl(item.path)}
                      alt={
                        item.alt || `${project.title} screenshot ${index + 1}`
                      }
                      className="h-full w-full object-contain"
                    />

                    {/* Number */}
                    <div className="absolute left-3 top-3 rounded-md border border-[var(--border)] bg-[var(--surface)]/90 px-2 py-1 font-mono text-[11px] text-[var(--text-muted)] backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => handleDeleteMedia(item.id)}
                      disabled={deletingMediaId !== null}
                      aria-label={`Remove screenshot ${index + 1}`}
                      className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-[var(--danger)]/20 bg-[var(--surface)]/95 px-2.5 py-1.5 text-xs font-medium text-[var(--danger)] shadow-sm backdrop-blur transition-colors hover:bg-[var(--danger)]/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 size={13} />

                      {deleting ? "Removing..." : "Remove"}
                    </button>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] px-3.5 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-[var(--text-secondary)]">
                        Screenshot {index + 1}
                      </p>

                      <p className="mt-0.5 truncate font-mono text-[10px] text-[var(--text-muted)]">
                        {item.alt || "Project media"}
                      </p>
                    </div>

                    <span className="shrink-0 font-mono text-[10px] text-[var(--text-muted)]">
                      #{item.position + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Upload */}
        {media.length < 5 && (
          <label
            className={`mt-5 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-8 text-center transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--surface-hover)] ${
              uploading ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)]">
              {uploading ? (
                <Spinner size="sm" />
              ) : (
                <UploadCloud size={18} className="text-[var(--accent)]" />
              )}
            </div>

            <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">
              {uploading ? "Uploading screenshot..." : "Add screenshot"}
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              PNG, JPEG or WebP · up to 5 MB
            </p>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              disabled={uploading}
              onChange={handleUpload}
            />
          </label>
        )}

        {/* Limit */}
        {media.length === 5 && (
          <div className="mt-5 flex items-center justify-center rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-xs text-[var(--text-muted)]">
            Maximum of 5 screenshots reached. Remove one to upload another.
          </div>
        )}
      </section>
    </main>
  );
}

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="pt-1 font-mono text-xs text-[var(--text-muted)]">
        {number}
      </span>

      <div>
        <h2 className="text-lg font-semibold tracking-[-0.02em]">{title}</h2>

        <p className="mt-1.5 text-sm leading-6 text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </div>
  );
}
