import { useState, type FormEvent } from "react";
import { ArrowLeft, ExternalLink, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { getApiErrorMessage } from "../services/errors";
import { api } from "../services/api";

export function Profile() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.display_name ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [githubUrl, setGithubUrl] = useState(user?.github_url ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedin_url ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(user?.website_url ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const initials =
    user?.display_name
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSaved(false);

    if (!displayName.trim()) {
      setError("Display name is required.");
      return;
    }

    try {
      setLoading(true);

      await api.patch("/api/me", {
        display_name: displayName.trim(),
        bio: bio.trim() || null,
        github_url: githubUrl.trim() || null,
        linkedin_url: linkedinUrl.trim() || null,
        website_url: websiteUrl.trim() || null,
      });

      await refreshUser();
      setSaved(true);
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to save your profile."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-8 lg:py-14">
      {/* Header */}
      <div>
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
            Developer profile
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Your developer identity
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
            This information appears on your public DevShow profile.
          </p>
        </div>
      </div>

      {/* Identity preview */}
      <section className="mt-10 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-lg font-semibold text-[var(--accent-foreground)]">
            {initials}
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-[-0.025em]">
              {displayName || "Your name"}
            </h2>

            <p className="mt-1 font-mono text-sm text-[var(--text-secondary)]">
              @{user?.username}
            </p>

            <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm leading-6 text-[var(--text-secondary)]">
              {bio || "Your developer bio will appear here."}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border)] px-6 py-3.5 sm:px-7">
          <span className="text-xs text-[var(--text-muted)]">
            Public profile
          </span>

          <button
            type="button"
            onClick={() => navigate(`/dev/${user?.username}`)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            View profile
            <ExternalLink size={12} />
          </button>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="mt-10">
        {/* Identity */}
        <section>
          <SectionHeading
            eyebrow="01"
            title="Identity"
            description="How you appear across your developer profile."
          />

          <div className="mt-6 space-y-5">
            <Input
              label="Display name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Your name"
              maxLength={100}
            />

            <div>
              <label className="mb-2 block text-sm font-medium">Username</label>

              <div className="flex items-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm">
                <span className="mr-1 text-[var(--text-muted)]">@</span>
                <span className="font-mono text-[var(--text-secondary)]">
                  {user?.username}
                </span>
              </div>

              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Your username is your public profile identifier.
              </p>
            </div>
          </div>
        </section>

        <div className="my-10 border-t border-[var(--border)]" />

        {/* Bio */}
        <section>
          <SectionHeading
            eyebrow="02"
            title="Bio"
            description="Tell people what you build, what you care about, or what you're learning."
          />

          <div className="mt-6">
            <Textarea
              label="About you"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Full Stack Web Developer building useful web applications..."
              rows={7}
              maxLength={1000}
            />

            <div className="mt-2 text-right text-xs text-[var(--text-muted)]">
              {bio.length} / 1000
            </div>
          </div>
        </section>

        <div className="my-10 border-t border-[var(--border)]" />

        {/* Links */}
        <section>
          <SectionHeading
            eyebrow="03"
            title="Developer links"
            description="Connect your profile to the places where your work lives."
          />

          <div className="mt-6 space-y-5">
            <Input
              label="GitHub"
              type="url"
              value={githubUrl}
              onChange={(event) => setGithubUrl(event.target.value)}
              placeholder="https://github.com/username"
            />

            <Input
              label="LinkedIn"
              type="url"
              value={linkedinUrl}
              onChange={(event) => setLinkedinUrl(event.target.value)}
              placeholder="https://linkedin.com/in/username"
            />

            <Input
              label="Website"
              type="url"
              value={websiteUrl}
              onChange={(event) => setWebsiteUrl(event.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </section>

        {/* Feedback */}
        {error && (
          <div
            role="alert"
            className="mt-8 rounded-[var(--radius-md)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]"
          >
            {error}
          </div>
        )}

        {saved && (
          <div
            role="status"
            className="mt-8 rounded-[var(--radius-md)] border border-[var(--success)]/20 bg-[var(--success)]/10 px-4 py-3 text-sm text-[var(--success)]"
          >
            Profile saved successfully.
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>

          <Button type="submit" loading={loading}>
            {!loading && <Save size={16} />}
            Save profile
          </Button>
        </div>
      </form>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="pt-1 font-mono text-xs text-[var(--text-muted)]">
        {eyebrow}
      </span>

      <div>
        <h2 className="text-lg font-semibold tracking-[-0.02em]">{title}</h2>

        <p className="mt-1.5 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </div>
  );
}
