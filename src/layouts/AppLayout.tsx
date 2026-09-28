import type { ReactNode } from "react"

import { Navbar } from "../components/Navbar"

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <Navbar />

      <main>{children}</main>
    </div>
  )
}
