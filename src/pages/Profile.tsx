import { useState, type FormEvent } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
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
    <main className="mx-auto max-w-3xl px-6 py-10 lg:px-8 lg:py-14">
      {/* Header */}

      <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
        >
          <ArrowLeft size={15} />
          Back to workspace
        </button>

        <p className="mt-8 text-sm font-medium text-[var(--accent)]">Profile</p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
          Edit your profile
        </h1>

        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
          Update the information people will see on your developer profile.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6 sm:p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold">Basic information</h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Tell people who you are.
              </p>
            </div>

            <Input
              label="Display name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Your name"
              maxLength={100}
            />

            <div>
              <label className="mb-2 block text-sm font-medium">Username</label>

              <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-secondary)]">
                @{user?.username}
              </div>

              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Your username cannot be changed here.
              </p>
            </div>

            <Textarea
              label="Bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Tell people what you build, what you care about, or what you're learning."
              rows={5}
              maxLength={1000}
            />
          </div>

          <div className="my-8 border-t border-[var(--border)]" />

          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold">Links</h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Add places where people can find your work.
              </p>
            </div>

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

          {error && (
            <div
              role="alert"
              className="mt-6 rounded-[var(--radius-md)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]"
            >
              {error}
            </div>
          )}

          {saved && (
            <div
              role="status"
              className="mt-6 rounded-[var(--radius-md)] border border-[var(--success)]/20 bg-[var(--success)]/10 px-4 py-3 text-sm text-[var(--success)]"
            >
              Your profile has been saved.
            </div>
          )}

          <div className="mt-8 flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>

            <Button type="submit" loading={loading}>
              {!loading && <Save size={16} />}
              Save changes
            </Button>
          </div>
        </Card>
      </form>
    </main>
  );
}
