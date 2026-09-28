import { useState, type FormEvent } from "react";
import { ArrowRight, Code2, Terminal } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { getApiErrorMessage } from "../services/errors";

export function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }

    if (!password) {
      setError("Enter your password.");
      return;
    }

    try {
      setLoading(true);

      await login({
        email: email.trim(),
        password,
      });

      navigate("/dashboard");
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to sign in."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl lg:grid-cols-[1fr_1fr]">
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
                Developer showcase
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.055em] xl:text-6xl">
                Your work.
                <br />
                <span className="text-[var(--accent)]">Your profile.</span>
              </h1>

              <p className="mt-7 max-w-md text-base leading-7 text-[var(--text-secondary)]">
                A focused place to present what you build, the technologies you
                use, and the projects you're proud of.
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {["Python", "React", "FastAPI", "Go"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs text-[var(--text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs text-[var(--text-muted)]">
              ~/build · ~/ship · ~/show
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="flex items-center px-6 py-12 sm:px-10 lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-md">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)] lg:hidden"
            >
              <Code2 size={16} />
              DevShow
            </Link>

            <div className="mt-10 lg:mt-0">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                Sign in
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                Welcome back.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                Sign in to continue building your developer profile.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
              />

              {error && (
                <div
                  role="alert"
                  className="rounded-[var(--radius-md)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-4 py-3 text-sm leading-5 text-[var(--danger)]"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="w-full"
              >
                {!loading && <ArrowRight size={17} />}
                Sign in
              </Button>
            </form>

            <div className="mt-8 border-t border-[var(--border)] pt-6 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                Don't have a developer profile?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
