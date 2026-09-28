import { Link } from "react-router-dom";

import { Button } from "../components/ui/Button";

export function Home() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Developer Showcase
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            Show the world
            <br />
            what you build.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            DevShow gives developers a clean place to present their projects,
            skills, and work — without the noise.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/register">
              <Button size="lg">Create your profile</Button>
            </Link>

            <Link to="/login">
              <Button size="lg" variant="secondary">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
