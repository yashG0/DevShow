export type User = {
  id: number
  email: string
  username: string
  display_name: string
  bio: string | null
  avatar_path: string | null
  github_url: string | null
  linkedin_url: string | null
  website_url: string | null
}

export type RegisterData = {
  email: string
  username: string
  display_name: string
  password: string
}

export type LoginData = {
  email: string
  password: string
}
