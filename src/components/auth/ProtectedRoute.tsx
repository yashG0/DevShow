import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "../../auth/AuthProvider"
import { Spinner } from "../ui/Spinner"

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
