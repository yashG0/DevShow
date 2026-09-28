import { type SubmitEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

export function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    display_name: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      setError("Username can contain only letters, numbers, and underscores.");
      return;
    }

    if (form.username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    if (!form.display_name.trim()) {
      setError("Display name is required.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        email: form.email.trim(),
        username: form.username.trim(),
        display_name: form.display_name.trim(),
        password: form.password,
      });

      navigate("/dashboard", { replace: true });
    } catch {
      setError(
        "Unable to create your account. The email or username may already be in use.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[var(--accent)]">
            Get started
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Create your DevShow
          </h1>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            Build your developer profile and showcase what you create.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
          />

          <Input
            label="Username"
            placeholder="yourusername"
            value={form.username}
            onChange={(event) => updateField("username", event.target.value)}
            autoComplete="username"
          />

          <Input
            label="Display name"
            placeholder="Your name"
            value={form.display_name}
            onChange={(event) =>
              updateField("display_name", event.target.value)
            }
            autoComplete="name"
          />

          <Input
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            autoComplete="new-password"
          />

          <Input
            label="Confirm password"
            type="password"
            placeholder="Enter your password again"
            value={form.confirm_password}
            onChange={(event) =>
              updateField("confirm_password", event.target.value)
            }
            autoComplete="new-password"
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
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </section>
  );
}
