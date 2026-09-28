import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Code2, Terminal } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { getApiErrorMessage } from "../services/errors";

export function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!displayName.trim()) {
      setError("Enter your display name.");
      return;
    }

    if (!username.trim()) {
      setError("Choose a username.");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain letters, numbers, and underscores.");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        display_name: displayName.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
      });

      navigate("/dashboard");
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to create your profile."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl lg:grid-cols-[0.95fr_1.05fr]">
        {/* Brand panel */}
        <section className="relative hidden overflow-hidden border-r border-[var(--border)] lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]">
                <Code2 size={17} />
              </span>
              DevShow
            </Link>

            <div className="mt-24 max-w-lg">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                <Terminal size={13} />
                Build your presence
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.055em] xl:text-6xl">
                Create your
                <br />
                <span className="text-[var(--accent)]">developer profile.</span>
              </h1>

              <p className="mt-7 max-w-md text-base leading-7 text-[var(--text-secondary)]">
                Put your projects, skills and developer identity in one focused
                place you can share.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              "Create your developer identity",
              "Showcase the projects you've built",
              "Share one public profile",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--border)] text-[var(--accent)]">
                  <Check size={12} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="flex items-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-md">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)] lg:hidden"
            >
              <Code2 size={16} />
              DevShow
            </Link>

            <div className="mt-8 lg:mt-0">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                Get started
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                Create your profile.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                Set up your developer identity and start adding projects.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <Input
                label="Display name"
                autoComplete="name"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Yash Gaurkar"
              />

              <div>
                <Input
                  label="Username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value.toLowerCase())
                  }
                  placeholder="yashg"
                />

                <p className="mt-2 font-mono text-xs text-[var(--text-muted)]">
                  devshow.app/dev/{username || "username"}
                </p>
              </div>

              <Input
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />

              <Input
                label="Password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
              />

              <Input
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Repeat your password"
              />

              {error && (
                <div
                  role="alert"
                  className="rounded-[var(--radius-md)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-4 py-3 text-sm leading-5 text-[var(--danger)]"
                >
                  {error}
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  loading={loading}
                  className="w-full"
                >
                  {!loading && <ArrowRight size={17} />}
                  Create developer profile
                </Button>
              </div>
            </form>

            <div className="mt-7 border-t border-[var(--border)] pt-6 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
