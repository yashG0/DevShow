import { useAuth } from "../auth/AuthProvider"

export function Dashboard() {
  const { user } = useAuth()

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <p className="text-sm text-[var(--text-secondary)]">
        Dashboard
      </p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Welcome back, {user?.display_name}.
      </h1>
    </section>
  )
}
