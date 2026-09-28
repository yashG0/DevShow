import type { ReactNode } from "react"
import { Navbar } from "../components/Navbar"

export function AppLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <Navbar />

      <main>{children}</main>
    </div>
  )
}