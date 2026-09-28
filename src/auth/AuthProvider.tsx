import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import { api } from "../services/api"
import type {
  LoginData,
  RegisterData,
  User,
} from "./types"

type AuthContextValue = {
  user: User | null
  loading: boolean
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

const AuthContext =
  createContext<AuthContextValue | null>(null)

const TOKEN_KEY = "devshow-access-token"

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (!token) {
      setLoading(false)
      return
    }

    api
      .get<User>("/api/me")
      .then((response) => {
        setUser(response.data)
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  async function login(data: LoginData) {
    const body = new URLSearchParams()

    body.append("username", data.email)
    body.append("password", data.password)

    const response = await api.post(
      "/api/auth/token",
      body,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      },
    )

    localStorage.setItem(
      TOKEN_KEY,
      response.data.access_token,
    )

    const userResponse =
      await api.get<User>("/api/me")

    setUser(userResponse.data)
  }

  async function register(data: RegisterData) {
    await api.post("/api/auth/register", data)

    await login({
      email: data.email,
      password: data.password,
    })
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    )
  }

  return context
}
