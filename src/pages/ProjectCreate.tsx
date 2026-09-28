import { useState, type FormEvent } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { getApiErrorMessage } from "../services/errors";
import { api } from "../services/api";

export function ProjectCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [techInput, setTechInput] = useState("");
  const [tech, setTech] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addTech() {
    const value = techInput.trim();

    if (!value || tech.includes(value)) {
      return;
    }

    setTech([...tech, value]);
    setTechInput("");
  }

  function removeTech(value: string) {
    setTech(tech.filter((item) => item !== value));
  }

  function handleTechKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTech();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

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
      setLoading(true);

      await api.post("/api/projects", {
        title: title.trim(),
        tagline: tagline.trim(),
        description_md: description.trim(),
        tech,
        github_url: githubUrl.trim() || null,
        demo_url: demoUrl.trim() || null,
      });

      navigate("/dashboard");
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to create your project."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-8 lg:py-14">
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
      >
        <ArrowLeft size={15} />
        Workspace
      </button>

      <div className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
          New project
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
          Show what you built.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
          Add the details people need to understand your project and the
          technologies behind it.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10">
        <section>
          <SectionHeading
            number="01"
            title="Project details"
            description="The basics visitors will see first."
          />

          <div className="mt-6 space-y-5">
            <Input
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="LinkPulse"
              maxLength={150}
            />

            <Input
              label="Tagline"
              value={tagline}
              onChange={(event) => setTagline(event.target.value)}
              placeholder="Website monitoring and uptime API"
              maxLength={255}
            />

            <Textarea
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={`# LinkPulse

A website monitoring service built with Go and PostgreSQL.

## Features

- Website health monitoring
- Uptime tracking
- REST API`}
              rows={12}
            />

            <p className="text-xs text-[var(--text-muted)]">
              Markdown is supported.
            </p>
          </div>
        </section>

        <div className="my-10 border-t border-[var(--border)]" />

        <section>
          <SectionHeading
            number="02"
            title="Technology"
            description="Add the technologies used to build this project."
          />

          <div className="mt-6">
            <div className="flex gap-2">
              <Input
                label="Tech stack"
                value={techInput}
                onChange={(event) => setTechInput(event.target.value)}
                onKeyDown={handleTechKeyDown}
                placeholder="Python, React, FastAPI..."
              />

              <Button
                type="button"
                variant="secondary"
                className="mt-7"
                onClick={addTech}
              >
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
                      className="text-[var(--text-muted)] hover:text-[var(--text)]"
                      aria-label={`Remove ${item}`}
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

        <section>
          <SectionHeading
            number="03"
            title="Links"
            description="Point visitors toward the source code and live project."
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

        {error && (
          <div
            role="alert"
            className="mt-8 rounded-[var(--radius-md)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]"
          >
            {error}
          </div>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>

          <Button type="submit" loading={loading}>
            Create project
          </Button>
        </div>
      </form>
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
