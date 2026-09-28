import { api } from "./api";

export type Project = {
  id: number;
  owner_id: number;
  slug: string;
  title: string;
  tagline: string;
  description_md: string;
  tech: string[];
  github_url: string | null;
  demo_url: string | null;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
};

export async function getProjects() {
  const response = await api.get<Project[]>("/api/projects");
  return response.data;
}
