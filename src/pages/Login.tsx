import { useState, type SubmitEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

export function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);

      await login({
        email: email.trim(),
        password,
      });

      navigate("/dashboard", { replace: true });
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[var(--accent)]">
            Welcome back
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Sign in to DevShow
          </h1>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            Manage your developer profile and projects.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />

          {error && (
            <p
              role="alert"
              className="rounded-[var(--radius-md)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]"
            >
              {error}
            </p>
          )}

          <Button type="submit" size="lg" loading={loading} className="w-full">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            Create one
          </Link>
        </p>
      </Card>
    </section>
  );
}
